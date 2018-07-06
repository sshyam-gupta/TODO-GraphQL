import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
  };

  state = {
    hasError: false,
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '80px 0'
        }}
          className='flex flex-column'>
          <span style={{ fontSize: '24px' }} className="tc">Something went wrong!</span>
          <button type="submit" style={{
            fontSize: '20px',
            border: 'none',
            background: '#535558',
            outline: 'none',
            color: '#fff',
            width: '85px',
            margin: '20px auto',
            borderRadius: '4px',
            fontWeight: 'lighter'
          }} onClick={window.location.reload}>Retry</button>
        </div >
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;