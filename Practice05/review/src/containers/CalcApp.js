import React from 'react';
import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			showNum: "",
      preNum: "",
      preCal: "",
      operate: false,
      Cal: false
    };
  }

  resetState = () => {
		this.setState({
			showNum: "",
      preNum: "",
      preCal: "",
      operate: false,
      Cal: false
		});
  }

  input = (val) => {
    if(this.state.operate){
      this.setState({
        showNum: val,
        operate: false
      });
    }
    else{
      this.setState({
        showNum: String(this.state.showNum) + String(val)
      });
    }
  }

  calculate = (mathway) => {
    let num;
    switch(mathway ){
      case 'add':
        num = parseFloat(this.state.preNum) + parseFloat(this.state.showNum);
        this.setState({
          showNum: String(num),
          preNum: String(num)
        }); 
        break;
      case 'sub':
        num = parseFloat(this.state.preNum) - parseFloat(this.state.showNum);
        this.setState({
          showNum: String(num),
          preNum: String(num)
        }); 
        break;
      case 'mul':
        num = parseFloat(this.state.preNum) * parseFloat(this.state.showNum);
        num = num.toFixed(2)
        this.setState({
          showNum: String(num),
          preNum: String(num)
        }); 
        break;
      case 'div':
        num = parseFloat(this.state.preNum) / parseFloat(this.state.showNum);
        num = num.toFixed(2)
        this.setState({
          showNum: String(num),
          preNum: String(num)
        }); 
        break;

      default:
        console.warn("error operation");
    }
  }

  preCal = (way) => {
    if(this.state.Cal && !this.state.operate){
      this.calculate(this.state.preCal);
      this.setState({
        preCal: way,
        operate: true
      })
    }
    else{
      this.setState({
        preNum: this.state.showNum,
        preCal: way,
        operate: true,
        Cal: true
      });
    }
  }

  equal = () => {
    this.calculate(this.state.preCal);
    this.setState({
      operate: false,
      Cal: false
    })
  }

  percent = () => {
    let num = parseFloat(this.state.showNum)/100;
    num = num.toFixed(2)
    this.setState({
      showNum: String(num)
    });    
  }

  positive = () => {
    this.setState({
      showNum: String(parseFloat(this.state.showNum)*-1)
    });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.showNum}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={() => this.positive()}>+/-</CalcButton>
            <CalcButton onClick={() => this.percent()}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.preCal('div')} >÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.preCal('mul')} >x</CalcButton>
          </div>
					<div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.preCal('sub')} >-</CalcButton>
          </div>
					<div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.preCal('add')} >+</CalcButton>
          </div>
					<div className="calc-row">
            <CalcButton className="bigger-btn" onClick={() => this.input(0)}>0</CalcButton>
            <CalcButton className="calc-number"onClick={() => this.input('.')}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={() => this.equal()} >=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
