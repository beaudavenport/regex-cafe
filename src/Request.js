import React from 'react';

class Request extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let requestContent = this.props.requestString.split('|').map((topping, index) => {
      let toppingEntry = this.props.toppings[topping];
      return toppingEntry !== undefined
        ? <img key={'topping-' + index} src={toppingEntry.image}/>
        : <span key={'topping-' + index} className="regex-char">{topping}</span>;
    });
    return (
      <div className="burger-area"><img src="images/bun-bottom-400.png"/>
        {requestContent}
        <img src="images/bun-top-400.png"/></div>
    );
  }
}

export default Request;
