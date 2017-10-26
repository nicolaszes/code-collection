# 字符串居中对齐
# ljust, rjust, center() method
s = 'abc'
print(s.ljust(20, '='))
print(s.rjust(20, '='))
print(s.center(20, '='))

# format method
print(format(s, '<20'))
print(format(s, '>20'))
print(format(s, '^20'))

d = {
    'lodDist': 100.00,
    'SmallCull': 0.04,
    'DistCull': 500.0,
    'trillinear': 40,
    'farclip': 477,
}

w = max(map(len, d.keys()))
for k in d:
    print(k.ljust(w),':', d[k])
