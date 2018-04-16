// 底层存储数据的数据结构时数组，那么链表有什么用呢? 有什么优于数据的地方吗？


/**
 * 1、数组的缺点
 * 在许多编程语言来讲，数组的长度是固定的，添加与删除操作比较麻烦
 * js的数组被实现成为对象，但因为与其他语言的数组相比，效率会低
 * 因为：常规的数组是一段线性分配的内存，通过整数计算偏移来访问语速，
 * 但是js的数组实际上是一个对象，其下标也只是对象的属性而已，这样的设计
 * 在于能够随机方便的访问
 * 
 * 当数组在使用中很慢，可以使用链表来替换它。
 * 
 */

 /**
  * 2、什么是链表
  * 
  * 链表是节点的集合，一个节点都使用一个对象的引用指向它的后继。指向另一个节点
  * 的引用叫做链。
  * 链表最前面会有一个特殊节点是头结点。尾元素指向的是一个null节点
  * 插入节点：修改其前面的节点指向新加入的节点，新加入的节点指向原来前驱指向的节点
  * 删除节点：待删除元素的前驱节点指向待删除节点的后继节点，同时将待删除节点指向null
  * 其它操作：建立，测长，打印，删除，插入
  */

  //基于对象的链表
  //Node类用来表示节点， LinkedList类提供了插入节点，删除节点，显示列表元素等方法
 
  //单向链表，精髓在于无论怎么做都需要从头结点循环遍历
  // Node类
  /**
   * 使用一个构造函数来创建节点
   * 属性：
   * element 保存节点上的数据
   * next 保存指向下一个节点的链接
   */
  function Node(element) {
    this.element = element;
    this.next = null;
  }

  // LinkedList 类
  /**
   * 提供对链表进行操作的方法。
   * 提供一个构造函数，链表只有一个属性，用一个Node对象保存该链表的头结点
   */
  function LinkedList () {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
  }

  //插入新节点
  //需要指出那个节点的前面或者后面插入
  //如：在一个已知节点后面插入元素，先找到后面的节点
  // 找节点方法 find()，只要循环比较即可
  function find(item){
    var currNode = this.head；
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
  //插入节点，先找到待插入节点的后节点，然后其前节点指向待插入节点，待插入节点指向后节点
  function insert(newElement, item){
    var newNode = new Node(newElement);
    var currentNode = this.find(item);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
  //打印链表
  function display() {
    var currentNode = this.head;
    while(!(currentNode.next == null)) {
      console.log(currentNode.next.element);
      currentNode = currentNode.next;
    }
  }

  //如何从链表中删除一个节点
  //先找到待删除节点前面的节点，修改其属性，将其next指向待删除的下一个节点。
  // findPrevious()，检测节点的下一个节点是否存储着待删除数据
  function findPrevious(item) {
    var  currentNode = this.head;
    while(!(currentNode == null) && currentNode.next.element != item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  function remove(item){
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == nulll)) {
      prevNode.next = prevNode.next.next;
    }
  }

  /**
   * 双向链表
   * 在节点添加prev属性指向其前驱，这样删除节点效率会提高,不需要查找删除节点的前驱节点了
   * 这样头结点的prev指向null,
   */
  
   //Node类，添加prev属性
   function Node(element) {
     this.element = element;
     this.next = null;
     this.prev = null;
   }
  //insert方法，需要将待插入节点的prev指向前面一个节点
  function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currentNode = this.find(item);
    newNode.next = currentNode.next;
    newNode.prev = currentNode;
    currentNode.next = newNode;
    if (!(currentNode.next == null)) {
      currentNode.next.prev = newNode;
    }
  }
  // remove比单向链表高效在于不需要寻找前驱节点，虽然
  //依然需要遍历找到目标节点，但是相对找前驱会少一些运算
  function remove(item) {
    var currentNode = this.find(item);
    if (!(currentNode.next == null)) {
      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
    } else {
      currentNode.prev.next =null;
    }
    currentNode.next = null;
    currentNode.pre = null;
  }
  //反序显示链表，就需要先找到链表的尾节点
  function findLast() {
    var currentNode = this.head;
    while(!(currentNode.next == null)){
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //反向显示
  function dispReverse() {
    var currentNode = this.findLast();
    while(!(currentNode.prev == null)) {
      console.log(currentNode.element);
      currentNode = currentNode.prev;
    }
  }

  /**
   * 循环链表
   * 单向链表只要将头结点next指向本身，接下来创建每个节点的next都指向其本身
   */
  function LinkList() {
    this.head = new Node('head');
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    this,findPrevious = findPrevious;
    this.remove = remove;
  }
  //其方法除dispaly方法需要修改为，其它方法都是一样
  function display() {
    var currentNode = this.head;
    while(!(currentNode.next == null) && !(currentNode.element == 'head')) {
      currentNode = currentNode.next;
      console.log(currentNod.element);
    }
  }