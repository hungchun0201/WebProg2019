import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Welcome from './App';
import * as serviceWorker from './serviceWorker';

let n = "why?";
const columnIndex = [ 'Subject', 'Score' ];
const scoreCard = { 
  name: 'Ric',
  records: [
    [ 'Math', 100 ],
    [ 'Chinese', 87 ],
    [ 'English', 100 ],
    [ 'Science', 100 ],
    [ 'Social', 0 ] 
  ]
};
const blockList = ['block1', 'block2', 'block3', 'block4']
ReactDOM.render(<Welcome scoreCard = {scoreCard}
                        columnIndex = {columnIndex}
                        blockList = {blockList}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
