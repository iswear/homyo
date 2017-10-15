/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../notifier';

/**
 * 配置参数：
 * {
 *    node:,
 *    animation:,
 *    fn:,
 *    target:
 * }
 */
export default (
  function () {

    var Binder = LangUtil.extend(Notifier);

    Binder.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('node', LangUtil.checkAndGet(conf.node, null));
      this.defineNotifyProperty('animation', LangUtil.checkAndGet(conf.animation, null));
      this.defineNotifyProperty('fn', LangUtil.checkAndGet(conf.fn, null));
      this.defineNotifyProperty('target', LangUtil.checkAndGet(conf.target, null));
      this.defineNotifyProperty('loop', LangUtil.checkAndGet(conf.loop, null));
      this._runParams = {};
    }

    Binder.prototype.execute = function (deltaTime) {
      var result = this.animation.execute(this, deltaTime);
      if (this.fn != null) {
        this.fn.apply(this.target, [this, result]);
      }
      return result;
    }

    Binder.prototype.getRunParam = function (key) {
      return this._runParams[key];
    }

    Binder.prototype.setRunParam = function (key, value) {
      this._runParams[key] = value;
    }

    Binder.prototype.destroy = function () {
      this.node = null;
      this.animation = null;
      this.fn = null;
      this.target = null;
      this.super('destroy');
    }

    return Binder;

  }
)();