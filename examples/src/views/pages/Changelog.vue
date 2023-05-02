<template>
  <div class="page-changelog">
    <div class="page-changelog-heading">
      <div class="page-changelog-title">{{$t('app.changelog')}}</div>
      <c-button scene="primary" border circle>
        <a href="https://github.com/canknow/canknow/releases" target="_blank">GitHub Releases</a>
      </c-button>
    </div>
    <div class="component-span-top">
      <ul class="timeline" ref="timeline"></ul>
    </div>
    <change-log ref="changeLog"></change-log>
  </div>
</template>

<script>
import ChangeLog from '../../../../CHANGELOG.md';

export default {
  name: 'ChangelogDocument',
  components: {
    ChangeLog
  },
  data() {
    return {
      count: 3
    };
  },
  mounted() {
    const changeLog = this.$refs.changeLog;
    const changeLogNodes = changeLog.$el.children;
    let a = changeLogNodes[1].querySelector('a');
    a && a.remove();
    let release = changeLogNodes[1].textContent.trim();
    let fragments = `<li><h3><a href="https://github.com/canknow/canknow/releases/tag/v${release}" target="_blank">${release}</a></h3>`;

    for (let len = changeLogNodes.length, i = 2; i < len; i++) {
      let node = changeLogNodes[i];
      a = changeLogNodes[i].querySelector('a');
      a && a.getAttribute('class') === 'header-anchor' && a.remove();
      if (node.tagName !== 'H3') {
        fragments += changeLogNodes[i].outerHTML;
      }
      else {
        release = changeLogNodes[i].textContent.trim();
        fragments += `</li><li><h3><a href="https://github.com/canknow/canknow/releases/tag/v${release}" target="_blank">${release}</a></h3>`;
      }
    }
    fragments = fragments.replace(/#(\d+)/g, '<a href="https://github.com/canknow/canknow/issues/$1" target="_blank">#$1</a>');
    fragments = fragments.replace(/@(\w+)/g, '<a href="https://github.com/$1" target="_blank">@$1</a>');
    this.$refs.timeline.innerHTML = `${fragments}</li>`;

    changeLog.$el.remove();
  }
};
</script>

<style lang="scss">
@import "./../../styles/helpers";
.page-changelog {
  &-heading {
    display: flex;
    align-items: center;
  }
  &-title {
    margin: 0;
    flex: 1;
    font-size: $font-size-larger;
  }
  .timeline {
    list-style: none;

    &>li {
      margin-bottom: $component-span;
      border: $border-width solid $border-color;
      border-radius: $block-border-radius;
      padding: $content-padding;
      position: relative;

      h3 {
        margin: 0;
        padding: $content-padding;
        border-bottom: $border-width solid $border-color;
        font-size: $font-size-largest;
        color: $title-text-color;
        font-weight: 700;
      }
      h4 {
        font-size: $font-size-larger;
        font-weight: 700;
      }
      em {
        position: absolute;
        right: $content-padding;
        font-style: normal;
        top: $component-span-large;
        color: $secondary-text-color;
      }
      li {
        list-style: none;
        padding-left: $component-size;
        padding-bottom: $text-span;
        color: $content-text-color;
        word-break: break-all;
      }
    }
  }
}
</style>
