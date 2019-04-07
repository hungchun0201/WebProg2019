import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_num: 0,
      buffer: 0,
      second: 0
    };
    this.symbol = " ";
    this.refreshWindow = false;
    this.hasRefreshSecond = false;
    this.wasLastSymbolEqual = false;

  }

  resetState = () => {
    this.setState({ display_num: 0, buffer: 0, second: 0 });
    this.symbol = " ";
    this.refreshWindow = false;
    this.hasRefreshSecond = false;
    this.wasLastSymbolEqual = false;

  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  showInterface = (event) => {
    let num = parseInt(event.target.innerHTML);
    if (this.refreshWindow === true) {
      this.setState({ display_num: num, }, function () {
        console.log("press " + num);
        console.log(this.state);
      });
      this.refreshWindow = false;
    }
    else {
      this.setState({ display_num: this.state.display_num * 10 + num, }, function () {
        console.log("press " + num);
        console.log(this.state);
      });
    }

  }
  storeSymbol = (event) => {
    if (this.symbol !== " ") {
      this.executeResult(event);
    }
    this.symbol = event.target.innerHTML;
    console.log(this.symbol);
    setTimeout(() =>
      this.setState({ buffer: this.state.display_num }, function () {
        console.log("refresh buffer");
        console.log(this.state);
        this.refreshWindow = true;
        this.hasRefreshSecond = false;
        this.wasLastSymbolEqual = false;
        console.log("hasRefreshSecond(in sym): " + this.hasRefreshSecond);
      }));

  }
  executeResult = (event) => {
    console.log("hasRefreshSecond(in exec): " + this.hasRefreshSecond);
    if (this.wasLastSymbolEqual === true && event.target.innerHTML !== "=") {
      return;
    }
    if (event.target.innerHTML === "=") {
      this.wasLastSymbolEqual = true;
      this.refreshWindow = true;

    }
    if (this.symbol === "X") {
      if (this.hasRefreshSecond === false) {
        this.setState({ second: this.state.display_num, display_num: this.state.display_num * this.state.buffer, buffer: this.state.display_num }, function () {
          console.log(this.state);
          this.hasRefreshSecond = true;
        })
      }
      else {
        this.setState({ display_num: this.state.display_num * this.state.second, buffer: this.state.display_num }, function () {
          console.log(this.state);
        })
      }
    }
    //divide
    else if (this.symbol === "÷") {
      if (this.hasRefreshSecond === false) {
        this.setState({ second: this.state.display_num, display_num: this.state.buffer / this.state.display_num, buffer: this.state.display_num }, function () {
          console.log(this.state);
          this.hasRefreshSecond = true;
        })
      }
      else {
        this.setState({ display_num: this.state.display_num / this.state.second, buffer: this.state.display_num }, function () {
          console.log(this.state);
        })
      }
    }
    //plus
    else if (this.symbol === "+") {
      if (this.hasRefreshSecond === false) {
        this.setState({ second: this.state.display_num, display_num: this.state.buffer + this.state.display_num, buffer: this.state.display_num }, function () {
          console.log(this.state);
          this.hasRefreshSecond = true;
        })
      }
      else {
        this.setState({ display_num: this.state.display_num + this.state.second, buffer: this.state.display_num }, function () {
          console.log(this.state);
        })
      }
    }
    //minus
    else if (this.symbol === "-") {
      if (this.hasRefreshSecond === false) {
        this.setState({ second: this.state.display_num, display_num: this.state.buffer - this.state.display_num, buffer: this.state.display_num }, function () {
          console.log(this.state);
          this.hasRefreshSecond = true;
        })
      }
      else {
        this.setState({ display_num: this.state.display_num - this.state.second, buffer: this.state.display_num }, function () {
          console.log(this.state);
        })
      }
    }


  }
  changePositive = () => {
    this.setState({ display_num: this.state.display_num * -1 }, () => { console.log("change") })
  }
  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display_num}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented} onClick={this.changePositive}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.storeSymbol}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.showInterface}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.storeSymbol}>X</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.showInterface}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.storeSymbol}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.showInterface}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.showInterface}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.storeSymbol}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="bigger-btn" onClick={this.showInterface}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.executeResult}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
