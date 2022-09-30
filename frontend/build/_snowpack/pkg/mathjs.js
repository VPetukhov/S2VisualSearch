import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './common/_commonjsHelpers-8c19dec8.js';

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}

module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _extends = /*@__PURE__*/getDefaultExportFromCjs(_extends_1);

var DEFAULT_CONFIG = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  epsilon: 1e-12,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: 'Matrix',
  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
  number: 'number',
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: false,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};

// type checks for all known types
//
// note that:
//
// - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
//   instanceof cannot be used because that would not allow to pass data from
//   one instance of math.js to another since each has it's own instance of Unit.
// - check the `isUnit` property via the constructor, so there will be no
//   matches for "fake" instances like plain objects with a property `isUnit`.
//   That is important for security reasons.
// - It must not be possible to override the type checks used internally,
//   for security reasons, so these functions are not exposed in the expression
//   parser.
function isNumber(x) {
  return typeof x === 'number';
}
function isBigNumber(x) {
  if (!x || typeof x !== 'object' || typeof x.constructor !== 'function') {
    return false;
  }

  if (x.isBigNumber === true && typeof x.constructor.prototype === 'object' && x.constructor.prototype.isBigNumber === true) {
    return true;
  }

  if (typeof x.constructor.isDecimal === 'function' && x.constructor.isDecimal(x) === true) {
    return true;
  }

  return false;
}
function isComplex(x) {
  return x && typeof x === 'object' && Object.getPrototypeOf(x).isComplex === true || false;
}
function isFraction(x) {
  return x && typeof x === 'object' && Object.getPrototypeOf(x).isFraction === true || false;
}
function isUnit(x) {
  return x && x.constructor.prototype.isUnit === true || false;
}
function isString(x) {
  return typeof x === 'string';
}
var isArray = Array.isArray;
function isMatrix(x) {
  return x && x.constructor.prototype.isMatrix === true || false;
}
/**
 * Test whether a value is a collection: an Array or Matrix
 * @param {*} x
 * @returns {boolean} isCollection
 */

function isCollection(x) {
  return Array.isArray(x) || isMatrix(x);
}
function isDenseMatrix(x) {
  return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isSparseMatrix(x) {
  return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isRange(x) {
  return x && x.constructor.prototype.isRange === true || false;
}
function isIndex(x) {
  return x && x.constructor.prototype.isIndex === true || false;
}
function isBoolean(x) {
  return typeof x === 'boolean';
}
function isResultSet(x) {
  return x && x.constructor.prototype.isResultSet === true || false;
}
function isHelp(x) {
  return x && x.constructor.prototype.isHelp === true || false;
}
function isFunction(x) {
  return typeof x === 'function';
}
function isDate(x) {
  return x instanceof Date;
}
function isRegExp(x) {
  return x instanceof RegExp;
}
function isObject(x) {
  return !!(x && typeof x === 'object' && x.constructor === Object && !isComplex(x) && !isFraction(x));
}
function isNull(x) {
  return x === null;
}
function isUndefined(x) {
  return x === undefined;
}
function isAccessorNode(x) {
  return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
}
function isArrayNode(x) {
  return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
}
function isAssignmentNode(x) {
  return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isBlockNode(x) {
  return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
}
function isConditionalNode(x) {
  return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
}
function isConstantNode(x) {
  return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionAssignmentNode(x) {
  return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionNode(x) {
  return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
}
function isIndexNode(x) {
  return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
}
function isNode(x) {
  return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
}
function isObjectNode(x) {
  return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
}
function isOperatorNode(x) {
  return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
}
function isParenthesisNode(x) {
  return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
}
function isRangeNode(x) {
  return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
}
function isRelationalNode(x) {
  return x && x.isRelationalNode === true && x.constructor.prototype.isNode === true || false;
}
function isSymbolNode(x) {
  return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
}
function isChain(x) {
  return x && x.constructor.prototype.isChain === true || false;
}
function typeOf(x) {
  var t = typeof x;

  if (t === 'object') {
    if (x === null) return 'null';
    if (isBigNumber(x)) return 'BigNumber'; // Special: weird mashup with Decimal

    if (x.constructor && x.constructor.name) return x.constructor.name;
    return 'Object'; // just in case
  }

  return t; // can be 'string', 'number', 'boolean', 'function', 'bigint', ...
}

/**
 * Clone an object
 *
 *     clone(x)
 *
 * Can clone any primitive type, array, and object.
 * If x has a function clone, this function will be invoked to clone the object.
 *
 * @param {*} x
 * @return {*} clone
 */

function clone(x) {
  var type = typeof x; // immutable primitive types

  if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
    return x;
  } // use clone function of the object when available


  if (typeof x.clone === 'function') {
    return x.clone();
  } // array


  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone(value);
    });
  }

  if (x instanceof Date) return new Date(x.valueOf());
  if (isBigNumber(x)) return x; // bignumbers are immutable

  if (x instanceof RegExp) throw new TypeError('Cannot clone ' + x); // TODO: clone a RegExp
  // object

  return mapObject(x, clone);
}
/**
 * Apply map to all properties of an object
 * @param {Object} object
 * @param {function} callback
 * @return {Object} Returns a copy of the object with mapped properties
 */

function mapObject(object, callback) {
  var clone = {};

  for (var key in object) {
    if (hasOwnProperty(object, key)) {
      clone[key] = callback(object[key]);
    }
  }

  return clone;
}
/**
 * Extend object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 */

function extend(a, b) {
  for (var prop in b) {
    if (hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }

  return a;
}
/**
 * Deep test equality of all fields in two pairs of arrays or objects.
 * Compares values and functions strictly (ie. 2 is not the same as '2').
 * @param {Array | Object} a
 * @param {Array | Object} b
 * @returns {boolean}
 */

function deepStrictEqual(a, b) {
  var prop, i, len;

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (i = 0, len = a.length; i < len; i++) {
      if (!deepStrictEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  } else if (typeof a === 'function') {
    return a === b;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }

    for (prop in a) {
      // noinspection JSUnfilteredForInLoop
      if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
        return false;
      }
    }

    for (prop in b) {
      // noinspection JSUnfilteredForInLoop
      if (!(prop in a)) {
        return false;
      }
    }

    return true;
  } else {
    return a === b;
  }
}
/**
 * A safe hasOwnProperty
 * @param {Object} object
 * @param {string} property
 */

function hasOwnProperty(object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}
/**
 * Shallow version of pick, creating an object composed of the picked object properties
 * but not for nested properties
 * @param {Object} object
 * @param {string[]} properties
 * @return {Object}
 */

function pickShallow(object, properties) {
  var copy = {};

  for (var i = 0; i < properties.length; i++) {
    var key = properties[i];
    var value = object[key];

    if (value !== undefined) {
      copy[key] = value;
    }
  }

  return copy;
}

var MATRIX_OPTIONS = ['Matrix', 'Array']; // valid values for option matrix

var NUMBER_OPTIONS = ['number', 'BigNumber', 'Fraction']; // valid values for option number

var config = /* #__PURE__ */function config(options) {
  if (options) {
    throw new Error('The global config is readonly. \n' + 'Please create a mathjs instance if you want to change the default configuration. \n' + 'Example:\n' + '\n' + '  import { create, all } from \'mathjs\';\n' + '  const mathjs = create(all);\n' + '  mathjs.config({ number: \'BigNumber\' });\n');
  }

  return Object.freeze(DEFAULT_CONFIG);
};

_extends(config, DEFAULT_CONFIG, {
  MATRIX_OPTIONS,
  NUMBER_OPTIONS
});

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return {s: F, n: function n() {
        if (i >= o.length)
          return {done: true};
        return {done: false, value: o[i++]};
      }, e: function e(_e) {
        throw _e;
      }, f: F};
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  }};
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function ok() {
  return true;
}
function notOk() {
  return false;
}
function undef() {
  return void 0;
}
var NOT_TYPED_FUNCTION = "Argument is not a typed-function.";
function create() {
  function isPlainObject(x) {
    return _typeof(x) === "object" && x !== null && x.constructor === Object;
  }
  var _types = [{
    name: "number",
    test: function test(x) {
      return typeof x === "number";
    }
  }, {
    name: "string",
    test: function test(x) {
      return typeof x === "string";
    }
  }, {
    name: "boolean",
    test: function test(x) {
      return typeof x === "boolean";
    }
  }, {
    name: "Function",
    test: function test(x) {
      return typeof x === "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function test(x) {
      return x instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function test(x) {
      return x instanceof RegExp;
    }
  }, {
    name: "Object",
    test: isPlainObject
  }, {
    name: "null",
    test: function test(x) {
      return x === null;
    }
  }, {
    name: "undefined",
    test: function test(x) {
      return x === void 0;
    }
  }];
  var anyType = {
    name: "any",
    test: ok,
    isAny: true
  };
  var typeMap;
  var typeList;
  var nConversions = 0;
  var typed = {
    createCount: 0
  };
  function findType(typeName) {
    var type = typeMap.get(typeName);
    if (type) {
      return type;
    }
    var message = 'Unknown type "' + typeName + '"';
    var name = typeName.toLowerCase();
    var otherName;
    var _iterator = _createForOfIteratorHelper(typeList), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        otherName = _step.value;
        if (otherName.toLowerCase() === name) {
          message += '. Did you mean "' + otherName + '" ?';
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    throw new TypeError(message);
  }
  function addTypes(types) {
    var beforeSpec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    var beforeIndex = beforeSpec ? findType(beforeSpec).index : typeList.length;
    var newTypes = [];
    for (var i = 0; i < types.length; ++i) {
      if (!types[i] || typeof types[i].name !== "string" || typeof types[i].test !== "function") {
        throw new TypeError("Object with properties {name: string, test: function} expected");
      }
      var typeName = types[i].name;
      if (typeMap.has(typeName)) {
        throw new TypeError('Duplicate type name "' + typeName + '"');
      }
      newTypes.push(typeName);
      typeMap.set(typeName, {
        name: typeName,
        test: types[i].test,
        isAny: types[i].isAny,
        index: beforeIndex + i,
        conversionsTo: []
      });
    }
    var affectedTypes = typeList.slice(beforeIndex);
    typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
    for (var _i = beforeIndex + newTypes.length; _i < typeList.length; ++_i) {
      typeMap.get(typeList[_i]).index = _i;
    }
  }
  function clear() {
    typeMap = new Map();
    typeList = [];
    nConversions = 0;
    addTypes([anyType], false);
  }
  clear();
  addTypes(_types);
  function clearConversions() {
    var typeName;
    var _iterator2 = _createForOfIteratorHelper(typeList), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        typeName = _step2.value;
        typeMap.get(typeName).conversionsTo = [];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    nConversions = 0;
  }
  function findTypeNames(value) {
    var matches = typeList.filter(function(name) {
      var type = typeMap.get(name);
      return !type.isAny && type.test(value);
    });
    if (matches.length) {
      return matches;
    }
    return ["any"];
  }
  function isTypedFunction(entity) {
    return entity && typeof entity === "function" && "_typedFunctionData" in entity;
  }
  function findSignature(fn, signature, options) {
    if (!isTypedFunction(fn)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    var exact = options && options.exact;
    var stringSignature = Array.isArray(signature) ? signature.join(",") : signature;
    var params = parseSignature(stringSignature);
    var canonicalSignature = stringifyParams(params);
    if (!exact || canonicalSignature in fn.signatures) {
      var match = fn._typedFunctionData.signatureMap.get(canonicalSignature);
      if (match) {
        return match;
      }
    }
    var nParams = params.length;
    var remainingSignatures;
    if (exact) {
      remainingSignatures = [];
      var name;
      for (name in fn.signatures) {
        remainingSignatures.push(fn._typedFunctionData.signatureMap.get(name));
      }
    } else {
      remainingSignatures = fn._typedFunctionData.signatures;
    }
    for (var i = 0; i < nParams; ++i) {
      var want = params[i];
      var filteredSignatures = [];
      var possibility = void 0;
      var _iterator3 = _createForOfIteratorHelper(remainingSignatures), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          possibility = _step3.value;
          var have = getParamAtIndex(possibility.params, i);
          if (!have || want.restParam && !have.restParam) {
            continue;
          }
          if (!have.hasAny) {
            var _ret = function() {
              var haveTypes = paramTypeSet(have);
              if (want.types.some(function(wtype) {
                return !haveTypes.has(wtype.name);
              })) {
                return "continue";
              }
            }();
            if (_ret === "continue")
              continue;
          }
          filteredSignatures.push(possibility);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      remainingSignatures = filteredSignatures;
      if (remainingSignatures.length === 0)
        break;
    }
    var candidate;
    var _iterator4 = _createForOfIteratorHelper(remainingSignatures), _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
        candidate = _step4.value;
        if (candidate.params.length <= nParams) {
          return candidate;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    throw new TypeError("Signature not found (signature: " + (fn.name || "unnamed") + "(" + stringifyParams(params, ", ") + "))");
  }
  function find(fn, signature, options) {
    return findSignature(fn, signature, options).implementation;
  }
  function convert(value, typeName) {
    var type = findType(typeName);
    if (type.test(value)) {
      return value;
    }
    var conversions = type.conversionsTo;
    if (conversions.length === 0) {
      throw new Error("There are no conversions to " + typeName + " defined.");
    }
    for (var i = 0; i < conversions.length; i++) {
      var fromType = findType(conversions[i].from);
      if (fromType.test(value)) {
        return conversions[i].convert(value);
      }
    }
    throw new Error("Cannot convert " + value + " to " + typeName);
  }
  function stringifyParams(params) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return params.map(function(p) {
      return p.name;
    }).join(separator);
  }
  function parseParam(param) {
    var restParam = param.indexOf("...") === 0;
    var types = !restParam ? param : param.length > 3 ? param.slice(3) : "any";
    var typeDefs = types.split("|").map(function(s) {
      return findType(s.trim());
    });
    var hasAny = false;
    var paramName = restParam ? "..." : "";
    var exactTypes = typeDefs.map(function(type) {
      hasAny = type.isAny || hasAny;
      paramName += type.name + "|";
      return {
        name: type.name,
        typeIndex: type.index,
        test: type.test,
        isAny: type.isAny,
        conversion: null,
        conversionIndex: -1
      };
    });
    return {
      types: exactTypes,
      name: paramName.slice(0, -1),
      hasAny,
      hasConversion: false,
      restParam
    };
  }
  function expandParam(param) {
    var typeNames = param.types.map(function(t) {
      return t.name;
    });
    var matchingConversions = availableConversions(typeNames);
    var hasAny = param.hasAny;
    var newName = param.name;
    var convertibleTypes = matchingConversions.map(function(conversion) {
      var type = findType(conversion.from);
      hasAny = type.isAny || hasAny;
      newName += "|" + conversion.from;
      return {
        name: conversion.from,
        typeIndex: type.index,
        test: type.test,
        isAny: type.isAny,
        conversion,
        conversionIndex: conversion.index
      };
    });
    return {
      types: param.types.concat(convertibleTypes),
      name: newName,
      hasAny,
      hasConversion: convertibleTypes.length > 0,
      restParam: param.restParam
    };
  }
  function paramTypeSet(param) {
    if (!param.typeSet) {
      param.typeSet = new Set();
      param.types.forEach(function(type) {
        return param.typeSet.add(type.name);
      });
    }
    return param.typeSet;
  }
  function parseSignature(rawSignature) {
    var params = [];
    if (typeof rawSignature !== "string") {
      throw new TypeError("Signatures must be strings");
    }
    var signature = rawSignature.trim();
    if (signature === "") {
      return params;
    }
    var rawParams = signature.split(",");
    for (var i = 0; i < rawParams.length; ++i) {
      var parsedParam = parseParam(rawParams[i].trim());
      if (parsedParam.restParam && i !== rawParams.length - 1) {
        throw new SyntaxError('Unexpected rest parameter "' + rawParams[i] + '": only allowed for the last parameter');
      }
      if (parsedParam.types.length === 0) {
        return null;
      }
      params.push(parsedParam);
    }
    return params;
  }
  function hasRestParam(params) {
    var param = last(params);
    return param ? param.restParam : false;
  }
  function compileTest(param) {
    if (!param || param.types.length === 0) {
      return ok;
    } else if (param.types.length === 1) {
      return findType(param.types[0].name).test;
    } else if (param.types.length === 2) {
      var test0 = findType(param.types[0].name).test;
      var test1 = findType(param.types[1].name).test;
      return function or(x) {
        return test0(x) || test1(x);
      };
    } else {
      var tests = param.types.map(function(type) {
        return findType(type.name).test;
      });
      return function or(x) {
        for (var i = 0; i < tests.length; i++) {
          if (tests[i](x)) {
            return true;
          }
        }
        return false;
      };
    }
  }
  function compileTests(params) {
    var tests, test0, test1;
    if (hasRestParam(params)) {
      tests = initial(params).map(compileTest);
      var varIndex = tests.length;
      var lastTest = compileTest(last(params));
      var testRestParam = function testRestParam2(args) {
        for (var i = varIndex; i < args.length; i++) {
          if (!lastTest(args[i])) {
            return false;
          }
        }
        return true;
      };
      return function testArgs(args) {
        for (var i = 0; i < tests.length; i++) {
          if (!tests[i](args[i])) {
            return false;
          }
        }
        return testRestParam(args) && args.length >= varIndex + 1;
      };
    } else {
      if (params.length === 0) {
        return function testArgs(args) {
          return args.length === 0;
        };
      } else if (params.length === 1) {
        test0 = compileTest(params[0]);
        return function testArgs(args) {
          return test0(args[0]) && args.length === 1;
        };
      } else if (params.length === 2) {
        test0 = compileTest(params[0]);
        test1 = compileTest(params[1]);
        return function testArgs(args) {
          return test0(args[0]) && test1(args[1]) && args.length === 2;
        };
      } else {
        tests = params.map(compileTest);
        return function testArgs(args) {
          for (var i = 0; i < tests.length; i++) {
            if (!tests[i](args[i])) {
              return false;
            }
          }
          return args.length === tests.length;
        };
      }
    }
  }
  function getParamAtIndex(params, index) {
    return index < params.length ? params[index] : hasRestParam(params) ? last(params) : null;
  }
  function getTypeSetAtIndex(params, index) {
    var param = getParamAtIndex(params, index);
    if (!param) {
      return new Set();
    }
    return paramTypeSet(param);
  }
  function isExactType(type) {
    return type.conversion === null || type.conversion === void 0;
  }
  function mergeExpectedParams(signatures, index) {
    var typeSet = new Set();
    signatures.forEach(function(signature) {
      var paramSet = getTypeSetAtIndex(signature.params, index);
      var name;
      var _iterator5 = _createForOfIteratorHelper(paramSet), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          name = _step5.value;
          typeSet.add(name);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    });
    return typeSet.has("any") ? ["any"] : Array.from(typeSet);
  }
  function createError(name, args, signatures) {
    var err, expected;
    var _name = name || "unnamed";
    var matchingSignatures = signatures;
    var index;
    var _loop = function _loop2() {
      var nextMatchingDefs = [];
      matchingSignatures.forEach(function(signature) {
        var param = getParamAtIndex(signature.params, index);
        var test = compileTest(param);
        if ((index < signature.params.length || hasRestParam(signature.params)) && test(args[index])) {
          nextMatchingDefs.push(signature);
        }
      });
      if (nextMatchingDefs.length === 0) {
        expected = mergeExpectedParams(matchingSignatures, index);
        if (expected.length > 0) {
          var actualTypes = findTypeNames(args[index]);
          err = new TypeError("Unexpected type of argument in function " + _name + " (expected: " + expected.join(" or ") + ", actual: " + actualTypes.join(" | ") + ", index: " + index + ")");
          err.data = {
            category: "wrongType",
            fn: _name,
            index,
            actual: actualTypes,
            expected
          };
          return {
            v: err
          };
        }
      } else {
        matchingSignatures = nextMatchingDefs;
      }
    };
    for (index = 0; index < args.length; index++) {
      var _ret2 = _loop();
      if (_typeof(_ret2) === "object")
        return _ret2.v;
    }
    var lengths = matchingSignatures.map(function(signature) {
      return hasRestParam(signature.params) ? Infinity : signature.params.length;
    });
    if (args.length < Math.min.apply(null, lengths)) {
      expected = mergeExpectedParams(matchingSignatures, index);
      err = new TypeError("Too few arguments in function " + _name + " (expected: " + expected.join(" or ") + ", index: " + args.length + ")");
      err.data = {
        category: "tooFewArgs",
        fn: _name,
        index: args.length,
        expected
      };
      return err;
    }
    var maxLength = Math.max.apply(null, lengths);
    if (args.length > maxLength) {
      err = new TypeError("Too many arguments in function " + _name + " (expected: " + maxLength + ", actual: " + args.length + ")");
      err.data = {
        category: "tooManyArgs",
        fn: _name,
        index: args.length,
        expectedLength: maxLength
      };
      return err;
    }
    var argTypes = [];
    for (var i = 0; i < args.length; ++i) {
      argTypes.push(findTypeNames(args[i]).join("|"));
    }
    err = new TypeError('Arguments of type "' + argTypes.join(", ") + '" do not match any of the defined signatures of function ' + _name + ".");
    err.data = {
      category: "mismatch",
      actual: argTypes
    };
    return err;
  }
  function getLowestTypeIndex(param) {
    var min = typeList.length + 1;
    for (var i = 0; i < param.types.length; i++) {
      if (isExactType(param.types[i])) {
        min = Math.min(min, param.types[i].typeIndex);
      }
    }
    return min;
  }
  function getLowestConversionIndex(param) {
    var min = nConversions + 1;
    for (var i = 0; i < param.types.length; i++) {
      if (!isExactType(param.types[i])) {
        min = Math.min(min, param.types[i].conversionIndex);
      }
    }
    return min;
  }
  function compareParams(param1, param2) {
    if (param1.hasAny) {
      if (!param2.hasAny) {
        return 1;
      }
    } else if (param2.hasAny) {
      return -1;
    }
    if (param1.restParam) {
      if (!param2.restParam) {
        return 1;
      }
    } else if (param2.restParam) {
      return -1;
    }
    if (param1.hasConversion) {
      if (!param2.hasConversion) {
        return 1;
      }
    } else if (param2.hasConversion) {
      return -1;
    }
    var typeDiff = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
    if (typeDiff < 0) {
      return -1;
    }
    if (typeDiff > 0) {
      return 1;
    }
    var convDiff = getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
    if (convDiff < 0) {
      return -1;
    }
    if (convDiff > 0) {
      return 1;
    }
    return 0;
  }
  function compareSignatures(signature1, signature2) {
    var pars1 = signature1.params;
    var pars2 = signature2.params;
    var last1 = last(pars1);
    var last2 = last(pars2);
    var hasRest1 = hasRestParam(pars1);
    var hasRest2 = hasRestParam(pars2);
    if (hasRest1 && last1.hasAny) {
      if (!hasRest2 || !last2.hasAny) {
        return 1;
      }
    } else if (hasRest2 && last2.hasAny) {
      return -1;
    }
    var any1 = 0;
    var conv1 = 0;
    var par;
    var _iterator6 = _createForOfIteratorHelper(pars1), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        par = _step6.value;
        if (par.hasAny)
          ++any1;
        if (par.hasConversion)
          ++conv1;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    var any2 = 0;
    var conv2 = 0;
    var _iterator7 = _createForOfIteratorHelper(pars2), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        par = _step7.value;
        if (par.hasAny)
          ++any2;
        if (par.hasConversion)
          ++conv2;
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    if (any1 !== any2) {
      return any1 - any2;
    }
    if (hasRest1 && last1.hasConversion) {
      if (!hasRest2 || !last2.hasConversion) {
        return 1;
      }
    } else if (hasRest2 && last2.hasConversion) {
      return -1;
    }
    if (conv1 !== conv2) {
      return conv1 - conv2;
    }
    if (hasRest1) {
      if (!hasRest2) {
        return 1;
      }
    } else if (hasRest2) {
      return -1;
    }
    var lengthCriterion = (pars1.length - pars2.length) * (hasRest1 ? -1 : 1);
    if (lengthCriterion !== 0) {
      return lengthCriterion;
    }
    var comparisons = [];
    var tc = 0;
    for (var i = 0; i < pars1.length; ++i) {
      var thisComparison = compareParams(pars1[i], pars2[i]);
      comparisons.push(thisComparison);
      tc += thisComparison;
    }
    if (tc !== 0) {
      return tc;
    }
    var c;
    for (var _i2 = 0, _comparisons = comparisons; _i2 < _comparisons.length; _i2++) {
      c = _comparisons[_i2];
      if (c !== 0) {
        return c;
      }
    }
    return 0;
  }
  function availableConversions(typeNames) {
    if (typeNames.length === 0) {
      return [];
    }
    var types = typeNames.map(findType);
    if (typeNames.length > 1) {
      types.sort(function(t1, t2) {
        return t1.index - t2.index;
      });
    }
    var matches = types[0].conversionsTo;
    if (typeNames.length === 1) {
      return matches;
    }
    matches = matches.concat([]);
    var knownTypes = new Set(typeNames);
    for (var i = 1; i < types.length; ++i) {
      var newMatch = void 0;
      var _iterator8 = _createForOfIteratorHelper(types[i].conversionsTo), _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
          newMatch = _step8.value;
          if (!knownTypes.has(newMatch.from)) {
            matches.push(newMatch);
            knownTypes.add(newMatch.from);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
    return matches;
  }
  function compileArgsPreprocessing(params, fn) {
    var fnConvert = fn;
    if (params.some(function(p) {
      return p.hasConversion;
    })) {
      var restParam = hasRestParam(params);
      var compiledConversions = params.map(compileArgConversion);
      fnConvert = function convertArgs() {
        var args = [];
        var last2 = restParam ? arguments.length - 1 : arguments.length;
        for (var i = 0; i < last2; i++) {
          args[i] = compiledConversions[i](arguments[i]);
        }
        if (restParam) {
          args[last2] = arguments[last2].map(compiledConversions[last2]);
        }
        return fn.apply(this, args);
      };
    }
    var fnPreprocess = fnConvert;
    if (hasRestParam(params)) {
      var offset = params.length - 1;
      fnPreprocess = function preprocessRestParams() {
        return fnConvert.apply(this, slice(arguments, 0, offset).concat([slice(arguments, offset)]));
      };
    }
    return fnPreprocess;
  }
  function compileArgConversion(param) {
    var test0, test1, conversion0, conversion1;
    var tests = [];
    var conversions = [];
    param.types.forEach(function(type) {
      if (type.conversion) {
        tests.push(findType(type.conversion.from).test);
        conversions.push(type.conversion.convert);
      }
    });
    switch (conversions.length) {
      case 0:
        return function convertArg(arg) {
          return arg;
        };
      case 1:
        test0 = tests[0];
        conversion0 = conversions[0];
        return function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          return arg;
        };
      case 2:
        test0 = tests[0];
        test1 = tests[1];
        conversion0 = conversions[0];
        conversion1 = conversions[1];
        return function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          if (test1(arg)) {
            return conversion1(arg);
          }
          return arg;
        };
      default:
        return function convertArg(arg) {
          for (var i = 0; i < conversions.length; i++) {
            if (tests[i](arg)) {
              return conversions[i](arg);
            }
          }
          return arg;
        };
    }
  }
  function splitParams(params) {
    function _splitParams(params2, index, paramsSoFar) {
      if (index < params2.length) {
        var param = params2[index];
        var resultingParams = [];
        if (param.restParam) {
          var exactTypes = param.types.filter(isExactType);
          if (exactTypes.length < param.types.length) {
            resultingParams.push({
              types: exactTypes,
              name: "..." + exactTypes.map(function(t) {
                return t.name;
              }).join("|"),
              hasAny: exactTypes.some(function(t) {
                return t.isAny;
              }),
              hasConversion: false,
              restParam: true
            });
          }
          resultingParams.push(param);
        } else {
          resultingParams = param.types.map(function(type) {
            return {
              types: [type],
              name: type.name,
              hasAny: type.isAny,
              hasConversion: type.conversion,
              restParam: false
            };
          });
        }
        return flatMap(resultingParams, function(nextParam) {
          return _splitParams(params2, index + 1, paramsSoFar.concat([nextParam]));
        });
      } else {
        return [paramsSoFar];
      }
    }
    return _splitParams(params, 0, []);
  }
  function conflicting(params1, params2) {
    var ii = Math.max(params1.length, params2.length);
    for (var i = 0; i < ii; i++) {
      var typeSet1 = getTypeSetAtIndex(params1, i);
      var typeSet2 = getTypeSetAtIndex(params2, i);
      var overlap = false;
      var name = void 0;
      var _iterator9 = _createForOfIteratorHelper(typeSet2), _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
          name = _step9.value;
          if (typeSet1.has(name)) {
            overlap = true;
            break;
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      if (!overlap) {
        return false;
      }
    }
    var len1 = params1.length;
    var len2 = params2.length;
    var restParam1 = hasRestParam(params1);
    var restParam2 = hasRestParam(params2);
    return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
  }
  function clearResolutions(functionList) {
    return functionList.map(function(fn) {
      if (isReferToSelf(fn)) {
        return referToSelf(fn.referToSelf.callback);
      }
      if (isReferTo(fn)) {
        return makeReferTo(fn.referTo.references, fn.referTo.callback);
      }
      return fn;
    });
  }
  function collectResolutions(references, functionList, signatureMap) {
    var resolvedReferences = [];
    var reference;
    var _iterator10 = _createForOfIteratorHelper(references), _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
        reference = _step10.value;
        var resolution = signatureMap[reference];
        if (typeof resolution !== "number") {
          throw new TypeError('No definition for referenced signature "' + reference + '"');
        }
        resolution = functionList[resolution];
        if (typeof resolution !== "function") {
          return false;
        }
        resolvedReferences.push(resolution);
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
    return resolvedReferences;
  }
  function resolveReferences(functionList, signatureMap, self) {
    var resolvedFunctions = clearResolutions(functionList);
    var isResolved = new Array(resolvedFunctions.length).fill(false);
    var leftUnresolved = true;
    while (leftUnresolved) {
      leftUnresolved = false;
      var nothingResolved = true;
      for (var i = 0; i < resolvedFunctions.length; ++i) {
        if (isResolved[i])
          continue;
        var fn = resolvedFunctions[i];
        if (isReferToSelf(fn)) {
          resolvedFunctions[i] = fn.referToSelf.callback(self);
          resolvedFunctions[i].referToSelf = fn.referToSelf;
          isResolved[i] = true;
          nothingResolved = false;
        } else if (isReferTo(fn)) {
          var resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
          if (resolvedReferences) {
            resolvedFunctions[i] = fn.referTo.callback.apply(this, resolvedReferences);
            resolvedFunctions[i].referTo = fn.referTo;
            isResolved[i] = true;
            nothingResolved = false;
          } else {
            leftUnresolved = true;
          }
        }
      }
      if (nothingResolved && leftUnresolved) {
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
      }
    }
    return resolvedFunctions;
  }
  function validateDeprecatedThis(signaturesMap) {
    var deprecatedThisRegex = /\bthis(\(|\.signatures\b)/;
    Object.keys(signaturesMap).forEach(function(signature) {
      var fn = signaturesMap[signature];
      if (deprecatedThisRegex.test(fn.toString())) {
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
      }
    });
  }
  function createTypedFunction(name, rawSignaturesMap) {
    typed.createCount++;
    if (Object.keys(rawSignaturesMap).length === 0) {
      throw new SyntaxError("No signatures provided");
    }
    if (typed.warnAgainstDeprecatedThis) {
      validateDeprecatedThis(rawSignaturesMap);
    }
    var parsedParams = [];
    var originalFunctions = [];
    var signaturesMap = {};
    var preliminarySignatures = [];
    var signature;
    var _loop2 = function _loop22() {
      if (!Object.prototype.hasOwnProperty.call(rawSignaturesMap, signature)) {
        return "continue";
      }
      var params = parseSignature(signature);
      if (!params)
        return "continue";
      parsedParams.forEach(function(pp) {
        if (conflicting(pp, params)) {
          throw new TypeError('Conflicting signatures "' + stringifyParams(pp) + '" and "' + stringifyParams(params) + '".');
        }
      });
      parsedParams.push(params);
      var functionIndex = originalFunctions.length;
      originalFunctions.push(rawSignaturesMap[signature]);
      var conversionParams = params.map(expandParam);
      var sp = void 0;
      var _iterator11 = _createForOfIteratorHelper(splitParams(conversionParams)), _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
          sp = _step11.value;
          var spName = stringifyParams(sp);
          preliminarySignatures.push({
            params: sp,
            name: spName,
            fn: functionIndex
          });
          if (sp.every(function(p) {
            return !p.hasConversion;
          })) {
            signaturesMap[spName] = functionIndex;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    };
    for (signature in rawSignaturesMap) {
      var _ret3 = _loop2();
      if (_ret3 === "continue")
        continue;
    }
    preliminarySignatures.sort(compareSignatures);
    var resolvedFunctions = resolveReferences(originalFunctions, signaturesMap, theTypedFn);
    var s;
    for (s in signaturesMap) {
      if (Object.prototype.hasOwnProperty.call(signaturesMap, s)) {
        signaturesMap[s] = resolvedFunctions[signaturesMap[s]];
      }
    }
    var signatures = [];
    var internalSignatureMap = new Map();
    for (var _i3 = 0, _preliminarySignature = preliminarySignatures; _i3 < _preliminarySignature.length; _i3++) {
      s = _preliminarySignature[_i3];
      if (!internalSignatureMap.has(s.name)) {
        s.fn = resolvedFunctions[s.fn];
        signatures.push(s);
        internalSignatureMap.set(s.name, s);
      }
    }
    var ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
    var ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
    var ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
    var ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
    var ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
    var ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
    var allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;
    for (var i = 0; i < signatures.length; ++i) {
      signatures[i].test = compileTests(signatures[i].params);
    }
    var test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
    var test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
    var test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
    var test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
    var test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
    var test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
    var test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
    var test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
    var test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
    var test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
    var test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
    var test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;
    for (var _i4 = 0; _i4 < signatures.length; ++_i4) {
      signatures[_i4].implementation = compileArgsPreprocessing(signatures[_i4].params, signatures[_i4].fn);
    }
    var fn0 = ok0 ? signatures[0].implementation : undef;
    var fn1 = ok1 ? signatures[1].implementation : undef;
    var fn2 = ok2 ? signatures[2].implementation : undef;
    var fn3 = ok3 ? signatures[3].implementation : undef;
    var fn4 = ok4 ? signatures[4].implementation : undef;
    var fn5 = ok5 ? signatures[5].implementation : undef;
    var len0 = ok0 ? signatures[0].params.length : -1;
    var len1 = ok1 ? signatures[1].params.length : -1;
    var len2 = ok2 ? signatures[2].params.length : -1;
    var len3 = ok3 ? signatures[3].params.length : -1;
    var len4 = ok4 ? signatures[4].params.length : -1;
    var len5 = ok5 ? signatures[5].params.length : -1;
    var iStart = allOk ? 6 : 0;
    var iEnd = signatures.length;
    var tests = signatures.map(function(s2) {
      return s2.test;
    });
    var fns = signatures.map(function(s2) {
      return s2.implementation;
    });
    var generic = function generic2() {
      for (var _i5 = iStart; _i5 < iEnd; _i5++) {
        if (tests[_i5](arguments)) {
          return fns[_i5].apply(this, arguments);
        }
      }
      return typed.onMismatch(name, arguments, signatures);
    };
    function theTypedFn(arg0, arg1) {
      if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
        return fn0.apply(this, arguments);
      }
      if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
        return fn1.apply(this, arguments);
      }
      if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
        return fn2.apply(this, arguments);
      }
      if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
        return fn3.apply(this, arguments);
      }
      if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
        return fn4.apply(this, arguments);
      }
      if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
        return fn5.apply(this, arguments);
      }
      return generic.apply(this, arguments);
    }
    try {
      Object.defineProperty(theTypedFn, "name", {
        value: name
      });
    } catch (err) {
    }
    theTypedFn.signatures = signaturesMap;
    theTypedFn._typedFunctionData = {
      signatures,
      signatureMap: internalSignatureMap
    };
    return theTypedFn;
  }
  function _onMismatch(name, args, signatures) {
    throw createError(name, args, signatures);
  }
  function initial(arr) {
    return slice(arr, 0, arr.length - 1);
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function slice(arr, start, end) {
    return Array.prototype.slice.call(arr, start, end);
  }
  function findInArray(arr, test) {
    for (var i = 0; i < arr.length; i++) {
      if (test(arr[i])) {
        return arr[i];
      }
    }
    return void 0;
  }
  function flatMap(arr, callback) {
    return Array.prototype.concat.apply([], arr.map(callback));
  }
  function referTo() {
    var references = initial(arguments).map(function(s) {
      return stringifyParams(parseSignature(s));
    });
    var callback = last(arguments);
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as last argument");
    }
    return makeReferTo(references, callback);
  }
  function makeReferTo(references, callback) {
    return {
      referTo: {
        references,
        callback
      }
    };
  }
  function referToSelf(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as first argument");
    }
    return {
      referToSelf: {
        callback
      }
    };
  }
  function isReferTo(objectOrFn) {
    return objectOrFn && _typeof(objectOrFn.referTo) === "object" && Array.isArray(objectOrFn.referTo.references) && typeof objectOrFn.referTo.callback === "function";
  }
  function isReferToSelf(objectOrFn) {
    return objectOrFn && _typeof(objectOrFn.referToSelf) === "object" && typeof objectOrFn.referToSelf.callback === "function";
  }
  function checkName(nameSoFar, newName) {
    if (!nameSoFar) {
      return newName;
    }
    if (newName && newName !== nameSoFar) {
      var err = new Error("Function names do not match (expected: " + nameSoFar + ", actual: " + newName + ")");
      err.data = {
        actual: newName,
        expected: nameSoFar
      };
      throw err;
    }
    return nameSoFar;
  }
  function getObjectName(obj) {
    var name;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && (isTypedFunction(obj[key]) || typeof obj[key].signature === "string")) {
        name = checkName(name, obj[key].name);
      }
    }
    return name;
  }
  function mergeSignatures(dest, source) {
    var key;
    for (key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key in dest) {
          if (source[key] !== dest[key]) {
            var err = new Error('Signature "' + key + '" is defined twice');
            err.data = {
              signature: key,
              sourceFunction: source[key],
              destFunction: dest[key]
            };
            throw err;
          }
        }
        dest[key] = source[key];
      }
    }
  }
  var saveTyped = typed;
  typed = function typed2(maybeName) {
    var named = typeof maybeName === "string";
    var start = named ? 1 : 0;
    var name = named ? maybeName : "";
    var allSignatures = {};
    for (var i = start; i < arguments.length; ++i) {
      var item = arguments[i];
      var theseSignatures = {};
      var thisName = void 0;
      if (typeof item === "function") {
        thisName = item.name;
        if (typeof item.signature === "string") {
          theseSignatures[item.signature] = item;
        } else if (isTypedFunction(item)) {
          theseSignatures = item.signatures;
        }
      } else if (isPlainObject(item)) {
        theseSignatures = item;
        if (!named) {
          thisName = getObjectName(item);
        }
      }
      if (Object.keys(theseSignatures).length === 0) {
        var err = new TypeError("Argument to 'typed' at index " + i + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        err.data = {
          index: i,
          argument: item
        };
        throw err;
      }
      if (!named) {
        name = checkName(name, thisName);
      }
      mergeSignatures(allSignatures, theseSignatures);
    }
    return createTypedFunction(name || "", allSignatures);
  };
  typed.create = create;
  typed.createCount = saveTyped.createCount;
  typed.onMismatch = _onMismatch;
  typed.throwMismatchError = _onMismatch;
  typed.createError = createError;
  typed.clear = clear;
  typed.clearConversions = clearConversions;
  typed.addTypes = addTypes;
  typed._findType = findType;
  typed.referTo = referTo;
  typed.referToSelf = referToSelf;
  typed.convert = convert;
  typed.findSignature = findSignature;
  typed.find = find;
  typed.isTypedFunction = isTypedFunction;
  typed.warnAgainstDeprecatedThis = true;
  typed.addType = function(type, beforeObjectTest) {
    var before = "any";
    if (beforeObjectTest !== false && typeMap.has("Object")) {
      before = "Object";
    }
    typed.addTypes([type], before);
  };
  function _validateConversion(conversion) {
    if (!conversion || typeof conversion.from !== "string" || typeof conversion.to !== "string" || typeof conversion.convert !== "function") {
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    }
    if (conversion.to === conversion.from) {
      throw new SyntaxError('Illegal to define conversion from "' + conversion.from + '" to itself.');
    }
  }
  typed.addConversion = function(conversion) {
    _validateConversion(conversion);
    var to = findType(conversion.to);
    if (to.conversionsTo.every(function(other) {
      return other.from !== conversion.from;
    })) {
      to.conversionsTo.push({
        from: conversion.from,
        convert: conversion.convert,
        index: nConversions++
      });
    } else {
      throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to.name + '"');
    }
  };
  typed.addConversions = function(conversions) {
    conversions.forEach(typed.addConversion);
  };
  typed.removeConversion = function(conversion) {
    _validateConversion(conversion);
    var to = findType(conversion.to);
    var existingConversion = findInArray(to.conversionsTo, function(c) {
      return c.from === conversion.from;
    });
    if (!existingConversion) {
      throw new Error("Attempt to remove nonexistent conversion from " + conversion.from + " to " + conversion.to);
    }
    if (existingConversion.convert !== conversion.convert) {
      throw new Error("Conversion to remove does not match existing conversion");
    }
    var index = to.conversionsTo.indexOf(existingConversion);
    to.conversionsTo.splice(index, 1);
  };
  typed.resolve = function(tf, argList) {
    if (!isTypedFunction(tf)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    var sigs = tf._typedFunctionData.signatures;
    for (var i = 0; i < sigs.length; ++i) {
      if (sigs[i].test(argList)) {
        return sigs[i];
      }
    }
    return null;
  };
  return typed;
}
var typedFunction = create();

