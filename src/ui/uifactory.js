/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import UINode from './uinode';
import UILabel from './uilabel';

export default (
  function () {

    var factory = {};

    factory.createNode = function (conf) {
      return new UINode(conf);
    }
    
    factory.createLabel = function (conf) {
      return new UILabel(conf);
    }

    return factory;
    
  }
)();