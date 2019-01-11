/**
 * 高阶组件必须要是一个纯函数
 * 高阶组件会把传给自己的props给构建时的参数组件
 * 高阶组件会返回一个新的组件，其包含参数组件
 */

// 高阶组件一般使用with前缀命名
const withDoNothing = (component) => {
  const newComponent = (props) => {
    return <Component {...props} />
  };
  return newComponent;
}

/****常见用途****/

// 1、抽取共同逻辑

/// 登陆状态

const LogoutButton = () => {
  if (getUserId()) {
    return ;// 显示退出登陆的JSX
  } else {
    return null;
  }
}

/// 购物车代码
const ShoppintCart = () => {
  if (getUserId()) {
    return ;// 显示购物车的JSX
  } else {
    return null;
  }
}

/// 抽象成高阶组件
const withLogin = (Component) => {
  const NewComponent = (props) => {
    if(getUserId()) {
      return <Component {...props} />;
    } else {
      return null;
    }
  }
  return newComponent;
}

/// 新的LogoutButton 与购物车
const LogoutButton = withLogin(props) => {
  return ;// 显示退出登陆的JSX
}

// 2、多个组件作为参数传入，可以根据状态控制渲染合适的组件

// 3、链式调用给组件赋予多个能力。单个/多个组件需要被多个高阶组件包装

const X1 = withOne(X);
const X2 = withTwo(X1);
const X3 = withThree(X2);
const SuperX = x3;
// const SuperX = withThree(withTwo(withOne(x)))

/// 也可以使用compose 
const hoc = compose(withThree,withTwo, withOne);
const superX = hoc(X);

/// compose 实现
function compose(...funcs) {
  if(funcs,length ===0 ){
    return arg => arg;
  }
  if(funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a,b) => (...args) => a(b(...args)));
}

// 不足: 当React渲染出错时，往往需要组件的displayName静态属性来判别出错的组件，那么就需要在高阶组件中说明
// 同时嵌套层次很深，报错将会看到很深的stack trace
// 避免在渲染组件时，高阶组件重复产生新的组件，如

const Example = () => {
  const EnhancedFoo = withExample(Foo);
  return <EnhancedFoo />;
}

/// 应该
const EnhancedFoo1 = withWExample(Foo);
const Example1 = () => {
  return <EnhancedFoo1 />
}