/**
 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
 */

/**
 * Check if a number is integer
 * @param {number | boolean} value
 * @return {boolean} isInteger
 */

function isInteger(value) {
  if (typeof value === 'boolean') {
    return true;
  }

  return isFinite(value) ? value === Math.round(value) : false;
}
/**
 * Formats a number in a given base
 * @param {number} n
 * @param {number} base
 * @param {number} size
 * @returns {string}
 */

function formatNumberToBase(n, base, size) {
  var prefixes = {
    2: '0b',
    8: '0o',
    16: '0x'
  };
  var prefix = prefixes[base];
  var suffix = '';

  if (size) {
    if (size < 1) {
      throw new Error('size must be in greater than 0');
    }

    if (!isInteger(size)) {
      throw new Error('size must be an integer');
    }

    if (n > 2 ** (size - 1) - 1 || n < -(2 ** (size - 1))) {
      throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
    }

    if (!isInteger(n)) {
      throw new Error('Value must be an integer');
    }

    if (n < 0) {
      n = n + 2 ** size;
    }

    suffix = "i".concat(size);
  }

  var sign = '';

  if (n < 0) {
    n = -n;
    sign = '-';
  }

  return "".concat(sign).concat(prefix).concat(n.toString(base)).concat(suffix);
}
/**
 * Convert a number to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'engineering'    Always use engineering notation.
 *                                          For example '123.4e+0' and '14.0e+6'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lowerExp` and `upperExp` bounds, and
 *                                          uses exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                         'bin', 'oct, or
 *                         'hex'            Format the number using binary, octal,
 *                                          or hexadecimal notation.
 *                                          For example '0b1101' and '0x10fe'.
 *                     {number} wordSize    The word size in bits to use for formatting
 *                                          in binary, octal, or hexadecimal notation.
 *                                          To be used only with 'bin', 'oct', or 'hex'
 *                                          values for 'notation' option. When this option
 *                                          is defined the value is formatted as a signed
 *                                          twos complement integer of the given word size
 *                                          and the size suffix is appended to the output.
 *                                          For example
 *                                          format(-1, {notation: 'hex', wordSize: 8}) === '0xffi8'.
 *                                          Default value is undefined.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default,
 *                                          not rounding any digits.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12.071, {notation: 'fixed'})                // '12'
 *    format(2.3,    {notation: 'fixed', precision: 2})  // '2.30'
 *    format(52.8,   {notation: 'exponential'})          // '5.28e+1'
 *    format(12345678, {notation: 'engineering'})        // '12.345678e+6'
 *
 * @param {number} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */


function format(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  } // handle special cases


  if (value === Infinity) {
    return 'Infinity';
  } else if (value === -Infinity) {
    return '-Infinity';
  } else if (isNaN(value)) {
    return 'NaN';
  } // default values for options


  var notation = 'auto';
  var precision;
  var wordSize;

  if (options) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    } // determine precision from options


    if (isNumber(options)) {
      precision = options;
    } else if (isNumber(options.precision)) {
      precision = options.precision;
    }

    if (options.wordSize) {
      wordSize = options.wordSize;

      if (typeof wordSize !== 'number') {
        throw new Error('Option "wordSize" must be a number');
      }
    }
  } // handle the various notations


  switch (notation) {
    case 'fixed':
      return toFixed(value, precision);

    case 'exponential':
      return toExponential(value, precision);

    case 'engineering':
      return toEngineering(value, precision);

    case 'bin':
      return formatNumberToBase(value, 2, wordSize);

    case 'oct':
      return formatNumberToBase(value, 8, wordSize);

    case 'hex':
      return formatNumberToBase(value, 16, wordSize);

    case 'auto':
      // remove trailing zeros after the decimal point
      return toPrecision(value, precision, options && options).replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return digits !== '.' ? digits + e : e;
      });

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
/**
 * Split a number into sign, coefficients, and exponent
 * @param {number | string} value
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 */

function splitNumber(value) {
  // parse the input value
  var match = String(value).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);

  if (!match) {
    throw new SyntaxError('Invalid number ' + value);
  }

  var sign = match[1];
  var digits = match[2];
  var exponent = parseFloat(match[4] || '0');
  var dot = digits.indexOf('.');
  exponent += dot !== -1 ? dot - 1 : digits.length - 1;
  var coefficients = digits.replace('.', '') // remove the dot (must be removed before removing leading zeros)
  .replace(/^0*/, function (zeros) {
    // remove leading zeros, add their count to the exponent
    exponent -= zeros.length;
    return '';
  }).replace(/0*$/, '') // remove trailing zeros
  .split('').map(function (d) {
    return parseInt(d);
  });

  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }

  return {
    sign,
    coefficients,
    exponent
  };
}
/**
 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */

function toEngineering(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  var split = splitNumber(value);
  var rounded = roundDigits(split, precision);
  var e = rounded.exponent;
  var c = rounded.coefficients; // find nearest lower multiple of 3 for exponent

  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;

  if (isNumber(precision)) {
    // add zeroes to give correct sig figs
    while (precision > c.length || e - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    // concatenate coefficients with necessary zeros
    // add zeros if necessary (for example: 1e+8 -> 100e+6)
    var missingZeros = Math.abs(e - newExp) - (c.length - 1);

    for (var i = 0; i < missingZeros; i++) {
      c.push(0);
    }
  } // find difference in exponents


  var expDiff = Math.abs(e - newExp);
  var decimalIdx = 1; // push decimal index over by expDiff times

  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  } // if all coefficient values are zero after the decimal point and precision is unset, don't add a decimal value.
  // otherwise concat with the rest of the coefficients


  var decimals = c.slice(decimalIdx).join('');
  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? '.' + decimals : '';
  var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
  return rounded.sign + str;
}
/**
 * Format a number with fixed notation.
 * @param {number | string} value
 * @param {number} [precision=undefined]  Optional number of decimals after the
 *                                        decimal point. null by default.
 */

function toFixed(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  var splitValue = splitNumber(value);
  var rounded = typeof precision === 'number' ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  var c = rounded.coefficients;
  var p = rounded.exponent + 1; // exponent may have changed
  // append zeros if needed

  var pp = p + (precision || 0);

  if (c.length < pp) {
    c = c.concat(zeros(pp - c.length));
  } // prepend zeros if needed


  if (p < 0) {
    c = zeros(-p + 1).concat(c);
    p = 1;
  } // insert a dot if needed


  if (p < c.length) {
    c.splice(p, 0, p === 0 ? '0.' : '.');
  }

  return rounded.sign + c.join('');
}
/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 */

function toExponential(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  } // round if needed, else create a clone


  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e = rounded.exponent; // append zeros if needed

  if (c.length < precision) {
    c = c.concat(zeros(precision - c.length));
  } // format as `C.CCCe+EEE` or `C.CCCe-EEE`


  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
}
/**
 * Format a number with a certain precision
 * @param {number | string} value
 * @param {number} [precision=undefined] Optional number of digits.
 * @param {{lowerExp: number | undefined, upperExp: number | undefined}} [options]
 *                                       By default:
 *                                         lowerExp = -3 (incl)
 *                                         upper = +5 (excl)
 * @return {string}
 */

function toPrecision(value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  } // determine lower and upper bound for exponential notation.


  var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
  var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5;
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;

  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
    // exponential notation
    return toExponential(value, precision);
  } else {
    var c = rounded.coefficients;
    var e = rounded.exponent; // append trailing zeros

    if (c.length < precision) {
      c = c.concat(zeros(precision - c.length));
    } // append trailing zeros
    // TODO: simplify the next statement


    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0))); // prepend zeros

    c = zeros(-e).concat(c);
    var dot = e > 0 ? e : 0;

    if (dot < c.length - 1) {
      c.splice(dot + 1, 0, '.');
    }

    return rounded.sign + c.join('');
  }
}
/**
 * Round the number of digits of a number *
 * @param {SplitValue} split       A value split with .splitNumber(value)
 * @param {number} precision  A positive integer
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 *              with rounded digits
 */

function roundDigits(split, precision) {
  // create a clone
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  };
  var c = rounded.coefficients; // prepend zeros if needed

  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }

  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);

    if (removed[0] >= 5) {
      var i = precision - 1;
      c[i]++;

      while (c[i] === 10) {
        c.pop();

        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }

        i--;
        c[i]++;
      }
    }
  }

  return rounded;
}
/**
 * Create an array filled with zeros.
 * @param {number} length
 * @return {Array}
 */

function zeros(length) {
  var arr = [];

  for (var i = 0; i < length; i++) {
    arr.push(0);
  }

  return arr;
}
/**
 * Count the number of significant digits of a number.
 *
 * For example:
 *   2.34 returns 3
 *   0.0034 returns 2
 *   120.5e+30 returns 4
 *
 * @param {number} value
 * @return {number} digits   Number of significant digits
 */


function digits(value) {
  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
  .length;
}
/**
 * Minimum number added to one that makes the result different than one
 */

var DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;
/**
 * Compares two floating point numbers.
 * @param {number} x          First value to compare
 * @param {number} y          Second value to compare
 * @param {number} [epsilon]  The maximum relative difference between x and y
 *                            If epsilon is undefined or null, the function will
 *                            test whether x and y are exactly equal.
 * @return {boolean} whether the two numbers are nearly equal
*/

function nearlyEqual(x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon === null || epsilon === undefined) {
    return x === y;
  }

  if (x === y) {
    return true;
  } // NaN


  if (isNaN(x) || isNaN(y)) {
    return false;
  } // at this point x and y should be finite


  if (isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);

    if (diff < DBL_EPSILON) {
      return true;
    } else {
      // use relative error
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  } // Infinite and Number or negative Infinite and positive Infinite cases


  return false;
}

/**
 * Formats a BigNumber in a given base
 * @param {BigNumber} n
 * @param {number} base
 * @param {number} size
 * @returns {string}
 */

function formatBigNumberToBase(n, base, size) {
  var BigNumberCtor = n.constructor;
  var big2 = new BigNumberCtor(2);
  var suffix = '';

  if (size) {
    if (size < 1) {
      throw new Error('size must be in greater than 0');
    }

    if (!isInteger(size)) {
      throw new Error('size must be an integer');
    }

    if (n.greaterThan(big2.pow(size - 1).sub(1)) || n.lessThan(big2.pow(size - 1).mul(-1))) {
      throw new Error("Value must be in range [-2^".concat(size - 1, ", 2^").concat(size - 1, "-1]"));
    }

    if (!n.isInteger()) {
      throw new Error('Value must be an integer');
    }

    if (n.lessThan(0)) {
      n = n.add(big2.pow(size));
    }

    suffix = "i".concat(size);
  }

  switch (base) {
    case 2:
      return "".concat(n.toBinary()).concat(suffix);

    case 8:
      return "".concat(n.toOctal()).concat(suffix);

    case 16:
      return "".concat(n.toHexadecimal()).concat(suffix);

    default:
      throw new Error("Base ".concat(base, " not supported "));
  }
}
/**
 * Convert a BigNumber to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lower` and `upper` bounds, and uses
 *                                          exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                         'bin', 'oct, or
 *                         'hex'            Format the number using binary, octal,
 *                                          or hexadecimal notation.
 *                                          For example '0b1101' and '0x10fe'.
 *                     {number} wordSize    The word size in bits to use for formatting
 *                                          in binary, octal, or hexadecimal notation.
 *                                          To be used only with 'bin', 'oct', or 'hex'
 *                                          values for 'notation' option. When this option
 *                                          is defined the value is formatted as a signed
 *                                          twos complement integer of the given word size
 *                                          and the size suffix is appended to the output.
 *                                          For example
 *                                          format(-1, {notation: 'hex', wordSize: 8}) === '0xffi8'.
 *                                          Default value is undefined.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential',
 *                                          'engineering', and 'auto',
 *                                          `precision` defines the total
 *                                          number of significant digits returned.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point.
 *                                          `precision` is undefined by default.
 *                     {number} lowerExp    Exponent determining the lower boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `-3`.
 *                     {number} upperExp    Exponent determining the upper boundary
 *                                          for formatting a value with an exponent
 *                                          when `notation='auto`.
 *                                          Default value is `5`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4)                                        // '6.4'
 *    format(1240000)                                    // '1.24e6'
 *    format(1/3)                                        // '0.3333333333333333'
 *    format(1/3, 3)                                     // '0.333'
 *    format(21385, 2)                                   // '21000'
 *    format(12e8, {notation: 'fixed'})                  // returns '1200000000'
 *    format(2.3,    {notation: 'fixed', precision: 4})  // returns '2.3000'
 *    format(52.8,   {notation: 'exponential'})          // returns '5.28e+1'
 *    format(12400,  {notation: 'engineering'})          // returns '12.400e+3'
 *
 * @param {BigNumber} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */


function format$1(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  } // handle special cases


  if (!value.isFinite()) {
    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
  } // default values for options


  var notation = 'auto';
  var precision;
  var wordSize;

  if (options !== undefined) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    } // determine precision from options


    if (typeof options === 'number') {
      precision = options;
    } else if (options.precision) {
      precision = options.precision;
    }

    if (options.wordSize) {
      wordSize = options.wordSize;

      if (typeof wordSize !== 'number') {
        throw new Error('Option "wordSize" must be a number');
      }
    }
  } // handle the various notations


  switch (notation) {
    case 'fixed':
      return toFixed$1(value, precision);

    case 'exponential':
      return toExponential$1(value, precision);

    case 'engineering':
      return toEngineering$1(value, precision);

    case 'bin':
      return formatBigNumberToBase(value, 2, wordSize);

    case 'oct':
      return formatBigNumberToBase(value, 8, wordSize);

    case 'hex':
      return formatBigNumberToBase(value, 16, wordSize);

    case 'auto':
      {
        // determine lower and upper bound for exponential notation.
        // TODO: implement support for upper and lower to be BigNumbers themselves
        var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
        var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5; // handle special case zero

        if (value.isZero()) return '0'; // determine whether or not to output exponential notation

        var str;
        var rounded = value.toSignificantDigits(precision);
        var exp = rounded.e;

        if (exp >= lowerExp && exp < upperExp) {
          // normal number notation
          str = rounded.toFixed();
        } else {
          // exponential notation
          str = toExponential$1(value, precision);
        } // remove trailing zeros after the decimal point


        return str.replace(/((\.\d*?)(0+))($|e)/, function () {
          var digits = arguments[2];
          var e = arguments[4];
          return digits !== '.' ? digits + e : e;
        });
      }

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
/**
 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {BigNumber | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */

function toEngineering$1(value, precision) {
  // find nearest lower multiple of 3 for exponent
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3; // find difference in exponents, and calculate the value without exponent

  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);

  if (valueStr.indexOf('e') !== -1) {
    valueStr = valueWithoutExp.toString();
  }

  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
}
/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 * @returns {string} str
 */

function toExponential$1(value, precision) {
  if (precision !== undefined) {
    return value.toExponential(precision - 1); // Note the offset of one
  } else {
    return value.toExponential();
  }
}
/**
 * Format a number with fixed notation.
 * @param {BigNumber} value
 * @param {number} [precision=undefined] Optional number of decimals after the
 *                                       decimal point. Undefined by default.
 */

function toFixed$1(value, precision) {
  return value.toFixed(precision);
}

/**
 * Format a value of any type into a string.
 *
 * Usage:
 *     math.format(value)
 *     math.format(value, precision)
 *     math.format(value, options)
 *
 * When value is a function:
 *
 * - When the function has a property `syntax`, it returns this
 *   syntax description.
 * - In other cases, a string `'function'` is returned.
 *
 * When `value` is an Object:
 *
 * - When the object contains a property `format` being a function, this
 *   function is invoked as `value.format(options)` and the result is returned.
 * - When the object has its own `toString` method, this method is invoked
 *   and the result is returned.
 * - In other cases the function will loop over all object properties and
 *   return JSON object notation like '{"a": 2, "b": 3}'.
 *
 * Example usage:
 *     math.format(2/7)                // '0.2857142857142857'
 *     math.format(math.pi, 3)         // '3.14'
 *     math.format(new Complex(2, 3))  // '2 + 3i'
 *     math.format('hello')            // '"hello"'
 *
 * @param {*} value             Value to be stringified
 * @param {Object | number | Function} [options]
 *     Formatting options. See src/utils/number.js:format for a
 *     description of the available options controlling number output.
 *     This generic "format" also supports the option property `truncate: NN`
 *     giving the maximum number NN of characters to return (if there would
 *     have been more, they are deleted and replaced by an ellipsis).
 * @return {string} str
 */

function format$2(value, options) {
  var result = _format(value, options);

  if (options && typeof options === 'object' && 'truncate' in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + '...';
  }

  return result;
}

function _format(value, options) {
  if (typeof value === 'number') {
    return format(value, options);
  }

  if (isBigNumber(value)) {
    return format$1(value, options);
  } // note: we use unsafe duck-typing here to check for Fractions, this is
  // ok here since we're only invoking toString or concatenating its values


  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== 'decimal') {
      // output as ratio, like '1/3'
      return value.s * value.n + '/' + value.d;
    } else {
      // output as decimal, like '0.(3)'
      return value.toString();
    }
  }

  if (Array.isArray(value)) {
    return formatArray(value, options);
  }

  if (isString(value)) {
    return '"' + value + '"';
  }

  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }

  if (value && typeof value === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    } else if (value && value.toString(options) !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString(options);
    } else {
      var entries = Object.keys(value).map(key => {
        return '"' + key + '": ' + format$2(value[key], options);
      });
      return '{' + entries.join(', ') + '}';
    }
  }

  return String(value);
}
/**
 * Recursively format an n-dimensional matrix
 * Example output: "[[1, 2], [3, 4]]"
 * @param {Array} array
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @returns {string} str
 */

function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = '[';
    var len = array.length;

    for (var i = 0; i < len; i++) {
      if (i !== 0) {
        str += ', ';
      }

      str += formatArray(array[i], options);
    }

    str += ']';
    return str;
  } else {
    return format$2(array, options);
  }
}
/**
 * Check whether a value looks like a Fraction (unsafe duck-type check)
 * @param {*} value
 * @return {boolean}
 */


function looksLikeFraction(value) {
  return value && typeof value === 'object' && typeof value.s === 'number' && typeof value.n === 'number' && typeof value.d === 'number' || false;
}

/**
 * Create a range error with the message:
 *     'Dimension mismatch (<actual size> != <expected size>)'
 * @param {number | number[]} actual        The actual size
 * @param {number | number[]} expected      The expected size
 * @param {string} [relation='!=']          Optional relation between actual
 *                                          and expected size: '!=', '<', etc.
 * @extends RangeError
 */
function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.actual = actual;
  this.expected = expected;
  this.relation = relation;
  this.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (this.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
  this.stack = new Error().stack;
}
DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = 'DimensionError';
DimensionError.prototype.isDimensionError = true;

/**
 * Create a range error with the message:
 *     'Index out of range (index < min)'
 *     'Index out of range (index < max)'
 *
 * @param {number} index     The actual index
 * @param {number} [min=0]   Minimum index (included)
 * @param {number} [max]     Maximum index (excluded)
 * @extends RangeError
 */
function IndexError(index, min, max) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.index = index;

  if (arguments.length < 3) {
    this.min = 0;
    this.max = min;
  } else {
    this.min = min;
    this.max = max;
  }

  if (this.min !== undefined && this.index < this.min) {
    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
  } else if (this.max !== undefined && this.index >= this.max) {
    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
  } else {
    this.message = 'Index out of range (' + this.index + ')';
  }

  this.stack = new Error().stack;
}
IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = 'IndexError';
IndexError.prototype.isIndexError = true;

/**
 * Calculate the size of a multi dimensional array.
 * This function checks the size of the first entry, it does not validate
 * whether all dimensions match. (use function `validate` for that)
 * @param {Array} x
 * @Return {Number[]} size
 */

function arraySize(x) {
  var s = [];

  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }

  return s;
}
/**
 * Recursively validate whether each element in a multi dimensional array
 * has a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @param {number} dim   Current dimension
 * @throws DimensionError
 * @private
 */

function _validate(array, size, dim) {
  var i;
  var len = array.length;

  if (len !== size[dim]) {
    throw new DimensionError(len, size[dim]);
  }

  if (dim < size.length - 1) {
    // recursively validate each child array
    var dimNext = dim + 1;

    for (i = 0; i < len; i++) {
      var child = array[i];

      if (!Array.isArray(child)) {
        throw new DimensionError(size.length - 1, size.length, '<');
      }

      _validate(array[i], size, dimNext);
    }
  } else {
    // last dimension. none of the childs may be an array
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
        throw new DimensionError(size.length + 1, size.length, '>');
      }
    }
  }
}
/**
 * Validate whether each element in a multi dimensional array has
 * a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @throws DimensionError
 */


function validate(array, size) {
  var isScalar = size.length === 0;

  if (isScalar) {
    // scalar
    if (Array.isArray(array)) {
      throw new DimensionError(array.length, 0);
    }
  } else {
    // array
    _validate(array, size, 0);
  }
}
/**
 * Test whether index is an integer number with index >= 0 and index < length
 * when length is provided
 * @param {number} index    Zero-based index
 * @param {number} [length] Length of the array
 */

function validateIndex(index, length) {
  if (!isNumber(index) || !isInteger(index)) {
    throw new TypeError('Index must be an integer (value: ' + index + ')');
  }

  if (index < 0 || typeof length === 'number' && index >= length) {
    throw new IndexError(index, length);
  }
}
/**
 * Resize a multi dimensional array. The resized array is returned.
 * @param {Array} array         Array to be resized
 * @param {Array.<number>} size Array with the size of each dimension
 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
 *                              zero by default. Specify for example `null`,
 *                              to clearly see entries that are not explicitly
 *                              set.
 * @return {Array} array         The resized array
 */

function resize(array, size, defaultValue) {
  // TODO: add support for scalars, having size=[] ?
  // check the type of the arguments
  if (!Array.isArray(array) || !Array.isArray(size)) {
    throw new TypeError('Array expected');
  }

  if (size.length === 0) {
    throw new Error('Resizing to scalar is not supported');
  } // check whether size contains positive integers


  size.forEach(function (value) {
    if (!isNumber(value) || !isInteger(value) || value < 0) {
      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format$2(size) + ')');
    }
  }); // recursively resize the array

  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;

  _resize(array, size, 0, _defaultValue);

  return array;
}
/**
 * Recursively resize a multi dimensional array
 * @param {Array} array         Array to be resized
 * @param {number[]} size       Array with the size of each dimension
 * @param {number} dim          Current dimension
 * @param {*} [defaultValue]    Value to be filled in in new entries,
 *                              undefined by default.
 * @private
 */

function _resize(array, size, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size[dim];
  var minLen = Math.min(oldLen, newLen); // apply new length

  array.length = newLen;

  if (dim < size.length - 1) {
    // non-last dimension
    var dimNext = dim + 1; // resize existing child arrays

    for (i = 0; i < minLen; i++) {
      // resize child array
      elem = array[i];

      if (!Array.isArray(elem)) {
        elem = [elem]; // add a dimension

        array[i] = elem;
      }

      _resize(elem, size, dimNext, defaultValue);
    } // create new child arrays


    for (i = minLen; i < newLen; i++) {
      // get child array
      elem = [];
      array[i] = elem; // resize new child array

      _resize(elem, size, dimNext, defaultValue);
    }
  } else {
    // last dimension
    // remove dimensions of existing values
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    } // fill new elements with the default value


    for (i = minLen; i < newLen; i++) {
      array[i] = defaultValue;
    }
  }
}
/**
 * Re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 *
 * @throws {DimensionError}       If the product of the new dimension sizes does
 *                                not equal that of the old ones
 */


function reshape(array, sizes) {
  var flatArray = flatten(array);
  var currentLength = flatArray.length;

  if (!Array.isArray(array) || !Array.isArray(sizes)) {
    throw new TypeError('Array expected');
  }

  if (sizes.length === 0) {
    throw new DimensionError(0, currentLength, '!=');
  }

  sizes = processSizesWildcard(sizes, currentLength);
  var newLength = product(sizes);

  if (currentLength !== newLength) {
    throw new DimensionError(newLength, currentLength, '!=');
  }

  try {
    return _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof DimensionError) {
      throw new DimensionError(newLength, currentLength, '!=');
    }

    throw e;
  }
}
/**
 * Replaces the wildcard -1 in the sizes array.
 * @param {Array.<number>} sizes  List of sizes for each dimension. At most on wildcard.
 * @param {number} currentLength  Number of elements in the array.
 * @throws {Error}                If more than one wildcard or unable to replace it.
 * @returns {Array.<number>}      The sizes array with wildcard replaced.
 */

function processSizesWildcard(sizes, currentLength) {
  var newLength = product(sizes);
  var processedSizes = sizes.slice();
  var WILDCARD = -1;
  var wildCardIndex = sizes.indexOf(WILDCARD);
  var isMoreThanOneWildcard = sizes.indexOf(WILDCARD, wildCardIndex + 1) >= 0;

  if (isMoreThanOneWildcard) {
    throw new Error('More than one wildcard in sizes');
  }

  var hasWildcard = wildCardIndex >= 0;
  var canReplaceWildcard = currentLength % newLength === 0;

  if (hasWildcard) {
    if (canReplaceWildcard) {
      processedSizes[wildCardIndex] = -currentLength / newLength;
    } else {
      throw new Error('Could not replace wildcard, since ' + currentLength + ' is no multiple of ' + -newLength);
    }
  }

  return processedSizes;
}
/**
 * Computes the product of all array elements.
 * @param {Array<number>} array Array of factors
 * @returns {number}            Product of all elements
 */

function product(array) {
  return array.reduce((prev, curr) => prev * curr, 1);
}
/**
 * Iteratively re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 */


function _reshape(array, sizes) {
  // testing if there are enough elements for the requested shape
  var tmpArray = array;
  var tmpArray2; // for each dimensions starting by the last one and ignoring the first one

  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size = sizes[sizeIndex];
    tmpArray2 = []; // aggregate the elements of the current tmpArray in elements of the requested size

    var length = tmpArray.length / size;

    for (var i = 0; i < length; i++) {
      tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
    } // set it as the new tmpArray for the next loop turn or for return


    tmpArray = tmpArray2;
  }

  return tmpArray;
}
/**
 * Unsqueeze a multi dimensional array: add dimensions when missing
 *
 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
 *
 * @param {Array} array
 * @param {number} dims       Desired number of dimensions of the array
 * @param {number} [outer]    Number of outer dimensions to be added
 * @param {Array} [size] Current size of array.
 * @returns {Array} returns the array itself
 * @private
 */


function unsqueeze(array, dims, outer, size) {
  var s = size || arraySize(array); // unsqueeze outer dimensions

  if (outer) {
    for (var i = 0; i < outer; i++) {
      array = [array];
      s.unshift(1);
    }
  } // unsqueeze inner dimensions


  array = _unsqueeze(array, dims, 0);

  while (s.length < dims) {
    s.push(1);
  }

  return array;
}
/**
 * Recursively unsqueeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */

function _unsqueeze(array, dims, dim) {
  var i, ii;

  if (Array.isArray(array)) {
    var next = dim + 1;

    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }

  return array;
}
/**
 * Flatten a multi dimensional array, put all elements in a one dimensional
 * array
 * @param {Array} array   A multi dimensional array
 * @return {Array}        The flattened array (1 dimensional)
 */


function flatten(array) {
  if (!Array.isArray(array)) {
    // if not an array, return as is
    return array;
  }

  var flat = [];
  array.forEach(function callback(value) {
    if (Array.isArray(value)) {
      value.forEach(callback); // traverse through sub-arrays recursively
    } else {
      flat.push(value);
    }
  });
  return flat;
}
/**
 * Check the datatype of a given object
 * This is a low level implementation that should only be used by
 * parent Matrix classes such as SparseMatrix or DenseMatrix
 * This method does not validate Array Matrix shape
 * @param {Array} array
 * @param {function} typeOf   Callback function to use to determine the type of a value
 * @return {string}
 */

function getArrayDataType(array, typeOf) {
  var type; // to hold type info

  var length = 0; // to hold length value to ensure it has consistent sizes

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    var isArray = Array.isArray(item); // Saving the target matrix row size

    if (i === 0 && isArray) {
      length = item.length;
    } // If the current item is an array but the length does not equal the targetVectorSize


    if (isArray && item.length !== length) {
      return undefined;
    }

    var itemType = isArray ? getArrayDataType(item, typeOf) // recurse into a nested array
    : typeOf(item);

    if (type === undefined) {
      type = itemType; // first item
    } else if (type !== itemType) {
      return 'mixed';
    } else ;
  }

  return type;
}

/**
 * Create a factory function, which can be used to inject dependencies.
 *
 * The created functions are memoized, a consecutive call of the factory
 * with the exact same inputs will return the same function instance.
 * The memoized cache is exposed on `factory.cache` and can be cleared
 * if needed.
 *
 * Example:
 *
 *     const name = 'log'
 *     const dependencies = ['config', 'typed', 'divideScalar', 'Complex']
 *
 *     export const createLog = factory(name, dependencies, ({ typed, config, divideScalar, Complex }) => {
 *       // ... create the function log here and return it
 *     }
 *
 * @param {string} name           Name of the function to be created
 * @param {string[]} dependencies The names of all required dependencies
 * @param {function} create       Callback function called with an object with all dependencies
 * @param {Object} [meta]         Optional object with meta information that will be attached
 *                                to the created factory function as property `meta`.
 * @returns {function}
 */

function factory(name, dependencies, create, meta) {
  function assertAndCreate(scope) {
    // we only pass the requested dependencies to the factory function
    // to prevent functions to rely on dependencies that are not explicitly
    // requested.
    var deps = pickShallow(scope, dependencies.map(stripOptionalNotation));
    assertDependencies(name, dependencies, scope);
    return create(deps);
  }

  assertAndCreate.isFactory = true;
  assertAndCreate.fn = name;
  assertAndCreate.dependencies = dependencies.slice().sort();

  if (meta) {
    assertAndCreate.meta = meta;
  }

  return assertAndCreate;
}
/**
 * Assert that all dependencies of a list with dependencies are available in the provided scope.
 *
 * Will throw an exception when there are dependencies missing.
 *
 * @param {string} name   Name for the function to be created. Used to generate a useful error message
 * @param {string[]} dependencies
 * @param {Object} scope
 */

function assertDependencies(name, dependencies, scope) {
  var allDefined = dependencies.filter(dependency => !isOptionalDependency(dependency)) // filter optionals
  .every(dependency => scope[dependency] !== undefined);

  if (!allDefined) {
    var missingDependencies = dependencies.filter(dependency => scope[dependency] === undefined); // TODO: create a custom error class for this, a MathjsError or something like that

    throw new Error("Cannot create function \"".concat(name, "\", ") + "some dependencies are missing: ".concat(missingDependencies.map(d => "\"".concat(d, "\"")).join(', '), "."));
  }
}
function isOptionalDependency(dependency) {
  return dependency && dependency[0] === '?';
}
function stripOptionalNotation(dependency) {
  return dependency && dependency[0] === '?' ? dependency.slice(1) : dependency;
}

/**
 * Get a property of a plain object
 * Throws an error in case the object is not a plain object or the
 * property is not defined on the object itself
 * @param {Object} object
 * @param {string} prop
 * @return {*} Returns the property value when safe
 */

function getSafeProperty(object, prop) {
  // only allow getting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    return object[prop];
  }

  if (typeof object[prop] === 'function' && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }

  throw new Error('No access to property "' + prop + '"');
}
/**
 * Set a property on a plain object.
 * Throws an error in case the object is not a plain object or the
 * property would override an inherited property like .constructor or .toString
 * @param {Object} object
 * @param {string} prop
 * @param {*} value
 * @return {*} Returns the value
 */
