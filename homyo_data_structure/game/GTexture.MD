# GTexture配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GTextureConfig extends NodeConfig {
    private ImageConfig img;
}

public class ImageConfig {
    private String url;
    private Integer x;
    private Integer y;
    private Integer width;
    private Integer height;
}
```
## 二、依赖类
1. [NodeConfig](../core/Node.MD)
