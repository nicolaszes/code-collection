# 如何快速找到多个字典中的公共键 (key)
from random import randint, sample

# 生成随机的 dict
newS = sample('abcdefg', randint(3, 6))

s1 = { x: randint(1, 4) for x in sample('abcdefg', randint(3, 6)) }
s2 = { x: randint(1, 4) for x in sample('abcdefg', randint(3, 6)) }
s3 = { x: randint(1, 4) for x in sample('abcdefg', randint(3, 6)) }

print(s1.keys() & s2.keys() & s3.keys())
