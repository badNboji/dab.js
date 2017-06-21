 /* %Tape */

 const mvpDemo = {};

 mvpDemo.isNegativeOrOdd = function(value) {
   return value < 0 || value % 2 !== 0;
 }
 /* ~Negative or Odd
   ~isNegativeOrOdd(1) equal true | error
   ~isNegativeOrOdd(10) equal false
   ~isNegativeOrOdd(10) notEqual true
*/

 mvpDemo.add = (a, b) => {
  return a + b;
};
/*
  ~Add two numbers correctly
   ~add(1,2) equal 3
*/

mvpDemo.multiply = (a, b) => {
  return a * b;
}

/* ~Multiple numbers
  ~multiply(1,2) equal 2
*/


mvpDemo.reverseString =  function (string) {
   return string.split('').reverse().join('');
 }
/* ~Reverse String
   ~reverseString('will') equal 'lliw'
   ~reverseString('hello') notEqual 'lliw'
*/

// function cloneDeep(value) {
//    var keys = Object.keys(value);
//    var cloned = {};
//    keys.forEach(function(ele,i ){
//        if (typeof value[ele] === 'object'){
//            cloned[ele] = cloneDeep(value[ele]);
//        } else {
//            cloned[ele] = value[ele];
//        }
//    });
//     return cloned;
// }

// function clone(value) {
//     if (isArray(value)){
//         return value.map(function(ele, i) {
//             return ele;
//         });
//     }
//     else {
//         var obj = {};
//         for (var key in value){
//             obj[key] = value[key];
//         }
//         return obj;
//     }
// }

  module.exports = mvpDemo;
