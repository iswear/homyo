/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../../utils/lang-util';
import GMap from './g-map';

export default (
  function () {
    var functions = (function () {
      function syncBackgroundImageRender () {
        this.removeObserver('render', renderBackgroundImage, this, this);
        this.removeObserver('render', renderBackgroundImageClip, this, this);
        if (this.backgroundImage !== null && this.backgroundImage !== '') {
          if (LangUtil.isString(this.backgroundImage)) {
            this.addObserver('render', renderBackgroundImage, this, this);
          } else {
            this.addObserver('render', renderBackgroundImageClip, this, this);
          }
        }
      }
      
      function syncBackgroundImageContext () {
        if (this.backgroundImage !== null && this.backgroundImage !== '') {
          var ctx = this._backgroundImageCtx;
          var image = this.backgroundImage;
          ctx.progress = 0;
          if (LangUtil.isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
        }
      }

      function renderBackgroundImage (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var mapRectInLocal = this.getMapRectInLocal();
          var offsetLeft = this.mapX - mapRectInLocal.left;
          var offsetTop = this.mapY - mapRectInLocal.top;

          var ctx = this._backgroundImageCtx;
          var desRect = {
            left: this.mapX + mapRectInLocal.left,
            top: this.mapY + mapRectInLocal.top,

            width: ctx.width,
            height: ctx.height
          };
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function renderBackgroundImageClip (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var mapRectInLocal = this.getMapRectInLocal();
          var rectInLocal = this.getRectInLocal();
          var ctx = this._backgroundImageCtx;
          var offsetLeft = ;
          var offsetTop = ;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImage () {
        var fileLoader = this.findApplication().getFileLoader();
        var ctx = this._backgroundImageCtx;
        if (ctx.progress === 0) {
          return fileLoader.loadImageAsync(ctx.url, loadImageFinished, this);
        } else if (ctx.progress === 2) {
          return fileLoader.loadImageAsync(ctx.url, loadImageFinished, this);
        } else {
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
        if (this._backgroundImageCtx.progress !== 2) {
          this._backgroundImageCtx.progress = 2;
          if (LangUtil.isString(this.backgroundImage)) {
            this.mapWidth = image.width;
            this.mapHeight = image.height;
          } else {
            this.mapWidth = this.backgroundImage.width;
            this.mapHeight = this.backgroundImage.height;
            this._backgroundImageCtx.x = this.backgroundImage.x;
            this._backgroundImageCtx.y = this.backgroundImage.y;
            this._backgroundImageCtx.width = this.backgroundImage.width;
            this._backgroundImageCtx.height = this.backgroundImage.height;
          }
          this.refresh();
        }
      }

      function loadImageFailed () {
        this._backgroundImageCtx.progress = 3;
      }

      return {
        syncBackgroundImageRender: syncBackgroundImageRender,
        syncBackgroundImageContext: syncBackgroundImageContext
      };
    })();

    var GImageMap = (function () {
      var InnerGImageMap = LangUtil.extend(GMap);

      InnerGImageMap.prototype.defImg = null;
      InnerGImageMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('backgroundImage', LangUtil.checkAndGet(conf.backgroundImage, null));

        this._backgroundImageCtx = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          url: null,
          progress: 0
        };

        functions.syncBackgroundImageRender.call(this);
        functions.syncBackgroundImageContext.call(this);

        this.addObserver('backgroundImageChanged', this.refresh, this, this);

        this.addObserver('backgroundImageChanged', functions.syncBackgroundImageRender, this, this);
        this.addObserver('backgroundImageChanged', functions.syncBackgroundImageContext, this, this);
      }

      return InnerGImageMap;
    })();

    return GImageMap;
  }
)();