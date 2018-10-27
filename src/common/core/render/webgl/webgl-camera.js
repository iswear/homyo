import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';
import MatrixUtil from '../../../utils/matrix-util';

export default (
  function () {
    var M3D = MatrixUtil.m3d;

    var WebglCamera = (function () {
      var InnerWebglCamera = LangUtil.extend(Notifier);

      InnerWebglCamera.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.eye = LangUtil.checkAndGet(conf.eye, [0, 0, 0]);
        this.look = LangUtil.checkAndGet(conf.look, [0, 0, -1]);
        this.up = LangUtil.checkAndGet(conf.up, [0, 1, 0])
      }

      InnerWebglCamera.prototype.translate = function (x, y, z) {
        this.eye[0] += x;
        this.eye[1] += y;
        this.eye[2] += z;
      }
      
      return InnerWebglCamera;
    })();

    return WebglCamera;
  }
)();
