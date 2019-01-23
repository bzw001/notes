
const INITIAL_FILTERED_VALUE = { nodes: [], nodeParentMappings: {} };

const filterNodes = (filter, nodes, parents = []) => {
  // debugger;
  return nodes.reduce((filtered, n) => {
    const { nodes: filteredChildren, nodeParentMappings: childrenNodeMappings } = (n.children && n.children.length)
    ? filterNodes(filter, n.children, [...parents, n.srcGgrId])
    : INITIAL_FILTERED_VALUE;
  return !(filter(n) || filteredChildren.length)
    ? filtered
    : {
      nodes: [
        ...(filtered ? filtered.nodes : []),
        {
          ...n,
          children: filteredChildren,
        },
      ],
      nodeParentMappings: {
        ...filtered.nodeParentMappings,
        ...childrenNodeMappings,
        [n.srcGgrId]: parents,
      },
    };
},INITIAL_FILTERED_VALUE)
};

const nodes = [
  {
    groupName: '1', srcGgrId: 1, children: [
      {
        groupName: 2, srcGgrId: 2,
        children: [{
          groupName: 3, srcGgrId: 3,
          children: [
            {
              groupName: 'a',
              srcGgrId: 4,
            }
          ]
        }]
      },
      {
        groupName: 'c',
        srcGgrId: 123,
        children: [
          { groupName: 'a', srcGgrId: 5 }
        ]
      }
    ]
  }
]

console.log(filterNodes(node => node.groupName === 'a', nodes));
;
