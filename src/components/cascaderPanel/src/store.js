import Node from './node';
import { coerceTruthyValueToArray } from '../../../utils/util';
import { valueEquals } from 'canknow-core/src/libs';

const flatNodes = (data, leafOnly) => {
  return data.reduce((result, node) => {
    if (node.isLeaf) {
      result.push(node);
    }
    else {
      !leafOnly && result.push(node);
      result = result.concat(flatNodes(node.children, leafOnly));
    }
    return result;
  }, []);
};

export default class Store {

  constructor(data, config) {
    this.config = config;
    this.initNodes(data);
  }

  initNodes(data) {
    data = coerceTruthyValueToArray(data);
    this.nodes = data.map(nodeData => new Node(nodeData, this.config));
    this.flattedNodes = this.getFlattedNodes(false, false);
    this.leafNodes = this.getFlattedNodes(true, false);
  }

  appendNode(nodeData, parentNode) {
    const node = new Node(nodeData, this.config, parentNode);
    const children = parentNode ? parentNode.children : this.nodes;

    children.push(node);
  }

  appendNodes(nodeDataList, parentNode) {
    nodeDataList = coerceTruthyValueToArray(nodeDataList);
    nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode));
  }

  getNodes() {
    return this.nodes;
  }

  getFlattedNodes(leafOnly, cached = true) {
    const cachedNodes = leafOnly ? this.leafNodes : this.flattedNodes;
    return cached ? cachedNodes : flatNodes(this.nodes, leafOnly);
  }

  getNodeByValue(value) {
    const nodes = this.getFlattedNodes(false, !this.config.lazy)
      .filter(node => (valueEquals(node.path, value) || node.value === value));
    return nodes && nodes.length ? nodes[0] : null;
  }
}
