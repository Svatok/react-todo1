import React, { Component } from 'react';

class Application extends Component {
  render() {
    return (
      <div>
      <p>Header here</p>

      <div className="container">
        {this.props.children}
      </div>

      <p>Footer here</p>
      </div>
    );
  }
}

export default Application;