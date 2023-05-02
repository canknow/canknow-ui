import { getComponentFromProp, isValidElement } from '../../../utils/props-util';
import { cloneElement } from '../../../utils/vnode';
import { generateChildrenRows, toArray } from './utils';
import Column from './Column';

export default {
  name: 'CDescriptions',
  provide() {
    return {
      descriptions: this
    };
  },
  props: {
    title: {
      type: String
    },
    bordered: {
      type: Boolean,
      default: false
    },
    column: {
      type: [Number, String],
      default: 3
    },
    size: {
      type: String,
      default: 'medium'
    },
    layout: {
      type: String,
      default: 'horizontal '
    },
    colon: {
      type: Boolean
    }
  },
  render() {
    const {
      size,
      bordered = false,
      layout = 'horizontal',
      colon = true,
    } = this.$props;
    const title = getComponentFromProp(this, 'title') || null;
    const column = this.column;
    const children = this.$slots.default;
    const cloneChildren = toArray(children).map(child => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          props: {
          },
        });
      }
      return null;
    }).filter(node => node);

    const childrenArray = generateChildrenRows(cloneChildren, column);
    return (
      <div
        class={[
          'c-descriptions',
          {
            size: size !== 'default',
            bordered: !!bordered,
          },
        ]}>
        {title && <div class={'c-descriptions-title'}>{title}</div>}
        <div class={'c-descriptions-view'}>
          <table>
            <tbody>
              {childrenArray.map((child, index) =>
                this.renderRow(
                  child,
                  index,
                  bordered,
                  layout,
                  colon,
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  methods: {
    renderRow (children, index, bordered, layout, colon) {
      const renderColumn = (colItem, type, idx) => {
        return (
          <Column
            child={colItem}
            bordered={bordered}
            colon={colon}
            type={type}
            key={`${type}-${colItem.key || idx}`}
            layout={layout}/>
        );
      };

      const cloneChildren = [];
      const cloneContentChildren = [];
      toArray(children).forEach((childrenItem, idx) => {
        cloneChildren.push(renderColumn(childrenItem, 'label', idx));

        if (layout === 'vertical') {
          cloneContentChildren.push(renderColumn(childrenItem, 'content', idx));
        }
        else if (bordered) {
          cloneChildren.push(renderColumn(childrenItem, 'content', idx));
        }
      });

      if (layout === 'vertical') {
        return [
          <tr class={'c-descriptions-row'} key={`label-${index}`}>
            {cloneChildren}
          </tr>,
          <tr class={'c-descriptions-row'} key={`content-${index}`}>
            {cloneContentChildren}
          </tr>,
        ];
      }

      return (
        <tr class={'c-descriptions-row'} key={index}>
          {cloneChildren}
        </tr>
      );
    }
  }
};