// TODO: merge this function into access.js?


function setSafeProperty(object, prop, value) {
  // only allow setting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    object[prop] = value;
    return value;
  }

  throw new Error('No access to property "' + prop + '"');
}

function hasSafeProperty(object, prop) {
  return prop in object;
}
/**
 * Test whether a property is safe to use for an object.
 * For example .toString and .constructor are not safe
 * @param {string} prop
 * @return {boolean} Returns true when safe
 */


function isSafeProperty(object, prop) {
  if (!object || typeof object !== 'object') {
    return false;
  } // SAFE: whitelisted
  // e.g length


  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  } // UNSAFE: inherited from Object prototype
  // e.g constructor


  if (prop in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  } // UNSAFE: inherited from Function prototype
  // e.g call, apply


  if (prop in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }

  return true;
}
/**
 * Check whether a method is safe.
 * Throws an error when that's not the case (for example for `constructor`).
 * @param {Object} object
 * @param {string} method
 * @return {boolean} Returns true when safe, false otherwise
 */


function isSafeMethod(object, method) {
  if (object === null || object === undefined || typeof object[method] !== 'function') {
    return false;
  } // UNSAFE: ghosted
  // e.g overridden toString
  // Note that IE10 doesn't support __proto__ and we can't do this check there.


  if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
    return false;
  } // SAFE: whitelisted
  // e.g toString


  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  } // UNSAFE: inherited from Object prototype
  // e.g constructor


  if (method in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  } // UNSAFE: inherited from Function prototype
  // e.g call, apply


  if (method in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }

  return true;
}

function isPlainObject(object) {
  return typeof object === 'object' && object && object.constructor === Object;
}

var safeNativeProperties = {
  length: true,
  name: true
};
var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};

/**
 * A map facade on a bare object.
 *
 * The small number of methods needed to implement a scope,
 * forwarding on to the SafeProperty functions. Over time, the codebase
 * will stop using this method, as all objects will be Maps, rather than
 * more security prone objects.
 */

class ObjectWrappingMap {
  constructor(object) {
    this.wrappedObject = object;
  }

  keys() {
    return Object.keys(this.wrappedObject);
  }

  get(key) {
    return getSafeProperty(this.wrappedObject, key);
  }

  set(key, value) {
    setSafeProperty(this.wrappedObject, key, value);
    return this;
  }

  has(key) {
    return hasSafeProperty(this.wrappedObject, key);
  }

}
/**
 * Returns `true` if the passed object appears to be a Map (i.e. duck typing).
 *
 * Methods looked for are `get`, `set`, `keys` and `has`.
 *
 * @param {Map | object} object
 * @returns
 */

function isMap(object) {
  // We can use the fast instanceof, or a slower duck typing check.
  // The duck typing method needs to cover enough methods to not be confused with DenseMatrix.
  if (!object) {
    return false;
  }

  return object instanceof Map || object instanceof ObjectWrappingMap || typeof object.set === 'function' && typeof object.get === 'function' && typeof object.keys === 'function' && typeof object.has === 'function';
}

/**
 * Create a typed-function which checks the types of the arguments and
 * can match them against multiple provided signatures. The typed-function
 * automatically converts inputs in order to find a matching signature.
 * Typed functions throw informative errors in case of wrong input arguments.
 *
 * See the library [typed-function](https://github.com/josdejong/typed-function)
 * for detailed documentation.
 *
 * Syntax:
 *
 *     math.typed(name, signatures) : function
 *     math.typed(signatures) : function
 *
 * Examples:
 *
 *     // create a typed function with multiple types per argument (type union)
 *     const fn2 = typed({
 *       'number | boolean': function (b) {
 *         return 'b is a number or boolean'
 *       },
 *       'string, number | boolean': function (a, b) {
 *         return 'a is a string, b is a number or boolean'
 *       }
 *     })
 *
 *     // create a typed function with an any type argument
 *     const log = typed({
 *       'string, any': function (event, data) {
 *         console.log('event: ' + event + ', data: ' + JSON.stringify(data))
 *       }
 *     })
 *
 * @param {string} [name]                          Optional name for the typed-function
 * @param {Object<string, function>} signatures   Object with one or multiple function signatures
 * @returns {function} The created typed-function.
 */

var _createTyped2 = function _createTyped() {
  // initially, return the original instance of typed-function
  // consecutively, return a new instance from typed.create.
  _createTyped2 = typedFunction.create;
  return typedFunction;
};

var dependencies = ['?BigNumber', '?Complex', '?DenseMatrix', '?Fraction'];
/**
 * Factory function for creating a new typed instance
 * @param {Object} dependencies   Object with data types like Complex and BigNumber
 * @returns {Function}
 */

var createTyped = /* #__PURE__ */factory('typed', dependencies, function createTyped(_ref) {
  var {
    BigNumber,
    Complex,
    DenseMatrix,
    Fraction
  } = _ref;

  // TODO: typed-function must be able to silently ignore signatures with unknown data types
  // get a new instance of typed-function
  var typed = _createTyped2(); // define all types. The order of the types determines in which order function
  // arguments are type-checked (so for performance it's important to put the
  // most used types first).


  typed.clear();
  typed.addTypes([{
    name: 'number',
    test: isNumber
  }, {
    name: 'Complex',
    test: isComplex
  }, {
    name: 'BigNumber',
    test: isBigNumber
  }, {
    name: 'Fraction',
    test: isFraction
  }, {
    name: 'Unit',
    test: isUnit
  }, // The following type matches a valid variable name, i.e., an alphanumeric
  // string starting with an alphabetic character. It is used (at least)
  // in the definition of the derivative() function, as the argument telling
  // what to differentiate over must (currently) be a variable.
  {
    name: 'identifier',
    test: s => isString && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])*$/.test(s)
  }, {
    name: 'string',
    test: isString
  }, {
    name: 'Chain',
    test: isChain
  }, {
    name: 'Array',
    test: isArray
  }, {
    name: 'Matrix',
    test: isMatrix
  }, {
    name: 'DenseMatrix',
    test: isDenseMatrix
  }, {
    name: 'SparseMatrix',
    test: isSparseMatrix
  }, {
    name: 'Range',
    test: isRange
  }, {
    name: 'Index',
    test: isIndex
  }, {
    name: 'boolean',
    test: isBoolean
  }, {
    name: 'ResultSet',
    test: isResultSet
  }, {
    name: 'Help',
    test: isHelp
  }, {
    name: 'function',
    test: isFunction
  }, {
    name: 'Date',
    test: isDate
  }, {
    name: 'RegExp',
    test: isRegExp
  }, {
    name: 'null',
    test: isNull
  }, {
    name: 'undefined',
    test: isUndefined
  }, {
    name: 'AccessorNode',
    test: isAccessorNode
  }, {
    name: 'ArrayNode',
    test: isArrayNode
  }, {
    name: 'AssignmentNode',
    test: isAssignmentNode
  }, {
    name: 'BlockNode',
    test: isBlockNode
  }, {
    name: 'ConditionalNode',
    test: isConditionalNode
  }, {
    name: 'ConstantNode',
    test: isConstantNode
  }, {
    name: 'FunctionNode',
    test: isFunctionNode
  }, {
    name: 'FunctionAssignmentNode',
    test: isFunctionAssignmentNode
  }, {
    name: 'IndexNode',
    test: isIndexNode
  }, {
    name: 'Node',
    test: isNode
  }, {
    name: 'ObjectNode',
    test: isObjectNode
  }, {
    name: 'OperatorNode',
    test: isOperatorNode
  }, {
    name: 'ParenthesisNode',
    test: isParenthesisNode
  }, {
    name: 'RangeNode',
    test: isRangeNode
  }, {
    name: 'RelationalNode',
    test: isRelationalNode
  }, {
    name: 'SymbolNode',
    test: isSymbolNode
  }, {
    name: 'Map',
    test: isMap
  }, {
    name: 'Object',
    test: isObject
  } // order 'Object' last, it matches on other classes too
  ]);
  typed.addConversions([{
    from: 'number',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      } // note: conversion from number to BigNumber can fail if x has >15 digits


      if (digits(x) > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
      }

      return new BigNumber(x);
    }
  }, {
    from: 'number',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }

      return new Complex(x, 0);
    }
  }, {
    from: 'BigNumber',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }

      return new Complex(x.toNumber(), 0);
    }
  }, {
    from: 'Fraction',
    to: 'BigNumber',
    convert: function convert(x) {
      throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' + 'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
    }
  }, {
    from: 'Fraction',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }

      return new Complex(x.valueOf(), 0);
    }
  }, {
    from: 'number',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }

      var f = new Fraction(x);

      if (f.valueOf() !== x) {
        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
      }

      return f;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: 'string',
    to: 'number',
    convert: function convert(x) {
      var n = Number(x);

      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }

      return n;
    }
  }, {
    from: 'string',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }

      try {
        return new BigNumber(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
      }
    }
  }, {
    from: 'string',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }

      try {
        return new Fraction(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
      }
    }
  }, {
    from: 'string',
    to: 'Complex',
    convert: function convert(x) {
      if (!Complex) {
        throwNoComplex(x);
      }

      try {
        return new Complex(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
      }
    }
  }, {
    from: 'boolean',
    to: 'number',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'boolean',
    to: 'BigNumber',
    convert: function convert(x) {
      if (!BigNumber) {
        throwNoBignumber(x);
      }

      return new BigNumber(+x);
    }
  }, {
    from: 'boolean',
    to: 'Fraction',
    convert: function convert(x) {
      if (!Fraction) {
        throwNoFraction(x);
      }

      return new Fraction(+x);
    }
  }, {
    from: 'boolean',
    to: 'string',
    convert: function convert(x) {
      return String(x);
    }
  }, {
    from: 'Array',
    to: 'Matrix',
    convert: function convert(array) {
      if (!DenseMatrix) {
        throwNoMatrix();
      }

      return new DenseMatrix(array);
    }
  }, {
    from: 'Matrix',
    to: 'Array',
    convert: function convert(matrix) {
      return matrix.valueOf();
    }
  }]); // Provide a suggestion on how to call a function elementwise
  // This was added primarily as guidance for the v10 -> v11 transition,
  // and could potentially be removed in the future if it no longer seems
  // to be helpful.

  typed.onMismatch = (name, args, signatures) => {
    var usualError = typed.createError(name, args, signatures);

    if (['wrongType', 'mismatch'].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some(sig => !sig.params.includes(','))) {
      var err = new TypeError("Function '".concat(name, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name, ")'."));
      err.data = usualError.data;
      throw err;
    }

    throw usualError;
  }; // Provide a suggestion on how to call a function elementwise
  // This was added primarily as guidance for the v10 -> v11 transition,
  // and could potentially be removed in the future if it no longer seems
  // to be helpful.


  typed.onMismatch = (name, args, signatures) => {
    var usualError = typed.createError(name, args, signatures);

    if (['wrongType', 'mismatch'].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some(sig => !sig.params.includes(','))) {
      var err = new TypeError("Function '".concat(name, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name, ")'."));
      err.data = usualError.data;
      throw err;
    }

    throw usualError;
  };

  return typed;
});

function throwNoBignumber(x) {
  throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
}

function throwNoComplex(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
}

function throwNoMatrix() {
  throw new Error('Cannot convert array into a Matrix: no class \'DenseMatrix\' provided');
}

function throwNoFraction(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
}

/*!
 *  decimal.js v10.4.1
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
  precision: 20,
  rounding: 4,
  modulo: 1,
  toExpNeg: -7,
  toExpPos: 21,
  minE: -EXP_LIMIT,
  maxE: EXP_LIMIT,
  crypto: false
}, inexact, quadrant, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = {toStringTag: tag};
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n--;
    if (n < 0)
      n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(!x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0);
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0)
        ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config$1(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone$1(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config$1;
  Decimal2.clone = clone$1;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, "lt");
}
function min() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone$1(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);

var name = 'BigNumber';
var dependencies$1 = ['?on', 'config'];
var createBigNumberClass = /* #__PURE__ */factory(name, dependencies$1, _ref => {
  var {
    on,
    config
  } = _ref;
  var BigNumber = Decimal.clone({
    precision: config.precision,
    modulo: Decimal.EUCLID
  });
  BigNumber.prototype = Object.create(BigNumber.prototype);
  /**
   * Attach type information
   */

  BigNumber.prototype.type = 'BigNumber';
  BigNumber.prototype.isBigNumber = true;
  /**
   * Get a JSON representation of a BigNumber containing
   * type information
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "BigNumber", "value": "0.2"}`
   */

  BigNumber.prototype.toJSON = function () {
    return {
      mathjs: 'BigNumber',
      value: this.toString()
    };
  };
  /**
   * Instantiate a BigNumber from a JSON object
   * @param {Object} json  a JSON object structured as:
   *                       `{"mathjs": "BigNumber", "value": "0.2"}`
   * @return {BigNumber}
   */


  BigNumber.fromJSON = function (json) {
    return new BigNumber(json.value);
  };

  if (on) {
    // listen for changed in the configuration, automatically apply changed precision
    on('config', function (curr, prev) {
      if (curr.precision !== prev.precision) {
        BigNumber.config({
          precision: curr.precision
        });
      }
    });
  }

  return BigNumber;
}, {
  isClass: true
});

var complex = createCommonjsModule(function (module, exports) {
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

/**
 *
 * This class allows the manipulation of complex numbers.
 * You can pass a complex number in different formats. Either as object, double, string or two integer parameters.
 *
 * Object form
 * { re: <real>, im: <imaginary> }
 * { arg: <angle>, abs: <radius> }
 * { phi: <angle>, r: <radius> }
 *
 * Array / Vector form
 * [ real, imaginary ]
 *
 * Double form
 * 99.3 - Single double value
 *
 * String form
 * '23.1337' - Simple real number
 * '15+3i' - a simple complex number
 * '3-i' - a simple complex number
 *
 * Example:
 *
 * var c = new Complex('99.3+8i');
 * c.mul({r: 3, i: 9}).div(4.9).sub(3, 2);
 *
 */

(function(root) {

  var cosh = Math.cosh || function(x) {
    return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
  };

  var sinh = Math.sinh || function(x) {
    return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
  };

  /**
   * Calculates cos(x) - 1 using Taylor series if x is small (-¼π ≤ x ≤ ¼π).
   *
   * @param {number} x
   * @returns {number} cos(x) - 1
   */
  var cosm1 = function(x) {

    var b = Math.PI / 4;
    if (-b > x || x > b) {
      return Math.cos(x) - 1.0;
    }

    /* Calculate horner form of polynomial of taylor series in Q
    var fac = 1, alt = 1, pol = {};
    for (var i = 0; i <= 16; i++) {
      fac*= i || 1;
      if (i % 2 == 0) {
        pol[i] = new Fraction(1, alt * fac);
        alt = -alt;
      }
    }
    console.log(new Polynomial(pol).toHorner()); // (((((((1/20922789888000x^2-1/87178291200)x^2+1/479001600)x^2-1/3628800)x^2+1/40320)x^2-1/720)x^2+1/24)x^2-1/2)x^2+1
    */

    var xx = x * x;
    return xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx / 20922789888000
                  - 1 / 87178291200)
                + 1 / 479001600)
              - 1 / 3628800)
            + 1 / 40320)
          - 1 / 720)
        + 1 / 24)
      - 1 / 2);
  };

  var hypot = function(x, y) {

    var a = Math.abs(x);
    var b = Math.abs(y);

    if (a < 3000 && b < 3000) {
      return Math.sqrt(a * a + b * b);
    }

    if (a < b) {
      a = b;
      b = x / y;
    } else {
      b = y / x;
    }
    return a * Math.sqrt(1 + b * b);
  };

  var parser_exit = function() {
    throw SyntaxError('Invalid Param');
  };

  /**
   * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
   *
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  function logHypot(a, b) {

    var _a = Math.abs(a);
    var _b = Math.abs(b);

    if (a === 0) {
      return Math.log(_b);
    }

    if (b === 0) {
      return Math.log(_a);
    }

    if (_a < 3000 && _b < 3000) {
      return Math.log(a * a + b * b) * 0.5;
    }

    /* I got 4 ideas to compute this property without overflow:
     *
     * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
     *
     * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

     Math.log(a * a + b * b) / 2

     *
     *
     * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

     var fn = function(a, b) {
     a = Math.abs(a);
     b = Math.abs(b);
     var t = Math.min(a, b);
     a = Math.max(a, b);
     t = t / a;

     return Math.log(a) + Math.log(1 + t * t) / 2;
     };

     * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

     Math.log(a / Math.cos(Math.atan2(b, a)))

     * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

     Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

     */

     a = a / 2;
     b = b / 2;

    return 0.5 * Math.log(a * a + b * b) + Math.LN2;
  }

  var parse = function(a, b) {

    var z = { 're': 0, 'im': 0 };

    if (a === undefined || a === null) {
      z['re'] =
      z['im'] = 0;
    } else if (b !== undefined) {
      z['re'] = a;
      z['im'] = b;
    } else
      switch (typeof a) {

        case 'object':

          if ('im' in a && 're' in a) {
            z['re'] = a['re'];
            z['im'] = a['im'];
          } else if ('abs' in a && 'arg' in a) {
            if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['abs'] * Math.cos(a['arg']);
            z['im'] = a['abs'] * Math.sin(a['arg']);
          } else if ('r' in a && 'phi' in a) {
            if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['r'] * Math.cos(a['phi']);
            z['im'] = a['r'] * Math.sin(a['phi']);
          } else if (a.length === 2) { // Quick array check
            z['re'] = a[0];
            z['im'] = a[1];
          } else {
            parser_exit();
          }
          break;

        case 'string':

          z['im'] = /* void */
          z['re'] = 0;

          var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
          var plus = 1;
          var minus = 0;

          if (tokens === null) {
            parser_exit();
          }

          for (var i = 0; i < tokens.length; i++) {

            var c = tokens[i];

            if (c === ' ' || c === '\t' || c === '\n') ; else if (c === '+') {
              plus++;
            } else if (c === '-') {
              minus++;
            } else if (c === 'i' || c === 'I') {

              if (plus + minus === 0) {
                parser_exit();
              }

              if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
                i++;
              } else {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
              }
              plus = minus = 0;

            } else {

              if (plus + minus === 0 || isNaN(c)) {
                parser_exit();
              }

              if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
                z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
                i++;
              } else {
                z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
              }
              plus = minus = 0;
            }
          }

          // Still something on the stack
          if (plus + minus > 0) {
            parser_exit();
          }
          break;

        case 'number':
          z['im'] = 0;
          z['re'] = a;
          break;

        default:
          parser_exit();
      }

    return z;
  };

  /**
   * @constructor
   * @returns {Complex}
   */
  function Complex(a, b) {

    if (!(this instanceof Complex)) {
      return new Complex(a, b);
    }

    var z = parse(a, b);

    this['re'] = z['re'];
    this['im'] = z['im'];
  }

  Complex.prototype = {

    're': 0,
    'im': 0,

    /**
     * Calculates the sign of a complex number, which is a normalized complex
     *
     * @returns {Complex}
     */
    'sign': function() {

      var abs = this['abs']();

      return new Complex(
        this['re'] / abs,
        this['im'] / abs);
    },

    /**
     * Adds two complex numbers
     *
     * @returns {Complex}
     */
    'add': function(a, b) {

      var z = new Complex(a, b);

      // Infinity + Infinity = NaN
      if (this['isInfinite']() && z['isInfinite']()) {
        return Complex['NAN'];
      }

      // Infinity + z = Infinity { where z != Infinity }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      return new Complex(
        this['re'] + z['re'],
        this['im'] + z['im']);
    },

    /**
     * Subtracts two complex numbers
     *
     * @returns {Complex}
     */
    'sub': function(a, b) {

      var z = new Complex(a, b);

      // Infinity - Infinity = NaN
      if (this['isInfinite']() && z['isInfinite']()) {
        return Complex['NAN'];
      }

      // Infinity - z = Infinity { where z != Infinity }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      return new Complex(
        this['re'] - z['re'],
        this['im'] - z['im']);
    },

    /**
     * Multiplies two complex numbers
     *
     * @returns {Complex}
     */
    'mul': function(a, b) {

      var z = new Complex(a, b);

      // Infinity * 0 = NaN
      if ((this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())) {
        return Complex['NAN'];
      }

      // Infinity * z = Infinity { where z != 0 }
      if (this['isInfinite']() || z['isInfinite']()) {
        return Complex['INFINITY'];
      }

      // Short circuit for real values
      if (z['im'] === 0 && this['im'] === 0) {
        return new Complex(this['re'] * z['re'], 0);
      }

      return new Complex(
        this['re'] * z['re'] - this['im'] * z['im'],
        this['re'] * z['im'] + this['im'] * z['re']);
    },

    /**
     * Divides two complex numbers
     *
     * @returns {Complex}
     */
    'div': function(a, b) {

      var z = new Complex(a, b);

      // 0 / 0 = NaN and Infinity / Infinity = NaN
      if ((this['isZero']() && z['isZero']()) || (this['isInfinite']() && z['isInfinite']())) {
        return Complex['NAN'];
      }

      // Infinity / 0 = Infinity
      if (this['isInfinite']() || z['isZero']()) {
        return Complex['INFINITY'];
      }

      // 0 / Infinity = 0
      if (this['isZero']() || z['isInfinite']()) {
        return Complex['ZERO'];
      }

      a = this['re'];
      b = this['im'];

      var c = z['re'];
      var d = z['im'];
      var t, x;

      if (0 === d) {
        // Divisor is real
        return new Complex(a / c, b / c);
      }

      if (Math.abs(c) < Math.abs(d)) {

        x = c / d;
        t = c * x + d;

        return new Complex(
          (a * x + b) / t,
          (b * x - a) / t);

      } else {

        x = d / c;
        t = d * x + c;

        return new Complex(
          (a + b * x) / t,
          (b - a * x) / t);
      }
    },

    /**
     * Calculate the power of two complex numbers
     *
     * @returns {Complex}
     */
    'pow': function(a, b) {

      var z = new Complex(a, b);

      a = this['re'];
      b = this['im'];

      if (z['isZero']()) {
        return Complex['ONE'];
      }

      // If the exponent is real
      if (z['im'] === 0) {

        if (b === 0 && a > 0) {

          return new Complex(Math.pow(a, z['re']), 0);

        } else if (a === 0) { // If base is fully imaginary

          switch ((z['re'] % 4 + 4) % 4) {
            case 0:
              return new Complex(Math.pow(b, z['re']), 0);
            case 1:
              return new Complex(0, Math.pow(b, z['re']));
            case 2:
              return new Complex(-Math.pow(b, z['re']), 0);
            case 3:
              return new Complex(0, -Math.pow(b, z['re']));
          }
        }
      }

      /* I couldn't find a good formula, so here is a derivation and optimization
       *
       * z_1^z_2 = (a + bi)^(c + di)
       *         = exp((c + di) * log(a + bi)
       *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
       * =>...
       * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
       *
       * =>...
       * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
       *
       * =>
       * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
       * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
       *
       */

      if (a === 0 && b === 0 && z['re'] > 0 && z['im'] >= 0) {
        return Complex['ZERO'];
      }

      var arg = Math.atan2(b, a);
      var loh = logHypot(a, b);

      a = Math.exp(z['re'] * loh - z['im'] * arg);
      b = z['im'] * loh + z['re'] * arg;
      return new Complex(
        a * Math.cos(b),
        a * Math.sin(b));
    },

    /**
     * Calculate the complex square root
     *
     * @returns {Complex}
     */
    'sqrt': function() {

      var a = this['re'];
      var b = this['im'];
      var r = this['abs']();

      var re, im;

      if (a >= 0) {

        if (b === 0) {
          return new Complex(Math.sqrt(a), 0);
        }

        re = 0.5 * Math.sqrt(2.0 * (r + a));
      } else {
        re = Math.abs(b) / Math.sqrt(2 * (r - a));
      }

      if (a <= 0) {
        im = 0.5 * Math.sqrt(2.0 * (r - a));
      } else {
        im = Math.abs(b) / Math.sqrt(2 * (r + a));
      }

      return new Complex(re, b < 0 ? -im : im);
    },

    /**
     * Calculate the complex exponent
     *
     * @returns {Complex}
     */
    'exp': function() {

      var tmp = Math.exp(this['re']);

      if (this['im'] === 0) ;
      return new Complex(
        tmp * Math.cos(this['im']),
        tmp * Math.sin(this['im']));
    },

    /**
     * Calculate the complex exponent and subtracts one.
     *
     * This may be more accurate than `Complex(x).exp().sub(1)` if
     * `x` is small.
     *
     * @returns {Complex}
     */
    'expm1': function() {

      /**
       * exp(a + i*b) - 1
       = exp(a) * (cos(b) + j*sin(b)) - 1
       = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
       */

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.expm1(a) * Math.cos(b) + cosm1(b),
        Math.exp(a) * Math.sin(b));
    },

    /**
     * Calculate the natural log
     *
     * @returns {Complex}
     */
    'log': function() {

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        logHypot(a, b),
        Math.atan2(b, a));
    },

    /**
     * Calculate the magnitude of the complex number
     *
     * @returns {number}
     */
    'abs': function() {

      return hypot(this['re'], this['im']);
    },

    /**
     * Calculate the angle of the complex number
     *
     * @returns {number}
     */
    'arg': function() {

      return Math.atan2(this['im'], this['re']);
    },

    /**
     * Calculate the sine of the complex number
     *
     * @returns {Complex}
     */
    'sin': function() {

      // sin(z) = ( e^iz - e^-iz ) / 2i 
      //        = sin(a)cosh(b) + i cos(a)sinh(b)

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.sin(a) * cosh(b),
        Math.cos(a) * sinh(b));
    },

    /**
     * Calculate the cosine
     *
     * @returns {Complex}
     */
    'cos': function() {

      // cos(z) = ( e^iz + e^-iz ) / 2 
      //        = cos(a)cosh(b) - i sin(a)sinh(b)

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        Math.cos(a) * cosh(b),
        -Math.sin(a) * sinh(b));
    },

    /**
     * Calculate the tangent
     *
     * @returns {Complex}
     */
    'tan': function() {

      // tan(z) = sin(z) / cos(z) 
      //        = ( e^iz - e^-iz ) / ( i( e^iz + e^-iz ) )
      //        = ( e^2iz - 1 ) / i( e^2iz + 1 )
      //        = ( sin(2a) + i sinh(2b) ) / ( cos(2a) + cosh(2b) )

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = Math.cos(a) + cosh(b);

      return new Complex(
        Math.sin(a) / d,
        sinh(b) / d);
    },

    /**
     * Calculate the cotangent
     *
     * @returns {Complex}
     */
    'cot': function() {

      // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = Math.cos(a) - cosh(b);

      return new Complex(
        -Math.sin(a) / d,
        sinh(b) / d);
    },

    /**
     * Calculate the secant
     *
     * @returns {Complex}
     */
    'sec': function() {

      // sec(c) = 2 / (e^(ci) + e^(-ci))

      var a = this['re'];
      var b = this['im'];
      var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

      return new Complex(
        Math.cos(a) * cosh(b) / d,
        Math.sin(a) * sinh(b) / d);
    },

    /**
     * Calculate the cosecans
     *
     * @returns {Complex}
     */
    'csc': function() {

      // csc(c) = 2i / (e^(ci) - e^(-ci))

      var a = this['re'];
      var b = this['im'];
      var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

      return new Complex(
        Math.sin(a) * cosh(b) / d,
        -Math.cos(a) * sinh(b) / d);
    },

    /**
     * Calculate the complex arcus sinus
     *
     * @returns {Complex}
     */
    'asin': function() {

      // asin(c) = -i * log(ci + sqrt(1 - c^2))

      var a = this['re'];
      var b = this['im'];

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1['re'] - b,
        t1['im'] + a)['log']();

      return new Complex(t2['im'], -t2['re']);
    },

    /**
     * Calculate the complex arcus cosinus
     *
     * @returns {Complex}
     */
    'acos': function() {

      // acos(c) = i * log(c - i * sqrt(1 - c^2))

      var a = this['re'];
      var b = this['im'];

      var t1 = new Complex(
        b * b - a * a + 1,
        -2 * a * b)['sqrt']();

      var t2 = new Complex(
        t1['re'] - b,
        t1['im'] + a)['log']();

      return new Complex(Math.PI / 2 - t2['im'], t2['re']);
    },

    /**
     * Calculate the complex arcus tangent
     *
     * @returns {Complex}
     */
    'atan': function() {

      // atan(c) = i / 2 log((i + x) / (i - x))

      var a = this['re'];
      var b = this['im'];

      if (a === 0) {

        if (b === 1) {
          return new Complex(0, Infinity);
        }

        if (b === -1) {
          return new Complex(0, -Infinity);
        }
      }

      var d = a * a + (1.0 - b) * (1.0 - b);

      var t1 = new Complex(
        (1 - b * b - a * a) / d,
        -2 * a / d).log();

      return new Complex(-0.5 * t1['im'], 0.5 * t1['re']);
    },

    /**
     * Calculate the complex arcus cotangent
     *
     * @returns {Complex}
     */
    'acot': function() {

      // acot(c) = i / 2 log((c - i) / (c + i))

      var a = this['re'];
      var b = this['im'];

      if (b === 0) {
        return new Complex(Math.atan2(1, a), 0);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).atan()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).atan();
    },

    /**
     * Calculate the complex arcus secant
     *
     * @returns {Complex}
     */
    'asec': function() {

      // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(0, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).acos()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acos();
    },

    /**
     * Calculate the complex arcus cosecans
     *
     * @returns {Complex}
     */
    'acsc': function() {

      // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(Math.PI / 2, Infinity);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).asin()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).asin();
    },

    /**
     * Calculate the complex sinh
     *
     * @returns {Complex}
     */
    'sinh': function() {

      // sinh(c) = (e^c - e^-c) / 2

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        sinh(a) * Math.cos(b),
        cosh(a) * Math.sin(b));
    },

    /**
     * Calculate the complex cosh
     *
     * @returns {Complex}
     */
    'cosh': function() {

      // cosh(c) = (e^c + e^-c) / 2

      var a = this['re'];
      var b = this['im'];

      return new Complex(
        cosh(a) * Math.cos(b),
        sinh(a) * Math.sin(b));
    },

    /**
     * Calculate the complex tanh
     *
     * @returns {Complex}
     */
    'tanh': function() {

      // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = cosh(a) + Math.cos(b);

      return new Complex(
        sinh(a) / d,
        Math.sin(b) / d);
    },

    /**
     * Calculate the complex coth
     *
     * @returns {Complex}
     */
    'coth': function() {

      // coth(c) = (e^c + e^-c) / (e^c - e^-c)

      var a = 2 * this['re'];
      var b = 2 * this['im'];
      var d = cosh(a) - Math.cos(b);

      return new Complex(
        sinh(a) / d,
        -Math.sin(b) / d);
    },

    /**
     * Calculate the complex coth
     *
     * @returns {Complex}
     */
    'csch': function() {

      // csch(c) = 2 / (e^c - e^-c)

      var a = this['re'];
      var b = this['im'];
      var d = Math.cos(2 * b) - cosh(2 * a);

      return new Complex(
        -2 * sinh(a) * Math.cos(b) / d,
        2 * cosh(a) * Math.sin(b) / d);
    },

    /**
     * Calculate the complex sech
     *
     * @returns {Complex}
     */
    'sech': function() {

      // sech(c) = 2 / (e^c + e^-c)

      var a = this['re'];
      var b = this['im'];
      var d = Math.cos(2 * b) + cosh(2 * a);

      return new Complex(
        2 * cosh(a) * Math.cos(b) / d,
        -2 * sinh(a) * Math.sin(b) / d);
    },

    /**
     * Calculate the complex asinh
     *
     * @returns {Complex}
     */
    'asinh': function() {

      // asinh(c) = log(c + sqrt(c^2 + 1))

      var tmp = this['im'];
      this['im'] = -this['re'];
      this['re'] = tmp;
      var res = this['asin']();

      this['re'] = -this['im'];
      this['im'] = tmp;
      tmp = res['re'];

      res['re'] = -res['im'];
      res['im'] = tmp;
      return res;
    },

    /**
     * Calculate the complex acosh
     *
     * @returns {Complex}
     */
    'acosh': function() {

      // acosh(c) = log(c + sqrt(c^2 - 1))

      var res = this['acos']();
      if (res['im'] <= 0) {
        var tmp = res['re'];
        res['re'] = -res['im'];
        res['im'] = tmp;
      } else {
        var tmp = res['im'];
        res['im'] = -res['re'];
        res['re'] = tmp;
      }
      return res;
    },

    /**
     * Calculate the complex atanh
     *
     * @returns {Complex}
     */
    'atanh': function() {

      // atanh(c) = log((1+c) / (1-c)) / 2

      var a = this['re'];
      var b = this['im'];

      var noIM = a > 1 && b === 0;
      var oneMinus = 1 - a;
      var onePlus = 1 + a;
      var d = oneMinus * oneMinus + b * b;

      var x = (d !== 0)
        ? new Complex(
          (onePlus * oneMinus - b * b) / d,
          (b * oneMinus + onePlus * b) / d)
        : new Complex(
          (a !== -1) ? (a / 0) : 0,
          (b !== 0) ? (b / 0) : 0);

      var temp = x['re'];
      x['re'] = logHypot(x['re'], x['im']) / 2;
      x['im'] = Math.atan2(x['im'], temp) / 2;
      if (noIM) {
        x['im'] = -x['im'];
      }
      return x;
    },

    /**
     * Calculate the complex acoth
     *
     * @returns {Complex}
     */
    'acoth': function() {

      // acoth(c) = log((c+1) / (c-1)) / 2

      var a = this['re'];
      var b = this['im'];

      if (a === 0 && b === 0) {
        return new Complex(0, Math.PI / 2);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).atanh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).atanh();
    },

    /**
     * Calculate the complex acsch
     *
     * @returns {Complex}
     */
    'acsch': function() {

      // acsch(c) = log((1+sqrt(1+c^2))/c)

      var a = this['re'];
      var b = this['im'];

      if (b === 0) {

        return new Complex(
          (a !== 0)
            ? Math.log(a + Math.sqrt(a * a + 1))
            : Infinity, 0);
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).asinh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).asinh();
    },

    /**
     * Calculate the complex asech
     *
     * @returns {Complex}
     */
    'asech': function() {

      // asech(c) = log((1+sqrt(1-c^2))/c)

      var a = this['re'];
      var b = this['im'];

      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      var d = a * a + b * b;
      return (d !== 0)
        ? new Complex(
          a / d,
          -b / d).acosh()
        : new Complex(
          (a !== 0) ? a / 0 : 0,
          (b !== 0) ? -b / 0 : 0).acosh();
    },

    /**
     * Calculate the complex inverse 1/z
     *
     * @returns {Complex}
     */
    'inverse': function() {

      // 1 / 0 = Infinity and 1 / Infinity = 0
      if (this['isZero']()) {
        return Complex['INFINITY'];
      }

      if (this['isInfinite']()) {
        return Complex['ZERO'];
      }

      var a = this['re'];
      var b = this['im'];

      var d = a * a + b * b;

      return new Complex(a / d, -b / d);
    },

    /**
     * Returns the complex conjugate
     *
     * @returns {Complex}
     */
    'conjugate': function() {

      return new Complex(this['re'], -this['im']);
    },

    /**
     * Gets the negated complex number
     *
     * @returns {Complex}
     */
    'neg': function() {

      return new Complex(-this['re'], -this['im']);
    },

    /**
     * Ceils the actual complex number
     *
     * @returns {Complex}
     */
    'ceil': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.ceil(this['re'] * places) / places,
        Math.ceil(this['im'] * places) / places);
    },

    /**
     * Floors the actual complex number
     *
     * @returns {Complex}
     */
    'floor': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.floor(this['re'] * places) / places,
        Math.floor(this['im'] * places) / places);
    },

    /**
     * Ceils the actual complex number
     *
     * @returns {Complex}
     */
    'round': function(places) {

      places = Math.pow(10, places || 0);

      return new Complex(
        Math.round(this['re'] * places) / places,
        Math.round(this['im'] * places) / places);
    },

    /**
     * Compares two complex numbers
     *
     * **Note:** new Complex(Infinity).equals(Infinity) === false
     *
     * @returns {boolean}
     */
    'equals': function(a, b) {

      var z = new Complex(a, b);

      return Math.abs(z['re'] - this['re']) <= Complex['EPSILON'] &&
        Math.abs(z['im'] - this['im']) <= Complex['EPSILON'];
    },

    /**
     * Clones the actual object
     *
     * @returns {Complex}
     */
    'clone': function() {

      return new Complex(this['re'], this['im']);
    },

    /**
     * Gets a string of the actual complex number
     *
     * @returns {string}
     */
    'toString': function() {

      var a = this['re'];
      var b = this['im'];
      var ret = "";

      if (this['isNaN']()) {
        return 'NaN';
      }

      if (this['isInfinite']()) {
        return 'Infinity';
      }

      if (Math.abs(a) < Complex['EPSILON']) {
        a = 0;
      }

      if (Math.abs(b) < Complex['EPSILON']) {
        b = 0;
      }

      // If is real number
      if (b === 0) {
        return ret + a;
      }

      if (a !== 0) {
        ret += a;
        ret += " ";
        if (b < 0) {
          b = -b;
          ret += "-";
        } else {
          ret += "+";
        }
        ret += " ";
      } else if (b < 0) {
        b = -b;
        ret += "-";
      }

      if (1 !== b) { // b is the absolute imaginary part
        ret += b;
      }
      return ret + "i";
    },

    /**
     * Returns the actual number as a vector
     *
     * @returns {Array}
     */
    'toVector': function() {

      return [this['re'], this['im']];
    },

    /**
     * Returns the actual real value of the current object
     *
     * @returns {number|null}
     */
    'valueOf': function() {

      if (this['im'] === 0) {
        return this['re'];
      }
      return null;
    },

    /**
     * Determines whether a complex number is not on the Riemann sphere.
     *
     * @returns {boolean}
     */
    'isNaN': function() {
      return isNaN(this['re']) || isNaN(this['im']);
    },

    /**
     * Determines whether or not a complex number is at the zero pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isZero': function() {
      return this['im'] === 0 && this['re'] === 0;
    },

    /**
     * Determines whether a complex number is not at the infinity pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isFinite': function() {
      return isFinite(this['re']) && isFinite(this['im']);
    },

    /**
     * Determines whether or not a complex number is at the infinity pole of the
     * Riemann sphere.
     *
     * @returns {boolean}
     */
    'isInfinite': function() {
      return !(this['isNaN']() || this['isFinite']());
    }
  };

  Complex['ZERO'] = new Complex(0, 0);
  Complex['ONE'] = new Complex(1, 0);
  Complex['I'] = new Complex(0, 1);
  Complex['PI'] = new Complex(Math.PI, 0);
  Complex['E'] = new Complex(Math.E, 0);
  Complex['INFINITY'] = new Complex(Infinity, Infinity);
  Complex['NAN'] = new Complex(NaN, NaN);
  Complex['EPSILON'] = 1e-15;

  {
    Object.defineProperty(Complex, "__esModule", { 'value': true });
    Complex['default'] = Complex;
    Complex['Complex'] = Complex;
    module['exports'] = Complex;
  }

})();
});

