## 請以自己的話解釋 API 是什麼

API，Application Programming Interface，「應用程式介面」：

> 一個讓 Client 和 Server 雙方能互相溝通，交換**資料**或**功能**的介面。

透過這個介面，Server 能夠將其指定資料或功能提供給 Client，意即雙方透過這個介面，Client 以指定的方式來提出請求，可以從 Server 端獲取資料。由於兩端基於資安等原因無法讓對方直接連資料庫，因此會透過這種介面的模式，分享 Server 願意提供的資料及功能。

目前我們串接 API 的類型屬於 Web API，是基於 HTTP 協定下運作的，透過網路來操作。

比較常見的 API 應用有：

- 會員登入
- 資料取得
- 社群足跡存取

一個好的 API 文件應具備以下條件：

- 完整的 API 文件說明
- 提供範例解釋如何運用
- 有使用指引讓開發者能夠跟著步驟使用
- 合理的命名規則
- 適當的防單措施
- 謹慎的 API 介面設計



## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. `429 : Too Many Request.`發送

   指用戶端在指定時間內發送過多請求。

   找到一個[案例](https://ithelp.ithome.com.tw/articles/10197146)是，有一個專案開發了公車動態 APP，需要串接公車動態 API，但因為資料取得後是靜態的，因此必須定時重複取得並重新渲染畫面。
   但因為使用同一個 ip 重複呼叫同一個 API 超過限定次數，因此被斷掉使用權限，並回傳了 `429` HTTP StatusCode.

2. `511 : Network Authentication Required`

   表示客戶端需要通過驗證才能使用該網路。

   當需要客戶端進行身分驗證的時候，會出現這個代碼。希望透過這樣來識別沒有驗證的客戶端，並限制他們的訪問。

3. `408 : Request Timeout`

   請求超時。意指客戶端發給伺服器的請求，花費的時間比伺服器預設的等待時間還長，即雙方連接的時間超時。

   有可能發生在網路連接出現問題，網速過慢的時候，需要排除問題以後重新發送請求即可。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。



# FOODRANDA TOP Restaurant API 



### Introduction

> 版本 ：V1.1

FOODRANDA TOP Restaurant API 為幫助開發者，獲取及使用 FOODRANDA 平台上的熱門餐廳名單。



### Get Start

**Base URL** : https://foodranda.com/top

| **使用說明** | **Method** | **path** | **參數** | **範例** |
|    :----:   |    :----:   |    :----:    |    :----:    |    :----:    |
| 獲取餐廳 | GET | /restaurants | _limit:限制回傳資料數量 | /restaurants?_limit=5 |
| 獲取單一餐廳 | GET | /restaurants/:id | 無 | /restaurants/15 |
| 新增餐廳 | POST | /restaurants | name: 餐廳名稱 |          |
| 更改餐廳 | PATCH | /restaurants/:id | name: 餐廳名稱 |  |
| 刪除餐廳 | DELETE | /restaurants/:id | 無 |  |

### 參數說明

- `limit` : int
- `name` : string

### API REQUEST

**請使用以下方法獲取 API 資料 : **

1. 於終端機使用 curl 發送 request

```
curl -X GET 'https://foodranda.com/top/restaurants?_limit=5'
```

2. 在 node.js 環境下使用 request module 發送 HTTP request

```
const request = require('request')

 const options = {
  url: 'https://foodranda.com/top/restaurants',
  form: {
    name: 'title'
  }
}

function callback(err, res, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body))
  }
}

request(options, callback);
```



### Response 資料格式

```
[
  {
    "id": 1,
    "name": "豚花韓式料理 林森店"
  },
  {
    "id": 2,
    "name": "饒河夜市冰豆綠豆沙"
  },
  {
    "id": 3,
    "name": "泰讚了手工泰式茶"
  },
  {
    "id": 4,
    "name": "一品活蝦 忠孝店"
  },
  {
    "id": 5,
    "name": "麥當勞 S527 台北南京六"
  },
  {
    "id": 6,
    "name": "台灣鹹酥雞 大直總店"
  },
  {
    "id": 7,
    "name": "冰世界雪花冰"
  },
  {
    "id": 8,
    "name": "小茶齋 台北通化店"
  },
  {
    "id": 9,
    "name": "大心泰式麵食"
  },
  {
    "id": 10,
    "name": "馬友友印度餐廳"
  }
]
```

