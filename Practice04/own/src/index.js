import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/calender.css';
import Calender from './container/calender'
import Todo from './container/todo'
import * as serviceWorker from './serviceWorker';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curr_istoday: 0,
            todo_list: [],
            todo_num_date: Array.apply(null, Array(31)).map(i => ({ "total": 0, "uncompleted": 0 })),
        }
    }
    componentWillMount() {

    }
    Update_todo_list = Node => {
        console.log(9339);
        this.setState(state => ({
            todo_list: state.todo_list.push(Node),
            todo_num_date: state.todo_num_date.map((value, index) => (
                index === this.curr_istoday ? Object.keys(value).map(e => value[e]++) : 0))
        }))
    }
    test = () => {
        console.log("JJ");
    }
    render() {
        return (
            <React.Fragment>
                <div className="todo-app__test">
                    <div id="root" className="todo-app__root">
                        <section className="todo-app__main">
                            <Todo update_todo_list={this.test} curr_istoday={this.curr_istoday} />
                        </section>
                        <footer className="todo-app__footer" id="todo-footer">
                            <div className="todo-app__total">
                                <span id="todo-count">0 left in this day</span>
                            </div>
                            <ul className="todo-app__view-buttons">
                                <button id="All" onclick="ShowAll()">ALL</button>
                                <button id="Active" onclick="ShowActive()">Active</button>
                                <button id="Completed" onclick="ShowCompleted()">Completed</button>
                            </ul>
                            <div className="todo-app__clean">
                            </div>
                        </footer>
                        <div className="todo-app__uncompleted">

                        </div>
                    </div>
                </div>

                <Calender id="calender" />;
            </React.Fragment>
        );
    }
}
// ReactDOM.render(<Calender />, document.getElementById('calender'));
// ReactDOM.render(<Todo />, document.getElementsByTagName('section')[0]);
var p = new Index;
p.test();
ReactDOM.render(<Index />, document.getElementById('flex-container'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
