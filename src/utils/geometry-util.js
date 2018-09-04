/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {
    var util = (function() {
      function isZoneCross(zone1, zone2) {
        return !isZoneNotCross(zone1, zone2);
      }

      function isZoneNotCross(zone1, zone2) {
        return zone1.left >= zone2.right || zone1.right <= zone2.left || zone1.top >= zone2.bottom || zone1.bottom <= zone2.top;
      }

      function getZoneCross(zone1, zone2) {
        var left = Math.max(zone1.left, zone2.left);
        var right = Math.min(zone1.right, zone2.right);
        var width = right - left;
        if (width <= 0) {
          return null;
        }
        var top = Math.max(zone1.top, zone2.top);
        var bottom = Math.min(zone1.bottom, zone2.bottom);
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
        isZoneCross: isZoneCross,
        isZoneNotCross: isZoneNotCross,
        getZoneCross: getZoneCross
      }
    })();

    return util;
  }
)();