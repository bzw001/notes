//什么是响应式编程
//面向数据流与变化传播的编程范式。针对数据多异步，多变化的场景下的产物
//特点：最初的数据会随着后续对应变量的变化而变化

//RX：Reactive Extensions。由微软开发维护。有java,等版本

//Rxjs的核心概念是observable。将异步数据流包装成observeble对象，然后结合Rx的方法对数据进行流水线处理，即链式调用
//Rxjs从功能上来讲可以当做Promise的超集，能够处理更加复杂的异步场景，但同时对开发人员的抽象能力要求也比较高

//Rx结合了观察者模式，需要使用者订阅。同时结合了函数式编程与迭代器模式的思想
//例：
let newObservable=Observable.debounceTime(500).take(2);
//debuounceTime()与take()都是operator
Observable.subscribe(observe);

//observable发送一个事件，事件会被observer捕获，并进入到回调。subscribe不是一个可以改变原始数据流的函数，其会返回一个Subscription实例，其本身有多个API操作。

//使用RxJSc处理用户输入查询然后显示匹配提示的场景：
//一般的要求使用ngchange监听然后发送请求，最后返回的数据进行渲染。
//但考虑到下面的细节时就比较复杂：
/**
 * 1、不输入用户每输入一个字符就立马请求数据，减少服务器压力。可以在确认用户500ms没有输入了则请求数据
 * 2、用户输入相同的字符不请求
 * 3、每次匹配请求返回数据不一定是顺序返回的，第一次的搜索可能会比第二次搜索返回晚。这样显示的数据会是混乱的。
 */
//使用一般的js处理会有许多状态量去控制，但是使用RxJs会比较清晰优雅。
let inputSelector=document.querySelector('input');
RegExp.Observable.formEvent(inputSelector,'keyup')
    .debounceTime(500)
    .switchMap(event=>getRecommend(event.target.value))
    .subscribe(callback);

//RxJs的operator
/**
 * Observable.create() //创建操作符  接受工厂函数返回一个新的Observble对象，可以被subscribe
 * Observable.map()    //变换操作符  对数据进行调整
 * Observable.filter() //过滤操作符  对数据过滤，返回false将终止传播
 * Observable.forkJoin() //组合操作符   组合多个接口的数据，可以处理多个接口请求的数据，同时这些接口可以有依赖性
 * Observable.timeout()等工具操作符
 */


 //使用Rxjs改造HTTP服务
 /**
  * 1、对请求结果进行统一的预处理
    2、对捕获的错误统一处理
    3、请求发起，加载动画
    4、请求结束，关闭动画
  */

import {Injectable} from '@angular/core';
import {Http,RequestOptions,Headers} from   '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MyHttpService{
    constructor(private http:Http){
    }
     //get方法，统一调用request方法
     get(url:string,reqOpts?:RequestOptions){
         return this.request(url,Object.assign({
             method:'get'
         },reqOpts))
     }
     //
     request(url:string,reqOpts:RequestOptions){
         this.shoLoading();
         return this.http.request(url,new RequestOptions(reqOpts))
            .map(res=>res.json)  
            .do(this.hideLoading.bind(this))
            .map(this.preprocessRes.bind(this))
            .catch(this.handleErr.bind(this));
     }
     private preprocessRes(res){
         //..进行数据预处理
         return res.data;
     }
}
//RxJs的observable是‘冷’模式，需要被订阅，定义的代码才会执行。

//使用RxJs解决输入提示功能
@Component({
    selector:'demo-input',
    template:`
        <input  type="text" [ngFormControl]="term"/>
        <ul>
            <li>
                <li *ngFor="let recommend of recommends">{{recommend}}</li>
            </li>
        </ul>
    `,
    provider:[DemoService]
})
export class DemoInput implements OnInit{
    recommends:Array<string>;
    term=new Control();
    constructor(private _demoService:DemoService){}

    ngOnInit(){
        this.term.valueChanges
            .debuounceTime(500)//延迟500ms  过滤掉所有Observable对象抛出的时间间隔不超过500ms的事件
            .distinctUntilChanged()//检验输入值是否变化,过滤掉Observable对象连续抛出的value值相同的事件
            .switchMap(term=>this._demoService.getRecommend(term))//保证请求顺序 ，接受了另一个Observable对象，每一个value边改的时间会被
            //映射成一个新的Observable对象，当上流有新数据，那么switchMap里生成的数据流会被截断。那么过时的数据不会被传输
            .subscribe(items=>{//this.term.valueChanges是一个Observable对象
            this.items=items;
        })
    }
}

