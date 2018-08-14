/**
 * 里氏替换原则（LSP）的本质不是真的和继承有关，而是行为兼容性。
 * 
 * Subtypes must be substitutable for their base types.
 * 派生类型必须可以替换它的基类型。
 * 
 * 检查使用测试驱动开发（Test-Driven Development）来指导你代码的设计
 * 设计可重用类库的时候可随意使用契约设计技术 
 */
function Vehicle(my) {
  var my = my || {};
  my.speed = 0;
  my.running = false;

  this.speed = function () {
    return my.speed;
  };
  this.start = function () {
    my.running = true;
  };
  this.stop = function () {
    my.running = false;
  };
  this.accelerate = function () {
    my.speed++;
  };
  this.decelerate = function () {
    my.speed--;
  }, this.state = function () {
    if (!my.running) {
      return "parked";
    } else if (my.running && my.speed) {
      return "moving";
    } else if (my.running) {
      return "idle";
    }
  };
}

function FastVehicle(my) {
  var my = my || {};

  var that = new Vehicle(my);
  that.accelerate = function () {
    my.speed += 3;
  };
  return that;
}

var maneuver = function (vehicle) {
  write(vehicle.state());
  vehicle.start();
  write(vehicle.state());
  vehicle.accelerate();
  write(vehicle.state());
  write(vehicle.speed());
  vehicle.decelerate();
  write(vehicle.speed());
  if (vehicle.state() != "idle") {
    throw "The vehicle is still moving!";
  }
  vehicle.stop();
  write(vehicle.state());
};
/**
 * 根据上面的代码，我们看到抛出的异常是“The vehicle is still moving!”，
 * 这是因为写这段代码的作者一直认为加速（accelerate）和减速（decelerate）的数字是一样的。
 * 但FastVehicle的代码和Vehicle的代码并不是完全能够替换掉的。
 * 因此，FastVehicle违反了里氏替换原则。 
 */