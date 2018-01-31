/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */
import LangUtil from '../utils/lang-util';
import Notifier from '../core/notifier';
import GUtil from './gutil';
import GNode from './gnode';


export default (
  function () {
    var functions = (function () {
      function createModelNodes (model, conf, nodeMap) {
        var node = new GNode(conf);
        if (conf.children) {
          var children = conf.children;
          for (var i = 0, len = children.length; i < len; ++i) {
            var childNode = createModelNodes(model, children[i], nodeMap);
            node.addChildNode(childNode.root);
          }
        }
        node.model = model;
        if (conf.actId) {
          nodeMap[conf.actId] = node;
        }
        return {
          root: node,
          map: nodeMap
        };
      }

      function compileModelActions (actions, nodeMap) {
        var compiledActions = {};
        if (actions) {
          for (var i = 0, len = actions.length; i < len; ++i) {
            var action = actions[i];
            if (action) {
              var name = action.name;
              var nodeActions = action.action;
              compiledActions[name] = [];
              for (var actId in nodeActions) {
                var node = nodeMap[actId];
                var nodeAction = nodeActions[actId];
                if (node) {
                  var animation = GUtil.compileFrames(node, nodeAction, false);
                  if (animation) {
                    compiledActions[name].push({
                      node: node,
                      animation: animation
                    })
                  }
                }
              }
            }
          }
        }
        return compiledActions;
      }
      
      function actionRunProgress (binder, deltaTime, finish) {
        if (finish) {
          this._actionProgress -= 1;
          if (this._actionProgress === 0 && this._actionLoop) {
            this.runAction(this._actionRunning);
          }
        }
      }

      return {
        createModelNodes: createModelNodes,
        compileModelActions: compileModelActions,
        actionRunProgress: actionRunProgress
      };
    })();

    var GModel = (function () {
      var InnerGModel = LangUtil.extend(Notifier);

      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('modelId', LangUtil.checkAndGet(conf.bizId, null));

        this._nodes = functions.createModelNodes(this, LangUtil.checkAndGet(conf.nodes, {}), {});
        this._actions = functions.compileModelActions(conf.actions);
        this._actionRunning = null;
        this._actionProgress = 0;
        this._actionLoop = false;
      }

      InnerGModel.prototype.getNodeByNodeId = function (nodeId) {
        return this._nodes.map[nodeId];
      }

      InnerGModel.prototype.runAction = function (name, loop) {
        var actions = this._actions[name];
        if (name === this._actionRunning) {
          return;
        }
        if (actions) {
          this.stopAction();
          if (actions.length > 0) {
            this._actionLoop = loop;
            this._actionRunning = name;
            for (var i = 0, len = actions.length; i < len; ++i) {
              var action = actions[i];
              this._actionProgress += 1;
              action.node.runAnimation(action.animation, functions.actionRunProgress, this, false);
            }
          }
        }
      }

      InnerGModel.prototype.stopAction = function () {
        if (this._actionRunning != null) {
          this._actionRunning = null;
          this._actionProgress = 0;
          this._actionLoop = false;
          this._nodes.root.stopAnimation(true);
        }
      }

      return InnerGModel;
    })();

    return GModel;
  }
)();