var Complex = /*@__PURE__*/getDefaultExportFromCjs(complex);

var name$1 = 'Complex';
var dependencies$2 = [];
var createComplexClass = /* #__PURE__ */factory(name$1, dependencies$2, () => {
  /**
   * Attach type information
   */
  Object.defineProperty(Complex, 'name', {
    value: 'Complex'
  });
  Complex.prototype.constructor = Complex;
  Complex.prototype.type = 'Complex';
  Complex.prototype.isComplex = true;
  /**
   * Get a JSON representation of the complex number
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Complex", "re": 2, "im": 3}`
   */

  Complex.prototype.toJSON = function () {
    return {
      mathjs: 'Complex',
      re: this.re,
      im: this.im
    };
  };
  /*
   * Return the value of the complex number in polar notation
   * The angle phi will be set in the interval of [-pi, pi].
   * @return {{r: number, phi: number}} Returns and object with properties r and phi.
   */


  Complex.prototype.toPolar = function () {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  };
  /**
   * Get a string representation of the complex number,
   * with optional formatting options.
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @return {string} str
   */


  Complex.prototype.format = function (options) {
    var str = '';
    var im = this.im;
    var re = this.re;
    var strRe = format(this.re, options);
    var strIm = format(this.im, options); // round either re or im when smaller than the configured precision

    var precision = isNumber(options) ? options : options ? options.precision : null;

    if (precision !== null) {
      var epsilon = Math.pow(10, -precision);

      if (Math.abs(re / im) < epsilon) {
        re = 0;
      }

      if (Math.abs(im / re) < epsilon) {
        im = 0;
      }
    }

    if (im === 0) {
      // real value
      str = strRe;
    } else if (re === 0) {
      // purely complex value
      if (im === 1) {
        str = 'i';
      } else if (im === -1) {
        str = '-i';
      } else {
        str = strIm + 'i';
      }
    } else {
      // complex value
      if (im < 0) {
        if (im === -1) {
          str = strRe + ' - i';
        } else {
          str = strRe + ' - ' + strIm.substring(1) + 'i';
        }
      } else {
        if (im === 1) {
          str = strRe + ' + i';
        } else {
          str = strRe + ' + ' + strIm + 'i';
        }
      }
    }

    return str;
  };
  /**
   * Create a complex number from polar coordinates
   *
   * Usage:
   *
   *     Complex.fromPolar(r: number, phi: number) : Complex
   *     Complex.fromPolar({r: number, phi: number}) : Complex
   *
   * @param {*} args...
   * @return {Complex}
   */


  Complex.fromPolar = function (args) {
    switch (arguments.length) {
      case 1:
        {
          var arg = arguments[0];

          if (typeof arg === 'object') {
            return Complex(arg);
          } else {
            throw new TypeError('Input has to be an object with r and phi keys.');
          }
        }

      case 2:
        {
          var r = arguments[0];
          var phi = arguments[1];

          if (isNumber(r)) {
            if (isUnit(phi) && phi.hasBase('ANGLE')) {
              // convert unit to a number in radians
              phi = phi.toNumber('rad');
            }

            if (isNumber(phi)) {
              return new Complex({
                r,
                phi
              });
            }

            throw new TypeError('Phi is not a number nor an angle unit.');
          } else {
            throw new TypeError('Radius r is not a number.');
          }
        }

      default:
        throw new SyntaxError('Wrong number of arguments in function fromPolar');
    }
  };

  Complex.prototype.valueOf = Complex.prototype.toString;
  /**
   * Create a Complex number from a JSON object
   * @param {Object} json  A JSON Object structured as
   *                       {"mathjs": "Complex", "re": 2, "im": 3}
   *                       All properties are optional, default values
   *                       for `re` and `im` are 0.
   * @return {Complex} Returns a new Complex number
   */

  Complex.fromJSON = function (json) {
    return new Complex(json);
  };
  /**
   * Compare two complex numbers, `a` and `b`:
   *
   * - Returns 1 when the real part of `a` is larger than the real part of `b`
   * - Returns -1 when the real part of `a` is smaller than the real part of `b`
   * - Returns 1 when the real parts are equal
   *   and the imaginary part of `a` is larger than the imaginary part of `b`
   * - Returns -1 when the real parts are equal
   *   and the imaginary part of `a` is smaller than the imaginary part of `b`
   * - Returns 0 when both real and imaginary parts are equal.
   *
   * @params {Complex} a
   * @params {Complex} b
   * @returns {number} Returns the comparison result: -1, 0, or 1
   */


  Complex.compare = function (a, b) {
    if (a.re > b.re) {
      return 1;
    }

    if (a.re < b.re) {
      return -1;
    }

    if (a.im > b.im) {
      return 1;
    }

    if (a.im < b.im) {
      return -1;
    }

    return 0;
  };

  return Complex;
}, {
  isClass: true
});

var fraction = createCommonjsModule(function (module, exports) {
/**
 * @license Fraction.js v4.2.0 05/03/2022
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/


/**
 *
 * This class offers the possibility to calculate fractions.
 * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
 *
 * Array/Object form
 * [ 0 => <nominator>, 1 => <denominator> ]
 * [ n => <nominator>, d => <denominator> ]
 *
 * Integer form
 * - Single integer value
 *
 * Double form
 * - Single double value
 *
 * String form
 * 123.456 - a simple double
 * 123/456 - a string fraction
 * 123.'456' - a double with repeating decimal places
 * 123.(456) - synonym
 * 123.45'6' - a double with repeating last place
 * 123.45(6) - synonym
 *
 * Example:
 *
 * var f = new Fraction("9.4'31'");
 * f.mul([-4, 3]).div(4.9);
 *
 */

(function(root) {

  // Maximum search depth for cyclic rational numbers. 2000 should be more than enough.
  // Example: 1/7 = 0.(142857) has 6 repeating decimal places.
  // If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits
  var MAX_CYCLE_LEN = 2000;

  // Parsed data to avoid calling "new" all the time
  var P = {
    "s": 1,
    "n": 0,
    "d": 1
  };

  function assign(n, s) {

    if (isNaN(n = parseInt(n, 10))) {
      throw Fraction['InvalidParameter'];
    }
    return n * s;
  }

  // Creates a new Fraction internally without the need of the bulky constructor
  function newFraction(n, d) {

    if (d === 0) {
      throw Fraction['DivisionByZero'];
    }

    var f = Object.create(Fraction.prototype);
    f["s"] = n < 0 ? -1 : 1;

    n = n < 0 ? -n : n;

    var a = gcd(n, d);

    f["n"] = n / a;
    f["d"] = d / a;
    return f;
  }

  function factorize(num) {

    var factors = {};

    var n = num;
    var i = 2;
    var s = 4;

    while (s <= n) {

      while (n % i === 0) {
        n/= i;
        factors[i] = (factors[i] || 0) + 1;
      }
      s+= 1 + 2 * i++;
    }

    if (n !== num) {
      if (n > 1)
        factors[n] = (factors[n] || 0) + 1;
    } else {
      factors[num] = (factors[num] || 0) + 1;
    }
    return factors;
  }

  var parse = function(p1, p2) {

    var n = 0, d = 1, s = 1;
    var v = 0, w = 0, x = 0, y = 1, z = 1;

    var A = 0, B = 1;
    var C = 1, D = 1;

    var N = 10000000;
    var M;

    if (p1 === undefined || p1 === null) ; else if (p2 !== undefined) {
      n = p1;
      d = p2;
      s = n * d;

      if (n % 1 !== 0 || d % 1 !== 0) {
        throw Fraction['NonIntegerParameter'];
      }

    } else
      switch (typeof p1) {

        case "object":
          {
            if ("d" in p1 && "n" in p1) {
              n = p1["n"];
              d = p1["d"];
              if ("s" in p1)
                n*= p1["s"];
            } else if (0 in p1) {
              n = p1[0];
              if (1 in p1)
                d = p1[1];
            } else {
              throw Fraction['InvalidParameter'];
            }
            s = n * d;
            break;
          }
        case "number":
          {
            if (p1 < 0) {
              s = p1;
              p1 = -p1;
            }

            if (p1 % 1 === 0) {
              n = p1;
            } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow

              if (p1 >= 1) {
                z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
                p1/= z;
              }

              // Using Farey Sequences
              // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

              while (B <= N && D <= N) {
                M = (A + C) / (B + D);

                if (p1 === M) {
                  if (B + D <= N) {
                    n = A + C;
                    d = B + D;
                  } else if (D > B) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                  break;

                } else {

                  if (p1 > M) {
                    A+= C;
                    B+= D;
                  } else {
                    C+= A;
                    D+= B;
                  }

                  if (B > N) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                }
              }
              n*= z;
            } else if (isNaN(p1) || isNaN(p2)) {
              d = n = NaN;
            }
            break;
          }
        case "string":
          {
            B = p1.match(/\d+|./g);

            if (B === null)
              throw Fraction['InvalidParameter'];

            if (B[A] === '-') {// Check for minus sign at the beginning
              s = -1;
              A++;
            } else if (B[A] === '+') {// Check for plus sign at the beginning
              A++;
            }

            if (B.length === A + 1) { // Check if it's just a simple number "1234"
              w = assign(B[A++], s);
            } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number

              if (B[A] !== '.') { // Handle 0.5 and .5
                v = assign(B[A++], s);
              }
              A++;

              // Check for decimal places
              if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
                w = assign(B[A], s);
                y = Math.pow(10, B[A].length);
                A++;
              }

              // Check for repeating places
              if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
                x = assign(B[A + 1], s);
                z = Math.pow(10, B[A + 1].length) - 1;
                A+= 3;
              }

            } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
              w = assign(B[A], s);
              y = assign(B[A + 2], 1);
              A+= 3;
            } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"
              v = assign(B[A], s);
              w = assign(B[A + 2], s);
              y = assign(B[A + 4], 1);
              A+= 5;
            }

            if (B.length <= A) { // Check for more tokens on the stack
              d = y * z;
              s = /* void */
              n = x + d * v + z * w;
              break;
            }

            /* Fall through on error */
          }
        default:
          throw Fraction['InvalidParameter'];
      }

    if (d === 0) {
      throw Fraction['DivisionByZero'];
    }

    P["s"] = s < 0 ? -1 : 1;
    P["n"] = Math.abs(n);
    P["d"] = Math.abs(d);
  };

  function modpow(b, e, m) {

    var r = 1;
    for (; e > 0; b = (b * b) % m, e >>= 1) {

      if (e & 1) {
        r = (r * b) % m;
      }
    }
    return r;
  }


  function cycleLen(n, d) {

    for (; d % 2 === 0;
      d/= 2) {
    }

    for (; d % 5 === 0;
      d/= 5) {
    }

    if (d === 1) // Catch non-cyclic numbers
      return 0;

    // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
    // 10^(d-1) % d == 1
    // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
    // as we want to translate the numbers to strings.

    var rem = 10 % d;
    var t = 1;

    for (; rem !== 1; t++) {
      rem = rem * 10 % d;

      if (t > MAX_CYCLE_LEN)
        return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
    }
    return t;
  }


  function cycleStart(n, d, len) {

    var rem1 = 1;
    var rem2 = modpow(10, len, d);

    for (var t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)
      // Solve 10^s == 10^(s+t) (mod d)

      if (rem1 === rem2)
        return t;

      rem1 = rem1 * 10 % d;
      rem2 = rem2 * 10 % d;
    }
    return 0;
  }

  function gcd(a, b) {

    if (!a)
      return b;
    if (!b)
      return a;

    while (1) {
      a%= b;
      if (!a)
        return b;
      b%= a;
      if (!b)
        return a;
    }
  }
  /**
   * Module constructor
   *
   * @constructor
   * @param {number|Fraction=} a
   * @param {number=} b
   */
  function Fraction(a, b) {

    parse(a, b);

    if (this instanceof Fraction) {
      a = gcd(P["d"], P["n"]); // Abuse variable a
      this["s"] = P["s"];
      this["n"] = P["n"] / a;
      this["d"] = P["d"] / a;
    } else {
      return newFraction(P['s'] * P['n'], P['d']);
    }
  }

  Fraction['DivisionByZero'] = new Error("Division by Zero");
  Fraction['InvalidParameter'] = new Error("Invalid argument");
  Fraction['NonIntegerParameter'] = new Error("Parameters must be integer");

  Fraction.prototype = {

    "s": 1,
    "n": 0,
    "d": 1,

    /**
     * Calculates the absolute value
     *
     * Ex: new Fraction(-4).abs() => 4
     **/
    "abs": function() {

      return newFraction(this["n"], this["d"]);
    },

    /**
     * Inverts the sign of the current fraction
     *
     * Ex: new Fraction(-4).neg() => 4
     **/
    "neg": function() {

      return newFraction(-this["s"] * this["n"], this["d"]);
    },

    /**
     * Adds two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
     **/
    "add": function(a, b) {

      parse(a, b);
      return newFraction(
        this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
        this["d"] * P["d"]
      );
    },

    /**
     * Subtracts two rational numbers
     *
     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
     **/
    "sub": function(a, b) {

      parse(a, b);
      return newFraction(
        this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
        this["d"] * P["d"]
      );
    },

    /**
     * Multiplies two rational numbers
     *
     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
     **/
    "mul": function(a, b) {

      parse(a, b);
      return newFraction(
        this["s"] * P["s"] * this["n"] * P["n"],
        this["d"] * P["d"]
      );
    },

    /**
     * Divides two rational numbers
     *
     * Ex: new Fraction("-17.(345)").inverse().div(3)
     **/
    "div": function(a, b) {

      parse(a, b);
      return newFraction(
        this["s"] * P["s"] * this["n"] * P["d"],
        this["d"] * P["n"]
      );
    },

    /**
     * Clones the actual object
     *
     * Ex: new Fraction("-17.(345)").clone()
     **/
    "clone": function() {
      return newFraction(this['s'] * this['n'], this['d']);
    },

    /**
     * Calculates the modulo of two rational numbers - a more precise fmod
     *
     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
     **/
    "mod": function(a, b) {

      if (isNaN(this['n']) || isNaN(this['d'])) {
        return new Fraction(NaN);
      }

      if (a === undefined) {
        return newFraction(this["s"] * this["n"] % this["d"], 1);
      }

      parse(a, b);
      if (0 === P["n"] && 0 === this["d"]) {
        throw Fraction['DivisionByZero'];
      }

      /*
       * First silly attempt, kinda slow
       *
       return that["sub"]({
       "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
       "d": num["d"],
       "s": this["s"]
       });*/

      /*
       * New attempt: a1 / b1 = a2 / b2 * q + r
       * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
       * => (b2 * a1 % a2 * b1) / (b1 * b2)
       */
      return newFraction(
        this["s"] * (P["d"] * this["n"]) % (P["n"] * this["d"]),
        P["d"] * this["d"]
      );
    },

    /**
     * Calculates the fractional gcd of two rational numbers
     *
     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
     */
    "gcd": function(a, b) {

      parse(a, b);

      // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

      return newFraction(gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]), P["d"] * this["d"]);
    },

    /**
     * Calculates the fractional lcm of two rational numbers
     *
     * Ex: new Fraction(5,8).lcm(3,7) => 15
     */
    "lcm": function(a, b) {

      parse(a, b);

      // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

      if (P["n"] === 0 && this["n"] === 0) {
        return newFraction(0, 1);
      }
      return newFraction(P["n"] * this["n"], gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]));
    },

    /**
     * Calculates the ceil of a rational number
     *
     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
     **/
    "ceil": function(places) {

      places = Math.pow(10, places || 0);

      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
    },

    /**
     * Calculates the floor of a rational number
     *
     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
     **/
    "floor": function(places) {

      places = Math.pow(10, places || 0);

      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
    },

    /**
     * Rounds a rational numbers
     *
     * Ex: new Fraction('4.(3)').round() => (4 / 1)
     **/
    "round": function(places) {

      places = Math.pow(10, places || 0);

      if (isNaN(this["n"]) || isNaN(this["d"])) {
        return new Fraction(NaN);
      }
      return newFraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
    },

    /**
     * Gets the inverse of the fraction, means numerator and denominator are exchanged
     *
     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
     **/
    "inverse": function() {

      return newFraction(this["s"] * this["d"], this["n"]);
    },

    /**
     * Calculates the fraction to some rational exponent, if possible
     *
     * Ex: new Fraction(-1,2).pow(-3) => -8
     */
    "pow": function(a, b) {

      parse(a, b);

      // Trivial case when exp is an integer

      if (P['d'] === 1) {

        if (P['s'] < 0) {
          return newFraction(Math.pow(this['s'] * this["d"], P['n']), Math.pow(this["n"], P['n']));
        } else {
          return newFraction(Math.pow(this['s'] * this["n"], P['n']), Math.pow(this["d"], P['n']));
        }
      }

      // Negative roots become complex
      //     (-a/b)^(c/d) = x
      // <=> (-1)^(c/d) * (a/b)^(c/d) = x
      // <=> (cos(pi) + i*sin(pi))^(c/d) * (a/b)^(c/d) = x         # rotate 1 by 180°
      // <=> (cos(c*pi/d) + i*sin(c*pi/d)) * (a/b)^(c/d) = x       # DeMoivre's formula in Q ( https://proofwiki.org/wiki/De_Moivre%27s_Formula/Rational_Index )
      // From which follows that only for c=0 the root is non-complex. c/d is a reduced fraction, so that sin(c/dpi)=0 occurs for d=1, which is handled by our trivial case.
      if (this['s'] < 0) return null;

      // Now prime factor n and d
      var N = factorize(this['n']);
      var D = factorize(this['d']);

      // Exponentiate and take root for n and d individually
      var n = 1;
      var d = 1;
      for (var k in N) {
        if (k === '1') continue;
        if (k === '0') {
          n = 0;
          break;
        }
        N[k]*= P['n'];

        if (N[k] % P['d'] === 0) {
          N[k]/= P['d'];
        } else return null;
        n*= Math.pow(k, N[k]);
      }

      for (var k in D) {
        if (k === '1') continue;
        D[k]*= P['n'];

        if (D[k] % P['d'] === 0) {
          D[k]/= P['d'];
        } else return null;
        d*= Math.pow(k, D[k]);
      }

      if (P['s'] < 0) {
        return newFraction(d, n);
      }
      return newFraction(n, d);
    },

    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "equals": function(a, b) {

      parse(a, b);
      return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0
    },

    /**
     * Check if two rational numbers are the same
     *
     * Ex: new Fraction(19.6).equals([98, 5]);
     **/
    "compare": function(a, b) {

      parse(a, b);
      var t = (this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"]);
      return (0 < t) - (t < 0);
    },

    "simplify": function(eps) {

      if (isNaN(this['n']) || isNaN(this['d'])) {
        return this;
      }

      eps = eps || 0.001;

      var thisABS = this['abs']();
      var cont = thisABS['toContinued']();

      for (var i = 1; i < cont.length; i++) {

        var s = newFraction(cont[i - 1], 1);
        for (var k = i - 2; k >= 0; k--) {
          s = s['inverse']()['add'](cont[k]);
        }

        if (s['sub'](thisABS)['abs']().valueOf() < eps) {
          return s['mul'](this['s']);
        }
      }
      return this;
    },

    /**
     * Check if two rational numbers are divisible
     *
     * Ex: new Fraction(19.6).divisible(1.5);
     */
    "divisible": function(a, b) {

      parse(a, b);
      return !(!(P["n"] * this["d"]) || ((this["n"] * P["d"]) % (P["n"] * this["d"])));
    },

    /**
     * Returns a decimal representation of the fraction
     *
     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
     **/
    'valueOf': function() {

      return this["s"] * this["n"] / this["d"];
    },

    /**
     * Returns a string-fraction representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
     **/
    'toFraction': function(excludeWhole) {

      var whole, str = "";
      var n = this["n"];
      var d = this["d"];
      if (this["s"] < 0) {
        str+= '-';
      }

      if (d === 1) {
        str+= n;
      } else {

        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
          str+= whole;
          str+= " ";
          n%= d;
        }

        str+= n;
        str+= '/';
        str+= d;
      }
      return str;
    },

    /**
     * Returns a latex representation of a Fraction object
     *
     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
     **/
    'toLatex': function(excludeWhole) {

      var whole, str = "";
      var n = this["n"];
      var d = this["d"];
      if (this["s"] < 0) {
        str+= '-';
      }

      if (d === 1) {
        str+= n;
      } else {

        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
          str+= whole;
          n%= d;
        }

        str+= "\\frac{";
        str+= n;
        str+= '}{';
        str+= d;
        str+= '}';
      }
      return str;
    },

    /**
     * Returns an array of continued fraction elements
     *
     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
     */
    'toContinued': function() {

      var t;
      var a = this['n'];
      var b = this['d'];
      var res = [];

      if (isNaN(a) || isNaN(b)) {
        return res;
      }

      do {
        res.push(Math.floor(a / b));
        t = a % b;
        a = b;
        b = t;
      } while (a !== 1);

      return res;
    },

    /**
     * Creates a string representation of a fraction with all digits
     *
     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
     **/
    'toString': function(dec) {

      var N = this["n"];
      var D = this["d"];

      if (isNaN(N) || isNaN(D)) {
        return "NaN";
      }

      dec = dec || 15; // 15 = decimal places when no repetation

      var cycLen = cycleLen(N, D); // Cycle length
      var cycOff = cycleStart(N, D, cycLen); // Cycle start

      var str = this['s'] < 0 ? "-" : "";

      str+= N / D | 0;

      N%= D;
      N*= 10;

      if (N)
        str+= ".";

      if (cycLen) {

        for (var i = cycOff; i--;) {
          str+= N / D | 0;
          N%= D;
          N*= 10;
        }
        str+= "(";
        for (var i = cycLen; i--;) {
          str+= N / D | 0;
          N%= D;
          N*= 10;
        }
        str+= ")";
      } else {
        for (var i = dec; N && i--;) {
          str+= N / D | 0;
          N%= D;
          N*= 10;
        }
      }
      return str;
    }
  };

  {
    Object.defineProperty(Fraction, "__esModule", { 'value': true });
    Fraction['default'] = Fraction;
    Fraction['Fraction'] = Fraction;
    module['exports'] = Fraction;
  }

})();
});

var Fraction = /*@__PURE__*/getDefaultExportFromCjs(fraction);

var name$2 = 'Fraction';
var dependencies$3 = [];
var createFractionClass = /* #__PURE__ */factory(name$2, dependencies$3, () => {
  /**
   * Attach type information
   */
  Object.defineProperty(Fraction, 'name', {
    value: 'Fraction'
  });
  Fraction.prototype.constructor = Fraction;
  Fraction.prototype.type = 'Fraction';
  Fraction.prototype.isFraction = true;
  /**
   * Get a JSON representation of a Fraction containing type information
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Fraction", "n": 3, "d": 8}`
   */

  Fraction.prototype.toJSON = function () {
    return {
      mathjs: 'Fraction',
      n: this.s * this.n,
      d: this.d
    };
  };
  /**
   * Instantiate a Fraction from a JSON object
   * @param {Object} json  a JSON object structured as:
   *                       `{"mathjs": "Fraction", "n": 3, "d": 8}`
   * @return {BigNumber}
   */


  Fraction.fromJSON = function (json) {
    return new Fraction(json);
  };

  return Fraction;
}, {
  isClass: true
});

var name$3 = 'Matrix';
var dependencies$4 = [];
var createMatrixClass = /* #__PURE__ */factory(name$3, dependencies$4, () => {
  /**
   * @constructor Matrix
   *
   * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
   * array. A matrix can be constructed as:
   *
   *     let matrix = math.matrix(data)
   *
   * Matrix contains the functions to resize, get and set values, get the size,
   * clone the matrix and to convert the matrix to a vector, array, or scalar.
   * Furthermore, one can iterate over the matrix using map and forEach.
   * The internal Array of the Matrix can be accessed using the function valueOf.
   *
   * Example usage:
   *
   *     let matrix = math.matrix([[1, 2], [3, 4]])
   *     matix.size()              // [2, 2]
   *     matrix.resize([3, 2], 5)
   *     matrix.valueOf()          // [[1, 2], [3, 4], [5, 5]]
   *     matrix.subset([1,2])       // 3 (indexes are zero-based)
   *
   */
  function Matrix() {
    if (!(this instanceof Matrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
  }
  /**
   * Attach type information
   */


  Matrix.prototype.type = 'Matrix';
  Matrix.prototype.isMatrix = true;
  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()   // retrieve storage format
   *
   * @return {string}           The storage format.
   */

  Matrix.prototype.storage = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke storage on a Matrix interface');
  };
  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()    // retrieve matrix datatype
   *
   * @return {string}           The datatype.
   */


  Matrix.prototype.datatype = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke datatype on a Matrix interface');
  };
  /**
   * Create a new Matrix With the type of the current matrix instance
   * @param {Array | Object} data
   * @param {string} [datatype]
   */


  Matrix.prototype.create = function (data, datatype) {
    throw new Error('Cannot invoke create on a Matrix interface');
  };
  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */


  Matrix.prototype.subset = function (index, replacement, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke subset on a Matrix interface');
  };
  /**
   * Get a single element from the matrix.
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */


  Matrix.prototype.get = function (index) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke get on a Matrix interface');
  };
  /**
   * Replace a single element in the matrix.
   * @param {number[]} index   Zero-based index
   * @param {*} value
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be left undefined.
   * @return {Matrix} self
   */


  Matrix.prototype.set = function (index, value, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke set on a Matrix interface');
  };
  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @param {number[]} size           The new size the matrix should have.
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */


  Matrix.prototype.resize = function (size, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke resize on a Matrix interface');
  };
  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * @param {number[]} size           The new size the matrix should have.
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */


  Matrix.prototype.reshape = function (size, defaultValue) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke reshape on a Matrix interface');
  };
  /**
   * Create a clone of the matrix
   * @return {Matrix} clone
   */


  Matrix.prototype.clone = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke clone on a Matrix interface');
  };
  /**
   * Retrieve the size of the matrix.
   * @returns {number[]} size
   */


  Matrix.prototype.size = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke size on a Matrix interface');
  };
  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *
   * @return {Matrix} matrix
   */


  Matrix.prototype.map = function (callback, skipZeros) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke map on a Matrix interface');
  };
  /**
   * Execute a callback function on each entry of the matrix.
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   */


  Matrix.prototype.forEach = function (callback) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke forEach on a Matrix interface');
  };
  /**
   * Iterate over the matrix elements
   * @return {Iterable<{ value, index: number[] }>}
   */


  Matrix.prototype[Symbol.iterator] = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot iterate a Matrix interface');
  };
  /**
   * Create an Array with a copy of the data of the Matrix
   * @returns {Array} array
   */


  Matrix.prototype.toArray = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke toArray on a Matrix interface');
  };
  /**
   * Get the primitive value of the Matrix: a multidimensional array
   * @returns {Array} array
   */


  Matrix.prototype.valueOf = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke valueOf on a Matrix interface');
  };
  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */


  Matrix.prototype.format = function (options) {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke format on a Matrix interface');
  };
  /**
   * Get a string representation of the matrix
   * @returns {string} str
   */


  Matrix.prototype.toString = function () {
    // must be implemented by each of the Matrix implementations
    throw new Error('Cannot invoke toString on a Matrix interface');
  };

  return Matrix;
}, {
  isClass: true
});

// function utils
/**
 * Find the maximum number of arguments expected by a typed function.
 * @param {function} fn   A typed function
 * @return {number} Returns the maximum number of expected arguments.
 *                  Returns -1 when no signatures where found on the function.
 */

function maxArgumentCount(fn) {
  return Object.keys(fn.signatures || {}).reduce(function (args, signature) {
    var count = (signature.match(/,/g) || []).length + 1;
    return Math.max(args, count);
  }, -1);
}

