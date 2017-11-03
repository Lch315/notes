```
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
```