var incr = (function() {
  var i = 1;

  return function() {
    return i++;
  };
})();

incr(); // returns 1
incr(); // returns 2
console.log(
  (function() {
    var i = 1;
    console.log("Outer function invoked!");
    return function() {
      console.log("Inner Function Invoked!");
      return i++;
    };
  })()()
);
