//一个组件启动，需要有一个根模块

//需要启动的组件
//contact.component.ts
import { Component} from '@angular/core';
@Component({
    selector:'contact-item',
    template:'<div></div>'
})

export class ContactComponent {}

//通过@NgModule的bootstrap元数据指定ContactComponent组件
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

//最后使用platformBrowserDynamic().bootstrapModule()方法启动根模块，启动应用
//app.ts
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);