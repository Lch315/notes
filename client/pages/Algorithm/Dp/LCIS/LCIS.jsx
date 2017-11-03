import React, { Component } from 'react';
import classnames from 'classnames';
import { Table, Icon } from 'antd';
import MD from 'components/MD';
import Fold from 'components/Fold';
import { dataGenerator, matrixGenerator, compileTableMatrix, compileMatrix } from './data';

const getData = () => {
  const data = [dataGenerator(10), dataGenerator(8)];
  const matrix = matrixGenerator(...data);

  compileMatrix(matrix, data[1]);
data.map(item => console.log(item));
  return {
    data,
    matrix,
  };
}

class LIS extends Component {

  state = getData();

  constructor(props) {
    super(props);
  }

  refresh() {
    this.setState(getData());
  }

  render() {
    const {
      data,
      matrix,
    } = this.state;

    return (
      <article className="">
        <Fold
          display={0}
          down={<Icon type="down-circle-o algorithm-down" />}
          up={<div className="algorithm-up"/>}
        >
          <MD md={require('./md/rolving-idea.md')} />

          <section className="algorithm-table">
            <Table pagination={false} {...compileTableMatrix(matrix, ...data)}/>
          </section>
        </Fold>

        <Icon type="sync" className="algorithm-refresh" onClick={() => this.refresh()}/>
      </article>
    );
  }
}

export default LIS;
