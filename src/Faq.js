import React from 'react';

class Faq extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="intro">
        <div className="intro-cell">
          <div id="faq" className="faq-section">
            <h3>FAQ</h3>
            <h4>What is Regex Cafe built with?</h4>
            <h6>React.js, with CSS3 transitions and transforms.</h6>
            <h4>What flavor of Regex is this?</h4>
            <h6>javascript (see more <a href="https://en.wikipedia.org/wiki/Comparison_of_regular_expression_engines">here</a>)</h6>
            <h4>Where does this project live?</h4>
            <h6>It is hosted with <a href="https://pages.github.com/">Github Pages</a></h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
