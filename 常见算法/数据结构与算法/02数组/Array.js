/**
 * 有n个正整数组成的序列，给定整数 sum，求长度最长的连续子序列，使得它们的和等于 sum，返回此子序列的长度，如果没有满足条件的序列，返回-1。
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
function getMaxSubSeqLength(nums, target) {
    /**
     * pre[i] 表示前 i项的和
     * map[pre[i]] : i, hash缓存和，index
     * if map[pre[i] - sum] 存在, 则表示 map[pre[i] - sum]对应的index存在
     * result = j - i
     */

    let mp = {0:0};
    let result = -1;
    let sum = 0;
    for(let i =0 ; i < nums.length; i++) {
        sum += nums[i];
        mp[sum] = i;
        const lefValue = sum - target;
        if(lefValue === 0) result = Math.max(result, i + 1);
        else if(mp[lefValue] !== undefined) result = Math.max(result, i - mp[lefValue]);
    }

    return result;
}

/**
 * {
 *  0:0,
 *  1:0,
 *  3:1,
 *  6:2,
 *  11:3
 * }
 */
console.log('子序列的长度',getMaxSubSeqLength([1,2,3,5],3))
console.log('子序列的长度',getMaxSubSeqLength([1,2,11,1,1,1,1,1,1,1,1,3,5],5))
