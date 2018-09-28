/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {

    var util = (function() {

      function getMaxInteger() {
        return 9007199254740991;
      }

      function getMinInteger() {
        return -9007199254740991
      }

      return {
        getMaxInteger: getMaxInteger,
        getMinInteger: getMinInteger
      }
    })();

    return util;
  }
)();