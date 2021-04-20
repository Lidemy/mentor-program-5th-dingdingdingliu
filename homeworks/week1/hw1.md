## 交作業流程

1. 根據連結進入自己的 github 作業介面

2. 找到 code 按鈕，複製網址

3. 開啟 git

4. `git clone `  + 複製的網址

5. 開啟 git 並 `cd` 進入 mentor-program-5th 資料夾

6. 本地環境裡出現作業的資料夾，按週別點入

7. 進到作業檔案完成作業 (我下載 Typora 以開啟 md 檔案，並使用 markdown 格式)

8. 完成一個以上作業之後，可選擇回到 git 

9. `git status` 可看到儲存新內容的檔案被顯示修改，並尚未 commit

10. `git diff` 確認檔案修改的內容，`q` 可以離開

11. 目前的 `branch ` : master

12. `git branch 'branch名稱'` 為當週作業新開一個 branch 並命名

13. `git checkout 'branch名稱'` 切換到指定 branch
    (另可用 `git checkout -b 'branch名稱'` 建立 branch 後切換過去)

14. 修改 / 新增內容的作業，必須先`git add` 進入暫存區區 ( Staging Area )，再 `git commit -m 'branch名稱' `進行版本儲存。

    (此處可用 `git commit -am 'branch名稱'` 進行 )

15. `git push origin week1` 將作業 push 推入遠端頁面 ( week1 可更換成不同週別)

16. 至 github 作業介面重新整理，確認檔案已 push 並出現新增branch

17. 確認完畢按下 pull request 按鈕 並 create

18. 如需改動作業內容，修改作業檔案後重複 14~15 項，至遠端頁面上重新整理即可看到新版本已出現

19. 複製 pr 作業網址，至學習系統繳交作業處提交

20. 待助教改完將遠端的 branch merge 至 master

21. `git pull origin master` 將遠端的 master 拉回本地環境同步

22. `git branch -d '已 merge master 的當週作業branch' ` 將本地的 branch 刪除