var name$4 = 'DenseMatrix';
var dependencies$5 = ['Matrix'];
var createDenseMatrixClass = /* #__PURE__ */factory(name$4, dependencies$5, _ref => {
  var {
    Matrix
  } = _ref;

  /**
   * Dense Matrix implementation. A regular, dense matrix, supporting multi-dimensional matrices. This is the default matrix type.
   * @class DenseMatrix
   * @enum {{ value, index: number[] }}
   */
  function DenseMatrix(data, datatype) {
    if (!(this instanceof DenseMatrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (datatype && !isString(datatype)) {
      throw new Error('Invalid datatype: ' + datatype);
    }

    if (isMatrix(data)) {
      // check data is a DenseMatrix
      if (data.type === 'DenseMatrix') {
        // clone data & size
        this._data = clone(data._data);
        this._size = clone(data._size);
        this._datatype = datatype || data._datatype;
      } else {
        // build data from existing matrix
        this._data = data.toArray();
        this._size = data.size();
        this._datatype = datatype || data._datatype;
      }
    } else if (data && isArray(data.data) && isArray(data.size)) {
      // initialize fields from JSON representation
      this._data = data.data;
      this._size = data.size; // verify the dimensions of the array

      validate(this._data, this._size);
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      // replace nested Matrices with Arrays
      this._data = preprocess(data); // get the dimensions of the array

      this._size = arraySize(this._data); // verify the dimensions of the array, TODO: compute size while processing array

      validate(this._data, this._size); // data type unknown

      this._datatype = datatype;
    } else if (data) {
      // unsupported type
      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
    } else {
      // nothing provided
      this._data = [];
      this._size = [0];
      this._datatype = datatype;
    }
  }

  DenseMatrix.prototype = new Matrix();
  /**
   * Create a new DenseMatrix
   */

  DenseMatrix.prototype.createDenseMatrix = function (data, datatype) {
    return new DenseMatrix(data, datatype);
  };
  /**
   * Attach type information
   */


  Object.defineProperty(DenseMatrix, 'name', {
    value: 'DenseMatrix'
  });
  DenseMatrix.prototype.constructor = DenseMatrix;
  DenseMatrix.prototype.type = 'DenseMatrix';
  DenseMatrix.prototype.isDenseMatrix = true;
  /**
   * Get the matrix type
   *
   * Usage:
   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
   *
   * @memberOf DenseMatrix
   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
   */

  DenseMatrix.prototype.getDataType = function () {
    return getArrayDataType(this._data, typeOf);
  };
  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()  // retrieve storage format
   *
   * @memberof DenseMatrix
   * @return {string}           The storage format.
   */


  DenseMatrix.prototype.storage = function () {
    return 'dense';
  };
  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()   // retrieve matrix datatype
   *
   * @memberof DenseMatrix
   * @return {string}           The datatype.
   */


  DenseMatrix.prototype.datatype = function () {
    return this._datatype;
  };
  /**
   * Create a new DenseMatrix
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {string} [datatype]
   */


  DenseMatrix.prototype.create = function (data, datatype) {
    return new DenseMatrix(data, datatype);
  };
  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @memberof DenseMatrix
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */


  DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
    switch (arguments.length) {
      case 1:
        return _get(this, index);
      // intentional fall through

      case 2:
      case 3:
        return _set(this, index, replacement, defaultValue);

      default:
        throw new SyntaxError('Wrong number of arguments');
    }
  };
  /**
   * Get a single element from the matrix.
   * @memberof DenseMatrix
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */


  DenseMatrix.prototype.get = function (index) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }

    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    } // check index


    for (var x = 0; x < index.length; x++) {
      validateIndex(index[x], this._size[x]);
    }

    var data = this._data;

    for (var i = 0, ii = index.length; i < ii; i++) {
      var indexI = index[i];
      validateIndex(indexI, data.length);
      data = data[indexI];
    }

    return data;
  };
  /**
   * Replace a single element in the matrix.
   * @memberof DenseMatrix
   * @param {number[]} index   Zero-based index
   * @param {*} value
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be left undefined.
   * @return {DenseMatrix} self
   */


  DenseMatrix.prototype.set = function (index, value, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }

    if (index.length < this._size.length) {
      throw new DimensionError(index.length, this._size.length, '<');
    }

    var i, ii, indexI; // enlarge matrix when needed

    var size = index.map(function (i) {
      return i + 1;
    });

    _fit(this, size, defaultValue); // traverse over the dimensions


    var data = this._data;

    for (i = 0, ii = index.length - 1; i < ii; i++) {
      indexI = index[i];
      validateIndex(indexI, data.length);
      data = data[indexI];
    } // set new value


    indexI = index[index.length - 1];
    validateIndex(indexI, data.length);
    data[indexI] = value;
    return this;
  };
  /**
   * Get a submatrix of this matrix
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix
   * @param {Index} index   Zero-based index
   * @private
   */


  function _get(matrix, index) {
    if (!isIndex(index)) {
      throw new TypeError('Invalid index');
    }

    var isScalar = index.isScalar();

    if (isScalar) {
      // return a scalar
      return matrix.get(index.min());
    } else {
      // validate dimensions
      var size = index.size();

      if (size.length !== matrix._size.length) {
        throw new DimensionError(size.length, matrix._size.length);
      } // validate if any of the ranges in the index is out of range


      var min = index.min();
      var max = index.max();

      for (var i = 0, ii = matrix._size.length; i < ii; i++) {
        validateIndex(min[i], matrix._size[i]);
        validateIndex(max[i], matrix._size[i]);
      } // retrieve submatrix
      // TODO: more efficient when creating an empty matrix and setting _data and _size manually


      return new DenseMatrix(_getSubmatrix(matrix._data, index, size.length, 0), matrix._datatype);
    }
  }
  /**
   * Recursively get a submatrix of a multi dimensional matrix.
   * Index is not checked for correct number or length of dimensions.
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {Index} index
   * @param {number} dims   Total number of dimensions
   * @param {number} dim    Current dimension
   * @return {Array} submatrix
   * @private
   */


  function _getSubmatrix(data, index, dims, dim) {
    var last = dim === dims - 1;
    var range = index.dimension(dim);

    if (last) {
      return range.map(function (i) {
        validateIndex(i, data.length);
        return data[i];
      }).valueOf();
    } else {
      return range.map(function (i) {
        validateIndex(i, data.length);
        var child = data[i];
        return _getSubmatrix(child, index, dims, dim + 1);
      }).valueOf();
    }
  }
  /**
   * Replace a submatrix in this matrix
   * Indexes are zero-based.
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix
   * @param {Index} index
   * @param {DenseMatrix | Array | *} submatrix
   * @param {*} defaultValue          Default value, filled in on new entries when
   *                                  the matrix is resized.
   * @return {DenseMatrix} matrix
   * @private
   */


  function _set(matrix, index, submatrix, defaultValue) {
    if (!index || index.isIndex !== true) {
      throw new TypeError('Invalid index');
    } // get index size and check whether the index contains a single value


    var iSize = index.size();
    var isScalar = index.isScalar(); // calculate the size of the submatrix, and convert it into an Array if needed

    var sSize;

    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.valueOf();
    } else {
      sSize = arraySize(submatrix);
    }

    if (isScalar) {
      // set a scalar
      // check whether submatrix is a scalar
      if (sSize.length !== 0) {
        throw new TypeError('Scalar expected');
      }

      matrix.set(index.min(), submatrix, defaultValue);
    } else {
      // set a submatrix
      // validate dimensions
      if (iSize.length < matrix._size.length) {
        throw new DimensionError(iSize.length, matrix._size.length, '<');
      }

      if (sSize.length < iSize.length) {
        // calculate number of missing outer dimensions
        var i = 0;
        var outer = 0;

        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }

        while (iSize[i] === 1) {
          outer++;
          i++;
        } // unsqueeze both outer and inner dimensions


        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      } // check whether the size of the submatrix matches the index size


      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, '>');
      } // enlarge matrix when needed


      var size = index.max().map(function (i) {
        return i + 1;
      });

      _fit(matrix, size, defaultValue); // insert the sub matrix


      var dims = iSize.length;
      var dim = 0;

      _setSubmatrix(matrix._data, index, submatrix, dims, dim);
    }

    return matrix;
  }
  /**
   * Replace a submatrix of a multi dimensional matrix.
   * @memberof DenseMatrix
   * @param {Array} data
   * @param {Index} index
   * @param {Array} submatrix
   * @param {number} dims   Total number of dimensions
   * @param {number} dim
   * @private
   */


  function _setSubmatrix(data, index, submatrix, dims, dim) {
    var last = dim === dims - 1;
    var range = index.dimension(dim);

    if (last) {
      range.forEach(function (dataIndex, subIndex) {
        validateIndex(dataIndex);
        data[dataIndex] = submatrix[subIndex[0]];
      });
    } else {
      range.forEach(function (dataIndex, subIndex) {
        validateIndex(dataIndex);

        _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
      });
    }
  }
  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @memberof DenseMatrix
   * @param {number[] || Matrix} size The new size the matrix should have.
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */


  DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
    // validate arguments
    if (!isCollection(size)) {
      throw new TypeError('Array or Matrix expected');
    } // SparseMatrix input is always 2d, flatten this into 1d if it's indeed a vector


    var sizeArray = size.valueOf().map(value => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    }); // matrix to resize

    var m = copy ? this.clone() : this; // resize matrix

    return _resize(m, sizeArray, defaultValue);
  };

  function _resize(matrix, size, defaultValue) {
    // check size
    if (size.length === 0) {
      // first value in matrix
      var v = matrix._data; // go deep

      while (isArray(v)) {
        v = v[0];
      }

      return v;
    } // resize matrix


    matrix._size = size.slice(0); // copy the array

    matrix._data = resize(matrix._data, matrix._size, defaultValue); // return matrix

    return matrix;
  }
  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * NOTE: This might be better suited to copy by default, instead of modifying
   *       in place. For now, it operates in place to remain consistent with
   *       resize().
   *
   * @memberof DenseMatrix
   * @param {number[]} size           The new size the matrix should have.
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */


  DenseMatrix.prototype.reshape = function (size, copy) {
    var m = copy ? this.clone() : this;
    m._data = reshape(m._data, size);

    var currentLength = m._size.reduce((length, size) => length * size);

    m._size = processSizesWildcard(size, currentLength);
    return m;
  };
  /**
   * Enlarge the matrix when it is smaller than given size.
   * If the matrix is larger or equal sized, nothing is done.
   * @memberof DenseMatrix
   * @param {DenseMatrix} matrix           The matrix to be resized
   * @param {number[]} size
   * @param {*} defaultValue          Default value, filled in on new entries.
   * @private
   */


  function _fit(matrix, size, defaultValue) {
    var // copy the array
    newSize = matrix._size.slice(0);

    var changed = false; // add dimensions when needed

    while (newSize.length < size.length) {
      newSize.push(0);
      changed = true;
    } // enlarge size when needed


    for (var i = 0, ii = size.length; i < ii; i++) {
      if (size[i] > newSize[i]) {
        newSize[i] = size[i];
        changed = true;
      }
    }

    if (changed) {
      // resize only when size is changed
      _resize(matrix, newSize, defaultValue);
    }
  }
  /**
   * Create a clone of the matrix
   * @memberof DenseMatrix
   * @return {DenseMatrix} clone
   */


  DenseMatrix.prototype.clone = function () {
    var m = new DenseMatrix({
      data: clone(this._data),
      size: clone(this._size),
      datatype: this._datatype
    });
    return m;
  };
  /**
   * Retrieve the size of the matrix.
   * @memberof DenseMatrix
   * @returns {number[]} size
   */


  DenseMatrix.prototype.size = function () {
    return this._size.slice(0); // return a clone of _size
  };
  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @memberof DenseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   *
   * @return {DenseMatrix} matrix
   */


  DenseMatrix.prototype.map = function (callback) {
    // matrix instance
    var me = this;
    var args = maxArgumentCount(callback);

    var recurse = function recurse(value, index) {
      if (isArray(value)) {
        return value.map(function (child, i) {
          return recurse(child, index.concat(i));
        });
      } else {
        // invoke the callback function with the right number of arguments
        if (args === 1) {
          return callback(value);
        } else if (args === 2) {
          return callback(value, index);
        } else {
          // 3 or -1
          return callback(value, index, me);
        }
      }
    }; // determine the new datatype when the original matrix has datatype defined
    // TODO: should be done in matrix constructor instead


    var data = recurse(this._data, []);
    var datatype = this._datatype !== undefined ? getArrayDataType(data, typeOf) : undefined;
    return new DenseMatrix(data, datatype);
  };
  /**
   * Execute a callback function on each entry of the matrix.
   * @memberof DenseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   */


  DenseMatrix.prototype.forEach = function (callback) {
    // matrix instance
    var me = this;

    var recurse = function recurse(value, index) {
      if (isArray(value)) {
        value.forEach(function (child, i) {
          recurse(child, index.concat(i));
        });
      } else {
        callback(value, index, me);
      }
    };

    recurse(this._data, []);
  };
  /**
   * Iterate over the matrix elements
   * @return {Iterable<{ value, index: number[] }>}
   */


  DenseMatrix.prototype[Symbol.iterator] = function* () {
    var recurse = function* recurse(value, index) {
      if (isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          yield* recurse(value[i], index.concat(i));
        }
      } else {
        yield {
          value,
          index
        };
      }
    };

    yield* recurse(this._data, []);
  };
  /**
   * Returns an array containing the rows of a 2D matrix
   * @returns {Array<Matrix>}
   */


  DenseMatrix.prototype.rows = function () {
    var result = [];
    var s = this.size();

    if (s.length !== 2) {
      throw new TypeError('Rows can only be returned for a 2D matrix.');
    }

    var data = this._data;

    for (var row of data) {
      result.push(new DenseMatrix([row], this._datatype));
    }

    return result;
  };
  /**
   * Returns an array containing the columns of a 2D matrix
   * @returns {Array<Matrix>}
   */


  DenseMatrix.prototype.columns = function () {
    var _this = this;

    var result = [];
    var s = this.size();

    if (s.length !== 2) {
      throw new TypeError('Rows can only be returned for a 2D matrix.');
    }

    var data = this._data;

    var _loop = function _loop(i) {
      var col = data.map(row => [row[i]]);
      result.push(new DenseMatrix(col, _this._datatype));
    };

    for (var i = 0; i < s[1]; i++) {
      _loop(i);
    }

    return result;
  };
  /**
   * Create an Array with a copy of the data of the DenseMatrix
   * @memberof DenseMatrix
   * @returns {Array} array
   */


  DenseMatrix.prototype.toArray = function () {
    return clone(this._data);
  };
  /**
   * Get the primitive value of the DenseMatrix: a multidimensional array
   * @memberof DenseMatrix
   * @returns {Array} array
   */


  DenseMatrix.prototype.valueOf = function () {
    return this._data;
  };
  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @memberof DenseMatrix
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */


  DenseMatrix.prototype.format = function (options) {
    return format$2(this._data, options);
  };
  /**
   * Get a string representation of the matrix
   * @memberof DenseMatrix
   * @returns {string} str
   */


  DenseMatrix.prototype.toString = function () {
    return format$2(this._data);
  };
  /**
   * Get a JSON representation of the matrix
   * @memberof DenseMatrix
   * @returns {Object}
   */


  DenseMatrix.prototype.toJSON = function () {
    return {
      mathjs: 'DenseMatrix',
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  };
  /**
   * Get the kth Matrix diagonal.
   *
   * @memberof DenseMatrix
   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
   *
   * @returns {Matrix}                     The matrix with the diagonal values.
   */


  DenseMatrix.prototype.diagonal = function (k) {
    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      } // is must be an integer


      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }

    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0; // rows & columns

    var rows = this._size[0];
    var columns = this._size[1]; // number diagonal values

    var n = Math.min(rows - kSub, columns - kSuper); // x is a matrix get diagonal from matrix

    var data = []; // loop rows

    for (var i = 0; i < n; i++) {
      data[i] = this._data[i + kSub][i + kSuper];
    } // create DenseMatrix


    return new DenseMatrix({
      data,
      size: [n],
      datatype: this._datatype
    });
  };
  /**
   * Create a diagonal matrix.
   *
   * @memberof DenseMatrix
   * @param {Array} size                     The matrix size.
   * @param {number | Matrix | Array } value The values for the diagonal.
   * @param {number | BigNumber} [k=0]       The kth diagonal where the vector will be filled in.
   * @param {number} [defaultValue]          The default value for non-diagonal
   * @param {string} [datatype]              The datatype for the diagonal
   *
   * @returns {DenseMatrix}
   */


  DenseMatrix.diagonal = function (size, value, k, defaultValue) {
    if (!isArray(size)) {
      throw new TypeError('Array expected, size parameter');
    }

    if (size.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    } // map size & validate


    size = size.map(function (s) {
      // check it is a big number
      if (isBigNumber(s)) {
        // convert it
        s = s.toNumber();
      } // validate arguments


      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error('Size values must be positive integers');
      }

      return s;
    }); // validate k if any

    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      } // is must be an integer


      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }

    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0; // rows and columns

    var rows = size[0];
    var columns = size[1]; // number of non-zero items

    var n = Math.min(rows - kSub, columns - kSuper); // value extraction function

    var _value; // check value


    if (isArray(value)) {
      // validate array
      if (value.length !== n) {
        // number of values in array must be n
        throw new Error('Invalid value array length');
      } // define function


      _value = function _value(i) {
        // return value @ i
        return value[i];
      };
    } else if (isMatrix(value)) {
      // matrix size
      var ms = value.size(); // validate matrix

      if (ms.length !== 1 || ms[0] !== n) {
        // number of values in array must be n
        throw new Error('Invalid matrix length');
      } // define function


      _value = function _value(i) {
        // return value @ i
        return value.get([i]);
      };
    } else {
      // define function
      _value = function _value() {
        // return value
        return value;
      };
    } // discover default value if needed


    if (!defaultValue) {
      // check first value in array
      defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) // trick to create a BigNumber with value zero
      : 0;
    } // empty array


    var data = []; // check we need to resize array

    if (size.length > 0) {
      // resize array
      data = resize(data, size, defaultValue); // fill diagonal

      for (var d = 0; d < n; d++) {
        data[d + kSub][d + kSuper] = _value(d);
      }
    } // create DenseMatrix


    return new DenseMatrix({
      data,
      size: [rows, columns]
    });
  };
  /**
   * Generate a matrix from a JSON object
   * @memberof DenseMatrix
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "DenseMatrix", data: [], size: []}`,
   *                       where mathjs is optional
   * @returns {DenseMatrix}
   */


  DenseMatrix.fromJSON = function (json) {
    return new DenseMatrix(json);
  };
  /**
   * Swap rows i and j in Matrix.
   *
   * @memberof DenseMatrix
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   *
   * @return {Matrix}        The matrix reference
   */


  DenseMatrix.prototype.swapRows = function (i, j) {
    // check index
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error('Row index must be positive integers');
    } // check dimensions


    if (this._size.length !== 2) {
      throw new Error('Only two dimensional matrix is supported');
    } // validate index


    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]); // swap rows

    DenseMatrix._swapRows(i, j, this._data); // return current instance


    return this;
  };
  /**
   * Swap rows i and j in Dense Matrix data structure.
   *
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   * @param {Array} data     Matrix data
   */


  DenseMatrix._swapRows = function (i, j, data) {
    // swap values i <-> j
    var vi = data[i];
    data[i] = data[j];
    data[j] = vi;
  };
  /**
   * Preprocess data, which can be an Array or DenseMatrix with nested Arrays and
   * Matrices. Replaces all nested Matrices with Arrays
   * @memberof DenseMatrix
   * @param {Array} data
   * @return {Array} data
   */


  function preprocess(data) {
    for (var i = 0, ii = data.length; i < ii; i++) {
      var elem = data[i];

      if (isArray(elem)) {
        data[i] = preprocess(elem);
      } else if (elem && elem.isMatrix === true) {
        data[i] = preprocess(elem.valueOf());
      }
    }

    return data;
  }

  return DenseMatrix;
}, {
  isClass: true
});

/**
 * Transpose a matrix
 * @param {Array} mat
 * @returns {Array} ret
 * @private
 */
function _switch(mat) {
  var I = mat.length;
  var J = mat[0].length;
  var i, j;
  var ret = [];

  for (j = 0; j < J; j++) {
    var tmp = [];

    for (i = 0; i < I; i++) {
      tmp.push(mat[i][j]);
    }

    ret.push(tmp);
  }

  return ret;
}

/**
 * Test whether an array contains collections
 * @param {Array} array
 * @returns {boolean} Returns true when the array contains one or multiple
 *                    collections (Arrays or Matrices). Returns false otherwise.
 */

function containsCollections(array) {
  for (var i = 0; i < array.length; i++) {
    if (isCollection(array[i])) {
      return true;
    }
  }

  return false;
}
/**
 * Recursively loop over all elements in a given multi dimensional array
 * and invoke the callback on each of the elements.
 * @param {Array | Matrix} array
 * @param {Function} callback     The callback method is invoked with one
 *                                parameter: the current element in the array
 */

function deepForEach(array, callback) {
  if (isMatrix(array)) {
    array = array.valueOf();
  }

  for (var i = 0, ii = array.length; i < ii; i++) {
    var value = array[i];

    if (Array.isArray(value)) {
      deepForEach(value, callback);
    } else {
      callback(value);
    }
  }
}
/**
 * Execute the callback function element wise for each element in array and any
 * nested array
 * Returns an array with the results
 * @param {Array | Matrix} array
 * @param {Function} callback   The callback is called with two parameters:
 *                              value1 and value2, which contain the current
 *                              element of both arrays.
 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
 *
 * @return {Array | Matrix} res
 */

function deepMap(array, callback, skipZeros) {
  if (array && typeof array.map === 'function') {
    // TODO: replace array.map with a for loop to improve performance
    return array.map(function (x) {
      return deepMap(x, callback);
    });
  } else {
    return callback(array);
  }
}
/**
 * Reduce a given matrix or array to a new matrix or
 * array with one less dimension, applying the given
 * callback in the selected dimension.
 * @param {Array | Matrix} mat
 * @param {number} dim
 * @param {Function} callback
 * @return {Array | Matrix} res
 */

function reduce(mat, dim, callback) {
  var size = Array.isArray(mat) ? arraySize(mat) : mat.size();

  if (dim < 0 || dim >= size.length) {
    // TODO: would be more clear when throwing a DimensionError here
    throw new IndexError(dim, size.length);
  }

  if (isMatrix(mat)) {
    return mat.create(_reduce(mat.valueOf(), dim, callback));
  } else {
    return _reduce(mat, dim, callback);
  }
}
/**
 * Recursively reduce a matrix
 * @param {Array} mat
 * @param {number} dim
 * @param {Function} callback
 * @returns {Array} ret
 * @private
 */

function _reduce(mat, dim, callback) {
  var i, ret, val, tran;

  if (dim <= 0) {
    if (!Array.isArray(mat[0])) {
      val = mat[0];

      for (i = 1; i < mat.length; i++) {
        val = callback(val, mat[i]);
      }

      return val;
    } else {
      tran = _switch(mat);
      ret = [];

      for (i = 0; i < tran.length; i++) {
        ret[i] = _reduce(tran[i], dim - 1, callback);
      }

      return ret;
    }
  } else {
    ret = [];

    for (i = 0; i < mat.length; i++) {
      ret[i] = _reduce(mat[i], dim - 1, callback);
    }

    return ret;
  }
} // TODO: document function scatter

var n1 = 'number';
var n2 = 'number, number';
function absNumber(a) {
  return Math.abs(a);
}
absNumber.signature = n1;
function addNumber(a, b) {
  return a + b;
}
addNumber.signature = n2;
function multiplyNumber(a, b) {
  return a * b;
}
multiplyNumber.signature = n2;
function unaryMinusNumber(x) {
  return -x;
}
unaryMinusNumber.signature = n1;

var n1$1 = 'number';
function isZeroNumber(x) {
  return x === 0;
}
isZeroNumber.signature = n1$1;

var name$5 = 'isZero';
var dependencies$6 = ['typed'];
var createIsZero = /* #__PURE__ */factory(name$5, dependencies$6, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Test whether a value is zero.
   * The function can check for zero for types `number`, `BigNumber`, `Fraction`,
   * `Complex`, and `Unit`.
   *
   * The function is evaluated element-wise in case of Array or Matrix input.
   *
   * Syntax:
   *
   *     math.isZero(x)
   *
   * Examples:
   *
   *    math.isZero(0)                      // returns true
   *    math.isZero(2)                      // returns false
   *    math.isZero(0.5)                    // returns false
   *    math.isZero(math.bignumber(0))      // returns true
   *    math.isZero(math.fraction(0))       // returns true
   *    math.isZero(math.fraction(1,3))     // returns false
   *    math.isZero(math.complex('2 - 4i')) // returns false
   *    math.isZero(math.complex('0i'))     // returns true
   *    math.isZero('0')                    // returns true
   *    math.isZero('2')                    // returns false
   *    math.isZero([2, 0, -3])             // returns [false, true, false]
   *
   * See also:
   *
   *    isNumeric, isPositive, isNegative, isInteger
   *
   * @param {number | BigNumber | Complex | Fraction | Unit | Array | Matrix} x       Value to be tested
   * @return {boolean}  Returns true when `x` is zero.
   *                    Throws an error in case of an unknown data type.
   */
  return typed(name$5, {
    number: isZeroNumber,
    BigNumber: function BigNumber(x) {
      return x.isZero();
    },
    Complex: function Complex(x) {
      return x.re === 0 && x.im === 0;
    },
    Fraction: function Fraction(x) {
      return x.d === 1 && x.n === 0;
    },
    Unit: typed.referToSelf(self => x => typed.find(self, x.valueType())(x.value)),
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

/**
 * Compares two BigNumbers.
 * @param {BigNumber} x       First value to compare
 * @param {BigNumber} y       Second value to compare
 * @param {number} [epsilon]  The maximum relative difference between x and y
 *                            If epsilon is undefined or null, the function will
 *                            test whether x and y are exactly equal.
 * @return {boolean} whether the two numbers are nearly equal
 */
function nearlyEqual$1(x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon === null || epsilon === undefined) {
    return x.eq(y);
  } // use "==" operator, handles infinities


  if (x.eq(y)) {
    return true;
  } // NaN


  if (x.isNaN() || y.isNaN()) {
    return false;
  } // at this point x and y should be finite


  if (x.isFinite() && y.isFinite()) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = x.minus(y).abs();

    if (diff.isZero()) {
      return true;
    } else {
      // use relative error
      var max = x.constructor.max(x.abs(), y.abs());
      return diff.lte(max.times(epsilon));
    }
  } // Infinite and Number or negative Infinite and positive Infinite cases


  return false;
}

/**
 * Test whether two complex values are equal provided a given epsilon.
 * Does not use or change the global Complex.EPSILON setting
 * @param {Complex} x
 * @param {Complex} y
 * @param {number} epsilon
 * @returns {boolean}
 */

function complexEquals(x, y, epsilon) {
  return nearlyEqual(x.re, y.re, epsilon) && nearlyEqual(x.im, y.im, epsilon);
}

var createCompareUnits = /* #__PURE__ */factory('compareUnits', ['typed'], _ref => {
  var {
    typed
  } = _ref;
  return {
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }

      return typed.find(self, [x.valueType(), y.valueType()])(x.value, y.value);
    })
  };
});

var name$6 = 'equalScalar';
var dependencies$7 = ['typed', 'config'];
var createEqualScalar = /* #__PURE__ */factory(name$6, dependencies$7, _ref => {
  var {
    typed,
    config
  } = _ref;
  var compareUnits = createCompareUnits({
    typed
  });
  /**
   * Test whether two scalar values are nearly equal.
   *
   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
   * @private
   */

  return typed(name$6, {
    'boolean, boolean': function booleanBoolean(x, y) {
      return x === y;
    },
    'number, number': function numberNumber(x, y) {
      return nearlyEqual(x, y, config.epsilon);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.eq(y) || nearlyEqual$1(x, y, config.epsilon);
    },
    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.equals(y);
    },
    'Complex, Complex': function ComplexComplex(x, y) {
      return complexEquals(x, y, config.epsilon);
    }
  }, compareUnits);
});
var createEqualScalarNumber = factory(name$6, ['typed', 'config'], _ref2 => {
  var {
    typed,
    config
  } = _ref2;
  return typed(name$6, {
    'number, number': function numberNumber(x, y) {
      return nearlyEqual(x, y, config.epsilon);
    }
  });
});

