/**
 * 描述实例化
 */
interface MyDateInit {
  new (year: string, month: string, day: string) : MyDate;
}

interface MyDate {
  year: string;
  month: string;
  day: string;
}

class DateClass implements MyDate {
  year: string;
  month: string;
  day: string;
  constructor(year: string, month: string, day: string) {
    this.year = year;
    this.month = month;
    this.day = day;
    return this;
  }
}

function getDate(Class: MyDateInit, { year, month, day }) : MyDate {
  return new Class(year, month, day);
}

getDate(DateClass, { year: '2017', month: '12', day: '1' });