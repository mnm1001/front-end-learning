
console.log('\nObject.assign 会继承enumerable为ture的属性, 但会将get值计算为value, 如果使用defineProperty, 则enumerable为false');
var a = {};
var b = {
  get name() {return 1}
}
Object.assign(a, b)
var aDescriptor = Object.getOwnPropertyDescriptor(a, 'name')
console.log(a, a.name, aDescriptor.value, aDescriptor.get)

console.log('\nObject.assign ');
var a = {};
var b = {}
Object.defineProperty(b, 'name', {
  get() {return 1},
})
Object.assign(a, b)
var aDescriptor = Object.getOwnPropertyDescriptor(a, 'name')
console.log(a, a.name)