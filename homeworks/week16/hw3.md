# 作業三: Hoisting

### 作業程式碼 : 

```javascript
var a = 1
function fn(){
  console.log(a) //undefined
  var a = 5
  console.log(a) //5
  a++
  var a
  fn2()
  console.log(a) //20
  function fn2(){
    console.log(a) //6
    a = 20
    b = 100
  }
}
fn()
console.log(a) //1
a = 10
console.log(a) //10
console.log(b) //100
```



### 執行過程與作用域

1. 進入 global 並初始化

   ```
   global EC {
   	VO : {
   		a: undefined,
   		fn: function
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: globalEC.VO
   ```

2. `global` : 執行 `var a = 1`

   ```
   global EC {
   	VO : {
   		a: 1
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: global.scopeChain === [globalEC.VO]
   ```

3. 初始化 `fn`

   ```
   fn EC {
   	AO : {
   		a: undefined // 第四行 var a hosting
   		fn2: function
   	},
   	scopeChain: [fnEC.AO globalEC.VO]
   }
   
   隱藏屬性:
   fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
   
   global EC {
   	VO : {
   		a: 1
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: global.scopeChain === [globalEC.VO]
   ```

4. `fn()` : 執行 `console.log(a)`

   => `undefined`

5. `fn()` : 執行`var a = 5`

   ```
   fn EC {
   	AO : {
   		a: 5 
   		fn2: function
   	},
   	scopeChain: [fnEC.AO globalEC.VO]
   }
   
   隱藏屬性:
   fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
   
   global EC {
   	VO : {
   		a: 1
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: global.scopeChain === [globalEC.VO]
   ```

6. `fn()` : 執行 `console.log(a)`

   => `5`

7. `fn()` : 執行 `a++`

   ```
   fn EC {
   	AO : {
   		a: 6 
   		fn2: function
   	},
   	scopeChain: [fnEC.AO globalEC.VO]
   }
   
   隱藏屬性:
   fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
   
   global EC {
   	VO : {
   		a: 1
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: global.scopeChain === [globalEC.VO]
   ```

8. `fn()` : 執行 `var a`

9. 初始化`fn2`，沒有變數與函式的宣告

   ```
   fn2 EC {
   	AO : {
   
   	},
   	scopeChain: [fn2EC.AO fnEC.AO globalEC.VO]
   }
   
   fn EC {
   	AO : {
   		a: 6 
   		fn2: function
   	},
   	scopeChain: [fnEC.AO globalEC.VO]
   }
   
   隱藏屬性:
   fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
   
   global EC {
   	VO : {
   		a: 1
   	},
   	scopeChain: [globalEC.VO]
   }
   
   隱藏屬性:
   fn.[[scope]]: global.scopeChain === [globalEC.VO]
   ```

10. `fn2()` : 執行 `console.log(a)`

    由於 `fn2` 沒有宣告變數 `a`，於是往作用域上一層去尋找，在 `fn` 找到變數`a ` 的值

    => `6`

11. `fn2()` : 執行 `a = 20 `  變數重新賦值

    對 `fn` 的變數 `a` 重新賦值: 

    ```
    fn2 EC {
    	AO : {
    
    	},
    	scopeChain: [fn2EC.AO fnEC.AO globalEC.VO]
    }
    
    fn EC {
    	AO : {
    		a: 20 
    		fn2: function
    	},
    	scopeChain: [fnEC.AO globalEC.VO]
    }
    
    隱藏屬性:
    fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
    
    global EC {
    	VO : {
    		a: 1
    	},
    	scopeChain: [globalEC.VO]
    }
    
    隱藏屬性:
    fn.[[scope]]: global.scopeChain === [globalEC.VO]
    ```

12. `fn2()` : 執行 `b = 100 `  變數重新賦值，

    但 `fn2` 本身沒有宣告變數 `b` ，往 `fn` 尋找也沒有，再往上一層作用域尋找，在`global` 也沒有找到，

    於是將 `b` 宣告為全域變數於 `global` 並賦值: 

    ```
    fn2 EC {
    	AO : {
    
    	},
    	scopeChain: [fn2EC.AO fnEC.AO globalEC.VO]
    }
    
    fn EC {
    	AO : {
    		a: 20 
    		fn2: function
    	},
    	scopeChain: [fnEC.AO globalEC.VO]
    }
    
    隱藏屬性:
    fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
    
    global EC {
    	VO : {
    		a: 1
    		b: 100
    	},
    	scopeChain: [globalEC.VO]
    }
    
    隱藏屬性:
    fn.[[scope]]: global.scopeChain === [globalEC.VO]
    ```

13. `fn2` 執行結束， pop off

    ```
    fn EC {
    	AO : {
    		a: 20 
    		fn2: function
    	},
    	scopeChain: [fnEC.AO globalEC.VO]
    }
    
    隱藏屬性:
    fn2.[[scope]]: fn.scopeChain === [fnEC.AO globalEC.VO]
    
    global EC {
    	VO : {
    		a: 1
    		b: 100
    	},
    	scopeChain: [globalEC.VO]
    }
    
    隱藏屬性:
    fn.[[scope]]: global.scopeChain === [globalEC.VO]
    ```

14. `fn()` : 執行 `console.log(a)`

    => `20`

15. `fn()` 執行結束，pop off

    ```
    global EC {
    	VO : {
    		a: 1
    		b: 100 
    	},
    	scopeChain: [globalEC.VO]
    }
    
    隱藏屬性:
    fn.[[scope]]: global.scopeChain === [globalEC.VO]
    ```

16. `global` : 執行 `console.log(a)`

    => `1`

17. `global` : 執行 `a = 20` 重新賦值

    ```
    global EC {
    	VO : {
    		a: 20
    		b: 100 
    	},
    	scopeChain: [globalEC.VO]
    }
    
    隱藏屬性:
    fn.[[scope]]: global.scopeChain === [globalEC.VO]
    ```

18. `global` : 執行 `console.log(a)`

    => `20`

19. `global` : 執行 `console.log(b)`

    => `100`



### 程式碼輸出結果 : 

```
undefined
5
6
20
1
10
100
```

