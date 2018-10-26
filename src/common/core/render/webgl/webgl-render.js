/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';

export default (function () {
    var functions = (function () {
      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (onEventsMap.hasOwnProperty(name)) {
          onEventsMap[name].call(this, newVal, oldVal)
        }
      }
      
      function onViewPortChanged () {
        this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
      }
      
      var onEventsMap = {
        viewPortX: onViewPortChanged,
        viewPortY: onViewPortChanged,
        viewPortWidth: onViewPortChanged,
        viewPortHeight: onViewPortChanged
      }

      return {
        onPropertyChanged: onPropertyChanged,
        onViewPortChanged: onViewPortChanged
      }
    })();

    var WebglRender = (function () {
      var InnerWebglRender = LangUtil.extend(Notifier);

      InnerWebglRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.viewPortX = LangUtil.checkAndGet(conf.x, 0);
        this.viewPortY = LangUtil.checkAndGet(conf.y, 0);
        this.viewPortWidth = LangUtil.checkAndGet(conf.width, this.$canvas.width);
        this.viewPortHeight = LangUtil.checkAndGet(conf.height, this.$canvas.height);

        this._canvas = LangUtil.checkAndGet(conf.canvas, null);
        this._context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');
        this._shaderProgram = this._context.createProgram();
        this._vertexShader = null;
        this._fragmentShader = null;

        functions.onViewPortChanged.call(this);
        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerWebglRender.prototype.useProgram = function (vertexShader, fragmentShader) {

      }
      
      InnerWebglRender.prototype.translate = function () {

      }

      InnerWebglRender.prototype.rotate = function () {

      }

      InnerWebglRender.prototype.scale = function () {

      }

      InnerWebglRender.prototype.shear = function () {

      }

      InnerWebglRender.prototype.lookAt = function () {

      }

      // InnerWebglRender.prototype.createAndCompileShader = function (type, source) {
      //   var shader = this.$context.createShader(type);
      //   this.$context.shaderSource(shader, source);
      //   this.$context.compileShader(shader);
      //   return shader;
      // }

      // InnerWebglRender.prototype.attachAndLinkShaderProgram = function (vShader, fShader) {
      //   var shaderProgram = this.$context.createProgram();
      //   shaderProgram.attachShader(shaderProgram, vShader);
      //   shaderProgram.attachShader(shaderProgram, fShader);
      //   this.$context.linkProgram(shaderProgram);
      //   return shaderProgram;
      // }

      return InnerWebglRender;
    })();

    return WebglRender;
  }
)();