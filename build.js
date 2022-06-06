const fs = require("fs");
const pug = require("pug");
const less = require("less");

function write(file, text) {
  fs.writeFile(file, text, function (err) {
    if (err) return console.log(err);
  });
}

function build_pug() {
  // Compile the source code
  const compiledFunction = pug.compileFile("./index.pug");
  write("./dist/index.html", compiledFunction({}));
  console.log("convented: ./index.pug > ./dist/index.html");
}

function build_less() {
  fs.readFile("./index.less", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    less.render(data, {}).then(
      function (output) {
        write("./dist/index.css", output.css);
        console.log("convented: ./index.less > ./dist/index.css");
        // output.css = string of css
        // output.map = string of sourcemap
        // output.imports = array of string filenames of the imports referenced
      },
      function (error) {
        console.error(
          "conventing error (./index.less > ./dist/index.css)",
          error
        );
      }
    );
  });
}

build_pug();
build_less();
