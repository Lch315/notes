##### 解题思路

这个问题和背包问题相似。同样分析符不符合动态规划的两个特性。

我们可以假设 `V(6, l)` 为当前数列的 LIS 最后一位的最小值，6 当前数列由索引之前的数组成，l 表示 LIS 的长度：

> 如果最后一个数字在 LIS 中，那么它一定是 LIS 中的最后一位数，则 V(6, l) 等于 V(6)

> 如果最后一个数字不在 LIS 中，那么 V(6, l) 等于 V(5, l), 若 V(5, l) 不存在，则等价于 Infinity

判断最后一个数字在不在 LIS 中，可以比较 `V(6)` 与 `V(5, l - 1)`：若前者大于后者，则继续比较 `V(6)` 与 `V(5, l)`， 若前者大于后者，则说明 `V(6)` 在 LIS 中，反之则不在。

根据上述逻辑，可推出关系式：

```
1) V(i) > V(i - 1, l - 1)   V(i, l) = min(V(i), V(i - 1, l))
2) V(i) <= V(i - 1, l - 1)  V(i, l) = V(i - 1, l)
3) 若当前阶段为长度为 l 的递增子序列不存在，V(i, l) = Infinity
```