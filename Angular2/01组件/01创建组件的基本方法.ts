/**
 * 创建组件的三种步骤
 * 1、从@angular/core中引入Component装饰器
 * 2、建立一个类，使用@component修饰它
 * 3、@component中，设置selector自定义标签与template模板
 *
 * 先修饰，后定义组件逻辑
 */

//从angularjs角度来看，组件可以看做指令
import {Component} from '@angular/core';

@component({    //这个装饰器可以当作是组件封装的语法糖
    //下面是组件元数据
    selector:'contact-item',   //在html中使用<contact-item></contact-item>
    template:`
            <div>
            <p>张三</p>
            <p>123</p>
            </div>
    `,
    styles:[
        `
            li:last-child{
                border-bottom:none;
            }
        `
    ]
})

export class ContactItemComponent{}

//组件元数据说明
/**
 * selector:组件标签名
 * template:宿主元素模板   每个组件只能指定一个模板
 * templateUrl:外联模板
 * styles:内联样式    优先级没有styleUrls高，同时这里的样式是专属于组件的
 * styleUrls：指定外联样式  ，可指定多个
 * （如果是使用webpack指定less,则:styles:[require('app/list/item.component.less')]）
 */


//关于模板的说明
/**
 * 渲染组件内容的那个dom即宿主元素
 */
//组件与宿主元素交互的形式
/**
 * 显示数据，双向数据绑定，监听宿主元素事件以及调用组件的方法
 */

//单纯显示数据  ,单纯使用插值 {{}}

@component({
    selector:'contact-item',
    //这里的name是组件类成员变量
    template:`
            <div>
            <p>{{name}}</p>
            <p>123</p>
            </div>
    `,
})

//数据双向绑定    语法:[(ngModel)]="property"
@component({
    selector:'contact-item',
    //input改变同步到name属性，同时同步到p标签上
    template:`
            <div>
            <input type="text" value="{{name}}" [(ngModel)]="name">
            <p>{{name}}</p>
            <p>123</p>
            </div>
    `,
})

export class ContactItemComponent{
    name:string='张三';
}


//监听宿主元素事件以及组件的方法调用
// ()是事件绑定语法糖

@component({
    selector:'contact-item',
    template:`
            <div>
            <input type="text" value="{{name}}" [(ngModel)]="name">
            <p>{{name}}</p>
            <p (click)="addContact()">123</p>
            </div>
    `,
})

//其它元数据
/**
 * queries:设置需要注入到组件的查询
 * 组件中的查询包括视图查询与内容查询:
 * 视图查询可以通过@ViewChild/@ViewChildren,对于一些dom操作，可以通过视图查询的方式，这样利于浏览器解耦与降低单元测试复杂度
 * 内容查询可以获取不在组件模板里定义的元素，其需要结合ng-content使用
 *
 * animation:便捷的动画定义方法
 * 先引入动画函数，定义后使用@triggerName触发
 * */
import {Component,trigger,state,style,transition,animate} from '@angular/core';
@Component({
    template:`
        <div>
            <button [@buttonStatus="status"] click="toggleStatus()"></button>
        </div>
    `,
   animations:[
       trigger('buttonStatus',[
           state('on',style({
               color:'red',
               transform:'scale(1.2)'
           })),
           state('off',style({
               color:'yellow',
               transform:'scale(1)'
           }))
       ]),
       transition('off=>on',animate('100ms ease-in')),
       transition('on=>off',animate('100ms ease-out'))
   ]
})

export class AnimationsExampleComponent{
    status:string='on';
    toggleStatus(){
        this.status=(this.status==='on')?'off':'on';
    }
}
/**
 * Encapsulation
 * 用于视图包装，可以隔离组件样式，组件间的样式更加独立而不影响，组件复用更加简单
 * 元数据encapsulation可以被设为三个值：
 * ViewEncapsulation.None: 无ShadowDom，无样式包装，样式会放到document的head里面，组件样式可被覆盖
 * ViewEncapsulation.Emulated: 无ShadowDom，通过Angular提供的样式包装机制使组件样式不受外部影响，这是默认设置
 * 默认样式包装机制的方法是为组件的Dom添加一个独一的属性，然后这个属性用于css的dom选择
 * ViewEncapsulation.Native:使用原生的ShadowDom特性，组件以浏览器支持的ShaDom形式的渲染
 */
let showDom=`
    <body>
        <hello>
            #shadow-root
            | <style>
            |    .hello{
            |        background: green;
            |    }
            | </style>
            | <h1>hello</h1>
        </hello>
    </body>
`


