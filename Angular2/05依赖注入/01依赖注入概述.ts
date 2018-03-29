//依赖注入能够在应用时替换依赖对象，而不是编译时
/**
 * 1、如何在组件，服务，模块注入服务
 * 2、层级注入
 * 3、注入到派生组件
 * 4、限定方式的依赖注入
 * 5、四种Provider注册形式
 */
//依赖注入的使用，利于各个组件的解耦，代码易于维护，提升开发效率。

/**
 * 依赖注入的三个概念：
 * 1、注入器（Injector）：用户创建依赖对象实例
 * 2、Provider:配置注入器
 * 3、依赖（Dependence）：指定被依赖对象的类型
 */

 //1、如何在组件中注入服务
 /**
  * 1、import导入被依赖对象的服务
    2、组件中配置注入器
    3、组件的构造函数声明需要注入的依赖
    其子组件都可以使用这个服务
  */
  

  //1、导入
  import {sharData} from 'sharData.ser';
import { shardData } from '../project/ng2test/src/app/services/shardData.ser';
  @Component({
      moduleOd:module.id,
      selector:'test-comp',
      //2、配置注入器
      providers:[sharData],
      templateUrl:'',
      styleUrls:[]
  })
  export class testComponent{
      //3、组件构造函数声明使用
      constructor(
          _shardData:shardData
      ){}
  }
  //每一个组件都有自己的注入器，但是一旦从provider中注明引入，那么就会产生一个新的服务的实例



  //如何在服务中注入服务
  //示例：
  import {Injetable} from '@angular/core';

  @Injectable()
  export class LoggerService{
      log(message:string){
          console.log(message)
      }
  }
//在服务中引入上一个日志服务
import {Injectable} from '@anuglar/core';
import {LoggerService} from 'logger.ser';

@injectable()
export class ContactService{
    //在构造函数中引入被注入的服务
    constructor(_logger:LoggerService){};
    getConllections(){
        this._logger.log("hello");
    }
}
//引入的步骤一样：导入，在构造函数引入


//如何在模块中注入服务
//模块下的组件都会共用这一个服务实例
//在app启动的NgModule里注册的服务默认在整个程序内可使用
//使用：直接在元数据providers注入即可
/**
 * 多模块引入相同服务注意点：
 * 1、在根模块中引入的模块，模块内部如果使用相同的服务，那么以后面模块为准
 * 2、如果是一个模块引入另一个模块，两个模块都引入相同的服务，那么以上级模块为准。
 * 因为angular是没有模块作用域这一概念的。
 */

 /**
  * 服务可以放在根模块，子模块，组件，服务里，这个根据不同的应用场景下进行区分。对于延迟加载的模块，如果需要调用组件内服务，其服务最好放在根模块里。
  */

  //服务实例的查找路径：先从本地组件找，然后父组件，最后到模块。如果都找不到就报错。可以现在依赖注入控制的查找范围

  //派生组件以及派生组件中的服务引入
  
  //组件的实质是一个类。一个组件类继承另一个组件类形成派生组件。
  //派生组件需要调用在构造函数中调用super来标明其跟父类使用同一个服务

  export class Test2 extends Test {
      constructor(protected _service:service){
          super(_service);
      }
  }

  //如何使用限定方式依赖注入
  //加入注入了依赖服务的模块代码别移除，就会影响服务的调用。 @Optional和@Host装饰器能解决上面的问题
  /**
   * @Optional :兼容依赖不存在的情况
   * @Host:限定查找规则,明确实例初始化的位置
   */

   import {Optional} from '@angular/core';
   import {LoggerService} from 'service';

   //..
  constructor(@Optional() provate _logger:LoggerService){
        if(this._logger) this.logger.info();
  }
   //..

   //宿主组件：一个组件注入依赖想，那么这个组件就是这些依赖的宿主组件，但是如果这个组件被ng-content被嵌入到另外一个组件，那么这个父组件才是宿主组件
   //加入@Host将限定只能在当前组件查找依赖
   export class tesr3{ //如果组件被ng-content嵌入到另一个组件，那么那个组件是宿主组件，会从宿主组件查找
       constructor(@Host _logger:LoggerService){}
   }
   