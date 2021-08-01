# 作業一 : Event Loop

### 作業程式碼 : 

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```



###程式碼輸出 : 

1. `console.log(1)` // 進入 stack，輸出 1

   stack 清空

2. `setTimeout(() => {
     console.log(2)
   }, 0)`  // 進入 stack，將這個 setTimeout() 放入 webAPIs 進行計時器

   stack 清空

   讀秒後，計時器將 `console.log(2)` 放入 cb queue，webAPIs 清空

3. `console.log(3)` // 進入 stack，輸出 3

   stack 清空

4. `setTimeout(() => {
     console.log(4)
   }, 0)`  // 進入 stack，再將這個 setTimeout() 放入 webAPIs 進行計時器

   stack 清空

   讀秒後，計時器將 `console.log(4)` 放入 cb queue，webAPIs 清空

5. `console.log(5)` // 進入 stack，輸出 5

   stack 清空

6. stack 清空後，event loop 發揮功能將排在 cb queue 的第一個 cb `console.log(2)` 推回到 stack 並執行

   // 輸出 2

   stack 清空

7. stack 清空後，event loop 發揮功能將排在 cb queue 的第二個 cb `console.log(4)` 推回到 stack 並執行

   // 輸出 4

   stack 清空



### 輸出結果 : 

```Javascript
1
3
5
2
4
```



