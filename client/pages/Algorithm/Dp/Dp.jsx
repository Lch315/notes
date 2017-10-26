import React, { Component } from 'react';
import classnames from 'classnames';
import MD from 'components/MD';

class Algorithm extends Component {
  render() {
    return (
      <article className="page-algorithm-dp">
        <MD md={require('./md/brief.md')} />

        { this.props.children }
      </article>
    );
  }
}

export default Algorithm;
