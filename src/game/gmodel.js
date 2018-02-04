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
      function createNode(conf, nodeMap) {
        var node = new this.nodeConstructor(conf[this.nodeConf]);
        if (conf.id) {
          nodeMap[conf.id] = node;
        }
        if (conf.children) {
          var children = conf.children;
          for (var i = 0, len = children.length; i < len; ++i) {
            var childNode = createNode(model, children[i], nodeMap);
            node.addChildNode(childNode.root);
          }
        }
        return node;
      }
      function createNodes (modelRoot) {
        if (modelRoot) {
          this._nodeMap = {};
          this._node = createNode.call(this, modelRoot, this._nodeMap);
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

      InnerGModel.prototype.defNodeConf = 'node';
      InnerGModel.prototype.defNodeConstructor = GNode;
      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('nodeKey', LangUtil.checkAndGet(conf.nodeConf, this.defNodeConf))
        this.defineNotifyProperty('nodeConstructor', LangUtil.checkAndGet(conf.nodeConstructor, this.defNodeConstructor))

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

      InnerGModel.prototype.addNode = function (nodeId, node, parentNodeId, prevNodeId) {
        if (node && parentNodeId) {
          const parentNode = this._nodeMap[parentNodeId];
          if (parentNode) {
            if (arguments.length > 2) {
              const prevNode = this._nodeMap[prevNodeId];
              if (prevNode) {
                const location = parentNode.getChildNodeLocation(prevNode);
                if (location) {
                  parentNode.addChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
                  this._nodeMap[nodeId] = node;
                } else {
                  throw new Error('can not find prevNode:' + prevNodeId + ' in parentNode:' + parentNodeId);
                }
              } else {
                throw new Error('can not find previous node, please check the previousId:' + prevNodeId);
              }
            } else {
              parentNode.addChildNode(new GNode(nodeConf), 0);
              this._nodeMap[nodeId] = node;
            }
          } else {
            throw new Error('can not find parent node, please check the parentId:' + parentNodeId);
          }
        }
      }

      InnerGModel.prototype.getNode = function (nodeId) {
        if (arguments.length > 0) {
          return this._nodeMap[nodeId];
        } else {
          this._node;
        }
      }

      InnerGModel.prototype.removeNode = function (nodeId, destroy) {
        const node = this._nodeMap[nodeId];
        if (node) {
          delete this._nodeMap[nodeId];
          node.removeFromParent(destroy);
          return node;
        } else {
          return null;
        }
      }

      InnerGModel.prototype.addAction = function (actId) {
        this._actions[actId] = null;
      }

      InnerGModel.prototype.removeAction = function (actId) {
        delete this._actions[actId]
      }

      InnerGModel.prototype.compileAndSetAction = function (actConf) {
        var nodeActions = []
        var modelActFrames = actConf.frames;
        for (var nodeId in modelActFrames) {
          var node = this._nodeMap[nodeId];
          var nodeActFrames = modelActFrames[nodeId];
          if (node && nodeAction) {
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
          this._nodeRoot.stopAnimation(true);
        }
        context.runningActId = null;
        context.progress = 0;
        context.loop = false;
      }

      InnerGModel.prototype.destroy = function (conf) {
        this.super('destroy');
      }

      return InnerGModel;
    })();

    return GModel;
  }
)();
