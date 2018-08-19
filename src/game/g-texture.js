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
          if (LangUtil.isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
          ctx.progress = 0;
        }
      }

      function renderImage (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var rectInLocal = this.getRectInLocal();
          var offsetLeft = - rectInLocal.left;
          var offsetTop = - rectInLocal.top;
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
          var rectInLocal = this.getRectInLocal();
          var ctx = this._imageCtx;
          var offsetLeft = ctx.x - rectInLocal.left;
          var offsetTop = ctx.y - rectInLocal.top;
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
        var fileLoader = this.findApplication().getFileLoader();
        var image = fileLoader.loadImageAsync(ctx.url);
        if (image !== null) {
          loadImageSuccess.call(this, image);
          return image;
        } else {
          if (ctx.progress === 0) {
            fileLoader.loadImageAsync(ctx.url, loadImageFinished, this);
            ctx.progress = 1;
          }
          return null;
        }
      }

      function loadImageFinished (url, success) {
        if (success) {
          var image = this.findApplication().getFileLoader().loadImageAsync(url);
          if (image !== null) {
            loadImageSuccess.call(this, image);
          } else {
            loadImageFailed.call(this);
          }
        } else {
          loadImageFailed.call(this);
        }
      }

      function loadImageSuccess (image) {
        var ctx = this._imageCtx;
        if (ctx.progress !== 2) {
          ctx.progress = 2;
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
          this.refresh();
        }
      }

      function loadImageFailed () {
        this._imageCtx.progress = 3;
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
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          url: null,
          progress: 0
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