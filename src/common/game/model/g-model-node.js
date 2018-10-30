/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../../utils/lang-util';
import Node from '../../core/node';
import GTexture from '../g-texture';

export default (function () {
    var GTextureNode = (function () {
      var InnerGTextureNode = LangUtil.extend(Node);

      InnerGTextureNode.prototype.defLayer = 1;
      InnerGTextureNode.prototype.defAnchorX = 0.5;
      InnerGTextureNode.prototype.defAnchorY = 0.5;
      InnerGTextureNode.prototype.init = function (conf) {
        this.super('init', [conf]);

        this._texture = new GTexture(LangUtil.checkAndGet(conf.texture, {}));
        this.appendChildNodeToLayer(this._texture, 0);
      }

      InnerGTextureNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGTextureNode;
    })();

    return GTextureNode;
  }
)();