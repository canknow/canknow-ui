import { getOptionProps } from '../../../utils/props-util';
import { cloneElement } from '../../../utils/vnode';

export function toArray(value) {
  let result = value;
  if (value === undefined) {
    result = [];
  }
  else if (!Array.isArray(value)) {
    result = [value];
  }
  return result;
}

export const generateChildrenRows = (children, column) => {
  const rows = [];
  let columns = null;
  let leftSpans;

  const itemNodes = toArray(children);
  itemNodes.forEach((node, index) => {
    const itemProps = getOptionProps(node);
    let itemNode = node;

    if (!columns) {
      leftSpans = column;
      columns = [];
      rows.push(columns);
    }

    // Always set last span to align the end of Descriptions
    const lastItem = index === itemNodes.length - 1;
    if (lastItem) {
      itemNode = cloneElement(itemNode, {
        props: {
          span: leftSpans,
        },
      });
    }

    // Calculate left fill span
    const { span = 1 } = itemProps;
    columns.push(itemNode);
    leftSpans -= span;

    if (leftSpans <= 0) {
      columns = null;
    }
  });

  return rows;
};