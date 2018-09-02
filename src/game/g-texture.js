/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {
    var functions = (function () {
      function syncImageRender () {
        this.removeObserver('render', renderImage, this, this);
        this.removeObserver('render', renderImageClip, this, this);
        if (this.image !== null && this.image !== '') {
          if (LangUtil.isString(this.image)) {
            this.addObserver('render', renderImage, this, this);
          } else {
            this.addObserver('render', renderImageClip, this, this);
          }
        }
      }

      function syncImageContext () {
        if (this.image !== null && this.image !== '') {
          var ctx = this._imageCtx;
          var image = this.image;
          ctx.invalid = true;
          if (LangUtil.isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
        }
      }

      function renderImage (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var zoneInLocal = this.getZoneInLocal();
          var offsetLeft = - zoneInLocal.left;
          var offsetTop = - zoneInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }
      
      function renderImageClip (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var zoneInLocal = this.getZoneInLocal();
          var ctx = this._imageCtx;
          var offsetLeft = ctx.x - zoneInLocal.left;
          var offsetTop = ctx.y - zoneInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImage () {
        var ctx = this._imageCtx;
        var image = this.findApplication().loadImage(ctx.url, true);
        if (ctx.invalid && image !== null) {
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
        return image;
      }

      return {
        syncImageRender: syncImageRender,
        syncImageContext: syncImageContext
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = LangUtil.extend(Node);

      InnerGTexture.prototype.defImage = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('image', LangUtil.checkAndGet(conf.image, this.defImage));

        this._imageCtx = {
          invalid: true,
          url: null,
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        functions.syncImageRender.call(this);
        functions.syncImageContext.call(this);

        this.addObserver('imageChanged', this.refresh, this, this);

        this.addObserver('imageChanged', functions.syncImageRender, this, this);
        this.addObserver('imageChanged', functions.syncImageContext, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)();