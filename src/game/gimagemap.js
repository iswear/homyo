/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import GMap from './gmap';

export default (
  function () {

    var GImageMap = LangUtil.extend(GMap);

    GImageMap.prototype.defImg = null;
    GImageMap.prototype.init = function (conf) {
      this.super('init', [ conf ]);
      this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, this.defImg));

      this._img = {
        needAdjustMapSize: true,
        url: null,
        width: 0,
        height: 0
      };

      sync_imgRender.call(this);

      this.addObserver('imgChanged', this.refresh, this, this);
      this.addObserver('imgChanged', sync_imgRender, this, this);
    }

    function render_img(sender, render) {
      var img = this._img;
      var image = this.findApplication().getFileLoader().loadImageAsync(
        img.url,
        fn_loadImageFinished,
        this
      );
      if (image !== null) {
        if (img.needAdjustMapSize) {
          this.width = image.width;
          this.height = image.height;
          img.needAdjustMapSize = false;
        }
        var rect = this.getRectInSelf();
        var left = rect.left < this.containerLeft ? this.containerLeft : rect.left;
        var top = rect.top < this.containerTop ? this.containerTop : rect.top;
        var width = (rect.right < this.containerRight ? rect.right : this.containerRight) - left;
        var height = (rect.bottom < this.containerBottom ? rect.bottom : this.containerBottom) - top;
        render.drawImageExt(image, left, top, width, height, left, top, width, height);
      }
    }
    
    function sync_imgRender() {
      if (this.img !== null && this.img !== '') {
        var img = this._img;
        img.url = this.img;
        img.needAdjustMapSize = true;
        if (this.getObserverByAllParams('render', render_img, this, this) === null) {
          this.addObserver('render', render_img, this, this);
        }
      } else {
        this.removeObserver('render', render_img, this, this);
      }
    }

    function fn_loadImageFinished(url, success) {
      this.refresh();
    }

    return GImageMap;

  }
)();