/**
 * 得到的结果是'0
 */
interface Person {
  readonly IdCard: string;
  name?: string;
  [propName: number]: any;
}

let person: Person = { IdCard: '340000***' };
function getPerson (p: Person) {
  console.log(p)
}
getPerson({ IdCard: 's', 0: 2 })