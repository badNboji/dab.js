/* %Tape */

const stressTest = {};



stressTest.filter = function(collection, callback) {
  if (Array.isArray(collection)) {
    let filtered = [];
    collection.forEach((v, i, a) => {
      if (callback(collection[i], i, collection)) {
        filtered.push(collection[i]);
      }
    });
    return filtered;
  } else {
    let filtered = {};
    for (key in collection) {
      if (callback(collection[key], key, collection)) {
        filtered[key] = collection[key];
      }
    }
    return filtered;
  }
}

/*
~ should return all odd numbers in an array
~ stressTest.filter([1, 2, 3, 4, 5, 6], num => num % 2 !== 0) deepEqual [1, 3, 5]
*/

/*
~ should filter all odd values in obj
~ stressTest.filter({a:1, b:2, c:3, d:4}, (value, key, collection) => value % 2 !== 0) deepEqual {a:1, c:3}
*/

/*
~ should filter all odd values in obj
~ stressTest.filter({a:1, b:2, c:3, d:4}, (value, key, collection) => value % 2 !== 0) deepEqual {a:1, c:3}
*/

/*
~ should not mutate the input array
~v: numbers = [1, 2, 3, 4];
duplicatedThroughFilter = stressTest.filter(numbers, () => true);
~ stressTest.filter(numbers, () => true) notEqual duplicatedThroughFilter
*/

stressTest.memoize = function(func) {
  const cache = {};
  return (...params) => {
    const args = params.map(e => JSON.stringify(e)); // allows us to use it on objects containing objects
    if (cache[args]) return cache[args];
    else {
      cache[args] = func(...params);
      return cache[args];
    }
  };
}

/*
  ~ memoize
  ~v: let fib, fastFib, timeCheck, fastTimeCheck, add, fastAdd, wait
	    fib = (n) => (n < 2) ? n : fib(n - 1) + fib(n - 2);
	    fastFib = stressTest.memoize(fib);
	    timeCheck = (str) => str + Date.now();
	    fastTimeCheck = stressTest.memoize(timeCheck);
	    add = (a, b, c) => a + b + c;
	    fastAdd = stressTest.memoize(add);

	// Synchronous sleep: terrible for web development, awesome for testing memoize
	    wait = (t) => {
	      const start = Date.now();
	      while ((Date.now() - start) < t) 'wait';
	    };

			let firstTime = timeCheck('shazaam!');
			    wait(5);
			let secondTime = fastTimeCheck('shazaam!');
			    wait(5);

  ~ fib(10) equal 55
  ~ fastFib(10) equal 55
  ~ fastFib(10) notEqual fastFib(7)
  ~ firstTime notEqual secondTime
  ~ fastTimeCheck('shazaam!') equal secondTime
  ~ add(10,5,4) equal 19 | should accept multiple args
  ~ fastAdd(10, 5, 4) equal 19 | should accept multiple args

  ~v: firstTime = timeCheck({ foo: 'bar' });
	wait(5);
 	secondTime = fastTimeCheck({ foo: 'bar' });
	wait(5);

  ~ firstTime notEqual secondTime
  ~ fastTimeCheck({foo:'bar'}) deepEqual secondTime
  ~ fastTimeCheck({foo:'bar'}) notEqual fastTimeCheck({different: 'result'})
*/

stressTest.delay = function(func, wait) {
  //   setTimeout(function(arguments) {
  //     let args = arguments;
  //     let argsArray = [...args];
  //     let slicedArgs = argsArray.slice(2);
  //     for (let i = 0; i < slicedArgs.length; i++) {
  //       func(slicedArgs[i]);
  //     }
  //   }, wait, arguments);
  // }
  // how to refactor with spread operator

  // function delay(func, wait) {
  //   setTimeout(function(arguments) {
  //     var args = Array.prototype.slice.call(arguments, 2);
  //     func.apply(null, args);
  //   }, wait, arguments);
  // }
  let args = arguments;
  let argsArray = [...args];
  let slicedArgs = argsArray.slice(2);
  setTimeout(func, wait, ...slicedArgs);
}

