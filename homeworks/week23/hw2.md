## 為什麼我們需要 Redux？

當專案架構較大，會有較多全域的資料需要被管理與使用時，使用 Redux 的效能可以比 React 中的 context 更好之外，並且擴充性會更佳，`app.js` 的頁面也可以更乾淨好維護。 

當有多個 component 需要共用 state 時，有的時候提升到 context 會讓程式碼更龐雜，使用 Redux 之後可以更容易的取用並進行全域資料的處理。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是一種「狀態管理工具」，提供 `store` 儲存全域可用的 state，而其當中可以有多個 state 被包含，並同樣是透過 state 來改變 UI 畫面。當我們想要改變 state 時，會 `dispatch` 指定的 `action` ，並透過 `store` 中的 `reducer` 回傳一個新的 state，進而改變畫面。

元件如下:

1. `action`

   是一個 object，裡面存放 `type` (必須) 與 `payload` (不必須，如同參數的概念) ，`type` 記錄這個 action 的型別，來對應指定的 function，`payload` 則是當該 function 需要傳入指定參數時使用。

2. `Action Creators` 

   回傳 `action` 的 function。

3. `Reducer`

   是一個 pure function，以 state 與 action 為參數，透過 actionTypes 的設定回傳指定的新 state，進而改變畫面。

4. `dispatch`  

   store 中的 method，action 為其引入的參數，藉此觸發 reducer 中指定的運作。

5. `selector`

   可以視為 function，可以從 store 中取得指定的 state。

6. `store` 

   將上述資料集中管理的 container，是一個物件。



Redux 的架構是單向資料流，並且按照以下的步驟進行:

當使用者觸發指定的事件時，`dispatch` 將指定的`action` 送到 `store` 觸發 `reducer`，並透過指定內容來更新 state，並因 state 改變重新渲染畫面。 

 


## 該怎麼把 React 跟 Redux 串起來？

使用 React Redux並有兩種方法 : `hooks` 或 `connect API`。

##### hooks:

`useSelector` :  透過指定的 `selector` function 提取 `store` 中的指定 State

`useDispatch` :  component 中可以利用 dispatch 來觸發 store 中的 reducers 來更新 state。

##### connect API:

利用 `connect` 把 `store` 與 `components` 關聯在一起，再透過 `mapStateToProps`、`mapDispatchToProps` 等 function 把 Redux 的 `state`、`dispatch` 綁定到 components 的 `props`，讓 components 能透過 `props` 中的 `state` 和 `dispatch` 來操作資料並改變畫面。

