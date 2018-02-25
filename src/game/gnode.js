/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';
import GTexture from './gtexture';

export default (
  function () {
    var functions = (function () {
      function syncImg (sender, newVal, oldVal) {
        this._texture.img = newVal;
      }

      return {
        syncImg: syncImg
      }
    })();

    var GNode = (function () {
      var InnerGNode = LangUtil.extend(Node);

      InnerGNode.prototype.defLayer = 1;
      InnerGNode.prototype.defAnchorX = 0.5;
      InnerGNode.prototype.defAnchorY = 0.5;
      InnerGNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, null));

        this._texture = new GTexture(LangUtil.checkAndGet(conf.texture, {}));
        this.addChildNodeToLayer(this._texture, 0);

        functions.syncImg.call(this, this, this.img, null)

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      InnerGNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGNode;
    })();

    return GNode;
  }
)();