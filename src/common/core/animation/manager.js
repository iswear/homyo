/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../notifier';
import Binder from './binder';

export default (function () {
    var Manager = (function () {
      var InnerManager = LangUtil.extend(Notifier);

      InnerManager.prototype.init = function (conf) {
        this.super('init', [conf]);
        this._animationBinders = [];
        this._paused = false;
      }

      InnerManager.prototype.pause = function () {
        this._paused = true;
      }

      InnerManager.prototype.resume = function () {
        this._paused = false;
      }

      InnerManager.prototype.addAnimation = function (node, animation, callbackFn, callbackTarget, loop) {
        this._animationBinders.push(new Binder({
          node: node,
          animation: animation,
          callbackFn: callbackFn,
          callbackTarget: callbackTarget,
          loop: loop
        }));
      }

      InnerManager.prototype.removeAnimationByNode = function (node) {
        var binders = this._animationBinders;
        for (var i = 0, len = binders.length; i < len; ++i) {
          var binder = binders[i];
          if (binder.node === node) {
            binders.splice(i, 1);
            i--;
            len--;
          }
        }
      }

      InnerManager.prototype.removeAnimationByNodeAndAnimation = function (node, animation) {
        var binders = this._animationBinders;
        for (var i = 0, len = binders.length; i < len; ++i) {
          var binder = binders[i];
          if (binder.node === node && binder.animation === animation) {
            binders.splice(i, 1);
            i--;
            len--;
          }
        }
      }

      InnerManager.prototype.run = function (deltaTime) {
        if (!this._paused) {
          var binders = this._animationBinders;
          for (var i = 0, len = binders.length; i < len; ++i) {
            var binder = binders[i];
            if (binder.execute(deltaTime) && !binder.loop) {
              binders.splice(i, 1);
              i--;
              len--;
              if (binder.fn) {
                binder.fn.call(binder.target, binder, deltaTime, true);
              }
            } else {
              if (binder.fn) {
                binder.fn.call(binder.target, binder, deltaTime, false);
              }
            }
          }
        }
      }

      InnerManager.prototype.destroy = function () {
        this._animationBinders = null;
        this.super('destroy');
      }

      return InnerManager;
    })();

    return Manager;
  }
)();
