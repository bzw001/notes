###### 什么是DOM?
> 为HTML/XML定义得一个编程接口，HTML解析形成了DOM树，同时提供了与js交互的一整套接口，最终为网页呈现得版面结构服务的。

###### 谁会阻塞渲染？
> css(行内即内联不会,内嵌与外部会) ,js

##### 怎么优化？

```
 优化关键的渲染路径
 css: media queries调用合适的css, minify, 减少样式数量
 js: 1、放在尾部
     2、使用async或者defer来异步加载避免阻塞
        async与defer功能差不多，但是defer下，异步下载的js必须按照在html中顺序依次执行
        aysnc不能保证js的执行顺序，谁先下载，谁就执行
```