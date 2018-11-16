/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';
import MatrixUtil from '../../../utils/matrix-util';

export default (
  function () {
    var M3D = MatrixUtil.m3d;
    var functions = (function () {
      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal)
        }
      }
      
      function onViewPortChanged () {
        this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
      }
      
      var propertyChangedMap = {
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
        this.x = LangUtil.checkAndGet(conf.x, 0);
        this.y = LangUtil.checkAndGet(conf.y, 0);
        this.width = LangUtil.checkAndGet(conf.width, this.$canvas.width);
        this.height = LangUtil.checkAndGet(conf.height, this.$canvas.height);

        this._canvas = LangUtil.checkAndGet(conf.canvas, null);
        this._context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');
        this._program = this._context.createProgram();
        this._vertexShader = null;
        this._fragmentShader = null;

        functions.onViewPortChanged.call(this);
        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerWebglRender.prototype.useProgram = function (vertexShader, fragmentShader) {
        var gl = this._context;
        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._vertexShader, vertexShader);
        gl.compileShader(this._vertexShader);
        if (!gl.getShaderParameter(this._vertexShader, gl.COMPILE_STATUS)) {
          console.error('error compile vertex shader');
        }
        gl.shaderSource(this._fragmentShader, fragmentShader);
        gl.compileShader(this._fragmentShader);
        if (!gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS)) {
          console.error('error compile fragment shader');
        }
        this._program = gl.createProgram();
        gl.attachShader(this._program, this._vertexShader);
        gl.attachShader(this._program, this._fragmentShader);
        gl.linkProgram(this._program); 
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