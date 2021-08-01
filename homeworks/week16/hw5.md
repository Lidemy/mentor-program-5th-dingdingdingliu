## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

這週課程影片時長不長，但都要經過重複的觀看才能比較理解，也搭配老師的文章。作業五的心得我將自己對於本週課程的一些理解寫下來；至於學習的心情就是參雜著困惑與愉快，影片看三次都看不懂的時候很痛苦，某些困惑點解開的瞬間相當愉快。

經過這週課程，有一些之前不懂的東西比較理解了:

1. 資料型態

   之前解期中考試的時候有用到 `console.log(typeof([arr]) === array)` ，卻輸出了 `false` ，當下很困惑，然後 `console.log(typeof([arr]))` 之後發現輸出的是 `object` 。

   原來資料型態中，`array` 的資料型態也是屬於 `object` ，但也可以用 `Array.isArray()` 的方式去驗證是否為 `array` 。

2. scope

   在優化第十二週作業時，作業中的功能比較多，將重複的程式碼打包成 function 的情況也多，其實就有發現自己對作用域不是很熟悉，當架構複雜的時候會對變數必須宣告在哪邊很混亂，加上自己都是用 `let` 和 `const` ，這週理解到這兩個變數宣告的方式會讓變數的作用域僅存於 `{}` 之內。

3. hosting

   進入課程時的小測驗，當時完全不懂 hosting，其實 hosting 相對閉包與 prototype、this 好懂許多。

   自己比較容易混淆的是在 `let` 和 `const` 的狀況下，這兩者的 hosting 稍微不直覺，特別是 TDZ 的開始與結束比較難懂，我後來的理解是當進入該變數的作用域時 TDZ 就開始了，直到變數賦值後才結束。

4. Scope Chain : EC ( Execution Context 執行環境 ) 與 VO ( Variable Object )

   是 scope 和 hosting 學習後的綜合理解，如果沒有理解上面兩點的話就會無法理解 scopeChain。

5. event loop

   看完影片後，理解最多的是程式執行的過程以及對同步 / 非同步的狀態下會如何執行，有比較清楚的畫面建構。

   一邊看影片也針對其中不懂的地方尋找文章來看，[Stack 與 Heap 有何差別](https://medium.com/@yauhsienhuang/stack-%E8%88%87-heap-%E6%9C%89%E4%BD%95%E5%B7%AE%E5%88%A5-acdcc11263a0) 這篇文章也幫助我釐清了一點問題。



持續理解中但沒有上面幾點清楚的是:

1. 閉包

   目前的理解是去推用 Scope Chain 的想法，原本當一個 function 結束時，其 EO 與 AO 也會 pop off，但在閉包的使用上因為 return 了 function 中的某一個 function，而當被 return 的 function 還需要用到原本 function 裡面的變數時，原 functionEO 會被 pop off，但原 functionAO 必須保留。

2. Prototype 原型練 

   當我們需用重複使用大量的物件導向 function 帶入不同參數，會讓記憶體將那些不同參數的 function 視為不同的 function，使得記憶體大量被耗損。因此可以使用 `new` 來設定一個 function 為 `constuctor` 後，而同樣的功能也能利用 `prototype` 與 `__proto__` 的機制達成。

   參考課程影片中的這個範例去理解: 

   ```javascript
   function Dog(name) {
   	this.name = name
   }
   
   Dog.prototype.getName = function(){
   	return this.name
   }
   
   Dog.prototype.sayHello = function(){
   	console.log(`Hello! ${this.name}`)
   }
   
   var d = new Dog('wang')
   d.sayHello()
   
   console.log(d.__proto__) //Dog { getName: [Function], sayHello: [Function] }
   console.log(Dog.prototype) //Dog { getName: [Function], sayHello: [Function] }
   
   //d.__proto__ === Dog.prototype
   ```

   我的理解是承接 new function 的變數的 `__proto__`，等同於繼承了該 function 的 `prototype`，但這個關係不只是繼承，是一個鍊狀結構: 

   `d.__proto__` === `Dog.prototype` ⇒ 這是 `new` 設定的

   `d.__proto__.__proto__` ⇒ `Object.prototype`

   `Dog.prototype.__proto__` ⇒ `Object.prototype`

   但有一點困惑的是，不知道這邊的 `Object` 代表的是甚麼? 這個在持續尋找答案中。

3. this

   關於這個部分，理解到的是 : 

   (1). this 的值和呼叫的環境有很大的相關，如果不是在物件導向的環境下呼叫，`this` 就會是 `global` 或瀏覽器上的 `window`，或是嚴格模式 ( ' use strict ' ) 下的 `undefined`

   (2). `this` 的值和它在哪裏被宣告無關，和怎麼去呼叫才有關。

   (3). 可以用 `.call()` 的方式去拆解，來了解`this` 的值會指向哪裏

   ```javascript
   'use strict'
   
   const obj = {
   	a: 123,
   	test: function() {
   		console.log(this)
   	}
   }
   obj.test() // 看成 obj.test.call(obj)
   //{ a: 123, test: [Function: test] } => obj
   
   
   const obj = {
   	a: 123,
   	inner: {
   		test: function() {
   			console.log(this)
   		}
   	}
   }
   obj.inner.test() => obj.inner.test.call(obj.inner)
   //{test: [Function: test] } => obj.inner
   
   
   const obj = {
   	a: 123,
   	inner: {
   		test: function() {
   			console.log(this)
   		}
   	}
   }
   const func = obj.inner.test()
   func() => func.call()
   //undefined => func.call(undefined)因為前面沒有東西可以成為帶入 call() 的參數 
   ```

   

   (4). 唯一例外的是 `DOM` 的 `addEventListener` ，被監聽到的指定事件就是 `this`

   
