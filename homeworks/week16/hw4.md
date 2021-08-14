# 作業四: What is this?

### 作業程式碼 :

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```



### 將最後的輸出解構

首先先確定是否是在物件導向的環境下呼叫函式:

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
```



確定是以後，再來看以下輸出的程式碼: 

```javascript
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()
obj2.hello() 
hello() 
```

`obj.inner.hello()` 可以視為 `obj.inner.hello.call(obj.inner)`

=> `this` = `obj.inner`

=> `obj.inner` : `{value:2, hello: function}`

=> `hello() { console.log(this.value)}` 

=> 輸出 `2`



`obj2.hello() ` 可以視為 `obj2.hello.call(obj2)`

=> `obj2` = `obj.inner`

=> `this` = `obj2` = `obj.inner`

=> `obj.inner` : `{value:2, hello: function}`

=> `hello() { console.log(this.value)}` 

=> 輸出 `2`



`hello()` 可以視為 `hello.call()`

=> 因為沒有可以傳進 `hello.call()` 當參數的東西

=> = `hello.call(undefined)`

=> `this` = `(undefined)`

=> `hello() { console.log(this.value)}` 

=> 輸出 `undefined`



### 程式碼輸出: 

```
2
2
undefined 
```

