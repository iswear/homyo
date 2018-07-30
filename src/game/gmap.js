/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */

import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {

    var GMap = (function () {
      var InnerGMap = LangUtil.extend(Node);

      InnerGMap.prototype.defWidth = 0;
      InnerGMap.prototype.defHeight = 0;
      InnerGMap.prototype.defAnchorX = 0;
      InnerGMap.prototype.defAnchorY = 0;
      InnerGMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('containerLeft', LangUtil.checkAndGet(conf.containerLeft, -Infinity));
        this.defineNotifyProperty('containerRight', LangUtil.checkAndGet(conf.containerRight, -Infinity));
        this.defineNotifyProperty('containerTop', LangUtil.checkAndGet(conf.containerTop, Infinity));
        this.defineNotifyProperty('containerBottom', LangUtil.checkAndGet(conf.containerBottom, Infinity));

        this._models = [];
      }

      InnerGMap.prototype.checkEventTrigger = function (name, e, x, y) {
        return true;
      }

      InnerGMap.prototype.addModel = function (model, x, y, layerIndex) {

      }

      InnerGMap.prototype.removeModel = function (model, x, y, layerIndex) {

      }

      return InnerGMap;
    })();

    return GMap;
  }
)();