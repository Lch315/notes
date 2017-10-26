import React, { Component } from 'react';
import classnames from 'classnames';
import { Table, Icon } from 'antd';
import MD from 'components/MD';
import Fold from 'components/Fold';
import { dataGenerator, compileTableData, matrixGenerator, compileTableMatrix, compileMatrix } from './data';

const num = 6;
const kg = 8;

const getData = () => {
  const data = dataGenerator(num, { baseK: kg - 2, baseV: kg - 2 });
  const matrix = matrixGenerator(data, kg);

  return {
    data,
    matrix,
    result: compileMatrix(matrix, data, kg),
  };
}

class Knapsack extends Component {

  state = getData();

  refresh() {
    this.setState(getData());
  }

  render() {
    const {
      data,
      matrix,
      result,
    } = this.state;

    return (
      <article className="page-algorithm-knapsack">
        <Fold
          display={1}
          down={<Icon type="down-circle-o algorithm-down" />}
          up={<div className="algorithm-up"/>}
        >
          <div>
            <MD md={require('./md/desc.md')} />

            <section className="algorithm-table">
              <Table pagination={false} {...compileTableData(data)}/>
            </section>
          </div>

          <MD md={require('./md/rolving-idea.md')} />

          <section className="algorithm-table">
            <Table pagination={false} {...compileTableMatrix(matrix, data)}/>
          </section>

          <section className="algorithm-table">
            <Table pagination={false} {...compileTableData(result)}/>
          </section>

          <MD md={require('./md/code.md')} />
        </Fold>

        <Icon type="sync" className="algorithm-refresh" onClick={() => this.refresh()}/>
      </article>
    );
  }
}

export default Knapsack;
