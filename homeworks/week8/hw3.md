## 什麼是 Ajax？

Ajax， Asynchronous JavaScript and XML，為「非同步」，使用 Javascript 進行 Client 與 Server 之間的資料交換。XML 是過去常用的資料交換格式，但現在常用的為 JSON，不過 ajax 並不只適用 XML。總而來說，**任何非同步跟伺服器交換資料的 Javascript 都叫做 Ajax.**

其中需要特別注意的是「非同步」，原生 Javascript 的執行其實幾乎是同步的，按照撰寫順序執行，順序下方的程式碼必須等到上方程式碼執行完畢後才會繼續進行。

但當我們需要資料交換的時候，如果依舊是用同步的方式，會導致資料尚未回傳之前，整個 Javascript 都不會再有任何反應，因為 response 還沒回來，因此不能繼續執行。但當我們需要在網頁的局部改變，其他都希望仍然能繼續運作的狀況下，則必須使用非同步的方式。

相對於同步，非同步指的是當我們有一個非同步的執行時，執行之後不會等待結果回來，就可以繼續執行之後的程式碼，而之前執行的結果則是會透過 callback function 將資料帶入。

## 用 Ajax 與我們用表單送出資料的差別在哪？

- 表單 : 瀏覽器上的 Js → 透過瀏覽器傳送 request → Server

  ​		   Server → 瀏覽器直接 render Server 回傳的 response

  因此透過表單送出資料後會換頁，頁面被重新渲染成為 Server 回傳的 response，更像是帶上所需的參數去到新的頁面。

- Ajax : 瀏覽器上的 Js → 透過瀏覽器傳送 request → Server

  ​		   Server → 瀏覽器回傳 Server response → 瀏覽器上的 Js

  由於 response 透過瀏覽器再回傳給瀏覽器上的 Js 做內容上的交換及取得，且因為 Ajax 為非同步處理，因此網頁不需要完全刷新，只要刷新有得到資料的局部頁面即可，不影響其他內容。

## JSONP 是什麼？

JSONP，JSON with Padding (填充)，是 JSON 的一種使用模式，是除了CORS 之外可以跨來源請求資料的方法。

在資料交換中，Ajax 受到同源政策的管制；但其中卻有幾個標籤不受同源政策的影響，例如 <img>、<iframe>、<script>。

JSONP 的操作，可以透過不受同源政策管制的 <script src=""></script> ，並在 src 中放上一個不同源的 URL。並在另外一個<script> 中宣告一個 Serve r端提供的 function。這個 function 是非同源的 URL 將回傳在<script>標籤中可以被執行的 function，function 中夾帶回傳的資料，瀏覽器再透過呼叫function生成 JSON資料。

## 要如何存取跨網域的 API？

1. CORS 跨來源資源共享 (Cross-Origin Resource Sharing)

   當因為受到同源政策的限制，發送 request 後回傳的 response 被瀏覽器擋下來時，會出現錯誤資訊`No 'Access-Control-Allow-Origin' header is present on the request resource.` 。而 `Access-Control-Allow-Origin` 的設定便決定了 client 端是否能存取此資源。

   當需要跨域存取時，server 端的 response header 需要加上 Access-Control-Allow-Origin，以存取其他來源特定資源。

   Access-Control-Allow-Origin 的設定可以是增加 Client 端的 Origin，或使用 `*` 意即代表接受所有的 Origin。

   

2. JSONP

   透過不受同源政策管制的 <script src=""></script> ，放入 Server 端提供的 URL。URL 回傳的可以是一個能夠在<script>標籤中被執行的 function，function 中夾帶回傳的資料，瀏覽器再透過呼叫function生成 JSON資料。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

這兩週的執行環境是不同的，第四週我們透過本地的 node.js 環境來發送 request 到 Server，這一週則是透過瀏覽器上寫 Javascript 來發送 request。

這兩者的根本差別是，既然是透過瀏覽器，瀏覽器有安全問題的規則限制，保護資料不被任意修改存取。而這個限制即為 Same Origin Policy 同源政策，一旦脫離瀏覽器便不存在。

而同源政策的限制，是 Client 及 Server 必須 : 

1. 相同協定 : http / https 即為不同源。
2. domain。
3. port (埠號，如有指定)。

