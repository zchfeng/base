//  深度遍历
// 树结构

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 使用栈实现树的深度遍历
function depth(root) {
  let stack = [root];
  let res = [];
  const dfs = () => {
    let item = stack.pop();
    res.push(item.val);
    if (item.right !== null) {
      stack.push(item.right);
    }
    if (item.left !== null) {
      stack.push(item.right);
    }
    if (stack.length > 0) dfs();
  };
  dfs();
  return res;
}

//  使用队列实现树的广度遍历
function range(root) {
  let queue = [root];
  let res = [];
  const dfs = () => {
    let item = queue.shift();
    res.push(item.val);
    if (item.right !== null) {
      queue.push(item.right);
    }
    if (item.left !== null) {
      queue.push(item.right);
    }
    if (stack.length > 0) dfs();
  };
  dfs();
  return res;
}
