##### compile
> compile 编译分为parse, optimize, generate三个阶段

##### parse
> 通过正则等方式将template模板进行字符串解析，得到指令，class,style等数据,形成AST(抽象语法树);
> 能够描述出标签的属性以及依赖关系

```
 //得到的AST示例
 {
     //标签属性的map，记录标签上属性
     'attrsMap' : {
         ':class': 'c',
         'class': 'demo',
         'v-if': 'isShow'
     },
     //解析得到的:class
     'classBinding': 'c',
     //标签数据行v-if
     'if': 'isShow',
     //v-if 的条件
     'ifCondition': [
         'exp' : 'isShow'
     ],
     //标签属性class
     'staticClass': 'demo',
     //标签的tag
     'tag':'div',
     //子标签数组
     'children': [
         {
             'attrsMap': {
                 'v-for': 'item in sz'
             },
             //for 循环的参数
             'alias': 'item',
             //for循环的对象
             'for': 'sz',
             //for 循环是否已经被处理的标记位
             'forProcessed': true,
             'tag': 'span',
             'children': [
                 {
                     //表达式,_s是一个转字符串的函数
                     expression: '_s(item)',
                     'text': '{{item}}'
                 }
             ]
         }
     ]
 }
```
- 定义正则
```
    const ncname = '[a-zA-Z][\\w\\-\\.]*';
    const singleAttrIndentifer = /([^\s"'<>/=]+)/
    const singleAttrAssign = /(?:=)/
    const singleAttrValues = [
        /"([^"]*)"+/.source,
        /'([^'])'+/.source,
        /([^\s"'=<>`]+)/.source
    ]
    const attribute = new RegExp(
        '^\\s*' + singleAttrIdentifer.source +
        '(?;\\S*('+ singleAttrAssign.source + ')' +
        '\\s*(?:' + singleAttrValues.join('|') + '))?'
    )

    const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
    const startTagOpen = new RegExp('^<' + qnameCapture);
    const startTagClose = /^\s*(\/?)>/

    const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

    const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

    const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/
```

- advance
> 解析template采用循环进行字符串匹配的方式，每次匹配解析玩一段，就会将匹配掉的去掉。头部指针会指向接下来需要匹配的部分

```
    function advance (n) {
        index += n;
        html = html.subString(n);
    }
```

- parseHTML
> 循环解析template字符串,使用正则匹配到标签头，标签尾以及文本的时候进行不同处理，直到整个template解析完毕
```
    function parseHTML () {
        while(html) {
            let textEnd = html.indexOf('<');
            if (textEnd ===0) {
                if (html.match(endTag)) {
                    //... process end tag
                    continue;
                }

                if (html.match(startTagOpen)) {
                    //...process start tag
                    continue
                }
            } else {
                //...process text
                continueS
            }
        }
    }
```

- parseStartTag
> 解析起始标签

```
    //以 "<div :class="c" class="demo" v-if="isShow">"部分

    function parseStartTag () {
        //标签头部，得到tagname
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
            advance(start[0].length);

            let end, attr
            //解析标签结束与标签内的属性
            while( !(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3]
                })
            }
            
            if (end) {
                match.unarySlash = end[1];
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }
```

- stack
> 维护一个stack栈来保存已经解析号的标签头，这样解析尾标签的时候可以得到层级关系以及父标签。
> 定义一个currentParent变量来存放当前标签父标签节点的引用，root变量指向根节点标签

```
    //在startTagOpen 的if逻辑加上额外处理
    //将startTagMatch 结果封装成element.这个会是最终的AST节点。 标签节点type为1
    if (html.match( startTagOpen)) {
        const startTagMatch = parseStartTag();
        const element = {
            type: 1,
            tag: startTagMatch.tagName,
            lowerCasedTag: startTagMatch.tagName.toLowerCase(),
            attrsMap: makeAttrsMap(startTagMatch.attrs),
            parent: currentParent,
            children: []
        }
        //让root指向根节点的引用
        if (!root) {
            root = element
        }
        //将当前节点的element放入父节点的children中
        if (currentParent) {
            currentParent.children.push(elemnt)
        }
        //将element压入栈
        stack.push(element)
        currentParent = element
        continue
    }
    //如果下一个解析到的还是头标签或者是文本的话，这个新解析的节点会是当前节点的子节点
    //如果尾标签，则会从栈中取出当前节点
