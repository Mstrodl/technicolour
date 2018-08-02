const mini = require("minimist");
const path = require("path");
const fs = require("../lib/fs");

module.exports = async function(args, writeLine, client) {
  const arg = mini(args.slice(1));
  const pwd2 = arg._[0] || "/home/kim";
  const pwd = pwd2.startsWith("/") ?
      path.normalize(pwd2) : path.normalize(path.join(client.pwd, pwd2));
  try {
    if(!await fs.isDir(pwd)) return writeLine(`not a directory: ${pwd}\n`);
  } catch(err) {
    console.log(err);
    return writeLine(`no such file or directory: ${pwd}\n`);
  }
  client.setPwd(pwd);
  return;
};
