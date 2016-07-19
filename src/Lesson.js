import React from 'react';
import toppings from './toppings';
import Result from './Result';
import Request from './Request';
import NextLessonButton from './NextLessonButton';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: null
    };
  }

  _checkRegex() {
    this.setState({
      match: this.props.lesson.availableRegex.match(new RegExp(this.props.lesson.desiredRegex.split('|').join('')))
    });
  }

  render() {
    let output = this.props.lesson.availableRegex.split('').map((topping, index) => {
      let styling = '';
      if (this.state.match !== null) {
        if (index >= this.state.match.index && index < this.state.match.index + this.state.match[0].length) {
          styling = 'highlighted';
        } else {
          styling = 'unhighlighted';
        }
      }
      return <img key={`${this.props.lesson.number}-${index}`} className={styling} src={toppings[topping].image}/>;
    });

    let burgerResult = null;
    let burgerResultStyling = 'card burger-result';
    if (this.state.match !== null) {
      burgerResult = <Result resultString={this.state.match[0]} />;
      burgerResultStyling += ' complete';
    }

    let desiredIngredients = this.props.lesson.desiredIngredients.slice().reverse().map((desired, index) => {
      let orderImages = desired.symbols.split('').map((orderedIngredient) => {
        let ingredient = toppings[orderedIngredient];
        return ingredient === undefined ? ingredient : <img src={ingredient.image}/>;
      });
      return (
        <div key={index}>
          <div className="order-ingredient">
            {desired.quantity}-{desired.name}
          </div>
          <div className="order-image">
            {orderImages}
          </div>
        </div>
      );
    });

    return (
      <div className="card-wrapper"id={`lesson-${this.props.lesson.number}`}>
        <div className="card-wrapper-cell">
          <div className="lesson-card">
            <h3>{this.props.lesson.name}</h3>
            <p className="lead">{this.props.lesson.description}</p>
            <div className="row order-area">
              <div className="six columns card">
                <p className="lead">Bob tells you he would like a hamburger with: </p>
                <p className="subtext">top</p>
                <div>{desiredIngredients}</div>
                <p className="subtext">bottom</p>
              </div>
              <div className="six columns card">
                <p className="lead">You scribble a quick drawing on your notepad:</p>
                <Request toppings={toppings} requestString={this.props.lesson.desiredRegex}/>
              </div>
            </div>
            <p className="lead">Your chef looks for the right ingredients that he can grab in one chunk...</p>
            <button className="button-primary" onClick={this._checkRegex.bind(this)}>Find Ingredients</button>
            <div className="burger-area">
              {output}
            </div>
            <div className={burgerResultStyling}>
              <h3>Success!</h3>
              <div className="row">
                <div className="offset-by-four burger-result-cell two columns">
                  {burgerResult}
                </div>
                <div className="two columns">
                  <p><i className="fa fa-smile-o user-medium"></i></p>
                </div>
              </div>
              <div className="row">
                <div className="four columns">
                  <p><span className="lead">You used this regex:</span> /{this.props.lesson.desiredRegex.split('|').join('')}/</p>
                </div>
                <div className="four columns">
                  <p><span className="lead">In this text:</span> {this.props.lesson.availableRegex}</p>
                </div>
                <div className="four columns">
                  <p><span className="lead">And found this result:</span> {this.state.match === null ? null : this.state.match[0]}</p>
                </div>
            </div>
            <NextLessonButton lessonNumber={this.props.lesson.number} text="Next Lesson" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lesson;
