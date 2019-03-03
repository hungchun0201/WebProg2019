image_list=["<img src='./images/steak01.jpg' width='500' height='500'>", 
"<img src='./images/steak02.jpg' width='500' height='500'>",
"<img src='./images/steak03.jpeg' width='500' height='500'>",
"<img src='./images/steak04.jpg' width='500' height='500'>", 
"<img src='./images/steak05.jpg' width='500' height='500'>"];
image_list2=["<img src='./images/no.jpg' width='100' height='100'>",
"<img src='./images/steak01.jpg' width='100' height='100'>", 
"<img src='./images/steak02.jpg' width='100' height='100'>",
"<img src='./images/steak03.jpeg' width='100' height='100'>",
"<img src='./images/steak04.jpg' width='100' height='100'>", 
"<img src='./images/steak05.jpg' width='100' height='100'>",
"<img src='./images/no.jpg' width='100' height='100'>"];
image_source=["source:https://www.yooho.com.tw/goods.php?id=2869", 
"source:https://www.walkerland.com.tw/article/view/166744", 
"source:https://www.storm.mg/lifestyle/223788", 
"source:https://www.tripadvisor.com.tw", 
"source:https://food.ltn.com.tw/article/6333"];
var count = 0;
var previewBack = document.getElementById("backpic");
var previewNext = document.getElementById("nextpic");
var picture = document.getElementById("pic");
var source = document.getElementById("sourceID");
var backButton = document.getElementById("backButton");
var nextButton = document.getElementById("nextButton");
backButton.className += " disabled";

var backPicture = function (){
    if (count > 0){
        count -= 1;

        picture.innerHTML = "<img src='./images/loading.gif' width='100' height='100'>";
        picture.innerHTML = image_list[count];
        source.innerHTML = image_source[count];
        previewBack.innerHTML = image_list2[count];
        previewNext.innerHTML = image_list2[count + 2];
    }
    if (count === 0){
        backButton.className += " disabled";
    }
    else if (count === image_list.length - 1){
        nextButton.className += " disabled";
    }
    else{
        backButton.classList.remove("disabled")
        nextButton.classList.remove("disabled")
    }
}
var nextPicture = function (){
    if (count < image_list.length - 1){
        count += 1;
        picture.innerHTML = "<img src='./images/loading.gif' width='100' height='100'>";
        picture.innerHTML = image_list[count];
        source.innerHTML = image_source[count];
        previewBack.innerHTML = image_list2[count];
        previewNext.innerHTML = image_list2[count + 2];
    }
    if (count === 0){
        backButton.className += " disabled";
    }
    else if (count === image_list.length - 1){
        nextButton.className += " disabled";
    }
    else{
        backButton.classList.remove("disabled")
        nextButton.classList.remove("disabled")
    }
}
