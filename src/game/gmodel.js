/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */
import LangUtil from '../utils/lang-util';
import GUtil from './gutil';
import GSprite from './gsprite';


export default (
  function () {

    var GModel = LangUtil.extend(GSprite);

    GModel.prototype.init = function (conf) {
      this.super('init', [conf]);
      this._actions = {};
      create_modelSprite.call(this, this, conf, true);
    }

    GModel.prototype.runActionOfName = function (name, loop) {
      var actions = this._actions[name];
      if (actions) {
        for (var i = 0, len = actions.length; i < len; ++i) {
          var action = actions[i];
          action.node.runAnimation(action.animation, null, null, loop);
        }
      }
    }

    GModel.prototype.stopActionOfName = function (name) {
      var actions = this._actions[name];
      if (actions) {
        for (var i = 0, len = actions.length; i < len; ++i) {
          var action = actions[i];
          action.node.stopAnimation(action.animation);
        }
      }
    }
    
    function create_modelSprite(sprite, conf, model) {
      var anis = conf.animations;
      for (var name in anis) {
        if (!this._actions[name]) {
          this._actions[name] = [];
        }
        this._actions[name].push({
          node: sprite,
          animation: GUtil.compileFrames(sprite, anis[name], model)
        });
      }
      var children = conf.children;
      if (children && children.length > 0) {
        for (var i = 0, len = children.length; i < len; ++i) {
          var childSprite = new GSprite(children[i]);
          sprite.addChildNode(childSprite);
          create_modelSprite.call(this, childSprite, children[i], false);
        }
      }
    }

    return GModel;

  }

)();