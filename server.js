const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 6009 });
const fs = require("./fs/lib/fs.js");
const path = require("path");
let clients = [];
wss.on("connection", function(ws) {
  console.log("New connection!!!!");
  clients.push(new Client(ws));
});
const NodeRSA = require("node-rsa");
const jwkToPem = require("jwk-to-pem");
const EventListener = require("events");

class Client extends EventListener {
  constructor(ws) {
    super();
    this.ws = ws;
    this.pwd = "/home/kim";
    this.env = {
      PATH: ["/bin", "/usr/bin"]
    };
    this.send("r", {
      m: "Hello!!!"
    });
    this.ws.on("message", this.onMessage.bind(this));
  }

  async send(op, data) {
    const payload = {
      o: op,
      d: data
    };
    const packet = JSON.stringify(payload);
    const finalData = this.key ? await this.encrypt(packet) : packet;
    this.ws.send(finalData);
  }

  async sendAudio(audioBuffer) {
    const len = audioBuffer.length;
    let i = 0;
    const chunkSize = 256;
    await this.send("a", Math.floor(len / chunkSize));
    const delayTime = 0;

    console.log(
      `Audio buffer is ${len}! Breaking into ${len /
        chunkSize} chunks, will take approx: ${len / chunkSize * delayTime}ms`
    );
    while (i < len) {
      const chunk = audioBuffer.slice(i, (i += chunkSize));
      console.log(chunk);
      // await new Promise(r => setTimeout(r, delayTime));
      this.ws.send(await this.encrypt(chunk));
    }
    console.log("RP completed");
    await new Promise(resolve => {
      console.log("hey wanna rp??");
      const messageListener = msg => {
        console.log("uwu got a thing", msg);
        if (msg.o != "a") return;
        this.removeListener("packet", messageListener);
        resolve();
      };
      this.on("packet", messageListener);
    });
  }

  async encrypt(payload) {
    return await this.key.encrypt(payload);
  }

  setPwd(pwd) {
    this.pwd = pwd.startsWith("/")
      ? path.normalize(pwd)
      : path.normalize(path.join(this.pwd, pwd));
    this.send("d", { d: this.pwd });
  }

  async onMessage(data) {
    if (data instanceof String) return this.ws.close();
    if (!this.key) {
      try {
        const key = data.toString();
        const generatedPem = jwkToPem({
          alg: "RSA-OAEP",
          e: "AQAB",
          ext: true,
          key_ops: ["encrypt"],
          kty: "RSA",
          n: key
        });
        console.log(generatedPem);
        this.key = new NodeRSA(generatedPem);
        return;
      } catch (err) {
        return this.ws.close();
      }
    }
    const msg = JSON.parse(data.toString());
    console.log("uwu emitted!");
    this.emit("packet", msg);
    switch (msg.o) {
      case "x": {
        const command = msg.d.i;
        const cmd = command.split(" ")[0];
        const cm = await this.findFile(cmd);
        console.log(cm);
        if (!cm) {
          this.writeLine(`Command not found: ${cmd}\n`);
        } else {
          await cm._module(command.split(" "), this.writeLine.bind(this), this);
        }
        this.send("c", {});
        break;
      }
    }
  }

  broadcast(op, pkt) {
    return clients.map(c => c.send(op, pkt));
  }

  writeLine(ln, time) {
    this.send("w", {
      d: ln,
      t: time
    });
  }

  async findFile(cmd) {
    if (!cmd.startsWith("/") && !cmd.startsWith("..")) {
      for (const dir of this.env.PATH) {
        console.log(dir);
        const files = await fs.readdir(dir);
        console.log(files);
        const cm = files.find(file => file.name == cmd);
        console.log("Found file so far?: ", cm);
        if (!cm) continue;
        return cm;
      }
      return null;
    }
  }
}

process.on("unhandledRejection", function(err) {
  console.log(err);
});
