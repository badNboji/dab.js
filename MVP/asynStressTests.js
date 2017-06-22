
// --------------------------------------------------------------------------------------------

// stressTest.delay = function(func, wait) {
//   //   setTimeout(function(arguments) {
//   //     let args = arguments;
//   //     let argsArray = [...args];
//   //     let slicedArgs = argsArray.slice(2);
//   //     for (let i = 0; i < slicedArgs.length; i++) {
//   //       func(slicedArgs[i]);
//   //     }
//   //   }, wait, arguments);
//   // }
//   // how to refactor with spread operator
//
//   // function delay(func, wait) {
//   //   setTimeout(function(arguments) {
//   //     var args = Array.prototype.slice.call(arguments, 2);
//   //     func.apply(null, args);
//   //   }, wait, arguments);
//   // }
//   let args = arguments;
//   let argsArray = [...args];
//   let slicedArgs = argsArray.slice(2);
//   setTimeout(func, wait, ...slicedArgs);
// }

test('delay', function (t) {
 let count = 0;
      stressTest.delay(() => count++, 50);
setTimeout(() => { t.equal(count, 0, 'Error: delay')}, 49);
// no done
setTimeout(() => { t.equal(count, 1, 'Error: delay')}, 49);
t.end();
});

// TAPE EQUIVALENT IS ABOVE

// describe('delay', () => {
//   it('should only execute the function after the specified wait time', (done) => {
//     let count = 0;
//     delay(() => count++, 50);
//     setTimeout(() => expect(count).to.eql(0), 49);
//     setTimeout(() => {
//       expect(count).to.eql(1);
//       done();
//     }, 51);
//   });

//
// ~ delay - should only execute after wait time
// ~v: let count = 0;
// stressTest.delay(() => count++, 50);
// setTimeout(() => { ~ count equal 0
// ~v: }, 49);
// ~v: setTimeout(() => {
// ~ count equal 1
// ~v: }, 51);
//
//
//
// ~ delay should pass func args in
// ~v: let count = 0
//      let count2 = 0;
//      delay((num, num2) => {
//        count += num;
//        count2 += num2;
//      }, 50, 5, 2);
// ~v: setTimeout(() => { ~ count equal 5;
// ~ count2 equal 0;
// }, 49);
//
// setTimeout(() => { ~ count equal 5;
// ~ count2 equal 0;
// }, 51);
//
//


//   it('should have successfully passed function arguments in', (done) => {
//     let count = 0
//     let count2 = 0;
//     delay((num, num2) => {
//       count += num;
//       count2 += num2;
//     }, 50, 5, 2);
//     setTimeout(() => {
//       expect(count).to.eql(0);
//       expect(count2).to.eql(0);
//     }, 49);
//     setTimeout(() => {
//       expect(count).to.eql(5);
//       expect(count2).to.eql(2);
//       done();
//     }, 51);
//   });
// });
//
// // flattenDeep
// stressTest.flattenDeep(array) {
//   // let result = [];
//   // array.map(function flatten(item1) {
//   //   if (!Array.isArray(item1)) {
//   //     result.push(item1);
//   //   } // end if statement
//   //   else if (Array.isArray(item1)) {
//   //     item1.map(function(item2) {
//   //       flatten(item2);
//   //     })
//   //   }
//   // }); // end first map
//   // return result;
//
//   return array.reduce((a, c) => c.constructor === Array ? a.concat(flattenDeep(c)) : a.concat(c), []);
// }
//
// stressTest.throttle(func, wait) {
//   // let go = false;
//   // setTimeout(function goFunc() {
//   //   go = true;
//   //   return function returnfunc(input) {
//   //     if (go) {
//   //       return func(input)
//   //     }
//   //   }
//   // }, wait);
//
//   // let go = false;
//   // return function() {
//   //   if (go = false) {
//   //     go = true;
//   //     return func();
//   //   }
//   //   setTimeout(function() {
//   //     go = false;
//   //   }, wait);
//   // };
//
//   // solution
//   let lastCalled = 0;
//   return (...args) => {
//     const now = Date.now();
//     if (now - lastCalled >= wait) {
//       lastCalled = now;
//       return func(...args);
//     }
//   };
// }
//
// describe("throttle", () => {
//   it('throttled functions should only be able to be called again after the specified time', (done) => {
//     let counter = 0;
//     const incr = () => counter++;
//     const throttledIncr = throttle(incr, 32);
//
//     throttledIncr();
//     throttledIncr();
//     expect(counter).to.eql(1);
//     setTimeout(() => {
//       throttledIncr();
//       expect(counter).to.eql(2);
//       done();
//     },33);
//   });
//
//   it('throttled functions return their value', (done) => {
//     let counter = 0;
//     const incr = () => ++counter;
//     const throttledIncr = throttle(incr, 32);
//     const result = throttledIncr();
//     setTimeout(() => {
//       expect(result).to.eql(1);
//       expect(counter).to.eql(1);
//       done();
//     }, 64);
//   });
//
//   it('throttled functions called repeatedly should adhere to time limitations', (done) => {
//     let counter = 0;
//     const incr = () => ++counter;
//     const throttledIncr = throttle(incr, 64);
//     const results = [];
//     const saveResult = () => results.push(throttledIncr());
//     saveResult();
//     saveResult();
//     setTimeout(saveResult, 32);
//     setTimeout(saveResult, 80);
//     setTimeout(saveResult, 96);
//     setTimeout(saveResult, 180);
//     setTimeout(() => {
//       expect(results[0]).to.eql(1);
//       expect(results[1]).to.be(undefined);
//       expect(results[2]).to.be(undefined);
//       expect(results[3]).to.eql(2);
//       expect(results[4]).to.be(undefined);
//       expect(results[5]).to.eql(3);
//       done();
//     }, 192);
//   });
// });
