/* Tape */

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
~ reverseObject({a:1,b:2})) equal {'1':'a','2':'b','3':'c'}
*/

// it('should reverse multiple properties', () => {
//   expect(reverseObject({a:1,b:2})).to.eql({'1':'a','2':'b'});
//   expect(reverseObject({a:1,b:2,c:3})).to.eql({'1':'a','2':'b','3':'c'});
// });

stressTest.filter(collection, callback) {
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

it('should return all odd numbers in an array', () => {
  const odds = filter([1, 2, 3, 4, 5, 6], num => num % 2 !== 0);
  expect(odds).to.eql([1, 3, 5]);
});

it('should filter all odd values in object', () => {
  const evens = filter({a:1, b:2, c:3, d:4}, (value, key, collection) => value % 2 !== 0);
  expect(evens).to.eql({a:1, c:3});
});

it('should not mutate the input array', () => {
  let numbers = [1, 2, 3, 4];
  let duplicatedThroughFilter = filter(numbers, () => true);
  expect(numbers).to.not.equal(duplicatedThroughFilter);
});

stressTest.memoize(func) {
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

describe('memoize', () => {
  let fib, fastFib, timeCheck, fastTimeCheck, add, fastAdd, wait;

  beforeEach(() => {
    fib = (n) => (n < 2) ? n : fib(n - 1) + fib(n - 2);
    fastFib = memoize(fib);
    timeCheck = (str) => str + Date.now();
    fastTimeCheck = memoize(timeCheck);
    add = (a, b, c) => a + b + c;
    fastAdd = memoize(add);

    // Synchronous sleep: terrible for web development, awesome for testing memoize
    wait = (t) => {
      const start = Date.now();
      while ((Date.now() - start) < t) 'wait';
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', () => {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', () => {
    expect(fastFib(10)).to.not.equal(fastFib(7));
  });

  it('should not run the function twice for the same given argument', () => {
    const firstTime = timeCheck('shazaam!');
    wait(5);
    const secondTime = fastTimeCheck('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTimeCheck('shazaam!')).to.equal(secondTime);
  });

  it('should accept multiple arguments', () => {
    expect(add(10, 5, 4)).to.equal(19);
    expect(fastAdd(10, 5, 4)).to.equal(19);
  });

  it('should work with objects as arguments', () => {
    const firstTime = timeCheck({ foo: 'bar' });
    wait(5);
    const secondTime = fastTimeCheck({ foo: 'bar' });
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTimeCheck({ foo: 'bar' })).to.equal(secondTime);
    expect(fastTimeCheck({ foo: 'bar' })).to.not.equal(fastTimeCheck({ different: 'result' }));
  });

  it('should work with arrays as arguments', () => {
    const firstTime = timeCheck(['foo', 'bar']);
    wait(5);
    const secondTime = fastTimeCheck(['foo', 'bar']);
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTimeCheck(['foo', 'bar'])).to.equal(secondTime);
    expect(fastTimeCheck(['foo', 'bar'])).to.not.equal(fastTimeCheck(['different', 'results']));
  });
});

stressTest.delay(func, wait) {
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

describe('delay', () => {
  it('should only execute the function after the specified wait time', (done) => {
    let count = 0;
    delay(() => count++, 50);
    setTimeout(() => expect(count).to.eql(0), 49);
    setTimeout(() => {
      expect(count).to.eql(1);
      done();
    }, 51);
  });

  it('should have successfully passed function arguments in', (done) => {
    let count = 0
    let count2 = 0;
    delay((num, num2) => {
      count += num;
      count2 += num2;
    }, 50, 5, 2);
    setTimeout(() => {
      expect(count).to.eql(0);
      expect(count2).to.eql(0);
    }, 49);
    setTimeout(() => {
      expect(count).to.eql(5);
      expect(count2).to.eql(2);
      done();
    }, 51);
  });
});

// flattenDeep
stressTest.flattenDeep(array) {
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

stressTest.throttle(func, wait) {
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

describe("throttle", () => {
  it('throttled functions should only be able to be called again after the specified time', (done) => {
    let counter = 0;
    const incr = () => counter++;
    const throttledIncr = throttle(incr, 32);

    throttledIncr();
    throttledIncr();
    expect(counter).to.eql(1);
    setTimeout(() => {
      throttledIncr();
      expect(counter).to.eql(2);
      done();
    },33);
  });

  it('throttled functions return their value', (done) => {
    let counter = 0;
    const incr = () => ++counter;
    const throttledIncr = throttle(incr, 32);
    const result = throttledIncr();
    setTimeout(() => {
      expect(result).to.eql(1);
      expect(counter).to.eql(1);
      done();
    }, 64);
  });

  it('throttled functions called repeatedly should adhere to time limitations', (done) => {
    let counter = 0;
    const incr = () => ++counter;
    const throttledIncr = throttle(incr, 64);
    const results = [];
    const saveResult = () => results.push(throttledIncr());
    saveResult();
    saveResult();
    setTimeout(saveResult, 32);
    setTimeout(saveResult, 80);
    setTimeout(saveResult, 96);
    setTimeout(saveResult, 180);
    setTimeout(() => {
      expect(results[0]).to.eql(1);
      expect(results[1]).to.be(undefined);
      expect(results[2]).to.be(undefined);
      expect(results[3]).to.eql(2);
      expect(results[4]).to.be(undefined);
      expect(results[5]).to.eql(3);
      done();
    }, 192);
  });
});