var name$7 = 'SparseMatrix';
var dependencies$8 = ['typed', 'equalScalar', 'Matrix'];
var createSparseMatrixClass = /* #__PURE__ */factory(name$7, dependencies$8, _ref => {
  var {
    typed,
    equalScalar,
    Matrix
  } = _ref;

  /**
   * Sparse Matrix implementation. This type implements
   * a [Compressed Column Storage](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_column_(CSC_or_CCS))
   * format for two-dimensional sparse matrices.
   * @class SparseMatrix
   */
  function SparseMatrix(data, datatype) {
    if (!(this instanceof SparseMatrix)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (datatype && !isString(datatype)) {
      throw new Error('Invalid datatype: ' + datatype);
    }

    if (isMatrix(data)) {
      // create from matrix
      _createFromMatrix(this, data, datatype);
    } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
      // initialize fields
      this._values = data.values;
      this._index = data.index;
      this._ptr = data.ptr;
      this._size = data.size;
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      // create from array
      _createFromArray(this, data, datatype);
    } else if (data) {
      // unsupported type
      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
    } else {
      // nothing provided
      this._values = [];
      this._index = [];
      this._ptr = [0];
      this._size = [0, 0];
      this._datatype = datatype;
    }
  }

  function _createFromMatrix(matrix, source, datatype) {
    // check matrix type
    if (source.type === 'SparseMatrix') {
      // clone arrays
      matrix._values = source._values ? clone(source._values) : undefined;
      matrix._index = clone(source._index);
      matrix._ptr = clone(source._ptr);
      matrix._size = clone(source._size);
      matrix._datatype = datatype || source._datatype;
    } else {
      // build from matrix data
      _createFromArray(matrix, source.valueOf(), datatype || source._datatype);
    }
  }

  function _createFromArray(matrix, data, datatype) {
    // initialize fields
    matrix._values = [];
    matrix._index = [];
    matrix._ptr = [];
    matrix._datatype = datatype; // discover rows & columns, do not use math.size() to avoid looping array twice

    var rows = data.length;
    var columns = 0; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0;

    if (isString(datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar; // convert 0 to the same datatype

      zero = typed.convert(0, datatype);
    } // check we have rows (empty array)


    if (rows > 0) {
      // column index
      var j = 0;

      do {
        // store pointer to values index
        matrix._ptr.push(matrix._index.length); // loop rows


        for (var i = 0; i < rows; i++) {
          // current row
          var row = data[i]; // check row is an array

          if (isArray(row)) {
            // update columns if needed (only on first column)
            if (j === 0 && columns < row.length) {
              columns = row.length;
            } // check row has column


            if (j < row.length) {
              // value
              var v = row[j]; // check value != 0

              if (!eq(v, zero)) {
                // store value
                matrix._values.push(v); // index


                matrix._index.push(i);
              }
            }
          } else {
            // update columns if needed (only on first column)
            if (j === 0 && columns < 1) {
              columns = 1;
            } // check value != 0 (row is a scalar)


            if (!eq(row, zero)) {
              // store value
              matrix._values.push(row); // index


              matrix._index.push(i);
            }
          }
        } // increment index


        j++;
      } while (j < columns);
    } // store number of values in ptr


    matrix._ptr.push(matrix._index.length); // size


    matrix._size = [rows, columns];
  }

  SparseMatrix.prototype = new Matrix();
  /**
   * Create a new SparseMatrix
   */

  SparseMatrix.prototype.createSparseMatrix = function (data, datatype) {
    return new SparseMatrix(data, datatype);
  };
  /**
   * Attach type information
   */


  Object.defineProperty(SparseMatrix, 'name', {
    value: 'SparseMatrix'
  });
  SparseMatrix.prototype.constructor = SparseMatrix;
  SparseMatrix.prototype.type = 'SparseMatrix';
  SparseMatrix.prototype.isSparseMatrix = true;
  /**
   * Get the matrix type
   *
   * Usage:
   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
   *
   * @memberOf SparseMatrix
   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
   */

  SparseMatrix.prototype.getDataType = function () {
    return getArrayDataType(this._values, typeOf);
  };
  /**
   * Get the storage format used by the matrix.
   *
   * Usage:
   *     const format = matrix.storage()   // retrieve storage format
   *
   * @memberof SparseMatrix
   * @return {string}           The storage format.
   */


  SparseMatrix.prototype.storage = function () {
    return 'sparse';
  };
  /**
   * Get the datatype of the data stored in the matrix.
   *
   * Usage:
   *     const format = matrix.datatype()    // retrieve matrix datatype
   *
   * @memberof SparseMatrix
   * @return {string}           The datatype.
   */


  SparseMatrix.prototype.datatype = function () {
    return this._datatype;
  };
  /**
   * Create a new SparseMatrix
   * @memberof SparseMatrix
   * @param {Array} data
   * @param {string} [datatype]
   */


  SparseMatrix.prototype.create = function (data, datatype) {
    return new SparseMatrix(data, datatype);
  };
  /**
   * Get the matrix density.
   *
   * Usage:
   *     const density = matrix.density()                   // retrieve matrix density
   *
   * @memberof SparseMatrix
   * @return {number}           The matrix density.
   */


  SparseMatrix.prototype.density = function () {
    // rows & columns
    var rows = this._size[0];
    var columns = this._size[1]; // calculate density

    return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
  };
  /**
   * Get a subset of the matrix, or replace a subset of the matrix.
   *
   * Usage:
   *     const subset = matrix.subset(index)               // retrieve subset
   *     const value = matrix.subset(index, replacement)   // replace subset
   *
   * @memberof SparseMatrix
   * @param {Index} index
   * @param {Array | Matrix | *} [replacement]
   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be filled with zeros.
   */


  SparseMatrix.prototype.subset = function (index, replacement, defaultValue) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke subset on a Pattern only matrix');
    } // check arguments


    switch (arguments.length) {
      case 1:
        return _getsubset(this, index);
      // intentional fall through

      case 2:
      case 3:
        return _setsubset(this, index, replacement, defaultValue);

      default:
        throw new SyntaxError('Wrong number of arguments');
    }
  };

  function _getsubset(matrix, idx) {
    // check idx
    if (!isIndex(idx)) {
      throw new TypeError('Invalid index');
    }

    var isScalar = idx.isScalar();

    if (isScalar) {
      // return a scalar
      return matrix.get(idx.min());
    } // validate dimensions


    var size = idx.size();

    if (size.length !== matrix._size.length) {
      throw new DimensionError(size.length, matrix._size.length);
    } // vars


    var i, ii, k, kk; // validate if any of the ranges in the index is out of range

    var min = idx.min();
    var max = idx.max();

    for (i = 0, ii = matrix._size.length; i < ii; i++) {
      validateIndex(min[i], matrix._size[i]);
      validateIndex(max[i], matrix._size[i]);
    } // matrix arrays


    var mvalues = matrix._values;
    var mindex = matrix._index;
    var mptr = matrix._ptr; // rows & columns dimensions for result matrix

    var rows = idx.dimension(0);
    var columns = idx.dimension(1); // workspace & permutation vector

    var w = [];
    var pv = []; // loop rows in resulting matrix

    rows.forEach(function (i, r) {
      // update permutation vector
      pv[i] = r[0]; // mark i in workspace

      w[i] = true;
    }); // result matrix arrays

    var values = mvalues ? [] : undefined;
    var index = [];
    var ptr = []; // loop columns in result matrix

    columns.forEach(function (j) {
      // update ptr
      ptr.push(index.length); // loop values in column j

      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
        // row
        i = mindex[k]; // check row is in result matrix

        if (w[i] === true) {
          // push index
          index.push(pv[i]); // check we need to process values

          if (values) {
            values.push(mvalues[k]);
          }
        }
      }
    }); // update ptr

    ptr.push(index.length); // return matrix

    return new SparseMatrix({
      values,
      index,
      ptr,
      size,
      datatype: matrix._datatype
    });
  }

  function _setsubset(matrix, index, submatrix, defaultValue) {
    // check index
    if (!index || index.isIndex !== true) {
      throw new TypeError('Invalid index');
    } // get index size and check whether the index contains a single value


    var iSize = index.size();
    var isScalar = index.isScalar(); // calculate the size of the submatrix, and convert it into an Array if needed

    var sSize;

    if (isMatrix(submatrix)) {
      // submatrix size
      sSize = submatrix.size(); // use array representation

      submatrix = submatrix.toArray();
    } else {
      // get submatrix size (array, scalar)
      sSize = arraySize(submatrix);
    } // check index is a scalar


    if (isScalar) {
      // verify submatrix is a scalar
      if (sSize.length !== 0) {
        throw new TypeError('Scalar expected');
      } // set value


      matrix.set(index.min(), submatrix, defaultValue);
    } else {
      // validate dimensions, index size must be one or two dimensions
      if (iSize.length !== 1 && iSize.length !== 2) {
        throw new DimensionError(iSize.length, matrix._size.length, '<');
      } // check submatrix and index have the same dimensions


      if (sSize.length < iSize.length) {
        // calculate number of missing outer dimensions
        var i = 0;
        var outer = 0;

        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }

        while (iSize[i] === 1) {
          outer++;
          i++;
        } // unsqueeze both outer and inner dimensions


        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      } // check whether the size of the submatrix matches the index size


      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, '>');
      } // insert the sub matrix


      if (iSize.length === 1) {
        // if the replacement index only has 1 dimension, go trough each one and set its value
        var range = index.dimension(0);
        range.forEach(function (dataIndex, subIndex) {
          validateIndex(dataIndex);
          matrix.set([dataIndex, 0], submatrix[subIndex[0]], defaultValue);
        });
      } else {
        // if the replacement index has 2 dimensions, go through each one and set the value in the correct index
        var firstDimensionRange = index.dimension(0);
        var secondDimensionRange = index.dimension(1);
        firstDimensionRange.forEach(function (firstDataIndex, firstSubIndex) {
          validateIndex(firstDataIndex);
          secondDimensionRange.forEach(function (secondDataIndex, secondSubIndex) {
            validateIndex(secondDataIndex);
            matrix.set([firstDataIndex, secondDataIndex], submatrix[firstSubIndex[0]][secondSubIndex[0]], defaultValue);
          });
        });
      }
    }

    return matrix;
  }
  /**
   * Get a single element from the matrix.
   * @memberof SparseMatrix
   * @param {number[]} index   Zero-based index
   * @return {*} value
   */


  SparseMatrix.prototype.get = function (index) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }

    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    } // check it is a pattern matrix


    if (!this._values) {
      throw new Error('Cannot invoke get on a Pattern only matrix');
    } // row and column


    var i = index[0];
    var j = index[1]; // check i, j are valid

    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[1]); // find value index

    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index); // check k is prior to next column k and it is in the correct row


    if (k < this._ptr[j + 1] && this._index[k] === i) {
      return this._values[k];
    }

    return 0;
  };
  /**
   * Replace a single element in the matrix.
   * @memberof SparseMatrix
   * @param {number[]} index   Zero-based index
   * @param {*} v
   * @param {*} [defaultValue]        Default value, filled in on new entries when
   *                                  the matrix is resized. If not provided,
   *                                  new matrix elements will be set to zero.
   * @return {SparseMatrix} self
   */


  SparseMatrix.prototype.set = function (index, v, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError('Array expected');
    }

    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    } // check it is a pattern matrix


    if (!this._values) {
      throw new Error('Cannot invoke set on a Pattern only matrix');
    } // row and column


    var i = index[0];
    var j = index[1]; // rows & columns

    var rows = this._size[0];
    var columns = this._size[1]; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0;

    if (isString(this._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [this._datatype, this._datatype]) || equalScalar; // convert 0 to the same datatype

      zero = typed.convert(0, this._datatype);
    } // check we need to resize matrix


    if (i > rows - 1 || j > columns - 1) {
      // resize matrix
      _resize(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue); // update rows & columns


      rows = this._size[0];
      columns = this._size[1];
    } // check i, j are valid


    validateIndex(i, rows);
    validateIndex(j, columns); // find value index

    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index); // check k is prior to next column k and it is in the correct row


    if (k < this._ptr[j + 1] && this._index[k] === i) {
      // check value != 0
      if (!eq(v, zero)) {
        // update value
        this._values[k] = v;
      } else {
        // remove value from matrix
        _remove(k, j, this._values, this._index, this._ptr);
      }
    } else {
      // insert value @ (i, j)
      _insert(k, i, j, v, this._values, this._index, this._ptr);
    }

    return this;
  };

  function _getValueIndex(i, top, bottom, index) {
    // check row is on the bottom side
    if (bottom - top === 0) {
      return bottom;
    } // loop rows [top, bottom[


    for (var r = top; r < bottom; r++) {
      // check we found value index
      if (index[r] === i) {
        return r;
      }
    } // we did not find row


    return top;
  }

  function _remove(k, j, values, index, ptr) {
    // remove value @ k
    values.splice(k, 1);
    index.splice(k, 1); // update pointers

    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]--;
    }
  }

  function _insert(k, i, j, v, values, index, ptr) {
    // insert value
    values.splice(k, 0, v); // update row for k

    index.splice(k, 0, i); // update column pointers

    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]++;
    }
  }
  /**
   * Resize the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (resize in place).
   *
   * @memberof SparseMatrix
   * @param {number[] | Matrix} size  The new size the matrix should have.
   *                                  Since sparse matrices are always two-dimensional,
   *                                  size must be two numbers in either an array or a matrix
   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
   *                                  If not provided, the matrix elements will
   *                                  be filled with zeros.
   * @param {boolean} [copy]          Return a resized copy of the matrix
   *
   * @return {Matrix}                 The resized matrix
   */


  SparseMatrix.prototype.resize = function (size, defaultValue, copy) {
    // validate arguments
    if (!isCollection(size)) {
      throw new TypeError('Array or Matrix expected');
    } // SparseMatrix input is always 2d, flatten this into 1d if it's indeed a vector


    var sizeArray = size.valueOf().map(value => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });

    if (sizeArray.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    } // check sizes


    sizeArray.forEach(function (value) {
      if (!isNumber(value) || !isInteger(value) || value < 0) {
        throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format$2(sizeArray) + ')');
      }
    }); // matrix to resize

    var m = copy ? this.clone() : this; // resize matrix

    return _resize(m, sizeArray[0], sizeArray[1], defaultValue);
  };

  function _resize(matrix, rows, columns, defaultValue) {
    // value to insert at the time of growing matrix
    var value = defaultValue || 0; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0;

    if (isString(matrix._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar; // convert 0 to the same datatype

      zero = typed.convert(0, matrix._datatype); // convert value to the same datatype

      value = typed.convert(value, matrix._datatype);
    } // should we insert the value?


    var ins = !eq(value, zero); // old columns and rows

    var r = matrix._size[0];
    var c = matrix._size[1];
    var i, j, k; // check we need to increase columns

    if (columns > c) {
      // loop new columns
      for (j = c; j < columns; j++) {
        // update matrix._ptr for current column
        matrix._ptr[j] = matrix._values.length; // check we need to insert matrix._values

        if (ins) {
          // loop rows
          for (i = 0; i < r; i++) {
            // add new matrix._values
            matrix._values.push(value); // update matrix._index


            matrix._index.push(i);
          }
        }
      } // store number of matrix._values in matrix._ptr


      matrix._ptr[columns] = matrix._values.length;
    } else if (columns < c) {
      // truncate matrix._ptr
      matrix._ptr.splice(columns + 1, c - columns); // truncate matrix._values and matrix._index


      matrix._values.splice(matrix._ptr[columns], matrix._values.length);

      matrix._index.splice(matrix._ptr[columns], matrix._index.length);
    } // update columns


    c = columns; // check we need to increase rows

    if (rows > r) {
      // check we have to insert values
      if (ins) {
        // inserts
        var n = 0; // loop columns

        for (j = 0; j < c; j++) {
          // update matrix._ptr for current column
          matrix._ptr[j] = matrix._ptr[j] + n; // where to insert matrix._values

          k = matrix._ptr[j + 1] + n; // pointer

          var p = 0; // loop new rows, initialize pointer

          for (i = r; i < rows; i++, p++) {
            // add value
            matrix._values.splice(k + p, 0, value); // update matrix._index


            matrix._index.splice(k + p, 0, i); // increment inserts


            n++;
          }
        } // store number of matrix._values in matrix._ptr


        matrix._ptr[c] = matrix._values.length;
      }
    } else if (rows < r) {
      // deletes
      var d = 0; // loop columns

      for (j = 0; j < c; j++) {
        // update matrix._ptr for current column
        matrix._ptr[j] = matrix._ptr[j] - d; // where matrix._values start for next column

        var k0 = matrix._ptr[j];
        var k1 = matrix._ptr[j + 1] - d; // loop matrix._index

        for (k = k0; k < k1; k++) {
          // row
          i = matrix._index[k]; // check we need to delete value and matrix._index

          if (i > rows - 1) {
            // remove value
            matrix._values.splice(k, 1); // remove item from matrix._index


            matrix._index.splice(k, 1); // increase deletes


            d++;
          }
        }
      } // update matrix._ptr for current column


      matrix._ptr[j] = matrix._values.length;
    } // update matrix._size


    matrix._size[0] = rows;
    matrix._size[1] = columns; // return matrix

    return matrix;
  }
  /**
   * Reshape the matrix to the given size. Returns a copy of the matrix when
   * `copy=true`, otherwise return the matrix itself (reshape in place).
   *
   * NOTE: This might be better suited to copy by default, instead of modifying
   *       in place. For now, it operates in place to remain consistent with
   *       resize().
   *
   * @memberof SparseMatrix
   * @param {number[]} sizes          The new size the matrix should have.
   *                                  Since sparse matrices are always two-dimensional,
   *                                  size must be two numbers in either an array or a matrix
   * @param {boolean} [copy]          Return a reshaped copy of the matrix
   *
   * @return {Matrix}                 The reshaped matrix
   */


  SparseMatrix.prototype.reshape = function (sizes, copy) {
    // validate arguments
    if (!isArray(sizes)) {
      throw new TypeError('Array expected');
    }

    if (sizes.length !== 2) {
      throw new Error('Sparse matrices can only be reshaped in two dimensions');
    } // check sizes


    sizes.forEach(function (value) {
      if (!isNumber(value) || !isInteger(value) || value <= -2 || value === 0) {
        throw new TypeError('Invalid size, must contain positive integers or -1 ' + '(size: ' + format$2(sizes) + ')');
      }
    });
    var currentLength = this._size[0] * this._size[1];
    sizes = processSizesWildcard(sizes, currentLength);
    var newLength = sizes[0] * sizes[1]; // m * n must not change

    if (currentLength !== newLength) {
      throw new Error('Reshaping sparse matrix will result in the wrong number of elements');
    } // matrix to reshape


    var m = copy ? this.clone() : this; // return unchanged if the same shape

    if (this._size[0] === sizes[0] && this._size[1] === sizes[1]) {
      return m;
    } // Convert to COO format (generate a column index)


    var colIndex = [];

    for (var i = 0; i < m._ptr.length; i++) {
      for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
        colIndex.push(i);
      }
    } // Clone the values array


    var values = m._values.slice(); // Clone the row index array


    var rowIndex = m._index.slice(); // Transform the (row, column) indices


    for (var _i = 0; _i < m._index.length; _i++) {
      var r1 = rowIndex[_i];
      var c1 = colIndex[_i];
      var flat = r1 * m._size[1] + c1;
      colIndex[_i] = flat % sizes[1];
      rowIndex[_i] = Math.floor(flat / sizes[1]);
    } // Now reshaping is supposed to preserve the row-major order, BUT these sparse matrices are stored
    // in column-major order, so we have to reorder the value array now. One option is to use a multisort,
    // sorting several arrays based on some other array.
    // OR, we could easily just:
    // 1. Remove all values from the matrix


    m._values.length = 0;
    m._index.length = 0;
    m._ptr.length = sizes[1] + 1;
    m._size = sizes.slice();

    for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
      m._ptr[_i2] = 0;
    } // 2. Re-insert all elements in the proper order (simplified code from SparseMatrix.prototype.set)
    // This step is probably the most time-consuming


    for (var h = 0; h < values.length; h++) {
      var _i3 = rowIndex[h];
      var _j = colIndex[h];
      var v = values[h];

      var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);

      _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
    } // The value indices are inserted out of order, but apparently that's... still OK?


    return m;
  };
  /**
   * Create a clone of the matrix
   * @memberof SparseMatrix
   * @return {SparseMatrix} clone
   */


  SparseMatrix.prototype.clone = function () {
    var m = new SparseMatrix({
      values: this._values ? clone(this._values) : undefined,
      index: clone(this._index),
      ptr: clone(this._ptr),
      size: clone(this._size),
      datatype: this._datatype
    });
    return m;
  };
  /**
   * Retrieve the size of the matrix.
   * @memberof SparseMatrix
   * @returns {number[]} size
   */


  SparseMatrix.prototype.size = function () {
    return this._size.slice(0); // copy the Array
  };
  /**
   * Create a new matrix with the results of the callback function executed on
   * each entry of the matrix.
   * @memberof SparseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *
   * @return {SparseMatrix} matrix
   */


  SparseMatrix.prototype.map = function (callback, skipZeros) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke map on a Pattern only matrix');
    } // matrix instance


    var me = this; // rows and columns

    var rows = this._size[0];
    var columns = this._size[1]; // invoke callback

    var args = maxArgumentCount(callback);

    var invoke = function invoke(v, i, j) {
      // invoke callback
      if (args === 1) return callback(v);
      if (args === 2) return callback(v, [i, j]);
      return callback(v, [i, j], me);
    }; // invoke _map


    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
  };
  /**
   * Create a new matrix with the results of the callback function executed on the interval
   * [minRow..maxRow, minColumn..maxColumn].
   */


  function _map(matrix, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
    // result arrays
    var values = [];
    var index = [];
    var ptr = []; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0;

    if (isString(matrix._datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar; // convert 0 to the same datatype

      zero = typed.convert(0, matrix._datatype);
    } // invoke callback


    var invoke = function invoke(v, x, y) {
      // invoke callback
      v = callback(v, x, y); // check value != 0

      if (!eq(v, zero)) {
        // store value
        values.push(v); // index

        index.push(x);
      }
    }; // loop columns


    for (var j = minColumn; j <= maxColumn; j++) {
      // store pointer to values index
      ptr.push(values.length); // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]

      var k0 = matrix._ptr[j];
      var k1 = matrix._ptr[j + 1];

      if (skipZeros) {
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
          // row index
          var i = matrix._index[k]; // check i is in range

          if (i >= minRow && i <= maxRow) {
            // value @ k
            invoke(matrix._values[k], i - minRow, j - minColumn);
          }
        }
      } else {
        // create a cache holding all defined values
        var _values = {};

        for (var _k = k0; _k < k1; _k++) {
          var _i4 = matrix._index[_k];
          _values[_i4] = matrix._values[_k];
        } // loop over all rows (indexes can be unordered so we can't use that),
        // and either read the value or zero


        for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
          var value = _i5 in _values ? _values[_i5] : 0;
          invoke(value, _i5 - minRow, j - minColumn);
        }
      }
    } // store number of values in ptr


    ptr.push(values.length); // return sparse matrix

    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
    });
  }
  /**
   * Execute a callback function on each entry of the matrix.
   * @memberof SparseMatrix
   * @param {Function} callback   The callback function is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
   *                              If false, the indices are guaranteed to be in order,
   *                              if true, the indices can be unordered.
   */


  SparseMatrix.prototype.forEach = function (callback, skipZeros) {
    // check it is a pattern matrix
    if (!this._values) {
      throw new Error('Cannot invoke forEach on a Pattern only matrix');
    } // matrix instance


    var me = this; // rows and columns

    var rows = this._size[0];
    var columns = this._size[1]; // loop columns

    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];

      if (skipZeros) {
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
          // row index
          var i = this._index[k]; // value @ k

          callback(this._values[k], [i, j], me);
        }
      } else {
        // create a cache holding all defined values
        var values = {};

        for (var _k2 = k0; _k2 < k1; _k2++) {
          var _i6 = this._index[_k2];
          values[_i6] = this._values[_k2];
        } // loop over all rows (indexes can be unordered so we can't use that),
        // and either read the value or zero


        for (var _i7 = 0; _i7 < rows; _i7++) {
          var value = _i7 in values ? values[_i7] : 0;
          callback(value, [_i7, j], me);
        }
      }
    }
  };
  /**
   * Iterate over the matrix elements, skipping zeros
   * @return {Iterable<{ value, index: number[] }>}
   */


  SparseMatrix.prototype[Symbol.iterator] = function* () {
    if (!this._values) {
      throw new Error('Cannot iterate a Pattern only matrix');
    }

    var columns = this._size[1];

    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];

      for (var k = k0; k < k1; k++) {
        // row index
        var i = this._index[k];
        yield {
          value: this._values[k],
          index: [i, j]
        };
      }
    }
  };
  /**
   * Create an Array with a copy of the data of the SparseMatrix
   * @memberof SparseMatrix
   * @returns {Array} array
   */


  SparseMatrix.prototype.toArray = function () {
    return _toArray(this._values, this._index, this._ptr, this._size, true);
  };
  /**
   * Get the primitive value of the SparseMatrix: a two dimensions array
   * @memberof SparseMatrix
   * @returns {Array} array
   */


  SparseMatrix.prototype.valueOf = function () {
    return _toArray(this._values, this._index, this._ptr, this._size, false);
  };

  function _toArray(values, index, ptr, size, copy) {
    // rows and columns
    var rows = size[0];
    var columns = size[1]; // result

    var a = []; // vars

    var i, j; // initialize array

    for (i = 0; i < rows; i++) {
      a[i] = [];

      for (j = 0; j < columns; j++) {
        a[i][j] = 0;
      }
    } // loop columns


    for (j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = ptr[j];
      var k1 = ptr[j + 1]; // loop k within [k0, k1[

      for (var k = k0; k < k1; k++) {
        // row index
        i = index[k]; // set value (use one for pattern matrix)

        a[i][j] = values ? copy ? clone(values[k]) : values[k] : 1;
      }
    }

    return a;
  }
  /**
   * Get a string representation of the matrix, with optional formatting options.
   * @memberof SparseMatrix
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */


  SparseMatrix.prototype.format = function (options) {
    // rows and columns
    var rows = this._size[0];
    var columns = this._size[1]; // density

    var density = this.density(); // rows & columns

    var str = 'Sparse Matrix [' + format$2(rows, options) + ' x ' + format$2(columns, options) + '] density: ' + format$2(density, options) + '\n'; // loop columns

    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1]; // loop k within [k0, k1[

      for (var k = k0; k < k1; k++) {
        // row index
        var i = this._index[k]; // append value

        str += '\n    (' + format$2(i, options) + ', ' + format$2(j, options) + ') ==> ' + (this._values ? format$2(this._values[k], options) : 'X');
      }
    }

    return str;
  };
  /**
   * Get a string representation of the matrix
   * @memberof SparseMatrix
   * @returns {string} str
   */


  SparseMatrix.prototype.toString = function () {
    return format$2(this.toArray());
  };
  /**
   * Get a JSON representation of the matrix
   * @memberof SparseMatrix
   * @returns {Object}
   */


  SparseMatrix.prototype.toJSON = function () {
    return {
      mathjs: 'SparseMatrix',
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  };
  /**
   * Get the kth Matrix diagonal.
   *
   * @memberof SparseMatrix
   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
   *
   * @returns {Matrix}                     The matrix vector with the diagonal values.
   */


  SparseMatrix.prototype.diagonal = function (k) {
    // validate k if any
    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      } // is must be an integer


      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    }

    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0; // rows & columns

    var rows = this._size[0];
    var columns = this._size[1]; // number diagonal values

    var n = Math.min(rows - kSub, columns - kSuper); // diagonal arrays

    var values = [];
    var index = [];
    var ptr = []; // initial ptr value

    ptr[0] = 0; // loop columns

    for (var j = kSuper; j < columns && values.length < n; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1]; // loop x within [k0, k1[

      for (var x = k0; x < k1; x++) {
        // row index
        var i = this._index[x]; // check row

        if (i === j - kSuper + kSub) {
          // value on this column
          values.push(this._values[x]); // store row

          index[values.length - 1] = i - kSub; // exit loop

          break;
        }
      }
    } // close ptr


    ptr.push(values.length); // return matrix

    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [n, 1]
    });
  };
  /**
   * Generate a matrix from a JSON object
   * @memberof SparseMatrix
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "SparseMatrix", "values": [], "index": [], "ptr": [], "size": []}`,
   *                       where mathjs is optional
   * @returns {SparseMatrix}
   */


  SparseMatrix.fromJSON = function (json) {
    return new SparseMatrix(json);
  };
  /**
   * Create a diagonal matrix.
   *
   * @memberof SparseMatrix
   * @param {Array} size                       The matrix size.
   * @param {number | Array | Matrix } value   The values for the diagonal.
   * @param {number | BigNumber} [k=0]         The kth diagonal where the vector will be filled in.
   * @param {number} [defaultValue]            The default value for non-diagonal
   * @param {string} [datatype]                The Matrix datatype, values must be of this datatype.
   *
   * @returns {SparseMatrix}
   */


  SparseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
    if (!isArray(size)) {
      throw new TypeError('Array expected, size parameter');
    }

    if (size.length !== 2) {
      throw new Error('Only two dimensions matrix are supported');
    } // map size & validate


    size = size.map(function (s) {
      // check it is a big number
      if (isBigNumber(s)) {
        // convert it
        s = s.toNumber();
      } // validate arguments


      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error('Size values must be positive integers');
      }

      return s;
    }); // validate k if any

    if (k) {
      // convert BigNumber to a number
      if (isBigNumber(k)) {
        k = k.toNumber();
      } // is must be an integer


      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError('The parameter k must be an integer number');
      }
    } else {
      // default value
      k = 0;
    } // equal signature to use


    var eq = equalScalar; // zero value

    var zero = 0;

    if (isString(datatype)) {
      // find signature that matches (datatype, datatype)
      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar; // convert 0 to the same datatype

      zero = typed.convert(0, datatype);
    }

    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0; // rows and columns

    var rows = size[0];
    var columns = size[1]; // number of non-zero items

    var n = Math.min(rows - kSub, columns - kSuper); // value extraction function

    var _value; // check value


    if (isArray(value)) {
      // validate array
      if (value.length !== n) {
        // number of values in array must be n
        throw new Error('Invalid value array length');
      } // define function


      _value = function _value(i) {
        // return value @ i
        return value[i];
      };
    } else if (isMatrix(value)) {
      // matrix size
      var ms = value.size(); // validate matrix

      if (ms.length !== 1 || ms[0] !== n) {
        // number of values in array must be n
        throw new Error('Invalid matrix length');
      } // define function


      _value = function _value(i) {
        // return value @ i
        return value.get([i]);
      };
    } else {
      // define function
      _value = function _value() {
        // return value
        return value;
      };
    } // create arrays


    var values = [];
    var index = [];
    var ptr = []; // loop items

    for (var j = 0; j < columns; j++) {
      // number of rows with value
      ptr.push(values.length); // diagonal index

      var i = j - kSuper; // check we need to set diagonal value

      if (i >= 0 && i < n) {
        // get value @ i
        var v = _value(i); // check for zero


        if (!eq(v, zero)) {
          // column
          index.push(i + kSub); // add value

          values.push(v);
        }
      }
    } // last value should be number of values


    ptr.push(values.length); // create SparseMatrix

    return new SparseMatrix({
      values,
      index,
      ptr,
      size: [rows, columns]
    });
  };
  /**
   * Swap rows i and j in Matrix.
   *
   * @memberof SparseMatrix
   * @param {number} i       Matrix row index 1
   * @param {number} j       Matrix row index 2
   *
   * @return {Matrix}        The matrix reference
   */


  SparseMatrix.prototype.swapRows = function (i, j) {
    // check index
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error('Row index must be positive integers');
    } // check dimensions


    if (this._size.length !== 2) {
      throw new Error('Only two dimensional matrix is supported');
    } // validate index


    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]); // swap rows

    SparseMatrix._swapRows(i, j, this._size[1], this._values, this._index, this._ptr); // return current instance


    return this;
  };
  /**
   * Loop rows with data in column j.
   *
   * @param {number} j            Column
   * @param {Array} values        Matrix values
   * @param {Array} index         Matrix row indeces
   * @param {Array} ptr           Matrix column pointers
   * @param {Function} callback   Callback function invoked for every row in column j
   */


  SparseMatrix._forEachRow = function (j, values, index, ptr, callback) {
    // indeces for column j
    var k0 = ptr[j];
    var k1 = ptr[j + 1]; // loop

    for (var k = k0; k < k1; k++) {
      // invoke callback
      callback(index[k], values[k]);
    }
  };
  /**
   * Swap rows x and y in Sparse Matrix data structures.
   *
   * @param {number} x         Matrix row index 1
   * @param {number} y         Matrix row index 2
   * @param {number} columns   Number of columns in matrix
   * @param {Array} values     Matrix values
   * @param {Array} index      Matrix row indeces
   * @param {Array} ptr        Matrix column pointers
   */


  SparseMatrix._swapRows = function (x, y, columns, values, index, ptr) {
    // loop columns
    for (var j = 0; j < columns; j++) {
      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
      var k0 = ptr[j];
      var k1 = ptr[j + 1]; // find value index @ x

      var kx = _getValueIndex(x, k0, k1, index); // find value index @ x


      var ky = _getValueIndex(y, k0, k1, index); // check both rows exist in matrix


      if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
        // swap values (check for pattern matrix)
        if (values) {
          var v = values[kx];
          values[kx] = values[ky];
          values[ky] = v;
        } // next column


        continue;
      } // check x row exist & no y row


      if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
        // value @ x (check for pattern matrix)
        var vx = values ? values[kx] : undefined; // insert value @ y

        index.splice(ky, 0, y);

        if (values) {
          values.splice(ky, 0, vx);
        } // remove value @ x (adjust array index if needed)


        index.splice(ky <= kx ? kx + 1 : kx, 1);

        if (values) {
          values.splice(ky <= kx ? kx + 1 : kx, 1);
        } // next column


        continue;
      } // check y row exist & no x row


      if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
        // value @ y (check for pattern matrix)
        var vy = values ? values[ky] : undefined; // insert value @ x

        index.splice(kx, 0, x);

        if (values) {
          values.splice(kx, 0, vy);
        } // remove value @ y (adjust array index if needed)


        index.splice(kx <= ky ? ky + 1 : ky, 1);

        if (values) {
          values.splice(kx <= ky ? ky + 1 : ky, 1);
        }
      }
    }
  };

  return SparseMatrix;
}, {
  isClass: true
});

var name$8 = 'number';
var dependencies$9 = ['typed'];
/**
 * Separates the radix, integer part, and fractional part of a non decimal number string
 * @param {string} input string to parse
 * @returns {object} the parts of the string or null if not a valid input
 */

function getNonDecimalNumberParts(input) {
  var nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);

  if (nonDecimalWithRadixMatch) {
    var radix = {
      '0b': 2,
      '0o': 8,
      '0x': 16
    }[nonDecimalWithRadixMatch[1]];
    var integerPart = nonDecimalWithRadixMatch[2];
    var fractionalPart = nonDecimalWithRadixMatch[3];
    return {
      input,
      radix,
      integerPart,
      fractionalPart
    };
  } else {
    return null;
  }
}
/**
 * Makes a number from a radix, and integer part, and a fractional part
 * @param {parts} [x] parts of the number string (from getNonDecimalNumberParts)
 * @returns {number} the number
 */


function makeNumberFromNonDecimalParts(parts) {
  var n = parseInt(parts.integerPart, parts.radix);
  var f = 0;

  for (var i = 0; i < parts.fractionalPart.length; i++) {
    var digitValue = parseInt(parts.fractionalPart[i], parts.radix);
    f += digitValue / Math.pow(parts.radix, i + 1);
  }

  var result = n + f;

  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is no valid number');
  }

  return result;
}

var createNumber = /* #__PURE__ */factory(name$8, dependencies$9, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Create a number or convert a string, boolean, or unit to a number.
   * When value is a matrix, all elements will be converted to number.
   *
   * Syntax:
   *
   *    math.number(value)
   *    math.number(unit, valuelessUnit)
   *
   * Examples:
   *
   *    math.number(2)                         // returns number 2
   *    math.number('7.2')                     // returns number 7.2
   *    math.number(true)                      // returns number 1
   *    math.number([true, false, true, true]) // returns [1, 0, 1, 1]
   *    math.number(math.unit('52cm'), 'm')    // returns 0.52
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, matrix, string, unit
   *
   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
   * @return {number | Array | Matrix} The created number
   */
  var number = typed('number', {
    '': function _() {
      return 0;
    },
    number: function number(x) {
      return x;
    },
    string: function string(x) {
      if (x === 'NaN') return NaN;
      var nonDecimalNumberParts = getNonDecimalNumberParts(x);

      if (nonDecimalNumberParts) {
        return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
      }

      var size = 0;
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);

      if (wordSizeSuffixMatch) {
        // x includes a size suffix like 0xffffi32, so we extract
        // the suffix and remove it from x
        size = Number(wordSizeSuffixMatch[2]);
        x = wordSizeSuffixMatch[1];
      }

      var num = Number(x);

      if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is no valid number');
      }

      if (wordSizeSuffixMatch) {
        // x is a signed bin, oct, or hex literal
        // num is the value of string x if x is interpreted as unsigned
        if (num > 2 ** size - 1) {
          // literal is too large for size suffix
          throw new SyntaxError("String \"".concat(x, "\" is out of range"));
        } // check if the bit at index size - 1 is set and if so do the twos complement


        if (num >= 2 ** (size - 1)) {
          num = num - 2 ** size;
        }
      }

      return num;
    },
    BigNumber: function BigNumber(x) {
      return x.toNumber();
    },
    Fraction: function Fraction(x) {
      return x.valueOf();
    },
    Unit: function Unit(x) {
      throw new Error('Second argument with valueless unit expected');
    },
    null: function _null(x) {
      return 0;
    },
    'Unit, string | Unit': function UnitStringUnit(unit, valuelessUnit) {
      return unit.toNumber(valuelessUnit);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  }); // reviver function to parse a JSON object like:
  //
  //     {"mathjs":"number","value":"2.3"}
  //
  // into a number 2.3

  number.fromJSON = function (json) {
    return parseFloat(json.value);
  };

  return number;
});

