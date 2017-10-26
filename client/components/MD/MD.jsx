import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MD extends Component {
  static propTypes = {
    md: PropTypes.string,
  };

  static defaultProps = {
    md: '',
  };

  render() {
    const { className, md } = this.props;

    return (
      <article
        className={ classnames('markdown-block', className) }
        dangerouslySetInnerHTML={{ __html: md }}
      />
    );
  }
}

export default MD;
