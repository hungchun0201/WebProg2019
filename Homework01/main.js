todo_list = [];
let input = document.getElementsByClassName("todo-app__input")[0];//main input
let todoCount = document.getElementById("todo-count");
let section_element = document.getElementsByTagName("section")[0];
let clear_element = document.createElement("button");
let interface_ul = Object;//ul tag
let curr_area = "All";//the position that user choosen
class newItem {
    constructor(Node, iscompleted) {
        this.Node = Node;
        this.iscompleted = iscompleted;
    }
}
/************************ 
 * 
*************************/
init_clear();
function init_clear() {
    clear_element.setAttribute("id", "clear");
    clear_element.setAttribute("onclick", "deleteNode(true)");
    clear_element.innerHTML = "Clear completed";
}

function assignItem(context) {
    const new_itemNode = document.createElement("LI");
    const wrapper = document.createElement("DIV");
    const checkbox = document.createElement("INPUT");
    const label_element = document.createElement("label");
    const h1_element = document.createElement("h1");
    const img_element = document.createElement("img");
    new_itemNode.classList.add("todo-app__item");

    checkbox.setAttribute("id", todo_list.length);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick", "changeState(this)");
    label_element.setAttribute("for", todo_list.length);
    wrapper.classList.add("todo-app__checkbox");
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label_element);

    h1_element.classList.add("todo-app_item-detail");
    h1_element.innerHTML = context;

    img_element.classList.add("todo-app__item-x");
    img_element.setAttribute("src", "./img/x.png");
    img_element.setAttribute("onclick", "deleteNode(false)");
    img_element.setAttribute("id", todo_list.length);

    new_itemNode.appendChild(wrapper);
    new_itemNode.appendChild(h1_element);
    new_itemNode.appendChild(img_element);

    return new_itemNode;
}

input.addEventListener('keydown', event => {
    if (event.keyCode === 13 && event.target.value !== "") {
        if (section_element.childNodes.length===3) {
            if (interface_ul === Object) {
                interface_ul = init_ul();
            }
            section_element.appendChild(interface_ul);
        }
        let new_itemNode = assignItem(input.value);
        interface_ul.appendChild(new_itemNode);
        todo_list.push(new newItem(new_itemNode, false));

        refresh_count();
        input.value = "";
    }
});
function init_ul() {
    let ul_element = document.createElement("ul");
    ul_element.setAttribute("id", "todo-list");
    ul_element.setAttribute("class", "todo-app__list");
    return ul_element;
}
function changeState(data) {
    let index = getIndex(event.target.parentNode.parentNode);
    if (todo_list[index]["iscompleted"] === false) {
        todo_list[index]["Node"].children[1].classList.add("todo-app__item-checked");
        todo_list[index]["iscompleted"] = true;
    }
    else {
        todo_list[index]["Node"].children[1].classList.remove("todo-app__item-checked");
        todo_list[index]["iscompleted"] = false;
    }
    refresh_count();
    ShowClear();
}

function refresh_count() {
    let counter = 0;
    let i = 0
    for (; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === false) {
            ++counter;
        }
    }
    todoCount.innerHTML = counter + " left";
}
function ShowAll() {
    curr_area = "All";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length===3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        interface_ul.appendChild(todo_list[i]["Node"]);
        printed = true;
    }
    if(printed===false)
    {
        section_element.removeChild(interface_ul);
    }
}
function ShowActive() {
    curr_area = "Active";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length===3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === false) {
            interface_ul.appendChild(todo_list[i]["Node"]);
            printed = true;
        }
    }
    if(printed===false)
    {
        section_element.removeChild(interface_ul);
    }
}
function ShowCompleted() {
    curr_area = "Completed";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length===3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === true) {
            interface_ul.appendChild(todo_list[i]["Node"]);
            printed = true;
        }
    }
    if(printed===false)
    {
        section_element.removeChild(interface_ul);
    }
}
function ShowClear() {
    document.getElementsByClassName("todo-app__clean")[0].innerHTML = "";
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === true) {

            document.getElementsByClassName("todo-app__clean")[0].appendChild(clear_element);
            return;
        }
    }
    document.getElementsByClassName("todo-app__clean")[0].innerHTML = "";
    return;
}
function deleteNode(all) {
    if (all === false) {
        let index = getIndex(event.target.parentNode);
        todo_list.splice(index, 1);
    }
    else {
        for (let i = 0; i < todo_list.length; ++i) {
            if (todo_list[i]["iscompleted"] === true) {
                todo_list.splice(i, 1);
                --i;
            }
        }
    }
    if (curr_area === "All") {
        ShowAll();
    }
    else if (curr_area === "Active") {
        ShowActive();
    }
    else if (curr_area === "Completed") {
        ShowCompleted();
    }
    refresh_count();
    ShowClear();
}
function getIndex(node) {
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["Node"] === node) {
            return i;
        }
    }
    return null;
}