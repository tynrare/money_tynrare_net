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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEsSUFBSSxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFWO0FBQ0EsSUFBSSxTQUFTLEdBQUcsSUFBaEI7O0lBRU0sTTtFQUNKLGdCQUFZLE1BQVosRUFBaUM7SUFBQSxJQUFiLElBQWEsdUVBQU4sSUFBTTs7SUFBQTs7SUFDL0IsS0FBSyxNQUFMLEdBQWMsTUFBZDtJQUNBLEtBQUssSUFBTCxHQUFZLElBQVo7SUFDQSxLQUFLLElBQUwsR0FBWSxFQUFaO0VBQ0Q7Ozs7V0FFRCxnQkFBTztNQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixNQUF6QyxFQUFpRCxDQUFDLEVBQWxELEVBQXNEO1FBQ3BELElBQU0sT0FBTyxHQUFHLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsQ0FBckIsQ0FBaEI7UUFDQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBUixJQUFjLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFdBQWhCLEVBQTFCO1FBQ0EsS0FBSyxJQUFMLENBQVUsR0FBVixJQUFpQixJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEtBQUssSUFBekIsRUFBK0IsSUFBL0IsRUFBakI7TUFDRDs7TUFFRCxPQUFPLElBQVA7SUFDRDs7O1dBRUQsaUJBQU8sR0FBUCxFQUFZO01BQ1YsT0FBTyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLEdBQS9CLENBQVA7SUFDRDs7O1dBRUQsa0JBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtNQUN6QixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FBcEI7TUFDQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FB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T0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUwsRUFBRCxDQUFWO0VBQUEsQ0FBRCxDQUFyQjtBQUNEOztBQUVELElBQUksUUFBUSxDQUFDLFVBQVQsSUFBdUIsU0FBM0IsRUFBc0M7RUFDcEM7RUFDQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLElBQTlDO0FBQ0QsQ0FIRCxNQUdPO0VBQ0w7RUFDQSxJQUFJO0FBQ0wiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQgdGltZXN0YW1wID0gMDtcclxubGV0IGFwcCA9IG51bGw7XHJcbmxldCBmcm9udGRvb3IgPSBudWxsO1xyXG5cclxuY2xhc3MgVGhpbmd5IHtcclxuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIHJvb3QgPSB0aGlzKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICB0aGlzLnRyZWUgPSB7fTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc291cmNlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnNvdXJjZS5jaGlsZHJlbltpXTtcclxuICAgICAgY29uc3Qga2V5ID0gZWxlbWVudC5pZCB8fCBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdGhpcy50cmVlW2tleV0gPSBuZXcgVGhpbmd5KGVsZW1lbnQsIHRoaXMucm9vdCkuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdHlwZW9mKGtleSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlLmNsYXNzTGlzdC5jb250YWlucyhrZXkpO1xyXG4gIH1cclxuXHJcbiAgZXhjaGFuZ2UoY29uc3VtZSwgcHJvZHVjZSkge1xyXG4gICAgY29uc3QgY29uc3VtZWFyZ3MgPSBjb25zdW1lLnNwbGl0KFwiIFwiKTtcclxuICAgIGNvbnN0IHByb2R1Y2VhcmdzID0gcHJvZHVjZS5zcGxpdChcIiBcIik7XHJcbiAgICBjb25zdCBjb25zdW1ldGhpbmd5ID0gdGhpcy5nZXQoY29uc3VtZWFyZ3NbMF0pO1xyXG4gICAgY29uc3QgcHJvZHVjZXRoaW5neSA9IHRoaXMuZ2V0KHByb2R1Y2VhcmdzWzBdKTtcclxuICAgIGNvbnN0IGZhY3RvciA9IE51bWJlcihwcm9kdWNlYXJnc1sxXSB8fCAxKSAvIE51bWJlcihjb25zdW1lYXJnc1sxXSB8fCAxKTtcclxuXHJcbiAgICBpZiAoIWNvbnN1bWV0aGluZ3kudHlwZW9mKFwiaW5maW5pdGVcIikpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBjb25zdW1ldGhpbmd5LnZhbHVlKCk7XHJcbiAgICAgIGNvbnN1bWV0aGluZ3kuc2V0KHZhbHVlIC0gTnVtYmVyKGNvbnN1bWVhcmdzWzFdIHx8IDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IHByb2R1Y2V0aGluZ3kudmFsdWUoKTtcclxuICAgIHByb2R1Y2V0aGluZ3kuc2V0KHZhbHVlICsgY29uc3VtZXRoaW5neS52YWx1ZSgpICogZmFjdG9yKTtcclxuICB9XHJcblxyXG4gIGV2ZW50KGtleSkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUoXCJvblwiKSA9PT0ga2V5KSB7XHJcbiAgICAgIHRoaXMucm9vdC5leGNoYW5nZSh0aGlzLnZhbHVlKFwiY29uc3VtZVwiKSwgdGhpcy52YWx1ZShcInByb2R1Y2VcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgayBpbiB0aGlzLnRyZWUpIHtcclxuICAgICAgdGhpcy50cmVlW2tdLmV2ZW50KGtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQocGF0aCkge1xyXG4gICAgaWYgKHBhdGguaW5kZXhPZihcIi9cIikgPj0gMCkge1xyXG4gICAgICBjb25zdCB0cmF2ZXJzZSA9IHBhdGguc3BsaXQoXCIvXCIpO1xyXG4gICAgICBsZXQgdGhpbmd5ID0gdGhpcztcclxuICAgICAgd2hpbGUgKHRyYXZlcnNlLmxlbmd0aCAmJiB0aGluZ3kpIHtcclxuICAgICAgICB0aGluZ3kgPSB0aGluZ3kuZ2V0KHRyYXZlcnNlLnNoaWZ0KCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpbmd5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnRyZWVbcGF0aF0gPz8gbnVsbDtcclxuICB9XHJcblxyXG4gIHZhbHVlKGtleSA9IG51bGwpIHtcclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSk/LnZhbHVlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIodGhpcy5zb3VyY2UuaW5uZXJIVE1MKTtcclxuXHJcbiAgICByZXR1cm4gaXNOYU4obnVtYmVyKSA/IHRoaXMuc291cmNlLmlubmVySFRNTCA6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIHNldCh2YWx1ZSwga2V5ID0gbnVsbCkge1xyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICB0aGlzLmdldChrZXkpLnNldCh2YWx1ZSk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHYgPSB2YWx1ZTtcclxuICAgIGlmICh2LnRvRml4ZWQgJiYgdiAlIDEpIHtcclxuICAgICAgdiA9IHYudG9GaXhlZCgyKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNvdXJjZS5pbm5lckhUTUwgPSB2O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9vcChub3cpIHtcclxuICBjb25zdCBkdCA9IG5vdyAtIHRpbWVzdGFtcDtcclxuICBjb25zdCBmYWN0b3IgPSBNYXRoLm1heCgwLCBkdCAvIDEwMDApO1xyXG4gIHRpbWVzdGFtcCA9IG5vdztcclxuXHJcbiAgYXBwLnNldChmYWN0b3IsIFwidGltZVwiKTtcclxuICBhcHAuZXZlbnQoXCJsb29wXCIpO1xyXG5cclxuICBjb25zdCBtb25leSA9IGFwcC5nZXQoXCJpbnZlbnRvcnlcIikuZ2V0KFwibW9uZXlcIik7XHJcblxyXG4gIGZyb250ZG9vci5zZXQoTWF0aC5yb3VuZChtb25leS52YWx1ZSgpKSwgXCJtb25leVwiKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNhdmUubW9uZXlcIiwgbW9uZXkudmFsdWUoKSk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzYXZlLnRpbWVzdGFtcFwiLCB0aW1lc3RhbXApO1xyXG5cclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gbG9vcChEYXRlLm5vdygpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgYXBwID0gbmV3IFRoaW5neShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSkuaW5pdCgpO1xyXG4gIGZyb250ZG9vciA9IG5ldyBUaGluZ3koZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGRvb3JcIikpLmluaXQoKTtcclxuXHJcbiAgdGltZXN0YW1wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzYXZlLnRpbWVzdGFtcFwiKSA/PyBEYXRlLm5vdygpO1xyXG4gIGFwcFxyXG4gICAgLmdldChcImludmVudG9yeVwiKVxyXG4gICAgLmdldChcIm1vbmV5XCIpXHJcbiAgICAuc2V0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2F2ZS5tb25leVwiKSA/PyAwKTtcclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGxvb3AoRGF0ZS5ub3coKSkpO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImxvYWRpbmdcIikge1xyXG4gIC8vIGxvYWRpbmcgeWV0LCB3YWl0IGZvciB0aGUgZXZlbnRcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtYWluKTtcclxufSBlbHNlIHtcclxuICAvLyBET00gaXMgcmVhZHkhXHJcbiAgbWFpbigpO1xyXG59Il19
