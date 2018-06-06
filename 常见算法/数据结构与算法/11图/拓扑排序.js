function Graph(v) {
  this.vertices = [];
  this.vertexList = [];
  this.edges = 0;
  this.adj = [];
  for (var i = 0 ; i < this.vertices; i++) {
    this.adj[i] = [];
    this.adj[i].push("");
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;
  this.dfs = dfs;
  this.marked = [];
  for (var i = 0; i < this.vertices; i++ ) {
    this.marked[i] = false;
  }
  this.bfs = bfs;
  this.edgeTo = [];
  this.hasPathTo = hasPathTo;
  this.topSortHelper = topSortHelper;
  this.topSort = topSort;
}

function topSort() {
  var stack = [];
  var visited = [];
  for (var i =0 ; i < this.vertices; i++) {
    visited[i] = false;
  }
  for (var i = 0; i < this.vertices ; i++) {
    if (!visited[i]) {
      this.topSortHelper(i, visited, stack);
    }
  }
  for(var i = 0; i < stack.length; i++) {
    if (typeof stack[i] != 'undefined' && !stack[i]) {
      console.log(this.vertexList[stack[i]]);
    }
  }
}

function topSortHelper(v , visited, stack) {
  visited[v] = true;
  this.adj[v].forEach(w => {
    if (!visited[w]) {
      this.topSortHelper(visited[w], visited, stack);
    }
  })
  stack.push(v);
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges ++;
}