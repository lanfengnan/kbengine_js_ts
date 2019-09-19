# kbengine_js_ts
基于KBEngine游戏服务器引擎调整的JS+TS、纯TS版本，可用于H5游戏引擎，增加了引擎组件的支持。

纯TS版本：
1、客户端：实体、组件脚本需要集中到KBEngine.allModules，在实体与组件脚本最后增加一行KBEngine.SetModules("Avatar", Avatar);
2、服务器：实体组件需要定义Utype，范围是[1000, 2000];
2、客户端：定义好的组件需要在实体中声明为属性，属性名称与服务器名称匹配;

JS+TS版本：
1、客户端：实体、组件脚本需要集中到KBEngine.allModules，在实体与组件脚本最后增加一行KBEngine.allModules["Avatar"] = Avatar;
2、服务器：实体组件需要定义Utype，范围是[1000, 2000];
2、客户端：定义好的组件需要在实体中声明为属性，属性名称与服务器名称匹配;

