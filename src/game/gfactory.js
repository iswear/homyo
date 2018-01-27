/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import GScene from './gscene';
import GMap from './gmap';
import GImageMap from './gimagemap';
import GTiledMap from './gtiledmap';
import GModel from './gmodel';
import GNode from './gmodel';
import GTexture from './gtexture';

export default (
  function () {
    var factory = {
      createScene: function (conf) {
        return new GScene(conf);
      },
      createMap: function (conf) {
        return new GMap(conf);
      },
      createImageMap: function (conf) {
        return new GImageMap(conf);
      },
      createTiledMap: function (conf) {
        return new GTiledMap(conf);
      },
      createModel: function (conf) {
        return new GModel(conf);
      },
      createNode: function (conf) {
        return new GNode(conf);
      },
      createTexture: function (conf) {
        return new GTexture(conf);
      }
    };

    return factory;
  }
)();