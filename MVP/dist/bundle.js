/*! For license information please see ../tests/tape-test-sample.js */
(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 1);
})([ function(module, exports, __webpack_require__) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }
    var stressTest = {};
    stressTest.filter = function(collection, callback) {
        if (Array.isArray(collection)) {
            var filtered = [];
            collection.forEach(function(v, i, a) {
                if (callback(collection[i], i, collection)) {
                    filtered.push(collection[i]);
                }
            });
            return filtered;
        } else {
            var _filtered = {};
            for (key in collection) {
                if (callback(collection[key], key, collection)) {
                    _filtered[key] = collection[key];
                }
            }
            return _filtered;
        }
    };
    stressTest.memoize = function(func) {
        var cache = {};
        return function() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }
            var args = params.map(function(e) {
                return JSON.stringify(e);
            });
            if (cache[args]) return cache[args]; else {
                cache[args] = func.apply(undefined, params);
                return cache[args];
            }
        };
    };
    stressTest.delay = function(func, wait) {
        var args = arguments;
        var argsArray = [].concat(_toConsumableArray(args));
        var slicedArgs = argsArray.slice(2);
        setTimeout.apply(undefined, [ func, wait ].concat(_toConsumableArray(slicedArgs)));
    };
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
    function repeat(string, count) {
        var newstr = "";
        for (var i = 0; i < count; i++) {
            newstr += string;
        }
        return newstr;
    }
    function reverseString(string) {
        return string.split("").reverse().join("");
    }
    function reverseObject(object) {
        var result = {};
        for (key in object) {
            result[object[key]] = key;
        }
        return result;
    }
    function isNumber(value) {
        return value.constructor === Number ? true : false;
    }
    function isArray(value) {
        return Array.isArray(value) ? true : false;
    }
    function isObject(value) {
        return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? true : false;
    }
    function isNull(value) {
        return value === null ? true : false;
    }
    function clone(object) {
        var cloneObject = {};
        var cloneArray = [];
        if (Array.isArray(object)) {
            object.forEach(function(item) {
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
    function size(collection) {
        return Array.isArray(collection) ? collection.length : Object.keys(collection).length;
    }
    function indexOf(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }
    function drop(array) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return array.slice(n);
    }
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
    function take(array) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return array.slice(0, n);
    }
    function difference(array1, array2) {
        return array1.filter(function(item) {
            return array2.indexOf(item) === -1;
        });
    }
    function forEach(array, callback) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }
    function forEachRight(array, callback) {
        for (var i = array.length - 1; i >= 0; i--) {
            callback(array[i], i, array);
        }
    }
    function map(array, callback) {
        var result = [];
        array.forEach(function(v, i, a) {
            result.push(callback(v, i, a));
        });
        return result;
    }
    function filter(collection, callback) {
        if (Array.isArray(collection)) {
            var filtered = [];
            collection.forEach(function(v, i, a) {
                if (callback(collection[i], i, collection)) {
                    filtered.push(collection[i]);
                }
            });
            return filtered;
        } else {
            var _filtered2 = {};
            for (key in collection) {
                if (callback(collection[key], key, collection)) {
                    _filtered2[key] = collection[key];
                }
            }
            return _filtered2;
        }
    }
    function reject(collection, callback) {
        if (Array.isArray(collection)) {
            var filtered = [];
            collection.forEach(function(v, i, a) {
                if (!callback(collection[i], i, collection)) {
                    filtered.push(collection[i]);
                }
            });
            return filtered;
        } else {
            var _filtered3 = {};
            for (key in collection) {
                if (!callback(collection[key], key, collection)) {
                    _filtered3[key] = collection[key];
                }
            }
            return _filtered3;
        }
    }
    function uniq(array) {
        return array.filter(function(item, index) {
            return array.indexOf(item) === index;
        });
    }
    function pluck(array, key) {
        var result = [];
        array.forEach(function(v) {
            result.push(v[key]);
        });
        return result;
    }
    function trim(string) {
        var i = 0;
        var j = string.length - 1;
        while (string.charAt(i) === " ") {
            i++;
        }
        while (string.charAt(j) === " ") {
            j--;
        }
        return string.slice(i, j + 1);
    }
    function reduce(array, callback, start) {
        var acc = start;
        if (start === undefined) {
            acc = array[0];
            for (var i = 1; i < array.length; i++) {
                acc = callback(acc, array[i]);
            }
            return acc;
        } else {
            for (var _i = 0; _i < array.length; _i++) {
                acc = callback(acc, array[_i]);
            }
            return acc;
        }
    }
    function flatten(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                result = result.concat(array[i]);
            } else {
                result.push(array[i]);
            }
        }
        return result;
    }
    function flattenDeep(array) {
        return array.reduce(function(a, c) {
            return c.constructor === Array ? a.concat(flattenDeep(c)) : a.concat(c);
        }, []);
    }
    function extend() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        return args.reduce(function(acc, val) {
            for (key in val) {
                acc[key] = val[key];
            }
            return acc;
        });
    }
    function isString(value) {
        return typeof value === "string" ? true : false;
    }
    function cloneDeep(arrObj) {
        var keys = Object.keys(arrObj);
        var cloned = {};
        keys.forEach(function(e) {
            if (_typeof(arrObj[e]) === "object") {
                cloned[e] = cloneDeep(arrObj[e]);
            } else {
                cloned[e] = arrObj[e];
            }
        });
        return cloned;
    }
    function applyAndEmpty(input, queue) {
        for (var i = 0; i < queue.length; i++) {
            input = queue[i](input);
        }
        return input;
    }
    function once(func) {
        var result = void 0;
        var isFirst = true;
        return function returnedFunc(input) {
            if (isFirst) {
                result = func(input);
                isFirst = false;
            }
            return result;
        };
    }
    function memoize(func) {
        var cache = {};
        return function() {
            for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                params[_key3] = arguments[_key3];
            }
            var args = params.map(function(e) {
                return JSON.stringify(e);
            });
            if (cache[args]) return cache[args]; else {
                cache[args] = func.apply(undefined, params);
                return cache[args];
            }
        };
    }
    function delay(func, wait) {
        var args = arguments;
        var argsArray = [].concat(_toConsumableArray(args));
        var slicedArgs = argsArray.slice(2);
        setTimeout.apply(undefined, [ func, wait ].concat(_toConsumableArray(slicedArgs)));
    }
    function throttle(func, wait) {
        var lastCalled = 0;
        return function() {
            var now = Date.now();
            if (now - lastCalled >= wait) {
                lastCalled = now;
                return func.apply(undefined, arguments);
            }
        };
    }
    function sortBy(array, iterator) {
        return array.sort(function(a, b) {
            return iterator(a) - iterator(b);
        });
    }
    function range(start, stop, step) {}
    function partition(array, predicate) {}
    function same(a, b) {
        return a.filter(function(e) {
            return b.includes(e);
        });
    }
    function intersection() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }
        return args.reduce(function(acc, curr) {
            return same(acc, curr);
        });
    }
    function zip() {}
    function after(count, func) {}
    function before(count, func) {}
    function arrayFactory(length, processor) {}
    function Bode(key, val) {
        this.value = val;
        this.next = null;
        this.key = key;
    }
    function HashTable() {
        this.SIZE = 16;
        this.stored = 0;
        this.storage = new Array(this.SIZE);
    }
    HashTable.prototype.set = function(key, value) {
        var index = hashCode(key, this.SIZE);
        var newBode = new Bode(key, value);
        var currentNode = this.storage[index];
        if (!this.storage[index]) {
            this.storage[index] = newBode;
        } else {
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newBode;
        }
        this.stored += 1;
        if (this.stored / this.SIZE > 3 / 4) {
            var temp = {};
            for (var ele in this.storage) {
                if (this.storage[ele]) var current = this.storage[ele];
                while (current) {
                    temp[current.key] = current.value;
                    current = current.next;
                }
            }
            this.SIZE = this.SIZE * 2;
            this.stored = 0;
            this.storage = new Array(this.SIZE);
            for (var keys in temp) {
                this.set(keys, temp[keys]);
            }
        }
    };
    HashTable.prototype.get = function(key) {
        var index = hashCode(key, this.SIZE);
        if (this.storage[index] && this.storage[index].key === key) {
            return this.storage[index].value;
        } else {
            var currentNode = this.storage[index];
            while (currentNode.next) {
                if (currentNode.next.key === key) return currentNode.next.value;
                currentNode = currentNode.next;
            }
        }
    };
    HashTable.prototype.remove = function(key) {
        if (key === undefined) {
            return undefined;
        }
        var index = hashCode(key, this.SIZE);
        var hash = this.storage[index];
        if (hash === undefined) {
            return "No previously hashed value found for that key";
        }
        var currentNode = hash;
        var returnValue = void 0;
        if (hash.key === key) {
            returnValue = hash.value;
            hash.value = undefined;
            hash.key = undefined;
            hash = hash.next;
        } else {
            while (currentNode.next) {
                if (currentNode.next.key === key) {
                    returnValue = currentNode.next.value;
                    currentNode.next = currentNode.next.next;
                    break;
                }
                currentNode = currentNode.next;
                if (returnValue === undefined) {
                    return "no previously hashed value found for that key";
                }
            }
        }
        this.stored -= 1;
        if (this.stored / this.SIZE <= 1 / 4 && this.SIZE > 16) {
            var temp2 = {};
            for (var ele in this.storage) {
                if (this.storage[ele]) {
                    var current = this.storage[ele];
                    while (current) {
                        temp2[current.key] = current.value;
                        current = current.next;
                    }
                }
            }
            this.SIZE = this.SIZE / 2;
            this.stored = 0;
            this.storage = new Array(this.SIZE);
            for (var keys in temp2) {
                this.set(keys, temp2[keys]);
            }
        }
        return returnValue;
    };
    function hashCode(string, size) {
        var hash = 0;
        if (string.length === 0) return hash;
        for (var i = 0; i < string.length; i++) {
            var letter = string.charCodeAt(i);
            hash = (hash << 5) - hash + letter;
            hash = hash & hash;
        }
        return Math.abs(hash) % size;
    }
    var test = new HashTable();
    test.set("first key", "first value");
    stressTest.reverseObject = function(object) {
        var result = {};
        for (key in object) {
            result[object[key]] = key;
        }
        return result;
    };
    function LinkedList() {
        this.head = null;
        this.tail = null;
    }
    function Node(val) {
        this.value = val;
        this.next = null;
    }
    LinkedList.prototype.push = function(value) {
        var node = new Node(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    };
    LinkedList.prototype.contains = function(value) {
        var currNode = this.head;
        while (currNode) {
            if (currNode.value === value) {
                return true;
            } else {
                currNode = currNode.next;
            }
        }
        return false;
    };
    LinkedList.prototype.addToHead = function(value) {
        var currHead = this.head;
        var newHead = new Node(value);
        newHead.next = currHead;
        this.head = newHead;
    };
    LinkedList.prototype.insert = function(value, position) {
        var node = new Node(value);
    };
    LinkedList.prototype.removeItem = function(value) {};
    LinkedList.prototype.removePosition = function(position) {};
    module.exports = stressTest;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var stressTest = __webpack_require__(0);
} ]);