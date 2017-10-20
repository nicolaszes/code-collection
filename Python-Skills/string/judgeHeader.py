# 判断开头或者结尾
import os, stat

# endswith 可以接受 turple作为参数
l = [name for name in os.listdir('.') if name.endswith(('.py', '.sh'))]
print(l)

# 修改文件权限
print(oct(os.stat('splitStr.py').st_mode))
stat.S_IXUSR
os.chmod('splitStr.py', os.stat('splitStr.py').st_mode | stat.S_IXUSR)
