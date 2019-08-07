/**
 * 这道题不是工程题，是道算法题。求的是两个数组的最长公共子序列。
 * 所以用一个 filter 一个 includes 或者 indexOf 的都是错的。
 * 
 * 哈希表，时间复杂度 O(m + n) m为 nums1 长度，n为 nums2 长度
 * 
 * 反例很简单:
 * var nums1 = [1]
 * var nums2 = [1,1]
 * 
 * @param {Array} nums1 
 * @param {Array} nums2 
 */
const intersect = (nums1, nums2) => {
  const map = {}
  const res = []
  for (let n of nums1) {
    if (map[n]) {
      map[n]++
    } else {
      map[n] = 1
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n)
      map[n]--
    }
  }
  return res
}