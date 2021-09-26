## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### Basic Hook

##### useState : 

```
const [state, setState] = useState(initialState)

setState(newState)
```

用來存放及設定 component 中所用到的 state，首次 render 時回傳的 state 參數為一開始的預設值。而 `setState` 用來更新 state 的資料，當資料改變時，畫面會重新 render。

##### useEffect : 

紀錄在每一次 render 且瀏覽器 paint 之後要執行的 function。第一個參數會帶入該 function，第二個參數為一個陣列，用來放置必須關注狀態改變的資料，當改變時才會呼叫 useEffecet，當傳入一個空陣列時，effect 只執行和清除一次。

##### useContext : 

類似建立全域變數的概念，能讓資料不用透過 props 層層傳遞的方式就能被任意子層使用。當一個資料有多個子層需要使用的時候，即可以使用 useContext。

### Additional Hooks

##### useLayoutEffect：

功能與 useEffect 相似，useEffect 是記錄每一次 render 且瀏覽器 paint 之後要執行的 function，而 useLayoutEffect 是紀錄每一次 render 且瀏覽器 paint **之前**要執行的 function。

##### useCallback : 

用來記憶第一個參數 function 的記憶體位置，避免在重新渲染時被不必要地重新分配記憶體位置成為一個新的 function，第二個參數為一個放置此 function 依賴條件的陣列，當陣列內容的值被改變時，才會更新第一個參數的 function。

##### useMemo : 

用來回傳被記憶的一個值，第一個參數為一個計算值的 function ，第二個參數是其依賴陣列，當依賴陣列的內容被改變時，才會重新計算原本被記憶的值，可以避免在 re-render 的時候重複進行複雜的運算，是用來處理資料用的。

##### useRef：

用來抓取 DOM 節點，存放的值不會受到 render 影響，當其中資料的改變並不會影響到畫面的渲染時可以使用 ( 即這個資料的改變是必要的，但並不會出現在畫面上 )。在調用內容時需要用 `.current` 取值。

##### useImperativeHandle : 

useImperativeHandle 應與 forwardRef 一同使用。當子層使用 useRef 並再封裝成一個 component的時候，使用這個 hook 可以讓此 component (父層) 也能接收到 ref 。

##### useDebugValue : 

可用來在 React DevTools 中顯示自定義 hook 的標籤。

##### useReducer : 

為 useState 的替代方案，當 state 需要複雜的邏輯並且需要操作多個 state 時，使用 useReducer 比 useState 更加適合。



## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

### Mounting

- constructor()

  在 class component 的使用上，當 `constructor()` 時，這個 component 就被初始化並建構了，是開發者唯一指定 state 的地方，其餘地方則是透過 `this.setState` 的方式修改 state 的狀態。觸發的時機點為 component 被放至 DOM 前。

- getDerivedStateFromProps()

  在 render 之前改變值的方法，或當 props / state 更新時也會觸發這個方法，可以返回一個物件或是 null。

- render()

  將 return statement 後的 JSX 渲染到頁面上，當調用 setState 或 props 改變時都會觸發並 re-render 頁面。

- componentDidMount()

  render 函式執行完後就會調用 componentDidMount，ajax API 串接或綁定 DOM 事件都會在這個函式中執行，通常會和 componentWillUnmount  一起使用。

### Updating : props 或 state 改變而重新渲染時觸發

- getDerivedStateFromProps()

  檢查 `state` or `props` 是否有更新。

- shouldComponentUpdate()

  被呼叫的時間點為：改變 state 之後、執行 `render()` 之前。沒有特別指定的話則回傳 true，回傳的值為 true 則資料改變觸發 render，當回傳 false 時，畫面就不會被重新 render。

- render()

  根據更新的值重新渲染頁面。

- componentDidUpdate()

  在狀態更新且重新渲染後被觸發的函式，可以執行例如 call API 或 setState 更新值，但要小心避免無限迴圈早成的無盡重複 re-render。

### Unmounting

- componentWillUnmount()

  觸發的時機點為 component 從 DOM 之上移除( unmounting ) 前，可以清除綁定的 eventListener 或cookie、local storage 等，在這裏執行 setState 將不會觸發 re-render 。

## 請問 class component 與 function component 的差別是什麼？

### Class component

- 需繼承 React.Component 。
- 只要調用了 setState function 就會觸發 component 的重新渲染，即使值沒有改變，但調用了 setState 就會迫使元件重新渲染。
- 擁有this，而 this.props 的值跟著 this 的改變會一直更新。

### Functional component

- 可以用arrow function 宣告或是一般的function 。

- 沒有 this 的用法，props 的閉包概念會讓值一直是原本傳進來的那個值，不會改變。

- 程式碼相較 Class component 更精簡，因為沒有了繼承 ES6 class 語法再轉為 ES5 的過程。

  

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

兩者的差異主要在於 component 的資料是否被 React 控制，Controlled Component 的資料由 React 控制，而
Uncontrolled Component的資料則是由 DOM 控制。

使用 Controlled Component 的 時候，將資料透過 useState 的方式成為被 React 控制的資料， DOM element 資料來自於 Component 的 state，當 state 改變時畫面會重新渲染， state 與 UI 連動，兩者是一致的。

Uncontrolled Component 的資料由 DOM 控制，表單的狀態是由元件本身來做儲存和更新的，或是當一個 DOM 節點中的 value 是固定不會改變的時候，也會用 Uncontrolled Component 的方式直接處理。

