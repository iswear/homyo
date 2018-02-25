# GModel配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GModelConfig {
    private String id;
    private String name;
    private GNodeTreeNodeConfig root;
    private List<ActionConfig> actions;
}
public class GNodeTreeNodeConfig {
    private String id;
    private String name;
    private GNodeConfig node;
    private List<GNodeTreeNodeConfig> children;
}
public class ActionConfig {
    private String id;
    private String name;
    private Map<String, List<GNodeFrameConfig>> frames;
}
public class GNodeFrameConfig {
    private Integer time;
    private Boolean tween;
    private GNodeFrameDataConfig data;
}
public class GNodeFrameDataConfig {
    private GNodeFrameDataPropConfig props;
    private GNodeFrameDataCurveConfig curves;
}
public class GNodeFrameDataPropConfig {
    private Integer x;
    private Integer y;
    private Double rotateZ;
    private Double scaleX;
    private Double scaleY;
    private Double inclineX;
    private Double inclineY;
    private Double alpha;
    private Boolean visible;
    private ImageConfig img;
}
public class GNodeFrameDataCurveConfig {
    private Double[] x;
    private Double[] y;
    private Double[] rotateZ;
    private Double[] scaleX;
    private Double[] scaleY;
    private Double[] inclineX;
    private Double[] inclineY;
    private Double[] alpha;
}
```