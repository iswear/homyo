/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (function () {
    var GScene = (function () {
      var InnerGScene = LangUtil.extend(Node);

      InnerGScene.prototype.defLayer = 1;
      InnerGScene.prototype.defAnchorX = 0;
      InnerGScene.prototype.defAnchorY = 0;

      return InnerGScene;
    })();

    return GScene;
  }
)();