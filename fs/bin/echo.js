const mini = require("minimist");

module.exports = async function(args, writeLine) {
  const arg = mini(args.slice(1));
  writeLine(arg._.join(" ") + "\n");
  return console.log(arg._, args);
};
