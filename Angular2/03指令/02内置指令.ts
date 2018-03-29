//内置指令分为三个类别：通用指令，路由指令，表单指令

//1、通用指令
//包含在CommonModule模块
/**
 * NgClass
 * NgStyle
 * NgIf
 * NgSwitch,NgSwitchCase,NgSwitchDefault
 * NgFor
 * NgTemplateOutlet
 * NgPlural,NgPluralCase
 */


 //2、表单指令
 /**
  * 表单指令包含在三个模块中：
  FormsModule,ReactiveFormsModule,InternalFormsSharedModule
  */
//FormsModule
/**
 * NgModel,NgmodelGroup,NgForm,InternalFormsSharedModule
 */

 //ReactiveFormsModule
 /**
  * FormControlDirective,FormGroupDirective,FormControlName,FormGroupName,FormArrayName,InternalFormsModule
  FormControlDirective :将一个已有的FormControl实力绑定到DOM元素
  FormGroupDirective:将已有的表单组合绑定到一个Dom元素,通过formControl
  FormContrlName :将已有的表单控件与一个Dom元素绑定，可以为表单控件制定一个别名。利用这个别名可以做校验以及获取值等。
  其他几个不重要
  */
  //InternalFormsShareModule
  //FormsModule与ReactiveFormsModule均引自InternalFormsSharedModule
  /**
   * 包括表单元素访问器指令：如
   * DefaultValueAccessor,NumberValueAccessor等,这些访问器指令无需再应用中主动访问。他们负责DOM元素与表单输入控件的联系
   * 选择框选项指令：NgSelectOption,NgSelectMultipleOption。可以设置多选与单选框
   * 表单校验指令：RequiredValidator,MinLengthValidator,MaxLengthValidator,PatternValidator
   * 控件状态指令：NgControlStatus,NgControlStatusGroup。无需主动使用，会自动判别控件状态作如设置css类的处理。
   */


   //3、路由指令
   /**
    * routerLink,routerOutlet,routerLinkActive
     routerLink:占位符
      routerOutlet:组件插入的地方
      routerLinkActive:当前路由与css类的关系
    详细讲解见路由模块
    */
