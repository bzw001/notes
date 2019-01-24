/**
 * render props
 * 让React组件的props支持函数这种模式，作为props传入的函数往往被用来渲染一部分界面
 * 1、以函数为子组件的方式
 * 2、其他/多个props作为函数
 */

/// 简单的render props组件 
const RenderAll = (props) => {
  return (
    <React.Fragment>
      {props.children(props)}
    </React.Fragment>
  )
}
<RenderAll>
  {() => <h1>hello world</h1>}
</RenderAll>

/// 与高阶组件一样，render props可以左很多定制功能
/// 以登陆状态显示界面元素为例
const Login = (props) => {
  const userName = getUserName();

  if (userName) {
    const allProps = { userName, ...props };
    return (
      <React.Fragment>
        {props.children(allProps)}
      </React.Fragment>
    )
  }
}

<Login>
  {({ userName }) => <h1>hello {userName}</h1>}
</Login>

// 其他非children props作为函数
/// 定制用户没有登陆时显示的东西，如Auth

const Auth = (props) => {
  const userName = getUserName();

  if (userName) {
    const allProps = { userName, ...props };
    return (
      <React.Fragment>
        {props.login(allProps)}
      </React.Fragment>
    )
  } else {
    <React.Fragment>
      {props.nologin(props)}
    </React.Fragment>
  }
}

<Auth>
  login={({ userName }) => <h1>hello {userName}</h1>}
  nologin={() => <h1>please login</h1>}
</Auth>

/**
 * 依赖注入 , render props 是React中的"依赖注入":
 * 逻辑A（Login）依赖于B(userName)，如果需要将A通用，那么将逻辑B以函数props的形式传给A
 * 只要函数接口达成一致
 */

 /// render props 与高阶组件
 /**
  * render props 定义函数props比高阶组件更加方便，如果高阶组件中参数组件中如果不接受某些props
  * 作为参数，那么需要给原来组件包一层组件来传值。
  */

  /**
   * 重用React组件的逻辑时:
   *  抽象为简单组件-> render props模式 -> 高阶组件模式
   */