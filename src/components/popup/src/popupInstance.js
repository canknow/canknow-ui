import Vue from 'vue';
import Popup from './Popup.vue';
import Locale from '../../../mixins/locale';

Popup.newInstance = properties => {
  const _props = properties || {};
  const Instance = new Vue({
    mixins: [ Locale ],
    data: Object.assign({}, _props, {
      visible: false,
      width: 416,
      body: ''
    }),
    render (h) {
      let body_render;

      if (this.render) {
        body_render = h('div', {
          attrs: {
            class: 'c-popup-body c-popup-confirm-body c-popup-confirm-body-render'
          }
        }, [this.render(h)]);
      }
      else {
        body_render = h('div', {
          attrs: {
            class: 'c-popup-confirm-body'
          }
        }, [
          h('div', {
            attrs: {
              class: 'c-popup-confirm-body-content'
            },
            domProps: {
              innerHTML: this.body
            }
          })
        ]);
      }

      return h(Popup, {
        props: Object.assign({}, _props, {
          width: this.width
        }),
        domProps: {
          value: this.visible
        }
      }, [body_render]);
    },
    computed: {
    },
    methods: {
      cancel () {
        this.$children[0].visible = false;
        this.onCancel();
        this.remove();
      },
      ok () {
        this.$children[0].visible = false;
        this.remove();
        this.onOk();
      },
      remove () {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
      destroy () {
        this.$destroy();
        document.body.removeChild(this.$el);
        this.onRemove();
      },
      onOk () {},
      onCancel () {},
      onRemove () {}
    }
  });
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const popup = Instance.$children[0];

  return {
    show (props) {
      popup.$parent.showCancel = props.showCancel;

      if ('width' in props) {
        popup.$parent.width = props.width;
      }

      if ('content' in props) {
        popup.$parent.body = props.content;
      }

      if ('onCancel' in props) {
        popup.$parent.onCancel = props.onCancel;
      }

      if ('onOk' in props) {
        popup.$parent.onOk = props.onOk;
      }

      // notice when components destroy
      popup.$parent.onRemove = props.onRemove;
      popup.visible = true;
    },
    remove () {
      popup.visible = false;
      popup.$parent.remove();
    },
    component: popup
  };
};

export default Popup;