/**
 * 适配器模式（Adapter）是将一个类（对象）的接口（方法或属性）转化成客户希望的另外一个接口（方法或属性）
 * 适配器模式使得原本由于接口不兼容而不能一起工作的那些类（对象）可以一些工作。
 * 速成包装器（wrapper）。
 */
//鸭子
abstract class Duck {
  public abstract fly(): void
  public abstract quack(): void
}

//火鸡
abstract class Turkey {
  public abstract fly(): void
  public abstract gobble(): void
}

//具体的鸭子
class MallardDuck extends Duck {
  constructor() {
    super()
  }

  public fly () {
    console.log("可以飞翔很长的距离!");
  }

  public quack () {
    console.log("嘎嘎！嘎嘎！");
  }
}

// 具体的火鸡
class WildTurkey extends Turkey {
  constructor() {
    super()
  }

  public fly () {
    console.log("飞翔的距离貌似有点短!");
  }

  public gobble () {
    console.log("咯咯！咯咯！");
  }
}

class TurkeyAdapter extends Duck {
  oTurkey: WildTurkey
  constructor(oTurkey: WildTurkey) {
    super()
    this.oTurkey = oTurkey
  }

  public fly() {
    var nFly = 0;
    var nLenFly = 5;
    for(; nFly < nLenFly;){
        this.oTurkey.fly();
        nFly = nFly + 1;
    }
  }

  public quack() {
    this.oTurkey.gobble();
  }
}

var oMallardDuck = new MallardDuck();
var oWildTurkey = new WildTurkey();
var oTurkeyAdapter = new TurkeyAdapter(oWildTurkey);

oMallardDuck.fly();
oMallardDuck.quack();

oTurkeyAdapter.quack();