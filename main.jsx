var Request = React.createClass({
  render: function() {
    var requestContent = this.props.requestString.split('|').map(function(topping, index) {
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
    var result = this.props.resultString.split('').slice().reverse().map(function(topping, index, theArray) {
      var negativeIndex = theArray.length - index;
      var style = {zIndex: negativeIndex};
      return <div className="horizontal" style={style}><img src={toppings[topping].image} /></div>;
    });
    return (
      <div className="burger-result-wrapper">
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
      match: this.props.lesson.availableRegex.match(new RegExp(this.props.lesson.desiredRegex.split('|').join('')))
    });
  },

  render: function() {
    var output = this.props.lesson.availableRegex.split('').map(function(topping, index) {
      var styling = '';
      if (this.state.match !== null) {
        if (index >= this.state.match.index && index < this.state.match.index + this.state.match[0].length) {
          styling = 'highlighted';
        } else {
          styling = 'unhighlighted';
        }
      }
      return <img key={this.props.lesson.number + '-' + index} className={styling} src={toppings[topping].image}/>;
    }.bind(this));

    var burgerResult = null;
    var burgerResultStyling = 'card burger-result';
    if (this.state.match !== null) {
      burgerResult = <Result resultString={this.state.match[0]} />;
      burgerResultStyling += ' complete';
    }

    var desiredIngredients = this.props.lesson.desiredIngredients.slice().reverse().map(function(desired, index) {
      var orderImages = desired.symbols.split('').map(function(orderedIngredient) {
        var ingredient = toppings[orderedIngredient];
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
      <div className="card-wrapper"id={'lesson-' + this.props.lesson.number}>
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
            <button className="button-primary" onClick={this._checkRegex}>Find Ingredients</button>
            <div className="burger-area">
              {output}
            </div>
            <div className={burgerResultStyling}>
              <h3>Success!</h3>
              <div className="row">
                <div className="burger-result-cell six columns">
                  {burgerResult}
                </div>
                <div className="six columns">
                  <p><i className="fa fa-smile-o user-medium"></i></p>
                  <NextLessonButton lessonNumber={this.props.lesson.number} text="Next Lesson" />
                </div>
              </div>
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

var Introduction = React.createClass({
  render: function() {
    return (
      <div className="intro">
        <div className="intro-cell">
          <div className="row">
            <div className="four columns">
              <i className="fa fa-user user-big"></i>
              <h6 className="header"><span className="lead-word">Bob,</span> your customer, is famous for <strong>outlandish, oddly specific</strong> hamburger requests.</h6>
            </div>
            <div className="four columns">
              <i className="fa fa-cutlery user-big"></i>
              <h6 className="header"><span className="lead-word">The chef,</span> unfortunately, <strong>does not speak English</strong> and only has <strong>one hand</strong>.</h6>
            </div>
            <div className="four columns">
              <i className="fa fa-meh-o user-big"></i>
              <h6 className="header"><span className="lead-word">You,</span> the waiter, will have to serve Bob <strong>the perfect hamburger</strong>.</h6>
            </div>
          </div>
          <NextLessonButton lessonNumber={0} text="Begin" />
        </div>
      </div>
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
          <Introduction />
        </div>
        <div className="container lessons">
          {lessonsOutput}
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App lessons={lessons}/>, document.getElementById('content'));
