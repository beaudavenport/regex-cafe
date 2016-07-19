import React from 'react';
import NextLessonButton from './NextLessonButton';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
}

export default Introduction;
