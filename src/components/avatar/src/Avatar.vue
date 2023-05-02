<script type="text/jsx">
export default {
  name: 'CAvatar',
  props: {
    size: {
      type: [Number, String],
      validator(value) {
        if (typeof value === 'string') {
          return ['large', 'medium', 'small'].includes(value);
        }
        return typeof value === 'number';
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(value) {
        return ['circle', 'square'].includes(value);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    }
  },

  data() {
    return {
      isImageExist: true
    };
  },

  computed: {
    avatarClass() {
      const { size, icon, shape } = this;
      let classList = ['c-avatar'];

      if (size && typeof size === 'string') {
        classList.push(size);
      }

      if (icon) {
        classList.push('with-icon');
      }

      if (shape) {
        classList.push(shape);
      }
      return classList.join(' ');
    }
  },

  methods: {
    handleError() {
      const { error } = this;
      const errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    renderAvatar() {
      const { icon, src, alt, isImageExist, srcSet, fit } = this;

      if (isImageExist && src) {
        return <img
          src={src}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }}/>;
      }

      if (icon) {
        return (<icon name={icon} />);
      }
      return this.$slots.default;
    }
  },

  render() {
    const { avatarClass, size } = this;

    const sizeStyle = typeof size === 'number' ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    } : {};

    return (
      <span class={ avatarClass } style={ sizeStyle }>
        {
          this.renderAvatar()
        }
      </span>
    );
  }
};
</script>
