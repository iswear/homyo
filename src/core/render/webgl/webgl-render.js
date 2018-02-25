/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';

export default (
  function () {
    var functions = (function () {
      function syncViewPort () {
        this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
      }
      
      return {
        syncViewPort: syncViewPort
      }
    })();

    var WebglRender = (function () {
      var InnerWebglRender = LangUtil.extend(Notifier);

      InnerWebglRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.$canvas = LangUtil.checkAndGet(conf.canvas, null);
        this.$context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');

        this.defineNotifyProperty('viewPortX', LangUtil.checkAndGet(conf.x, 0));
        this.defineNotifyProperty('viewPortY', LangUtil.checkAndGet(conf.y, 0));
        this.defineNotifyProperty('viewPortWidth', LangUtil.checkAndGet(conf.width, this.$canvas.width));
        this.defineNotifyProperty('viewPortHeight', LangUtil.checkAndGet(conf.height, this.$canvas.height));

        functions.syncViewPort.call(this);

        this.addObserver('viewPortXChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortYChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortWidthChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortHeightChanged', functions.syncViewPort, this, this);
      }

      InnerWebglRender.prototype.createAndCompileShader = function (type, source) {
        var shader = this.$context.createShader(type);
        this.$context.shaderSource(shader, source);
        this.$context.compileShader(shader);
        return shader;
      }

      InnerWebglRender.prototype.attachAndLinkShaderProgram = function (vShader, fShader) {
        var shaderProgram = this.$context.createProgram();
        shaderProgram.attachShader(shaderProgram, vShader);
        shaderProgram.attachShader(shaderProgram, fShader);
        this.$context.linkProgram(shaderProgram);
        return shaderProgram;
      }

      return InnerWebglRender;
    })();

    return WebglRender;
  }
)();