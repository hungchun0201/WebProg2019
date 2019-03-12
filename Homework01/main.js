todo_list = [];
let input = document.getElementsByClassName("todo-app__input")[0]; //main input
let todoCount = document.getElementById("todo-count");
let section_element = document.getElementsByTagName("section")[0];
let clear_element = document.createElement("button");
let interface_ul = Object; //ul tag
let curr_area = "All"; //the position that user choosen
let uncompleted_container = document.getElementsByClassName("todo-app__uncompleted")[0];
let uncompleted_ul = document.createElement("ul");
let todo_in_each_day = Array.apply(null, Array(31)).map(Number.prototype.valueOf, 0);
let uncompleted_todo_in_each_day = Array.apply(null, Array(31)).map(Number.prototype.valueOf, 0);
class newItem {
    constructor(Node, iscompleted, date) {
        this.Node = Node;
        this.iscompleted = iscompleted;
        this.date = date;
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
        if (section_element.childNodes.length === 3) {
            if (interface_ul === Object) {
                interface_ul = init_ul();
            }
            section_element.appendChild(interface_ul);
        }
        let new_itemNode = assignItem(input.value);
        todo_list.push(new newItem(new_itemNode, false, curr_istoday));
        ++todo_in_each_day[curr_istoday - 1];
        ++uncompleted_todo_in_each_day[curr_istoday - 1];
        ShowCurrInterface();
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
        --uncompleted_todo_in_each_day[curr_istoday - 1];
    } else {
        todo_list[index]["Node"].children[1].classList.remove("todo-app__item-checked");
        todo_list[index]["iscompleted"] = false;
        ++uncompleted_todo_in_each_day[curr_istoday - 1];
    }
    ShowCurrInterface();
}


function deleteNode(all) {
    if (all === false) {
        let index = getIndex(event.target.parentNode);
        let delete_node = todo_list.splice(index, 1);
        --todo_in_each_day[curr_istoday - 1];
        if (delete_node["is_completed"] === false) {
            --uncompleted_todo_in_each_day[curr_istoday - 1];
        }

    } else {
        let times = 0;
        for (let i = 0; i < todo_list.length; ++i) {
            if (todo_list[i]["iscompleted"] === true && todo_list[i]["date"] === curr_istoday) {
                todo_list.splice(i, 1);
                --i;
                ++times;
            }
        }
        todo_in_each_day[curr_istoday - 1] -= times;
    }
    ShowCurrInterface();
}

function getIndex(node) {
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["Node"] === node) {
            return i;
        }
    }
    return null;
}

//---All functions related to display

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
    ShowClear();
}

function refresh_count() {
    let counter = 0;
    let i = 0
    for (; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === false && todo_list[i]["date"] === curr_istoday) {
            ++counter;
        }
    }
    todoCount.innerHTML = counter + " left in this day";
}

function ShowAll() {
    curr_area = "All";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length === 3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["date"] === curr_istoday) {
            interface_ul.appendChild(todo_list[i]["Node"]);
            printed = true;
        }
    }
    if (printed === false) {
        section_element.removeChild(interface_ul);
    }
}

function ShowActive() {
    curr_area = "Active";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length === 3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === false && todo_list[i]["date"] === curr_istoday) {
            interface_ul.appendChild(todo_list[i]["Node"]);
            printed = true;
        }
    }
    if (printed === false) {
        section_element.removeChild(interface_ul);
    }
}

function ShowCompleted() {
    curr_area = "Completed";
    interface_ul.innerHTML = "";
    let printed = false;
    if (section_element.childNodes.length === 3) {
        section_element.appendChild(interface_ul);
    }
    for (let i = 0; i < todo_list.length; ++i) {
        if (todo_list[i]["iscompleted"] === true && todo_list[i]["date"] === curr_istoday) {
            interface_ul.appendChild(todo_list[i]["Node"]);
            printed = true;
        }
    }
    if (printed === false) {
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
}


function ShowUncompleted() {
    if (todo_list.length !== 0) {
        uncompleted_container.appendChild(uncompleted_ul);
    } else {
        uncompleted_container.removeChild(uncompleted_ul);
    }
    uncompleted_ul.innerHTML = "";
    for (let i = 0; i < todo_in_each_day.length; ++i) {
        if (todo_in_each_day[i] !== 0) {
            let new_li = document.createElement("li");
            new_li.setAttribute("id", "date_" + (i + 1));
            if (uncompleted_todo_in_each_day[i] === 0) {
                new_li.innerHTML = "All (" + todo_in_each_day[i] + ") todo(s) were completed in date" + (i + 1) + "!";
            } else if (uncompleted_todo_in_each_day[i] === 1)
                new_li.innerHTML = uncompleted_todo_in_each_day[i] + "/" + todo_in_each_day[i] + " todo\xa0\xa0in date " + (i + 1);
            else
                new_li.innerHTML = uncompleted_todo_in_each_day[i] + "/" + todo_in_each_day[i] + " todos\xa0in date " + (i + 1);
            uncompleted_ul.appendChild(new_li);
        }
    }
    let body = document.getElementsByTagName("body")[0];
    if (uncompleted_container.offsetTop + uncompleted_container.offsetHeight >= body.offsetHeight - 10) {
        uncompleted_container.style.height = (body.offsetHeight - uncompleted_container.offsetTop - 10) + "px";
    } else {
        uncompleted_container.style.height = "";
    }
    /*  origin version(unsorted)
    for (let i = 0; i < todo_in_each_day.length; ++i) {
        if (todo_in_each_day[i] === 0) {
            if (document.getElementById("date_" + (i + 1)) !== null) { //from 1 to 0
                uncompleted_ul.removeChild(document.getElementById("date_" + (i + 1)));
            }
        } else if (todo_in_each_day[i] === 1) {
            if (document.getElementById("date_" + (i + 1)) === null) { //from 0 to 1
                let new_li = document.createElement("li");
                new_li.setAttribute("id", "date_" + (i + 1));
                new_li.innerHTML = todo_in_each_day[i] + " todo in date " + (i + 1);
                uncompleted_ul.appendChild(new_li);
            } else { //from 2 to 1
                let exist_li = document.getElementById("date_" + (i + 1));
                console.log(exist_li);
                exist_li.innerHTML = todo_in_each_day[i] + " todo in date " + (i + 1);
            }
        } else(todo_in_each_day[i] > 1) {
            let exist_li = document.getElementById("date_" + (i + 1));
            console.log(exist_li);
            exist_li.innerHTML = todo_in_each_day[i] + " todos in date " + (i + 1);
        }
        */
}