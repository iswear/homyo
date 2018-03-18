# GTiledMap配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GTilMap extends GMapConfig {
  private Integer tileInclineX;
  private Integer tileInclineY;
  private Integer tileWidth;
  private Integer tileHeight;
  private Array tiles; 
}
public class ImageConfig {
    private String url;
    private Integer x;
    private Integer y;
    private Integer width;
    private Integer height;
}
```
1. [NodeConfig](../../core/Node.MD)