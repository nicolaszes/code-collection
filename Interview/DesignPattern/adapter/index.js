var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 适配器模式（Adapter）是将一个类（对象）的接口（方法或属性）转化成客户希望的另外一个接口（方法或属性）
 * 适配器模式使得原本由于接口不兼容而不能一起工作的那些类（对象）可以一些工作。
 * 速成包装器（wrapper）。
 */
//鸭子
var Duck = /** @class */ (function () {
    function Duck() {
    }
    return Duck;
}());
//火鸡
var Turkey = /** @class */ (function () {
    function Turkey() {
    }
    return Turkey;
}());
//具体的鸭子
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        return _super.call(this) || this;
    }
    MallardDuck.prototype.fly = function () {
        console.log("可以飞翔很长的距离!");
    };
    MallardDuck.prototype.quack = function () {
        console.log("嘎嘎！嘎嘎！");
    };
    return MallardDuck;
}(Duck));
// 具体的火鸡
var WildTurkey = /** @class */ (function (_super) {
    __extends(WildTurkey, _super);
    function WildTurkey() {
        return _super.call(this) || this;
    }
    WildTurkey.prototype.fly = function () {
        console.log("飞翔的距离貌似有点短!");
    };
    WildTurkey.prototype.gobble = function () {
        console.log("咯咯！咯咯！");
    };
    return WildTurkey;
}(Turkey));
var TurkeyAdapter = /** @class */ (function (_super) {
    __extends(TurkeyAdapter, _super);
    function TurkeyAdapter(oTurkey) {
        var _this = _super.call(this) || this;
        _this.oTurkey = oTurkey;
        return _this;
    }
    TurkeyAdapter.prototype.fly = function () {
        var nFly = 0;
        var nLenFly = 5;
        for (; nFly < nLenFly;) {
            this.oTurkey.fly();
            nFly = nFly + 1;
        }
    };
    TurkeyAdapter.prototype.quack = function () {
        this.oTurkey.gobble();
    };
    return TurkeyAdapter;
}(Duck));
var oMallardDuck = new MallardDuck();
var oWildTurkey = new WildTurkey();
var oTurkeyAdapter = new TurkeyAdapter(oWildTurkey);
oMallardDuck.fly();
oMallardDuck.quack();
oTurkeyAdapter.quack();
