const mini = require("minimist");
const path = require("path");
const fs = require("../lib/fs");

module.exports = async function(args, writeLine, client) {
  const arg = mini(args.slice(1));
  if (!arg._.length) return;
  const files = arg._.map(
    p =>
      p.startsWith("/")
        ? path.resolve(p)
        : path.resolve(path.join(client.pwd, p))
  );
  for (const filename of files) {
    try {
      if (await fs.isDir(filename)) {
        return writeLine(`${filename}: Is a directory\n`);
      }
    } catch (err) {}
  }
  for (const filename of files) {
    try {
      var file = await fs.readFile(filename);
    } catch (err) {
      console.log(err);
      writeLine(err);
      return writeLine(`No such file or directory ${filename}\n`);
    }
    if (path.basename(filename) == "tweets" && !client.argActivated) {
      client.argActivated = true;
      console.log("Ready to make slice go batshit");
      setTimeout(() => {
        console.log("Primed!");
        client.ws.once("message", function() {
          console.log("Got our message!");
          setTimeout(() => {
            console.log("Sending!");
            client.send("a", {
              l: "/g"
            });
          }, 4000 + Math.random() * 5000);
        });
      }, 15000);
    }
    writeLine(file.contents);
  }
  return;
};
