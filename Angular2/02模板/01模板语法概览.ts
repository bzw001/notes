//模板的意义在于它是自定义的标准化页面，能够实现页面与数据的结合。有一些标签如script标签是不可以在模板中使用的（防止注入攻击）
/**
 * 名称       作用              语法                  实例
 * 插值      单向绑定       {{表达式}}         <p>{{dev.detail}}</p>
 * 属性绑定  将模板表达式的值绑定到元素属性   [元素属性]="模板表达式" 或者bind-dom元素属性="模板表达式"    <div [title]="name"></div>
 * HTML标签特性绑定    模板表达式返回值绑定到元素特性上   <td [attr=colspan]="{{1+2}}"></td>
 * 绑定class类  动态添加类名     <div [class.isblue]="isBlue"></div>  要绑定的是isblue这个css类
 * style样式绑定      动态添加具体样式          <button [style.color]="isRed?'red':'green'"></button>
 * 绑定事件    元素绑定事件           <a (click)="aClickCallback()"></a>,可加参数$event
 * 双向绑定   组件与模板数据双向绑定      <div [(title)]="name">
 * 模板局部变量   实现组件间的数据流动    <input ##name name="name" id="name">
 * 管道操作    输入数据|管道名：管道参数
 * 模板表达式操作符?.  如果前面值为undefined，后面表达式会被忽略，不会引发异常   <p>{{detail?.telNum}}</p>
 * 星号前缀   简化对结构指令的使用        <p *myUnless="boolValue"></p>
 */
