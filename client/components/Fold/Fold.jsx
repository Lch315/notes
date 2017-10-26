import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Fold extends Component {
  static propTypes = {
    display: PropTypes.number,
    step: PropTypes.number,
  };

  static defaultProps = {
    display: 1,
    step: 1,
  };

  constructor(props) {
    super(props);

    this.state = {
      display: props.display,
    };
  }

  componentWillReceiveProps({ display }) {
    display !== this.props.display && this.setState({ display });
  }

  down(existLen) {
    const { step } = this.props;
    const { display } = this.state;

    this.setState({ display: Math.min(display + step, existLen) });
  }

  up() {
    const {
      display: baseDis,
      step,
    } = this.props;
    const { display } = this.state;

    this.setState({ display: Math.max(display - step, baseDis) });
  }

  renderOperation(existLen) {
    const {
      display: baseDis,
      up,
      down,
    } = this.props;
    const { display } = this.state;

    if (existLen <= baseDis) {
      return null;
    }

    const operation = [];

    if (existLen > display) {
      down && operation.push(<div key="0" className="down" onClick={ () => this.down(existLen) }>{ down }</div>);
    }

    if (display > baseDis) {
      up && operation.push(<div key="1" className="up" onClick={ () => this.up() }>{ up }</div>);
    }

    return operation;
  }

  render() {
    const {
      className,
      children,
    } = this.props;
    const { display } = this.state;
    const existChildren = children.filter(item => !!item);

    return (
      <article className={classnames('fold', className)}>
        { Children.map(existChildren, (item, index) => index < display ? item : null) }
        <div className="fold-operation">{ this.renderOperation(existChildren.length) }</div>
      </article>
    );
  }
}

export default Fold;
