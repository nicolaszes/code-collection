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