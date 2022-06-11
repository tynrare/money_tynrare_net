(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var timestamp = 0;
var app = null;
var frontdoor = null;

var Thingy = /*#__PURE__*/function () {
  function Thingy(source) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    _classCallCheck(this, Thingy);

    this.source = source;
    this.root = root;
    this.tree = {};
  }

  _createClass(Thingy, [{
    key: "init",
    value: function init() {
      for (var i = 0; i < this.source.children.length; i++) {
        var element = this.source.children[i];
        var key = element.id || element.tagName.toLowerCase();
        this.tree[key] = new Thingy(element, this.root).init();
      }

      return this;
    }
  }, {
    key: "typeof",
    value: function _typeof(key) {
      return this.source.classList.contains(key);
    }
  }, {
    key: "exchange",
    value: function exchange(consume, produce) {
      var consumeargs = consume.split(" ");
      var produceargs = produce.split(" ");
      var consumethingy = this.get(consumeargs[0]);
      var producethingy = this.get(produceargs[0]);
      var factor = Number(produceargs[1] || 1) / Number(consumeargs[1] || 1);

      if (consumethingy.value() < Number(consumeargs[1])) {
        return;
      }

      if (!consumethingy["typeof"]("infinite")) {
        var _value = consumethingy.value();

        consumethingy.set(_value - Number(consumeargs[1] || 1));
      }

      var value = producethingy.value();
      producethingy.set(value + consumethingy.value() * factor);
    }
  }, {
    key: "event",
    value: function event(key) {
      if (this.value("on") === key) {
        this.root.exchange(this.value("consume"), this.value("produce"));
      }

      for (var k in this.tree) {
        this.tree[k].event(key);
      }
    }
  }, {
    key: "get",
    value: function get(path) {
      var _this$tree$path;

      if (path.indexOf("/") >= 0) {
        var traverse = path.split("/");
        var thingy = this;

        while (traverse.length && thingy) {
          thingy = thingy.get(traverse.shift());
        }

        return thingy;
      }

      return (_this$tree$path = this.tree[path]) !== null && _this$tree$path !== void 0 ? _this$tree$path : null;
    }
  }, {
    key: "value",
    value: function value() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (key) {
        var _this$get;

        return (_this$get = this.get(key)) === null || _this$get === void 0 ? void 0 : _this$get.value();
      }

      var number = Number(this.source.innerHTML);
      return isNaN(number) ? this.source.innerHTML : number;
    }
  }, {
    key: "set",
    value: function set(value) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (key) {
        this.get(key).set(value);
        return;
      }

      var v = value;

      if (v.toFixed && v % 1) {
        v = v.toFixed(2);
      }

      this.source.innerHTML = v;
    }
  }]);

  return Thingy;
}();

function loop(now) {
  var dt = now - timestamp;
  var factor = Math.max(0, dt / 1000);
  timestamp = now;
  app.set(factor, "time");
  app.event("loop");
  var money = app.get("inventory").get("money");
  frontdoor.set(Math.round(money.value()), "money");
  localStorage.setItem("save.money", money.value());
  localStorage.setItem("save.timestamp", timestamp);
  requestAnimationFrame(function () {
    return loop(Date.now());
  });
}

function main() {
  var _localStorage$getItem, _localStorage$getItem2;

  app = new Thingy(document.getElementById("app")).init();
  frontdoor = new Thingy(document.getElementById("frontdoor")).init();
  timestamp = (_localStorage$getItem = localStorage.getItem("save.timestamp")) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : Date.now();
  app.get("inventory").get("money").set((_localStorage$getItem2 = localStorage.getItem("save.money")) !== null && _localStorage$getItem2 !== void 0 ? _localStorage$getItem2 : 0);
  requestAnimationFrame(function () {
    return loop(Date.now());
  });
}

