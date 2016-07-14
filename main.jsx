var toppings = {
  'bun-right': {
    image: 'images/bun-bottom-400.png'
  },
  'bun-left': {
    image: 'images/bun-top-400.png'
  },

  // cheese/numbers
  '1': {
    image: 'images/american-cheese-400.png',
    name: 'american cheese'
  },
  '2': {
    image: 'images/gouda-cheese-400.png'
  },
  '3': {
    image: 'images/swiss-cheese-400.png'
  },

  // letters/veggies
  'a': {
    image: 'images/lettuce-400.png'
  },
  'b': {
    image: 'images/jalepenos-400.png'
  },
  'c': {
    image: 'images/pickles-400.png'
  },
  'd': {
    image: 'images/red-onion-400.png'
  },

  //meats/characters
  '&': {
    image: 'images/hamburger-patty-400.png',
    name: 'hamburger patty'
  },
  '!': {
    image: 'images/bacon-400.png',
    name: 'bacon'
  },
  '@': {
    image: 'images/egg-400.png',
    name: 'bacon'
  },

  //mayo/blank space
  ' ': {
    image: 'images/mayonaise-400.png',
    name: 'mayo'
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
    availableRegex: '12&a&123!123abcd !&@'
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
      <div className="burger-area"><img src="images/bun-bottom-400.png"/>
        {requestContent}
        <img src="images/bun-top-400.png"/></div>
    );
  }
});

var Result = React.createClass({
  render: function() {
    var result = this.props.resultString.split('').reverse().map(function(topping, index, theArray) {
      var negativeIndex = theArray.length - index;
      var style = {zIndex: negativeIndex};
      return <div className="horizontal" style={style}><img src={toppings[topping].image} /></div>;
    });
    return (
      <div>
        <div className="horizontal" style={{zIndex: result.length + 1}}>
          <img src="images/bun-top-400.png"/>
        </div>
        {result}
        <div className="horizontal" style={{zIndex: 0}}>
          <img src="images/bun-bottom-400.png"/>
        </div>
      </div>
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

    var burgerResult = null;
    if (this.state.match !== null) {
      burgerResult = <Result resultString={this.state.match[0]} />;
    }

    var desiredIngredients = this.props.lesson.desiredIngredients.map(function(desired, index) {
      var ingredient = toppings[desired.symbol];
      return (
        <div key={index}>
          <div className="order-ingredient">
            {desired.quantity}-{ingredient.name}
          </div>
          <div className="order-image">
            <img src={ingredient.image}/>
          </div>
        </div>
      );
    });

    return (
      <div className="card-wrapper"id={'lesson-' + this.props.lesson.number}>
        <div className="card-wrapper-cell">
          <div className="lesson-card card">
            <h3>{this.props.lesson.name}</h3>
            <p className="lead">{this.props.lesson.description}</p>
            <div className="row">
              <div className="six columns">
                <p>Bob tells you he would like a hamburger with (from bottom to top): </p>
              </div>
              <div className="six columns">
                <div>{desiredIngredients}</div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="six columns">
                <p>You scribble a quick drawing on your notepad:</p>
              </div>
              <div className="six columns">
                <Request toppings={toppings} requestString={this.props.lesson.desiredRegex}/>
              </div>
            </div>
            <p>
              The kitchen staff looks for the ingredients...
            </p>
            <div className="row btn-row">
              <div className="columns six">
                <button className="button-primary" onClick={this._checkRegex}>Find Ingredients</button>
              </div>
              <div className="columns six">
                {successButton}
              </div>
            </div>
              <div className="burger-area">
                {output}
              </div>
              <div className="card burger-card">
                {burgerResult}
              </div>
          </div>

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
