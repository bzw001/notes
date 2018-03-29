//Angular下的监测方式在于适当的时机去检测，不是定时轮询，它什么时候被驱动去监测，由NgZone服务负责

/**
 * 哪些场景会引起数据变化
 * 1、用户操作，如click,change,hover
 * 2、数据请求，如xhr,websocket
 * 3、定时任务
 * 上面三个场景都涉及异步操作
 * 如果在这些异步操作后，让angular启动监测，那么数据会得到及时更新
 */

//变动通知机制
/**
 * Angular本身设置捕获异步事件监测数据变动的机制，这个机制的实现是NgZone服务来实现的
 * NgZone是Zone的一个子Zone,拥有Angular的执行上下文，异步触发数据变化是，会被Zones捕获触发其自身的事件，事件绑定的函数会通知Angular执行变化监测
 * NgZone的runOutsideAngular()方法可以让angular不执行变化监测
 */

//变化监测的处理机制
/**
 * Angular应用是一颗组件树，每个组件都有自己的变化监测类的实例。从而形成一个变化监测树，会吃不惯根组件到子组件监测组件的变化，监测树的数据是从上到下单向流动，可以清晰知道从数据的变化由哪个组件引起。
 * 每一个组件的变化监测时独立的，可以控制是否监测以及暂停等，这样可以避免不必要的组件监听消耗，提升性能
 */

//变化监测类
/**
 *angular会在组件中创建变化监测类的实例，这个实例提供方法来手动管理变化监测，对一些业务场景下，手动控制能提高性能
 * 如列表数据变化频繁，先手动detach，再定时reattach,可以提升性能
 */
//变化监测类ChangeDetectorRef提供的接口主要:
class ChangeDetectorRef{
    //...
    markForCheck():void{}  // 标记根组件到该组件的路径，下次触发变化，必须检查这条路径
    detach():void{}        //该组件的变化监测器不再执行监测，除非reattach
    reattach():void{}      //将该组件重新执行变化监测
    detectChanges():void{} //手动触发执行该组件到各子组件的一次变化监测
}


//变化监测策略
/**
 * 可以使用Default默认深度遍历策略与OnPush检查输入属性（@Input修饰的变量）策略
 * 先导入ChangeDetectionStrategy,然后组件定义修饰符中使用changeDetection
 * 使用OnPush场景：组件的数据影响只来源于输入属性获取的值
 * 使用OnPush注意：如果监测的是个对象，那么只会监测地址的变化。如果对象内值发生变化是无法监测到的，这时需要Immutable对象
 */
import { Component} from '@angular/core';
import Immutable from 'immutable';

@Component({
   template:`
        <list-item [contact]="contactItem"></list-item>
        <button (click)="doUpdate()"></button>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class ListComponent{
    contactItem:any;
    constructor(){
        this.contactItem=Immutable.map({
            name:'张三',
            telNum:'1234'
        })
    }
    doUpdate(){
        this.contactItem=this.contactItem.set('telNum','1341');
    }
}

