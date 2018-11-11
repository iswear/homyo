import core_application from './src/common/core/application';
import core_node from './src/common/core/node';
import core_notifier from './src/common/core/notifier';

import core_io_file_loader from './src/common/core/io/file-loader';

import core_animation_manager from './src/common/core/animation/manager';
import core_animation_binder from './src/common/core/animation/binder';
import core_animation_base_animation from './src/common/core/animation/base-animation';
import core_animation_queue_animation from './src/common/core/animation/queue-animation';
import core_animation_scheduler_animation from './src/common/core/animation/scheduler-animation';
import core_animation_property_animation from './src/common/core/animation/property-animation';

import core_render_canvas_render from './src/common/core/render/canvas/canvas-render';
import core_render_webgl_render from './src/common/core/render/webgl/webgl-render';

import ui_view from './src/common/ui/ui-view';
import ui_label from './src/common/ui/ui-label';

import g_scene from './src/common/game/g-scene';
import g_map from './src/common/game/map/g-map';
import g_model from './src/common/game/model/g-model';
import g_model_node from './src/common/game/model/g-model-node';
import g_texture from './src/common/game/g-texture';
import g_util from './src/common/game/g-util';

import util_event_util from './src/common/utils/event-util';
import util_lang_util from './src/common/utils/lang-util';
import util_matrix_util from './src/common/utils/matrix-util';
import util_platform_util from './src/common/utils/platform-util';
import util_text_util from './src/common/utils/text-util';
import util_timer_util from './src/common/utils/timer-util';
import util_number_util from './src/common/utils/number-util';
import util_geometry_util from './src/common/utils/geometry-util';

export default (
    function() {
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
                Model: g_model,
                ModelNode: g_model_node,
                Texture: g_texture,
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
)()