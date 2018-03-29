//服务用于帮助开发者书写可重用的公共功能
/**
 * angular服务的一般作用：
 * 1、包装公共代码
 * 2、抽取组件业务逻辑
 * 3、组件间共享数据
 */

 //如何建立一个服务
 /**
  * 1、引入装饰器Injectable装饰器
    2、修饰输出类
  */
  //例：业务逻辑封装
  import {Injectable} from '@angular/core';

  @Injectable()
  export class ContactService{
      //从服务器获取联系人信息
      getContactsData(){
          //..
      }
      //更新联系人信息到服务器
      updateContacts(contact:Contact){
          //..
      }
  }

  //如何在组件中使用
  //如果在模块里注入了服务，那么组件只要直接引入使用即可，不需要在修饰的provider元数据显式声明使用
  import {Component,OnInit ,Input} from '@angular/core';
  import {contactService} from 'contact.ser';

  @Component({
      selector:'test',
      templateUrl:'',
      styleUrls:[]
  })
  export class Test implements OnInit{
        constructor(private _constantService:contactService){
            
        };
  }

  //共享数据服务，方式同上。
  //如果父级组件元数据provider显式声明了服务，那么子组件如果再显式声明，那么会得到两个不同实例。或者可以直接在模块声明即可。