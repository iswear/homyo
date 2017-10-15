/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';

export default (

  function () {

    var WebglRender = LangUtil.extend(Notifier);

    WebglRender.prototype.init = function (conf) {
      this.super('init', [ conf ]);
      this.$canvas = LangUtil.checkAndGet(conf.canvas, null);
      this.$context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');

      this.defineNotifyProperty('viewPortX', LangUtil.checkAndGet(conf.x, 0));
      this.defineNotifyProperty('viewPortY', LangUtil.checkAndGet(conf.y, 0));
      this.defineNotifyProperty('viewPortWidth', LangUtil.checkAndGet(conf.width, this.$canvas.width));
      this.defineNotifyProperty('viewPortHeight', LangUtil.checkAndGet(conf.height, this.$canvas.height));

      sync_viewPort.call(this);

      this.addObserver('viewPortXChanged', sync_viewPort, this, this);
      this.addObserver('viewPortYChanged', sync_viewPort, this, this);
      this.addObserver('viewPortWidthChanged', sync_viewPort, this, this);
      this.addObserver('viewPortHeightChanged', sync_viewPort, this, this);
    }

    WebglRender.prototype.createAndCompileShader = function (type, source) {
      var shader = this.$context.createShader(type);
      this.$context.shaderSource(shader, source);
      this.$context.compileShader(shader);
      return shader;
    }

    WebglRender.prototype.attachAndLinkShaderProgram = function (vShader, fShader) {
      var shaderProgram = this.$context.createProgram();
      shaderProgram.attachShader(shaderProgram, vShader);
      shaderProgram.attachShader(shaderProgram, fShader);
      this.$context.linkProgram(shaderProgram);
      return shaderProgram;
    }




    function sync_viewPort() {
      this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
    }


    return WebglRender;

  }

)();