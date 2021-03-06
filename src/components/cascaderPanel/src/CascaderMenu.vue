<script type="text/jsx">
import CascaderNode from './CascaderNode';
import Locale from '../../../mixins/locale';
import { generateId } from '../../../utils/util';

export default {
  name: 'CCascaderMenu',
  mixins: [Locale],
  inject: ['panel'],
  components: {
    CascaderNode
  },
  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },
  data() {
    return {
      activeNode: null,
      hoverTimer: null,
      id: generateId()
    };
  },
  computed: {
    isEmpty() {
      return !this.nodes.length;
    },
    menuId() {
      return `cascader-menu-${this.id}-${this.index}`;
    }
  },
  methods: {
    handleExpand(e) {
      this.activeNode = e.target;
    },
    handleMouseMove(e) {
      const { activeNode, hoverTimer } = this;
      const { hoverZone } = this.$refs;

      if (!activeNode || !hoverZone) return;

      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);

        const { left } = this.$el.getBoundingClientRect();
        const startX = e.clientX - left;
        const { offsetWidth, offsetHeight } = this.$el;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;

        hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
      }
      else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, this.panel.config.hoverThreshold);
      }
    },
    clearHoverZone() {
      const { hoverZone } = this.$refs;
      if (!hoverZone) return;
      hoverZone.innerHTML = '';
    },

    renderEmptyText(h) {
      return (<div class="c-cascader-menu-empty-text">{ this.t('core.cascader.noData') }</div>);
    },
    renderNodeList(h) {
      const { menuId } = this;
      const { isHoverMenu } = this.panel;
      const events = { on: {} };

      if (isHoverMenu) {
        events.on.expand = this.handleExpand;
      }

      const nodes = this.nodes.map((node, index) => {
        const { hasChildren } = node;
        return (
          <cascader-node
            key={ node.uid }
            node={ node }
            node-id={ `${menuId}-${index}` }
            aria-haspopup={ hasChildren }
            aria-owns = { hasChildren ? menuId : null }
            { ...events }></cascader-node>
        );
      });

      return [
        ...nodes,
        isHoverMenu ? <svg ref='hoverZone' class='c-cascader-menu-hover-zone'></svg> : null
      ];
    }
  },

  render(h) {
    const { isEmpty, menuId } = this;
    const events = { nativeOn: {} };

    // optimize hover to expand experience (#8010)
    if (this.panel.isHoverMenu) {
      events.nativeOn.mousemove = this.handleMouseMove;
      // events.nativeOn.mouseleave = this.clearHoverZone;
    }

    return (
      <c-scrollbar
        tag="ul"
        role="menu"
        id={ menuId }
        class="c-cascader-menu"
        wrap-class="c-cascader-menu-wrap"
        view-class={{ 'c-cascader-menu-list': true, 'empty': isEmpty }}
        { ...events }>
        { isEmpty ? this.renderEmptyText(h) : this.renderNodeList(h) }
      </c-scrollbar>
    );
  }
};
</script>
