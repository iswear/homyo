/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';

export default (
  function () {

    var CanvasRender = LangUtil.extend(Notifier);

    CanvasRender.prototype.init = function (conf) {
      this.super('init', [ conf ]);
      this.$canvas = LangUtil.checkAndGet(conf.canvas, null);
      this.$context = this.$canvas.getContext('2d');

      this.defineCanvasProperty('width', LangUtil.checkAndGet(conf.width, this.$canvas.width), false);
      this.defineCanvasProperty('height', LangUtil.checkAndGet(conf.height, this.$canvas.width), false);
      this.defineCanvasProperty('clientWidth', undefined, true);
      this.defineCanvasProperty('clientHeight', undefined, true);
      this.defineContextProperty('fillStyle');
      this.defineContextProperty('strokeStyle');
      this.defineContextProperty('shadowColor');
      this.defineContextProperty('shadowBlur');
      this.defineContextProperty('shadowOffsetX');
      this.defineContextProperty('shadowOffsetY');
      this.defineContextProperty('lineCap');
      this.defineContextProperty('lineJoin');
      this.defineContextProperty('lineWidth');
      this.defineContextProperty('miterLimit');
      this.defineContextProperty('font');
      this.defineContextProperty('textAlign');
      this.defineContextProperty('textBaseline');
      this.defineContextProperty('globalAlpha');
      this.defineContextProperty('globalCompositeOperation');

      
    }

    CanvasRender.prototype.getCanvas = function () {
      return this.$canvas;
    }

    CanvasRender.prototype.getContext = function () {
      return this.$context;
    }

    CanvasRender.prototype.defineContextProperty = function (name, value, readonly) {
      this.defineCustomProperty(
        name,
        this.$context,
        value,
        contextPropertyGetter(name),
        readonly ? undefined : contextPropertySetter(name)
      );
    }

    CanvasRender.prototype.defineCanvasProperty = function (name, value, readonly) {
      this.defineCustomProperty(
        name,
        this.$canvas,
        value,
        canvasPropertyGetter(name),
        readonly ? undefined : canvasPropertySetter(name)
      );
    }

    CanvasRender.prototype.beginPath = function () {
      this.$context.beginPath();
    }

    CanvasRender.prototype.moveTo = function (x, y) {
      this.$context.moveTo(x, y);
    }

    CanvasRender.prototype.lineTo = function (x, y) {
      this.$context.lineTo(x, y);
    }

    CanvasRender.prototype.rect = function (x, y, width, height) {
      this.$context.rect(x, y, width, height);
    }

    CanvasRender.prototype.arc = function (x, y, r, startAngle, endAngle, reverse) {
      this.$context.arc(x, y, r, startAngle, endAngle, reverse);
    }

    CanvasRender.prototype.arcTo = function (x1, y1, x2, y2, r) {
      this.$context.arcTo(x1, y1, x2, y2, r);
    }

    CanvasRender.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
      this.$context.quadraticCurveTo(cpx, cpy, x, y);
    }

    CanvasRender.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) {
      this.$context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
    }

    CanvasRender.prototype.closePath = function () {
      this.$context.closePath();
    }

    CanvasRender.prototype.isPointInPath = function (x, y) {
      return this.$context.isPointInPath(x, y);
    }

    CanvasRender.prototype.stroke = function () {
      this.$context.stroke();
    }

    CanvasRender.prototype.strokeRect = function (x, y, width, height) {
      this.$context.strokeRect(x, y, width, height);
    }

    CanvasRender.prototype.strokeText = function (text, x, y) {
      this.$context.strokeText(text, x, y);
    }

    CanvasRender.prototype.strokeTextExt = function (text, x, y, maxWidth) {
      this.$context.strokeText(text, x, y, maxWidth);
    }

    CanvasRender.prototype.fill = function () {
      this.$context.fill();
    }

    CanvasRender.prototype.fillRect = function (x, y, width, height) {
      this.$context.fillRect(x, y, width, height);
    }

    CanvasRender.prototype.fillText = function (text, x, y) {
      this.$context.fillText(text, x, y);
    }

    CanvasRender.prototype.fillTextExt = function (text, x, y, maxWidth) {
      this.$context.fillText(text, x, y, maxWidth);
    }

    CanvasRender.prototype.drawImage = function (img, x, y) {
      this.$context.drawImage(img, x, y);
    }

    CanvasRender.prototype.drawImageExt = function (img, sx, sy, swidth, sheight, x, y, width, height) {
      this.$context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
    }

    CanvasRender.prototype.createImageData = function (width, height) {
      this.$context.createImageData(width, height)
    }

    CanvasRender.prototype.getImageData = function (x, y, width, height) {
      return this.$content.getImageData(x, y, width, height);
    }

    CanvasRender.prototype.putImageData = function (data, x, y) {
      this.$context.putImageData(data, x, y);
    }

    CanvasRender.prototype.putImageDataExt = function (data, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
      this.$context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    }

    CanvasRender.prototype.createLinearGradient = function (x0, y0, x1, y1) {
      return this.$context.createLinearGradient(x0, y0, x1, y1);
    }

    CanvasRender.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
      return this.$context.createRadialGradient(x0, y0, r0, x1, y1, r1);
    }

    CanvasRender.prototype.createPattern = function (image, repeatMode) {
      this.$context.createPattern(image, repeatMode);
    }

    CanvasRender.prototype.clip = function () {
      this.$context.clip();
    }

    CanvasRender.prototype.clear = function () {
      this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    CanvasRender.prototype.clearRect = function (x, y, width, height) {
      this.$context.clearRect(x, y, width, height);
    }

    CanvasRender.prototype.save = function () {
      this.$context.save();
    }

    CanvasRender.prototype.restore = function () {
      this.$context.restore();
    }

    CanvasRender.prototype.toDataURL = function () {
      return this.$canvas.toDataURL();
    }

    CanvasRender.prototype.translate = function (x, y) {
      this.$context.translate(x, y);
    }

    CanvasRender.prototype.rotate = function (angle) {
      this.$context.rotate(angle);
    }

    CanvasRender.prototype.scale = function (sx, sy) {
      this.$context.scale(sx, sy);
    }

    CanvasRender.prototype.transform = function (a, b, c, d, e, f) {
      this.$context.transform(a, b, c, d, e, f);
    }

    CanvasRender.prototype.setTransform = function (a, b, c, d, e, f) {
      this.$context.setTransform(a, b, c, d, e, f);
    }

    CanvasRender.prototype.destroy = function () {
      this.$context = null;
      this.$canvas = null;
      this.super('destroy')
    }

    function contextPropertyGetter(name) {
      return function () {
        return this.$context[name];
      }
    }

    function contextPropertySetter(name) {
      return function (val) {
        if (this.$context[name] !== val) {
          this.$context[name] = val;
        }
      }
    }

    function canvasPropertyGetter(name) {
      return function () {
        return this.$canvas[name];
      }
    }

    function canvasPropertySetter(name) {
      return function (val) {
        if (this.$canvas[name] !== val) {
          this.$canvas[name] = val;
        }
      }
    }

    return CanvasRender;
  }
)();