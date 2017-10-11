# 字典有序问题
from random import randint
from time import time
from collections import OrderedDict

d = OrderedDict()

players = list('ABCDEFGH')
start = time()

# 模拟答题时间
for i in range(8):
    input()
    p = players.pop(randint(0, 7 - i))
    end = time()
    d[p] = (i + 1, end - start)
    print(i + 1, p, end - start)

print()
print('_' * 20)

for k in d:
    print(k, d[k])
