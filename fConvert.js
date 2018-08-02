const fs = require("fs");

const hams = fs.readFileSync("./hams/frames.txt", { encoding: "utf-8" });
const frames = Array.from(hams.match(/(?:.*\n){25}/g));
fs.writeFileSync("./hams-dot.json", JSON.stringify(frames));
