# GNode配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GNodeConfig extends NodeConfig {
    private ImageConfig img;
    private GTextureConfig texture;
    private List<GNodeConfig> children;
}
```
## 二、依赖类
1. [NodeConfig](../../core/Node.MD)
1. [GTextureConfig](./GTexture.MD)