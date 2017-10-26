export const dataGenerator = (length = 10, { baseK = 10, baseV = 10 } = {}) => Array.from({ length }).map(() => ({
  k: Math.ceil(Math.random() * baseK),
  v: Math.ceil(Math.random() * baseV),
}));

export const compileTableData = (data) => {
  const columns = [{
    title: 'i',
    dataIndex: 'colBase',
  }];
  const row1 = { key: '1', colBase: 'K' };
  const row2 = { key: '2', colBase: 'V' };

  data.map(({ k, v, i }, index) => {
    const dataIndex = `col${index}`;
    columns.push({
      title: i || index + 1,
      dataIndex,
    });
    row1[dataIndex] = k;
    row2[dataIndex] = v;
  });

  return {
    dataSource: [row1, row2],
    columns,
  };
}

export const matrixGenerator = (data, total) => {
  const matrix = [];
  const initalMatrixFactor = Array.from({ length: total + 1 }).map(() => 0);

  matrix.push(initalMatrixFactor);

  for (let i = 0; i < data.length; i++) {
    const curMatrixFactor = matrix[i + 1] || [];
    const lastMatrixFactor = matrix[i];
    const item = data[i];

    for (let k = 0; k <= total; k++) {
      if (item.k > k) {
        curMatrixFactor[k] = lastMatrixFactor[k];
      } else {
        curMatrixFactor[k] = Math.max(lastMatrixFactor[k - item.k] + item.v, lastMatrixFactor[k]);
      }
    }

    matrix.push(curMatrixFactor);
  }

  return matrix;
}

let flags = {};

export const compileMatrix = (matrix, data, total) => {
  const result = [];
  let i = data.length;
  let k = total;

  flags = {};

  while (matrix[i][k]) {
    if (matrix[i][k] !== matrix[i - 1][k]) {
      const item = data[i - 1];

      result.unshift({ ...item, i });

      flags[`__${i}${k}`] = true;

      k -= item.k;
    } else {
      flags[`__${i}${k}`] = false;
    }

    i--;
  }

  return result;
}

export const compileTableMatrix = (matrix, data) => {
  const columns = [{
    title: 'i/k',
    dataIndex: 'colBase',
  }];
  const dataSource = [];
  const columnsLen = matrix[0].length + 1;

  matrix.map((factor, i) => {
    const row = {
      key: i,
      colBase: i,
    };

    factor.map((item, k) => {
      const dataIndex = `col${k}`;

      row[dataIndex] = item;

      if (columns.length < columnsLen) {
        columns.push({
          title: k,
          dataIndex,
          render: (text, record, index) => {
            const flag = flags[`__${index}${k}`];

            if (flag === undefined) {
              return text;
            } else {
              if (flag) {
                return {
                  props: { className: 'correct' },
                  children: text,
                };
              }

              return {
                props: { className: 'incorrect' },
                children: text,
              };
            }
          }
        });
      }
    });

    dataSource.push(row);
  });

  return {
    dataSource,
    columns,
  };
}