```

- parseEngTag
> 用来解析为标签，会从stack中取出最近的与自己标签名一直的元素，将currentParent指向该元素，同时将该元素前面的元素出栈
> 由于存在自闭合标签如<br />，没有完整闭合标签的情况，所有要找最近一个标签名同名的，而不是第一个出栈的元素

```
    function parseEndTag (tagName) {
        let pos;
        for (pos = stack.length - 1; pos >=0 ;pos--) {
            if (stack[pos].lowerCasedTag === tagName.tolowerCase()) {
                break;
            }
        }

        if (pos >= 0) {
            stack.length = pos;
            currentParent = stack[pos];
        }
    }
```

- parseText
> 解析文本，解析文本需要分为普通文本以及表达式的文本 
 - 普通文本： 直接构建一个节点push进当前的currentParent的children即可
 - 带表达式的文本; 需要parseText 来将表达式转化成代码

 ```
    var text = html.substring(0, textEnd);
    advance(textEnd)
    let expression;
    if (expression = parseText(text)) {
        currentParent.children.push( {
            type: 2,
            text,
            expression
        });
    } else {
        currentParent.children.push({
            type: 3,
            text
        })
    }
    continue;

    //获取表达式
    //tokens数组存放解析结果， defaultTagRE循环匹配该文本,如果是普通文本直接push进tokens,
    //如果是表达式，则会转化成'_s(${exp})'形式
    function parseText ( text) {
        if (!defaultTagRE.test(text)) return;

        const tokens = [];
        let lastIndex = defaultTagRE.lastIndex = 0;
        let match, index;
        while((match = defaultTagRE.exec(text))) {
            index = match.index;

            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }

            const exp = match[1].trim()
            tokens.push(`_s(${exp})`)
            lasIndex = index + match[0].length;
        }

        if (lastIndex < text.legnth) {
            tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
        return tokens.join('+')

    }

    //例
    <div>hello, {{name}}</div>
    // tokens
    tokens = ['helloe', _s(name)]
    //join返回表达式
    'hello'+ _s(name) 
 ```

 - 如何解析v-if, v-for这样的表达式的呢？ professIf与 professFor
 > 只需要在解析头标签的内容加入这两个表达式的解析函数即可。
 ```
    if (html.match(startTagOpen)) {
			const startTagMatch = parseStartTag();
			const element = {
				type: 1,
				tag: startTagMatch.tagName,
				attrsList: startTagMatch.attrs,
				attrsMap: makeAttrsMap(startTagMatch.atts),
				parent: currentParent,
				children:[]
			}

			processIf(element);
			processFor(element);

			if (!root) {
				root = element;
			}
			if (currentParent) {
				currentParent.children.push(element);
			}

			stack.push(element);
			currentParent = element;
			continue
		}
		//从el的attrsMap属性或是attrslist属性取出name对应值

		function getAndRemoveAttr(el, name) {
			let val;
			if ((val = el.attrsMap[name]) != null) {
				const list = el.attrsList;
				for (let i = 0, l = list.length; i < l; i++) {
					if (list[i].name === name) {
						list.splice(i , 1);
						break;
					}
				}
			}
			return val;
		}

		// v-for 会将指令解析成for属性以及alias属性， 而v-if会将条件都存入ifConditions数组中

		function processFor(e) {
			let exp;
			if ((exp = getAndRemoveAttr(el, 'v-for'))) {
				const inMatch = exp.match(forAliasRE);
				el.for = inMatch[2].trim();
				el.alias = inMatch[1].trim();
			}
		}

		function processIf(el) {
			const exp = getAndRemoveAttr(el, 'v-if');
			if (exp) {
				el.if = exp;
				if (!el.ifConditions) {
					el.ifConditions = [];
				}
				el.ifConditions.push({
					exp: exp,
					block: el
				})
			}
		}
 ```

 - optimize 
> 优化。 给静态节点加上static 属性，那么在patch时bianhui9跳过这些标记的节点的比对
```
//optimize后的结果
{
	attrsMap: {
		':class': 'c',
		'class':'demo',
		'v-if': 'isShow'
	},
	classBinding:'c',
	'if': 'isShow',
	ifConditions: [
		'exp': 'isShow'
	],
	staticClass:'demo',
	'tag':'div',
	//静态标志
	static: false,
	children: [
		{
			attrsMap: {
				'v-for':"item in sz"
			},
			static : false,
			alias: 'item',
			for: 'sz',
			forProcessed: true,
			tag: 'span',
			children: [
				{
					expression: '_s(item)',
					text: '{{item}}',
					static: false
				}
			]
		}
	]
}

