let urls = [ "./images/AHSNCCU.jpg","./images/GreenIsland.jpg", "./images/light_tower1021.jpg", "./images/kuanyang.jpg","./images/big_img_test3.jpg"];
let button = document.getElementsByClassName("image-viewer__button");
let back = document.getElementById("back");
let next = document.getElementById("next");
let display = document.getElementById("display");
let curr_image_id = 0;

LoadImg();
next.addEventListener(
    "click",
    function () {
        if (curr_image_id !== urls.length - 1) {
            ++curr_image_id;
            LoadImg();
            // display.src = urls[curr_image_id];
            if (curr_image_id === urls.length - 1) {
                next.classList.add("disabled");
            }
            else if (curr_image_id === 1) {
                back.classList.remove("disabled");
            }

        }
    }
);
back.addEventListener(
    "click",
    function () {
        if (curr_image_id !== 0) {
            --curr_image_id;
            LoadImg();
            // display.src = urls[curr_image_id];
            if(curr_image_id===0){
                back.classList.add("disabled");
            }
            else if(curr_image_id===urls.length-2){
                next.classList.remove("disabled");
            }
        }
    }

);

function LoadImg()
{
    display.src = "./images/loading.gif";
    let downloadingImage = new Image();
    downloadingImage.onload = function(){
        display.src = this.src;   
    };
    downloadingImage.src = urls[curr_image_id];
}

