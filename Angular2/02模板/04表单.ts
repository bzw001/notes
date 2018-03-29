//可以通过模板驱动与模型驱动构建表单
//模板驱动使用内置指令，内置校验
//模型驱动通过自定义表单，自定义校验

//表单指令

//表单指令中心，NgForm
//NgForm指令提供扩展的表单属性，所有的其它表单指令都必须在NgForm指令内部才能运行
/**
 * 使用：需要引入FormsModule模块与FormComponent组件
 * 引入FormComponent组件后可以显式使用NgForm指令。也可以不写，因为只要遇到form标签就会自动创建一个NgFrom指令到这个form标签上
 */
import {NgModule} from '@angulr/core';
import {BrowserModule} from '@angular/plarform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.componet';
import  {FormComponent} from './form.component';

@NgModule({
  imports:[
      BrowserModule,
      FormsModule
  ],
    declarations:[
        AppComponent,
        FormComponent
    ],
    bootstrap:[AppComponent]
})
export class AppModule{}


//NgModel指令
/**
 * 大括号中加小括号的[()]是双向绑定,[]是单向绑定
 * 在控件中使用NgModel属性绑定，需要控件添加name属性，name会作为唯一标识符来注册生成一个FormControl
 * <input type="text" name="contactName" [ngModel]="curContact.name"><>
 */

//控件

//单选框
//同一组单选框绑定的属性以及name属性值都必须相同
//<input type="radio" name="sex" [(ngModel)]="curContact.sex" value="female"/>男
//<input type="radio" name="sex" [(ngModel)]="curContact.sex" value="male"/>女

//复选框
//<input type="checkbox" name="lock" [(ngModel)]="curContact.lock"/>

//单选下拉框
//options可以使用value以及ngValue来绑定值,前者绑定单值，后者绑定对象
export class FormComponent{
    interest:any[]=[
        {value:'reading',display:'阅读'}
    ];
}

let test=`
    <select name="interestValue" [(ngModel)]="curContact.interestValue">
        <!--<option *ngFor="let interest of interests" [value]="interest.value"></option>-->
        <option *ngFor="let interest of interests" [ngValue]="interest"></option>
    </select>
`;

//多选下拉框
//返回的数据是一个被所有选项数据组成的数组
let test1=`
    <select multiple name="interestMul" [(ngModel)]="curContact.interestMul">
        <option *ngFor="let interest of interests" [value]="">{{interest.display}}</option>
    </select>
`;

/**模板局部变量**/
//模板中对DOM元素或指令的引用

//DOM元素局部变量
/**
 * 在局部变量名前加上#符号(也可以使用ref-前缀)
 */
let test3=`
    <li>
        <input type="text" #contactName name="contactName" id="contactName">
        <p>{{contactName.value}}</p>
    </li>
`;
//angular会自动将局部变量设置为对当前DOM元素对象的引用。上例中contactName引用的是document。getElementById('contactName');

//表单局部变量
//表单指令的局部变量在定义时需要手动初始化，会解析成对表单指令实例对象的引用

//表单局部变量
let test4=`
    <form #contactForm="ngForm">
        <ul>
            <li>
                <input type="text" name="contactName" [(ngModel)]="curContact.name">
                <input type="text" name="telNum" [(ngModel)]="curContact.telName">
            </li>
        </ul>
    </form>
`;
//contactForm为NgForm指令实例对象的引用，可以读取NgForm实例对象的属性值,.如表单的valid属性状态
//如果姓名控件绑定变量并且输入值'123',
//那么 contact.value的值为{contactName:'123'}

//控件局部变量
let test5=`
    <input type="text" name="contactName" [(ngModel)]="curContact.name" #contactName="ngModel"/>
    <p>{{contactName.valid}}</p>
`;
//局部变量是对NgModel指令实例对象的引用


//表单状态
//表单Ng-Form与NgModel指令都有五个表示状态的属性来追踪表单状态，其可以通过对应的局部变量获取
/**
 * valid : 表单值是否有效 
 * pristine:表单值是否为改变
 * dirty:表单值是否已改变
 * touched:表单是否已被访问过
 * untouched：表单是否未被访问过
 */
//根据不同的表单属性状态可以设置特定处理逻辑与特定样式

//NgModelGroup对表单输入内容进行分组，可以对输入内容进行语义上的区分
let test6=`
    <form #contact="ngForm">
        <fieldset ngModelGroup="nameGroup" #nameGroup="ngModelGroup">
            <input type="text" name="firstName"  [(ngModel)]="curContact.firstName"/>
        </fieldset>
    </form>
`;
//可以在contact表单局部变量得到输入内容,valid属性只要其分组内容的内容一起触发才会变更
/**
 * {
 * nameGroup:{
 *      firstName:'',
 *      lastName:''
 *  }
 * }
 */

 //ngSubmit
 //ngSubmit的事件类型是EventEmitter
 //会先执行表单原生的submit事件，再执行组件定义的doSubmit事件。可以直接接受表单局变量的value值作为参数传入

//根据变淡控件的不同状态的样式类来自定义表单样式
/**
 * ng-touched/ng-untouched    控件是否已经被访问过  
 * ng-dirty/ng-pristine       控件值是否已经变化
 * ng-valid/ng-invalid        控件值是否有效
 */
//如:
/**
 * .ng-valid[required]{
 *  border-left:5px solid #0f0;
 * }
 */


 //表单校验
 //angular支持的表单内置校验
 /**
  * required:表单值是否为空
    minlength:表单控件值的最小长度
    maxlength:表单空间之的最大长度
    pattern:表单控件值的匹配规则
  */
//可以在表单添加novalidate属性屏蔽HTML的拦截校验

//如何创建自定义校验
/**
 * 1、引入FormGroup,FormControl
 * 2、需要使用自定义指令的表单与控件分别引入formGroup与formControlName
 * 3、组件控制器创建FormGroup表单实例对象与FormControl控件实例对象
 * 4、可以根据FormControl实例对象的errors属性判断是否校验通过
 */