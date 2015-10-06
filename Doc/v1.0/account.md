## [用户账号](https://github.com/TomatoAlpha/RestServer/blob/Demo-v1.0/Doc/v1.0/account.md)

### 用户登陆：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/account/login|
|递交方式|From - POST|
|内容|username password|

```
Requset{
  Form Data:{
    username:aaa,
    password:aaa
  }
}

Response{
  token: "5KK5uK1lG2uQfMkbnWzrhw==",
  uid: "5607578eb4521a402dd5ad76"
}
```

### 用户注册：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/account/regist|
|递交方式|From - POST|
|内容|username password email mobile|

```
Requset{
  Form Data:{
    username:"ccc",
    password:"ccc",
    email:"aaa@qq.com",
    mobile:"34525423654"
  }
}

Response{
  uid: "56133b45549a05440ee09cda",
  token: "Llnq+X7w4K+ocmf+7Cy2hw=="
}
```

### 查询用户信息：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/account/info|
|递交方式|Ajax - POST|
|内容|uid token|

```
Requset{
  uid: "56133b45549a05440ee09cda",
  token: "Llnq+X7w4K+ocmf+7Cy2hw=="
}

Response{
  user information...
}
```

### 校验用户名：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/account/check|
|递交方式|From - POST|
|内容|username|

```
Requset{
  Form Data:{
    username:"ccc"
  }
}

Response{
  "true" or "false"
}
```

### 用户更新：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/account/update|
|递交方式|Ajax - POST|
|内容|username password|

```
Requset{
  Ajax Send Data:{
    "executor":{
      "_id":"56133b45549a05440ee09cda",
      "token":"Llnq+X7w4K+ocmf+7Cy2hw=="
      },
    "update":{
      "_id":"56133b45549a05440ee09cda",
      "token":"Llnq+X7w4K+ocmf+7Cy2hw==",
      "nickName":"李昌洋",
      "name":"罗杰",
      "orgnization":"aaaa",
      "province":"aaaa",
      "address":"aaaa",
      "mobile":"aaaaa",
      "telephone":"aaaa",
      "email":"aaaaa",
      "password":"ccc",
      And so on
      }
    }
}

Response{
  {
    "_id":"56133b45549a05440ee09cda",
    "createTime":"2015-10-06T03:08:53.606Z",
    "__v":0,
    "status":0,
    "authority":0,
    "email":"aaaaa",
    "telephone":"aaaa",
    "mobile":"aaaaa",
    "address":"aaaa",
    "province":"aaaa",
    "creditCard":"",
    "identity":"",
    "education":"",
    "gender":"",
    "avatar":"",
    "name":"罗杰",
    "nickName":"李昌洋",
    "password":"ccc",
    "username":"ccc",
    "token":"Llnq+X7w4K+ocmf+7Cy2hw==" // token并没有修改，这是个bug
  }
}
```
