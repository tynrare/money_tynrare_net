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

    const toconsume = Number(consumeargs[1] || 1);
    const toproduce = Number(produceargs[1] || 1);
    const factor = consumethingy.value() / toconsume;

    if (!consumethingy.typeof("infinite")) {
      if (consumethingy.value() < toconsume) {
        return;
      }

      consumethingy.add(-toconsume * factor);
    }

    producethingy.add(toproduce * factor);
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

  add(value, key = null) {
    this.set(this.value(key) + Number(value), key);
  }
}

function loop(now) {
  const dt = now - timestamp;
  const factor = Math.max(0, dt / 1000);
  timestamp = now;

  app.set(factor, "time");
  app.event("loop");

  frontdoor.set(Math.round(app.value("inventory/money")), "money");
  frontdoor.set(
    Math.round(app.value("inventory/money_but_better")),
    "money_but_better"
  );
  localStorage.setItem("save.money", app.value("inventory/money"));
  localStorage.setItem("save.timestamp", timestamp);

  requestAnimationFrame(() => loop(Date.now()));
}

function load() {
  timestamp = localStorage.getItem("save.timestamp") ?? Date.now();
  const money = Number(localStorage.getItem("save.money"));

  app
    .get("inventory")
    .get("money")
    .set(isNaN(money) ? 0 : money);
}

function main() {
  app = new Thingy(document.getElementById("app")).init();
  frontdoor = new Thingy(document.getElementById("frontdoor")).init();

  load();

  requestAnimationFrame(() => loop(Date.now()));
}

if (document.readyState == "loading") {
  // loading yet, wait for the event
  document.addEventListener("DOMContentLoaded", main);
} else {
  // DOM is ready!
  main();
}
