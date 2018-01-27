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

    var GNode = (function () {
      var InnerGNode = LangUtil.extend(Node);

      InnerGNode.prototype.defLayer = 1;
      InnerGNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('actId', LangUtil.checkAndGet(conf.actId, null));
        this.defineNotifyProperty('model', LangUtil.checkAndGet(conf.model, null));

        this._texture = new GTexture(LangUtil.checkAndGet(conf.texture, {}));

        this.addChildNodeToLayer(this._texture, 0);
      }

      InnerGNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGNode;
    })();

    return GNode;
  }
)();