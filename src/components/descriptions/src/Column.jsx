import PropTypes from '../../../utils/vue-types';
import { getOptionProps, getSlots, getComponentFromProp } from '../../../utils/props-util';

const ColumnProps = {
  child: PropTypes.any,
  bordered: PropTypes.bool,
  colon: PropTypes.bool,
  type: PropTypes.oneOf(['label', 'content']),
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

const Column = {
  functional: true,
  props: ColumnProps,
  render(h, context) {
    const { child, bordered, colon, type, layout } = context.props;
    const { span = 1 } = getOptionProps(child);
    const { key } = context.data;
    const label = getComponentFromProp(child, 'label');
    const slots = getSlots(child);
    const labelProps = {
      attrs: {},
      class: [
        'c-descriptions-item-label',
        {
          ['c-descriptions-item-colon']: colon,
          ['c-descriptions-item-no-label']: !label,
        },
      ],
      key: `${key}-label`,
    };
    if (layout === 'vertical') {
      labelProps.attrs.colSpan = span * 2 - 1;
    }

    if (bordered) {
      if (type === 'label') {
        return <th {...labelProps}>{label}</th>;
      }
      return (
        <td class={'c-descriptions-item-content'} key={`${key}-content`} colSpan={span * 2 - 1}>
          {slots.default}
        </td>
      );
    }

    if (layout === 'vertical') {
      if (type === 'content') {
        return (
          <td colSpan={span} class={'c-descriptions-item'}>
            <span class={'c-descriptions-item-content'} key={`${key}-content`}>
              {slots.default}
            </span>
          </td>
        );
      }

      return (
        <td colSpan={span} class={'c-descriptions-item'}>
          <span
            class={['c-descriptions-item-label', { ['c-descriptions-item-colon']: colon }]}
            key={`${key}-label`}>
            {label}
          </span>
        </td>
      );
    }

    return (
      <td colSpan={span} class={'c-descriptions-item'}>
        <div class={'c-descriptions-item-container'}>
          <span {...labelProps}>{label}</span>
          <span className={'c-descriptions-item-content'} key={`${key}-content`}>{slots.default}</span>
        </div>
      </td>
    );
  },
};

export default Column;
