console.log('\n变量a函数级提升, 函数未提升');
(function () {
  console.log(a) // undefined
  var a = function () { }
}())

console.log('\n函数提升');
(function () {
  console.log(a) // function a
  function a () { }
}())

console.log('\n变量函数级提升, 函数块级提升');
(function () {
  console.log(a)// undefined
  if (true) {
    console.log(a) // function a
    function a () { }
  }
}())

console.log('\n函数声明提到函数级作用域最前面，然后将函数定义提升到块级作用域最前面。等价于:');
(function () {
  var a //  函数 a 的声明
  console.log(a)// undefined
  if (true) {
    function a () { } // 函数 a 的定义
    console.log(a) // function a
  }
}())

console.log(`
    catch 里面遵循的是块作用域.
    变量提升,不存在块级作用域,但是函数提升存在, let const也存在块级作用域,
  `);
(function () {
  try {
    console.log(a)// undefined
    aa.c
  } catch (e) {
    var a = 1
  }
  console.log(a)// 1
  // console.log(e);// Uncaught ReferenceError: e is not defined
}())

console.log('\n函数提升是在块级作用域，但是函数名变量是函数级别的作用域。所以在块级的函数定义（原始代码函数的声明位置）的时候，会将函数名变量同步到函数级作用域，实际上，只有这个时候，在块级作用域外才能访问到函数定义。');
(function () {
  var a = 0
  if (true) {
    a = 1
    function a () { }
    a = 21
    console.log('里面', a) // 21
  }
  console.log('外部', a) // 1
}())
console.log('\nvar提升后改变了外部变量');
(function () {
  var a = 4
  for (var a = 0; a < 3; a++) {
    console.log('a', a)
  }
  console.log('a', a)
}())
console.log('\niife创建新副本');
(function () {
  var b = 1
  function a (cc) {
    cc += 1
    console.log(cc === b)
  }
  a(b)
}())
console.log('\nlet每次循环, 创建新副本, 三元执行 初始化为当前的i值, 然后执行新的++ 或 in 的赋值操作')
console.log('\n三元执行 初始化为当前的i值, 然后执行新的++赋值操作, 所以三元不能const')
console.log('\nin 无初始化操作, 直接赋值操作, 所以in可以用const');
(function () {
  var funcs = []
  for (let a = 0; a < 3; a++) {
    console.log('a', a)
    console.log('a2', a)
    funcs.push(function () {
      console.log(1111, 'a', a)
    })
  }
  funcs.forEach(a => {
    a()
  })
  var funcs = []
  var o = {
    a: 1,
    b: 2,
  }
  for (let a in o) {
    console.log(2222, '', a)
    funcs.push(function () {
      console.log(3333, a)
    })
    a = 4
  }
  funcs.forEach(a => {
    a()
  })
}())
console.log('\nvar绑定到window, let,const不会, 只会遮蔽')
var RegExp = ''
console.log(window.RegExp === RegExp)
// let Array = ''
console.log(window.Array === Array, window.Array)
