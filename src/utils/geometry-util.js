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
        return rect1.left >= rect2.right || rect1.right <= rect2.left || rect1.top >= rect1.bottom || rect1.bottom <= rect2.top;
      }

      function getRectCross(rect1, rect2) {
        var left = Math.max(rect1.left, rect2.left);
        var right = Math.min(rect1.right, rect2.right);
        var width = right - left;
        if (width <= 0) {
          return null;
        }
        var top = Math.max(rect1.top, rect2.top);
        var bottom = Math.min(rect1.bottom, rect2.bottom);
        var height = bottom - top;
        if (height <= 0) {
          return null;
        }
        return {
          left: left,
          right: right,
          top: top,
          bottom: bottom,
          width: width,
          height: height
        }
      }
      
      return {
        isRectCross: isRectCross,
        isRectNotCross: isRectNotCross,
        getRectCross: getRectCross
      }
    })();

    return util;
  }
)();