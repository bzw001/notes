//如何创建一个结构指令
/**
 * 引入@Directive装饰器
 * 添加css属性选择器，标识指令
 * 声明input绑定表达式
 * 添加TemplateRef(访问组件的模板)与ViewContainerRef(将模板内容插入到DOM中)可以用来渲染组件模板内容
 */

 import {Directive ,TemplateRef,与ViewContainerRef} from '@angular/core';
 @Directive({
     selector:['myUnless']
 })
 export class UnlessDirective{
     @Input('myUnless')
     set condition(newCondition:boolean){//set是属性拦截器
         if(!newCondition)this.ViewContainer.createEmbeddedView(this.templateRef);
         else this.viewContainer.clear()
     }

     constructor(){
         private templateRef:TmeplateRef<any>;
         private viewContainer:ViewContainerRef
     }
 }

 //扩展
 /**
  * 1、带星号前缀的指令会被替换成带有template标签的代码
  2、NgTemplateOutlet可以末班中创建内嵌视图
  3、NgPlural,NgPluralCase指令相当于NgSwitch，但是其支持范围匹配
  4、FormGroupName支持将已有表单组合到一个Dom元素
  5、FormArrayName当做FromGroupDirective指令使用。可以绑定表单数组
  */