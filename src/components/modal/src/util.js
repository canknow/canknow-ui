let count = 0;
const zIndex = 2000;

export default {
  increase () {
    count ++;
    return count;
  },
  decrease () {
    count --;
    return count;
  },
  getZIndex () {
    return zIndex + count;
  }
};