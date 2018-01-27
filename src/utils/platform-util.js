/**
 * util for platform check
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {
    var util = {
      isMobile: navigator.userAgent.toLowerCase().indexOf("mobile") != -1,
      isDeskTop: !(navigator.userAgent.toLowerCase().indexOf("mobile") != -1),
      isIE: navigator.userAgent.toLowerCase().indexOf("msie") != -1
    };

    return util;
  }
)();