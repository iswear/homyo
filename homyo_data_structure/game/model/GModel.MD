# GModel配置项数据结构（JAVA描述）
## 一、数据结构
```java
public class GModelConfig {
    private String id;
    private String name;
    private GModelTreeNodeConfig root;
    private List<GActionGroupConfig> actionGroups;
}

public class GModelTreeNodeConfig {
    private String id;
    private String name;
    private GNodeConfig config;
    private List<GNodeTreeNodeConfig> children;
}

public class GActionGroupConfig {
    private String id;
    private String name;
    private List<GActionConfig> actions;
}

public class GActionConfig {
    private String id;
    private String name;
    private GActionConditionConfig condition;
    private Map<String, Map<String, List<GActionFrameConfig>>> frames;
}

public class GActionConditionConfig {
    private String property;
    private Object min;
    private Object max;
}

public class GActionPropertyFrameConfig {
    private Integer time;
    private Object value;
    private Boolean tween;
    private Double[] curve;
}
```

```javascript
{
    id: 'model_id',
    name: 'model_name',
    root: {
        id: 'node_id_1',
        name: 'node_name_1',
        config: {
            anchorX: .5,
            anchorY: .5
        },
        children: [
            {
                id: 'node_id_2',
                name: 'node_name_2',
                config: {
                    anchorX: .5,
                    anchorY: .5
                },
                children: []
            }
        ]
    },
    actionGroups: {
        id: 'action_group_id_1',
        name: 'action_run',
        actions: [
            {
                id: 'action_id_1',
                name: 'action_run_north',
                property: 'rotateZ',
                range: [0, 100],
                frames: {
                    'node_id_1': {
                        'x': 
                    }
                }
            }
        ]
    }
}
```