var name$9 = 'bignumber';
var dependencies$a = ['typed', 'BigNumber'];
var createBignumber = /* #__PURE__ */factory(name$9, dependencies$a, _ref => {
  var {
    typed,
    BigNumber
  } = _ref;

  /**
   * Create a BigNumber, which can store numbers with arbitrary precision.
   * When a matrix is provided, all elements will be converted to BigNumber.
   *
   * Syntax:
   *
   *    math.bignumber(x)
   *
   * Examples:
   *
   *    0.1 + 0.2                                  // returns number 0.30000000000000004
   *    math.bignumber(0.1) + math.bignumber(0.2)  // returns BigNumber 0.3
   *
   *
   *    7.2e500                                    // returns number Infinity
   *    math.bignumber('7.2e500')                  // returns BigNumber 7.2e500
   *
   * See also:
   *
   *    boolean, complex, index, matrix, string, unit
   *
   * @param {number | string | Fraction | BigNumber | Array | Matrix | boolean | null} [value]  Value for the big number,
   *                                                    0 by default.
   * @returns {BigNumber} The created bignumber
   */
  return typed('bignumber', {
    '': function _() {
      return new BigNumber(0);
    },
    number: function number(x) {
      // convert to string to prevent errors in case of >15 digits
      return new BigNumber(x + '');
    },
    string: function string(x) {
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);

      if (wordSizeSuffixMatch) {
        // x has a word size suffix
        var size = wordSizeSuffixMatch[2];
        var n = BigNumber(wordSizeSuffixMatch[1]);
        var twoPowSize = new BigNumber(2).pow(Number(size));

        if (n.gt(twoPowSize.sub(1))) {
          throw new SyntaxError("String \"".concat(x, "\" is out of range"));
        }

        var twoPowSizeSubOne = new BigNumber(2).pow(Number(size) - 1);

        if (n.gte(twoPowSizeSubOne)) {
          return n.sub(twoPowSize);
        } else {
          return n;
        }
      }

      return new BigNumber(x);
    },
    BigNumber: function BigNumber(x) {
      // we assume a BigNumber is immutable
      return x;
    },
    Fraction: function Fraction(x) {
      return new BigNumber(x.n).div(x.d).times(x.s);
    },
    null: function _null(x) {
      return new BigNumber(0);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$a = 'fraction';
var dependencies$b = ['typed', 'Fraction'];
var createFraction = /* #__PURE__ */factory(name$a, dependencies$b, _ref => {
  var {
    typed,
    Fraction
  } = _ref;

  /**
   * Create a fraction or convert a value to a fraction.
   *
   * With one numeric argument, produces the closest rational approximation to the
   * input.
   * With two arguments, the first is the numerator and the second is the denominator,
   * and creates the corresponding fraction. Both numerator and denominator must be
   * integers.
   * With one object argument, looks for the integer numerator as the value of property
   * 'n' and the integer denominator as the value of property 'd'.
   * With a matrix argument, creates a matrix of the same shape with entries
   * converted into fractions.
   *
   * Syntax:
   *     math.fraction(value)
   *     math.fraction(numerator, denominator)
   *     math.fraction({n: numerator, d: denominator})
   *     math.fraction(matrix: Array | Matrix)
   *
   * Examples:
   *
   *     math.fraction(6.283)             // returns Fraction 6283/1000
   *     math.fraction(1, 3)              // returns Fraction 1/3
   *     math.fraction('2/3')             // returns Fraction 2/3
   *     math.fraction({n: 2, d: 3})      // returns Fraction 2/3
   *     math.fraction([0.2, 0.25, 1.25]) // returns Array [1/5, 1/4, 5/4]
   *     math.fraction(4, 5.1)            // throws Error: Parameters must be integer
   *
   * See also:
   *
   *    bignumber, number, string, unit
   *
   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
   *            Arguments specifying the value, or numerator and denominator of
   *            the fraction
   * @return {Fraction | Array | Matrix} Returns a fraction
   */
  return typed('fraction', {
    number: function number(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + ' cannot be represented as a fraction');
      }

      return new Fraction(x);
    },
    string: function string(x) {
      return new Fraction(x);
    },
    'number, number': function numberNumber(numerator, denominator) {
      return new Fraction(numerator, denominator);
    },
    null: function _null(x) {
      return new Fraction(0);
    },
    BigNumber: function BigNumber(x) {
      return new Fraction(x.toString());
    },
    Fraction: function Fraction(x) {
      return x; // fractions are immutable
    },
    Object: function Object(x) {
      return new Fraction(x);
    },
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$b = 'matrix';
var dependencies$c = ['typed', 'Matrix', 'DenseMatrix', 'SparseMatrix'];
var createMatrix = /* #__PURE__ */factory(name$b, dependencies$c, _ref => {
  var {
    typed,
    Matrix,
    DenseMatrix,
    SparseMatrix
  } = _ref;

  /**
   * Create a Matrix. The function creates a new `math.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   * Supported storage formats are 'dense' and 'sparse'.
   *
   * Syntax:
   *
   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
   *
   * Examples:
   *
   *    let m = math.matrix([[1, 2], [3, 4]])
   *    m.size()                        // Array [2, 2]
   *    m.resize([3, 2], 5)
   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, sparse
   *
   * @param {Array | Matrix} [data]    A multi dimensional array
   * @param {string} [format]          The Matrix storage format, either `'dense'` or `'sparse'`
   * @param {string} [datatype]        Type of the values
   *
   * @return {Matrix} The created matrix
   */
  return typed(name$b, {
    '': function _() {
      return _create([]);
    },
    string: function string(format) {
      return _create([], format);
    },
    'string, string': function stringString(format, datatype) {
      return _create([], format, datatype);
    },
    Array: function Array(data) {
      return _create(data);
    },
    Matrix: function Matrix(data) {
      return _create(data, data.storage());
    },
    'Array | Matrix, string': _create,
    'Array | Matrix, string, string': _create
  });
  /**
   * Create a new Matrix with given storage format
   * @param {Array} data
   * @param {string} [format]
   * @param {string} [datatype]
   * @returns {Matrix} Returns a new Matrix
   * @private
   */

  function _create(data, format, datatype) {
    // get storage format constructor
    if (format === 'dense' || format === 'default' || format === undefined) {
      return new DenseMatrix(data, datatype);
    }

    if (format === 'sparse') {
      return new SparseMatrix(data, datatype);
    }

    throw new TypeError('Unknown matrix type ' + JSON.stringify(format) + '.');
  }
});

var name$c = 'unaryMinus';
var dependencies$d = ['typed'];
var createUnaryMinus = /* #__PURE__ */factory(name$c, dependencies$d, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Inverse the sign of a value, apply a unary minus operation.
   *
   * For matrices, the function is evaluated element wise. Boolean values and
   * strings will be converted to a number. For complex numbers, both real and
   * complex value are inverted.
   *
   * Syntax:
   *
   *    math.unaryMinus(x)
   *
   * Examples:
   *
   *    math.unaryMinus(3.5)      // returns -3.5
   *    math.unaryMinus(-4.2)     // returns 4.2
   *
   * See also:
   *
   *    add, subtract, unaryPlus
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Number to be inverted.
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
   */
  return typed(name$c, {
    number: unaryMinusNumber,
    'Complex | BigNumber | Fraction': x => x.neg(),
    Unit: typed.referToSelf(self => x => {
      var res = x.clone();
      res.value = typed.find(self, res.valueType())(x.value);
      return res;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self)) // TODO: add support for string

  });
});

var name$d = 'abs';
var dependencies$e = ['typed'];
var createAbs = /* #__PURE__ */factory(name$d, dependencies$e, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Calculate the absolute value of a number. For matrices, the function is
   * evaluated element wise.
   *
   * Syntax:
   *
   *    math.abs(x)
   *
   * Examples:
   *
   *    math.abs(3.5)                // returns number 3.5
   *    math.abs(-4.2)               // returns number 4.2
   *
   *    math.abs([3, -5, -1, 0, 2])  // returns Array [3, 5, 1, 0, 2]
   *
   * See also:
   *
   *    sign
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix | Unit} x
   *            A number or matrix for which to get the absolute value
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix | Unit}
   *            Absolute value of `x`
   */
  return typed(name$d, {
    number: absNumber,
    'Complex | BigNumber | Fraction | Unit': x => x.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$e = 'addScalar';
var dependencies$f = ['typed'];
var createAddScalar = /* #__PURE__ */factory(name$e, dependencies$f, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Add two scalar values, `x + y`.
   * This function is meant for internal use: it is used by the public function
   * `add`
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to add
   * @param  {number | BigNumber | Fraction | Complex} y          Second value to add
   * @return {number | BigNumber | Fraction | Complex | Unit}     Sum of `x` and `y`
   * @private
   */
  return typed(name$e, {
    'number, number': addNumber,
    'Complex, Complex': function ComplexComplex(x, y) {
      return x.add(y);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.plus(y);
    },
    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.add(y);
    },
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (x.value === null || x.value === undefined) {
        throw new Error('Parameter x contains a unit with undefined value');
      }

      if (y.value === null || y.value === undefined) {
        throw new Error('Parameter y contains a unit with undefined value');
      }

      if (!x.equalBase(y)) throw new Error('Units do not match');
      var res = x.clone();
      res.value = typed.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});

var name$f = 'matAlgo11xS0s';
var dependencies$g = ['typed', 'equalScalar'];
var createMatAlgo11xS0s = /* #__PURE__ */factory(name$f, dependencies$g, _ref => {
  var {
    typed,
    equalScalar
  } = _ref;

  /**
   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
   * Callback function invoked NZ times (number of nonzero items in S).
   *
   *
   *          ┌  f(Sij, b)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  0          ; otherwise
   *
   *
   * @param {Matrix}   s                 The SparseMatrix instance (S)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
   *
   * @return {Matrix}                    SparseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
   */
  return function matAlgo11xS0s(s, b, callback, inverse) {
    // sparse matrix arrays
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

    if (!avalues) {
      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string') {
      // datatype
      dt = adt; // find signature that matches (dt, dt)

      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt); // convert b to the same datatype

      b = typed.convert(b, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result arrays


    var cvalues = [];
    var cindex = [];
    var cptr = []; // loop columns

    for (var j = 0; j < columns; j++) {
      // initialize ptr
      cptr[j] = cindex.length; // values in j

      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        var i = aindex[k]; // invoke callback

        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b); // check value is zero

        if (!eq(v, zero)) {
          // push index & value
          cindex.push(i);
          cvalues.push(v);
        }
      }
    } // update ptr


    cptr[columns] = cindex.length; // return sparse matrix

    return s.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$g = 'matAlgo12xSfs';
var dependencies$h = ['typed', 'DenseMatrix'];
var createMatAlgo12xSfs = /* #__PURE__ */factory(name$g, dependencies$h, _ref => {
  var {
    typed,
    DenseMatrix
  } = _ref;

  /**
   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
   * Callback function invoked MxN times.
   *
   *
   *          ┌  f(Sij, b)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  f(0, b)    ; otherwise
   *
   *
   * @param {Matrix}   s                 The SparseMatrix instance (S)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
   */
  return function matAlgo12xSfs(s, b, callback, inverse) {
    // sparse matrix arrays
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

    if (!avalues) {
      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string') {
      // datatype
      dt = adt; // convert b to the same datatype

      b = typed.convert(b, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result arrays


    var cdata = []; // workspaces

    var x = []; // marks indicating we have a value in x for a given column

    var w = []; // loop columns

    for (var j = 0; j < columns; j++) {
      // columns mark
      var mark = j + 1; // values in j

      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        var r = aindex[k]; // update workspace

        x[r] = avalues[k];
        w[r] = mark;
      } // loop rows


      for (var i = 0; i < rows; i++) {
        // initialize C on first column
        if (j === 0) {
          // create row array
          cdata[i] = [];
        } // check sparse matrix has a value @ i,j


        if (w[i] === mark) {
          // invoke callback, update C
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          // dense matrix value @ i, j
          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
        }
      }
    } // return dense matrix


    return new DenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$h = 'matAlgo14xDs';
var dependencies$i = ['typed'];
var createMatAlgo14xDs = /* #__PURE__ */factory(name$h, dependencies$i, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, b).
   * Callback function invoked MxN times.
   *
   * C(i,j,...z) = f(Aij..z, b)
   *
   * @param {Matrix}   a                 The DenseMatrix instance (A)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij..z,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Aij..z)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97659042
   */
  return function matAlgo14xDs(a, b, callback, inverse) {
    // a arrays
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // datatype

    var dt; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string') {
      // datatype
      dt = adt; // convert b to the same datatype

      b = typed.convert(b, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // populate cdata, iterate through dimensions


    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : []; // c matrix

    return a.createDenseMatrix({
      data: cdata,
      size: clone(asize),
      datatype: dt
    });
  }; // recursive function

  function _iterate(f, level, s, n, av, bv, inverse) {
    // initialize array for this level
    var cv = []; // check we reach the last level

    if (level === s.length - 1) {
      // loop arrays in last level
      for (var i = 0; i < n; i++) {
        // invoke callback and store value
        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
      }
    } else {
      // iterate current level
      for (var j = 0; j < n; j++) {
        // iterate next level
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
      }
    }

    return cv;
  }
});

var name$i = 'matAlgo01xDSid';
var dependencies$j = ['typed'];
var createMatAlgo01xDSid = /* #__PURE__ */factory(name$i, dependencies$j, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Iterates over SparseMatrix nonzero items and invokes the callback function f(Dij, Sij).
   * Callback function invoked NNZ times (number of nonzero items in SparseMatrix).
   *
   *
   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  Dij          ; otherwise
   *
   *
   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (S)
   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
   */
  return function algorithm1(denseMatrix, sparseMatrix, callback, inverse) {
    // dense matrix arrays
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype; // sparse matrix arrays

    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype; // validate dimensions

    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    } // check rows & columns


    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    } // sparse matrix cannot be a Pattern matrix


    if (!bvalues) {
      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // process data types

    var dt = typeof adt === 'string' && adt === bdt ? adt : undefined; // callback function

    var cf = dt ? typed.find(callback, [dt, dt]) : callback; // vars

    var i, j; // result (DenseMatrix)

    var cdata = []; // initialize c

    for (i = 0; i < rows; i++) {
      cdata[i] = [];
    } // workspace


    var x = []; // marks indicating we have a value in x for a given column

    var w = []; // loop columns in b

    for (j = 0; j < columns; j++) {
      // column mark
      var mark = j + 1; // values in column j

      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        // row
        i = bindex[k]; // update workspace

        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]); // mark i as updated

        w[i] = mark;
      } // loop rows


      for (i = 0; i < rows; i++) {
        // check row is in workspace
        if (w[i] === mark) {
          // c[i][j] was already calculated
          cdata[i][j] = x[i];
        } else {
          // item does not exist in S
          cdata[i][j] = adata[i][j];
        }
      }
    } // return dense matrix


    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$j = 'matAlgo04xSidSid';
var dependencies$k = ['typed', 'equalScalar'];
var createMatAlgo04xSidSid = /* #__PURE__ */factory(name$j, dependencies$k, _ref => {
  var {
    typed,
    equalScalar
  } = _ref;

  /**
   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
   * Callback function invoked MAX(NNZA, NNZB) times
   *
   *
   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 && B(i,j) !== 0
   * C(i,j) = ┤  A(i,j)       ; A(i,j) !== 0 && B(i,j) === 0
   *          └  B(i,j)       ; A(i,j) === 0
   *
   *
   * @param {Matrix}   a                 The SparseMatrix instance (A)
   * @param {Matrix}   b                 The SparseMatrix instance (B)
   * @param {Function} callback          The f(Aij,Bij) operation to invoke
   *
   * @return {Matrix}                    SparseMatrix (C)
   *
   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
   */
  return function matAlgo04xSidSid(a, b, callback) {
    // sparse matrix arrays
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype; // sparse matrix arrays

    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype; // validate dimensions

    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    } // check rows & columns


    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string' && adt === bdt) {
      // datatype
      dt = adt; // find signature that matches (dt, dt)

      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result arrays


    var cvalues = avalues && bvalues ? [] : undefined;
    var cindex = [];
    var cptr = []; // workspace

    var xa = avalues && bvalues ? [] : undefined;
    var xb = avalues && bvalues ? [] : undefined; // marks indicating we have a value in x for a given column

    var wa = [];
    var wb = []; // vars

    var i, j, k, k0, k1; // loop columns

    for (j = 0; j < columns; j++) {
      // update cptr
      cptr[j] = cindex.length; // columns mark

      var mark = j + 1; // loop A(:,j)

      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        i = aindex[k]; // update c

        cindex.push(i); // update workspace

        wa[i] = mark; // check we need to process values

        if (xa) {
          xa[i] = avalues[k];
        }
      } // loop B(:,j)


      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        // row
        i = bindex[k]; // check row exists in A

        if (wa[i] === mark) {
          // update record in xa @ i
          if (xa) {
            // invoke callback
            var v = cf(xa[i], bvalues[k]); // check for zero

            if (!eq(v, zero)) {
              // update workspace
              xa[i] = v;
            } else {
              // remove mark (index will be removed later)
              wa[i] = null;
            }
          }
        } else {
          // update c
          cindex.push(i); // update workspace

          wb[i] = mark; // check we need to process values

          if (xb) {
            xb[i] = bvalues[k];
          }
        }
      } // check we need to process values (non pattern matrix)


      if (xa && xb) {
        // initialize first index in j
        k = cptr[j]; // loop index in j

        while (k < cindex.length) {
          // row
          i = cindex[k]; // check workspace has value @ i

          if (wa[i] === mark) {
            // push value (Aij != 0 || (Aij != 0 && Bij != 0))
            cvalues[k] = xa[i]; // increment pointer

            k++;
          } else if (wb[i] === mark) {
            // push value (bij != 0)
            cvalues[k] = xb[i]; // increment pointer

            k++;
          } else {
            // remove index @ k
            cindex.splice(k, 1);
          }
        }
      }
    } // update cptr


    cptr[columns] = cindex.length; // return sparse matrix

    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$k = 'matAlgo10xSids';
var dependencies$l = ['typed', 'DenseMatrix'];
var createMatAlgo10xSids = /* #__PURE__ */factory(name$k, dependencies$l, _ref => {
  var {
    typed,
    DenseMatrix
  } = _ref;

  /**
   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
   * Callback function invoked NZ times (number of nonzero items in S).
   *
   *
   *          ┌  f(Sij, b)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  b          ; otherwise
   *
   *
   * @param {Matrix}   s                 The SparseMatrix instance (S)
   * @param {Scalar}   b                 The Scalar value
   * @param {Function} callback          The f(Aij,b) operation to invoke
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
   */
  return function matAlgo10xSids(s, b, callback, inverse) {
    // sparse matrix arrays
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

    if (!avalues) {
      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string') {
      // datatype
      dt = adt; // convert b to the same datatype

      b = typed.convert(b, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result arrays


    var cdata = []; // workspaces

    var x = []; // marks indicating we have a value in x for a given column

    var w = []; // loop columns

    for (var j = 0; j < columns; j++) {
      // columns mark
      var mark = j + 1; // values in j

      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        // row
        var r = aindex[k]; // update workspace

        x[r] = avalues[k];
        w[r] = mark;
      } // loop rows


      for (var i = 0; i < rows; i++) {
        // initialize C on first column
        if (j === 0) {
          // create row array
          cdata[i] = [];
        } // check sparse matrix has a value @ i,j


        if (w[i] === mark) {
          // invoke callback, update C
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          // dense matrix value @ i, j
          cdata[i][j] = b;
        }
      }
    } // return dense matrix


    return new DenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$l = 'matAlgo13xDD';
var dependencies$m = ['typed'];
var createMatAlgo13xDD = /* #__PURE__ */factory(name$l, dependencies$m, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, Bij..z).
   * Callback function invoked MxN times.
   *
   * C(i,j,...z) = f(Aij..z, Bij..z)
   *
   * @param {Matrix}   a                 The DenseMatrix instance (A)
   * @param {Matrix}   b                 The DenseMatrix instance (B)
   * @param {Function} callback          The f(Aij..z,Bij..z) operation to invoke
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97658658
   */
  return function matAlgo13xDD(a, b, callback) {
    // a arrays
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // b arrays

    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype; // c arrays

    var csize = []; // validate dimensions

    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    } // validate each one of the dimension sizes


    for (var s = 0; s < asize.length; s++) {
      // must match
      if (asize[s] !== bsize[s]) {
        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
      } // update dimension in c


      csize[s] = asize[s];
    } // datatype


    var dt; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string' && adt === bdt) {
      // datatype
      dt = adt; // callback

      cf = typed.find(callback, [dt, dt]);
    } // populate cdata, iterate through dimensions


    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : []; // c matrix

    return a.createDenseMatrix({
      data: cdata,
      size: csize,
      datatype: dt
    });
  }; // recursive function

  function _iterate(f, level, s, n, av, bv) {
    // initialize array for this level
    var cv = []; // check we reach the last level

    if (level === s.length - 1) {
      // loop arrays in last level
      for (var i = 0; i < n; i++) {
        // invoke callback and store value
        cv[i] = f(av[i], bv[i]);
      }
    } else {
      // iterate current level
      for (var j = 0; j < n; j++) {
        // iterate next level
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
      }
    }

    return cv;
  }
});

var name$m = 'matrixAlgorithmSuite';
var dependencies$n = ['typed', 'matrix'];
var createMatrixAlgorithmSuite = /* #__PURE__ */factory(name$m, dependencies$n, _ref => {
  var {
    typed,
    matrix
  } = _ref;
  var matAlgo13xDD = createMatAlgo13xDD({
    typed
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed
  });
  /**
   * Return a signatures object with the usual boilerplate of
   * matrix algorithms, based on a plain options object with the
   * following properties:
   *   elop: function -- the elementwise operation to use, defaults to self
   *   SS: function -- the algorithm to apply for two sparse matrices
   *   DS: function -- the algorithm to apply for a dense and a sparse matrix
   *   SD: function -- algo for a sparse and a dense; defaults to SD flipped
   *   Ss: function -- the algorithm to apply for a sparse matrix and scalar
   *   sS: function -- algo for scalar and sparse; defaults to Ss flipped
   *   scalar: string -- typed-function type for scalars, defaults to 'any'
   *
   * If Ss is not specified, no matrix-scalar signatures are generated.
   *
   * @param {object} options
   * @return {Object<string, function>} signatures
   */

  return function matrixAlgorithmSuite(options) {
    var elop = options.elop;
    var SD = options.SD || options.DS;
    var matrixSignatures;

    if (elop) {
      // First the dense ones
      matrixSignatures = {
        'DenseMatrix, DenseMatrix': (x, y) => matAlgo13xDD(x, y, elop),
        'Array, Array': (x, y) => matAlgo13xDD(matrix(x), matrix(y), elop).valueOf(),
        'Array, DenseMatrix': (x, y) => matAlgo13xDD(matrix(x), y, elop),
        'DenseMatrix, Array': (x, y) => matAlgo13xDD(x, matrix(y), elop)
      }; // Now incorporate sparse matrices

      if (options.SS) {
        matrixSignatures['SparseMatrix, SparseMatrix'] = (x, y) => options.SS(x, y, elop, false);
      }

      if (options.DS) {
        matrixSignatures['DenseMatrix, SparseMatrix'] = (x, y) => options.DS(x, y, elop, false);

        matrixSignatures['Array, SparseMatrix'] = (x, y) => options.DS(matrix(x), y, elop, false);
      }

      if (SD) {
        matrixSignatures['SparseMatrix, DenseMatrix'] = (x, y) => SD(y, x, elop, true);

        matrixSignatures['SparseMatrix, Array'] = (x, y) => SD(matrix(y), x, elop, true);
      }
    } else {
      // No elop, use this
      // First the dense ones
      matrixSignatures = {
        'DenseMatrix, DenseMatrix': typed.referToSelf(self => (x, y) => {
          return matAlgo13xDD(x, y, self);
        }),
        'Array, Array': typed.referToSelf(self => (x, y) => {
          return matAlgo13xDD(matrix(x), matrix(y), self).valueOf();
        }),
        'Array, DenseMatrix': typed.referToSelf(self => (x, y) => {
          return matAlgo13xDD(matrix(x), y, self);
        }),
        'DenseMatrix, Array': typed.referToSelf(self => (x, y) => {
          return matAlgo13xDD(x, matrix(y), self);
        })
      }; // Now incorporate sparse matrices

      if (options.SS) {
        matrixSignatures['SparseMatrix, SparseMatrix'] = typed.referToSelf(self => (x, y) => {
          return options.SS(x, y, self, false);
        });
      }

      if (options.DS) {
        matrixSignatures['DenseMatrix, SparseMatrix'] = typed.referToSelf(self => (x, y) => {
          return options.DS(x, y, self, false);
        });
        matrixSignatures['Array, SparseMatrix'] = typed.referToSelf(self => (x, y) => {
          return options.DS(matrix(x), y, self, false);
        });
      }

      if (SD) {
        matrixSignatures['SparseMatrix, DenseMatrix'] = typed.referToSelf(self => (x, y) => {
          return SD(y, x, self, true);
        });
        matrixSignatures['SparseMatrix, Array'] = typed.referToSelf(self => (x, y) => {
          return SD(matrix(y), x, self, true);
        });
      }
    } // Now add the scalars


    var scalar = options.scalar || 'any';
    var Ds = options.Ds || options.Ss;

    if (Ds) {
      if (elop) {
        matrixSignatures['DenseMatrix,' + scalar] = (x, y) => matAlgo14xDs(x, y, elop, false);

        matrixSignatures[scalar + ', DenseMatrix'] = (x, y) => matAlgo14xDs(y, x, elop, true);

        matrixSignatures['Array,' + scalar] = (x, y) => matAlgo14xDs(matrix(x), y, elop, false).valueOf();

        matrixSignatures[scalar + ', Array'] = (x, y) => matAlgo14xDs(matrix(y), x, elop, true).valueOf();
      } else {
        matrixSignatures['DenseMatrix,' + scalar] = typed.referToSelf(self => (x, y) => {
          return matAlgo14xDs(x, y, self, false);
        });
        matrixSignatures[scalar + ', DenseMatrix'] = typed.referToSelf(self => (x, y) => {
          return matAlgo14xDs(y, x, self, true);
        });
        matrixSignatures['Array,' + scalar] = typed.referToSelf(self => (x, y) => {
          return matAlgo14xDs(matrix(x), y, self, false).valueOf();
        });
        matrixSignatures[scalar + ', Array'] = typed.referToSelf(self => (x, y) => {
          return matAlgo14xDs(matrix(y), x, self, true).valueOf();
        });
      }
    }

    var sS = options.sS !== undefined ? options.sS : options.Ss;

    if (elop) {
      if (options.Ss) {
        matrixSignatures['SparseMatrix,' + scalar] = (x, y) => options.Ss(x, y, elop, false);
      }

      if (sS) {
        matrixSignatures[scalar + ', SparseMatrix'] = (x, y) => sS(y, x, elop, true);
      }
    } else {
      if (options.Ss) {
        matrixSignatures['SparseMatrix,' + scalar] = typed.referToSelf(self => (x, y) => {
          return options.Ss(x, y, self, false);
        });
      }

      if (sS) {
        matrixSignatures[scalar + ', SparseMatrix'] = typed.referToSelf(self => (x, y) => {
          return sS(y, x, self, true);
        });
      }
    } // Also pull in the scalar signatures if the operator is a typed function


    if (elop && elop.signatures) {
      extend(matrixSignatures, elop.signatures);
    }

    return matrixSignatures;
  };
});

var name$n = 'matAlgo03xDSf';
var dependencies$o = ['typed'];
var createMatAlgo03xDSf = /* #__PURE__ */factory(name$n, dependencies$o, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Iterates over SparseMatrix items and invokes the callback function f(Dij, Sij).
   * Callback function invoked M*N times.
   *
   *
   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
   * C(i,j) = ┤
   *          └  f(Dij, 0)    ; otherwise
   *
   *
   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (C)
   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
   */
  return function matAlgo03xDSf(denseMatrix, sparseMatrix, callback, inverse) {
    // dense matrix arrays
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype; // sparse matrix arrays

    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype; // validate dimensions

    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    } // check rows & columns


    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    } // sparse matrix cannot be a Pattern matrix


    if (!bvalues) {
      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // zero value

    var zero = 0; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string' && adt === bdt) {
      // datatype
      dt = adt; // convert 0 to the same datatype

      zero = typed.convert(0, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result (DenseMatrix)


    var cdata = []; // initialize dense matrix

    for (var z = 0; z < rows; z++) {
      // initialize row
      cdata[z] = [];
    } // workspace


    var x = []; // marks indicating we have a value in x for a given column

    var w = []; // loop columns in b

    for (var j = 0; j < columns; j++) {
      // column mark
      var mark = j + 1; // values in column j

      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        // row
        var i = bindex[k]; // update workspace

        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
        w[i] = mark;
      } // process workspace


      for (var y = 0; y < rows; y++) {
        // check we have a calculated value for current row
        if (w[y] === mark) {
          // use calculated value
          cdata[y][j] = x[y];
        } else {
          // calculate value
          cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
        }
      }
    } // return dense matrix


    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$o = 'matAlgo05xSfSf';
var dependencies$p = ['typed', 'equalScalar'];
var createMatAlgo05xSfSf = /* #__PURE__ */factory(name$o, dependencies$p, _ref => {
  var {
    typed,
    equalScalar
  } = _ref;

  /**
   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
   * Callback function invoked MAX(NNZA, NNZB) times
   *
   *
   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 || B(i,j) !== 0
   * C(i,j) = ┤
   *          └  0            ; otherwise
   *
   *
   * @param {Matrix}   a                 The SparseMatrix instance (A)
   * @param {Matrix}   b                 The SparseMatrix instance (B)
   * @param {Function} callback          The f(Aij,Bij) operation to invoke
   *
   * @return {Matrix}                    SparseMatrix (C)
   *
   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
   */
  return function matAlgo05xSfSf(a, b, callback) {
    // sparse matrix arrays
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype; // sparse matrix arrays

    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype; // validate dimensions

    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    } // check rows & columns


    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    } // rows & columns


    var rows = asize[0];
    var columns = asize[1]; // datatype

    var dt; // equal signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // callback signature to use

    var cf = callback; // process data types

    if (typeof adt === 'string' && adt === bdt) {
      // datatype
      dt = adt; // find signature that matches (dt, dt)

      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt); // callback

      cf = typed.find(callback, [dt, dt]);
    } // result arrays


    var cvalues = avalues && bvalues ? [] : undefined;
    var cindex = [];
    var cptr = []; // workspaces

    var xa = cvalues ? [] : undefined;
    var xb = cvalues ? [] : undefined; // marks indicating we have a value in x for a given column

    var wa = [];
    var wb = []; // vars

    var i, j, k, k1; // loop columns

    for (j = 0; j < columns; j++) {
      // update cptr
      cptr[j] = cindex.length; // columns mark

      var mark = j + 1; // loop values A(:,j)

      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
        // row
        i = aindex[k]; // push index

        cindex.push(i); // update workspace

        wa[i] = mark; // check we need to process values

        if (xa) {
          xa[i] = avalues[k];
        }
      } // loop values B(:,j)


      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
        // row
        i = bindex[k]; // check row existed in A

        if (wa[i] !== mark) {
          // push index
          cindex.push(i);
        } // update workspace


        wb[i] = mark; // check we need to process values

        if (xb) {
          xb[i] = bvalues[k];
        }
      } // check we need to process values (non pattern matrix)


      if (cvalues) {
        // initialize first index in j
        k = cptr[j]; // loop index in j

        while (k < cindex.length) {
          // row
          i = cindex[k]; // marks

          var wai = wa[i];
          var wbi = wb[i]; // check Aij or Bij are nonzero

          if (wai === mark || wbi === mark) {
            // matrix values @ i,j
            var va = wai === mark ? xa[i] : zero;
            var vb = wbi === mark ? xb[i] : zero; // Cij

            var vc = cf(va, vb); // check for zero

            if (!eq(vc, zero)) {
              // push value
              cvalues.push(vc); // increment pointer

              k++;
            } else {
              // remove value @ i, do not increment pointer
              cindex.splice(k, 1);
            }
          }
        }
      }
    } // update cptr


    cptr[columns] = cindex.length; // return sparse matrix

    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});

var name$p = 'multiplyScalar';
var dependencies$q = ['typed'];
var createMultiplyScalar = /* #__PURE__ */factory(name$p, dependencies$q, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Multiply two scalar values, `x * y`.
   * This function is meant for internal use: it is used by the public function
   * `multiply`
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to multiply
   * @param  {number | BigNumber | Fraction | Complex} y          Second value to multiply
   * @return {number | BigNumber | Fraction | Complex | Unit}     Multiplication of `x` and `y`
   * @private
   */
  return typed('multiplyScalar', {
    'number, number': multiplyNumber,
    'Complex, Complex': function ComplexComplex(x, y) {
      return x.mul(y);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.times(y);
    },
    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.mul(y);
    },
    'number | Fraction | BigNumber | Complex, Unit': (x, y) => y.multiply(x),
    'Unit, number | Fraction | BigNumber | Complex | Unit': (x, y) => x.multiply(y)
  });
});

var name$q = 'multiply';
var dependencies$r = ['typed', 'matrix', 'addScalar', 'multiplyScalar', 'equalScalar', 'dot'];
var createMultiply = /* #__PURE__ */factory(name$q, dependencies$r, _ref => {
  var {
    typed,
    matrix,
    addScalar,
    multiplyScalar,
    equalScalar,
    dot
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed,
    equalScalar
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed
  });

  function _validateMatrixDimensions(size1, size2) {
    // check left operand dimensions
    switch (size1.length) {
      case 1:
        // check size2
        switch (size2.length) {
          case 1:
            // Vector x Vector
            if (size1[0] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Vectors must have the same length');
            }

            break;

          case 2:
            // Vector x Matrix
            if (size1[0] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Vector length (' + size1[0] + ') must match Matrix rows (' + size2[0] + ')');
            }

            break;

          default:
            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
        }

        break;

      case 2:
        // check size2
        switch (size2.length) {
          case 1:
            // Matrix x Vector
            if (size1[1] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Matrix columns (' + size1[1] + ') must match Vector length (' + size2[0] + ')');
            }

            break;

          case 2:
            // Matrix x Matrix
            if (size1[1] !== size2[0]) {
              // throw error
              throw new RangeError('Dimension mismatch in multiplication. Matrix A columns (' + size1[1] + ') must match Matrix B rows (' + size2[0] + ')');
            }

            break;

          default:
            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
        }

        break;

      default:
        throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix A has ' + size1.length + ' dimensions)');
    }
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (N)
   * @param {Matrix} b            Dense Vector   (N)
   *
   * @return {number}             Scalar value
   */


  function _multiplyVectorVector(a, b, n) {
    // check empty vector
    if (n === 0) {
      throw new Error('Cannot multiply two empty vectors');
    }

    return dot(a, b);
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (M)
   * @param {Matrix} b            Matrix         (MxN)
   *
   * @return {Matrix}             Dense Vector   (N)
   */


  function _multiplyVectorMatrix(a, b) {
    // process storage
    if (b.storage() !== 'dense') {
      throw new Error('Support for SparseMatrix not implemented');
    }

    return _multiplyVectorDenseMatrix(a, b);
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            Dense Vector   (M)
   * @param {Matrix} b            Dense Matrix   (MxN)
   *
   * @return {Matrix}             Dense Vector   (N)
   */


  function _multiplyVectorDenseMatrix(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // b dense

    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype; // rows & columns

    var alength = asize[0];
    var bcolumns = bsize[1]; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    } // result


    var c = []; // loop matrix columns

    for (var j = 0; j < bcolumns; j++) {
      // sum (do not initialize it with zero)
      var sum = mf(adata[0], bdata[0][j]); // loop vector

      for (var i = 1; i < alength; i++) {
        // multiply & accumulate
        sum = af(sum, mf(adata[i], bdata[i][j]));
      }

      c[j] = sum;
    } // return matrix


    return a.createDenseMatrix({
      data: c,
      size: [bcolumns],
      datatype: dt
    });
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            Matrix         (MxN)
   * @param {Matrix} b            Dense Vector   (N)
   *
   * @return {Matrix}             Dense Vector   (M)
   */


  var _multiplyMatrixVector = typed('_multiplyMatrixVector', {
    'DenseMatrix, any': _multiplyDenseMatrixVector,
    'SparseMatrix, any': _multiplySparseMatrixVector
  });
  /**
   * C = A * B
   *
   * @param {Matrix} a            Matrix         (MxN)
   * @param {Matrix} b            Matrix         (NxC)
   *
   * @return {Matrix}             Matrix         (MxC)
   */


  var _multiplyMatrixMatrix = typed('_multiplyMatrixMatrix', {
    'DenseMatrix, DenseMatrix': _multiplyDenseMatrixDenseMatrix,
    'DenseMatrix, SparseMatrix': _multiplyDenseMatrixSparseMatrix,
    'SparseMatrix, DenseMatrix': _multiplySparseMatrixDenseMatrix,
    'SparseMatrix, SparseMatrix': _multiplySparseMatrixSparseMatrix
  });
  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix  (MxN)
   * @param {Matrix} b            Dense Vector (N)
   *
   * @return {Matrix}             Dense Vector (M)
   */


  function _multiplyDenseMatrixVector(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // b dense

    var bdata = b._data;
    var bdt = b._datatype; // rows & columns

    var arows = asize[0];
    var acolumns = asize[1]; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    } // result


    var c = []; // loop matrix a rows

    for (var i = 0; i < arows; i++) {
      // current row
      var row = adata[i]; // sum (do not initialize it with zero)

      var sum = mf(row[0], bdata[0]); // loop matrix a columns

      for (var j = 1; j < acolumns; j++) {
        // multiply & accumulate
        sum = af(sum, mf(row[j], bdata[j]));
      }

      c[i] = sum;
    } // return matrix


    return a.createDenseMatrix({
      data: c,
      size: [arows],
      datatype: dt
    });
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix    (MxN)
   * @param {Matrix} b            DenseMatrix    (NxC)
   *
   * @return {Matrix}             DenseMatrix    (MxC)
   */


  function _multiplyDenseMatrixDenseMatrix(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // b dense

    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype; // rows & columns

    var arows = asize[0];
    var acolumns = asize[1];
    var bcolumns = bsize[1]; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    } // result


    var c = []; // loop matrix a rows

    for (var i = 0; i < arows; i++) {
      // current row
      var row = adata[i]; // initialize row array

      c[i] = []; // loop matrix b columns

      for (var j = 0; j < bcolumns; j++) {
        // sum (avoid initializing sum to zero)
        var sum = mf(row[0], bdata[0][j]); // loop matrix a columns

        for (var x = 1; x < acolumns; x++) {
          // multiply & accumulate
          sum = af(sum, mf(row[x], bdata[x][j]));
        }

        c[i][j] = sum;
      }
    } // return matrix


    return a.createDenseMatrix({
      data: c,
      size: [arows, bcolumns],
      datatype: dt
    });
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            DenseMatrix    (MxN)
   * @param {Matrix} b            SparseMatrix   (NxC)
   *
   * @return {Matrix}             SparseMatrix   (MxC)
   */


  function _multiplyDenseMatrixSparseMatrix(a, b) {
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype; // b sparse

    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype; // validate b matrix

    if (!bvalues) {
      throw new Error('Cannot multiply Dense Matrix times Pattern only Matrix');
    } // rows & columns


    var arows = asize[0];
    var bcolumns = bsize[1]; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // equalScalar signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt);
    } // result


    var cvalues = [];
    var cindex = [];
    var cptr = []; // c matrix

    var c = b.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: dt
    }); // loop b columns

    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length; // indeces in column jb

      var kb0 = bptr[jb];
      var kb1 = bptr[jb + 1]; // do not process column jb if no data exists

      if (kb1 > kb0) {
        // last row mark processed
        var last = 0; // loop a rows

        for (var i = 0; i < arows; i++) {
          // column mark
          var mark = i + 1; // C[i, jb]

          var cij = void 0; // values in b column j

          for (var kb = kb0; kb < kb1; kb++) {
            // row
            var ib = bindex[kb]; // check value has been initialized

            if (last !== mark) {
              // first value in column jb
              cij = mf(adata[i][ib], bvalues[kb]); // update mark

              last = mark;
            } else {
              // accumulate value
              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
            }
          } // check column has been processed and value != 0


          if (last === mark && !eq(cij, zero)) {
            // push row & value
            cindex.push(i);
            cvalues.push(cij);
          }
        }
      }
    } // update ptr


    cptr[bcolumns] = cindex.length; // return sparse matrix

    return c;
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix    (MxN)
   * @param {Matrix} b            Dense Vector (N)
   *
   * @return {Matrix}             SparseMatrix    (M, 1)
   */


  function _multiplySparseMatrixVector(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype; // validate a matrix

    if (!avalues) {
      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
    } // b dense


    var bdata = b._data;
    var bdt = b._datatype; // rows & columns

    var arows = a._size[0];
    var brows = b._size[0]; // result

    var cvalues = [];
    var cindex = [];
    var cptr = []; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // equalScalar signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt);
    } // workspace


    var x = []; // vector with marks indicating a value x[i] exists in a given column

    var w = []; // update ptr

    cptr[0] = 0; // rows in b

    for (var ib = 0; ib < brows; ib++) {
      // b[ib]
      var vbi = bdata[ib]; // check b[ib] != 0, avoid loops

      if (!eq(vbi, zero)) {
        // A values & index in ib column
        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
          // a row
          var ia = aindex[ka]; // check value exists in current j

          if (!w[ia]) {
            // ia is new entry in j
            w[ia] = true; // add i to pattern of C

            cindex.push(ia); // x(ia) = A

            x[ia] = mf(vbi, avalues[ka]);
          } else {
            // i exists in C already
            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
          }
        }
      }
    } // copy values from x to column jb of c


    for (var p1 = cindex.length, p = 0; p < p1; p++) {
      // row
      var ic = cindex[p]; // copy value

      cvalues[p] = x[ic];
    } // update ptr


    cptr[1] = cindex.length; // return sparse matrix

    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, 1],
      datatype: dt
    });
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix      (MxN)
   * @param {Matrix} b            DenseMatrix       (NxC)
   *
   * @return {Matrix}             SparseMatrix      (MxC)
   */


  function _multiplySparseMatrixDenseMatrix(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype; // validate a matrix

    if (!avalues) {
      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
    } // b dense


    var bdata = b._data;
    var bdt = b._datatype; // rows & columns

    var arows = a._size[0];
    var brows = b._size[0];
    var bcolumns = b._size[1]; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // equalScalar signature to use

    var eq = equalScalar; // zero value

    var zero = 0; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

      zero = typed.convert(0, dt);
    } // result


    var cvalues = [];
    var cindex = [];
    var cptr = []; // c matrix

    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: dt
    }); // workspace

    var x = []; // vector with marks indicating a value x[i] exists in a given column

    var w = []; // loop b columns

    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length; // mark in workspace for current column

      var mark = jb + 1; // rows in jb

      for (var ib = 0; ib < brows; ib++) {
        // b[ib, jb]
        var vbij = bdata[ib][jb]; // check b[ib, jb] != 0, avoid loops

        if (!eq(vbij, zero)) {
          // A values & index in ib column
          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // a row
            var ia = aindex[ka]; // check value exists in current j

            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark; // add i to pattern of C

              cindex.push(ia); // x(ia) = A

              x[ia] = mf(vbij, avalues[ka]);
            } else {
              // i exists in C already
              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
            }
          }
        }
      } // copy values from x to column jb of c


      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
        // row
        var ic = cindex[p]; // copy value

        cvalues[p] = x[ic];
      }
    } // update ptr


    cptr[bcolumns] = cindex.length; // return sparse matrix

    return c;
  }
  /**
   * C = A * B
   *
   * @param {Matrix} a            SparseMatrix      (MxN)
   * @param {Matrix} b            SparseMatrix      (NxC)
   *
   * @return {Matrix}             SparseMatrix      (MxC)
   */


  function _multiplySparseMatrixSparseMatrix(a, b) {
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype; // b sparse

    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bdt = b._datatype; // rows & columns

    var arows = a._size[0];
    var bcolumns = b._size[1]; // flag indicating both matrices (a & b) contain data

    var values = avalues && bvalues; // datatype

    var dt; // addScalar signature to use

    var af = addScalar; // multiplyScalar signature to use

    var mf = multiplyScalar; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      // datatype
      dt = adt; // find signatures that matches (dt, dt)

      af = typed.find(addScalar, [dt, dt]);
      mf = typed.find(multiplyScalar, [dt, dt]);
    } // result


    var cvalues = values ? [] : undefined;
    var cindex = [];
    var cptr = []; // c matrix

    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: dt
    }); // workspace

    var x = values ? [] : undefined; // vector with marks indicating a value x[i] exists in a given column

    var w = []; // variables

    var ka, ka0, ka1, kb, kb0, kb1, ia, ib; // loop b columns

    for (var jb = 0; jb < bcolumns; jb++) {
      // update ptr
      cptr[jb] = cindex.length; // mark in workspace for current column

      var mark = jb + 1; // B values & index in j

      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
        // b row
        ib = bindex[kb]; // check we need to process values

        if (values) {
          // loop values in a[:,ib]
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // row
            ia = aindex[ka]; // check value exists in current j

            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark; // add i to pattern of C

              cindex.push(ia); // x(ia) = A

              x[ia] = mf(bvalues[kb], avalues[ka]);
            } else {
              // i exists in C already
              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
            }
          }
        } else {
          // loop values in a[:,ib]
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            // row
            ia = aindex[ka]; // check value exists in current j

            if (w[ia] !== mark) {
              // ia is new entry in j
              w[ia] = mark; // add i to pattern of C

              cindex.push(ia);
            }
          }
        }
      } // check we need to process matrix values (pattern matrix)


      if (values) {
        // copy values from x to column jb of c
        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
          // row
          var ic = cindex[p]; // copy value

          cvalues[p] = x[ic];
        }
      }
    } // update ptr


    cptr[bcolumns] = cindex.length; // return sparse matrix

    return c;
  }
  /**
   * Multiply two or more values, `x * y`.
   * For matrices, the matrix product is calculated.
   *
   * Syntax:
   *
   *    math.multiply(x, y)
   *    math.multiply(x, y, z, ...)
   *
   * Examples:
   *
   *    math.multiply(4, 5.2)        // returns number 20.8
   *    math.multiply(2, 3, 4)       // returns number 24
   *
   *    const a = math.complex(2, 3)
   *    const b = math.complex(4, 1)
   *    math.multiply(a, b)          // returns Complex 5 + 14i
   *
   *    const c = [[1, 2], [4, 3]]
   *    const d = [[1, 2, 3], [3, -4, 7]]
   *    math.multiply(c, d)          // returns Array [[7, -6, 17], [13, -4, 33]]
   *
   *    const e = math.unit('2.1 km')
   *    math.multiply(3, e)          // returns Unit 6.3 km
   *
   * See also:
   *
   *    divide, prod, cross, dot
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to multiply
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to multiply
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Multiplication of `x` and `y`
   */


  return typed(name$q, multiplyScalar, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    'Array, Array': typed.referTo('Matrix, Matrix', selfMM => (x, y) => {
      // check dimensions
      _validateMatrixDimensions(arraySize(x), arraySize(y)); // use dense matrix implementation


      var m = selfMM(matrix(x), matrix(y)); // return array or scalar

      return isMatrix(m) ? m.valueOf() : m;
    }),
    'Matrix, Matrix': function MatrixMatrix(x, y) {
      // dimensions
      var xsize = x.size();
      var ysize = y.size(); // check dimensions

      _validateMatrixDimensions(xsize, ysize); // process dimensions


      if (xsize.length === 1) {
        // process y dimensions
        if (ysize.length === 1) {
          // Vector * Vector
          return _multiplyVectorVector(x, y, xsize[0]);
        } // Vector * Matrix


        return _multiplyVectorMatrix(x, y);
      } // process y dimensions


      if (ysize.length === 1) {
        // Matrix * Vector
        return _multiplyMatrixVector(x, y);
      } // Matrix * Matrix


      return _multiplyMatrixMatrix(x, y);
    },
    'Matrix, Array': typed.referTo('Matrix,Matrix', selfMM => (x, y) => selfMM(x, matrix(y))),
    'Array, Matrix': typed.referToSelf(self => (x, y) => {
      // use Matrix * Matrix implementation
      return self(matrix(x, y.storage()), y);
    }),
    'SparseMatrix, any': function SparseMatrixAny(x, y) {
      return matAlgo11xS0s(x, y, multiplyScalar, false);
    },
    'DenseMatrix, any': function DenseMatrixAny(x, y) {
      return matAlgo14xDs(x, y, multiplyScalar, false);
    },
    'any, SparseMatrix': function anySparseMatrix(x, y) {
      return matAlgo11xS0s(y, x, multiplyScalar, true);
    },
    'any, DenseMatrix': function anyDenseMatrix(x, y) {
      return matAlgo14xDs(y, x, multiplyScalar, true);
    },
    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return matAlgo14xDs(matrix(x), y, multiplyScalar, false).valueOf();
    },
    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return matAlgo14xDs(matrix(y), x, multiplyScalar, true).valueOf();
    },
    'any, any': multiplyScalar,
    'any, any, ...any': typed.referToSelf(self => (x, y, rest) => {
      var result = self(x, y);

      for (var i = 0; i < rest.length; i++) {
        result = self(result, rest[i]);
      }

      return result;
    })
  });
});

