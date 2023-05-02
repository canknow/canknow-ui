<template>
    <div class="example"
         @mouseenter="hovering = true"
         @mouseleave="hovering = false">
        <div class="source">
            <slot name="source"></slot>
        </div>
        <div class="meta" ref="meta">
            <div class="description" v-if="$slots.default">
                <slot></slot>
            </div>
            <div class="highlight">
                <slot name="highlight"></slot>
            </div>
        </div>
        <div class="demo-block-control"
             ref="control"
             :class="{ 'is-fixed': fixedControl }"
             @click="isExpanded = !isExpanded">
            <label class="view-source-text">{{ t('core.example.viewSource') }}</label>
            <transition name="arrow-slide">
                <i :class="[iconClass, { 'hovering': hovering }]"></i>
            </transition>
            <div class="flex-adapter"></div>
            <c-button
                    size="small"
                    type="text"
                    border
                    circle
                    @click.stop="goCodepen">{{t('app.example.runOnline')}}</c-button>
        </div>
    </div>
</template>

<script>
import Locale from '../../../../../../src/mixins/locale';
import canknow from './../../../../../../src/index.js';
import { stripScript, stripStyle, stripTemplate } from './util';

const { version } = canknow;

export default {
  name: 'Example',
  mixins: [ Locale ],
  props: {
    default() {
      return {};
    }
  },
  data() {
    return {
      codepen: {
        script: '',
        html: '',
        style: ''
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null
    };
  },
  computed: {
    iconClass() {
      return this.isExpanded ? 'icon-up' : 'icon-down';
    },
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
                        this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
    }
  },
  methods: {
    goCodepen() {
      const { script, html, style } = this.codepen;
      const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt><scr' + `ipt src="//unpkg.com/canknow@${ version }/dist/canknow.common.js"></scr` + 'ipt>';
      let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
      let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
      let cssTpl = `@import url("//unpkg.com/canknow@${ version }/dist/canknow.css");\n${(style || '').trim()}\n`;
      jsTpl = jsTpl ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')' : 'new Vue().$mount(\'#app\')';
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: htmlTpl
      };
      const form = document.getElementById('fiddle-form') || document.createElement('form');
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      form.method = 'POST';
      form.action = 'https://codepen.io/pen/define/';
      form.target = '_blank';
      form.style.display = 'none';

      const input = document.createElement('input');
      input.setAttribute('name', 'data');
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', JSON.stringify(data));

      form.appendChild(input);
      document.body.appendChild(form);

      form.submit();
    }
  },
  created() {
    const highlight = this.$slots.highlight;
    if (highlight && highlight[0]) {
      let code = '';
      let cur = highlight[0];
      if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
        cur = cur.children[0];
        if (cur.tag === 'code') {
          code = cur.children[0].text;
        }
      }
      if (code) {
        this.codepen.html = stripTemplate(code);
        this.codepen.script = stripScript(code);
        this.codepen.style = stripStyle(code);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0];
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%';
        highlight.borderRight = 'none';
      }
    });
  },
};
</script>

<style lang="scss">
    @import "example";
</style>