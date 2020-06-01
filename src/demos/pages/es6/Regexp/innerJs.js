console.log('\n.只能匹配非换行符');
(function () {
  `1
  1
  `.match(/.*/) // 1
}())
