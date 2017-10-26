import React, { Component } from 'react';

class Container extends Component {
  render() {
    return (
      <article className="note-container">
        { this.props.children }
      </article>
    );
  }
}

export default Container;
