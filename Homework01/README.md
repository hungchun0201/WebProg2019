# 概述
### 基本要求部分
本次作業所有基本要求本人皆有達到。唯為配合本人所作之個人化變動，因此"left"部分顯示稍有不同。
###  進階功能
本人在進階功能中，加入了月曆系統。使用者可以選擇不同的日期，輸入自己需要完成的事項。在todo list下方還會貼心地提醒使用者各個日期還剩下多少todo。
- - - - - - - - - - - -
# 基本功能概說
切換顯示功能中，我利用點擊不同元素時觸發不同函式的方式(ShowAll()、ShowActive()、ShoeCompleted())來實現切換畫面的方法。然而有時需要觸發函式，但卻並非利用點擊方法(比如加入todo時要刷新todolist)，所以我們需要紀錄一個叫做curr_area的變數，儲存目前是在哪一個區塊下。

顯示的函式如下
```
function ShowCurrInterface() {
    if (curr_area === "All") {
        ShowAll();
    } else if (curr_area === "Active") {
        ShowActive();
    } else if (curr_area === "Completed") {
        ShowCompleted();
    }
    refresh_count();
    ShowUncompleted();
}
```
refresh_count()是刷新0 left in this day用的。
ShowUncompleted()則是顯示每日尚有多少todo未完成。此部分會在進階功能詳解鍾進一部描述。
- - -
# 進階功能詳解
### 動機
  首先，在完成基本功能之後，我首先想到的是我們最常用的todolist其實就是行事曆，而日期在這之中無疑扮演著極度重要的腳色。因此，加入行事曆功能必能使其實用性大幅提升。
### 行事曆實作
由於沒有足夠的時間，因此行事曆是利用網路上模板修改而成。但其模板本身有利用到JQuery，使用了第三方函式庫，因此我有對其略做修改，沿用HTML以及CSS部分，並改成讓他不需JS也能完整顯示。而calender.js檔案中的內容則是本人親自繕打而成。

關於calander.js，我在行事曆中加入了一個名為is-today的class。選取到該class的td的話會反白，幫助使用者辨識目前選取到哪一天。其default的日期是當日，乃是利用以下方式完成:
```
let today = new Date();
curr_istoday = today.getDate();
```
在未來的main.js中，curr_istoday紀錄的是使用者目前選擇的日期，扮演著重要腳色。詳情可見calander.js中的changeSelect()函式。

排版部分選用flex，好讓行事曆可以顯示在右邊，方便操作，同時節省空間。

若有更多時間，我希望能利用JS內建的Date功能，完成一動態的月曆。但目前只能以寫死在HTML中的3月月曆為主。

### todolist及行事曆連結
calander.js最主要的目的是獲取使用者目前選定的日期。接著，我希望todo_list能夠因應不同的日子而顯示當日的未完成事項。因此，我在newItem的Object中，加入了date的資料，儲存那條todo是要在哪一日顯示。於是我新增todo_list時情況如下
```
        todo_list.push(new newItem(new_itemNode, false, curr_istoday));
```
而在Show相關的function時，for回圈內的if判斷需要改寫如下(此處以ShowActive()為例)
```
        if (todo_list[i]["iscompleted"] === false && todo_list[i]["date"] === curr_istoday) 
```
在原本情況下，只需判斷iscompleted為false即可。

在這樣的作法下，我便可以讓todolist只顯示當日未完成事項。

當然，剩下多少未完成todo(todo-count)以及clear completed按鈕是否刷新是依照當日未完成的量而定的。
### 各日todo總量提醒
在完成上面的內容後，使用者點選其他日期時，容易忘記之前是在哪個其他日期加入todo。因此我決定在todolist本體下額外加入一個區塊，提醒使用者在各區塊中曾加入多少todo。

此區域需要額外寫一個CSS的區塊。除此之外，也需要考量到爆框的可能性，因此我設了一個overflow:scroll的設計。

然而，我很快意識到其是否overflow是依據區塊的height決定的，沒有定義height屬性，就無法呈現scroll的樣式。然而height無法事先決定，因為其爆框與否除了和區域中的字數有關，也和上面的todolist有多高有關。因此我在JS檔之中，檢查該區塊是否爆框。若有則對其高度進行調整。如此便有效解決了無法偵測到爆框的問題。
```
let body = document.getElementsByTagName("body")[0];
    if (uncompleted_container.offsetTop + uncompleted_container.offsetHeight > body.offsetHeight - 10) {
        uncompleted_container.style.height = (body.offsetHeight - uncompleted_container.offsetTop - 10) + "px";
    } else {
        uncompleted_container.style.height = "";
    }
```

在main.js中，我使用了array的map，設計了二個共有31個element為0的Array。
```
let todo_in_each_day = Array.apply(null, Array(31)).map(Number.prototype.valueOf, 0);
let uncompleted_todo_in_each_day = Array.apply(null, Array(31)).map(Number.prototype.valueOf, 0);
```
第一個array紀錄的是各個日子裡面「__完成+未完成__」的todo總量。在加入或刪去todolist元素時，此array皆會進行更新。除此之外，第二個array則儲存該日子裡「__未完成__」的todo總量。如此一來，同時顯示會更為清楚，令使用者能一目瞭然。

因此，在印出下方區塊的信息時，便是同時印出uncompleted_todo_in_each_day / todo_in_each_day兩個值印出。每次更新時皆會重印一次訊息到螢幕上，相較於更新已存在節點的好處是，每次重印都可以依照日期重新sort一次，便於使用者閱讀。



