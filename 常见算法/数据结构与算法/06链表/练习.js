// 1、实现advence方法， 能够使当前节点向前移动n个节点

function nodeIndex(item) {
  var currentNode = this.head;
  var i =0;
  while (!(currentNode.next == null) && currentNode.element != item) {
    currentNode = currentNode.next;
    i++;
  };
  return i;
}
function findIndexNode(index) {
  var currentNode = this.head;
  var i =0;
  while(!(currentNode.next == null) && i != num) {
    currentNode = currentNode.next;
    i++;
  }
  return currentNode;
}
function findPrev(num,item) {
  var currNodeIndex = this.nodeIndex(item);
  if (currNodeIndex - num <0) return false;
  var targetNodeIndex = currNodeIndex - num;
  return this.findIndexNode(targetNodeIndex);
}

function advance(num,item) {
  this.remove(item);
  var prevNumNode = this.findPrev(num,item);
  this.insert(prevNumNode.element,item); 
}
// 2、实现bask(n)方法，是当前节点向后移动n个节点

//3、实现show方法，只显示当前节点上的数据

// 4、使用单向链表写一段程序，记录用户输入的一组测验成绩
function linkList() {
  this.head = new Node('head');
  this.last = this.head;
}
function push(item) {
  var newNode = new Node(item);
  var lastNode = this.findLast();
  lastNode.next = newNode;
}
// 5、使用双向链表重写第4题

/*传说在公元 1 世纪的犹太战争中，犹太历史学家弗拉维奥·约瑟夫斯和他的 40 个同胞
被罗马士兵包围。犹太士兵决定宁可自杀也不做俘虏，于是商量出了一个自杀方案。他
们围成一个圈，从一个人开始，数到第三个人时将第三个人杀死，然后再数，直到杀光
所有人。约瑟夫和另外一个人决定不参加这个疯狂的游戏，他们快速地计算出了两个位
置，站在那里得以幸存。写一段程序将 n 个人围成一圈，并且第 m 个人会被杀掉，计算
一圈人中哪两个人最后会存活。使用循环链表解决该问题。*/
/**
 * 信息点：
 * 1、创建长度为n的循环链表,头结点的值为0,向后节点值依次加1直到n-1
 * 2、循环链表的第m个会一直remove掉
 * 3、最后存在两个节点，节点值为最开始与头结点的相对index
 */
function Node(element){
  this.element = element;
  this.next = null;
}

function LinkList(){
  this.head = new Node(0);
  this.head.next = this.head;
  this.insertLast = insertLast;
  this.display = display;
  this.find = find;
  this.findPrev = findPrev;
  this.solution = solution;
  this.removeCircle = removeCircle;
  this.currNode = this.head;//开始数数节点
}

function insertLast(item){
  var currentNode = this.head;
  while (currentNode.next.element != 0) {
    currentNode = currentNode.next;
  }
  var newNode = new Node(item);
  currentNode.next = newNode;
  newNode.next = this.head;
}
function findPrev(item) {
  var currentNode = this.head;
  while( currentNode.next.element != 0  && currentNode.next.element != item) {
    currentNode = currentNode.next;
  }
  return currentNode;
}
function find(item){
  var currentNode = this.head;
  while( currentNode.element != item) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

//从当前节点进行循环计数
function removeCircle(num) {
  var item = this.currNode.element;
  while(num > 1){
    this.currNode = this.currNode.next;
    num --;
    if(this.currNode.element == item) {
      return true;
    }
  }
  var currentNode = this.currNode;
  var prevNode = this.findPrev(currentNode.element);
  prevNode.next = currentNode.next;
  this.currNode= prevNode.next;
  return false;
}

function display(){
  var currentNode = this.currNode;
  var item = this.currNode.element;
  while(currentNode.next.element !=item){
    console.log(currentNode.element);
    currentNode = currentNode.next;
  }
  console.log(currentNode.element);
}
function solution(num){
  while(!this.removeCircle(num)){
  }
  return true;
}

var list  = new LinkList();
for(var i = 1;i<35;i++) {
  list.insertLast(i);
}
if (list.solution(3)){
  list.display();
}