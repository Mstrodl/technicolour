const mini = require("minimist");
const frameSkip = 10;
const frames = require("../../../hams-dot.json").filter(
  (val, index) => index % frameSkip == 0
);
const delayTime = 1000 / 29.97 * frameSkip;
const fs = require("fs");
const hamsAudio = fs.readFileSync(__dirname + "/../../../hams.mp3");

module.exports = async function(args, writeLine, client) {
  // const arg = mini(args.slice(1));
  // client.broadcast("w", {
  //     d: `\nBroadcast message from kim@ctrpanel:

  // ${arg._.join(" ")}\n\n`
  //   })
  await client.writeLine("Loading...");
  await client.sendAudio(hamsAudio.slice(0, 1024 * 1024));
  console.log("Successfully strapped audio!");
  let audioStarted = false;
  for (const frame of frames) {
    // Append to the buffer
    for (const line of frame.split("\n")) {
      await client.send("w", {
        d: line + "\n",
        s: "HAM" // Buffer name, this is used to store a value because of chunking
      });
    }
    await client.send("u");
    console.log("Sent frame chunks to buffer, printing");
    // Send the buffer
    await client.send("v", {
      s: "HAM",
      t: 0
    });
    if (!audioStarted) {
      await client.send("b");
      audioStarted = true;
    }
    await new Promise(r => setTimeout(r, delayTime));
    console.log("Frame delay finished, sending next frame");
  }
};
