export default {
  name: 'CDescriptionsItem',
  inject: ['descriptions'],
  props: {
    label: {
      type: String
    },
    span: {
      type: [String, Number],
      default: 1
    }
  }
};