import React from 'react';

class NextLessonButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="button" href={'#lesson-' + (this.props.lessonNumber + 1)}>{this.props.text}</a>
    );
  }
}

export default NextLessonButton;
