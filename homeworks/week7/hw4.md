## 什麼是 DOM？

DOM 的全名是 Document Object Model，將 HTML 的文件 ( Document ) 以樹狀有階層的結構 ( 類似物件即 Object ) 來表示的模型 ( Model ) 。

瀏覽器在讀取 HTML 的架構的時候，按照上下順序及階層會建立 DOM Tree，將 HTML 文件定義成物件般的節點，而節點所形成的樹狀結構才使其名為 DOM Tree。

DOM 並非是 HTML 或  Javascript 的其中一個，而是一種將兩者連結在一起的介面。在 DOM 中，每一個標籤、文字、圖片等都是一個節點，Javascript 則透過這些節點對 HTML 內容進行存取或操作。

節點通常分成四類 : 

- Document 

  指的就是當前的 HTML 文件，當要查找任何節點時，都會從文件的開頭往下查找。

- Element

  HTML 中的標籤都屬於此類。

- Text

  為被標籤包起來的文字內容。

- Attribute

  為標籤內的屬性，class、id 都屬於此類。

而 DOM 是樹狀階層結構，因此節點之間的階層關係 ( 父子層、兄弟層 ) 是應用操作上必備的概念。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞機制的順序是 : 捕獲 → 目標 → 冒泡。即所謂「先捕獲，再冒泡。」

捕獲階段 : 當事件被觸發時，會從根節點 (window) 開始往下尋找目標 (target) 。

目標階段 : 找到目標的時候就是目標階段。當在目標節點時，不分捕獲和冒泡。

冒泡階段 : 最後，再從目標往上一路逆傳回去根節點。

## 什麼是 event delegation，為什麼我們需要它？

event delegation ，事件委派，是一種透過事件傳遞機制，而減少監聽器設置的方法。

當需要多個監聽器而彼此性質非常相似的時候，過多的掛載、移除都是重複沒有效率的做法。

當我們需要在一個父節點中的多個子節點設定事件監聽時，我們可以將監聽器綁定在父節點上，透過冒泡的機制 ( 子節點會冒泡到父節點 ) ，當觸發指定的子節點時，因為冒泡到父節點觸發了監聽器，而進行設定的內容。

這個概念類似一個統包的概念，可以用類似 box-modal 的盒子去想像，當有多個需要觸發且性質類似的子節點都裝在父節點的盒子中，我們只要對父節點的盒子設定監聽器，就可以接受到裡面對子節點的指令，進行處理




## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

- event.preventDefault() 

  是取消瀏覽器的預設行為，和事件傳遞毫無關係。

  例如在 form 中，當 submit 這個事件被觸動時，瀏覽器的預設行為會是將表單欄位內的資料提交到資料庫。但當想要用 Javascript 先驗證表單內容是否錯誤時，必須先取消這個預設行為，才能在驗證後傳送。

- event.stopPropagation() 

  是在需要終止事件傳遞時使用。

  addEventListener 中，有第三個參數 true / false，true 是「捕獲階段」，false 是「冒泡階段」，如果沒有參數則預設是 false，終止事件也會在冒泡階段被截斷，有設定的話則是按造參數在其指定的階段被截斷。

  例如當有一個 HTML 文件如下: 

  ```html
  <body class="body">
    <div class="box"></div>
  </body>
  ```

  然後我們希望在 `<div class="box"></div>` 上設定 addEventListener，當觸發時可以 alert 元素的 className。

  如果我們沒有終止冒泡的過程，當事件觸發時，在同一個階層關係中的 `<body class="body">` 也會被觸發。

  因此我們需要 :

  ```javascript
  const box = document.querySelector('.box')
  box.addEventListener('click', e => {
      e.stopPropogation(); //終止冒泡事件
      alert('click box')
    },
    false
  )
  ```

