/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {

    var util = (function() {

      function isRectCross(rect1, rect2) {
        return !isRectNotCross(rect1, rect2);
      }

      function isRectNotCross(rect1, rect2) {
        return rect1.left > rect2.right || rect1.right < rect2.left || rect1.top > rect1.bottom || rect1.bottom < rect2.top;
      }
      
      return {
        isRectCross: isRectCross,
        isRectNotCross: isRectNotCross
      }
    })();

    return util;
  }
)();