// isStatic
// 判断是否为静态节点
function isStatic(node) {
	if (node.type === 2) {
		return false;
	}
	if (node.type === 3) {
		return true;
	}
	return (!node.if && !node.for)
}

//markStatic 
//为所有节点标记上static ，遍历所有节点通过isStatic标记
function markStatic (node) {
	node.static = isStatic(node);
	if (node.type === 1) {
		for(let i =0, l = node.children.length; i< l; i++) {
			const child = node.chilren[i];
			markStatic(child);
			if (!child.static) {
				node.static = false;
			}
		}
	}
}

//markStaticRoots
//标记staticRoot, 如果当前节点是静态节点，同时并不是只有一个文本左右子节点
function markStaticRoots(node) {
	if (node.type === 1) {
		if (node.static && node.children.length && !(
			node.children.length === 1 &&
			node.children[0].type ===3
		)) {
			node.staticRoot = true;
		} else {
			node.staticRoot = false;
		}
	}
}

//最后的optimize
function optimize(rootAst) {
	markStatic(rootAst);
	markStaticRoot(rootAst);
}
```

-  generate
> 将AST 转换成render function 字符串, 最终得到render字符串以及staticRenderFns字符串
```
	//vue.js编译后的结果
	with(this) {
		return (isShow) ? 
		_c(   //createElement
			'div',
			{
				staticClass: 'demo',
				class: c
			},
			_l(
				(sz),
				function (item) {
					return _c('span', [_v(_s(item))])
				}
			)
		)
		: _e()
	}

	//第一层div节点
	render() {
		return isShow ? (new Vnode('div', {
			'staticClass' : 'demo',
			class : c
		}, [/*子节点*/])) : createEmptyNode();
	}

	//在children中加上第二层span及其子文本节点
	// 渲染v-for列表
	function renderList(val, render) {
		let ret = new Array(val.length);
		for( let i =0, l = val.length; i< l; i++ ) {
			ret[i] = render(val[i], i);
		}
	}
	render() {
		return isShow ? (new VNode('div', {
			'staticClass': 'demo',
			class: c
		},
			renderList(sz, (item) => {
				return new Vnode('span', {}, [
					createTextVNode()
				])
			})
		)) : createEmptyVNode();
	}

	//genIf

	function genIf(el) {
		el.ifProcessed = true;
		if (!el.ifConditions.length) {
			return '_e()';
		}
		return `(${el.ifConditions[0].exp}) ? ${genElement(el.ifConditions[0].block)}: _e()`
	}

	//genFor 

	function genFor(el) {
		el.forProcessed = true;

		const exp = el.for;
		const alias = el.alias;
		const interator1 = el.iterator1 ? `,${el.iterator1}` : '';
		const interator2 = el.iterator2 ? `,${el.iterator2}` : '';

		return `_l((${exp})),` + 
					`function(${alias}${iterator1}${iterator2})` + 
					`return ${genElement(el)}` +
					'})'
	}

	//genText
	function genText() {
		return `_v(${el.expression})`
	}

	//genElement
	//处理节点的函数， 依赖于genChildren, genNode
	//genElement 会根据当前节点是否有if或者for标记然后判断是否要用genIf 或者genFor处理。
	//不然会通过genChildrenm处理子节点,同时得到staticClass, class等属性
	// genChildren: 遍历所有子节点， 通过genNode 处理后将"," 隔开凭借城字符串
	//genNode根据type来判断节点是用文本节点genText还是标签节点genElement来处理

	function genNode(el) {
		if (el.type === 1) {
			return genElement(el);
		} else {
			return genText(el);
		}
	}

	function genChildren(el) {
		const children = el.children;
		if (children && chilren.length > 0) {
			return `${children.map(genNode).join(',')}`;
		}
	}

	function genElement(el) {
		if (el.if && !el.ifProcessed) {
			return genIf(el);
		} else if (el.for && !el.forProcessed) {
			return genFor(el);
		} else {
			const children = genChildren(el);
			let code;
			code = `_c('${el.tag},'{
				staticClass: ${el.attrsMap && el.attrsMap[':calss']},
				class: ${el.attrsMap && el.attrsMap['class]},
			}${
				children ? `,${children}` : ''
			}
			})`

			return code;
		}
	}



	

	//generate 
	//将整个AST传入后判断是否为空,为空则人会div标签
	function generate(rootAst) {
		const code = rootAst ? genElement(rootAst) : '_c("div")';
		return {
			render: `with(this){return ${code}}`
		}
	}

```

 
 