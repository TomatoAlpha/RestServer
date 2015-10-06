# RestServer API 一览表

## [用户账号](https://github.com/TomatoAlpha/RestServer/blob/master/Doc/account.md)

|url                        |方式   |描述              |备注      |
| ------------------------- |:-----:| --------------- | ------  |
|/account/login             |POST   |用户登录          |无       |
|/account/regist            |POST   |用户注册          |无       |
|/account/info/{uid}        |POST   |获取某用户基本信息 |无       |
|/account/update/{uid}      |POST   |更新某用户信息     |无       |
|/account/check             |POST   |查询用户名是否存在 |无       |
|/account/delete/{uid}      |POST   |删除某账号        |无       |

## [企业组织](https://github.com/TomatoAlpha/RestServer/blob/master/Doc/orgnization.md)

|url                        |方式|描述               |备注|
| ------------------------- |:------:| ---------------- | ------ |
|/orgnization/create        |POST|创建企业组织        |无  |
|/orgnization/info/{oid}    |POST|获取某企业组织信息  |无  |
|/orgnization/update/{oid}  |POST|更新某企业组织信息  |无  |
|/orgnization/delete/{oid}  |POST|删除某企业组织      |无  |
|/orgnization/list/{oid}    |POST|列出组织的所有成员  |无  |

## [行业](https://github.com/TomatoAlpha/RestServer/blob/master/Doc/industry.md)

|url                        |方式|描述                 |备注|
| ------------------------- |:--------:| ------------------ | ------- |
|/industry/create           |POST|创建行业             |无  |
|/industry/info/{iid}       |POST|获取行业基本介绍      |无  |
|/industry/update/{iid}     |POST|更新行业基本介绍      |无  |
|/industry/list/{iid}       |POST|列出在本行业的所有组织 |无  |

## [调查问卷](https://github.com/TomatoAlpha/RestServer/blob/master/Doc/paper.md)

|url                        |方式|描述                 |备注|
| ------------------------- |:-------:| ------------------ | -------- |
|/paper/create              |POST|_创建问卷_            |无  |
|/paper/info/{pid}          |POST|获取问卷内容          |无  |
|/paper/update/{pid}        |POST|更新问卷内容          |无  |
|/paper/delete/{pid}        |POST|删除问卷             |无  |
|/paper/list/{uid}          |POST|列出某人创建的所有问卷 |无  |
|/paper/list/{oid}          |POST|列出组织创建的所有问卷 |无  |
|/paper/result/{pid}        |POST|_显示该问卷结果_      |无  |

## [微信用户](https://github.com/TomatoAlpha/RestServer/blob/master/Doc/client.md)

|url                        |方式|描述                 |备注|
| ------------------------- |:--------:| ------------------ | -------- |
|/client/create             |POST|登记该微信用户        |无  |
|/client/info/{cid}         |POST|_获取该微信用户信息_   |无  |
|/client/update/{cid}       |POST|人工更新微信用户信息   |无  |
|/client/delete/{cid}       |POST|人工删除微信用户      |无  |
