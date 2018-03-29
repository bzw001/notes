//vue组件的特点
/**
 * 可插拔，独立作用域，观察者模式，完整的生命周期。
 */

 //组件的组成
 Vue.component('child',{
     props:['msg'],//父组件通过html特性传递过来的数据
     template:'<span>{{msg}}</span>',
     data:function(){
         return {
            title:'TEST'
         }
     },
     methods:{},
     ready:function(){},//在这里一般使用获取数据，实例化第三方组件，绑定事件等,v2已经用mounted替换
     beforeDestroy:function(){},//在这里一般销毁自定义实例，解绑自定义事件，定时器等
     events:{}
 });


 //怎么使用，一般由它的父级显示调用
 let test1=`
    <child :msg="msg1"></child>
    <child :msg.sync="msg2"></child>//这里会子组件的更改会影响父组件，双向的
 `;
new Vue({
    data:{
        msg1:'father的数据',
        msg2:'father的双向数据'
    }
});

//父子如何通信
/**
 * 1、事件，订阅-发布模式（$dispatch,$broadcast）vue1已经弃用
 * 2、Prop属性
 * 3、vuex (推荐)
 */


 //内容分发slot，用来复用组件（或者模板）