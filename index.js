
import Core_Application from './src/core/application';
import Core_Node from './src/core/node';
import Core_Notifier from './src/core/notifier';

import Core_IO_FileLoader from './src/core/io/file-loader';

import Core_Animation_Manager from './src/core/animation/manager';
import Core_Animation_Binder from './src/core/animation/binder';
import Core_Animation_BaseAnimation from './src/core/animation/base-animation';
import Core_Animation_QueueAnimation from './src/core/animation/queue-animation';
import Core_Animation_SchedulerAnimation from './src/core/animation/scheduler-animation';
import Core_Animation_PropertyAnimation from './src/core/animation/property-animation';

import Core_Render_CanvasRender from './src/core/render/canvas/canvas-render';
import Core_Render_WebglRender from './src/core/render/webgl/webgl-render';

import UI_Node from './src/ui/uinode';
import UI_Label from './src/ui/uilabel';

import G_Scene from './src/game/gscene';
import G_Map from './src/game/gmap';
import G_ImageMap from './src/game/gimagemap';
import G_TiledMap from './src/game/gtiledmap';
import G_Model from './src/game/gmodel';
import G_Node from './src/game/gnode';
import G_Texture from './src/game/gtexture';

import Util_EventUtil from './src/utils/event-util';
import Util_LangUtil from './src/utils/lang-util';
import Util_MatrixUtil from './src/utils/matrix-util';
import Util_PlatformUtil from './src/utils/platform-util';
import Util_TextUtil from './src/utils/text-util';
import Util_TimerUtil from './src/utils/timer-util';

export default (
  function () {

    var homyo = {

      core: {
        Application: Core_Application,
        Node: Core_Node,
        Notifier: Core_Notifier,

        io: {
          FileLoader: Core_IO_FileLoader
        },

        render: {
          CanvasRender: Core_Render_CanvasRender,
          WebglRender: Core_Render_WebglRender
        },

        animation: {
          Manager: Core_Animation_Manager,
          Binder: Core_Animation_Binder,
          BaseAnimation: Core_Animation_BaseAnimation,
          QueueAnimation: Core_Animation_QueueAnimation,
          SchedulerAnimation: Core_Animation_SchedulerAnimation,
          PropertyAnimation: Core_Animation_PropertyAnimation
        }
      },

      ui: {
        Node: UI_Node,
        Label: UI_Label
      },

      game: {
        Scene: G_Scene,
        Map: G_Map,
        ImageMap: G_ImageMap,
        TiledMap: G_TiledMap,
        Model: G_Model,
        Node: G_Node,
        Texture: G_Texture
      },

      utils: {
        EventUtil: Util_EventUtil,
        LangUtil: Util_LangUtil,
        MatrixUtil: Util_MatrixUtil,
        PlatformUtil: Util_PlatformUtil,
        TextUtil: Util_TextUtil,
        TimerUtil: Util_TimerUtil
      }

    };

    return homyo;

  }
)();