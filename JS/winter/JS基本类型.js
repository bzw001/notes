/**
 * 1、建议使用void 0 来获取undefined值
 * 因为undefined是变量，而不是一个关键字
 * 但是可以直接使用Null,因为Null是关键字
 */

 /**
  * 2、String
  * 最大长度为2^53 - 1， 长度是指字符串编码长度
  * JS的字符串永远是无法变更的
  */

  /**
   * Number
   * 基本符合IEEE 754-2008规定的双精度浮点数规则
   * 引入了无穷大的概念
   * NaN, Infinity, -Infunity
   * 有+0 与-0
   * 
   * 为什么0.1+0.2不等于0.3
   * 这是浮点数精度运算的问题，会相差微小的值
   * 正确的比较方法是使用JS提供的最小精度值： Number.EPSILON
   * Math.abs(0.1 + 0.2 -0.3) <= Number.EPSILON
   */

   /**
    * Symbol
    * 一切非字符串对象的Key的集合
    */