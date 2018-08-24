//provider能够实现逻辑或者数据操作的封装，以接口方式提供给调用方使用。在前后台都有使用
//对于angular来讲，provider说明了运行时的所需依赖，注入器根据它来创建服务对象的实例

//provider能够注册返回合适的服务对象,angular提供了4中provider的注册方式，可以应付大型复杂项目下不同场景

//1、类provider(useClass)
//场景：同一依赖，可以指定不同的实现
//例：render服务可以canvas渲染，dom渲染

var injector=Injector.resolveAndCreate([
    {provider:Render,useClass:DomRender}
    // {provider:Render,useClass:CanvasRender}
]);
//调用方
class AppComponent{
    constructor(_render:Render){
        _render.render();
    }
}


//2、值provider(useValue)
//场景：依赖的对象可以是常量，字符串等

let globalSetting={
    env:'production',
    getHost:()=>{return 'http://test.com.cn'}
}

@Component({
    selector:'test',
    template:`<div>test</div>`,
    providers:[
        {provide:'urlSetting',useValue:globalSetting},
        {provide:'Name',useValue:'HELLO'}
    ]
})
export class testComponent{
    constructor(){}
}


//3、别名provider（useExisting）
//场景：一个新服务需要替换一个旧服务，但是不想动旧服务存在的代码
providers:[
    {provide:NerService,useClass:NewLogger},
    {provide:OldService,useExisting:NewLogger} //这样原来的代码就不需要变更
]


//4、工厂provider（useFactory）
//场景：依赖对象是可以动态变化的。如根据用户的权限返回对应的服务
let contactServiceFactory=(
    _logger:LoggerService,
    _userService:UserService
)=>{
    return new contactServiceFactory(_logger,_userService.user.isAuthorized);
}
export let contactServiceProvider={
    provide:ContactService,
    useFactory:contactServiceFactory,//声明Provider是一个工厂函数
    deps:[
        LoggerService,
        UserService
    ]
};

//扩展


//如何在子组件获取父组件的实例？

//已知父组件的类型：在子组件构造函数使用ParentComponent来获取已知类型的父组件使用
//已知父组件：定义子组件的时候清楚其组件
export ChildComponent{
    name="子组件";
    constructor(public parent:ParentComponent){
    }
}

//未知父组件的类型。 一个组件可能是多个组件的子组件，定义子组件的时候，使用父组件实例，但是不清楚其父组件实例具体是哪个
//通过类一接口解决。父组件实现一个抽象类，子组件通过注入这个'抽象'可以获取到父组件实例

//定义Parent抽象类，只有name属性
export abstract class Parent{
    name:string ;
}
@Component({
    selector:'parent',
    template:`
    <div>
        <h3>{{name}}</h3>
        <child></child>
    </div>`,
    providers:[
        {
            provide:Parent,
            useExisting:ParentComponet
        }
    ]
})
export class ParentComponnet implements Parent{
    name="父组件";
}

//子组件中获取
export class ChildComponent{
    name="子组件";
    constructor(public:Parent){}//找到父组件实例
}