// 	t.equal(fib(10),  55, 'error');
// 	t.equal(fastFib(10),  55, 'error');
// 	t.notEqual(fastFib(10), fastFib(7), 'error');
// 	t.notEqual(firstTime, secondTime, 'error');
// 	t.equal(fastTimeCheck('shazaam!'), secondTime);
// 	t.equal(add(10,5,4), 19, should accept multiple args)
// 	t.equal(fastAdd(10,5,4), 19, should accept multiple args)
//
// 	firstTime = timeCheck({ foo: 'bar' });
// 	wait(5);
//  	secondTime = fastTimeCheck({ foo: 'bar' });
// 	wait(5);
//
// 	t.notEqual(firstTime, secondTime);
// 	t.deepEqual(fastTimeCheck({foo:'bar'}), secondTime)
// 	t.notEqual(fastTimeCheck({foo:'bar'}), fastTimeCheck({different: 'result'}));
// 	t.end();
// });

// --------------------------------------------------------------------------------------------

/**
 * returns true if the number is negative or odd
 * ex: isNegativeOrOdd(1); -> true
 * ex: isNegativeOrOdd(-2); -> true
 * ex: isNegativeOrOdd(2); -> false
 */
function isNegativeOrOdd(value) {
  if (value < 0) {
    return true;
  }
  if (value % 2 !== 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * repeats the given string count times
 * repeat('abc',3); -> 'abcabcabc'
 * repeat('*',3); -> '***'
 * repeat('abc',0); -> ''
 */
function repeat(string, count) {
  let newstr = '';
  for (var i = 0; i < count; i++) {
    newstr += string;
  }
  return newstr;
}

/**
 * returns a string that is the reverse of the inputted string
 * assume only strings are inputted
 * reverseString('hello'); -> 'olleh'
 * reverseString('will'); -> 'lliw'
 */
function reverseString(string) {
  // let reversedString = [];
  // let arrString = string.split('');
  // for (let i = arrString.length - 1; i >= 0; i--) {
  //   reversedString.push(arrString[i]);
  // }
  // let result = reversedString.join('');
  // return result;
  return string.split('').reverse().join('');
}

/**
 * accepts an object and returns an object with key and values switched
 * ex: reverseObject({a:1,b:"c","d":4}); -> {1:a,c:"b",4:"d"}
 */
function reverseObject(object) {
  let result = {};
  for (key in object) {
    result[object[key]] = key;
  }
  return result;
}

/**
 * Returns boolean of whether argument is classified as a Number object
 * isNumber(5); → true
 * isNumber('hi'); → false
 */
function isNumber(value) {
  return value.constructor === Number ? true : false;
}

/**
 * Returns boolean of whether argument is classified as an Array object
 * isArray(5); → false
 * isArray([1,2,3]); → true
 */
function isArray(value) {
  return Array.isArray(value) ? true : false;
}
/**
 * Returns boolean of whether argument is classified as an Object
 * isObject(5); → false
 * isObject([1,2,3]); → true
 */
function isObject(value) {
  return typeof value === 'object' ? true : false;
}

/**
 * return boolean of whether argument is classified as null
 * isNull(null); -> true
 * isNull(5); -> false
 */
function isNull(value) {
  return value === null ? true : false;
}

/**
 * Creates a clone of an object.
 * var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
 * var shallowClone = clone(users);
 * shallowClone === users -> false
 * shallowClone[0] === users[0] → true
 * DO NOT USE THE BUILT-IN Object.assign FUNCTION
 */
function clone(object) {
  let cloneObject = {};
  let cloneArray = [];
  if (Array.isArray(object)) {
    object.forEach(item => {
      cloneArray.push(item);
    });
    return cloneArray;
  } else {
    for (key in object) {
      cloneObject[key] = object[key];
    }
    return cloneObject;
  }
}

/**
 * Return the size of collection.
 * If the argument passed is an array, then return the length of the array.
 * If the argument passed is an object, then return the number of key/value properties.
 * size([1,2,3]); → 3
 * size({a: 1, b: 2}); → 2
 */
function size(collection) {
  // if (Array.isArray(collection)) {
  //   return collection.length;
  // } else if (typeof collection === 'object') {
  //   let counter = 0;
  //   for (key in collection) {
  //     counter++;
  //   }
  //   return counter;
  // }

  return Array.isArray(collection) ? collection.length :
    Object.keys(collection).length;

}

/**
 * Gets the index at which the first occurrence of value is found in array
 * Returns -1 if element is not in array
 * DO NOT USE THE BUILT-IN INDEXOF function
 * indexOf([11,22,33], 11); → 0
 * indexOf([11,22,33], 5); → -1
 */
//possible to use forEach() or map() here?
function indexOf(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

/**
 * Creates a slice of array with n elements dropped from the beginning. n defaults to 1
 * drop([1, 2, 3]); → [2, 3]
 * drop([1, 2, 3], 2); → [3]
 * drop([1, 2, 3], 5); → []
 * drop([1, 2, 3], 0); → [1, 2, 3]
 */
function drop(array, n = 1) {
  return array.slice(n);
}

/**
 * Creates a slice of array with n elements dropped from the end. n defaults to 1
 * dropRight([1, 2, 3]); → [1, 2]
 * dropRight([1, 2, 3], 2); → [1]
 * dropRight([1, 2, 3], 5); → []
 * dropRight([1, 2, 3], 0); → [1, 2, 3]
 */
function dropRight(array, n) {
  if (n === undefined) {
    return array.slice(0, array.length - 1);
  } else if (n > array.length) {
    return [];
  } else if (n === 0) {
    return array;
  }
  return array.slice(0, n - 1);
}

/**
 * Creates a slice of array containing n elements taken from the beginning. n defaults to 1
 * take([1, 2, 3]); → [1]
 * take([1, 2, 3], 2); → [1, 2]
 * take([1, 2, 3], 5); → [1, 2, 3]
 * take([1, 2, 3], 0); → []
 */
function take(array, n = 1) {
  return array.slice(0, n);
}

/**
 * Returns an array containing the elements from array1 that are not in array2
 * difference([0,1,2,3,4,5],[3,5]); -> [0,1,2,4]
 */
function difference(array1, array2) {
  return array1.filter(item => {
    return array2.indexOf(item) === -1;
  });
}

/**
 * Iterates over elements of an array invoking callback for each element.
 * The callback should be passed the element, the current index, and the entire array.
 * var callback = function(element, index, array) {
 *   console.log(element + "," + index + "," + array);
 * }
 * forEach(['a','b','c'], callback); → prints a,0,[1,2,3] b,1,[1,2,3] c,2,[1,2,3]
 * For each element in the array, the callback we passed is called. The callback can be customized, but in the above example, the callback prints out the element, index, and entire array.
 */
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * Iterates over elements of array in reverse invoking callback for each element.
 * The callback should be passed the element, the current index, and the entire array.
 * var callback = function(element, index, array) {
 *   console.log(element + "," + index + "," + array);
 * }
 * forEach(['a','b','c'], callback); → prints c,2,[1,2,3] b,1,[1,2,3] a,0,[1,2,3]
 */

// is there a forEach method to loop decrementally
function forEachRight(array, callback) {
  for (let i = array.length - 1; i >= 0; i--) {
    callback(array[i], i, array);
  }
}

/**
 * Creates an array of values by running each element in array through callback
 * The callback should be passed the element, the current index, and the entire array.
 * map([1,2,3], function(element, index, array) {
 *  return element * 3;
 * }); -> [3,6,9]
 * BONUS: use the forEach method you use to create map
 */
function map(array, callback) {
  let result = [];
  array.forEach((v, i, a) => {
    result.push(callback(v, i, a));
  });
  return result;
}

/**
 * Iterates over elements of collection returning an array of all the elements callback returns truthy for.
 * filter([1,2,3,4], function(element, index, array) {
 *  return element % 2 === 0;
 * }); → [2,4]
 * filter({a: 1, b: 2,c: 3,d: 4}, function(value, key, collection) {
 *  return element % 2 !== 0;
 * }); → {a: 1, c: 3}
 */
function filter(collection, callback) {
  if (Array.isArray(collection)) {
    let filtered = [];
    collection.forEach((v, i, a) => {
      if (callback(collection[i], i, collection)) {
        filtered.push(collection[i]);
      }
    });
    return filtered;
  } else {
    let filtered = {};
    for (key in collection) {
      if (callback(collection[key], key, collection)) {
        filtered[key] = collection[key];
      }
    }
    return filtered;
  }
}

/**
 * Removes all elements from array that callback returns truthy for and returns an array of the remaining elements.
 * reject([1,2,3,4], function(element, index, collection) {
 *  return element % 2 === 0;
 * }); → [1,3]
 * reject({a:1, b:2, c:3, d:4}, function(value, key, collection) {
 *  return element % 2 !== 0;
 * }); → {b:2, d:4}
 * Challenge: use filter
 */
function reject(collection, callback) {
  if (Array.isArray(collection)) {
    let filtered = [];
    collection.forEach((v, i, a) => {
      if (!callback(collection[i], i, collection)) {
        filtered.push(collection[i]);
      }
    });
    return filtered;
  } else {
    let filtered = {};
    for (key in collection) {
      if (!callback(collection[key], key, collection)) {
        filtered[key] = collection[key];
      }
    }
    return filtered;
  }
}

/**
 * Creates an array without duplicate values. The order of the array is preserved.
 * uniq([1,2,1]); → [1,2]
 */
function uniq(array) {
  // let result = [];
  // for (let i = 0; i < array.length; i++) {
  //   if (result.indexOf(array[i]) === -1) {
  //     result.push(array[i]);
  //   }
  // }
  // return result;
  return array.filter((item, index) => {
    return array.indexOf(item) === index;
  })
}

/**
 * Gets the value of key from all elements in collection.
 * pluck([{user: 'Bob', age: 20},{user: 'Sam', age: 25}], 'user'); → ['Bob','Sam']
 */
function pluck(array, key) {
  let result = [];
  array.forEach((v) => {
    result.push(v[key]);
  })
  return result;
}

/**
 * remove leading and trailing whitespace or specified characters from string
 * trim(' hello '); -> 'hello'
 * trim('   hello world '); -> 'hello world'
 */
function trim(string) {
  let i = 0;
  let j = string.length - 1;
  while (string.charAt(i) === ' ') {
    i++;
  }
  while (string.charAt(j) === ' ') {
    j--;
  }
  return string.slice(i, j + 1);
}

/**
 * Reduces collection to a value which is the accumulated result of running each
 * element in collection through iteratee, where each successive invocation is
 * supplied the return value of the previous. If accumulator is not provided the
 * first element of collection is used as the initial value.
 * If a start parameter is not provided, then set the start value as the zeroth index
 * reduce([1,2], function(stored,current) {
 *  return stored + current;
 * }); → 3
 * reduce([1,2], function(stored,current) {
 *  return stored + current;
 * },1); → 4
 */
// try using a ternary to shorten the code
function reduce(array, callback, start) {
  let acc = start;
  if (start === undefined) {
    acc = array[0];
    for (let i = 1; i < array.length; i++) {
      acc = callback(acc, array[i]);
    }
    return acc;
  } else {
    for (let i = 0; i < array.length; i++) {
      acc = callback(acc, array[i]);
    }
    return acc;
  }
}

/**
 * Flattens a nested array (one level deep).
 * flatten([1, [2, 3, [4]]]); → [1, 2, 3, [4]]
 */
function flatten(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      result = result.concat(array[i]);
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * Recursively flattens a nested array.
 * flattenDeep([1, [2, 3, [4]]]); → [1, 2, 3, 4]
 */

// toReview WHY DO WE NEED RESULT
function flattenDeep(array) {
  // let result = [];
  // array.map(function flatten(item1) {
  //   if (!Array.isArray(item1)) {
  //     result.push(item1);
  //   } // end if statement
  //   else if (Array.isArray(item1)) {
  //     item1.map(function(item2) {
  //       flatten(item2);
  //     })
  //   }
  // }); // end first map
  // return result;

  return array.reduce((a, c) => c.constructor === Array ? a.concat(flattenDeep(c)) : a.concat(c), []);
}


/**
 * Assigns own enumerable properties of source object(s) to the destination object
 * Subsequent sources overwrite property assignments of previous sources.
 * extend({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' }); → { 'user': 'fred', 'age': 40 }
 * BONUS: solve with reduce
 */
// function extend() {
//   let destObject = {};
//   let args = Array.prototype.slice.call(arguments);
//   if (args.length === 1) {
//     return args[0];
//   } else {
//     args.forEach(function(obj) {
//       for (key in obj) {
//         destObject[key] = obj[key];
//       }
//     });
//     return destObject;
//   }
// }

function extend(...args) {
  return args.reduce((acc, val) => {
    for (key in val) {
      acc[key] = val[key];
    }
    return acc;
  })
}

/**
 * Returns boolean of whether argument is classified as a String object
 * isString('hi'); → true
 * isString(5); → false
 */
function isString(value) {
  return typeof value === 'string' ? true : false;
}

/**
 * Creates a deep clone of value.
 * var users = [{ 'user': 'barney' },{ 'user': 'fred' }];
 * var deepClone = cloneDeep(users)
 * deepClone === users → false
 * deepClone[0] === users[0] → false
 * deepClone[0].user === users[0].user → true
 */
function cloneDeep(arrObj) {
  // let deepClone = JSON.parse(JSON.stringify(value));
  // return deepClone;
  const keys = Object.keys(arrObj);
  const cloned = {};
  keys.forEach(e => {
    if (typeof arrObj[e] === 'object') {
      cloned[e] = cloneDeep(arrObj[e]);
    } else {
      cloned[e] = arrObj[e];
    }
  })
  return cloned;
}

/**
 * Using a for loop, call the functions in the queue in order with the input number, where the results of each function become the next function’s input. Additionally, the queue should be empty after the function is called.
 * var puzzlers = [
 *   function(a) { return 8 * a - 10; },
 *   function(a) { return (a - 3) * (a - 3) * (a - 3); },
 *   function(a) { return a * a + 4;},
 *   function(a) { return a % 5;}
 * ];
 * var start = 2;
 * applyAndEmpty(2, puzzlers); → 3
 */
function applyAndEmpty(input, queue) {
  for (let i = 0; i < queue.length; i++) {
    input = queue[i](input);
  }
  return input;
}

/**
 * Returns a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first call.
 */
function once(func) {
  let result;
  let isFirst = true;
  return function returnedFunc(input) {
    if (isFirst) {
      result = func(input);
      isFirst = false;
    }
    return result;
  }
}

/**
 * Returns a function that when called, will check if it has already computed
 * the result for the given argument and return that value instead if possible.
 */
function memoize(func) {
  const cache = {};
  return (...params) => {
    const args = params.map(e => JSON.stringify(e)); // allows us to use it on objects containing objects
    if (cache[args]) return cache[args];
    else {
      cache[args] = func(...params);
      return cache[args];
    }
  };
}

/**
 * Invokes func after wait milliseconds.
 * Any additional arguments are provided to func when it is invoked.
 */
function delay(func, wait) {
  //   setTimeout(function(arguments) {
  //     let args = arguments;
  //     let argsArray = [...args];
  //     let slicedArgs = argsArray.slice(2);
  //     for (let i = 0; i < slicedArgs.length; i++) {
  //       func(slicedArgs[i]);
  //     }
  //   }, wait, arguments);
  // }
  // how to refactor with spread operator

  // function delay(func, wait) {
  //   setTimeout(function(arguments) {
  //     var args = Array.prototype.slice.call(arguments, 2);
  //     func.apply(null, args);
  //   }, wait, arguments);
  // }
  let args = arguments;
  let argsArray = [...args];
  let slicedArgs = argsArray.slice(2);
  setTimeout(func, wait, ...slicedArgs);
}

/**
 * Returns a function that only invokes func once per every wait milliseconds
 * (additional calls to func within the wait should not be invoked or queued).
 */
function throttle(func, wait) {
  // let go = false;
  // setTimeout(function goFunc() {
  //   go = true;
  //   return function returnfunc(input) {
  //     if (go) {
  //       return func(input)
  //     }
  //   }
  // }, wait);

  // let go = false;
  // return function() {
  //   if (go = false) {
  //     go = true;
  //     return func();
  //   }
  //   setTimeout(function() {
  //     go = false;
  //   }, wait);
  // };

  // solution
  let lastCalled = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCalled >= wait) {
      lastCalled = now;
      return func(...args);
    }
  };
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through iteratee.
 *
 * sortBy([1, 2, 3], function(n) {
 *   return Math.sin(n);
 * }); → [3, 1, 2]
 * sortBy([1, 2, 3], function(n) {
 *   return this.sin(n);
 * }, Math); → [3, 1, 2]
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'pebbles' },
 *   { 'user': 'barney' }
 * ];
 * pluck(sortBy(users, 'user'), 'user'); → ['barney', 'fred', 'pebbles']
 */
function sortBy(array, iterator) { // study this
  return array.sort((a, b) => {
    return iterator(a) - iterator(b);
  })
}

/**
 * Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step
 * start defaults to 0, step defaults to 1
 * If you'd like a negative range, use a negative step.
 * range(10); -> [0,1,2,3,4,5,6,7,8,9]
 * range(1,11); -> [1,2,3,4,5,6,7,8,9,10]
 * range(0,30,5); -> [0,5,10,15,20,25]
 * range(0,-10,-1); -> [0,-1,-2,-3,-4,-5,-6,-7,-8,-9]
 */
function range(start, stop, step) {

}

/**
 * split array into two array based on those elements who satisfies the predicate (callback)
 * partition([0,1,2,3,4,5,6], function(element) {
 *   return element % 2 === 0;
 * }); -> [[0,2,4,6],[1,3,5]];
 * BONUS: Use two lodash functions that you created in this unit
 */
function partition(array, predicate) {
  // filter
}

/**
 * Receives a variable number of arrays, and returns an array that contains every item shared between all passed-in arrays
 * intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]); -> [1,2]
 */

function same(a, b) {
  return a.filter(e => b.includes(e));
}

function intersection(...args) {
  return args.reduce((acc, curr) => same(acc, curr));
}

/**
 * Returns an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 * zip(['fred', 'barney'], [30, 40], [true, false]); → [['fred', 30, true], ['barney', 40, false]]
 */
function zip() {

}
/**
 * returns a function that will only be run after first being called count times
 * var called = function() { console.log('hello') };
 * var afterCalled = after(3, called);
 * afterCalled(); -> nothing is printed
 * afterCalled(); -> nothing is printed
 * afterCalled(); -> 'hello is printed'
 * afterCalled(); -> 'hello is printed'
 */
function after(count, func) {

}

/**
 * Returns a function that can be called no more than count times.
 * The result of the last function call is memoized and returned when count has been reached
 * var count = 0;
 * var printAndIncrementCount = function() { console.log(count++) };
 * var beforePrintAndIncrementCount = before(2,printAndIncrementCount);
 * beforePrintAndIncrementCount(); prints 0
 * beforePrintAndIncrementCount(); prints 1
 * beforePrintAndIncrementCount(); prints 1
 * beforePrintAndIncrementCount(); prints 1
 */
function before(count, func) {

}

/**
 * Write a function that creates arrays. The first argument is the length. The second
 * is a callback. The return value of this callback will become the array element. Call
 * the callback with the array index as an argument.
 * var square = function(n) { return n * n; };
 * arrayFactory(4, square); -> [0, 1, 4, 9]
 * Remember the zero-based index for arrays. 3 Was passed as the last argument for an array of length 4.
 */
function arrayFactory(length, processor) {

}

function Bode(key, val) {
  this.value = val;
  this.next = null;
  this.key = key;
}

function HashTable() {
  this.SIZE = 16;
  // how filled the hash table is.
  this.stored = 0;
  // the array will be instantiated as [undefined, undefined....]
  // the array length should not change in this problem
  this.storage = new Array(this.SIZE);
}

// stores a value in the storage array
// hint: use the hash function to determine where in the array to store the value
HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  const newBode = new Bode(key, value);
  let currentNode = this.storage[index];
  if (!this.storage[index]) {
    this.storage[index] = newBode;
  } else {
    // if a node is assigned to the index
    while (currentNode.next) { // to fix and understand
      currentNode = currentNode.next;
    }
    currentNode.next = newBode;
  }
  this.stored += 1;
  // console.log(this.storage);
  // console.log(this.SIZE);
  // console.log('this.stored in set', this.stored);
  if ((this.stored / this.SIZE) > (3 / 4)) {
    const temp = {};
    // get all the values
    for (let ele in this.storage) {
      if (this.storage[ele])
        var current = this.storage[ele];
      while (current) {
        temp[current.key] = current.value;
        current = current.next;
      }
    }
    // reset storage:
    this.SIZE = this.SIZE * 2;
    // console.log('getting bigger');
    this.stored = 0;
    this.storage = new Array(this.SIZE);
    for (let keys in temp) {
      // reHash all the values
      this.set(keys, temp[keys]);
    }
  }
  // if stored is greater than 75%
  // store all key and values into a temp object
  // change hashTable to size x 2
  // re-SET all keys and values in the temp object
};

