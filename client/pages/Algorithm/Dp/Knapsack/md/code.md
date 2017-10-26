```
// 获取表数据
const matrixGenerator = (data, total) => {
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

// 解析结果
const compileMatrix = (matrix, data, total) => {
  const result = [];
  let i = data.length;
  let k = total;

  while (matrix[i][k]) {
    if (matrix[i][k] !== matrix[i - 1][k]) {
      const item = data[i - 1];

      result.unshift({ ...item, i });

      k -= item.k; 
    }

    i--;
  }

  return result;
}
```
