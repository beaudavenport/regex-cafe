var toppings = {
  'bun-right': {
    image: 'images/bun-facing-right.png'
  },
  'bun-left': {
    image: 'images/bun-facing-left.png'
  },
  '1': {
    image: 'images/american-cheese-right.png'
  },
  '2': {
    image: 'images/gouda-cheese-right.png'
  },
  '3': {
    image: 'images/swiss-cheese-right.png'
  },
  'a': {
    image: 'images/jalepenos-right.png'
  },
  '&': {
    image: 'images/hamburger-right.png',
    name: 'hamburger patty'
  }
};

var lessons = [
  {
    name: 'Lesson One',
    description: 'Bob is looking for the simplest possible hamburger. It should be easy to find the ingredients.',
    desiredIngredients: [
      {
        quantity: 1,
        symbol: '&'
      }
    ],
    desiredRegex: '&',
    availableRegex: '&'
  }
];

var Request = React.createClass({
  render: function() {
    var requestContent = this.props.requestString.split('').map(function(topping) {
      var toppingEntry = this.props.toppings[topping];
      return toppingEntry !== undefined
        ? <img src={toppingEntry.image}/>
        : <span className="regex-char">{topping}</span>;
    }.bind(this));
    return (
      <div className="burger-area"><img src="images/bun-facing-right.png"/>
        {requestContent}
        <img src="images/bun-facing-left.png"/></div>
    );
  }
});

var Lesson = React.createClass({
  getInitialState: function() {
    return {match: null};
  },

  _checkRegex: function() {
    this.setState({
      match: this.props.lesson.availableRegex.match(new RegExp(this.props.lesson.desiredRegex))
    });
  },

  render: function() {
    var output = this.props.lesson.availableRegex.split('').map(function(topping, index) {
      var styling = '';
      if (this.state.match !== null) {
        if (index >= this.state.match.index && index < this.state.match.index + this.state.match[0].length) {
          styling = 'highlighted';
        }
      }
      return <img className={styling} src={toppings[topping].image}/>;
    }.bind(this));

    var successButton = this.state.match !== null
      ? <a className="button" href="#lesson-two">Next lesson</a>
      : null;

    var desiredIngredients = this.props.lesson.desiredIngredients.map(function(desired) {
      var ingredient = toppings[desired.symbol];
      return (
        <li>{desired.quantity}-
          {ingredient.name}<img src={ingredient.image}/>
        </li>
      );
    });

    return (
      <div className="bob card">
        <p>{this.props.lesson.description}</p>
        <p>Bob is looking for a hamburger with:</p>
        <ul>{desiredIngredients}</ul>
        <p>The perfect hamburger for Bob will look like:</p>
        <Request toppings={toppings} requestString={this.props.lesson.desiredRegex}/>
        <p>
          With Regex, we can check to see if there are the ingredients we need in the right order to make the perfect hamburger :
        </p>
        <button className="button-primary" onClick={this._checkRegex}>Find Match</button>
        {successButton}
        <div className="burger-area">{output}</div>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {

    var lessonsOutput = this.props.lessons.map(function(lesson) {
      return (<Lesson lesson={lesson} />);
    });

    return (
      <div>
        <nav>
          <div className="container">
            <div className="title">
              <a href="">
                <h1>Regex Cafe</h1>
              </a>
            </div>
            <ul className="nav-links">
              <li>
                <a href="#">Glossary</a>
              </li>
              <li>
                <a href="#">Lessons</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          {lessonsOutput}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App lessons={lessons}/>, document.getElementById('content'));
