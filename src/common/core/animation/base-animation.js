/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../notifier';
/**
 * 配置参数: 无
 */
export default (function () {
    var BaseAnimation = (function () {
      var InnerBaseAnimation = LangUtil.extend(Notifier);

      InnerBaseAnimation.prototype.execute = function (binder, deltaTime) {}

      return InnerBaseAnimation;
    })();

    return BaseAnimation;
  }
)();