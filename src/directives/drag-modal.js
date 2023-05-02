import { getStyle } from 'canknow-core/src/libs/dom';

export default {
  bind(el, binding, vnode) {
    const dialogHeaderElement = el.querySelector('.modal-header');
    const dragDom = el.querySelector('.modal');
    dialogHeaderElement.style.cssText += ';cursor:move;';

    dialogHeaderElement.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderElement.offsetLeft;
      const disY = e.clientY - dialogHeaderElement.offsetTop;

      const dragDomWidth = dragDom.offsetWidth;
      const dragDomHeight = dragDom.offsetHeight;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      // 获取到的值带px 正则匹配替换
      let styleLeft = getStyle(dragDom, 'left');
      let styleTop = getStyle(dragDom, 'top');

      if (styleLeft.includes('%')) {
        styleLeft = +document.body.clientWidth * (+styleLeft.replace(/\%/g, '') / 100);
        styleTop = +document.body.clientHeight * (+styleTop.replace(/\%/g, '') / 100);
      }
      else {
        styleLeft = +styleLeft.replace(/\px/g, '');
        styleTop = +styleTop.replace(/\px/g, '');
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft;
        }
        else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-(top) > minDragDomTop) {
          top = -minDragDomTop;
        }
        else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styleLeft}px;top:${top + styleTop}px;`;

        // emit onDrag event
        vnode.child.$emit('dragDialog');
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};
