## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

- **<b></b>**  : 為粗體字的標籤，其中的文字會呈現粗體。
- **<embed />** : 用來置入影片、音樂或動畫，並由 src 屬性連結檔案路徑。
- **<textarea></textarea>** : 在 form 表單中，可用此標籤建立一個容納多行的文字輸入框。

## 請問什麼是盒模型（box modal）

CSS box-modal 是 HTML 的區塊元素所生成的矩形框， 其組成由內而外分別是 :

- content (內容) : 為區塊本身的寬高。
- padding (內邊距) : 為 content 與 border 之間的內距。
- border (邊框)
- margin (外邊距) : 為 border 之外和其父子元素或兄弟元素之間的外距。

box-modal 可透過調整 display 及position 等佈局規則，呈現各區塊內容的排版。



## 請問 display: inline, block 跟 inline-block 的差別是什麼？

**display 為標籤元素的顯示模式，每一個標籤都有其預設的 display 屬性。**

#### inline :

- 預設 display : inline 的標籤為 <span> / <a> /<input> / <img>。
- 寬高是由其內容撐開，無法另外設定。
- 元素在同一行內呈現，圖片及文字都不換行。
- margin : 可設定及呈現左右，上下不行。
- padding : 可設定，但不會影響內容的排版位置，當有背景或 border 時能夠看出效果



#### block :

- 預設 display : block 的標籤為 <div> / <h1> /<p> / <ul> <li>。
- 寬高 / margin / padding 會按設定顯示，但實際上還是占滿整行。
- 由上到下排列。



#### inline-block

- 以 inline 的同一行內呈現方式出現。
- 具有 block 的屬性，可設定元素的寬高 / margin / padding。




## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

**position 定位屬性，將元素按定位方式分為兩大類 (相對定位 / 絕對定位)，分類關鍵為元素是否按照排版預設方式進行排列，或是跳脫預設方式另外定位。**



### 相對定位

相對定位為按照排版預設方式進行排列的定位屬型，其中 static 與 relative 即屬於此類。

#### static : 

- 為預設的定位方式，不跳脫排版順序，且不以特殊位置來排列。

#### relative : 

- 不跳脫排版順序，但元素以原本的位置作為原點來移動。



### 絕對定位

相對定位為按照排版預設方式進行排列的定位屬型，其中 absolute 與 fixed 即屬於此類。

#### absolute : 

- 跳脫排版順序，以特定元素為原點，自身元素以左上角為標準點移動。
- 定位點之特定元素，為所需定位的元素往上找，第一個 position 不是 static 的元素。

#### fixed : 

- 跳脫排版順序，以視窗為原點來移動。





