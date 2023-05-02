const highlight = window.hljs;

export default {
  bind (el, binding, vnode) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      highlight.highlightBlock(block);
    });
  }
};