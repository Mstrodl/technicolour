const mini = require("minimist");

module.exports = async function(args, writeLine, client) {
  const arg = mini(args.slice(1));
  client.broadcast("w", {
    d: `\nBroadcast message from kim@ctrpanel:

${arg._.join(" ")}\n\n`
  });
  return;
};
