
// 有任意默认参数, 严格模式, 不传参, arguments[0] 不全等 first
console.log('\n有默认参数');
(function (a, b = 2) {
  a = 2
  console.log(arguments.length)
  console.log(a === arguments[0]) // false
}(1))

console.log('\n有默认参数');
(function (a, b = 2) {
  a = 2
  console.log(arguments.length)
  console.log(a === arguments[0]) // false
}())

// 函数调用时 求参
(function () {
  function b () {
    return 3
  }
  function aa (a = b()) {}
  aa()
}())

// 函数 前面参数被后面调用
(function (a, b = a) {
  console.log(a + b) // 2
}(1))

// function 参数暂死区 先定义的参数可以访问后定义的参数 后定义的参数不能访问前面定义的参数
