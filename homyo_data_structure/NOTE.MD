# 开发规范备注
## 一、命名规范
* 私有属性:下划线+(字母,数字)，如_example
* 代理属性:美元符号+(字母,数字)，如$properties
* 私有方法:闭包解决
* 共有方法:prototype.方法名

## 二、类的init方法
* 父类方法调用:super('init')
* 代理Object: this.$properties={};
* 定义对外属性: this.defineNotifyProperty()
* 定义私有属性: this._xxx = yyy;
* 同步属性关系: sync_xxx.call(this);
* 添加属性同步监听: addObserver();
```javascript
this.super('init', [conf]);
this.$canvas = LangUtil.isUndefined(conf.canvas) ? null : conf.canvas;
this.$context = this._canvas.getContext('2d');

this.defineCanvasProperty('width', LangUtil.isUndefined(conf.width) ? undefined : conf.width);
this.defineCanvasProperty('height', LangUtil.isUndefined(conf.height) ? undefined : conf.height);
this.defineCanvasProperty('clientWidth');
this.defineCanvasProperty('clientHeight');
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
this.defineContextProperty('textBaseLine');
this.defineContextProperty('globalAlpha');
this.defineContextProperty('globalCompositeOperation');
```