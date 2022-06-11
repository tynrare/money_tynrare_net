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
      var toconsume = Number(consumeargs[1] || 1);
      var toproduce = Number(produceargs[1] || 1);
      var factor = consumethingy.value() / toconsume;

      if (!consumethingy["typeof"]("infinite")) {
        if (consumethingy.value() < toconsume) {
          return;
        }

        consumethingy.add(-toconsume * factor);
      }

      producethingy.add(toproduce * factor);
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
  }, {
    key: "add",
    value: function add(value) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.set(this.value(key) + Number(value), key);
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
  frontdoor.set(Math.round(app.value("inventory/money")), "money");
  frontdoor.set(Math.round(app.value("inventory/money_but_better")), "money_but_better");
  localStorage.setItem("save.money", app.value("inventory/money"));
  localStorage.setItem("save.timestamp", timestamp);
  requestAnimationFrame(function () {
    return loop(Date.now());
  });
}

function load() {
  var _localStorage$getItem;

  timestamp = (_localStorage$getItem = localStorage.getItem("save.timestamp")) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : Date.now();
  var money = Number(localStorage.getItem("save.money"));
  app.get("inventory").get("money").set(isNaN(money) ? 0 : money);
}

function main() {
  app = new Thingy(document.getElementById("app")).init();
  frontdoor = new Thingy(document.getElementById("frontdoor")).init();
  load();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEsSUFBSSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFWO0FBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBaEI7O0lBRU0sTTtFQUNKLGdCQUFZLE1BQVosRUFBaUM7SUFBQSxJQUFiLElBQWEsdUVBQU4sSUFBTTs7SUFBQTs7SUFDL0IsS0FBSyxNQUFMLEdBQWMsTUFBZDtJQUNBLEtBQUssSUFBTCxHQUFZLElBQVo7SUFDQSxLQUFLLElBQUwsR0FBWSxFQUFaO0VBQ0Q7Ozs7V0FFRCxnQkFBTztNQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixNQUF6QyxFQUFpRCxDQUFDLEVBQWxELEVBQXNEO1FBQ3BELElBQU0sT0FBTyxHQUFHLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsQ0FBckIsQ0FBaEI7UUFDQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBUixJQUFjLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFdBQWhCLEVBQTFCO1FBQ0EsS0FBSyxJQUFMLENBQVUsR0FBVixJQUFpQixJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEtBQUssSUFBekIsRUFBK0IsSUFBL0IsRUFBakI7TUFDRDs7TUFFRCxPQUFPLElBQVA7SUFDRDs7O1dBRUQsaUJBQU8sR0FBUCxFQUFZO01BQ1YsT0FBTyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLEdBQS9CLENBQVA7SUFDRDs7O1dBRUQsa0JBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtNQUN6QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBcEI7TUFDQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FB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QUFDLEtBQUQsQ0FBTCxHQUFlLENBQWYsR0FBbUIsS0FIMUI7QUFJRDs7QUFFRCxTQUFTLElBQVQsR0FBZ0I7RUFDZCxHQUFHLEdBQUcsSUFBSSxNQUFKLENBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBWCxFQUEyQyxJQUEzQyxFQUFOO0VBQ0EsU0FBUyxHQUFHLElBQUksTUFBSixDQUFXLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLENBQVgsRUFBaUQsSUFBakQsRUFBWjtFQUVBLElBQUk7RUFFSixxQkFBcUIsQ0FBQztJQUFBLE9BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFMLEVBQUQsQ0FBVjtFQUFBLENBQUQsQ0FBckI7QUFDRDs7QUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFULElBQXVCLFNBQTNCLEVBQXNDO0VBQ3BDO0VBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxJQUE5QztBQUNELENBSEQsTUFHTztFQUNMO0VBQ0EsSUFBSTtBQUNMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibGV0IHRpbWVzdGFtcCA9IDA7XHJcbmxldCBhcHAgPSBudWxsO1xyXG5sZXQgZnJvbnRkb29yID0gbnVsbDtcclxuXHJcbmNsYXNzIFRoaW5neSB7XHJcbiAgY29uc3RydWN0b3Ioc291cmNlLCByb290ID0gdGhpcykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgdGhpcy50cmVlID0ge307XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5zb3VyY2UuY2hpbGRyZW5baV07XHJcbiAgICAgIGNvbnN0IGtleSA9IGVsZW1lbnQuaWQgfHwgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIHRoaXMudHJlZVtrZXldID0gbmV3IFRoaW5neShlbGVtZW50LCB0aGlzLnJvb3QpLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHR5cGVvZihrZXkpIHtcclxuICAgIHJldHVybiB0aGlzLnNvdXJjZS5jbGFzc0xpc3QuY29udGFpbnMoa2V5KTtcclxuICB9XHJcblxyXG4gIGV4Y2hhbmdlKGNvbnN1bWUsIHByb2R1Y2UpIHtcclxuICAgIGNvbnN0IGNvbnN1bWVhcmdzID0gY29uc3VtZS5zcGxpdChcIiBcIik7XHJcbiAgICBjb25zdCBwcm9kdWNlYXJncyA9IHByb2R1Y2Uuc3BsaXQoXCIgXCIpO1xyXG4gICAgY29uc3QgY29uc3VtZXRoaW5neSA9IHRoaXMuZ2V0KGNvbnN1bWVhcmdzWzBdKTtcclxuICAgIGNvbnN0IHByb2R1Y2V0aGluZ3kgPSB0aGlzLmdldChwcm9kdWNlYXJnc1swXSk7XHJcblxyXG4gICAgY29uc3QgdG9jb25zdW1lID0gTnVtYmVyKGNvbnN1bWVhcmdzWzFdIHx8IDEpO1xyXG4gICAgY29uc3QgdG9wcm9kdWNlID0gTnVtYmVyKHByb2R1Y2VhcmdzWzFdIHx8IDEpO1xyXG4gICAgY29uc3QgZmFjdG9yID0gY29uc3VtZXRoaW5neS52YWx1ZSgpIC8gdG9jb25zdW1lO1xyXG5cclxuICAgIGlmICghY29uc3VtZXRoaW5neS50eXBlb2YoXCJpbmZpbml0ZVwiKSkge1xyXG4gICAgICBpZiAoY29uc3VtZXRoaW5neS52YWx1ZSgpIDwgdG9jb25zdW1lKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdW1ldGhpbmd5LmFkZCgtdG9jb25zdW1lICogZmFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9kdWNldGhpbmd5LmFkZCh0b3Byb2R1Y2UgKiBmYWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZXZlbnQoa2V5KSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZShcIm9uXCIpID09PSBrZXkpIHtcclxuICAgICAgdGhpcy5yb290LmV4Y2hhbmdlKHRoaXMudmFsdWUoXCJjb25zdW1lXCIpLCB0aGlzLnZhbHVlKFwicHJvZHVjZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrIGluIHRoaXMudHJlZSkge1xyXG4gICAgICB0aGlzLnRyZWVba10uZXZlbnQoa2V5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldChwYXRoKSB7XHJcbiAgICBpZiAocGF0aC5pbmRleE9mKFwiL1wiKSA+PSAwKSB7XHJcbiAgICAgIGNvbnN0IHRyYXZlcnNlID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgICAgIGxldCB0aGluZ3kgPSB0aGlzO1xyXG4gICAgICB3aGlsZSAodHJhdmVyc2UubGVuZ3RoICYmIHRoaW5neSkge1xyXG4gICAgICAgIHRoaW5neSA9IHRoaW5neS5nZXQodHJhdmVyc2Uuc2hpZnQoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGluZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudHJlZVtwYXRoXSA/PyBudWxsO1xyXG4gIH1cclxuXHJcbiAgdmFsdWUoa2V5ID0gbnVsbCkge1xyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoa2V5KT8udmFsdWUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG51bWJlciA9IE51bWJlcih0aGlzLnNvdXJjZS5pbm5lckhUTUwpO1xyXG5cclxuICAgIHJldHVybiBpc05hTihudW1iZXIpID8gdGhpcy5zb3VyY2UuaW5uZXJIVE1MIDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgc2V0KHZhbHVlLCBrZXkgPSBudWxsKSB7XHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgIHRoaXMuZ2V0KGtleSkuc2V0KHZhbHVlKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdiA9IHZhbHVlO1xyXG4gICAgaWYgKHYudG9GaXhlZCAmJiB2ICUgMSkge1xyXG4gICAgICB2ID0gdi50b0ZpeGVkKDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc291cmNlLmlubmVySFRNTCA9IHY7XHJcbiAgfVxyXG5cclxuICBhZGQodmFsdWUsIGtleSA9IG51bGwpIHtcclxuICAgIHRoaXMuc2V0KHRoaXMudmFsdWUoa2V5KSArIE51bWJlcih2YWx1ZSksIGtleSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb29wKG5vdykge1xyXG4gIGNvbnN0IGR0ID0gbm93IC0gdGltZXN0YW1wO1xyXG4gIGNvbnN0IGZhY3RvciA9IE1hdGgubWF4KDAsIGR0IC8gMTAwMCk7XHJcbiAgdGltZXN0YW1wID0gbm93O1xyXG5cclxuICBhcHAuc2V0KGZhY3RvciwgXCJ0aW1lXCIpO1xyXG4gIGFwcC5ldmVudChcImxvb3BcIik7XHJcblxyXG4gIGZyb250ZG9vci5zZXQoTWF0aC5yb3VuZChhcHAudmFsdWUoXCJpbnZlbnRvcnkvbW9uZXlcIikpLCBcIm1vbmV5XCIpO1xyXG4gIGZyb250ZG9vci5zZXQoXHJcbiAgICBNYXRoLnJvdW5kKGFwcC52YWx1ZShcImludmVudG9yeS9tb25leV9idXRfYmV0dGVyXCIpKSxcclxuICAgIFwibW9uZXlfYnV0X2JldHRlclwiXHJcbiAgKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmUubW9uZXlcIiwgYXBwLnZhbHVlKFwiaW52ZW50b3J5L21vbmV5XCIpKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmUudGltZXN0YW1wXCIsIHRpbWVzdGFtcCk7XHJcblxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKERhdGUubm93KCkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICB0aW1lc3RhbXAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNhdmUudGltZXN0YW1wXCIpID8/IERhdGUubm93KCk7XHJcbiAgY29uc3QgbW9uZXkgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzYXZlLm1vbmV5XCIpKTtcclxuXHJcbiAgYXBwXHJcbiAgICAuZ2V0KFwiaW52ZW50b3J5XCIpXHJcbiAgICAuZ2V0KFwibW9uZXlcIilcclxuICAgIC5zZXQoaXNOYU4obW9uZXkpID8gMCA6IG1vbmV5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBhcHAgPSBuZXcgVGhpbmd5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKS5pbml0KCk7XHJcbiAgZnJvbnRkb29yID0gbmV3IFRoaW5neShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250ZG9vclwiKSkuaW5pdCgpO1xyXG5cclxuICBsb2FkKCk7XHJcblxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBsb29wKERhdGUubm93KCkpKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJsb2FkaW5nXCIpIHtcclxuICAvLyBsb2FkaW5nIHlldCwgd2FpdCBmb3IgdGhlIGV2ZW50XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbWFpbik7XHJcbn0gZWxzZSB7XHJcbiAgLy8gRE9NIGlzIHJlYWR5IVxyXG4gIG1haW4oKTtcclxufVxyXG4iXX0=
