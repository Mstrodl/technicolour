const i2a = require("image-to-ascii");
const path = require("path");
const fs = require("fs");

(async () => {
  const base = process.argv[2];
  const frames = [];
  for (const file of fs.readdirSync(base)) {
    const frame = await new Promise((resolve, reject) => {
      i2a(
        path.resolve(path.join(base, file)),
        {
          size_options: { screen_size: { height: 50, width: 100 } },
          colored: false
        },
        (err, ascii) => {
          if (err) reject(err);
          else resolve(ascii);
        }
      );
    });
    console.log(file);
    // console.log(frame);
    frames.push(frame);
  }
  fs.writeFileSync(`./${path.basename(base)}.json`, JSON.stringify(frames));
})();
