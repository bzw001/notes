function Node(element) {
  this.element = element;
  this.next = null;
}

function LinkList() {
  this.head = new Node('head');
  this.find = find;
  this.findPrevious = findPrevious;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
}

function find(item) {
  var currentNode = this.head;
  while(currentNode.element != item) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

function insert(newElement, item) {
  var newNode = new Node(newElement);
  var currentNode = this.find(item);
  newNode.next = currentNode.next;
  currentNode.next = newNode;
}

function display() {
  var currentNode = this.head;
  while(currentNode.next != null) {
    currentNode = currentNode.next;
    console.log(currentNode.element);
  }
}


function findPrevious(item){
  var currentNode = this.head;
  while(!(currentNode.next == null) && currentNode.next.element != item) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

function remove(item){
  var preNode = this.findPrevious(item);
  if (!(preNode.next == null)) {
    preNode.next = preNode.next.next;
  }
}
//测试
var list = new LinkList();
list.insert('second','head');
list.insert('third','head');
list.remove('third');
list.display();