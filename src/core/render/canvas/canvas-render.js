/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
import LangUtil from '../../../utils/lang-util';
import Notifier from '../../notifier';

export default (function () {
    var functions = (function () {
      function contextPropertyGetter (name) {
        return function () {
          return this.$context[name];
        }
      }

      function contextPropertySetter (name) {
        return function (val) {
          if (this.$context[name] !== val) {
            this.$context[name] = val;
          }
        }
      }

      function canvasPropertyGetter (name) {
        return function () {
          return this.$canvas[name];
        }
      }

      function canvasPropertySetter (name) {
        return function (val) {
          if (this.$canvas[name] !== val) {
            this.$canvas[name] = val;
          }
        }
      }

      return {
        contextPropertyGetter: contextPropertyGetter,
        contextPropertySetter: contextPropertySetter,
        canvasPropertyGetter: canvasPropertyGetter,
        canvasPropertySetter: canvasPropertySetter
      }
    })();
    
    var CanvasRender = (function () {
      var InnerCanvasRender = LangUtil.extend(Notifier);

      InnerCanvasRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.$canvas = LangUtil.checkAndGet(conf.canvas, null);
        this.$context = this.$canvas.getContext('2d');
        this._saveStack = [];

        this.defineCanvasProperty('width', LangUtil.checkAndGet(conf.width, undefined), false);
        this.defineCanvasProperty('height', LangUtil.checkAndGet(conf.height, undefined), false);
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

      InnerCanvasRender.prototype.getCanvas = function () {
        return this.$canvas;
      }

      InnerCanvasRender.prototype.getContext = function () {
        return this.$context;
      }

      InnerCanvasRender.prototype.defineContextProperty = function (name, value, readonly) {
        this.defineCustomProperty(
          name,
          this.$context,
          value,
          functions.contextPropertyGetter(name),
          readonly ? undefined : functions.contextPropertySetter(name)
        );
      }

      InnerCanvasRender.prototype.defineCanvasProperty = function (name, value, readonly) {
        this.defineCustomProperty(
          name,
          this.$canvas,
          value,
          functions.canvasPropertyGetter(name),
          readonly ? undefined : functions.canvasPropertySetter(name)
        );
      }

      InnerCanvasRender.prototype.beginPath = function () {
        this.$context.beginPath();
      }

      InnerCanvasRender.prototype.moveTo = function (x, y) {
        this.$context.moveTo(x, y);
      }

      InnerCanvasRender.prototype.lineTo = function (x, y) {
        this.$context.lineTo(x, y);
      }

      InnerCanvasRender.prototype.rect = function (x, y, width, height) {
        this.$context.rect(x, y, width, height);
      }

      InnerCanvasRender.prototype.arc = function (x, y, r, startAngle, endAngle, reverse) {
        this.$context.arc(x, y, r, startAngle, endAngle, reverse);
      }

      InnerCanvasRender.prototype.arcTo = function (x1, y1, x2, y2, r) {
        this.$context.arcTo(x1, y1, x2, y2, r);
      }

      InnerCanvasRender.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
        this.$context.quadraticCurveTo(cpx, cpy, x, y);
      }

      InnerCanvasRender.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) {
        this.$context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
      }

      InnerCanvasRender.prototype.closePath = function () {
        this.$context.closePath();
      }

      InnerCanvasRender.prototype.buildPath = function (points) {
        this.$context.moveTo(points[0][0], points[0][1])
        for (var i = 1, len = points.length; i < len; ++i) {
          this.$context.lineTo(points[i][0], points[i][1])
        }
      }

      InnerCanvasRender.prototype.isPointInPath = function (x, y) {
        return this.$context.isPointInPath(x, y);
      }

      InnerCanvasRender.prototype.stroke = function () {
        this.$context.stroke();
      }

      InnerCanvasRender.prototype.strokeRect = function (x, y, width, height) {
        this.$context.strokeRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.strokeText = function (text, x, y) {
        this.$context.strokeText(text, x, y);
      }

      InnerCanvasRender.prototype.strokeTextExt = function (text, x, y, maxWidth) {
        this.$context.strokeText(text, x, y, maxWidth);
      }

      InnerCanvasRender.prototype.fill = function () {
        this.$context.fill();
      }

      InnerCanvasRender.prototype.fillRect = function (x, y, width, height) {
        this.$context.fillRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.fillText = function (text, x, y) {
        this.$context.fillText(text, x, y);
      }

      InnerCanvasRender.prototype.fillTextExt = function (text, x, y, maxWidth) {
        this.$context.fillText(text, x, y, maxWidth);
      }

      InnerCanvasRender.prototype.drawImage = function (img, x, y) {
        this.$context.drawImage(img, x, y);
      }

      InnerCanvasRender.prototype.drawImageExt = function (img, sx, sy, swidth, sheight, x, y, width, height) {
        this.$context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
      }

      InnerCanvasRender.prototype.createImageData = function (width, height) {
        this.$context.createImageData(width, height)
      }

      InnerCanvasRender.prototype.getImageData = function (x, y, width, height) {
        return this.$context.getImageData(x, y, width, height);
      }

      InnerCanvasRender.prototype.putImageData = function (data, x, y) {
        this.$context.putImageData(data, x, y);
      }

      InnerCanvasRender.prototype.putImageDataExt = function (data, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        this.$context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
      }

      InnerCanvasRender.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return this.$context.createLinearGradient(x0, y0, x1, y1);
      }

      InnerCanvasRender.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        return this.$context.createRadialGradient(x0, y0, r0, x1, y1, r1);
      }

      InnerCanvasRender.prototype.createPattern = function (image, repeatMode) {
        this.$context.createPattern(image, repeatMode);
      }

      InnerCanvasRender.prototype.clip = function () {
        this.$context.save();
        this.$context.clip();
      }

      InnerCanvasRender.prototype.clear = function () {
        this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      }

      InnerCanvasRender.prototype.clearRect = function (x, y, width, height) {
        this.$context.clearRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.save = function () {
        this.$context.save();
        this._saveStack.push(true);
      }

      InnerCanvasRender.prototype.restore = function () {
        if (this._saveStack.pop()) {
          this.$context.restore();
        }
      }

      InnerCanvasRender.prototype.toDataURL = function () {
        return this.$canvas.toDataURL();
      }

      InnerCanvasRender.prototype.translate = function (x, y) {
        this.$context.translate(x, y);
      }

      InnerCanvasRender.prototype.rotate = function (angle) {
        this.$context.rotate(angle);
      }

      InnerCanvasRender.prototype.scale = function (sx, sy) {
        this.$context.scale(sx, sy);
      }

      InnerCanvasRender.prototype.transform = function (a, b, c, d, e, f) {
        this.$context.transform(a, b, c, d, e, f);
      }

      InnerCanvasRender.prototype.setTransform = function (a, b, c, d, e, f) {
        this.$context.setTransform(a, b, c, d, e, f);
      }

      InnerCanvasRender.prototype.destroy = function () {
        this.$context = null;
        this.$canvas = null;
        this.super('destroy')
      }

      return InnerCanvasRender;
    })();

    return CanvasRender;
  }
)();