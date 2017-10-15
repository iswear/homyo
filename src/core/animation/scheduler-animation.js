/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util'
import BaseAnimation from './base-animation'

export default (
  function () {

    var SchedulerAnimation = LangUtil.extend(BaseAnimation);

    SchedulerAnimation.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('fn', LangUtil.checkAndGet(conf.fn, null));
      this.defineNotifyProperty('target', LangUtil.checkAndGet(conf.target, null));
      this.defineNotifyProperty('interval', LangUtil.checkAndGet(conf.interval, 0));
      this.defineNotifyProperty('repeats', LangUtil.checkAndGet(conf.repeats, 0));
      this.defineNotifyProperty('param', LangUtil.checkAndGet(conf.param, null));
    }

    SchedulerAnimation.prototype.execute = function (binder, deltaTime) {
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
          this.fn.call(this.target, binder, this.param);
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

    return SchedulerAnimation;

  }
)();