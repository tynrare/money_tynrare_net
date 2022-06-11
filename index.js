let timestamp = 0;
let app = null;
let frontdoor = null;

class Thingy {
  constructor(source, root = this) {
    this.source = source;
    this.root = root;
    this.tree = {};
  }

  init() {
    for (let i = 0; i < this.source.children.length; i++) {
      const element = this.source.children[i];
      const key = element.id || element.tagName.toLowerCase();
      this.tree[key] = new Thingy(element, this.root).init();
    }

    return this;
  }

  typeof(key) {
    return this.source.classList.contains(key);
  }

  exchange(consume, produce) {
    const consumeargs = consume.split(" ");
    const produceargs = produce.split(" ");
    const consumethingy = this.get(consumeargs[0]);
    const producethingy = this.get(produceargs[0]);
    const factor = Number(produceargs[1] || 1) / Number(consumeargs[1] || 1);

    if (consumethingy.value() < Number(consumeargs[1])) {
      return;
    }

    if (!consumethingy.typeof("infinite")) {
      const value = consumethingy.value();
      consumethingy.set(value - Number(consumeargs[1] || 1));
    }

    const value = producethingy.value();
    producethingy.set(value + consumethingy.value() * factor);
  }

  event(key) {
    if (this.value("on") === key) {
      this.root.exchange(this.value("consume"), this.value("produce"));
    }

    for (const k in this.tree) {
      this.tree[k].event(key);
    }
  }

  get(path) {
    if (path.indexOf("/") >= 0) {
      const traverse = path.split("/");
      let thingy = this;
      while (traverse.length && thingy) {
        thingy = thingy.get(traverse.shift());
      }

      return thingy;
    }

    return this.tree[path] ?? null;
  }

  value(key = null) {
    if (key) {
      return this.get(key)?.value();
    }
    const number = Number(this.source.innerHTML);

    return isNaN(number) ? this.source.innerHTML : number;
  }

  set(value, key = null) {
    if (key) {
      this.get(key).set(value);

      return;
    }

    let v = value;
    if (v.toFixed && v % 1) {
      v = v.toFixed(2);
    }

    this.source.innerHTML = v;
  }
}

function loop(now) {
  const dt = now - timestamp;
  const factor = Math.max(0, dt / 1000);
  timestamp = now;

  app.set(factor, "time");
  app.event("loop");

  const money = app.get("inventory").get("money");

  frontdoor.set(Math.round(money.value()), "money");
  localStorage.setItem("save.money", money.value());
  localStorage.setItem("save.timestamp", timestamp);

  requestAnimationFrame(() => loop(Date.now()));
}

function main() {
  app = new Thingy(document.getElementById("app")).init();
  frontdoor = new Thingy(document.getElementById("frontdoor")).init();

  timestamp = localStorage.getItem("save.timestamp") ?? Date.now();
  app
    .get("inventory")
    .get("money")
    .set(localStorage.getItem("save.money") ?? 0);

  requestAnimationFrame(() => loop(Date.now()));
}

if (document.readyState == "loading") {
  // loading yet, wait for the event
  document.addEventListener("DOMContentLoaded", main);
} else {
  // DOM is ready!
  main();
}
