import core_application from './src/core/application';
import core_node from './src/core/node';
import core_notifier from './src/core/notifier';

import core_io_file_loader from './src/core/io/file-loader';

import core_animation_manager from './src/core/animation/manager';
import core_animation_binder from './src/core/animation/binder';
import core_animation_base_animation from './src/core/animation/base-animation';
import core_animation_queue_animation from './src/core/animation/queue-animation';
import core_animation_scheduler_animation from './src/core/animation/scheduler-animation';
import core_animation_property_animation from './src/core/animation/property-animation';

import core_render_canvas_render from './src/core/render/canvas/canvas-render';
import core_render_webgl_render from './src/core/render/webgl/webgl-render';

import ui_view from './src/ui/ui-view';
import ui_label from './src/ui/ui-label';

import g_scene from './src/game/g-scene';
import g_map from './src/game/map/g-map';
import g_image_map from './src/game/map/g-image-map';
import g_tiled_map from './src/game/map/g-tile-map';
import g_model from './src/game/model/g-model';
import g_texture from './src/game/g-texture';
import g_texture_node from './src/game/g-texture-node';
import g_util from './src/game/g-util';

import util_event_util from './src/utils/event-util';
import util_lang_util from './src/utils/lang-util';
import util_matrix_util from './src/utils/matrix-util';
import util_platform_util from './src/utils/platform-util';
import util_text_util from './src/utils/text-util';
import util_timer_util from './src/utils/timer-util';
import util_number_util from './src/utils/number-util';
import util_geometry_util from './src/utils/geometry-util';

export default (
  function () {
    var homyo = {
      core: {
        Application: core_application,
        Node: core_node,
        Notifier: core_notifier,

        io: {
          FileLoader: core_io_file_loader
        },

        render: {
          CanvasRender: core_render_canvas_render,
          WebglRender: core_render_webgl_render
        },

        animation: {
          Manager: core_animation_manager,
          Binder: core_animation_binder,
          BaseAnimation: core_animation_base_animation,
          QueueAnimation: core_animation_queue_animation,
          SchedulerAnimation: core_animation_scheduler_animation,
          PropertyAnimation: core_animation_property_animation
        }
      },

      ui: {
        View: ui_view,
        Label: ui_label
      },

      game: {
        Scene: g_scene,
        Map: g_map,
        ImageMap: g_image_map,
        TiledMap: g_tiled_map,
        Model: g_model,
        Texture: g_texture,
        TextureNode: g_texture_node,
        Util: g_util
      },

      utils: {
        EventUtil: util_event_util,
        LangUtil: util_lang_util,
        MatrixUtil: util_matrix_util,
        PlatformUtil: util_platform_util,
        TextUtil: util_text_util,
        TimerUtil: util_timer_util,
        NumberUtil: util_number_util,
        GeometryUtil: util_geometry_util
      }
    };

    return homyo;
  }
)();