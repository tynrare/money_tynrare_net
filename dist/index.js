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

      if (path.includes("/")) {
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
  inventory = app.get("inventory");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEsSUFBSSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFWO0FBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBaEI7O0lBRU0sTTtFQUNKLGdCQUFZLE1BQVosRUFBaUM7SUFBQSxJQUFiLElBQWEsdUVBQU4sSUFBTTs7SUFBQTs7SUFDL0IsS0FBSyxNQUFMLEdBQWMsTUFBZDtJQUNBLEtBQUssSUFBTCxHQUFZLElBQVo7SUFDQSxLQUFLLElBQUwsR0FBWSxFQUFaO0VBQ0Q7Ozs7V0FFRCxnQkFBTztNQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixNQUF6QyxFQUFpRCxDQUFDLEVBQWxELEVBQXNEO1FBQ3BELElBQU0sT0FBTyxHQUFHLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsQ0FBckIsQ0FBaEI7UUFDQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBUixJQUFjLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFdBQWhCLEVBQTFCO1FBQ0EsS0FBSyxJQUFMLENBQVUsR0FBVixJQUFpQixJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEtBQUssSUFBekIsRUFBK0IsSUFBL0IsRUFBakI7TUFDRDs7TUFFRCxPQUFPLElBQVA7SUFDRDs7O1dBRUQsaUJBQU8sR0FBUCxFQUFZO01BQ1YsT0FBTyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLEdBQS9CLENBQVA7SUFDRDs7O1dBRUQsa0JBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtNQUN6QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBcEI7TUFDQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FB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SFAsMkVBRzZDLENBSDdDO0VBS0EscUJBQXFCLENBQUM7SUFBQSxPQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBTCxFQUFELENBQVY7RUFBQSxDQUFELENBQXJCO0FBQ0Q7O0FBRUQsSUFBSSxRQUFRLENBQUMsVUFBVCxJQUF1QixTQUEzQixFQUFzQztFQUNwQztFQUNBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsSUFBOUM7QUFDRCxDQUhELE1BR087RUFDTDtFQUNBLElBQUk7QUFDTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCB0aW1lc3RhbXAgPSAwO1xyXG5sZXQgYXBwID0gbnVsbDtcclxubGV0IGZyb250ZG9vciA9IG51bGw7XHJcblxyXG5jbGFzcyBUaGluZ3kge1xyXG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgcm9vdCA9IHRoaXMpIHtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuICAgIHRoaXMudHJlZSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuc291cmNlLmNoaWxkcmVuW2ldO1xyXG4gICAgICBjb25zdCBrZXkgPSBlbGVtZW50LmlkIHx8IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0aGlzLnRyZWVba2V5XSA9IG5ldyBUaGluZ3koZWxlbWVudCwgdGhpcy5yb290KS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0eXBlb2Yoa2V5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UuY2xhc3NMaXN0LmNvbnRhaW5zKGtleSk7XHJcbiAgfVxyXG5cclxuICBleGNoYW5nZShjb25zdW1lLCBwcm9kdWNlKSB7XHJcbiAgICBjb25zdCBjb25zdW1lYXJncyA9IGNvbnN1bWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgY29uc3QgcHJvZHVjZWFyZ3MgPSBwcm9kdWNlLnNwbGl0KFwiIFwiKTtcclxuICAgIGNvbnN0IGNvbnN1bWV0aGluZ3kgPSB0aGlzLmdldChjb25zdW1lYXJnc1swXSk7XHJcbiAgICBjb25zdCBwcm9kdWNldGhpbmd5ID0gdGhpcy5nZXQocHJvZHVjZWFyZ3NbMF0pO1xyXG4gICAgY29uc3QgZmFjdG9yID0gTnVtYmVyKHByb2R1Y2VhcmdzWzFdIHx8IDEpIC8gTnVtYmVyKGNvbnN1bWVhcmdzWzFdIHx8IDEpO1xyXG5cclxuICAgIGlmICghY29uc3VtZXRoaW5neS50eXBlb2YoXCJpbmZpbml0ZVwiKSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbnN1bWV0aGluZ3kudmFsdWUoKTtcclxuICAgICAgY29uc3VtZXRoaW5neS5zZXQodmFsdWUgLSBOdW1iZXIoY29uc3VtZWFyZ3NbMV0gfHwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gcHJvZHVjZXRoaW5neS52YWx1ZSgpO1xyXG4gICAgcHJvZHVjZXRoaW5neS5zZXQodmFsdWUgKyBjb25zdW1ldGhpbmd5LnZhbHVlKCkgKiBmYWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZXZlbnQoa2V5KSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZShcIm9uXCIpID09PSBrZXkpIHtcclxuICAgICAgdGhpcy5yb290LmV4Y2hhbmdlKHRoaXMudmFsdWUoXCJjb25zdW1lXCIpLCB0aGlzLnZhbHVlKFwicHJvZHVjZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrIGluIHRoaXMudHJlZSkge1xyXG4gICAgICB0aGlzLnRyZWVba10uZXZlbnQoa2V5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldChwYXRoKSB7XHJcbiAgICBpZiAocGF0aC5pbmNsdWRlcyhcIi9cIikpIHtcclxuICAgICAgY29uc3QgdHJhdmVyc2UgPSBwYXRoLnNwbGl0KFwiL1wiKTtcclxuICAgICAgbGV0IHRoaW5neSA9IHRoaXM7XHJcbiAgICAgIHdoaWxlICh0cmF2ZXJzZS5sZW5ndGggJiYgdGhpbmd5KSB7XHJcbiAgICAgICAgdGhpbmd5ID0gdGhpbmd5LmdldCh0cmF2ZXJzZS5zaGlmdCgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaW5neTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy50cmVlW3BhdGhdID8/IG51bGw7XHJcbiAgfVxyXG5cclxuICB2YWx1ZShrZXkgPSBudWxsKSB7XHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChrZXkpPy52YWx1ZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKHRoaXMuc291cmNlLmlubmVySFRNTCk7XHJcblxyXG4gICAgcmV0dXJuIGlzTmFOKG51bWJlcikgPyB0aGlzLnNvdXJjZS5pbm5lckhUTUwgOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBzZXQodmFsdWUsIGtleSA9IG51bGwpIHtcclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgdGhpcy5nZXQoa2V5KS5zZXQodmFsdWUpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB2ID0gdmFsdWU7XHJcbiAgICBpZiAodi50b0ZpeGVkICYmIHYgJSAxKSB7XHJcbiAgICAgIHYgPSB2LnRvRml4ZWQoMik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3VyY2UuaW5uZXJIVE1MID0gdjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvb3Aobm93KSB7XHJcbiAgY29uc3QgZHQgPSBub3cgLSB0aW1lc3RhbXA7XHJcbiAgY29uc3QgZmFjdG9yID0gTWF0aC5tYXgoMCwgZHQgLyAxMDAwKTtcclxuICB0aW1lc3RhbXAgPSBub3c7XHJcblxyXG4gIGFwcC5zZXQoZmFjdG9yLCBcInRpbWVcIik7XHJcbiAgYXBwLmV2ZW50KFwibG9vcFwiKTtcclxuXHJcbiAgY29uc3QgbW9uZXkgPSBhcHAuZ2V0KFwiaW52ZW50b3J5XCIpLmdldChcIm1vbmV5XCIpO1xyXG5cclxuICBmcm9udGRvb3Iuc2V0KE1hdGgucm91bmQobW9uZXkudmFsdWUoKSksIFwibW9uZXlcIik7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlLm1vbmV5XCIsIG1vbmV5LnZhbHVlKCkpO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2F2ZS50aW1lc3RhbXBcIiwgdGltZXN0YW1wKTtcclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGxvb3AoRGF0ZS5ub3coKSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluKCkge1xyXG4gIGFwcCA9IG5ldyBUaGluZ3koZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpLmluaXQoKTtcclxuICBpbnZlbnRvcnkgPSBhcHAuZ2V0KFwiaW52ZW50b3J5XCIpO1xyXG4gIGZyb250ZG9vciA9IG5ldyBUaGluZ3koZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGRvb3JcIikpLmluaXQoKTtcclxuXHJcbiAgdGltZXN0YW1wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzYXZlLnRpbWVzdGFtcFwiKSA/PyBEYXRlLm5vdygpO1xyXG4gIGFwcFxyXG4gICAgLmdldChcImludmVudG9yeVwiKVxyXG4gICAgLmdldChcIm1vbmV5XCIpXHJcbiAgICAuc2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2F2ZS5tb25leVwiKSA/PyAwKTtcclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGxvb3AoRGF0ZS5ub3coKSkpO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImxvYWRpbmdcIikge1xyXG4gIC8vIGxvYWRpbmcgeWV0LCB3YWl0IGZvciB0aGUgZXZlbnRcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtYWluKTtcclxufSBlbHNlIHtcclxuICAvLyBET00gaXMgcmVhZHkhXHJcbiAgbWFpbigpO1xyXG59XHJcbiJdfQ==
