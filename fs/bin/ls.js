const fs = require("../lib/fs.js");
const mini = require("minimist");
const path = require("path");

module.exports = async function(args, writeLine, client) {
  const arg = mini(args.slice(1));
  const dirs = (arg._.length ? arg._ : [client.pwd])
	.map(p => p.startsWith("/") ? path.resolve(p)
	     : path.resolve(path.join(client.pwd, p)));
  for(const dir of dirs) {
    try {
      if(!(await fs.isDir(dir))) {
	return writeLine(`Not a directory: ${dir}\n`);
      }
    } catch(err) {
      // writeLine(err.message + "\n");
      return writeLine(`No such file or directory: ${dir}\n`);
    }
  }
  for(const dir of dirs) {
    try {
      var files = await fs.readdir(dir);
    } catch(err) {
      return writeLine(`No such file or directory: ${dir}\n`);
    }
    writeLine(dir + ":\n");
    writeLine(files.map(file => file.name).join("\n"));
  }
  writeLine("\n");
  return 0;
};
