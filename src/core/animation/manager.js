/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../notifier';
import Binder from './binder';

export default (
  function () {

    var Manager = LangUtil.extend(Notifier);

    Manager.prototype.init = function (conf) {
      this.super('init', [conf]);
      this._aniBinders = [];
      this._paused = false;
    }

    Manager.prototype.pause = function () {
      this._paused = true;
    }

    Manager.prototype.resume = function () {
      this._paused = false;
    }

    Manager.prototype.addAnimationBinder = function (node, animation, fn, target, loop) {
      this._aniBinders.push(new Binder({
        node: node,
        animation: animation,
        fn: fn,
        target: target,
        loop: loop
      }));
    }

    Manager.prototype.removeAnimationBinderByNode = function (node) {
      var binders = this._aniBinders;
      for (var i = 0, len = binders.length; i < len; ++i) {
        var binder = binders[i];
        if (binder.node === node) {
          binders.splice(i, 1);
          i--;
          len--;
        }
      }
    }

    Manager.prototype.removeAnimationBinderByNodeAndAnimation = function (node, animation) {
      var binders = this._aniBinders;
      for (var i = 0, len = binders.length; i < len; ++i) {
        var binder = binders[i];
        if (binder.node === node && binder.animation === animation) {
          binders.splice(i, 1);
          i--;
          len--;
        }
      }
    }

    Manager.prototype.run = function (deltaTime) {
      if (!this._paused) {
        var binders = this._aniBinders;
        for (var i = 0, len = binders.length; i < len; ++i) {
          var binder = binders[i];
          if (binder.execute(deltaTime) && !binder.loop) {
            binders.splice(i, 1);
            i--;
            len--;
          }
        }
      }
    }

    Manager.prototype.destroy = function () {
      this._aniBinders = null;
      this.super('destroy');
    }

    return Manager;

  }
)();