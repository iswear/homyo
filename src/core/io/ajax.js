import LangUtil from "../../utils/lang-util";
import Notifier from "../notifier";

/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
export default (function () {
  var Ajax = (function () {
    var InnerAjax = LangUtil.extend(Notifier);
    
    InnerAjax.prototype.init = function (conf) {
      
    }

    InnerAjax.prototype.run = function () {

    }

    return InnerAjax;
  })();

  return Ajax;
})();