<script type="text/jsx">
export default {
  name: 'CSkeletonParagraph',
  props: {
    width: {
      type: [Number, String, Array]
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  methods: {
    getWidth(index) {
      const { width, rows } = this;

      if (Array.isArray(width)) {
        return width[index];
      }
      // last paragraph
      if (rows - 1 === index) {
        return width;
      }
      return undefined;
    }
  },
  render(createElement, context) {
    const rowList = [...Array(this.rows)].map((_, index) => (
      <li key={index} style={{ width: this.getWidth(index) }} />
    ));
    return (
      <ul class={'c-skeleton-paragraph'}>
        {rowList}
      </ul>
    );
  }
};
</script>
