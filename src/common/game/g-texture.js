/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (function () {
    var functions = (function () {
      function renderImage (sender, render, dirtyZones) {
        var ctx = this._imageCtx;
        var image = this.findApplication().loadImage(ctx.url, this.getID(), loadImageFinished, this);
        if (image) {
          var localZone = this.getLocalZone();
          var offsetLeft = - localZone.left;
          var offsetTop = - localZone.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function renderImageClip (sender, render, dirtyZones) {
        var ctx = this._imageCtx;
        var image = this.findApplication().loadImage(ctx.url, this.getID(), loadImageFinished, this);
        if (image) {
          var localZone = this.getLocalZone();
          var offsetLeft = ctx.x - localZone.left;
          var offsetTop = ctx.y - localZone.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImageFinished (url, image, success, async) {
        var ctx = this._imageCtx;
        if (ctx.invalid && success) {
          if (LangUtil.isString(this.image)) {
            this.width = image.width;
            this.height = image.height;
            ctx.x = 0;
            ctx.y = 0;
            ctx.width = image.width;
            ctx.height = image.height;
          } else {
            this.width = this.image.width;
            this.height = this.image.height;
            ctx.x = this.image.x;
            ctx.y = this.image.y;
            ctx.width = this.image.width;
            ctx.height = this.image.height;
          }
          ctx.invalid = false;
        }
        if (async) {
          this.dirty();
        }
      }

      function onPropertyChanged(sender, name, newVal, oldVal) {
        if (onEventsMap.hasOwnProperty(name)) {
          onEventsMap[name].call(this, newVal, oldVal);
        }
      }

      function onRenderImageChanged (newVal, oldVal) {
        this.removeObserver('render', renderImage, this);
        this.removeObserver('render', renderImageClip, this);
        if (newVal && newVal !== '') {
          var ctx = this._imageCtx;
          if (LangUtil.isString(newVal)) {
            ctx.url = newVal;
            this.addObserver('render', renderImage, this);
          } else {
            ctx.url = newVal.url;
            this.addObserver('render', renderImageClip, this);
          }
          ctx.invalid = true;
        }
      }

      var onEventsMap = {
        image: onRenderImageChanged
      };
      
      return {
        onPropertyChanged: onPropertyChanged,
        onRenderImageChanged: onRenderImageChanged
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = LangUtil.extend(Node);

      InnerGTexture.prototype.defImage = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.defWidth = 2;
      InnerGTexture.prototype.defHeight = 2;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.image = LangUtil.checkAndGet(conf.image, this.defImage);

        this._imageCtx = {
          invalid: true,
          url: null,
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        functions.onRenderImageChanged.call(this, this.image, undefined);

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)();