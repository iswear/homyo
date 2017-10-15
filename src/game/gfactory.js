/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import GSprite from './gsprite';
import GModel from './gmodel';
import GImageMap from './gimagemap';
import GTiledMap from './gtiledmap';
import GScene from './gscene';

export default (
  function () {

    var factory = {};

    factory.createSprite = function (conf) {
      return new GSprite(conf);
    }

    factory.createModel = function (conf) {
      return new GModel(conf);
    }

    factory.createImageMap = function (conf) {
      return new GImageMap(conf);
    }

    factory.createTiledMap = function (conf) {
      return new GTiledMap(conf);
    }

    factory.createScene = function (conf) {
      return new GScene(conf);
    }

    return factory;

  }
)();