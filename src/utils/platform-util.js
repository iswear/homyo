/**
 * util for platform check
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {
    var util = {};

    var isMobile = navigator.userAgent.toLowerCase().indexOf("mobile") != -1;
    var isDeskTop = !isMobile;
    var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;

    util.isMobile = function () {
      return isMobile;
    }

    util.isDeskTop = function () {
      return isDeskTop;
    }

    util.isIE = function () {
      return isIE;
    }

    return util;

  }
)();