# 多个小字符串拼接成大字符串
pl = ['<0112>', '<32>', '<1024*768>', '<60>', '<1>', '<100.0>', '<500.0>']
s = ''

# 存在临时变量的浪费
for p in pl:
    s += p
    # print(s)
# print(s)

# use join method
print(''.join(pl))

l = ['abc', 123, 45, 'xyz']
print(''.join(str(x) for x in l))
