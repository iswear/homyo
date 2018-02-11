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
            node.addChildNode(createNode.call(this, children[i]));
          }
        }
        return node;
      }
      function createNodes (conf) {
        if (conf) {
          this._nodeMap = {};
          this._node = createNode.call(this, conf);
        }
      }
      function compileActions (actions) {
        this._actions = {};
        if (actions) {
          for (var i = 0, len = actions.length; i < len; ++i) {
            var modelAction = actions[i];
            var modelActionFrames = modelAction.frames;
            if (modelActionFrames) {
              var nodeCompiledActions = [];
              for (var nodeId in modelActionFrames) {
                var node = this._nodeMap[nodeId];
                var nodeFrames = modelActionFrames[nodeId];
                if (node && nodeFrames) {
                  var animation = GUtil.compileFrames(node, nodeFrames, false);
                  if (animation) {
                    nodeCompiledActions.push({
                      node: node,
                      animation: animation
                    });
                  }
                }
              }
              if (nodeCompiledActions.length > 0) {
                this._actions[modelAction.id] = nodeCompiledActions;
              }
            }
          }
        }
      }
      function runAction () {
        var context = this._actionsContext;
        if (context.runningAct) {
          var actions = context.runningAct;
          context.progress = 0;
          for (var i = 0, len = actions.length; i < len; ++i) {
            var action = actions[i];
            context.progress += 1;
            action.node.runAnimation(action.animation, functions.runActionProgress, this, false);
          }
        }
      }
      function runActionProgress(binder, deltaTime, finish) {
        if (finish) {
          var context = this._actionsContext;
          context.progress -= 1;
          if (context.progress === 0 && context.loop) {
            functions.runAction.call(this);
          }
        }
      }
      return {
        createNodes: createNodes,
        compileActions: compileActions,
        runActionProgress: runActionProgress
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
          runningAct: null,
          progress: 0,
          loop: false
        };

        functions.createNodes.call(this, LangUtil.checkAndGet(conf.root, null));
        functions.compileActions.call(this, LangUtil.checkAndGet(conf.actions, null));
      }

      InnerGModel.prototype.addNode = function (node, nodeId, parentNodeId, prevNodeId) {
        var parentNode = this._nodeMap[parentNodeId];
        if (!parentNode) {
          console.log('Can not find parent node:' + prevNodeId);
          return;
        }
        if (arguments.length > 3) {
          if (prevNodeId === null) {
            parentNode.addChildNode(node, 0);
            this._nameMap[nodeId] = node;
            return;
          } else {
            var prevNode = this._nodeMap[prevNodeId];
            if (!prevNode) {
              console.log('Can not find prev node:' + prevNodeId)
              return;
            }
            var location = parentNode.getChildNodeLocation(prevNode);
            if (!location) {
              console.log('Can not find prev node:' + prevNodeId + ' in parent node:' + parentNodeId)
              return;
            }
            parentNode.addChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
            this._nodeMap[nodeId] = node;
            return;
          }
        } else {
          parentNode.addChildNode(node);
          this._nodeMap[nodeId] = node;
          return;
        }
      }

      InnerGModel.prototype.getNode = function (nodeId) {
        if (arguments.length === 0) {
          return this._node;
        } else {
          return this._nodeMap[nodeId]
        }
      }

      InnerGModel.prototype.removeNode = function (nodeId, destroy) {
        var node = this._nodeMap[nodeId];
        if (!node) {
          return null;
        }
        node.removeFromParent(destroy);
        delete this._nodeMap[nodeId];
        return node;
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
        context.runningActId = actId;
        context.runningAct = this._actions[actId];
        context.loop = loop;
        functions.runAction.call(this);
      }

      InnerGModel.prototype.stopAction = function () {
        var context = this._actionsContext;
        if (context.runningActId != null) {
          this._node.stopAnimation(true);
        }
        context.runningActId = null;
        context.runningAct = null;
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
