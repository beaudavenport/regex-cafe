var toppings = {
  'bun-right': {
    image: 'images/bun-facing-right.png'
  },
  'bun-left': {
    image: 'images/bun-facing-left.png'
  },
  '1': {
    image: 'images/american-cheese-right.png',
    name: 'american cheese'
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
    number: 1,
    name: 'Lesson One: Plainest of the Plain',
    description: 'Bob is looking for the simplest possible hamburger. It should be easy to find the ingredients.',
    desiredIngredients: [
      {
        quantity: 1,
        symbol: '&'
      }
    ],
    desiredRegex: '&',
    availableRegex: '&'
  },
  {
    number: 2,
    name: 'Lesson Two: "With cheese, please"',
    description: 'This time, Bob would like a cheeseburger, with american cheese. Still a pretty easy order.',
    desiredIngredients: [
      {
        quantity: 1,
        symbol: '&'
      },
      {
        quantity: 1,
        symbol: '1'
      }
    ],
    desiredRegex: '&1',
    availableRegex: '12&a&123'
  }
];

var Request = React.createClass({
  render: function() {
    var requestContent = this.props.requestString.split('').map(function(topping, index) {
      var toppingEntry = this.props.toppings[topping];
      return toppingEntry !== undefined
        ? <img key={'topping-' + index} src={toppingEntry.image}/>
        : <span key={'topping-' + index} className="regex-char">{topping}</span>;
    }.bind(this));
    return (
      <div className="burger-area"><img src="images/bun-facing-right.png"/>
        {requestContent}
        <img src="images/bun-facing-left.png"/></div>
    );
  }
});

var NextLessonButton = React.createClass({
  render: function() {
    return (
    <a className="button" href={'#lesson-' + (this.props.lessonNumber + 1)}>{this.props.text}</a>
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
      return <img key={this.props.lesson.number + '-' + index} className={styling} src={toppings[topping].image}/>;
    }.bind(this));

    var successButton = this.state.match !== null
      ? <NextLessonButton lessonNumber={this.props.lesson.number} text="Next Lesson" />
      : null;

    var desiredIngredients = this.props.lesson.desiredIngredients.map(function(desired, index) {
      var ingredient = toppings[desired.symbol];
      return (
        <li key={index}>{desired.quantity}-
          {ingredient.name}<img src={ingredient.image}/>
        </li>
      );
    });

    return (
      <div>
        <div className="spacer" id={'lesson-' + this.props.lesson.number}></div>
        <div className="bob card">
          <h1>{this.props.lesson.name}</h1>
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
      </div>
    );
  }
});

var Navbar = React.createClass({
  render: function() {
    return (
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
    );
  }
});

var App = React.createClass({
  render: function() {

    var lessonsOutput = this.props.lessons.map(function(lesson) {
      return (<Lesson key={'lesson' + lesson.number} lesson={lesson} />);
    });

    return (
      <div>
        <Navbar />
        <div className="spacer"></div>
        <div className="container">
          <div className="intro">
            <div className="intro-user">
            <i className="fa fa-user user-big"></i>
            </div>
            <div className="intro-text">
                <h6 className="header">This is Bob. Bob is looking for a great hamburger.</h6>
                <h6 className="header">You can create the perfect hamburger for Bob- using Regex.</h6>
                <NextLessonButton lessonNumber={0} text="Begin" />
            </div>
          </div>
        </div>
        <div className="container lessons">
          {lessonsOutput}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App lessons={lessons}/>, document.getElementById('content'));