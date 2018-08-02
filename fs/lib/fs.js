const fs = require("fs");
const path = require("path");

module.exports.readdir = function(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join("fs", dir), function(err, files) {
      if(err) return reject(err.message);
      const f = files
	    .filter(file => !file.endsWith("~"))
	    .map(file => {
	      try {
		if(file.endsWith(".js") || file.endsWith(".json"))
		  return new File(dir, file, true);
		else
		  return {
		    name: file,
		    path: path.join(dir, file),
		    absPath: path.join("../", dir, file)
		  };
	      } catch(err) {
		console.log("readdir awsdf", err);
		return null;
	      }
	    }).filter(file => file);
      console.log(f);
      return resolve(f);
    });
  });
};

module.exports.readFile = async function(file) {
  try {
    const files = await module.exports.readdir(path.dirname(file));
    console.log("gay");
    return new File(path.dirname(file), path.basename(file));
  } catch(err) {
    console.log("uwu", err);
    throw err;
  }
}

module.exports.isDir = function(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(path.join("fs", dir), function(err, stat) {
      if(err) return reject(err);
      resolve(stat.isDirectory());
    });
  });
}

class File {
  constructor(dir, file, absolute) {
    if(!absolute) {
      console.log(dir);
      file = fs.readdirSync(path.join("fs", dir))
	.find(fl => path.parse(fl).name == file);
    }
    this.absPath = path.join("../", dir, file);
    this.path = path.join(dir, file);
    this.name = path.parse(file).name;
    try {
      var f = require(this.absPath);
      if(!f) throw "File is null";
    } catch(err) {
      throw err;
    }
    this._module = f;
    if(typeof f == "function") {
      this.mode = 700;
      this.contents = "[native code]";
    } else {
      this.mode = f.mode;
      this.contents = f.contents;
    }
    this.owner = 0;
  }

  async unlink() {
    await module.exports.unlink(this.path);
  }
}
