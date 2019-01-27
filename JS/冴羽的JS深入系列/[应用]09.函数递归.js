/**
 * 调用自身的编程技巧称为递归
 * 递归特点：
 *  1、子问题须与原始问题为同样的事情，且更为简单
 *  2、不饿能无限制地调用本身，须有个出口
 */

//例，阶乘
function factorial(n) {
  if(n == 1) return n;
  return n * factorial(n - 1);
}

///如果优化这种需要不停创建执行上下文压入执行上下文栈，如何优化
//// 使用尾调用: 函数内部最后一个动作是函数调用
//例：
function f(x) {
  return g(x); // 尾调用
  return g(x) + 1;// 非尾调用， 这里的两个返回的执行上下文栈的变化是不一样的
  // 尾调用执行时，执行上下文栈中相当于只多压入了一个执行上下文，而非尾调用函数，就会创建多个执行上下文压入执行上下文栈
  
}

// 如果尾调用自身，就是尾递归


/// 阶乘函数优化
function factorial(n, res) {
  if (n == 1) return res;
  return factorial(n - 1, n * res);
}
factorial(4,1);

// 可以用partial函数简化
var newFatorial = partial(factorial, _, 1);
newFatorial(4);


