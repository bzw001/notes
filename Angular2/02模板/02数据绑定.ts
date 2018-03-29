//数据半丁能更加简单快捷给html里面取值与赋值，易于数据的管理与显示
//Angular下有三种不同数据流动方向的数据绑定方式
/**
 *1、属性绑定，只从数据源到视图
 *   插值Dom元素属性    <p>{{detail.name}}</p>
 *   绑定HTML标签特性   <div [title]="name">he</div>
 *   绑定              <div [style.color]="color"></div>
 *
 *2、事件绑定   视图到数据源
 *   (click)="click()"
 *   on-click="click()"
 *
 *3、双向绑定
 *   <div [(title)]="name"></div>
 *   <div bindon-title="name"></div>
 *
 *以上语法结构，"="左侧为目标名称，右侧为绑定目标，绑定目标可以被[],()包裹，或者加前缀（bind-,on-,bindon-）
 */

//DOM对象属性property与HTML标签特性Attribute的区别
/**
 * property以Dom元素为对象，是在文档对象模型定义的，如childNodes，其值为当前值，反应当前，包含的内容多
 * Attribute 是Dom节点自带的属性，是在HTML中定义的，如align，其值代表初始值，不会发生变化，包含的内容较少
 *
 * Angular的数据绑定是根据Dom对象属性property以及事件来运作，不是HTML标签特性
 */

//插值
/**
 * 插值表达式类似angularjs，其可以进行运算以及可以调用宿主组件的函数
 *
 *模板表达式注意：
 * 不建议使用:new,赋值，带有;,的链式表达式，自增与自减。
 * 模板表达式上下文一般是所在组件的实例，也可以包括组件之外的对象（如模板局部变量）
 * 模板表达式不能引用全局命名空间下的成员，如window，document
 *
 * 模板表达式优化建议:
 * 计算成本高时，考虑缓存
 * 尽量简单
 * 幂等性优先
 */


//属性绑定
//属性绑定在于设置目标元素的值,属性绑定时不能用来从目标元素获取值

//dom元素属性绑定
/**
 * 属性绑定是把元素的属性绑定到组件的属性上
 * 绑定的属性可以dom对象属性,也可以是自定义组件的输入属性
 * <div [title]="titleText">hello</div>
 * <div [ngStyle]="styles>
 * <user-detail [user]="currentUser"></user-detail>
 */

//中括号的作用
//中括号能够在angular执行"="右侧的模板表达式并将结果赋值给目标属性，不然属性值初始化将不会改变
// <user-detail detail="常量" [user]="currentUser"></user-detail>

//HTML标签特性绑定
//优先使用DOM元素属性绑定，对于纯粹是HTML标签特性的绑定才使用HTML标签绑定
/**
 * 语法略有不同，需要加attr.这个前缀
 * <table><tr><td [attr.colspan]="{{1+2}}"></td></tr></table>
 */


//CSS类绑定
/**
 * 元素的全部css类替换
 * <div [class]="divClass"></div>
 * 单独类的添加或移除
 * <div [class.color-blue]="isBlue"></div>
 */

//样式绑定
/**
 * html内联样式可以通过style样式绑定
 * 不带单位的绑定
 * <button [style.background-color]="isBlue?'blue':'red'"></button>
 * 带单位
 * <button [style.font-size.px]="isLarge?18:20"></button>
 */

//属性绑定与插值表达式的关系
/**
 * 插值表达式只是属性表达式的一种语法糖
 * <div>hello,<i>{{userName}}<i></div>
 * <div>hello,<i [innerHTML]="userName"><i></div>
 * 上面两种表达是一样的
 */

//事件绑定
//目标事件
/**
 * 目标事件包括常见的元素事件以及自定义指令事件
 *
 * $event  包含事件的相关信息
 * dom元素事件的$event是包含target与target.value属性的Dom事件对象
 * 自定义事件包括自定义事件触发的传值payload等
 */

//自定义事件
/**
 * 自定义事件的触发可以借助于EventListener。组件通过EventListener创建实例对象，通过输出属性暴露出来
 * 父组件可以绑定这个输出属性，然后调用EventListener.emit(payload)来触发自定义事件,payload可以传任意值，而且可通过$event访问
 */
//item,components,ts
import {Component.Input,Output,EventListener} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector:'list-item',
    templateUrl:'app/list/item.component.html',
    styleUrls:['app/list/item.component.css']
})

export class ListItemComponent{
    @Input() contact:any={};
    @Output() routerNavigate=new EventEmitter<number>();

    goDetail(num:number){
        this.routerNavigate.emit(num);
    }
}
//item.component.html
//<a (click)=goDedail(contact.id)></a>


//双向数据绑定
/**
 * 使用NgModel指令方便进行数据绑定，[(ngModel)]或者bindon-ngModel
 * []实现数据流从组件类到模板，()实现数据流从模板到组件类
 * [()]能设定一个数据绑定属性，但如果需要数据变化时增加一些额外的功能，则可以使用双向数据绑定的拆分版
 * <input [ngModel]="currentUser.phoneNumber" (ngModelChange)="addCodeForPhoneNumber($event)">
 */

//输入域输出属性补充
//<list-item [contact]="contact" (routerNavigate)="routerNavigate($event)">
/**
 * 绑定声明的左侧是数据绑定的目标，右侧部分是数据绑定的源
 * @Input与@Output可以设置别名，@Output(别名) 事件属性名=...,或者组件元数据声明： @Component({outputs:['clicks:go']})
 */
