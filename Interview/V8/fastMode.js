var obj = {};

obj.x = 1;
obj.y = 2;
obj.z = 3;

obj[0] = "a";
obj[1] = "b";

obj.a = "a";
obj.b = "b";
obj.c = "c";

function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1\. This creates a cycle.

  console.log(o1)
  console.log(o2)
}

f();