if (document.readyState == "loading") {
  // loading yet, wait for the event
  document.addEventListener("DOMContentLoaded", main);
} else {
  // DOM is ready!
  main();
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEsSUFBSSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFWO0FBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBaEI7O0lBRU0sTTtFQUNKLGdCQUFZLE1BQVosRUFBaUM7SUFBQSxJQUFiLElBQWEsdUVBQU4sSUFBTTs7SUFBQTs7SUFDL0IsS0FBSyxNQUFMLEdBQWMsTUFBZDtJQUNBLEtBQUssSUFBTCxHQUFZLElBQVo7SUFDQSxLQUFLLElBQUwsR0FBWSxFQUFaO0VBQ0Q7Ozs7V0FFRCxnQkFBTztNQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixNQUF6QyxFQUFpRCxDQUFDLEVBQWxELEVBQXNEO1FBQ3BELElBQU0sT0FBTyxHQUFHLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsQ0FBckIsQ0FBaEI7UUFDQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBUixJQUFjLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFdBQWhCLEVBQTFCO1FBQ0EsS0FBSyxJQUFMLENBQVUsR0FBVixJQUFpQixJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEtBQUssSUFBekIsRUFBK0IsSUFBL0IsRUFBakI7TUFDRDs7TUFFRCxPQUFPLElBQVA7SUFDRDs7O1dBRUQsaUJBQU8sR0FBUCxFQUFZO01BQ1YsT0FBTyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLEdBQS9CLENBQVA7SUFDRDs7O1dBRUQsa0JBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtNQUN6QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBcEI7TUFDQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FB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UCxFQUdHLEdBSEgsMkJBR08sWUFBWSxDQUFDLE9BQWIsQ0FBcUIsWUFBckIsQ0FIUCwyRUFHNkMsQ0FIN0M7RUFLQSxxQkFBcUIsQ0FBQztJQUFBLE9BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFMLEVBQUQsQ0FBVjtFQUFBLENBQUQsQ0FBckI7QUFDRDs7QUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFULElBQXVCLFNBQTNCLEVBQXNDO0VBQ3BDO0VBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxJQUE5QztBQUNELENBSEQsTUFHTztFQUNMO0VBQ0EsSUFBSTtBQUNMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IHRpbWVzdGFtcCA9IDA7XHJcbmxldCBhcHAgPSBudWxsO1xyXG5sZXQgZnJvbnRkb29yID0gbnVsbDtcclxuXHJcbmNsYXNzIFRoaW5neSB7XHJcbiAgY29uc3RydWN0b3Ioc291cmNlLCByb290ID0gdGhpcykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgdGhpcy50cmVlID0ge307XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5zb3VyY2UuY2hpbGRyZW5baV07XHJcbiAgICAgIGNvbnN0IGtleSA9IGVsZW1lbnQuaWQgfHwgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIHRoaXMudHJlZVtrZXldID0gbmV3IFRoaW5neShlbGVtZW50LCB0aGlzLnJvb3QpLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHR5cGVvZihrZXkpIHtcclxuICAgIHJldHVybiB0aGlzLnNvdXJjZS5jbGFzc0xpc3QuY29udGFpbnMoa2V5KTtcclxuICB9XHJcblxyXG4gIGV4Y2hhbmdlKGNvbnN1bWUsIHByb2R1Y2UpIHtcclxuICAgIGNvbnN0IGNvbnN1bWVhcmdzID0gY29uc3VtZS5zcGxpdChcIiBcIik7XHJcbiAgICBjb25zdCBwcm9kdWNlYXJncyA9IHByb2R1Y2Uuc3BsaXQoXCIgXCIpO1xyXG4gICAgY29uc3QgY29uc3VtZXRoaW5neSA9IHRoaXMuZ2V0KGNvbnN1bWVhcmdzWzBdKTtcclxuICAgIGNvbnN0IHByb2R1Y2V0aGluZ3kgPSB0aGlzLmdldChwcm9kdWNlYXJnc1swXSk7XHJcbiAgICBjb25zdCBmYWN0b3IgPSBOdW1iZXIocHJvZHVjZWFyZ3NbMV0gfHwgMSkgLyBOdW1iZXIoY29uc3VtZWFyZ3NbMV0gfHwgMSk7XHJcblxyXG4gICAgaWYgKGNvbnN1bWV0aGluZ3kudmFsdWUoKSA8IE51bWJlcihjb25zdW1lYXJnc1sxXSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uc3VtZXRoaW5neS50eXBlb2YoXCJpbmZpbml0ZVwiKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnN1bWV0aGluZ3kudmFsdWUoKTtcclxuICAgICAgY29uc3VtZXRoaW5neS5zZXQodmFsdWUgLSBOdW1iZXIoY29uc3VtZWFyZ3NbMV0gfHwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gcHJvZHVjZXRoaW5neS52YWx1ZSgpO1xyXG4gICAgcHJvZHVjZXRoaW5neS5zZXQodmFsdWUgKyBjb25zdW1ldGhpbmd5LnZhbHVlKCkgKiBmYWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZXZlbnQoa2V5KSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZShcIm9uXCIpID09PSBrZXkpIHtcclxuICAgICAgdGhpcy5yb290LmV4Y2hhbmdlKHRoaXMudmFsdWUoXCJjb25zdW1lXCIpLCB0aGlzLnZhbHVlKFwicHJvZHVjZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrIGluIHRoaXMudHJlZSkge1xyXG4gICAgICB0aGlzLnRyZWVba10uZXZlbnQoa2V5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldChwYXRoKSB7XHJcbiAgICBpZiAocGF0aC5pbmRleE9mKFwiL1wiKSA+PSAwKSB7XHJcbiAgICAgIGNvbnN0IHRyYXZlcnNlID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgICAgIGxldCB0aGluZ3kgPSB0aGlzO1xyXG4gICAgICB3aGlsZSAodHJhdmVyc2UubGVuZ3RoICYmIHRoaW5neSkge1xyXG4gICAgICAgIHRoaW5neSA9IHRoaW5neS5nZXQodHJhdmVyc2Uuc2hpZnQoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGluZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudHJlZVtwYXRoXSA/PyBudWxsO1xyXG4gIH1cclxuXHJcbiAgdmFsdWUoa2V5ID0gbnVsbCkge1xyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KT8udmFsdWUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG51bWJlciA9IE51bWJlcih0aGlzLnNvdXJjZS5pbm5lckhUTUwpO1xyXG5cclxuICAgIHJldHVybiBpc05hTihudW1iZXIpID8gdGhpcy5zb3VyY2UuaW5uZXJIVE1MIDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgc2V0KHZhbHVlLCBrZXkgPSBudWxsKSB7XHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgIHRoaXMuZ2V0KGtleSkuc2V0KHZhbHVlKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdiA9IHZhbHVlO1xyXG4gICAgaWYgKHYudG9GaXhlZCAmJiB2ICUgMSkge1xyXG4gICAgICB2ID0gdi50b0ZpeGVkKDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlLmlubmVySFRNTCA9IHY7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb29wKG5vdykge1xyXG4gIGNvbnN0IGR0ID0gbm93IC0gdGltZXN0YW1wO1xyXG4gIGNvbnN0IGZhY3RvciA9IE1hdGgubWF4KDAsIGR0IC8gMTAwMCk7XHJcbiAgdGltZXN0YW1wID0gbm93O1xyXG5cclxuICBhcHAuc2V0KGZhY3RvciwgXCJ0aW1lXCIpO1xyXG4gIGFwcC5ldmVudChcImxvb3BcIik7XHJcblxyXG4gIGNvbnN0IG1vbmV5ID0gYXBwLmdldChcImludmVudG9yeVwiKS5nZXQoXCJtb25leVwiKTtcclxuXHJcbiAgZnJvbnRkb29yLnNldChNYXRoLnJvdW5kKG1vbmV5LnZhbHVlKCkpLCBcIm1vbmV5XCIpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZS5tb25leVwiLCBtb25leS52YWx1ZSgpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmUudGltZXN0YW1wXCIsIHRpbWVzdGFtcCk7XHJcblxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKERhdGUubm93KCkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBhcHAgPSBuZXcgVGhpbmd5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKS5pbml0KCk7XHJcbiAgZnJvbnRkb29yID0gbmV3IFRoaW5neShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250ZG9vclwiKSkuaW5pdCgpO1xyXG5cclxuICB0aW1lc3RhbXAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNhdmUudGltZXN0YW1wXCIpID8/IERhdGUubm93KCk7XHJcbiAgYXBwXHJcbiAgICAuZ2V0KFwiaW52ZW50b3J5XCIpXHJcbiAgICAuZ2V0KFwibW9uZXlcIilcclxuICAgIC5zZXQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzYXZlLm1vbmV5XCIpID8/IDApO1xyXG5cclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gbG9vcChEYXRlLm5vdygpKSk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwibG9hZGluZ1wiKSB7XHJcbiAgLy8gbG9hZGluZyB5ZXQsIHdhaXQgZm9yIHRoZSBldmVudFxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1haW4pO1xyXG59IGVsc2Uge1xyXG4gIC8vIERPTSBpcyByZWFkeSFcclxuICBtYWluKCk7XHJcbn1cclxuIl19
