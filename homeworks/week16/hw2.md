# 作業二 : Event Loop + Scope

### 作業程式碼 :

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```



### 執行步驟與作用域建立 : 

1. 進入 `global` 並初始化 global EC

   ```javascript
   global EC {
       VO : {
         i = undefined,  
       },
   	scopeChain = [globalEC.VO]
   }
   ```

2. call stack : 進入到 `for` 迴圈

   ```
   global EC {
       VO : {
         i = 0,
       },
   	scopeChain = [globalEC.VO]
   }
   ```

3. 判斷 `i < 5` 成立，

   call stack :  `console.log('i:' + i)` // 輸出 `i: 0`

   call stack :  清空

4. `setTimeout()` ，初始化 function

   ```
   function EC {
   	AO : {
   	 
   	},
   	scopeChain = [functionEC.AO, globalEC.VO ]
   }
   
   global EC {
       VO : {
         i = 0,
       },
   	scopeChain = [globalEC.VO]
   }
   ```

5. call stack : `setTimeout()` 

   call stack : 清空

   webAPIs : `setTimeout()` 

   cb queue : `0` *1000毫秒後將 cb 推到 cb queue，存放第一個 cb

6. `i++`

   ```
   function EC {
   	AO : {
   	 
   	},
   	scopeChain = [functionEC.AO, globalEC.VO ]
   }
   
   global EC {
       VO : {
         i = 1,
       },
   	scopeChain = [globalEC.VO]
   }
   ```

7. 判斷 `i < 5` 成立，

   call stack :  `console.log('i:' + i)` // 輸出 `i: 1`

   call stack :  清空

8. call stack : `setTimeout()` 

   call stack : 清空

   webAPIs : `setTimeout()` 

   cb queue : `１` *1000毫秒後將 cb 推到 cb queue，存放二個 cb

9. `i++`

   ```
   function EC {
   	AO : {
   	 
   	},
   	scopeChain = [functionEC.AO, globalEC.VO ]
   }
   
   global EC {
       VO : {
         i = 2,
       },
   	scopeChain = [globalEC.VO]
   }
   ```

10. 判斷 `i < 5` 成立，

    call stack :  `console.log('i:' + i)` // 輸出 `i: 2`

    call stack :  清空

11. call stack : `setTimeout()` 

    call stack : 清空

    webAPIs : `setTimeout()` 

    cb queue : `2` *1000毫秒後將 cb 推到 cb queue，存放三個 cb

12. `i++`

    ```
    function EC {
    	AO : {
    	 
    	},
    	scopeChain = [functionEC.AO, globalEC.VO ]
    }
    
    global EC {
        VO : {
          i = 3,
        },
    	scopeChain = [globalEC.VO]
    }
    ```

13. 判斷 `i < 5` 成立，

    call stack :  `console.log('i:' + i)` // 輸出 `i: 3`

    call stack :  清空

14. call stack :  `setTimeout()` 

    call stack :  清空

    webAPIs :  `setTimeout()` 

    cb queue :  `3` *1000毫秒後將 cb 推到 cb queue，存放四個 cb

15. `i++`

    ```
    function EC {
    	AO : {
    	 
    	},
    	scopeChain = [functionEC.AO, globalEC.VO ]
    }
    
    global EC {
        VO : {
          i = 4,
        },
    	scopeChain = [globalEC.VO]
    }
    ```

16. 判斷 `i < 5` 成立，

    call stack :  `console.log('i:' + i)` // 輸出 `i: 4`

    call stack :  清空

17. call stack : `setTimeout()` 

    call stack : 清空

    webAPIs : `setTimeout()` 

    cb queue : `4` *1000毫秒後將 cb 推到 cb queue，存放五個 cb

18. `i++`

    ```
    function EC {
    	AO : {
    	 
    	},
    	scopeChain = [functionEC.AO, globalEC.VO ]
    }
    
    global EC {
        VO : {
          i = 5,
        },
    	scopeChain = [globalEC.VO]
    }
    ```

19. 判斷 `i < 5` 不成立，跳出迴圈

20. call stack : 空，

    event loop 執行讓 cb queue 中的 cb 按順序推回 stack 執行

    stack : `(){console.log(i)}` // 第一個 cb

    stack : `console.log(i)`

    `functionEC.AO` 中找不到 `i` ，所以往 `globalEC.VO` 找，`i` = `5` // 輸出 `5`

    call stack : 清空

    ```
    function EC {
    	AO : {
    	 
    	},
    	scopeChain = [functionEC.AO, globalEC.VO ]
    }
    
    global EC {
        VO : {
          i = 5,
        },
    	scopeChain = [globalEC.VO]
    }
    ```

21. 第二個 cb 推回 stack 執行

    stack : `(){console.log(i)}` // 第二個 cb

    stack : `console.log(i)`

    `functionEC.AO` 中找不到 `i` ，所以往 `globalEC.VO` 找，`i` = `5` // 輸出 `5`

    call stack : 清空

22. 第三個 cb 推回 stack 執行

    stack : `(){console.log(i)}` // 第三個 cb

    stack : `console.log(i)`

    `functionEC.AO` 中找不到 `i` ，所以往 `globalEC.VO` 找，`i` = `5` // 輸出 `5`

    call stack : 清空

23. 第四個 cb 推回 stack 執行

    stack : `(){console.log(i)}` // 第四個 cb

    stack : `console.log(i)`

    `functionEC.AO` 中找不到 `i` ，所以往 `globalEC.VO` 找，`i` = `5` // 輸出 `5`

    call stack : 清空

24. 第五個 cb 推回 stack 執行

    stack : `(){console.log(i)}` // 第五個 cb

    stack : `console.log(i)`

    `functionEC.AO` 中找不到 `i` ，所以往 `globalEC.VO` 找，`i` = `5` // 輸出 `5`

    call stack : 清空

25. 程式執行完畢，執行環境 pop off



### 輸出結果

```
0
1
2
3
4
5
5
5
5
5
```



