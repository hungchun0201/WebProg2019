import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        // this.state = { todo_list: [] };
    }
    handleKeyPress = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            // this.props.Update_todo_list({ "value": event.target.value, "isCompleted": false, "todoDay": this.props.curr_istoday });
            this.props.update_todo_list();
            //ShowCurrInterface();
            event.target.value = "";
        }
    }
    render() {
        return <section className="todo-app__main">
            <input type="text" className="todo-app__input" placeholder="What is your main focus for today?" onKeyPress={this.handleKeyPress}></input>
            <ul id="todo-list" className="todo-app__list" style={{ "margin": 0 }}>

            </ul>

        </section>;
    }
}

export default Todo;
