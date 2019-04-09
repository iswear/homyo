/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../../core/notifier';
import Proxy from '../../core/proxy';
import Node from '../../core/node';
import GModelNode from './g-model-node';
import GModelUtil from './g-model-util';

export default (
  function () {
    var functions = (function () {
      function createNodes (nodes) {
        if (conf) {
          var queue = [];
          if (nodes) {
            for (var i = 0, len = nodes.length; i < len; ++i) {
              queue.push({
                parent: this._node,
                conf: nodes[i]
              });
            }
            while (queue.length > 0) {
              var item = queue.unshift();
              var itemConf = item.conf;
              var itemNode = new GModelNode(itemConf.property);
              var itemParent = item.parent;
              var children = itemConf.children;
              if (children) {
                for (var i = 0, len = children.length; i < len; ++i) {
                  queue.push[{
                    parent: itemNode,
                    conf: children[i]
                  }];
                }
              }
              itemParent.appendChildNode(itemNode);
              this._nodeMap[itemConf.id] = itemNode;
            }
          }
        }
      }

      function compileActions (actionGroups) {
        if (actionGroups) {
          // 动画分组路由
          // 动画编译
          for (var i = 0, len = actionGroups.length; i < len; ++i) {
            var actionGroup = actionGroups[i];
            var actions = actionGroup.actions;
            if (!actions) {
              continue;
            }
            for (var i = 0, leng = actions.length; j < leng; ++i) {
              var action = actions[i];
              var frames = action.frames;
              if (!frames) {
                continue;
              }
              var compiledActions = [];
              for (var nodeId in frames) {
                var nodeFrames = frames[nodeId];
                if (!nodeFrames) {
                  continue;
                }
                var node = this._nodeMap[nodeId];
                var animation = GModelUtil.compilePropertiesFrames(node, nodeFrames);
                if (animation) {
                  compiledActions.push({node: node, animation: animation});
                }
              }
              if (compileActions.length > 0) {
                this._actionMap[action.id] = compiledActions;
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
            action.node.runAnimation(action.animation, runActionProgress, this, false);
          }
        }
      }

      function runActionProgress (binder, deltaTime, finish) {
        if (finish) {
          var context = this._actionsContext;
          context.progress -= 1;
          if (context.progress === 0 && context.loop) {
            runAction.call(this);
          }
        }
      }

      return 
        createNodes: createNodes,
        compileActions: compileActions
      }
    })();

    var GModel = (function () {
      var InnerGModel = LangUtil.extend(Notifier);

      InnerGModel.prototype.defName = 'model';
      InnerGModel.prototype.defDirtyRenderSupport = true;
      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.id = LangUtil.checkAndGet(conf.id, 1);
        this.name = LangUtil.checkAndGet(conf.name, this.defName);
        this.skin = new Proxy(LangUtil.checkAndGet(conf.skin, {}));
        
        this._node = new Node({
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          shearX: 0,
          shearY: 0,
          rotateZ: 0,
          anchorX: .5,
          anchorY: .5,
          width: 0,
          height: 0,
          alpha: 1,
          visible: true,
          clip: false,
          interactive: true
        });
        this._nodeMap = {};
        this._actionMap = {};
        this._actionRoute = {};
        this._actionContext = {
          runningActionId: null,
          runningAction: null,
          progress: 0,
          loop: false
        };

        functions.createNodes.call(this, LangUtil.checkAndGet(conf.nodes, {}));
        functions.compileActions.call(this, LangUtil.checkAndGet(conf.actionGroups, null));
      }

      InnerGModel.prototype.getNode = function (nodeId) {
        if (arguments.length === 0) {
          return this._node;
        } else {
          return this._nodeMap[nodeId]
        }
      }

      InnerGModel.prototype.addNode = function (node, nodeId, parentNodeId, prevNodeId) {
        var parentNode = this._nodeMap[parentNodeId];
        if (!parentNode) {
          console.log('Can not find parent node:' + prevNodeId);
          return;
        }
        if (arguments.length > 3) {
          if (prevNodeId === null) {
            parentNode.appendChildNodeToLayer(node, 0);
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
            parentNode.appendChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
            this._nodeMap[nodeId] = node;
            return;
          }
        } else {
          parentNode.appendChildNode(node);
          this._nodeMap[nodeId] = node;
          return;
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

      InnerGModel.prototype.runAction = function (actionId, startTime, loop) {
        var context = this._actionsContext;
        if (actionId === context.runningActId) {
          return;
        }
        this.stopAction();
        context.runningActId = actionId;
        context.runningAct = this._actions[actionId];
        context.loop = loop;
        functions.runAction.call(this, startTime);
      }

      InnerGModel.prototype.stopAction = function () {
        var context = this._actionsContext;
        if (context.runningActId !== null) {
          this._node.stopAnimation(true);
        }
        context.runningActId = null;
        context.runningAct = null;
        context.progress = 0;
        context.loop = false;
      }

      InnerGModel.prototype.destroy = function () {
        this._node.destroy();
        this._nodeMap = null;
        this._actions = null;
        this._actionsContext = null;
        this.super('destroy');
      }

      return InnerGModel;
    })();

    return GModel;
  }
)();
