# def f():
#     print('in f(), 1')
#     yield 1
#
#     print('in f(), 2')
#     yield 2
#
#     print('in f(), 3')
#     yield 3
#
# g = f()
#
# for x in g.__iter__():
#     print(x)
#
# print(g.__iter__() is g)
# # print(g.__next__())
# # print(g.__next__())
# # print(g.__next__())
class PrimeNumbers:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def isPrimeNum(self, k):
        if k < 2:
            return False

        for i in range(2, k):
            if k % i == 0:
                return False
        return True

    def __iter__(self):
        for k in range(self.start, self.end + 1):
            if self.isPrimeNum(k):
                yield k
for x in PrimeNumbers(1, 30):
    print(x)
