interface Bird {
  fly(): void
  layEggs(): void
}

interface Fish {
  swim(): void
  layEggs(): void
}

function getSmallPet(): Fish | Bird {
  // ...
  return
}

let pet = getSmallPet()
pet.layEggs() // okay
// pet.swim()    // errors

// 每一个成员访问都会报错
if ((<Fish>pet).swim) {
  (<Fish>pet).swim()
}
else {
  (<Bird>pet).fly()
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}

// 'swim' 和 'fly' 调用都没有问题了
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

interface User {
  nickname: string
  age: number
  gender: string
  avater: string
}

type PartialUser = Partial<User>
type KeyofUser = keyof User

type MyPartial<T> = { 
  [P in keyof T]?: T[P] | undefined
}

type MyPick<T, Keys extends keyof T> = { 
  [P in Keys]?: T[P]
}

type UserAgeGender = MyPick<User, 'age' | 'gender'>

function updateUser(dto: PartialUser): void {
  if (dto.nickname) {

  }
}

type UserKeys = 'name' | 'age' | 'gender'
type StudentKeys = 'name' | 'age' | 'gender' | 'sno'

type Diff<T, U> = T extends U ? never : T
type StudentUserDiffKeys = Diff<StudentKeys, UserKeys>

function updateUserAgeGender(obj: UserAgeGender) {

}

updateUser({ nickname: '' })

updateUserAgeGender({ age: 12 })