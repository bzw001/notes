//构建图

function Graph(v) {
  this.vertices = v;
  this.edges = 0; //边数
  this.adj = [];//存储图的关系
  for( var i = 0; i < this.vertices; ++ i) {
    this.adj[i] = [];
    this.adj[i].push[""];
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;
  //用于深度优先算法
  this.marked = [];
  for(let i = 0; i < this.vertices; i ++) {
    this.marked[i] = false;
  }
  this.dfs = dfs;
  //用于广度优先遍历
  this.bfs = bfs;

  //用于查找最短路径
  this.edgeTo = []; //保存从一个顶点到下一个顶点的所有边
  this.pathTo = pathTo;
  this.hasPathTo = hasPathTo;
}

//添加边
function   addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges ++ ;
}
function showGraph () {
  for (var i =0; i < this.vertices; ++i) {
    console.log(i ,'->');
    for(var j =0 ; j< this.vertices; ++j) {
      if (typeof this.adj[i][j] != 'undefined') {
        console.log(this.adj[i][j])
      }
    }
  }
}



//深度优先搜索函数
function dfs(v) {
  this.marked[v] = true;
  if (typeof this.adj[v] != 'undefined') {
    console.log('visit vertex', v);
  }
  this.adj[v].forEach((item) => {
    if (!this.marked[item]) {
      this.dfs(item);
    }
  })
}

//广度优先遍历

function bfs (s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s);// 添加到队尾
  while(queue.length > 0) {
    var v = queue.shift();//
    if (typeof v != 'undefined') {
      console.log('visite vertex', v);
    }
    this.adj[v].forEach(item => {
      if (!this.marked[item]) {
        this.edgeTo[item] = v;
        this.marked[item] = true;
        queue.push(item);
      }
    })
  }
}

// 存储与指定顶点有共同边的所有顶点
function pathTo(v) {
  var source = 0;
  if (!this.hasPathTo(v)) {
    return undefined;
  }
  var path = [];
  for (var i = v; i != source; i = this.edgeTo[i]) {
    path.push(i);
  }
  path.push(source);
  return path;
}

function hasPathTo(v) {
  return this.marked[v];
}

var g = new Graph(8);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
g.addEdge(2, 4);
g.addEdge(3, 4);
g.addEdge(4, 5);
g.addEdge(3, 5);
// g.showGraph();
// g.dfs(0);
// debugger;
g.bfs(0)
console.log(g.edgeTo)
var vertex = 5;
var paths = g.pathTo(vertex);
var log = '';
while(paths.length) {
  if (paths.length > 1) {
    log += paths.pop() + '-';
  }else {
    log += paths.pop();
  }
}
console.log(log);
