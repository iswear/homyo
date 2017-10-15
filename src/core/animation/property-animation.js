/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../../utils/lang-util';
import BaseAnimation from './base-animation';

export default (
  function () {

    var PropertyAnimation = LangUtil.extend(BaseAnimation);

    PropertyAnimation.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('property', LangUtil.checkAndGet(conf.property, ''));
      this.defineNotifyProperty('targetOffset', LangUtil.checkAndGet(conf.targetOffset, 0));
      this.defineNotifyProperty('offsetFn', LangUtil.checkAndGet(conf.offsetFn, null));
    }

    PropertyAnimation.prototype.execute = function (binder, deltaTime) {
      var propertyOffset = 0, sumTime = 0;
      if (binder.getRunParam('init')) {
        propertyOffset = binder.getRunParam('propertyOffset');
        sumTime = binder.getRunParam('sumTime');
      } else {
        binder.setRunParam('init', true);
        binder.setRunParam('propertyOffset', propertyOffset);
        binder.setRunParam('sumTime', sumTime);
      }
      sumTime += deltaTime;
      var node = binder.node, property = this.property;
      var offset = this.offsetFn.call(node, binder.animation, deltaTime, sumTime);
      if ((offset - this.targetOffset) * (propertyOffset - this.targetOffset) <= 0) {
        binder.setRunParam('init', false);
        node[property] = node[property] + this.targetOffset - propertyOffset;
        return true;
      } else {
        binder.setRunParam('propertyOffset', offset);
        binder.setRunParam('sumTime', sumTime);
        node[property] = node[property] + offset - propertyOffset;
        return false;
      }
    }

    return PropertyAnimation;

  }
)();