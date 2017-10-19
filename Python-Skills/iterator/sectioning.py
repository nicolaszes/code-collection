# sort list data
from random import randint
from itertools import islice

data = range(20)
t = iter(data)

# 切片操作，需要
for x in islice(t, 5, 10):
    print(x)

for x in t:
    print(x)
