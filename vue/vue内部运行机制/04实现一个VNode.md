##### 实现一个VNode节点
> 首先VNode是一个以js对象为基础的树, 对象属性描述节点，是真实Dom的抽象。 由于Virtual Dom以js对象为基础，所以具有跨平台属性

- 实现一个Vnode
> 创建一个简单的VNode类, 包含一些基本属性
```
    class VNode {
        constructor (tag, data, children, text, elm) {
            //节点标签名
            this.tag = tag;
            //节点的一些数据信息，如props, attrs等
            this.data = data;
            //子节点，数组
            this.childrend = children;
            //节点文本
            this.text = text;
            //当前虚拟节点对应的真实Dom节点
            this.elm = elm;
        }
    }
```

- 一个简单vue组件下的VNode
```
    //简单组件
    <template>
        <span class="demo" v-show="isShow">
            this is a span
        </span>
    </template>

    //转换成js 代码形式
    function render () {
        return new VNode (
                'span',
                {
                    //指令集合数组
                    directives: [
                        {
                            rawName:'v-show',
                        expression:'isShow',
                        name:'show',
                        value:true
                        }
                    ]
                },
                //静态class
                staticClass: 'demo'
            },
            [new VNode(undefined, undefined, undefined, 'this is a span')]
        )
    }
    //转换成VNode之后
    {
        tag: 'span',
        data: {
            directives: [
                {
                    //v-show指令
                    rawName: 'v-show',
                    expression:'ishow',
                    name: 'show',
                    value: 'true'
                }
            ],
            staticClass: 'demo'
        },
        text: undefined,
        children: [
            {
                tag: undefined,
                data: undefined,
                text: 'This is a span',
                children: undefined
            }
        ]
    }
```

- 对VNode节点进行一些分装
> 分别形成创建空节点， 创建文本节点， 克隆VNode节点

``` 
    //创建空节点
    function createEmptyVnode () {
        const node = new VNode();
        node.text = '';
        return node;
    }

    //创建一个文本节点
    function createTextVNode() {
        return new Vnode(undefined, undefined, undefined, String(val));
    }

    //克隆一个VNode节点

    function cloneVNode (node) {
        const cloneVnode = new Vnode(
            node.tag,
            node.data,
            node.children,
            node.text,
            node.elm
        );

        return cloneNode;
    }
```

##### 总结
> VNode是一个带描述真实dom节点信息以及自身指令信息属性的js对象树，树的结构代表着其对应的dom树结构。