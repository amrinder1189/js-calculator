import React, { Component } from 'react';
import './App.css';


//numbers
const numbers= [0,1,2,3,4,5,6,7,8,9];
//operators
const ops = ['/','+','-','*'];
//ides
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'zero',
  '/': 'divide', 
  '*': 'multiply', 
  '-': 'subtract', 
  '+': 'add'
};


class App extends Component{

  state={
    lastPressed:undefined,
    calculation:'0',
    operation:undefined
  }


handleClick = (e) =>{

  const {calculation,lastPressed} = this.state;
  const {innerText} = e.target;

  console.log('the inner text is ',innerText);
  console.log(calculation);

  switch(innerText){

    case'AC':{
      this.setState({
        calculation:'0'
      });
      break;
    }

    case'=':{
      const evaluated= eval(calculation);

      this.setState({
        calculation:evaluated,
      });
      break;
    }

    case '.': {
      const splitted = calculation.split(/[\+\-\*\/]/);
      const last = splitted.slice(-1)[0];
      
      if(!last.includes('.')) {
        this.setState({
          calculation: calculation+'.'
        })
      }
      
      break;
    }


    default: {
      let e = undefined;
      // check for other op
      if(ops.includes(innerText)) {
        if(ops.includes(lastPressed) && innerText !== '-') {
          // oh boii...
          const lastNumberIdx = calculation.split('').reverse()
              .findIndex(char => char !== ' ' && numbers.includes(+char)); 
          e = calculation.slice(0, calculation.length - lastNumberIdx) + ` ${innerText} `;
        } else {
          e = `${calculation} ${innerText} `;
        }
      } else {
        e = (calculation === '0') ? innerText : (calculation + innerText);
      }


           this.setState({
             calculation:e
           });






    }
}

this.setState({
  lastPressed: innerText
});

}




  

  render(){
    const { currentNumber, calculation } = this.state;
    return(
 <div className='main'>
        {/* display */}
    <div className="display textbox" id='display'  onClick={this.handleClick}  >{calculation}</div>

      <div id="calculator" className="calculator"  onClick={this.handleClick}>

      <button className='blue' id="clear">AC</button>

      { numbers.map(number=> ( <button  onClick={this.handleClick} key={number}  id={ids[number]}>{number}</button>))}

      <button className='blue'  id="decimal">.</button>

      {ops.map(op => (<button className='blue'  onClick={this.handleClick} key={op}  id={ids[op]}>{op}</button>))}

      <button className='orange'  onClick={this.handleClick}  id="equals">=</button>

      </div>


        <h3>The Javascript calculator</h3>
      </div>
    )
  }
}

export default App;
