interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

class A implements User {
  public name: 'name';
  public age: 12;
  public sex: 'sex';
}

type Person = {
  name: string
  age: number
}

type Child = Person & {
  age: number
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
