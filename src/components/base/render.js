export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function
  },
  render (h, context) {
    return context.props.render(h);
  }
};