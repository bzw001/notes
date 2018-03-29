//模块包含组件，指令，路由，服务

//模块的构成
//app.module.ts
import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ContactComponent} from './contact.component'

@NgModule({
    imports:[BrowserModule],  //引入依赖模块或路由
    declarations:[ContactComponent],  //指定这个模块的视图类
    bootstrap:[ContactComponent],
    //providers://依赖的服务
    //exports://导出视图类  ,当该模块被引入到外部模块时，可以指定可以使用的视图类
})

export class AppModule{}


//视图类的引入
//使用declarations可以将指令，组件，管道等视图类引入模块，从而当前模块或其子模块的组件等都可以使用这个视图类的相关东西
NgModule({
    //如果ListComponent组件使用HeaderComponent等组件的内容，那么就要在模块中引入，这样划分清晰，耦合性低
   declarations:[
       HeaderComponent,
       FooterComponent,
       ListComponent
   ]
})


//模块间的视图类（如组件）如何引用
//a模块声明导出的视图类，b模块导入a模块，并声明导入a模块，则在b模块的组件就可以使用a模块的组件了
//a.module.ts
@NgModule({
    declarations:[aComponent],
    exports:[aComponent]
})

//b.module.ts
import {aModule} from './a.module';
@NgModule({
    declarations:[bComponent],
    imports:[aModule]
})

//引入服务的方式
/**
 * 1、@NgModule的provides
 * 2、@Component 的providers
 */

