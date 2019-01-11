/**
 * 多层组件嵌套的时候，单纯靠props进行通讯是不方便的
 * 
 * 提供者模式包括提供者与消费者两个角色，都是React组件
 *  提供者的信息无论隔了多少层，都可以被消费者直接访问到
 * React V16.3后提供React.createContext() API 创建
 */

 /**
  * 实现： 借助React的Context功能
  * Context 可以创建一个‘上下文’, 上下文中的所有组件都可以访问同样的数据
  */

  /// 实现样式主题切换， 顶层的提供者确定一个主题，下面的样式可以直接使用对应主题例的样式，当切换样式时，只需要修改提供者而已。
  /// React V16.3.0之后的提供者模式

  const ThemeContext = React.createContext();

  /// 两个角色， Provider 和Consumer

  const ThemeProvider = ThemeContext.Provider;
  const ThemeConsumer = ThemeContext.Consumer;

  ///  ThemeConsumer 其实时应用render props 模式的组件，要求子组件是一个函数
  ///  会将 "上下文"的数据作为参数传递给这个函数
  class Subject extends React.Component {
    render() {
      return (
        <ThemeConsumer>
          {
            (theme) => (
              <h1 style={{color: theme.mainColor}}>
                {this.props.children}
              </h1>
            )
          }
        </ThemeConsumer>
      )
    }
  }
/// 由于Subject没有自己的状态, 可以使用纯函数
const Paragraph = (props, context) => {
  return (
    <ThemeConsumer>
      {
        (theme) => (
          <p style={{color: theme.textColor}}>
            {props.children}
          </p>
        )
      }
    </ThemeConsumer>
  )
}

const Page = () => (
  <div>
    <Subject>这是标题</Subject>
    <Paragraph>正文</Paragraph>
  </div>
)

// 使用 Provider
<ThemeProvider value={{mainColor:'green', textColor:'red'}}>
  <page />
</ThemeProvider>