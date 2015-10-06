## [调查问卷](https://github.com/TomatoAlpha/RestServer/blob/Demo-v1.0/Doc/v1.0/paper.md)

### 上传问卷：

|项目                       |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/paper/create|
|递交方式|From - POST(multipart/form-data)|
|内容|uid token oid file|

```
Requset{
  Form Data:{
    uid:56133b45549a05440ee09cda,
    token:Llnq+X7w4K+ocmf+7Cy2hw==,
    oid:560c7fd258d1ea2bfc95d91d,
    file:test1.rar
  }
}

Response{
  {
    "__v":0,
    "uid":"56133b45549a05440ee09cda",
    "oid":"560c7fd258d1ea2bfc95d91d",
    "createTime":"2015-10-06T04:24:51.251Z",
    "_id":"56134d13f0cb9cc81ef2e162",
    "error":"",
    "status":0,
    "question":[
      "56134d13f0cb9cc81ef2e15b",
      "56134d13f0cb9cc81ef2e150",
      "56134d13f0cb9cc81ef2e155",
      "56134d13f0cb9cc81ef2e14a",
      "56134d13f0cb9cc81ef2e15c",
      "56134d13f0cb9cc81ef2e156",
      "56134d13f0cb9cc81ef2e13e",
      "56134d13f0cb9cc81ef2e15d"
    ],
    "description":"",
    "title":"﻿购车客户调查问卷[标题]"
  }
}
```

### 查询问卷内容：

|项目                        |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/view/{pid}|
|递交方式|Ajax - POST|
|内容|uid token oid|

```
url:view/56134d13f0cb9cc81ef2e162,

Requset(Ajax to stringify){
  uid: "56133b45549a05440ee09cda",
  token: "Llnq+X7w4K+ocmf+7Cy2hw==",
  oid: "560c7fd258d1ea2bfc95d91d"
}

Response{
  {
    "_id":"56134d13f0cb9cc81ef2e162",
    "uid":"56133b45549a05440ee09cda",
    "oid":"560c7fd258d1ea2bfc95d91d",
    "createTime":"2015-10-06T04:24:51.251Z",
    "__v":0,
    "error":"",
    "status":0,
    "description":"",
    "title":"﻿购车客户调查问卷[标题]",
    "question":[{
        "_id":"56134d13f0cb9cc81ef2e155",
        "__v":0,
        "content":{
          "url":"",
          "text":"您觉得您挑选第一款车的理由是什么 "
        },
        "minMult":1,
        "maxMult":1,
        "group":"4/A",
        "isGroup":true,
        "checks":[],
        "type":3,
        "order":5
      },
      {
        "_id":"56134d13f0cb9cc81ef2e150",
        "__v":0,
        "content":{
          "url":"",
          "text":"以下你喜欢哪种车子 "
        },
        "minMult":1,
        "maxMult":1,
        "group":"",
        "isGroup":false,
        "checks":[
          {
            "_id":"56134d13f0cb9cc81ef2e154",
            "content":{
              "url":"http://182.254.241.122:3000/images/upload_0b371f4a531e3d7021e6443b5631a744/1.jpg",
              "text":"大众"
            },
            "order":"A"
          },
          {
            "_id":"56134d13f0cb9cc81ef2e153",
            "content":{
              "url":"http://182.254.241.122:3000/images/upload_0b371f4a531e3d7021e6443b5631a744/2.jpg",
              "text":"高尔夫"
            },
            "order":"B"
          },
          {
            "_id":"56134d13f0cb9cc81ef2e152",
            "content":{
              "url":"http://182.254.241.122:3000/images/upload_0b371f4a531e3d7021e6443b5631a744/3.jpg",
              "text":"奥迪"
            },
            "order":"C"
          },
          {
            "_id":"56134d13f0cb9cc81ef2e151",
            "content":{
              "url":"http://182.254.241.122:3000/images/upload_0b371f4a531e3d7021e6443b5631a744/4.jpg",
              "text":"奔驰"
            },
            "order":"D"
          }],
          "type":1,
          "order":4
        }]
    }
}
```

### 列出所有问卷：

|项目                       |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/paper/list|
|递交方式|Ajax - POST|
|内容|uid token oid|

```
Requset(Ajax to stringify){
  uid:56133b45549a05440ee09cda,
  token:Llnq+X7w4K+ocmf+7Cy2hw==,
  oid:560c7fd258d1ea2bfc95d91d
}

Response{
  [{
    "__v":0,
    "uid":"56133b45549a05440ee09cda",
    "oid":"560c7fd258d1ea2bfc95d91d",
    "createTime":"2015-10-06T04:24:51.251Z",
    "_id":"56134d13f0cb9cc81ef2e162",
    "error":"",
    "status":0,
    "question":[
      "56134d13f0cb9cc81ef2e15b",
      "56134d13f0cb9cc81ef2e150",
      "56134d13f0cb9cc81ef2e155",
      "56134d13f0cb9cc81ef2e14a",
      "56134d13f0cb9cc81ef2e15c",
      "56134d13f0cb9cc81ef2e156",
      "56134d13f0cb9cc81ef2e13e",
      "56134d13f0cb9cc81ef2e15d"
    ],
    "description":"",
    "title":"﻿购车客户调查问卷[标题]"
  },
  {
    and so on
  }]
}
```

### 列出所有问卷：

|项目                       |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/paper/{pid}|
|递交方式|GET|
|内容|无|

```
Requset{
}

Response{
  [{
    "__v":0,
    "_id":"56134d13f0cb9cc81ef2e162",
    "question":[
    .....
    ],
    "description":"",
    "title":"﻿购车客户调查问卷[标题]"
  },
  {
    and so on
  }]
}
```

### 客户做问卷：

|项目                       |值   |
| ------------------------- |:-----:|
|url|http://182.254.241.122:3000/paper/{pid}|
|递交方式|Ajax - POST|
|内容|qid cid date answer timeTickes|

```
Requset(Ajax to stringify){
  answer: "qwe",
  cid: "qwe",
  date: "2015-10-06T05:06:19.885Z",
  qid: "56135493b42685280d0608ac",
  timeTickes: "123"
}

Response{
  {
    "__v":0,
    "qid":"56135493b42685280d0608ac",
    "date":"2015-10-06T05:06:19.885Z",
    "_id":"561356d3ea0f52c802439fa2",
    "timeTickes":123,
    "answer":"qwe",
    "cid":"qwe"
  }
}
```
