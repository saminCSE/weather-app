// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var storage = {
  city: "",
  country: "",
  saveItem: function saveItem() {
    localStorage.setItem("wetherApp-city", this.city);
    localStorage.setItem("wetherApp-country", this.country);
  },
  getItem: function getItem() {
    this.city = localStorage.getItem("wetherApp-city");
    this.country = localStorage.getItem("wetherApp-country");
  }
};
var _default = storage;
exports.default = _default;
},{}],"weatherData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

///object property, method
var weatherData = {
  city: "",
  country: "",
  API_KEY: "d777b9cd1436c98f958dac1e189e4f09",
  getWeather: function getWeather() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(_this.city, ",").concat(_this.country, "&units=metric&appid=").concat(_this.API_KEY));

            case 3:
              res = _context.sent;
              _context.next = 6;
              return res.json();

            case 6:
              data = _context.sent;
              return _context.abrupt("return", {
                data: data
              });

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0.message);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }))();
  }
};
var _default = weatherData;
exports.default = _default;
},{}],"ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storage = _interopRequireDefault(require("./storage.js"));

var _weatherData = _interopRequireDefault(require("./weatherData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UI = {
  loadSelectors: function loadSelectors() {
    var cityElm = document.querySelector("#city");
    var cityInfoElm = document.querySelector("#w-city");
    var iconElm = document.querySelector("#w-icon");
    var temperatureElm = document.querySelector("#w-temp");
    var pressureElm = document.querySelector("#w-pressure");
    var humidityElm = document.querySelector("#w-humidity");
    var feelElm = document.querySelector("#w-feel");
    var formElm = document.querySelector("#form");
    var countryElm = document.querySelector("#country");
    var messageElm = document.querySelector("#messageWrapper");
    return {
      cityInfoElm: cityInfoElm,
      cityElm: cityElm,
      countryElm: countryElm,
      iconElm: iconElm,
      temperatureElm: temperatureElm,
      pressureElm: pressureElm,
      feelElm: feelElm,
      humidityElm: humidityElm,
      formElm: formElm,
      messageElm: messageElm
    };
  },
  showMessage: function showMessage(msg) {
    var _this$loadSelectors = this.loadSelectors(),
        messageElm = _this$loadSelectors.messageElm;

    var elm = "<div class='alert alert-danger' id='message'>".concat(msg, "</div>");
    messageElm.insertAdjacentHTML("afterbegin", elm);
    this.hideMessage();
  },
  hideMessage: function hideMessage() {
    var messageElm = document.querySelector("#message");
    setTimeout(function () {
      if (messageElm) {
        messageElm.remove();
      }
    }, 2000);
  },
  validateInput: function validateInput(city, country) {
    if (country === "" || city === "") {
      this.showMessage("Please provide valid country and city");
      return false;
    } else {
      return true;
    }
  },
  getInputValues: function getInputValues() {
    var _this$loadSelectors2 = this.loadSelectors(),
        cityElm = _this$loadSelectors2.cityElm,
        countryElm = _this$loadSelectors2.countryElm;

    var country = countryElm.value;
    var city = cityElm.value;
    var isValid = this.validateInput(city, country);

    if (isValid) {
      //setting city and country to weatherData
      _weatherData.default.city = city;
      _weatherData.default.country = country; //setting city and country to localStorage

      _storage.default.city = city;
      _storage.default.country = country; //saving city and country localStorage

      _storage.default.saveItem();
    }
  },
  getIcon: function getIcon(iconCode) {
    return "https://openweathermap.org/img/w/" + iconCode + ".png";
  },
  printWeather: function printWeather(weatherData) {
    var main = weatherData.main,
        weather = weatherData.weather,
        cityName = weatherData.name;

    var _this$loadSelectors3 = this.loadSelectors(),
        cityInfoElm = _this$loadSelectors3.cityInfoElm,
        temperatureElm = _this$loadSelectors3.temperatureElm,
        pressureElm = _this$loadSelectors3.pressureElm,
        humidityElm = _this$loadSelectors3.humidityElm,
        feelElm = _this$loadSelectors3.feelElm,
        iconElm = _this$loadSelectors3.iconElm; //paint to UI


    cityInfoElm.textContent = cityName;
    temperatureElm.textContent = "Temperature: ".concat(main.temp, "\xB0C");
    pressureElm.textContent = "Pressure: ".concat(main.pressure, "Kpa");
    humidityElm.textContent = "Humidity ".concat(main.humidity);
    feelElm.textContent = weather[0].description;
    iconElm.setAttribute("src", this.getIcon(weather[0].icon));
  },
  resetInputValues: function resetInputValues() {
    var _this$loadSelectors4 = this.loadSelectors(),
        cityElm = _this$loadSelectors4.cityElm,
        countryElm = _this$loadSelectors4.countryElm;

    cityElm.value = "";
    countryElm.value = "";
  },
  handleRemoteData: function handleRemoteData() {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$weatherData$ge, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _weatherData.default.getWeather();

            case 2:
              _yield$weatherData$ge = _context.sent;
              data = _yield$weatherData$ge.data;

              if (data.cod === "404") {
                UI.showMessage(data.message);
              } else {
                UI.printWeather(data);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  init: function init() {
    var _this = this;

    var _this$loadSelectors5 = this.loadSelectors(),
        formElm = _this$loadSelectors5.formElm;

    formElm.addEventListener("submit", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault(); //get the values from input

                _this.getInputValues(); //reset Input values


                _this.resetInputValues();

                _this.handleRemoteData();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    window.addEventListener("DOMContentLoaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var city, country;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _storage.default.getItem(); //city and country from storage


              city = _storage.default.city;
              country = _storage.default.country; //data source update(if there is no data in localStorage setting default city and country)

              _weatherData.default.city = city ? city : "Dhaka";
              _weatherData.default.country = country ? country : "BD";

              _this.handleRemoteData();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  }
};
var _default = UI;
exports.default = _default;
},{"./storage.js":"storage.js","./weatherData.js":"weatherData.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _ui = _interopRequireDefault(require("./ui.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//data -
//R(Read)
//UI-CRUD
//LocalStorage- CRUD
//Application development workflow
//Requirements(get weather data from API and display in UI)
//Design
//code
//import "regenerator-runtime/runtime";
_ui.default.init();
},{"./ui.js":"ui.js"}],"C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "2223" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/User/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/weather-app-v-3.e31bb0bc.js.map