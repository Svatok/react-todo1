import React, { Component } from 'react';
import Menu from './Menu';

class Application extends Component {
  render() {
    return (
      <div>
      <Menu/>
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
