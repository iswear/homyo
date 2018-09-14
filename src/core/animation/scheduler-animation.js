/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util'
import BaseAnimation from './base-animation'

export default (function () {
    var SchedulerAnimation = (function () {
      var InnerSchedulerAnimation = LangUtil.extend(BaseAnimation);

      InnerSchedulerAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('callbackFn', LangUtil.checkAndGet(conf.callbackFn, null));
        this.defineNotifyProperty('callbackTarget', LangUtil.checkAndGet(conf.callbackTarget, null));
        this.defineNotifyProperty('interval', LangUtil.checkAndGet(conf.interval, 0));
        this.defineNotifyProperty('repeats', LangUtil.checkAndGet(conf.repeats, 0));
        this.defineNotifyProperty('params', LangUtil.checkAndGet(conf.params, null));
      }

      InnerSchedulerAnimation.prototype.execute = function (binder, deltaTime) {
        if (this.repeats > 0) {
          var repeats = 0, sumTime = 0;
          if (binder.getRunParam('init')) {
            repeats = binder.getRunParam('repeats');
            sumTime = binder.getRunParam('sumTime');
          } else {
            binder.setRunParam('init', true);
            binder.setRunParam('repeats', repeats);
            binder.setRunParam('sumTime', sumTime);
          }
          sumTime += deltaTime;
          if (sumTime >= this.interval) {
            this.callbackFn.call(this.callbackTarget, binder, this.params);
            sumTime -= this.interval;
            repeats += 1;
          }
          if (repeats >= this.repeats) {
            binder.setRunParam('init', false);
            return true;
          } else {
            binder.setRunParam('repeats', repeats);
            binder.setRunParam('sumTime', sumTime);
            return false;
          }
        } else {
          return true;
        }
      }

      InnerSchedulerAnimation.prototype.destroy = function () {
        this.callbackFn = null;
        this.callbackTarget = null;
        this.params = null;
        this.super('destroy');
      }

      return InnerSchedulerAnimation;
    })();

    return SchedulerAnimation;
  }
)();