/* %Tape */

const stressTest = {};

stressTest.reverseObject = function(object) {
  let result = {};
  for (key in object) {
    result[object[key]] = key;
  }
  return result;
}

/*
~ should reverse multiple properties
~
~a:stressTest.reverseObject({a:1,b:2}) equal 2 | reverse object

*/


module.exports = stressTest; 