// TEST
// let hashTable = new HashTable();
// for (let i = 0; i < 30; i++) {
//   const key = 'key' + i;
//   const val = 'val' + i;
//   hashTable.set(key, val)
// }
// console.log(hashTable);

HashTable.prototype.get = function(key) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] && this.storage[index].key === key) {
    return this.storage[index].value;
  } else {
    let currentNode = this.storage[index];
    while (currentNode.next) {
      if (currentNode.next.key === key)
        return currentNode.next.value;
      currentNode = currentNode.next;
    }
  }
};

// returns and removes a value from the hash table
HashTable.prototype.remove = function(key) {
  if (key === undefined) { return undefined };
  let index = hashCode(key, this.SIZE)
  let hash = this.storage[index];
  if (hash === undefined) {
    return "No previously hashed value found for that key"
  }
  let currentNode = hash
  let returnValue;
  if (hash.key === key) {
    returnValue = hash.value;
    hash.value = undefined;
    hash.key = undefined;
    hash = hash.next;
  } else {
    // if there is a LL already at this position
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        returnValue = currentNode.next.value;
        currentNode.next = currentNode.next.next;
        break;
      }
      currentNode = currentNode.next;
      if (returnValue === undefined) {
        return "no previously hashed value found for that key"
      }
    }
  }
  // storage size tracking incremented here:
  this.stored -= 1
  // console.log('in remove this size', this.SIZE);
  // console.log(this.stored);
  if ((this.stored / this.SIZE) <= (1 / 4) && this.SIZE > 16) {
    let temp2 = {};
    // get all the values
    for (let ele in this.storage) {
      if (this.storage[ele]) {
        let current = this.storage[ele]
        while (current){
          temp2[current.key] = current.value
        current = current.next;
        }
      }
    }
    // reset storage:
    this.SIZE = this.SIZE / 2;
    // console.log('in remove this size', this.SIZE);
    // console.log('getting smaller')
    this.stored = 0;
    this.storage = new Array(this.SIZE);
    for (let keys in temp2) {
      // reHash all the values
      this.set(keys, temp2[keys])
    }
  }
    return returnValue;
};
// returns a number between 0 and size that is unique* and generated from the the inputted string
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0)
    return hash;
  for (let i = 0; i < string.length; i++) {
    let letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % size;
}
// console.log(hashCode('key', 16))
const test = new HashTable();

