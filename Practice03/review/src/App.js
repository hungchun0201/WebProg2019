import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bgImage from "./image/bg.jpg";
import bgImage2 from "./image/bg2.jpg";

class Welcome extends Component {
  render() {
    let rec = this.props.scoreCard.records.map(e => 
      <tr>{e.map(
        g => <td>{g}</td>
      )}</tr>
    );
    var sectionStyle = {
      width: "100%",
      height: "100%",
    // makesure here is String确保这里是一个字符串，以下是es6写法
      backgroundImage: `url(${bgImage})` 
	};

	var sectionStyle2 = {
		width: "100%",
		height: "300px",
	  // makesure here is String确保这里是一个字符串，以下是es6写法
		backgroundImage: `url(${bgImage2})` 
	  };

	var font = {
		color:'white',
		fontSize:40,
		fontWeight:'bold',
		textShadowColor:'#C0C0C0',
		textShadowRadius:2,
		textShadowOffset:{width:2,height:2},
		textAlign:'center',
		margin:50
	};

	var toBlock1 = function(){
		window.location.hash = "#block1";
	}
	var toBlock2 = function(){
		window.location.hash = "#block2";
	}
	var toBlock3 = function(){
		window.location.hash = "#block3";
	}
	var toBlock4 = function(){
		window.location.hash = "#block4";
	}
    return (
    <body>
    	<div style = {sectionStyle}>
    		<table>
      			<caption> {this.props.scoreCard.name}'s Score </caption>
      			<thead>
        			<tr>{ this.props.columnIndex.map(e => (
        				<th>{e}</th>
    				))}
    				</tr>
  				</thead>
  				<tbody>
    				{rec}
  				</tbody>
    		</table>
    	</div>
		<div id="menu">
			<ul>
				<li><a onMouseDown={toBlock1}>選單A</a></li>
				<li><a onMouseDown={toBlock2}>選單B</a></li>
				<li><a onMouseDown={toBlock3}>選單C</a></li>
				<li><a onMouseDown={toBlock4}>選單D</a></li>
			</ul>
		</div>
		{this.props.blockList.map(e => (
			<div style={font} id={e}>
				{e}
				<div style = {sectionStyle2}>
				</div>
			</div>
		))}
    </body>
    );
  }
}

export default Welcome;
