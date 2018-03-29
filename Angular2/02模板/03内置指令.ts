//常见内置指令：NgClass,NgStyle,NgIf,NgFor,NgSwitch

//NgClass 为标签元素添加或移除css类
setClasses(){
    let classes={
        //css类名:true/false
    }
}
//<div [ngClass]="setClasses()"></div>

//NgStyle   给模板元素设置单一样式
setClass(){
    let styles={
        'color':'red';//css属性名:css属性值
    }
}
//<div [ngStyle]="setClasses()"></div>

//NgIf  dom节点的消失与显示

//NgSwitch  类似js的switch语句
//结合ngSwitchCase 与ngSwitchDefault 可以根据模板表达式的值来决定哪个模板元素加载到DOM上
let test=`
        <span [ngSwitch]="contactName">
            <span *ngSwitchCase="'a'">显示a</span>
            <span *ngSwitchDefault="'default'">显示default</span>
        </span>
`;

//NgFor
let testb=`
    <li *ngFor="let contact of contacts">
        <list-li [contact]="contact" (routerNavigate)="routerNavigate($event)"></list-li>
    </li>
`;
//赋值给*ngFor的字符串不是模板表达式，星号不能省略
//使用索引
let test2=`
    <div *ngFor="let contact of contacts;let i=index"></div>
`;
//使用NgForTrackBy优化性能
//当ngfor的数据比较多是，一条数据的变更会应发所有数据的渲染。使用trackBy来避免这种情况
//例
trackByContacts(index:number,contact:Contact){
    return contact.id;
}
let testc=`
    <div *ngFor="let contact of contacts;trackBy:trackByContacts">{{contact.id}}</div>
`;
//这里将具有相同id对象处理成同一个人联系人。只要同一个联系人的属性发生变化，就会更新Dom元素，否则就会留下这个元素
