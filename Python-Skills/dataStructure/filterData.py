# sort list data
from random import randint

data = [randint(-10, 10) for _ in range(10)]

# --------solution 1: 函数式编程
# in python2, return a list
# in python3, return a iterator
filter(lambda x: x >= 0, data)

# --------solution 2: 列表解析
# fast than filter an for loop
new = [x for x in data if x >= 0]
print(new)


# sort dict data
# --------solution 2: 字典解析
d = { x: randint(60, 100) for x in range(1, 21)}
newD = {k: v for k, v in d.items() if v > 90}
print(newD)


# sort set data
s = set(data)
newS = { x for x in s if x % 3 == 0 }
print(newS)
