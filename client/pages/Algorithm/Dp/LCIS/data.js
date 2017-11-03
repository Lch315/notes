export const dataGenerator = (length = 10, { max = 10, min = 1 } = {}) => Array.from({ length }).map(() => min + Math.round(Math.random() * (max - min)));

export const matrixGenerator = (a, b) => {
  const matrix = Array.from({ length: a.length }, () => Array.from({ length: b.length }));

  for (let i = 0;i < a.length;i++) {
    const lastMatrixFactor = matrix[i - 1] || [];
    let maxLen = 0;

    for(let j = 0;j < b.length;j++) {
      const lastCommon = lastMatrixFactor[j] || 0;

      if (a[i] === b[j]) {
        matrix[i][j] = maxLen + 1;
      } else {
        matrix[i][j] = lastCommon;

        if (a[i] > b[j] && maxLen < lastCommon) { // 维护 max(F[i-1][k])。b[j] > b[k]，当a[i] === b[j]，才会使用 maxLen，此处用可用 a[i] 代替 b[j]
          maxLen = lastCommon;
        }
      }
    }
  }

  return matrix;
}

let flags = {};

export const compileMatrix = (matrix, b) => {
  let i = matrix.length - 1;
  let j = matrix[i].indexOf(Math.max(...matrix[i]));

  flags = {};

  while(i > -1 && matrix[i][j]) {
    const lastFactor = matrix[i - 1] || [];
    const lastItem = lastFactor[j] || 0;

    if (matrix[i][j] > lastItem) {
      const cJ = j;

      flags[`__${i}${j}`] = 1;

      for (let n = j - 1;n > -1;n--) {
        if (cJ === j) {
          if (b[j] > b[n]) {
            flags[`__${i - 1}${n}`] = 2;

            if (lastFactor[n] === (matrix[i][j] - 1)) {
              j = n;
            }
          }

          flags[`__${i - 1}${n}`] = 3;
        }
      }
    } else {
      flags[`__${i}${j}`] = 2;
    }

    i--;
  }
}

export const compileTableMatrix = (matrix, a, b) => {console.log(flags);
  const columns = [{
    title: 'a/b',
    dataIndex: 'colBase',
  }];
  const dataSource = [];
  const columnsLen = b.length + 1;

  matrix.map((factor, i) => {
    const row = {
      key: i,
      colBase: a[i],
    };

    factor.map((item, j) => {
      const dataIndex = `col${j}`;

      row[dataIndex] = item;

      if (columns.length < columnsLen) {
        columns.push({
          title: b[j],
          dataIndex,
          render: (text, record, index) => {
            const flag = flags[`__${index}${j}`];

            if (flag === undefined) {
              return text;
            } else {
              if (flag === 1) {
                return {
                  props: { className: 'correct' },
                  children: text,
                };
              }

              if (flag === 3) {
                return {
                  props: { className: 'error' },
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
