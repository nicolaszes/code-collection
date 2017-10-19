# for 语句迭代多个对象
from random import randint
from itertools import chain

# 并行情况
chinese = [randint(60, 100) for _ in range(40)]
math = [randint(60, 100) for _ in range(40)]
english = [randint(60, 100) for _ in range(40)]

# 引索
for i in range(len(math)):
    chinese[i] + math[i] + english[i]

total = []
for c, m, e in zip(chinese, math, english):
    total.append(c + m + e)

print(total)

# 串行情况
e1 = [randint(60, 100) for _ in range(40)]
e2 = [randint(60, 100) for _ in range(42)]
e3 = [randint(60, 100) for _ in range(45)]
e4 = [randint(60, 100) for _ in range(36)]

count = 0
for s in chain(e1, e2, e3, e4):
    if s > 90:
        count +=1
print(count)
