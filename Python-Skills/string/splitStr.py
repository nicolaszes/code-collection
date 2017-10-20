# 拆分含有多种分隔符的字符串
s = 'nicolas 15196 0.0 0.0 22652 2872 pts/11 R+ 09:38 0:00 ps aux'
s.split()
# print(s.split())

# newS = 'ab;cd|efg|hi,jklmn\topq;rst,uvw\txyz'
# print(newS.split(';'))
#
# res = newS.split(';')
# t = []
# for y in map(lambda x: t.extend(x.split('|')), res):
#     print(y)
#
# res = t
# t = []
# for y in map(lambda x: t.extend(x.split(',')), res):
#     print(y)
#
# res = t
# t = []
# for y in map(lambda x: t.extend(x.split('\t')), res):
#     print(y)
# print(t)

def mySplit(s, ds):
    res = [s]

    for d in ds:
        t = []
        for y in map(lambda x: t.extend(x.split(d)), res):
            print(y)
        res = t
    # 处理字符串不为空的情况
    return [x for x in res if x]

newS = 'ab;cd,|efg|hi,jklmn\topq;rst,uvw\txyz'
print(mySplit(newS, ';|,\t'))

# 正则表达式
import re
re.split(r'[,;\t|]+', newS)
print(re.split(r'[,;\t|]+', newS))
