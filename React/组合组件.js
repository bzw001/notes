/// 模式 = 问题场景 + 解决办法
/***
 * 应用组合组件往往是共享组件库，将一些常用的功能封装在组件例，让应用层直接使用即可
 * 在antd和bootStrap共享库中，都有使用到这种关联成双组件
 * 当组件不需要重用时，不一定需要这个模式，因为其会导致代码复杂些
 */

/// 实现Tab 元件, 需要Tabs容器与TabItem单独Tab

/// 常规:
<TabItem active={true} onClick={this.onClick}></TabItem>
<TabItem active={false} onClick={this.onClick}></TabItem>
<TabItem active={false} onClick={this.onClick}></TabItem>
<TabItem active={false} onClick={this.onClick}></TabItem>

/**
 * 存在的问题:
 * 1、 需要给TabItem 传递一堆 porps 
 * 2、 增加新的TabItem ，需要增加对应的props，还需要修改Tabs的JSX代码
 */

 /// 最好最后的实现是这样
 /// Tabs 与TabItem 不通过表面的props传递也能达到某种联系 - > 组合组件
 <Tabs>
   <TabItem>1</TabItem>
   <TabItem>2</TabItem>
   <TabItem>3</TabItem>
 </Tabs>

/// 
const TabItem = (props) => {
  const  { active, onClick } = props;
  const tabStyle = {
    'max-width': '150px',
    color:active ? 'red' : 'green',
    border: active ? '1px red solid' : 'opx',
  }

  return (
    <h1 style={tabStyle} onClick={onClick}>
      {props.children}
    </h1>
  )
 }
/// 如何悄无声息的将props传递给children呢？
/**
 * 如果Tabs不去渲染children, 而是将children拷贝一份，就有机会去篡改这份拷贝
 * 然后渲染这份拷贝就行
 * 使用React.Children.map 遍历children中的所有元素
 * React.cloneElement 复制某个元素，第一个参数是被复制的元素，第二个参数可以产生元素的props
 */

 class Tabs extends React.Component {
   state = {
     activeIndex: 0
   }
   
   render() {
     const newChildren = React.Children.map(this.props.children, (child,index) => {
       if (child.type) {
         return React.cloneElement(child, {
           active: this.state.activeIndex === index,
           onClick: () => this.setState({activeIndex: index})
         })
       } else {
         return child;
       }
     });

     return (
       <Fragment>
         {newChildren}
       </Fragment>
     )
   }
 }