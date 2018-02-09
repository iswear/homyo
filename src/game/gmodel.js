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
      function createNode(conf) {
        var node = new GNode(conf.node);
        if (conf.id) {
          this._nodeMap[conf.id] = node;
        }
        if (conf.children) {
          var children = conf.children;
          for (var i = 0, len = children.length; i < len; ++i) {
            var childNode = createNode.call(this, children[i]);
            node.addChildNode(childNode);
          }
        }
        return node;
      }
      function createNodes (modelRoot) {
        if (modelRoot) {
          this._nodeMap = {};
          this._node = createNode.call(this, modelRoot);
        }
      }
      function compileActions (modelActions) {
        if (modelActions) {
          var compiledActions = {};
          if (modelActions) {
            for (var i = 0, len = modelActions.length; i < len; ++i) {
              var modelAct = modelActions[i];
              if (modelAct) {
                var nodeActions = []
                var modelActFrames = modelAct.frames;
                for (var nodeId in modelActFrames) {
                  var node = this._nodeMap[nodeId];
                  var nodeActFrames = modelActFrames[nodeId];
                  if (node && nodeActFrames) {
                    var animation = GUtil.compileFrames(node, nodeActFrames, false);
                    if (animation) {
                      nodeActions.push({
                        node: node,
                        animation: animation
                      })
                    }
                  }
                }
                if (nodeActions.length > 0) {
                  compiledActions[modelAct.id] = nodeActions;
                }
              }
            }
          }
          this._actions = compiledActions;
        }
      }
      function actionRunProgress(binder, deltaTime, finish) {
        if (finish) {
          var context = this._actionsContext;
          context.progress -= 1;
          if (context.progress === 0 && context.loop) {
            this.runAction(context.runningActId);
          }
        }
      }
      return {
        createNodes: createNodes,
        compileActions: compileActions,
        actionRunProgress: actionRunProgress
      }
    })();


    /**
     * var exampleConf = {
     *   id: '模型id',
     *   name: '模型名称',
     *   root: {
     *     id: '',
     *     node: {
     *       x: '',
     *       y: '' ...
     *     },
     *     info: {
     *       name: '模型名称'
     *     },
     *     ctrl: {
     *       height: ''
     *     },
     *     children: [
     *       {
     *         node: {},
     *         info: {},
     *         ctrl: {},
     *         children: []
     *       }
     *     ]
     *   },
     *   actions: [
     *     {
     *       id: '',
     *       name: '',
     *       frames: {
     *
     *       }
     *     }
     *   ]
     * }
     */
    var GModel = (function () {
      var InnerGModel = LangUtil.extend(Notifier);

      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);

        this._node = null;
        this._nodeMap = null;

        this._actions = null;
        this._actionsContext = {
          runningActId: null,
          progress: 0,
          loop: false
        };

        functions.createNodes.call(this, LangUtil.checkAndGet(conf.root, null));
        functions.compileActions.call(this, LangUtil.checkAndGet(conf.actions, null));
      }

      InnerGModel.prototype.addNode = function (node, nodeId, parentNodeId, prevNodeId) {
        const parentNode = this._nodeMap[parentNodeId];
        if (parentNode) {
          if (arguments.length > 3) {
            const prevNode = this._nodeMap[prevNodeId];
            if (prevNode) {
              const location = parentNode.getChildNodeLocation(prevNode);
              if (location) {
                parentNode.addChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
                this._nodeMap[nodeId] = node;
                return;
              }
            }
          } else {
            parentNode.addChildNode(node, 0);
            this._nodeMap[nodeId] = node;
            return;
          }
        }
        console.log('Add node failed parentNodeId:' + parentNodeId + ' prevNodeId:' + prevNodeId);
      }

      InnerGModel.prototype.getNode = function (nodeId) {
        return this._nodeMap[nodeId]
      }

      InnerGModel.prototype.removeNode = function (nodeId, destroy) {
        var node = this._nodeMap[nodeId];
        if (node) {
          node.removeFromParent(destroy);
          delete this._nodeMap[nodeId];
        }
      }

      InnerGModel.prototype.compileAndSetAction = function (actConf) {
        var nodeActions = []
        var modelActFrames = actConf.frames;
        for (var nodeId in modelActFrames) {
          var node = this._nodeMap[nodeId];
          var nodeActFrames = modelActFrames[nodeId];
          if (node && nodeActFrames) {
            var animation = GUtil.compileFrames(node, nodeActFrames, false);
            if (animation) {
              nodeActions.push({
                node: node,
                animation: animation
              })
            }
          }
        }
        if (nodeActions.length > 0) {
          this._actions[actConf.id] = nodeActions;
        } else {
          delete this._actions[actConf.id];
        }
      }

      InnerGModel.prototype.runAction = function (actId, loop) {
        var context = this._actionsContext;
        if (name === context.runningActId) {
          return;
        }
        this.stopAction();
        var actions = this._actions[actId];
        if (actions) {
          if (actions.length > 0) {
            context.runningActId = actId;
            context.loop = loop;
            for (var i = 0, len = actions.length; i < len; ++i) {
              var action = actions[i];
              context.progress += 1;
              action.node.runAnimation(action.animation, functions.actionRunProgress, this, false);
            }
          }
        }
      }

      InnerGModel.prototype.stopAction = function () {
        var context = this._actionsContext;
        if (context.runningActId != null) {
          this._node.stopAnimation(true);
        }
        context.runningActId = null;
        context.progress = 0;
        context.loop = false;
      }

      InnerGModel.prototype.destroy = function () {
        this.super('destroy');
      }

      return InnerGModel;
    })();

    return GModel;
  }
)();
