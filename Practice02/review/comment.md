### 完成度:90%
- - -
### 程式部分(code quality):
1. 在更換loading.gif的時候，使用如下的作法應是沒有辦法成功顯示loading.gif。
```
    picture.innerHTML = "<img src='./images/loading.gif' width='100' height='100'>";
    picture.innerHTML = image_list[count];
```
 
2. 用innerHTML的作法當然正確，但是會讓整個main.js檔充斥著重複的程式碼，可以考慮更換成別種寫法
3. HTML中的back_pic中間多包了一個span沒有刪掉
- - -
### 正確性
- 原則上基本要求皆有達到
- - -
### 可改進的部分:
- 除了第一項loading.gif的問題外，我認為其他問題都是可以接受的
- - -
### 值得欣賞的部分:
- 除了loading.gif無法成功顯示外，其他部份都有完成,算是中規中矩達到目標
- 有額外做預覽顯示的小圖片