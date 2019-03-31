import React, { Component } from 'react';
import '../assets/css/calender.css';

class Calender extends Component {
    constructor(props) {
        super(props);
        this.today = new Date();
        this.currMonth = this.today.getMonth();
        this.currYear = this.today.getFullYear();
        this.startDate = new Date(this.currYear, this.currMonth, 1);
        this.endDate = new Date(this.currYear, this.currMonth + 1, 0);
        this.startDay = this.startDate.getDay();
        this.endDay = this.endDate.getDate();
        this.tempArray = [];
        this.curr_istoday = this.today.getDate();
        this.hasCreate = false;
        this.state = { dateArray: [] }
    }
    handleClick = (event) => {
        console.log(this.curr_istoday);
        this.tempArray.every(e => {
            e.every(i => {
                if (i.num === this.curr_istoday) {
                    i.class = "active_day";
                }
                if (i.num === parseInt(event.target.innerHTML, 10)) {
                    i.class = "active_day is-today";
                }
                return true;
            })
            return true;
        })
        this.setState(state => ({ dateArray: this.tempArray }));
        this.curr_istoday = parseInt(event.target.innerHTML, 10);
    }
    createTable() {
        let textSkip = true;
        let textDate = 1;
        for (var row = 0; row < 6; row++) {
            let weekArray = [];
            for (var col = 0; col < 7; col++) {
                if (row === 0 && this.startDay === col) {
                    textSkip = false;
                }
                if (textDate > this.endDay) {
                    textSkip = true;
                }
                var addClass = textDate === this.today.getDate() && !textSkip ? 'active_day is-today' : 'active_day';
                var textTd = textSkip ? ' ' : textDate++;
                if (textTd === ' ')
                    addClass = ' ';
                var determineClick = textSkip ? ' ' : "handleClick";
                let day = { num: textTd, class: addClass, click: determineClick };
                weekArray.push(day);
            }
            this.tempArray.push(weekArray);
        }
        this.setState(state => ({ dateArray: this.tempArray }));
        console.log(this.tempArray);
    }
    render() {
        if (this.hasCreate === false) {
            this.createTable();
            this.hasCreate = true;
        }

        return (
            <div className="calendar-container">
                <div className="image-container">
                    <div className="image"></div>
                </div>
                <div className="calendar">
                    <h2 className="month-title" id="js-month">{this.currMonth + 1}</h2>
                    <table className="calendar-table">
                        <thead>

                            <tr>
                                <th>日</th>
                                <th>月</th>
                                <th>火</th>
                                <th>水</th>
                                <th>木</th>
                                <th>金</th>
                                <th>土</th>
                            </tr>
                            {this.state.dateArray.map(e => (
                                <tr>{
                                    e.map(j => (
                                        <td className={j.class} onClick={this.handleClick}> {j.num}</td>
                                    ))
                                }</tr>
                            ))

                            }
                        </thead>
                        <tbody id="js-calendar-body"></tbody>
                    </table>
                </div>
                <svg style={{ "visibility": "hidden" }} width="0" height="0">
                    <filter id="duotone" color-interpolation-filters="sRGB">
                        <feColorMatrix type="matrix" values="0.7 0 0 0 0.3 0.6 0 0 0 0.2 0.3 0 0 0 0.6 0 0 0 1 0"></feColorMatrix>
                    </filter>
                </svg>
            </div >
        );
    }
}

export default Calender;
