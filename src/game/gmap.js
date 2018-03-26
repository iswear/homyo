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

      // InnerGMap.prototype.getRectDirty = function (renderZone) {
        // var p1 = this.transformLVectorToW([rectInLocal.left, rectInLocal.top]);
        // var p2 = this.transformLVectorToW([rectInLocal.left, rectInLocal.bottom]);
        // var p3 = this.transformLVectorToW([rectInLocal.right, rectInLocal.top]);
        // var p4 = this.transformLVectorToW([rectInLocal.right, rectInLocal.bottom]);
        // rectInWorld.top = Math.min(Math.min(p1[1], p2[1]), Math.min(p3[1], p4[1]));
        // rectInWorld.bottom = Math.max(Math.max(p1[1], p2[1]), Math.max(p3[1], p4[1]));
        // rectInWorld.left = Math.min(Math.min(p1[0], p2[0]), Math.min(p3[0], p4[0]));
        // rectInWorld.right = Math.max(Math.max(p1[0], p2[0]), Math.max(p3[0], p4[0]));
        // rectInWorld.width = rectInWorld.right - rectInWorld.left;
        // rectInWorld.height = rectInWorld.bottom - rectInWorld.top;
        // return {
        //   top: ,
        //   bottom: ,
        //   left: ,
        //   right: ,
        //   width: ,
        //   height:
        // }
      // }

      InnerGMap.prototype.checkEventInteractZone = function (name, e, x, y) {
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