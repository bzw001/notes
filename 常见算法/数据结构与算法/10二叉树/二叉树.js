//Node类定义

function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show  = show;
}

function show() {
  console.log(this.data)
  return this.data;
}

//BST的 insert 方法
/**
 * 1、检测是否有根节点
 * 2、根据数据大小来确定为左还是右节点
 * 3、如果目标处节点为null，则将新节点插入该位置
 */

 function BST() {
   this.root = null;
   this.insert = insert;
   this.inOrder = inOrder;
 }

 function insert (data) {
   var n = new Node(data, null, null);
   if (!this.root) {
     this.root = n ;
   }
   else {
     let current = this.root;
     let parent;
     while(true) {
       parent = current;
       if (data < current.data) {
         current = current.left;
         if (! current) {
           parent.left = n;
           break;
         }
       }
       else {
        current = current.right;
        if (! current) {
          parent.right = n;
          break;
        }
      }
     }
   }
 }
//中序遍历
//先访问左子树，再访问根节点，再访问右子树
//这里使用递归实现
 function inOrder(node) {
  if (node) {
    inOrder(node.left);
    node.show();
    inOrder(node.right);
  }
 }
 //测试中序遍历

 var nums = new BST();
 nums.insert(23);
 nums.insert(45);
 nums.insert(16);
 nums.insert(37);
 nums.insert(3);
 nums.insert(99);
 nums.insert(22);
//  inOrder(nums.root);

//先序遍历,会先遍历根节点
function preOrder(node) {
  if (node) {
    node.show();
    preOrder(node.left);
    preOrder(node.right);
  }
}

//后序遍历
function postOrder(node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    node.show();
  }
}


//二叉树上的查找

//查找最小值
//只需在左子树上查到最后一个节点

function getMin() {
  var current = this.root;
  while(current.left) {
    current = current.left;
  }
  return current.data;
}

function getMax() {
  var current = this.root;
  while(current.right) {
    current = current.right;
  }
  return current.data;
}

//查找指定值

function find(data) {
  var current = this.root;
  while(current ) {
    if (current.data == data) {
      return current;
    }
    else if (data < current.data) {
      current = data.left;
    }else {
      current = current.right;
    }
  }
  return null;
}