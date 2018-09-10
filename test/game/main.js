import homyo from '../../main'

(function () {
    var Application = homyo.core.Application;
    var PropertyAnimation = homyo.core.animation.PropertyAnimation;
    var UILabel = homyo.ui.Label;
    var GTexture = homyo.game.Texture;
    var GMap = homyo.game.Map;

    // var root = new UILabel({
    //   x: 400,
    //   y: 300,
    //   width: 100,
    //   height: 100,
    //   visible: true,
    //   text: '测试测试',
    //   backgroundColor: '#f00',
    //   borderWidth: 1,
    //   borderColor: '#0f0',
    //   borderRadius: 10
    // });

    // var root = new GTexture({
    //   x: 400,
    //   y: 300,
    //   visible: true,
    //   image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
    // });

    var root = new GMap({
        width: 200,
        height: 200,
        mapTileType: 'square',
        mapTileWidth: 30,
        mapTileHeight: 30,
        mapTileImageIndex: {
            1: 'images/email.jpg'
        },
        mapTileImageClipIndex: {
            1: {
                imageId: 1,
                x: 0,
                y: 0,
                width: 30,
                height: 30
            }
        },
        mapTileRows: 5,
        mapTileCols: 5,
        mapTileData: [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1],
        ]
    });

    var application = new Application({
        canvas: document.getElementById('main'),
        root: root
    });

    application.run();
    
    // root.runAnimation(new PropertyAnimation({
    //     property: 'rotateZ',
    //     offset: Infinity,
    //     offsetFn: function (animation, deltaTime, sumTime) {
    //         return sumTime / 1000;
    //     }
    // }), null, null, false);

    // for (var i = 0; i < 10; ++i) {
    //   root.addChildNode(new GTexture({
    //     x: 20 * i,
    //     y: 20 * i,
    //     visible: true,
    //     image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
    //   }));
    // }

    // document.onclick = function () {
    //   console.log('yaya')
    //   root.x += 10;
    // }

})();