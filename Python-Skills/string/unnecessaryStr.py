# 去掉不需要的字符

# 1. 过滤用户输入中前后多余的空白字符
# 2. 过滤某 window 下编辑文本中的 '\r': 'hello world\r\n'
# 3. 去掉文本中的 unicode组合符号（音调）: u'n i

s = '   abc   123   '
print(s.strip())
print(s.lstrip())
print(s.rstrip())

s = '---abc+++'
print(s.strip('-+'))


s = 'abc:123'
print(s[:3]+s[4:])


s = '\tabc\t123\txyz'
print(s.replace('\t', '')) # 只能替换一种

s = '\tabc\t123\txyz\ropq\r'
import re
print(re.sub('[\t\r]', '', s))


s = 'abc123xyz'
print(str.maketrans('abcxyz', 'xyzabc'))
print(s.translate(str.maketrans('abcxyz', 'xyzabc')))

# s = 'abc\refg\n234\t'
# print(s.translate('\t\r\n'))
