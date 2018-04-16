function Node(element){
  this.element = element;
  this.next = null;
  this.prev = null;
}

function LinkList() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.findLast = findLast;
  this.dispReverse = dispReverse;
}

function find(item) {
  var currentNode = this.head;
  while (!(currentNode.next == null) && currentNode.element != item) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

function insert(newElement,item){
  var newNode = new Node(newElement);
  var currentNode = this.find(item);
  if (!(currentNode.next == null)) {
    newNode.next = currentNode.next;
    newNode.prev = currentNode;
    currentNode.next = newNode;
    currentNode.next.prev = newNode;
  } else {
    currentNode.next = newNode;
    newNode.prev = currentNode;
  }
}

function remove(item){
  var currentNode = this.find(item);
  if (!(currentNode.next == null)) {
    currentNode.prev.next = currentNode.next;
    currentNode.next.prev = currentNode.prev;
  } else {
    currentNode.prev.next = null;
  }
  currentNode.prev = null;
  currentNode.next = null;
}

function findLast() {
  var currentNode = this.head;
  while(!(currentNode.next == null)) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

function dispReverse() {
  var currentNode = this.findLast();
  while(!(currentNode.prev == null)) {
    console.log(currentNode.element);
    currentNode = currentNode.prev;
  }
}

//测试
var list = new LinkList();
list.insert('second','head');
list.insert('third','second');
// list.remove('second');
list.dispReverse(); // third  second