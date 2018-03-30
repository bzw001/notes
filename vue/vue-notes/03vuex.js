/**
 * vuex的作用在于应对组件间的复杂通信
 * 是一个全局实例
 */
/**
 * 适用场景：
 * state清晰声明需要会用的应用层状态基础数据
 * getter可以在state基础上进行数据加工
 * mutation-commit:能够简单的对state或者state的状态进行进行变更
 * action-dispatch:能够应付异步场景，比较复杂的应用场景，可以操作mutaion,action
 * module:当应用的组件通信庞杂时，可以进行模块划分，支持动态的注册与卸载
 * namespaced；可以在module进行再一次划分
 * plugin:在原始的store基础上可以进行功能的扩展。
 */
/**
 * 1、显式提交可以出发store状态的改变
 * 2、store的状态改变会引发相应组件的变化
 */

 const store =new Vue.Store({
     state:{
         count:0
     },
     mutations:{//提交
         increment(state){
             state.count++;
         }
     }
 })
 //在组件中的计算属性中返回store中的状态即可
const Count={
    template:`<div>{{count}}</div>`,
    computed:{
        count(){
            return store.state.count;
        }
    }
}
//根实例注册store选项后，store实例会注入到根组件的所有子组件中，可以通过this访问
 /**
  * 核心概念
  */

  /**
   * 1、state  数据驱动源
   * mapState函数：在computed统一设置多个sate状态
   * 对于一些局部的状态并不需要都用vuex来管理
   * 
   * 2、getter
   * 以state数据源为基础，进行进一步的处理。state的改变依然可直接影响getter的改变，getter在
   * 组件的用法同state
   */
  const store=new Vue.Store({
      state:{
          todos:[
            {id:1,text:'1',done:true},
            {id:1,text:'2',done:false}
          ]
      },
      getters:{
          doneTodos:state=>{
              return state.todos.filter(to=>todo.done);
          }
      } 
  })
  //getter可以接受其他getters作为第二个参数
  //直接在computed中使用
  computed :{
      doneTodosCount(){
          return this.$store.getters.doneTodosCount;
      }
  }
  //mapGetters辅助函数，类似state的mapState

  /**
   * mutation:唯一的状态提交方式
   * 每一个mutation都有一个事件类型与回调函数，这个回调默认接受state为第一个参数
   */
  const store2=new Vuex.Store({
      state:{
          count:1
      },
      mutations:{
          increment(state){//注册mutation
              state.count++;
          }
      }
  })
  store2.commit('increment');//显式提交
  //mutation的回调可以接受第二个参数,这个参数通过commit传进来
/**
 * 使用mutation的注意点：
 * 1、可以使用统一常量标明需要注册的mutation。
 * 2、在mutation的回调中不要使用异步代码
 * 3、在组件中可以使用mapMutations简明使用commit
 */

 /**
  * Action:也是提交，但是可以异步操作,因为它操作的是mutation
  */
  const store3=new Vuex.Store({
      state:{
          count:0
      },
      mutations:{
          increment(state){
              state.count++;
          }
      },
      actions:{
          increment(context){
              context.commit('increment');
          }
      }
  })
  //context.state与context.getters可以获得state与getters。但是它还可以操作module
//action如何在组件中触发？
//使用dispatch
store3.dispatch('increment');
//action里的异步操作
actions:{
    incrementAsync({commit}){
        setTimeout(()=>{
            commit('increment');
        });
    }
}
//action的回调一样支持dispatch传参

//使用action的异步与多重分发
actions:{
    checkout({commit,state},products){
        const sacvCartItems=[...state.cart.added];
        //结账请求
        commit(type.CHOUT_REQUES);
        shop.buyProducts(products,
        //成功操作
        ()=>commit(types.CHEKOUT_SUCCESS),
        //失败操作
        ()=>commit(types.CHEKOUT_FAILURE,savedCartItems)
        )
    }
}
//依然可以用mapActions来简化在组件中对actions的使用

//多重异步的使用
/**
 * 一个dispatch本身可以返回一个promise
 */
actions:{
    actionA({commit}){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                commit('someMutation');
                resolve();
            },1000)
    })
}}
store.dispatch('actionA').then(()=>{
    //actionA的setTimeout执行完后
})
//
//action中可以调用另一个action
actions:{
    actionB({dispatch,commit}){
        return dispatch('actionA').then(()=>{
            commit('Bmutation');
        })
    }
}
//如果使用async/await
actions:{
    async actionA({commit}){
        commit('getData',await getData());
    },
    async actionB({dispatch,commit}){
        await dispatch('actionA');
        commit('gotOtherData',await getOtherData());
    }
}



/**
 * module:拥有自身的state,mutaion,action,getter
 * module本身的出现就是将大型项目分解
 */

 const moduleA={
     state:{},
     getter:{},
     mutations:{},
     actions:{}
 }
 const moduleB={
    state:{},
    getter:{},
    mutations:{},
    actions:{}
}
const store=new Vue.Store({
    modules:{
        a:moduleA,
        b:moduleB
    }
})
store.state.a;//moduleA的状态
store.state.b;

//模块的mutation或者action默认接受的是模块内的state或者getter,
//可以使用context.rootState获取根状态
const moduleA={
    actions:{
        increment({state,commit,rootState}){
            if((state.coount+rootState.count)%2===1){
                commit('increment');
            }
        }
    }
}
//上面的commit的mutation是全局状态的，如果mudule有相同的mutation，那么都会执行
//如果只想单一的mutation执行，就需要使用命名空间namespace

const store= new Vuex.Store({
    modules:{
        account:{
            namespaced:true,
            //模块内容
            state:{},
            actions:{},//需要使用dispatch('account/login)

            //嵌套模块
            modules:{
                //会继承父模块的命名空间
                //如果继续使用namespaced，那么将命名空间将继续延伸
                myPage:{
                    state:{},
                    getters:{
                        profile(){}//getters['account/profile']
                    }
                }
            }
        }
    }
})

//如果我想在命名模块内访问全局的内容呢？
//使用根参数
modules:{
    foo:{
        namespaced:true,
        actions:{
            actionA({dispatch,commit,getters,rootetters}){
                getters.someGetter;//'foo/someGetter'
                dispatch('actionB');//'foo/acitonB'
                dispatch('actionB',null,{root:true});//'actionB
                //commit相同
            }
        }
    }
}
//mapState，mapGetters,mapActions可以简化命名空间下state，action等在组件的注册
methods:{
    ...mapActions('some/module',[
        'foo',
        'bar'
    ])
}
//也可以使用createNamespacedHelper创建基于某个命名空间的辅助函数

store.registerModule;//动态注册模块
store.unregisterModule;//动态卸载模块

//一般情况下模块都会公用一个实例，如果需要一个模块创建多个store实例
//那么就使用函数方式的注册state...
const resusableModule={
    state(){
        return{
            foo:'bar'
        }
    },
    //mutation,action,getter
}

//在store中使用plugin获取做一些特殊控制，如websocket的推送
export default function  createWebSocketPlugin(socket){
    return store=>{
        //store初始化调用
        socket.on('data',data=>{
            store.commit('receiveData',data);
        })
        //每次mutation后调用
        store.subscribe(mutation=>{
            if(mutation.type==="UPDATE_DATA"){
                socket.emit('update',mutation.payload);
            }
        })
    }
}
const plugin=createWebSocketPlugin(socket);
const store=new Vue.Store({
    state,
    mutations,
    plugins:[plugin]
})