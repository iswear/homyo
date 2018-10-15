# GMap配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GMapConfig extends NodeConfig {
  private Integer mapX;
  private Integer mapY;
  private String mapTileType;
  private Integer mapTileWidth;
  private Integer mapTileHeight;
  private <Integer, String> mapTileImageIndex;
  private <Integer, GImageConfig> mapTileImageClipIndex;
  private Integer mapTileRows;
  private Integer mapTileCols;
  private Integer[][] mapTileData;
}

public class GImageConfig {
  private Integer imageId;
  private Integer x;
  private Integer y;
  private Integer width;
  private Integer height;
}
```
1. [NodeConfig](../../core/Node.MD)