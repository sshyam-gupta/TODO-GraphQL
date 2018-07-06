import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="bg-white black-80 tc pv4 avenir">
        <h1 className="mt2 mb0 baskerville i fw1 f1">TODO</h1>
        <h2 className="mt2 mb0 f6 fw4 ttu tracked">
          Your amazing graphql todo
        </h2>
        <nav className="bt bb tl mt4">
          <Link
            className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l"
            to="/"
          >
            List
          </Link>
          {/* <a className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/portfolio">Portfolio</a> */}
          <Link
            className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l"
            to="/add"
          >
            Add
          </Link>
          {/* <a className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/about">About</a> */}
          {/* <a className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/contact">Contact</a> */}
        </nav>
      </header>
    );
  }
}

export default Header;
