+ 1、karma的默认测试框架是jasmine

+ 2、细则套件,使用describe
```
    jasmine套件的核心部分是describe函数。这是一个全局函数
    describe('字符串',func);//第一个字符串是待建立的细则套件名称，儿函数封装了测试套件
    例:
        decribe('Unit test:MainController',function(){});
    describe可以嵌套:
        describe("Unit test:Main controller",function(){
            describe("index method",function(){
                //细则
            })
        })
    这个嵌套就相当于分组，每一个describe运行时，这些字符串会被串起来，上面的嵌套的标题
    会变成 "Unit test:MainController index method"
```

+ 3、如何定义一个细则,使用it
```
    使用it()函数定义细则,也是一个全局函数
    it("细则的标题与描述",function(){用于测试代码功能的预期})
    细则里的预期评估为true为false，只要没有false就是成功。
    
    一个简单测试用例:
    describe("a spec suite",function(){
        it("contains a passing spec",function(){
            expect(true).toBe(true);
        })
    })
```

+ 4 使用expect来建立预期
```
    expect(真实值);
    建立预期，需要串联一个带单只参数的匹配器函数，这个参数就是期望值
    匹配器函数实现真实值与期望值的比较.
    jasmine自带许多匹配器，同事自定义匹配器也不麻烦
    
    在调用匹配前可以调用一个not来创建测试的否定式
    describe('A spec suite',function(){
        it("contains a passing spec",function(){
            expect(true).toBe(true);
        });
        it("contains anthor passing spec ",function(){
            expect(false).not.toBe(true);
        })
    })
```

+ 5、jasmine自带的匹配器
```
    1、toBe
    使用===来比较值
    describe(" a spec suite",function(){
        it("contains passing specs",function(){
            var value=10;
            another_value=value;
            expect(value).toBe(anthor_value);
            expect(value).noe.toBe(null);
        })
    })
    
    2、toEqual
    比较值，对简单字面量与变量有效
    describe("a spec suite",function(){
        it("contains a passing spec",function(){
            var value =10;
            expect(value).toEqual(10);
        })
    })
    
    3、toMatch  使用正则表达式匹配字符串
    
    4、toBeDefined  与undefined比较(还有一个toBeundefined)
    5、toBeNull     与Null值比较
    
    6、toBeTruthy 将值转换为布尔类型之后与true比较
    7。toBeFalsy  将值赚转换为布尔后与false比较
    
    8、toContain   检测一个条目是否在数组中
    例如:expect(arr).toContain(4);
    
    9、toBeLessThan   比较一个数组是否小于预期
    10、toBeGreaterThan
    11、toBeCloseTo
    12 、toThrow()   验证一个函数是否抛出了异常
    如:
        describe("a spec suite",function(){
            it("contains a passing spec",function(){
                expect(function(){
                    return a+10;
                }).toThrow();
            })
        })
        
    使用addMatcher函数s如何创建自定义的匹配器?
    describe("a spec suite",function(){
        this.addMather({
            toBlessThanOrEqual:function(expected){
                return this.actual<=expected;
            }
        })
    })
    
```

+ 6、一些特殊要求
```
    1、beforeEach方法在每一个细则运行前调用一次,而afterEach()则相反
    describe("a spec suite",function(){
        var message;
        deforeEach(function(){
            message="hello";
        });
        afterEach(function(){
            message='';
        })
        it("shouuld say hello world",function(){
            expect(message+'world').toEqual("hello world")
        })
    })
```
