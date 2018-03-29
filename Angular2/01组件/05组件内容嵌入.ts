//组件内容嵌入能方便代码的复用
//内容嵌入用来创建可复用的组件，如模态对话框与导航栏
//需要使用ng-content

//产生一个动态组件
import {Component} from '@angular/core';

@Component({
    selector:'example-content',
    //ng-content中的select属性能够指定哪些dom元素被加进来,这里是指第一个header元素
    template:`
        <div>
            <h4>示例</h4>
            <div style="border:1px solid red;">
                <ng-content select="header"></ng-content>
            </div>
        </div>
    `
})

export class ExampleContentComponent{}

//在一个组件中使用这个动态组件
//被example-content包裹的dom元素会被结合放到ExampleContentComponent组件的dom结构，最终形成最终的dom树
@Component({
    selector:'container',
    template:`
        <example-content>
            <header >header content</header>
        </example-content>
    `
})
export class ContainerComponent{}

//ng-content的select属性的使用类似css选择器
//如,select=".class-select",select="[name=footer]"
