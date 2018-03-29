//HTTP服务支持AJAX与JSOP，支持promise，但推荐使用Observable处理异步操作。http请求会返回observeble对象

//针对请求前，请求中，请求后的一些定义场景，如添加统一头部，加载动画等

//例、编写一个HttpInterceptor服务，对请求发送前后进行处理
import {Injectable} from '@anuglar/core';
import {Request,Response} from '@angular/http';
import {Observable} from ''rxjs;

@Injectable()
export class HttpInterceptor{
    //请求发送前的处理逻辑
    beforeRequest(request:Request){
        console.log(request);
        return request;
    }

    afterResponse(res:Observable<Response>):Observable<any>{
        //请求响应后的处理逻辑
        res.subscrible((data)=>{
            console.log(data);
        })
        return res;
    }
}

//封装XHRBackend服务，创建XHRConnection实例前后进行相应的逻辑处理

import {Injectable} from '@angular/core';
import {ConnectionBackend,XHRConnection,XHRBackend,Request} from '@anglar/http';
import {HTTPInterceptor} from './http-interceptor';

@Injectable()
export class HttpInterceptorBackend implements ConnectionBackend{
    constructor(privete _httpInterceptor:HttpInterceptor,privete _xhrBackend:XHRBackend){

    }
    createConnection(request:Request):XHRConnection{
        let req=HTTPInterceptor.beforeRequest?HTTPInterceptor.beforeRequest(request):request;
        //通过XHRBackend对象创建XHRConection实例
        let result=this._xhrBackend.createConnection(req);
        //得到响应后，拦截并调用HTTPInterceptor对象的afterResponse方法
        //处理
        result.response=interceptor.afterResponse?interceptor.afterResponse(result.response):result.response;
        return result;                                 
    }
}

//让刚定义的HttpInterceptorBackend拦截生效。可以创建一个httpFactory工厂
import {RequestOptions,Http} from '@angular/core';
import {HttpInterceptorBackend} from 'http-interceptor-backend';

export function httpFactory(
    httpInterceptorBackend:HttpInterceptorBackend,
    requestOptions:RequestOptions
):Http{
    return new Http(httpInterceptorBackend,requestOptions);
}
//在模块中导入服务，这样任何一个http请求都会被处理
//
providers:[
    HttpInterceptorBackend,HttpInterceptor,
    {
        provider:Http,useFactory:httpFactory,
        deps:[HttpInterceptorBackend,RequestOptions]
    }
]
//