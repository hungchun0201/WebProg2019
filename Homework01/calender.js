let today = new Date();
curr_istoday = today.getDate();
const active_day = document.getElementsByClassName("active_day");

//---init today

for (let i = 0; i < active_day.length; ++i) {
    if (active_day[i].innerHTML == curr_istoday) {
        active_day[i].classList.add("is-today");
        break;
    }
}

function changeSelect() {
    for (let i = 0; i < active_day.length; ++i) {
        if (active_day[i].innerHTML == curr_istoday) {
            active_day[i].classList.remove("is-today");
            break;
        }
    }
    curr_istoday = parseInt(event.target.innerHTML, 10);
    event.target.classList.add("is-today");
    ShowCurrInterface();
    refresh_count();

}