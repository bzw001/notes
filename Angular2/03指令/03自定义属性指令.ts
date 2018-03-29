//1、如何创建一个指令
/**
 * a、首先需要有一个控制器类，该类使用@Directive装饰。该装饰制定选择器。控制类实现控制行为
 */
//例:
import {Directive,ElementRef} from '@angular/core';

@Directive({
    selector:'[yellowBg]' //表示使用了yellowBg属性的元素
})
export class YelloWBg{
    constructor(el:ElementRef){
            el.nativeElement.style.backgroundColor='yellow';
    }
}
//每一个匹配到的DOM元素都会创建一个实例，使用ElementRef的nativeElement属性可以直接访问DOM元素
//解析到属性-》创建指令类的实例->元素的引入传入到构造函数-》设置样式

//为指令绑定输入
//需要使用@Input装饰器
export class YellowBg{
    @Input()//不使用别名直接在元素中使用
    backgroundColor:string;
}
let test=`
    <div [yellowBg] [backgroundColor]="color"><>
`;

//响应用户操作
//通过@Hostlistener装饰器来修饰dom事件。是的dom事件与指令关联
@HostListener('click')
onClick{
    this.setStyle(this.backgroundColor||this._defaultColor);
}