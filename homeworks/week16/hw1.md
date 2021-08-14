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

2. stack: `setTimeout(() => {
     console.log(2)
   }, 0)` 

   stack 清空

   webAPIs : setTimeout()

     讀秒後，計時器將 `()=> {console.log(2)}` 放入 cb queue
     
3. `console.log(3)` // 進入 stack，輸出 3

   stack 清空

4. stack: `setTimeout(() => {
     console.log(4)
   }, 0)` 

   stack 清空

   webAPIs : setTimeout()

     讀秒後，計時器將 `()=> {console.log4)}` 放入 cb queue
     
5. `console.log(5)` // 進入 stack，輸出 5

   stack 清空

6. stack 清空後，event loop 發揮功能將排在 cb queue 的第一個 cb `()=> {console.log(2)}` 推回到 stack並執行

7. stack 執行 `console.log(2)`

   // 輸出 2

   stack 清空

8. stack 清空後，event loop 發揮功能將排在 cb queue 的第二個 cb `()=> {console.log(4)}` 推回到 stack 並執行

9. stack 執行 `console.log(4)`

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



