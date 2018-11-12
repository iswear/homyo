/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../../utils/lang-util';
import Node from '../../core/node';
import GTexture from '../g-texture';

export default (
  function () {
    var functions = (function () {
      
    })();

    var GModelNode = (function () {
      var InnerGModelNode = LangUtil.extend(Node);

      InnerGModelNode.prototype.defLayer = 1;
      
      InnerGModelNode.prototype.defAnchorX = 0.5;
      InnerGModelNode.prototype.defAnchorY = 0.5;
      InnerGModelNode.prototype.defWidth = 0;
      InnerGModelNode.prototype.defHeight = 0;
      InnerGModelNode.prototype.defDirtyRenderSupport = true;
      InnerGModelNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.texture = LangUtil.checkAndGet(conf.texture, null);
        
        this._texture = new GTexture(LangUtil.checkAndGet(conf.texture, {}));
        this.appendChildNodeToLayer(this._texture, 0);
      }

      InnerGModelNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGModelNode;
    })();

    return GModelNode;
  }
)();