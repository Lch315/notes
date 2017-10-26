```
const matrixGenerator = (data, total) => {
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

compileMatrix = (matrix) => {
  const result = [];

  let i = matrix.length - 1;
  let l = matrix[i].filter(item => item !== Infinity).length - 1;

  while(matrix[i][l]) {
    if (matrix[i][l] < matrix[i - 1][l]) {
      result.unshift({
        i,
        v: matrix[i][l],
      });

      l--;
    }

    i--;
  }

  return result;
}
```