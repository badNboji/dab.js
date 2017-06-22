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
~ stressTest.reverseObject({a:1,b:2}) deepEqual {'1':'a','2':'b'}
*/

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

module.exports = stressTest
