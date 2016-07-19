import React from 'react';
import toppings from './toppings';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.resultString.split('').slice().reverse().map((topping, index, theArray) => {
      let negativeIndex = theArray.length - index;
      let style = {zIndex: negativeIndex};
      return <div className="horizontal" style={style}><img src={toppings[topping].image} /></div>;
    });
    return (
      <div className="burger-result-wrapper">
        <div className="horizontal" style={{zIndex: result.length + 1}}>
          <img src="dist/images/bun-top-400.png"/>
        </div>
        {result}
        <div className="horizontal" style={{zIndex: 0}}>
          <img src="dist/images/bun-bottom-400.png"/>
        </div>
      </div>
    );
  }
}

export default Result;
