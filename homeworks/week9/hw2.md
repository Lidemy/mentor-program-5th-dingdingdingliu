## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

1. 是否可以設定最大長度 : 

   - varchar :

     可以設定最大長度，目前版本 ( MySQL 5.0.3 之後 ) 可設定字節最大值為 65535，自己在 SQL 資料庫中嘗試設定看看，發現字元最大值因為編碼排序設定為 utf8mb4，因此每一字元最多可由 4 個字節設定，因此 varchar 的最大值可以設定為 16380 ，超過就會變成 mediumtext 了。

   - text : 

     不可以設定最大長度，最大長度為 2 ^ 31 - 1 個字符，無法預設

2. 文字量大小 : 

   - varchar : 

     當文字量比較小的時候或需要設定最大值的時候，建議用 varchar。

   - text : 

     文字量比較大的時候，建議用 text 。

3. 查詢速度 : 

   - varchar > text
   - 當 varchar 或 text 皆可使用的情況下，選擇查詢速度較快的 varchar。



## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

- Cookie 是 Server 傳送給瀏覽器，並要求瀏覽器存載的資訊，是小型的文字檔案。而瀏覽器再度帶著 Server 要求存載的 Cookie 內容發 request 給 Server時，Server 便能根據 Cookie 的內容決定狀態。因此 Cookie 是一種實作 Session 的方式，憑藉著雙方共同的認知:  Server 指定的資料，及瀏覽器被要求存在 Cookie 的資訊達成協定。
- Server 透過 response header 傳送 set-cookie 的 header，讓瀏覽器設定 cookie 為指定內容，而當瀏覽器再度發 request 的時候，會在 request header 帶上帶有指定內容的 cookie。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

- 密碼是用明文儲存，因此當資料庫的資料被偷竊時會出現資安的問題。
