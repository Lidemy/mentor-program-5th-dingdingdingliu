## 前情提要

這篇作業主要會放上自己對於整個部署流程中特別困惑部分的資料搜尋與檢討，最後有一個小小心得。流程的部分，會把整個流程筆記連結放在這邊 : 

上篇 : [AWS 遠端主機部署與連線](https://dingdingdingliu.coderbridge.io/2021/07/16/Virtual-Machine/) / 下篇 : [網域申請及網站部署遠端伺服器](https://dingdingdingliu.coderbridge.io/2021/07/16/domain-name/) 。

另外，作業內容也同時有筆記在 CodeBridge，想要有更好的閱讀體驗可以連結 : [遠端主機部署心得筆記](https://dingdingdingliu.coderbridge.io/2021/07/16/aws-experience/)。



## 正文開始

接下來記錄的部分是在遠端主機部署到最後將網站上傳的過程中，一些卡關的部分以及對於操作步驟不理解後的資料查詢內容，以及最後完成的心得筆記。

### 問題(一) : 為什麼要在 AWS 選擇 Ubuntu Server?

一開始我是選擇 Windows Server，並因此下載了遠端連線軟體，但不懂如何操作。這個問題我也持續解惑中，後來是先參考筆記選擇 Ubuntu Server，維基百科表示 :

> *Ubuntu 是著名的 Linux發行版之一，也是目前最多使用者的 Linux版本*

之前在操作終端機的過程中，也已經安裝過 Ubuntu，接下來的過程的操作原因，是因為選擇 Linux 系統與 Ubuntu，因此有相對應的方法。



### 問題(二) : 何時該使用 CLI 介面與 SSH 連線 ?

當 AWS 遠端主機部署完成後，繼續看 AWS 官方文件下載了遠端連線軟體，不太懂怎麼操作，覺得應該要換個方法。後來查到 AWS 的官方文件上有一段這樣的說明 :

> *如果是從執行 Windows 的本機電腦連接至 Linux 執行個體，請改為參閱下列文件：*
> *‧ 使用 PuTTY 從 Windows 連線至您的 Linux 執行個體*
> *‧ 使用 SSH 連線至您的 Linux 執行個體*
> *‧ 使用適用於 Linux 的 Windows 子系統，從 Windows 連接至 Linux 執行個體*



因此參閱了其官方文件 [使用 SSH 連線至您的 Linux 執行個體](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)，其中有以下說明 :

> *在終端機視窗中，使用 ssh 命令來連接到執行個體。您指定私密金鑰 (.pem) 的路徑和檔案名稱、執行個體的使用者名稱，以及執行個體的公有 DNS 名稱或 IPv6 位址。*



並介紹了用 IPv6 位址的 SSH 指令 (我是用 IPv4 位址) :
`ssh -i /path/my-key-pair.pem my-instance-user-name@my-instance-IPv6-address`



第一個變數是金鑰路徑，第三個變數是 IP 位址，第二個變數 `my-instance-user-name` 則查閱以下文章 :
[How to find the username of the instance launched in amazon-ec2?](https://stackoverflow.com/questions/20779454/how-to-find-the-username-of-the-instance-launched-in-amazon-ec2)，其中提到 :

> *For Ubuntu, the user name is ubuntu.*

因此第二個變數就是 ubuntu。如此便可以完成 ssh 連線指令，並順利連線至遠端主機。



### 問題(三) : 為什麼要更新 Ubuntu 與 安裝 Tasksel ?

#### 為什麼要更新 Ubuntu ?

[Ubuntu 更新與升級](https://project.zhps.tp.edu.tw/ethan/2019/03/ubuntu-更新與升級/) 這篇文章提到，在安裝完 Ubuntu 後，使用時還是要更新，以獲得最新的狀態。
更新的指令分別有以下 :

> 指令一：sudo apt-get update
> 說明：用來取得遠端更新伺服器的套件檔案清單。
>
> 指令二：sudo apt-get -y dist-upgrade
> 說明：更新套件。
>
> 指令三：sudo apt-get clean
> 說明：清除更新時所下載回來的更新(安裝)檔案。
>
> 指令四：sudo apt-get autoremove
> 說明：自動清除更新後用不到的舊版本檔案（例如舊的核心程式）



#### 為什麼要安裝 Tasksel ?

這個問題可能要再往上回到我們是為了要安裝 LAMP 的層面。
那為什麼要安裝 LAMP，什麼是 LAMP ?
參考這篇文章 : [安裝 LAMP Server + phpMyAdmin 在 Linux 系統上輕鬆架設網站](https://magiclen.org/lamp/)，其中提到:

> *LAMP是Linux系統上的開源架站組合，從名稱來看，「L」表示「Linux」作業系統，「A」表示「Apache」網頁伺服器，「M」表示「MySQL」資料庫，「P」表示「PHP」程式語言，而phpMyAdmin則是以PHP作為基礎的資料庫管理工具。*

因此我們安裝 LAMP Server，能夠包含以上的作用，而 Tasksel 是 Ubuntu 中一個多功能軟體包，裡面也包含了 LAMP Server，可以在安裝 Tasksel 後，再選擇安裝其中需要的部分。



### 問題(四) : 什麼是 sudo 指令 ?

Ubuntu 指令中，一直以 `sudo` 開頭，那到底為什麼呢 ? 原來 `sudo` 是 Linux 系統中的指令，讓我們能以系統管理者 ( root ) 的身分執行指令。

關於這點，參考了 [Linux 的 su 與 sudo 指令教學與範例](https://blog.gtwang.org/linux/sudo-su-command-tutorial-examples/) : 

> *sudo 指令類似 su，也是可以用來取得 root 或是其他帳號的權限，不過它在取得 root 或其他帳號權限的時候，是輸入自己的密碼，而不是 root 或其他帳號的密碼，使用上比較方便。*

維基百科中也提到 :

> *由於不需要超級使用者的密碼，部分Unix系統甚至利用sudo使一般使用者取代超級使用者作為管理帳號，例如Ubuntu、macOS等。*



### 問題(五) : MySQL 的指令是什麼意思 ?

安裝完 phpMyAdmin 之後，就是要設定 MySQL 的帳號密碼。查詢了指令內容，參考了這篇文章 : [MySQL Server 更改密碼](https://sites.google.com/site/sjlinuxweb/mysql_chagepasswd) 

> *MySQL 安裝完畢並且啟動MySQL服務後，預設的使用者帳號為root ，但root使用者一開始沒有密碼，因此我們可以透過MySQL指令來更改root 使用者密碼。*

因此我們一開始要先用 `root` 這個使用者帳號登入，再更改密碼。更改完成後，必須更新才能使用，因此最後透過指令 `FLUSH PRIVILEGES;` 更新讓新的密碼可以使用。

不過操作流程中查詢到的方式是使用 plugin，這個部分不太知道使用的方式，查詢了 MySQL 的官方文件 : [4.4.2 mysql_secure_installation — Improve MySQL Installation Security](https://dev.mysql.com/doc/refman/8.0/en/mysql-secure-installation.html)，`mysql_secure_installation` 這個 plugin 用來提升 MySQL 安裝安全性，並可以透過這個 plugin 來修改密碼。

官方文件提到 :

> *正常用法是連接本地MySQL服務器；不帶參數調用 mysql_secure_installation：*
> *mysql_secure_installation*
> *執行時，mysql_secure_installation 會提示您確定要執行的操作。*

而我們則是加入了 `sudo` 指令，在 `root` 的身分進行調用，並按照提示執行。



### 安裝心得

一開始其實考慮用 Google 的遠端主機服務，但嚐試操作後又看了 AWS 的官方文件，覺得對我而言寫得更清楚好懂，所以就決定照著文件操作看看，也的確執行得相當順利。
因為不清楚何時應該用 CLI 介面操作，但事後檢討做法，也發現官方文件中寫得相當清楚。而中間有幾個地方原本卡關，例如無法順利在瀏覽器上開啟遠端主機的 phpMyAdmin，這些部分因為問題很明確，所以搜尋後解決得比較順利。
其實整個過程下來，很多是因為不了解底層原因，也缺乏搜尋的關鍵字，讓操作比較困難。也希望透過這樣的流程檢討和更多對過程的了解，能幫助自己在之後的學習及應用上有更多經驗值。
架構的最後，使用自己的網域名稱能夠在瀏覽器上打開小作品的網頁，的確是一個滿開心的小小成果，的確是部署愉快了。

