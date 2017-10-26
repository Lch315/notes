import React, { Component } from 'react';

class Container extends Component {
  render() {
    return (
      <article className="algorithm-container">
        { this.props.children }
      </article>
    );
  }
}

export default Container;
