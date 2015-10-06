# RestServer API v1.0 一览表

## [用户账号](https://github.com/TomatoAlpha/RestServer/blob/Demo-v1.0/Doc/v1.0/account.md)

|url                        |方式   |描述              |备注      |
| ------------------------- |:-----:| --------------- | ------  |
|/account/login             |POST   |用户登录          |无       |
|/account/regist            |POST   |用户注册          |无       |
|/account/update            |POST   |更新某用户信息     |无       |
|/account/check             |POST   |查询用户名是否存在 |无       |

## [调查问卷](https://github.com/TomatoAlpha/RestServer/blob/Demo-v1.0/Doc/v1.0/paper.md)

|url                        |方式|描述                 |备注|
| ------------------------- |:-------:| ------------------ | -------- |
|/paper/create              |POST|_创建问卷_            |无  |
|/paper/view/{pid}          |POST|管理视察问卷内容      |无  |
|/paper/list/{pid}          |POST|列出所有问卷          |无  |
|/paper/{pid}               |GET |客户端获取问卷        |无  |
|/paper/                    |POST|客户端递交结果        |无  |
