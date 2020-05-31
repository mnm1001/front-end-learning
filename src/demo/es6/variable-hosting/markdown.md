#### 暂时性死区
- 先扫描所有let const变量 放入tdz
- 执行到定义处时将变量从tdz中移除
- 若运行时未到定义 提前访问tdz 会提前报错
- 之后才是访问报错

#### let变量提升
顺序: 
- 检测同作用域 let or var 重复定义
    - Identifier 'x' has already been declared
- 将该作用域的const let变量名提前放入暂时性死区, 运行时如果提前使用直接报错, 未到实际读取值的阶段, \n function内或块级作用域(非全局) 先使用 后let定义 暂时死区(const全局也会access错误)
    - Cannot access 'window' before initialization
    - 另 typeof 可以 计算未定义的值
- 读取值时是否定义
    -  is not defined

#### 函数定义语句 和 表达式定义语句
```javascript
console.log(a) // undefined
var a = function(){}
```
```javascript
console.log(a) // function a
function a(){}
```
```javascript
console.log(a);// undefined
if(true){
    console.log(a); // function a
    function a(){}
}
```
函数声明提到函数级作用域最前面，然后将函数定义提升到块级作用域最前面。等价于:
```javascript
var a; //  函数 a 的声明
console.log(a);// undefined
if(true){
    function a(){} // 函数 a 的定义
    console.log(a); // function a
}
```
```javascript
try{
    console.log(a);// undefined
    aa.c;
}catch(e){
    var a = 1;
}
console.log(a);// 1
console.log(e);// Uncaught ReferenceError: e is not defined
```
catch 里面遵循的是块作用域.
变量提升,不存在块级作用域,但是函数提升存在, let const也存在块级作用域,
```javascript
var a = 0;
if(true){
    a = 1;
    function a(){}
    a = 21;
    console.log("里面",a); // 21
}
console.log("外部",a); // 1
```
函数提升是在块级作用域，但是函数名变量是函数级别的作用域。所以在块级的函数定义（原始代码函数的声明位置）的时候，会将函数名变量同步到函数级作用域，实际上，只有这个时候，在块级作用域外才能访问到函数定义。
      