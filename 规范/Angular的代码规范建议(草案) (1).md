##### 一、命名
 + 1、文件命名确保涵盖文件类型与功能，并且能一定满足正则
   + a、文件以其功能英文驼峰命名
   + b、controller命名,功能.ctrl.js，如 prodIndex.ctrl.js
   + c、directive命名，功能.dct.js
   + d、factory或service命名,功能.fac.js或者功能.ser.js
   

 + 2、 文件夹按照功能进行分类
   + a、文件夹里包含的文件建议超过7个
   + b、在angular中文件夹中，组件文件可以放在一块
  ```
    例:
        app/
      app.module.js
      app.config.js
      directives/
          calendar.dct.js
          calendar.dct.html
      services/
          data.ser.js
      layout/
          topnav.html
          topnav.ctrl.js
      pages/
          home/
            home.ctrl.js
            home.html
             二级功能页/
               ...
      controller/  可复用的controller
          ...
      filter/      可复用的filter
          ...
  ```


#####  二、关于angular的模块化开发
  + 1、创建一个应用程序的根模块，负责将所有模块与功能集合到一起
  + 2、app module只放聚合其它模块的逻辑，具体功能在具体模块实现
  + 3、模块下包含功能，功能下再划分实现步骤（函数）
  + 4、主程序模块包含应用程序功能清单，功能模块需包含依赖那些模块的清单
  + 5、模块配置与运行：
  ```
     模块运行前加入配置:
     如:
       angular
            .module('app')
            .config(configure);
        
        configure..$inject=['$state','$stateProvider'];
        
        function configure($state,$stateProvider){
            ...
        }
        
     模块启动时需要运行的代码可以放在factory中生命，通过一个function暴露
     如:
        angular
            .module('app')
            .run(runBlock);
        runBlock.$inject=['translator'];
        
        function runBlcok(translator){
            translator.initialize();
        }
  ```

###### 三、贯彻单一职责
  + 1、一个文件值定义一个组件
  + 2、将将Angular组件包装到一个立即执行函数中，防止全局污染以及减少全局变量的数量
  + 3、独立子模块使用唯一命名
  + 4、使用module创建服务等，建议使用链式写法

###### 四、Controller

> controller作用是查看视图与收集视图的信息，它不应该关心如何取得数据，只需要知道哪里需要用到数据，将取数据的逻辑放大数据服务中能够让controller更加简单，专注于对view的控制

  + 1、使用controllerAs语法代替直接用经典的$scope的controller方式。在使用$emit，$broadcast,$on之类命令时使用￥scope。
  + 2、建议将可绑定的成员放在控制前顶部，其实现代码放在下方，便于代码阅读
  + 3、将大部分逻辑放置到service中
  + 4、一个controller服务一个视图
  + 5、一个controller需匹配一个view时或者会被重用时，controller连同router一起定义
 

###### 五、 services
  + 1、所有的service都是示例
  + 2、将service的可调用成员暴露于顶部
 ```
    (function(){
        'use strict';
        
        angular
            .module('blocks.logger')
            .factory('logger',logger);
        logger.$injec=['$log','toastr'];
        
        function logger($log ,toastr){
            var service={
                showToasts:true,
                error:error,
                info:info,
                success:success
            }
            
            return serivce;
            //下面是实现细节
            function error(message.data.title){
                ...
            }
        }
    })();
 ```
 
 
###### 六、 Data services
  + 1、独立的数据调用：将数据操作和数据交互的逻辑放到发出factory中，数据服务负责XHR请求，本地存储，内存储存于其他数据操作。理由：方便测试与单一职责
```
   angular
        .module('app.core')
        .factory('dataService',dataService);
    dataSerivce.$inject=['$http','logger'];
    
    function dataService($http,logger){
        return {
            getAvengers:getAvengers
        };
        
        function getAvnegers(){
            return $http.get('/api/aaa')
                        .then(getAvengerComplete)
                        .catch(getAvengerFailed);
            
            function getAvengerComplete(response){
                return response.data.results
            }
            
            function getAvengersFailed(error){
                logger.error('XHR failed for getAvengers'+error.data)
            }
        }
    }
```
+ 2、调用数据时返回一个promise
    
###### 七、directive

+ 1、同一类别的directive单独放置一个文件，及时只有一个指令
    
> 当directive被移除后，可以使用element.on('$destroy',...)或者scope.$on('$destroy',...)来执行一个clean-up函数
    

```
    calendarRange.directive.js
    
        angular
            .module('salse.order')
            .directive('acmeOrderCalendarRange',orderCalendarRange);
        function orderCalendarRange(){
            ...
        }
```


+ 2、在directive中操作DOM
> directive建议统一使用directive前缀，避免使用ng-
    directive倾向于作为一个元素使用或增强已存在的DOM元素，一般允许作为EA使用
    
```
    angular
        .module('app.widgets')
        .directive('myCalendarRange',myCalendarRange);
        
    function myCalenRange(){
        var  directive={
            link:link,
            templateUrl:'/template/a.html,
            restrict:'EA'
        }
    }
    
    function link(scope,element,attrs){
        ...
    }
```

###### 八、手动依赖注入
   + 1、使用$inject手动添加angular组件所需的依赖，可以避免压缩带来的麻烦以及易于代码阅读
```
    //unrecommended:
      angular
        .module('app')
        .controller('DashBoard',['$scope','$routerParams',function($scope,$routerParams){...}])
        
    
    //recommend:
        angular
            .module('app')
            .controller('DashBoard',DashBoard);
            
        DashBorad.$inject=['$routerParams'];
        
        function DashBorad($routerParams){
            this...
        }
```


+ 2、使用ng-annotate，用/**@ngInject*/对需要自动依赖注入的function进行注释，可以避免代码中依赖使用到不安全的写法
    
###### 九、路由

> 路由建议使用ui-router,可以使用routerHelperProvider配置跨文件状态

###### 十、filter

> filter针对不是很复杂的对象进行过滤，以保证性能

##### 十一、其它
 + 1、回调函数建议使用命名函数，而不是匿名函数，便于调试。