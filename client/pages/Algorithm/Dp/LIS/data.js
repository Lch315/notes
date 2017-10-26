export const dataGenerator = (length = 10, { max = 10, min = 1 } = {}) => Array.from({ length }).map(() => min + Math.round(Math.random() * (max - min)));

export const compileTableData = (data) => {
  const columns = [{
    title: 'i',
    dataIndex: 'colBase',
  }];
  const row = { key: '1', colBase: 'V' };

  data.map((item, index) => {
    const dataIndex = `col${index}`;
    columns.push({
      title: item.i || (index + 1),
      dataIndex,
    });
    row[dataIndex] = item.v || item;
  });

  return {
    dataSource: [row],
    columns,
  };
}

export const matrixGenerator = (data, total) => {
  const matrix = [];
  const initalMatrixFactor = Array.from({ length: total + 1 }).map((item, index) => index ? Infinity : 0);
  const len = data.length;

  matrix.push(initalMatrixFactor);

  for (let i = 0; i < len; i++) {
    const curMatrixFactor = matrix[i + 1] || [0];
    const lastMatrixFactor = matrix[i];
    const num = data[i];

    for (let l = 1; l < len + 1; l++) {
      if (num > matrix[i][l - 1]) {
        curMatrixFactor[l] = Math.min(num, lastMatrixFactor[l]);
      } else {
        curMatrixFactor[l] = lastMatrixFactor[l];
      }
    }

    matrix.push(curMatrixFactor);
  }

  return matrix;
}

let flags = {};

export const compileMatrix = (matrix) => {
  const result = [];

  let i = matrix.length - 1;
  let l = matrix[i].filter(item => item !== Infinity).length - 1;

  flags = {};

  while(matrix[i][l]) {
    if (matrix[i][l] < matrix[i - 1][l]) {
      result.unshift({
        i,
        v: matrix[i][l],
      });

      flags[`__${i}${l}`] = true;

      l--;
    } else {
      flags[`__${i}${l}`] = false
    }

    i--;
  }

  return result;
}

export const compileTableMatrix = (matrix, data) => {
  const columns = [{
    title: 'num/l',
    dataIndex: 'colBase',
  }];
  const dataSource = [];
  const columnsLen = matrix[0].length + 1;

  matrix.map((factor, i) => {
    const row = {
      key: i,
      colBase: i ? data[i - 1] : '-',
    };

    factor.map((item, l) => {
      const dataIndex = `col${l}`;

      row[dataIndex] = item;

      if (columns.length < columnsLen) {
        columns.push({
          title: l,
          dataIndex,
          render: (text, record, index) => {
            const flag = flags[`__${index}${l}`];

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
