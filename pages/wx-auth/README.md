## 微信授权流程

### 1、进入 H5 页面，跳转微信授权地址

`https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`

redirect_uri:用户统一授权后重定向地址

appid：公众号 id

scope: 授权方式，静默授权（只能获取到 openid-用户对应公众号的 id）\显性授权(openid\unionId,头像，昵称都可以获取)

response_type:返回类型，code

### 2、用户统一授权，通过 redirect_uri 返回 H5，并且此时 url 会携带 code

### 3、通过 code 去获取 access_token

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
