#### g 影响


##### exec test
###### 有
匹配后保存最后位置到lastIndex 直到无法匹配返回null并重置lastIndex为0
###### 无
lastIndes始终为0

##### match
###### 有
所有匹配值的数组, 忽略小括号
###### 无
小括号分组的数组