import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              <a href="https://github.com/beaudavenport/regex-cafe">View on Github</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
