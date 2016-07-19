import React from 'react';
import ReactDOM from 'react-dom';
import lessons from './lessons';
import Lesson from './Lesson';
import Navbar from './Navbar';
import Introduction from './Introduction';
import Faq from './Faq';

class App extends React.Component {
  render() {
    let lessonsOutput = this.props.lessons.map((lesson) => {
      return (<Lesson key={`lesson${lesson.number}`} lesson={lesson} />);
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
        <div className="container">
          <Faq />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App lessons={lessons} />, document.getElementById('content'));
