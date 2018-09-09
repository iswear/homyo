/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import BaseAnimation from './base-animation';
import Binder from './binder';

export default (
  function () {
    var QueueAnimation = (function () {
      var InnerQueueAnimation = LangUtil.extend(BaseAnimation);

      InnerQueueAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('animations', LangUtil.checkAndGet(conf.animations, []));
        this.defineNotifyProperty('sync', LangUtil.checkAndGet(conf.sync, false));
      }

      InnerQueueAnimation.prototype.execute = function (binder, deltaTime) {
        var binders;
        if (binder.getRunParam('init')) {
          binders = binder.getRunParam('binders');
        } else {
          var node = binder.node;
          var animations = this.animations;
          binders = [];
          for (var i = 0, len = animations.length; i < len; ++i) {
            binders.push(new Binder({
              node: node,
              animation: animations[i]
            }));
          }
          binder.setRunParam('init', true);
          binder.setRunParam('binders', binders);
        }
        if (binders.length === 0) {
          binder.setRunParam('init', false);
          binder.setRunParam('binders', null);
          return true;
        } else {
          if (this.sync) {
            if (binders[0].execute(deltaTime)) {
              binders.splice(0, 1);
            }
          } else {
            for (var i = binders.length - 1; i >= 0; --i) {
              if (binders[i].execute(deltaTime)) {
                binders.splice(i, 1);
              }
            }
          }
          return false;
        }
      }

      InnerQueueAnimation.prototype.destroy = function () {
        this.animations = null;
        this.super('destroy');
      }

      return InnerQueueAnimation;
    })();

    return QueueAnimation;
  }
)();