test.set('first key', 'first value');
// console.log(test);
// console.log(test.get('first key'));
// console.log(test.remove('first key'))
// console.log(test);

stressTest.reverseObject = function(object) {
  let result = {};
  for (key in object) {
    result[object[key]] = key;
  }
  return result;
}

/*
~ should reverse multiple properties
~ stressTest.reverseObject({a:1,b:2}) deepEqual {'1':'a','2':'b'}
*/

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(val) {
  this.value = val;
  this.next = null;
}

// adds node to end of list
LinkedList.prototype.push = function(value) {
  const node = new Node(value);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
    // console.log(node);
  }
};


// returns true if value is present in the list
LinkedList.prototype.contains = function(value) {
  let currNode = this.head;
  while (currNode) {
    if (currNode.value === value) {
      return true;
    } else {
      currNode = currNode.next
    }
  }
  return false;
};

// Bonus
// adds node to beginning of list
LinkedList.prototype.addToHead = function(value) {
  let currHead = this.head;
  let newHead = new Node(value);
  newHead.next = currHead;
  this.head = newHead;
};

// Extra Bonus
// insert an item at the position specified
LinkedList.prototype.insert = function(value, position) {
  let node = new Node(value);
  // let counter;
  // position--;
};

// Extra Bonus
// remove first occurrence of value from list
LinkedList.prototype.removeItem = function(value) {

};

// Extra Bonus
// remove element at specified position in list
LinkedList.prototype.removePosition = function(position) {

};

module.exports = stressTest