var name$r = 'subtract';
var dependencies$s = ['typed', 'matrix', 'equalScalar', 'addScalar', 'unaryMinus', 'DenseMatrix'];
var createSubtract = /* #__PURE__ */factory(name$r, dependencies$s, _ref => {
  var {
    typed,
    matrix,
    equalScalar,
    addScalar,
    unaryMinus,
    DenseMatrix
  } = _ref;
  // TODO: split function subtract in two: subtract and subtractScalar
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed,
    equalScalar
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed,
    DenseMatrix
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed,
    DenseMatrix
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed,
    matrix
  });
  /**
   * Subtract two values, `x - y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.subtract(x, y)
   *
   * Examples:
   *
   *    math.subtract(5.3, 2)        // returns number 3.3
   *
   *    const a = math.complex(2, 3)
   *    const b = math.complex(4, 1)
   *    math.subtract(a, b)          // returns Complex -2 + 2i
   *
   *    math.subtract([5, 7, 4], 4)  // returns Array [1, 3, 0]
   *
   *    const c = math.unit('2.1 km')
   *    const d = math.unit('500m')
   *    math.subtract(c, d)          // returns Unit 1.6 km
   *
   * See also:
   *
   *    add
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x
   *            Initial value
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y
   *            Value to subtract from `x`
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Subtraction of `x` and `y`
   */

  return typed(name$r, {
    'number, number': (x, y) => x - y,
    'Complex, Complex': (x, y) => x.sub(y),
    'BigNumber, BigNumber': (x, y) => x.minus(y),
    'Fraction, Fraction': (x, y) => x.sub(y),
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (x.value === null) {
        throw new Error('Parameter x contains a unit with undefined value');
      }

      if (y.value === null) {
        throw new Error('Parameter y contains a unit with undefined value');
      }

      if (!x.equalBase(y)) {
        throw new Error('Units do not match');
      }

      var res = x.clone();
      res.value = typed.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  }, matrixAlgorithmSuite({
    SS: matAlgo05xSfSf,
    DS: matAlgo01xDSid,
    SD: matAlgo03xDSf,
    Ss: matAlgo12xSfs,
    sS: matAlgo10xSids
  }));
});

var name$s = 'conj';
var dependencies$t = ['typed'];
var createConj = /* #__PURE__ */factory(name$s, dependencies$t, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Compute the complex conjugate of a complex value.
   * If `x = a+bi`, the complex conjugate of `x` is `a - bi`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.conj(x)
   *
   * Examples:
   *
   *    math.conj(math.complex('2 + 3i'))  // returns Complex 2 - 3i
   *    math.conj(math.complex('2 - 3i'))  // returns Complex 2 + 3i
   *    math.conj(math.complex('-5.2i'))  // returns Complex 5.2i
   *
   * See also:
   *
   *    re, im, arg, abs
   *
   * @param {number | BigNumber | Complex | Array | Matrix} x
   *            A complex number or array with complex numbers
   * @return {number | BigNumber | Complex | Array | Matrix}
   *            The complex conjugate of x
   */
  return typed(name$s, {
    'number | BigNumber | Fraction': x => x,
    Complex: x => x.conjugate(),
    'Array | Matrix': typed.referToSelf(self => x => deepMap(x, self))
  });
});

var name$t = 'identity';
var dependencies$u = ['typed', 'config', 'matrix', 'BigNumber', 'DenseMatrix', 'SparseMatrix'];
var createIdentity = /* #__PURE__ */factory(name$t, dependencies$u, _ref => {
  var {
    typed,
    config,
    matrix,
    BigNumber,
    DenseMatrix,
    SparseMatrix
  } = _ref;

  /**
   * Create a 2-dimensional identity matrix with size m x n or n x n.
   * The matrix has ones on the diagonal and zeros elsewhere.
   *
   * Syntax:
   *
   *    math.identity(n)
   *    math.identity(n, format)
   *    math.identity(m, n)
   *    math.identity(m, n, format)
   *    math.identity([m, n])
   *    math.identity([m, n], format)
   *
   * Examples:
   *
   *    math.identity(3)                    // returns [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
   *    math.identity(3, 2)                 // returns [[1, 0], [0, 1], [0, 0]]
   *
   *    const A = [[1, 2, 3], [4, 5, 6]]
   *    math.identity(math.size(A))         // returns [[1, 0, 0], [0, 1, 0]]
   *
   * See also:
   *
   *    diag, ones, zeros, size, range
   *
   * @param {...number | Matrix | Array} size   The size for the matrix
   * @param {string} [format]                   The Matrix storage format
   *
   * @return {Matrix | Array | number} A matrix with ones on the diagonal.
   */
  return typed(name$t, {
    '': function _() {
      return config.matrix === 'Matrix' ? matrix([]) : [];
    },
    string: function string(format) {
      return matrix(format);
    },
    'number | BigNumber': function numberBigNumber(rows) {
      return _identity(rows, rows, config.matrix === 'Matrix' ? 'dense' : undefined);
    },
    'number | BigNumber, string': function numberBigNumberString(rows, format) {
      return _identity(rows, rows, format);
    },
    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(rows, cols) {
      return _identity(rows, cols, config.matrix === 'Matrix' ? 'dense' : undefined);
    },
    'number | BigNumber, number | BigNumber, string': function numberBigNumberNumberBigNumberString(rows, cols, format) {
      return _identity(rows, cols, format);
    },
    Array: function Array(size) {
      return _identityVector(size);
    },
    'Array, string': function ArrayString(size, format) {
      return _identityVector(size, format);
    },
    Matrix: function Matrix(size) {
      return _identityVector(size.valueOf(), size.storage());
    },
    'Matrix, string': function MatrixString(size, format) {
      return _identityVector(size.valueOf(), format);
    }
  });

  function _identityVector(size, format) {
    switch (size.length) {
      case 0:
        return format ? matrix(format) : [];

      case 1:
        return _identity(size[0], size[0], format);

      case 2:
        return _identity(size[0], size[1], format);

      default:
        throw new Error('Vector containing two values expected');
    }
  }
  /**
   * Create an identity matrix
   * @param {number | BigNumber} rows
   * @param {number | BigNumber} cols
   * @param {string} [format]
   * @returns {Matrix}
   * @private
   */


  function _identity(rows, cols, format) {
    // BigNumber constructor with the right precision
    var Big = isBigNumber(rows) || isBigNumber(cols) ? BigNumber : null;
    if (isBigNumber(rows)) rows = rows.toNumber();
    if (isBigNumber(cols)) cols = cols.toNumber();

    if (!isInteger(rows) || rows < 1) {
      throw new Error('Parameters in function identity must be positive integers');
    }

    if (!isInteger(cols) || cols < 1) {
      throw new Error('Parameters in function identity must be positive integers');
    }

    var one = Big ? new BigNumber(1) : 1;
    var defaultValue = Big ? new Big(0) : 0;
    var size = [rows, cols]; // check we need to return a matrix

    if (format) {
      // create diagonal matrix (use optimized implementation for storage format)
      if (format === 'sparse') {
        return SparseMatrix.diagonal(size, one, 0, defaultValue);
      }

      if (format === 'dense') {
        return DenseMatrix.diagonal(size, one, 0, defaultValue);
      }

      throw new TypeError("Unknown matrix type \"".concat(format, "\""));
    } // create and resize array


    var res = resize([], size, defaultValue); // fill in ones on the diagonal

    var minimum = rows < cols ? rows : cols; // fill diagonal

    for (var d = 0; d < minimum; d++) {
      res[d][d] = one;
    }

    return res;
  }
});

function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}
function noFraction() {
  throw new Error('No "fraction" implementation available');
}
function noMatrix() {
  throw new Error('No "matrix" implementation available');
}

var name$u = 'size';
var dependencies$v = ['typed', 'config', '?matrix'];
var createSize = /* #__PURE__ */factory(name$u, dependencies$v, _ref => {
  var {
    typed,
    config,
    matrix
  } = _ref;

  /**
   * Calculate the size of a matrix or scalar.
   *
   * Syntax:
   *
   *     math.size(x)
   *
   * Examples:
   *
   *     math.size(2.3)                  // returns []
   *     math.size('hello world')        // returns [11]
   *
   *     const A = [[1, 2, 3], [4, 5, 6]]
   *     math.size(A)                    // returns [2, 3]
   *     math.size(math.range(1,6))      // returns [5]
   *
   * See also:
   *
   *     count, resize, squeeze, subset
   *
   * @param {boolean | number | Complex | Unit | string | Array | Matrix} x  A matrix
   * @return {Array | Matrix} A vector with size of `x`.
   */
  return typed(name$u, {
    Matrix: function Matrix(x) {
      return x.create(x.size());
    },
    Array: arraySize,
    string: function string(x) {
      return config.matrix === 'Array' ? [x.length] : matrix([x.length]);
    },
    'number | Complex | BigNumber | Unit | boolean | null': function numberComplexBigNumberUnitBooleanNull(x) {
      // scalar
      return config.matrix === 'Array' ? [] : matrix ? matrix([]) : noMatrix();
    }
  });
});

/**
 * Improve error messages for statistics functions. Errors are typically
 * thrown in an internally used function like larger, causing the error
 * not to mention the function (like max) which is actually used by the user.
 *
 * @param {Error} err
 * @param {String} fnName
 * @param {*} [value]
 * @return {Error}
 */

function improveErrorMessage(err, fnName, value) {
  // TODO: add information with the index (also needs transform in expression parser)
  var details;

  if (String(err).indexOf('Unexpected type') !== -1) {
    details = arguments.length > 2 ? ' (type: ' + typeOf(value) + ', value: ' + JSON.stringify(value) + ')' : ' (type: ' + err.data.actual + ')';
    return new TypeError('Cannot calculate ' + fnName + ', unexpected type of argument' + details);
  }

  if (String(err).indexOf('complex numbers') !== -1) {
    details = arguments.length > 2 ? ' (type: ' + typeOf(value) + ', value: ' + JSON.stringify(value) + ')' : '';
    return new TypeError('Cannot calculate ' + fnName + ', no ordering relation is defined for complex numbers' + details);
  }

  return err;
}

var name$v = 'numeric';
var dependencies$w = ['number', '?bignumber', '?fraction'];
var createNumeric = /* #__PURE__ */factory(name$v, dependencies$w, _ref => {
  var {
    number: _number,
    bignumber,
    fraction
  } = _ref;
  var validInputTypes = {
    string: true,
    number: true,
    BigNumber: true,
    Fraction: true
  }; // Load the conversion functions for each output type

  var validOutputTypes = {
    number: x => _number(x),
    BigNumber: bignumber ? x => bignumber(x) : noBignumber,
    Fraction: fraction ? x => fraction(x) : noFraction
  };
  /**
   * Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.
   *
   * Syntax:
   *
   *    math.numeric(x)
   *
   * Examples:
   *
   *    math.numeric('4')                           // returns 4
   *    math.numeric('4', 'number')                 // returns 4
   *    math.numeric('4', 'BigNumber')              // returns BigNumber 4
   *    math.numeric('4', 'Fraction')               // returns Fraction 4
   *    math.numeric(4, 'Fraction')                 // returns Fraction 4
   *    math.numeric(math.fraction(2, 5), 'number') // returns 0.4
   *
   * See also:
   *
   *    number, fraction, bignumber, string, format
   *
   * @param {string | number | BigNumber | Fraction } value
   *              A numeric value or a string containing a numeric value
   * @param {string} outputType
   *              Desired numeric output type.
   *              Available values: 'number', 'BigNumber', or 'Fraction'
   * @return {number | BigNumber | Fraction}
   *              Returns an instance of the numeric in the requested type
   */

  return function numeric(value) {
    var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'number';
    var check = arguments.length > 2 ? arguments[2] : undefined;

    if (check !== undefined) {
      throw new SyntaxError('numeric() takes one or two arguments');
    }

    var inputType = typeOf(value);

    if (!(inputType in validInputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(', '));
    }

    if (!(outputType in validOutputTypes)) {
      throw new TypeError('Cannot convert ' + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(', '));
    }

    if (outputType === inputType) {
      return value;
    } else {
      return validOutputTypes[outputType](value);
    }
  };
});

var name$w = 'divideScalar';
var dependencies$x = ['typed', 'numeric'];
var createDivideScalar = /* #__PURE__ */factory(name$w, dependencies$x, _ref => {
  var {
    typed,
    numeric
  } = _ref;

  /**
   * Divide two scalar values, `x / y`.
   * This function is meant for internal use: it is used by the public functions
   * `divide` and `inv`.
   *
   * This function does not support collections (Array or Matrix).
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit} x   Numerator
   * @param  {number | BigNumber | Fraction | Complex} y          Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit}     Quotient, `x / y`
   * @private
   */
  return typed(name$w, {
    'number, number': function numberNumber(x, y) {
      return x / y;
    },
    'Complex, Complex': function ComplexComplex(x, y) {
      return x.div(y);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.div(y);
    },
    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.div(y);
    },
    'Unit, number | Complex | Fraction | BigNumber | Unit': (x, y) => x.divide(y),
    'number | Fraction | Complex | BigNumber, Unit': (x, y) => y.divideInto(x)
  });
});

var name$x = 'add';
var dependencies$y = ['typed', 'matrix', 'addScalar', 'equalScalar', 'DenseMatrix', 'SparseMatrix'];
var createAdd = /* #__PURE__ */factory(name$x, dependencies$y, _ref => {
  var {
    typed,
    matrix,
    addScalar,
    equalScalar,
    DenseMatrix,
    SparseMatrix
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed
  });
  var matAlgo04xSidSid = createMatAlgo04xSidSid({
    typed,
    equalScalar
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed,
    DenseMatrix
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed,
    matrix
  });
  /**
   * Add two or more values, `x + y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.add(x, y)
   *    math.add(x, y, z, ...)
   *
   * Examples:
   *
   *    math.add(2, 3)               // returns number 5
   *    math.add(2, 3, 4)            // returns number 9
   *
   *    const a = math.complex(2, 3)
   *    const b = math.complex(-4, 1)
   *    math.add(a, b)               // returns Complex -2 + 4i
   *
   *    math.add([1, 2, 3], 4)       // returns Array [5, 6, 7]
   *
   *    const c = math.unit('5 cm')
   *    const d = math.unit('2.1 mm')
   *    math.add(c, d)               // returns Unit 52.1 mm
   *
   *    math.add("2.3", "4")         // returns number 6.3
   *
   * See also:
   *
   *    subtract, sum
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to add
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to add
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Sum of `x` and `y`
   */

  return typed(name$x, {
    'any, any': addScalar,
    'any, any, ...any': typed.referToSelf(self => (x, y, rest) => {
      var result = self(x, y);

      for (var i = 0; i < rest.length; i++) {
        result = self(result, rest[i]);
      }

      return result;
    })
  }, matrixAlgorithmSuite({
    elop: addScalar,
    DS: matAlgo01xDSid,
    SS: matAlgo04xSidSid,
    Ss: matAlgo10xSids
  }));
});

var name$y = 'dot';
var dependencies$z = ['typed', 'addScalar', 'multiplyScalar', 'conj', 'size'];
var createDot = /* #__PURE__ */factory(name$y, dependencies$z, _ref => {
  var {
    typed,
    addScalar,
    multiplyScalar,
    conj,
    size
  } = _ref;

  /**
   * Calculate the dot product of two vectors. The dot product of
   * `A = [a1, a2, ..., an]` and `B = [b1, b2, ..., bn]` is defined as:
   *
   *    dot(A, B) = conj(a1) * b1 + conj(a2) * b2 + ... + conj(an) * bn
   *
   * Syntax:
   *
   *    math.dot(x, y)
   *
   * Examples:
   *
   *    math.dot([2, 4, 1], [2, 2, 3])       // returns number 15
   *    math.multiply([2, 4, 1], [2, 2, 3])  // returns number 15
   *
   * See also:
   *
   *    multiply, cross
   *
   * @param  {Array | Matrix} x     First vector
   * @param  {Array | Matrix} y     Second vector
   * @return {number}               Returns the dot product of `x` and `y`
   */
  return typed(name$y, {
    'Array | DenseMatrix, Array | DenseMatrix': _denseDot,
    'SparseMatrix, SparseMatrix': _sparseDot
  });

  function _validateDim(x, y) {
    var xSize = _size(x);

    var ySize = _size(y);

    var xLen, yLen;

    if (xSize.length === 1) {
      xLen = xSize[0];
    } else if (xSize.length === 2 && xSize[1] === 1) {
      xLen = xSize[0];
    } else {
      throw new RangeError('Expected a column vector, instead got a matrix of size (' + xSize.join(', ') + ')');
    }

    if (ySize.length === 1) {
      yLen = ySize[0];
    } else if (ySize.length === 2 && ySize[1] === 1) {
      yLen = ySize[0];
    } else {
      throw new RangeError('Expected a column vector, instead got a matrix of size (' + ySize.join(', ') + ')');
    }

    if (xLen !== yLen) throw new RangeError('Vectors must have equal length (' + xLen + ' != ' + yLen + ')');
    if (xLen === 0) throw new RangeError('Cannot calculate the dot product of empty vectors');
    return xLen;
  }

  function _denseDot(a, b) {
    var N = _validateDim(a, b);

    var adata = isMatrix(a) ? a._data : a;
    var adt = isMatrix(a) ? a._datatype : undefined;
    var bdata = isMatrix(b) ? b._data : b;
    var bdt = isMatrix(b) ? b._datatype : undefined; // are these 2-dimensional column vectors? (as opposed to 1-dimensional vectors)

    var aIsColumn = _size(a).length === 2;
    var bIsColumn = _size(b).length === 2;
    var add = addScalar;
    var mul = multiplyScalar; // process data types

    if (adt && bdt && adt === bdt && typeof adt === 'string') {
      var dt = adt; // find signatures that matches (dt, dt)

      add = typed.find(addScalar, [dt, dt]);
      mul = typed.find(multiplyScalar, [dt, dt]);
    } // both vectors 1-dimensional


    if (!aIsColumn && !bIsColumn) {
      var c = mul(conj(adata[0]), bdata[0]);

      for (var i = 1; i < N; i++) {
        c = add(c, mul(conj(adata[i]), bdata[i]));
      }

      return c;
    } // a is 1-dim, b is column


    if (!aIsColumn && bIsColumn) {
      var _c = mul(conj(adata[0]), bdata[0][0]);

      for (var _i = 1; _i < N; _i++) {
        _c = add(_c, mul(conj(adata[_i]), bdata[_i][0]));
      }

      return _c;
    } // a is column, b is 1-dim


    if (aIsColumn && !bIsColumn) {
      var _c2 = mul(conj(adata[0][0]), bdata[0]);

      for (var _i2 = 1; _i2 < N; _i2++) {
        _c2 = add(_c2, mul(conj(adata[_i2][0]), bdata[_i2]));
      }

      return _c2;
    } // both vectors are column


    if (aIsColumn && bIsColumn) {
      var _c3 = mul(conj(adata[0][0]), bdata[0][0]);

      for (var _i3 = 1; _i3 < N; _i3++) {
        _c3 = add(_c3, mul(conj(adata[_i3][0]), bdata[_i3][0]));
      }

      return _c3;
    }
  }

  function _sparseDot(x, y) {
    _validateDim(x, y);

    var xindex = x._index;
    var xvalues = x._values;
    var yindex = y._index;
    var yvalues = y._values; // TODO optimize add & mul using datatype

    var c = 0;
    var add = addScalar;
    var mul = multiplyScalar;
    var i = 0;
    var j = 0;

    while (i < xindex.length && j < yindex.length) {
      var I = xindex[i];
      var J = yindex[j];

      if (I < J) {
        i++;
        continue;
      }

      if (I > J) {
        j++;
        continue;
      }

      if (I === J) {
        c = add(c, mul(xvalues[i], yvalues[j]));
        i++;
        j++;
      }
    }

    return c;
  } // TODO remove this once #1771 is fixed


  function _size(x) {
    return isMatrix(x) ? x.size() : size(x);
  }
});

var name$z = 'det';
var dependencies$A = ['typed', 'matrix', 'subtract', 'multiply', 'divideScalar', 'isZero', 'unaryMinus'];
var createDet = /* #__PURE__ */factory(name$z, dependencies$A, _ref => {
  var {
    typed,
    matrix,
    subtract,
    multiply,
    divideScalar,
    isZero,
    unaryMinus
  } = _ref;

  /**
   * Calculate the determinant of a matrix.
   *
   * Syntax:
   *
   *    math.det(x)
   *
   * Examples:
   *
   *    math.det([[1, 2], [3, 4]]) // returns -2
   *
   *    const A = [
   *      [-2, 2, 3],
   *      [-1, 1, 3],
   *      [2, 0, -1]
   *    ]
   *    math.det(A) // returns 6
   *
   * See also:
   *
   *    inv
   *
   * @param {Array | Matrix} x  A matrix
   * @return {number} The determinant of `x`
   */
  return typed(name$z, {
    any: function any(x) {
      return clone(x);
    },
    'Array | Matrix': function det(x) {
      var size;

      if (isMatrix(x)) {
        size = x.size();
      } else if (Array.isArray(x)) {
        x = matrix(x);
        size = x.size();
      } else {
        // a scalar
        size = [];
      }

      switch (size.length) {
        case 0:
          // scalar
          return clone(x);

        case 1:
          // vector
          if (size[0] === 1) {
            return clone(x.valueOf()[0]);
          } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
          }

        case 2:
          {
            // two dimensional array
            var rows = size[0];
            var cols = size[1];

            if (rows === cols) {
              return _det(x.clone().valueOf(), rows);
            } else {
              throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
            }
          }

        default:
          // multi dimensional array
          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format$2(size) + ')');
      }
    }
  });
  /**
   * Calculate the determinant of a matrix
   * @param {Array[]} matrix  A square, two dimensional matrix
   * @param {number} rows     Number of rows of the matrix (zero-based)
   * @param {number} cols     Number of columns of the matrix (zero-based)
   * @returns {number} det
   * @private
   */

  function _det(matrix, rows, cols) {
    if (rows === 1) {
      // this is a 1 x 1 matrix
      return clone(matrix[0][0]);
    } else if (rows === 2) {
      // this is a 2 x 2 matrix
      // the determinant of [a11,a12;a21,a22] is det = a11*a22-a21*a12
      return subtract(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[1][0], matrix[0][1]));
    } else {
      // Bareiss algorithm
      // this algorithm have same complexity as LUP decomposition (O(n^3))
      // but it preserve precision of floating point more relative to the LUP decomposition
      var negated = false;
      var rowIndices = new Array(rows).fill(0).map((_, i) => i); // matrix index of row i

      for (var k = 0; k < rows; k++) {
        var k_ = rowIndices[k];

        if (isZero(matrix[k_][k])) {
          var _k = void 0;

          for (_k = k + 1; _k < rows; _k++) {
            if (!isZero(matrix[rowIndices[_k]][k])) {
              k_ = rowIndices[_k];
              rowIndices[_k] = rowIndices[k];
              rowIndices[k] = k_;
              negated = !negated;
              break;
            }
          }

          if (_k === rows) return matrix[k_][k]; // some zero of the type
        }

        var piv = matrix[k_][k];
        var piv_ = k === 0 ? 1 : matrix[rowIndices[k - 1]][k - 1];

        for (var i = k + 1; i < rows; i++) {
          var i_ = rowIndices[i];

          for (var j = k + 1; j < rows; j++) {
            matrix[i_][j] = divideScalar(subtract(multiply(matrix[i_][j], piv), multiply(matrix[i_][k], matrix[k_][j])), piv_);
          }
        }
      }

      var det = matrix[rowIndices[rows - 1]][rows - 1];
      return negated ? unaryMinus(det) : det;
    }
  }
});

var name$A = 'inv';
var dependencies$B = ['typed', 'matrix', 'divideScalar', 'addScalar', 'multiply', 'unaryMinus', 'det', 'identity', 'abs'];
var createInv = /* #__PURE__ */factory(name$A, dependencies$B, _ref => {
  var {
    typed,
    matrix,
    divideScalar,
    addScalar,
    multiply,
    unaryMinus,
    det,
    identity,
    abs
  } = _ref;

  /**
   * Calculate the inverse of a square matrix.
   *
   * Syntax:
   *
   *     math.inv(x)
   *
   * Examples:
   *
   *     math.inv([[1, 2], [3, 4]])  // returns [[-2, 1], [1.5, -0.5]]
   *     math.inv(4)                 // returns 0.25
   *     1 / 4                       // returns 0.25
   *
   * See also:
   *
   *     det, transpose
   *
   * @param {number | Complex | Array | Matrix} x     Matrix to be inversed
   * @return {number | Complex | Array | Matrix} The inverse of `x`.
   */
  return typed(name$A, {
    'Array | Matrix': function ArrayMatrix(x) {
      var size = isMatrix(x) ? x.size() : arraySize(x);

      switch (size.length) {
        case 1:
          // vector
          if (size[0] === 1) {
            if (isMatrix(x)) {
              return matrix([divideScalar(1, x.valueOf()[0])]);
            } else {
              return [divideScalar(1, x[0])];
            }
          } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
          }

        case 2:
          // two dimensional array
          {
            var rows = size[0];
            var cols = size[1];

            if (rows === cols) {
              if (isMatrix(x)) {
                return matrix(_inv(x.valueOf(), rows, cols), x.storage());
              } else {
                // return an Array
                return _inv(x, rows, cols);
              }
            } else {
              throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
            }
          }

        default:
          // multi dimensional array
          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format$2(size) + ')');
      }
    },
    any: function any(x) {
      // scalar
      return divideScalar(1, x); // FIXME: create a BigNumber one when configured for bignumbers
    }
  });
  /**
   * Calculate the inverse of a square matrix
   * @param {Array[]} mat     A square matrix
   * @param {number} rows     Number of rows
   * @param {number} cols     Number of columns, must equal rows
   * @return {Array[]} inv    Inverse matrix
   * @private
   */

  function _inv(mat, rows, cols) {
    var r, s, f, value, temp;

    if (rows === 1) {
      // this is a 1 x 1 matrix
      value = mat[0][0];

      if (value === 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }

      return [[divideScalar(1, value)]];
    } else if (rows === 2) {
      // this is a 2 x 2 matrix
      var d = det(mat);

      if (d === 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }

      return [[divideScalar(mat[1][1], d), divideScalar(unaryMinus(mat[0][1]), d)], [divideScalar(unaryMinus(mat[1][0]), d), divideScalar(mat[0][0], d)]];
    } else {
      // this is a matrix of 3 x 3 or larger
      // calculate inverse using gauss-jordan elimination
      //      https://en.wikipedia.org/wiki/Gaussian_elimination
      //      http://mathworld.wolfram.com/MatrixInverse.html
      //      http://math.uww.edu/~mcfarlat/inverse.htm
      // make a copy of the matrix (only the arrays, not of the elements)
      var A = mat.concat();

      for (r = 0; r < rows; r++) {
        A[r] = A[r].concat();
      } // create an identity matrix which in the end will contain the
      // matrix inverse


      var B = identity(rows).valueOf(); // loop over all columns, and perform row reductions

      for (var c = 0; c < cols; c++) {
        // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
        var ABig = abs(A[c][c]);
        var rBig = c;
        r = c + 1;

        while (r < rows) {
          if (abs(A[r][c]) > ABig) {
            ABig = abs(A[r][c]);
            rBig = r;
          }

          r++;
        }

        if (ABig === 0) {
          throw Error('Cannot calculate inverse, determinant is zero');
        }

        r = rBig;

        if (r !== c) {
          temp = A[c];
          A[c] = A[r];
          A[r] = temp;
          temp = B[c];
          B[c] = B[r];
          B[r] = temp;
        } // eliminate non-zero values on the other rows at column c


        var Ac = A[c];
        var Bc = B[c];

        for (r = 0; r < rows; r++) {
          var Ar = A[r];
          var Br = B[r];

          if (r !== c) {
            // eliminate value at column c and row r
            if (Ar[c] !== 0) {
              f = divideScalar(unaryMinus(Ar[c]), Ac[c]); // add (f * row c) to row r to eliminate the value
              // at column c

              for (s = c; s < cols; s++) {
                Ar[s] = addScalar(Ar[s], multiply(f, Ac[s]));
              }

              for (s = 0; s < cols; s++) {
                Br[s] = addScalar(Br[s], multiply(f, Bc[s]));
              }
            }
          } else {
            // normalize value at Acc to 1,
            // divide each value on row r with the value at Acc
            f = Ac[c];

            for (s = c; s < cols; s++) {
              Ar[s] = divideScalar(Ar[s], f);
            }

            for (s = 0; s < cols; s++) {
              Br[s] = divideScalar(Br[s], f);
            }
          }
        }
      }

      return B;
    }
  }
});

var name$B = 'divide';
var dependencies$C = ['typed', 'matrix', 'multiply', 'equalScalar', 'divideScalar', 'inv'];
var createDivide = /* #__PURE__ */factory(name$B, dependencies$C, _ref => {
  var {
    typed,
    matrix,
    multiply,
    equalScalar,
    divideScalar,
    inv
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed,
    equalScalar
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed
  });
  /**
   * Divide two values, `x / y`.
   * To divide matrices, `x` is multiplied with the inverse of `y`: `x * inv(y)`.
   *
   * Syntax:
   *
   *    math.divide(x, y)
   *
   * Examples:
   *
   *    math.divide(2, 3)            // returns number 0.6666666666666666
   *
   *    const a = math.complex(5, 14)
   *    const b = math.complex(4, 1)
   *    math.divide(a, b)            // returns Complex 2 + 3i
   *
   *    const c = [[7, -6], [13, -4]]
   *    const d = [[1, 2], [4, 3]]
   *    math.divide(c, d)            // returns Array [[-9, 4], [-11, 6]]
   *
   *    const e = math.unit('18 km')
   *    math.divide(e, 4.5)          // returns Unit 4 km
   *
   * See also:
   *
   *    multiply
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x   Numerator
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} y          Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                      Quotient, `x / y`
   */

  return typed('divide', extend({
    // we extend the signatures of divideScalar with signatures dealing with matrices
    'Array | Matrix, Array | Matrix': function ArrayMatrixArrayMatrix(x, y) {
      // TODO: implement matrix right division using pseudo inverse
      // https://www.mathworks.nl/help/matlab/ref/mrdivide.html
      // https://www.gnu.org/software/octave/doc/interpreter/Arithmetic-Ops.html
      // https://stackoverflow.com/questions/12263932/how-does-gnu-octave-matrix-division-work-getting-unexpected-behaviour
      return multiply(x, inv(y));
    },
    'DenseMatrix, any': function DenseMatrixAny(x, y) {
      return matAlgo14xDs(x, y, divideScalar, false);
    },
    'SparseMatrix, any': function SparseMatrixAny(x, y) {
      return matAlgo11xS0s(x, y, divideScalar, false);
    },
    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return matAlgo14xDs(matrix(x), y, divideScalar, false).valueOf();
    },
    'any, Array | Matrix': function anyArrayMatrix(x, y) {
      return multiply(x, inv(y));
    }
  }, divideScalar.signatures));
});

var name$C = 'mean';
var dependencies$D = ['typed', 'add', 'divide'];
var createMean = /* #__PURE__ */factory(name$C, dependencies$D, _ref => {
  var {
    typed,
    add,
    divide
  } = _ref;

  /**
   * Compute the mean value of matrix or a list with values.
   * In case of a multi dimensional array, the mean of the flattened array
   * will be calculated. When `dim` is provided, the maximum over the selected
   * dimension will be calculated. Parameter `dim` is zero-based.
   *
   * Syntax:
   *
   *     math.mean(a, b, c, ...)
   *     math.mean(A)
   *     math.mean(A, dim)
   *
   * Examples:
   *
   *     math.mean(2, 1, 4, 3)                     // returns 2.5
   *     math.mean([1, 2.7, 3.2, 4])               // returns 2.725
   *
   *     math.mean([[2, 5], [6, 3], [1, 7]], 0)    // returns [3, 5]
   *     math.mean([[2, 5], [6, 3], [1, 7]], 1)    // returns [3.5, 4.5, 4]
   *
   * See also:
   *
   *     median, min, max, sum, prod, std, variance
   *
   * @param {... *} args  A single matrix or or multiple scalar values
   * @return {*} The mean of all values
   */
  return typed(name$C, {
    // mean([a, b, c, d, ...])
    'Array | Matrix': _mean,
    // mean([a, b, c, d, ...], dim)
    'Array | Matrix, number | BigNumber': _nmeanDim,
    // mean(a, b, c, d, ...)
    '...': function _(args) {
      if (containsCollections(args)) {
        throw new TypeError('Scalar values expected in function mean');
      }

      return _mean(args);
    }
  });
  /**
   * Calculate the mean value in an n-dimensional array, returning a
   * n-1 dimensional array
   * @param {Array} array
   * @param {number} dim
   * @return {number} mean
   * @private
   */

  function _nmeanDim(array, dim) {
    try {
      var sum = reduce(array, dim, add);
      var s = Array.isArray(array) ? arraySize(array) : array.size();
      return divide(sum, s[dim]);
    } catch (err) {
      throw improveErrorMessage(err, 'mean');
    }
  }
  /**
   * Recursively calculate the mean value in an n-dimensional array
   * @param {Array} array
   * @return {number} mean
   * @private
   */


  function _mean(array) {
    var sum;
    var num = 0;
    deepForEach(array, function (value) {
      try {
        sum = sum === undefined ? value : add(sum, value);
        num++;
      } catch (err) {
        throw improveErrorMessage(err, 'mean', value);
      }
    });

    if (num === 0) {
      throw new Error('Cannot calculate the mean of an empty array');
    }

    return divide(sum, num);
  }
});

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var BigNumber = /* #__PURE__ */createBigNumberClass({
  config
});
var Complex$1 = /* #__PURE__ */createComplexClass({});
var Fraction$1 = /* #__PURE__ */createFractionClass({});
var Matrix = /* #__PURE__ */createMatrixClass({});
var DenseMatrix = /* #__PURE__ */createDenseMatrixClass({
  Matrix
});
var typed = /* #__PURE__ */createTyped({
  BigNumber,
  Complex: Complex$1,
  DenseMatrix,
  Fraction: Fraction$1
});
var abs$1 = /* #__PURE__ */createAbs({
  typed
});
var addScalar = /* #__PURE__ */createAddScalar({
  typed
});
var bignumber = /* #__PURE__ */createBignumber({
  BigNumber,
  typed
});
var conj = /* #__PURE__ */createConj({
  typed
});
var equalScalar = /* #__PURE__ */createEqualScalar({
  config,
  typed
});
var isZero = /* #__PURE__ */createIsZero({
  typed
});
var multiplyScalar = /* #__PURE__ */createMultiplyScalar({
  typed
});
var number = /* #__PURE__ */createNumber({
  typed
});
var SparseMatrix = /* #__PURE__ */createSparseMatrixClass({
  Matrix,
  equalScalar,
  typed
});
var unaryMinus = /* #__PURE__ */createUnaryMinus({
  typed
});
var fraction$1 = /* #__PURE__ */createFraction({
  Fraction: Fraction$1,
  typed
});
var matrix = /* #__PURE__ */createMatrix({
  DenseMatrix,
  Matrix,
  SparseMatrix,
  typed
});
var numeric = /* #__PURE__ */createNumeric({
  bignumber,
  fraction: fraction$1,
  number
});
var size = /* #__PURE__ */createSize({
  matrix,
  config,
  typed
});
var subtract = /* #__PURE__ */createSubtract({
  DenseMatrix,
  addScalar,
  equalScalar,
  matrix,
  typed,
  unaryMinus
});
var divideScalar = /* #__PURE__ */createDivideScalar({
  numeric,
  typed
});
var add$1 = /* #__PURE__ */createAdd({
  DenseMatrix,
  SparseMatrix,
  addScalar,
  equalScalar,
  matrix,
  typed
});
var dot = /* #__PURE__ */createDot({
  addScalar,
  conj,
  multiplyScalar,
  size,
  typed
});
var identity = /* #__PURE__ */createIdentity({
  BigNumber,
  DenseMatrix,
  SparseMatrix,
  config,
  matrix,
  typed
});
var multiply = /* #__PURE__ */createMultiply({
  addScalar,
  dot,
  equalScalar,
  matrix,
  multiplyScalar,
  typed
});
var det = /* #__PURE__ */createDet({
  divideScalar,
  isZero,
  matrix,
  multiply,
  subtract,
  typed,
  unaryMinus
});
var inv = /* #__PURE__ */createInv({
  abs: abs$1,
  addScalar,
  det,
  divideScalar,
  identity,
  matrix,
  multiply,
  typed,
  unaryMinus
});
var divide$1 = /* #__PURE__ */createDivide({
  divideScalar,
  equalScalar,
  inv,
  matrix,
  multiply,
  typed
});
var mean = /* #__PURE__ */createMean({
  add: add$1,
  divide: divide$1,
  typed
});

export { mean };
