from random import randint
from collections import deque
import pickle

N = randint(0, 100)
history = deque([], 5)
def guess(k):
    if k == N:
        print('right')
    elif k < N:
        print('K is less than N')
    else:
        print('K is greater than N')
    return False

while True:
    line = input('Please input a number: ')
    if line.isdigit():
        k = int(line)
        history.append(k)
        if guess(k):
            break
    elif line == 'history' or line == 'h?':
        print(list(history))

print(q)
