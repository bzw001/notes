//组件数据的流入流出是根据输入与输出语法来处理的
/**
 * 1、类中使用@Input ,@Output
 * 2、修饰符中使用inputs与outputs属性,其值为字符串数组
 * 相应的属性需要时组件类的成员变量
 */

//item.component.ts
export class ItemComponent implements OnInit{
    @Input() contact:any={};
    @Output() routerNavigate=new EventEmitter<number>();
}
//在父级组件中使用
//list.component.html
/*
* <li *ngFor="let contact of contacts">
*     <list-item [contact]="contact" (routeNavigate)="routerNavigator($event)"></list-item>
*</li>
* */

//第二种写法
@Component({
    //..
    inputs:['contact'],
    outputs:['routerNavigate']
})

//父组件通过子组件的输入属性流入数据，子组件可以接受或拦截


//可以通过setter与getter处理与返回输入值
//listItem.component.ts
@Component({
  selector:'list-item',
    template:`
        <div>
            <span>{{contactObj.name}}</span>
            <span>{{contactObj.telNum}}</span>
        </div>
    `
})

export class ListItemComponent implements OnInit{
    _contact:object={};
    @input()
    //set与get相当于在组件类的原型对象上设置了一个contactObj属性，在组件使用的是contactObj
    set contactObj(contact:object){  //处理输入的数据
        this._contact.name=(contact.name&&contact.name.trim())||'no name set';
        this._contact.telNum=contact.telNum||'000-000';
    }
    get contactObj(){return this._contact;} //返回输入的数据
}



//ngOnChanges监听数据变化
//父组件的数据可以在子组件中记录变化并处理，当然其在自身也是可以用的
//ngOnChanges用于及时响应angular在属性绑定中发生的数据变化。这个方法接受一个对象参数，包含当前值与变化值
//detail.component.ts
import {Component} from '@angular/core';

@Component({
    selector:'detail',
    //change-log组件打印出数据的变化
    template:`
        <a class="edit" (click)="editContact()">编辑</a>
        <change-log [contact]="detail"></change-log>
    `
})
export class DetailComponenet implements OnInit{
    detail:any={};
    editContact(){
        //...
        this.detail=data;//修改后的数据
    }
}

//changelog.component.ts
import { Component,Input,OnChanges,SimpleChanges} from '@angular/core';

@Component({
    selector:'change-log',
    template:`
        <h4></h4>
        <ul>
            <li *ngFor="let change of changes">{{change}}</li>
        </ul>
    `
})
export class ChangeLogComponent implements OnChanges{
    @Input() contact :any={};
    changes:string[]=[];
    ngOnchanges(changes:{[propKey:string]:SimpleChanges}){
        let log:string[]=[];
        for(let propName in changes){
            let changedProp=changes[propName],
                from=JSON.stringify(changedProp.previousValue),
                to=JSON.stringify(changedProp.currentValue);
            log.push(`${propName} changed from ${from} to ${to}`);
        }
        this.changes.push(log.join(','));
    }
}


//子组件如何向父组件传递数据

//使用事件传递的方式，子组件通过EventEmitter自定义事件，父组件然后订阅(以普通的事件订阅方式),中间的数据媒介是组件@output属性
//例:子组件点击收藏，父组件完成收藏的操作
//父组件CollectionComponent.ts

import {Component} from "@angular/core";

@Component({
    selector:'collection',
    //使用组件contact-collect
    template:`
        <contact-collect [contact]="detail" (onCollect)="collectTheContact($event)"></contact-collect>
    `
})

export class CollectionComponent implements Onint{
    detail:any={};
    //收藏操作处理逻辑
    collectTheContact(){
        this.detail.collection==0?this.detail.collection=1:this.detail.collection=0;
    }
}

//子组件contactCollection.component.ts
import { Component ,EventEmitter,Input,Output } from '@angular/core';

@Component({
    selector:'contact-collect',
    template:`
       <i [ngClass]="{collectd:contact.collection}" (cilck)="collectTheContact()">收藏</i>
    `
})
export class ContactCollecComponent{
    @Input() contact:any={};
    @Output() onCollect=new EventEmitter<boolean>();//声明事件绑定的输出特性，相当于注册一个事件
    collectTheContact(){
        this.onCollect.emit();
    }
}

//使用#号声明局部变量来获取子组件实例，从而访问它的公共成员
//注意这种方式只能在组件模板里使用
//父组件
//...
@Component({
    selector:'collection',
    //collect是当前其所在组件的实例的引用，可以直接在父组件中使用子组件的方法，子组件不需要设置
    template:`
        <contact-collect (click)="collect.collectTheContact()" #collect></contact-collect>
    `
})
//...
//子组件
export class ContactCollectComponent{
    detail:any={};
    collectTheContact(){
        this.detail.collection==0?this.detail.collection=1:this.detail.collection=0;
    }
}

//通过@ViewChild在父组件类中直接使用组件类的数据
/**
 * @ViewChild是装饰器，需要引入
 * 1、参数为类，那么父组件将可以绑定一个指令或者子组件实例
 * 2、参数为字符串，那么相当于在父组件中绑定一个模板局部变量
 */

import {Component,AfterViewInit,ViewChild} from '@anuglar/core';
import {ContactCollecComponent} from './ContactCollecComponent.ts'
//...
export class CollectionComponent{
    @ViewChild(ContactCollecComponent) contactCollect:ContactCollecComponent;
    ngAfterViewInit(){
        //...
    }
    //便可以直接使用子组件的方法
    collectTheContact(){
        this.contactCollect.collectTheContact();
    }
}

/**
 * 综上，父组件向子组件交互数据的基本方式有5种：使用@input,@output属性修饰，set与get设置拦截与读取,ngOnChanges监听数据变化，模板局部变量,@ViewChild修饰器
 */
