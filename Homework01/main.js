let input = document.getElementsByClassName("todo-app__input")[0];
let todo_list = [];
/************************ 
 * 
*************************/
// const itemNode = document.createElement("LI");
let section_element = document.getElementsByTagName("section")[0];
let interface_ul = Object;
class newItem {
    constructor(Node, iscompleted) {
        this.Node = Node;
        this.iscompleted = iscompleted;
    }
}
function changeState() {
    console.log(todo_list[event.target.id]);
}
function assignItem(context) {
    let new_itemNode = document.createElement("LI");
    const wrapper = document.createElement("DIV");
    const checkbox = document.createElement("INPUT");
    const label_element = document.createElement("label");
    const h1_element = document.createElement("h1");
    let img_element = document.createElement("img");
    new_itemNode.classList.add("todo-app__item");

    checkbox.setAttribute("id", todo_list.length);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "changeState()");
    label_element.setAttribute("for", todo_list.length);
    wrapper.classList.add("todo-app__checkbox");
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label_element);

    h1_element.classList.add("todo-app_item-detail");
    h1_element.innerHTML = context;

    img_element.classList.add("todo-app__item-x");
    img_element.setAttribute("src", "./img/x.png");

    new_itemNode.appendChild(wrapper);
    new_itemNode.appendChild(h1_element);
    new_itemNode.appendChild(img_element);

    return new_itemNode;
}

input.addEventListener('keydown', event => {
    if (event.keyCode === 13 && event.target.value !== "") {
        if (todo_list.length === 0) {
            interface_ul = init_ul();
        }
        let new_itemNode = assignItem(input.value);
        console.log(new_itemNode);
        interface_ul.appendChild(new_itemNode);
        todo_list.push(new newItem(new_itemNode, false));
        console.log(todo_list);
        input.value = "";
    }
});
function init_ul() {
    let ul_element = document.createElement("ul");
    ul_element.setAttribute("id", "todo-list");
    ul_element.setAttribute("class", "todo-app__list");
    section_element.appendChild(ul_element);
    return ul_element;
}


// checkbox.setAttribute()
//onclick:1.change style 2.加斜線 CSS檔中的checked已經有了
//利用一個boolean判斷iscompleted