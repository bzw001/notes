//组件生命的各个阶段都有相应的钩子函数可调用，从创建，渲染，数据变动事件触发，再到组件被移除

//生命周期钩子的使用：
/**
 * 钩子的接口定义在@angular/core中，然后再组件类中使用。使用时一般命名:ng+接口名
 */
/**
 * 组件常用的生命周期钩子方法，按调用顺序排列
 * ngOnChanges                                 //组件输入值变化触发
 * ngOnInit                                    //第一次ngOnChanges之后调用，可用于数据绑定输入属性之后初始化组件，经常在组件中使用ngOnInit获取数据
 * ngDoCheck                                   //每次变化监测时都会调用（每一个变化监测周期内）,监测的粒度比ngOnChanges小，用于特殊情况
 * ngAfterContentInit                          //ng-content将外部内容嵌入到组件视图后调用，只执行一次
 * ngAfterContentChecked                       //组件ng-content自定义内容，外部内容嵌入到组件视图后，或者每次变化检测的时候调用
 * ngAfterViewInit                             //angular创建了组件的视图或者在其子视图之后被调用
 * ngAfterViewChecked                           //创建了组件的视图或者在其子视图之后被调用一次，然后子组件变化监测时会被调用
 * ngOnDestroy                                  //销毁组件/指令之前触发。那些不会被自动回收的资源如:已订阅的观察者事件，绑定过的DOM事件，设置的定时器。都需要在ngOnDestroy手动销毁掉
 * 有些组件还提供自己特有的钩子，如路由自己的钩子
 */
