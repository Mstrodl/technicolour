// good luck lmao
window.t = "";
window.g = 1;
window.d = "/home/kim";
window.addEventListener("load", function() {
  wc();
  window.v = document.getElementById("dis");
  window.r = document.getElementById("term");
  window.U = document.getElementById("loadamount");
  b();
});
window.l = [];
window.f = 0;
window.star = `                         ,*,
                       *****
                    *******,
                 ,**  *****
                                    ,**
   ,*********************************
   **********    ********,             
    ***, *** **   ,***,  *********
     * *** *****   **  *****,,,
      ***,**************
    *** ****************
  ,***   **************
 ******** ************,
**********  **********
********      ******\n`;

document.addEventListener("keydown", async function(e) {
  if (window.g == 1 && e.key == "l") {
    window.f = 1;
    window.l.map(a => {
      clearTimeout(a.t);
      a.a();
    });
  }
  if (window.g) return;
  console.log(e);
  if (e.key == "Enter") {
    window.g = 2;
    await w("\n");
    x(window.t);
    window.t = "";
    p();
    return;
  }
  if (e.key == "Backspace") {
    window.t = window.t.substring(0, window.t.length - 1);
    window.r.lastElementChild.textContent = p() + window.t;
    window.r.scrollTop = window.r.scrollHeight;
    return;
  }
  if (e.key.length > 1) return;

  window.t += e.key;
  window.r.lastElementChild.textContent = p() + window.t;
  window.r.scrollTop = window.r.scrollHeight;
});

window.c = {
  cd: function(p) {
    window.d = p.startsWith("/") ? p : window.d + p;
  }
};

async function x(i) {
  if (!i) await w("\n");
  else {
    z("x", {
      i
    });
    await new Promise(function(r) {
      window.o = r;
    });
  }
  window.g = 0;
  w(p());
}

async function w(t, d = 50) {
  // console.log(t);
  const m = t.split("\n").shift();
  const n = window.r.lastElementChild;
  // console.log("succ");
  let o = n.textContent;
  if (d <= 0) {
    o += m;
  } else {
    for (const r of m.split("")) {
      o += r;
      n.textContent = o;
      await s(r == " " ? d / 8 : d);
    }
  }
  for (const l of t.split("\n").slice(1)) {
    // console.log("got another line!", l);
    const v = document.createElement("div");
    v.classList = "term-line";
    window.r.appendChild(v);
    if (d <= 0) {
      v.textContent += l;
      window.r.scrollTop = window.r.scrollHeight;
    } else {
      for (const r of l.split("")) {
        // console.log("nap");
        v.textContent += r;
        await s(r == " " ? d / 8 : d);
        window.r.scrollTop = window.r.scrollHeight;
      }
    }
  }
  window.r.scrollTop = window.r.scrollHeight;
}

async function b() {
  await w("Connecting");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(500);
  await w("\nConnection Established.\n");
  await w("Authenticating with network");
  await s(125);
  await w(".");
  await s(125);
  await w(".");
  await s(125);
  await w(".");
  await s(50);
  await w("\nAuthentication Failed!\n");
  await w("Selecting Transport");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(500);
  await w("\nData Transport Chosen, Attempting to Continue!\n");
  await s(500);
  await w("Connecting Over Local Bus...");
  await w("\nConnection Established!\n");
  await w("Bus Handshake Accepted!\n");
  await s(125);
  await w("Authorising");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(250);
  await w(".");
  await s(250);
  await w(" Authorisation Ticket Signed.\n");
  await s(250);
  await w("Decrypting Drive... [  0%]");
  for (let i = 0; i <= 100; i++) {
    await s(250);
    window.r.lastElementChild.textContent =
      window.r.lastElementChild.textContent.substring(
        0,
        window.r.lastElementChild.textContent.length - 7
      ) + ` [${i.toString().padStart(3)}%]`;
  }
  await w("\n");
  await w("Drive Decrypted...\n");
  await s(250);
  await w("Checking Drive Integrity... [  0%]");
  for (let i = 0; i <= 100; i++) {
    await s(350);
    window.r.lastElementChild.textContent =
      window.r.lastElementChild.textContent.substring(
        0,
        window.r.lastElementChild.textContent.length - 7
      ) + ` [${i.toString().padStart(3)}%]`;
  }
  await w("\n");
  await w("Welcome to RedStarOS v4.0.0 Beta (Codename: webscale)!\n\n\n");
  await w("\n\n\n");
  await w(window.star, 100);
  await w(p());
  window.g = 0;
}

function s(d) {
  return new Promise(function(a) {
    if (window.g != 1 || window.f == 1) a();
    else window.l.push({ a, t: setTimeout(a, d) });
  });
}

function p() {
  return `kim@ctrpanel ${window.d}$ `;
}

let key = null;

function D(B) {
  return new Promise(R => {
    const F = new FileReader();
    F.onload = function() {
      R(this.result);
    };
    F.readAsArrayBuffer(B);
  });
}

async function q(e) {
  if (e instanceof Blob) {
    return await m.decrypt(
      {
        name: n
      },
      y.privateKey,
      await D(e)
    );
  } else {
    return e;
  }
}

var m = window.crypto.subtle;

function wc() {
  window.e = new WebSocket("ws://localhost:6009");
  e.onopen = async function() {
    y = await m.generateKey(
      {
        name: n,
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-1" }
      },
      true,
      ["encrypt", "decrypt"]
    );

    e.send(
      new TextEncoder().encode(
        await m.exportKey("jwk", y.publicKey).then(r => r.n)
      )
    );
  };
  // window.e = new WebSocket("ws://bell.strodl.co/ws");
  e.onclose = function() {
    window.v.classList = "disconnected-visible disconnected-indicator";
    if (!window.g) window.g = 3;
    window.wc();
  };
  const U = {};
  e.addEventListener("message", async function(m) {
    let L = await q(m.data);
    // console.log(L);
    if (L instanceof ArrayBuffer) {
      const V = new TextDecoder().decode(L);
      // console.log(V, L);
      if (V.startsWith("{") && V.endsWith("}")) L = V;
      else {
        // Audio stream!
        // if (window.R) {
        //   console.log("actually appending buffer");
        //   window.H.appendBuffer(L);
        //   window.R = false;
        // } else {
        window.M.push(L);
        // }
        window.U.style.display = "block";
        window.U.innerText = `${window.M.length}/${window.C}`;
        console.log("Appending audio chunk!");

        if (window.M.length >= window.C) {
          console.log("OWOWOWOW");
          z("a", window.M.length); // C is expected chunk count
          window.U.style.display = "none";
        }
        return;
      }
    }
    const j = JSON.parse(L);
    console.log(j, "gay ass");
    switch (j.o) {
      case "w": {
        if (j.d.s) {
          if (!U[j.d.s]) U[j.d.s] = "";
          U[j.d.s] += j.d.d;
        } else {
          if (j.d.t) w(j.d.d, j.d.t);
          else w(j.d.d);
        }
        break;
      }
      case "v": {
        w(U[j.d.s], j.d.t);
        U[j.d.s] = "";
        break;
      }
      case "r": {
        // ready packet recieved...
        if (window.o) window.o();
        if (window.g == 3) window.g = 0;
        window.v.classList = "disconnected-indicator";
        break;
      }
      case "a": {
        // lol obfuscation :>
        console.log("fuck yes!!", j.d);
        window.M = []; // Blob array
        window.C = j.d;
        // const O = new MediaSource();
        // window.A = new Audio(URL.createObjectURL(O));
        // window.M = [];
        // window.R = false;
        // O.addEventListener("sourceopen", () => {
        //   window.H = O.addSourceBuffer("audio/mpeg");
        //   if (window.M.length) {
        //     window.H.appendBuffer(window.M.shift());
        //   } else {
        //     window.R = true;
        //   }
        //   window.H.addEventListener("updateend", () => {
        //     if (window.M.length) window.H.appendBuffer(window.M.shift());
        //     if (window.M.length == 0) {
        //       window.R = true;
        //     }
        //     console.log("Ended an update!");
        //   });
        // });
        break;
      }
      case "p": {
        // if (window.A && !window.A.playing) window.A.play();
        w(p() + "\n");
        break;
      }
      case "b": {
        console.log("Beginning audio sequence!");
        window.A = new Audio(URL.createObjectURL(new Blob(window.M)));
        window.M = [];
        A.play();
        A.addEventListener("load", () => A.play());
        break;
      }
      case "d": {
        window.d = j.d.d;
        break;
      }
      case "u": {
        while (r.firstChild) {
          if (r.children.length == 1) break;
          r.removeChild(r.firstChild);
        }
        break;
      }
      case "c": {
        window.o();
        break;
      }
      default: {
        throw new Error("Non existent op");
      }
    }
  });
}

function u(z) {
  var k = atob(z);
  var m = new Uint8Array(k.length);
  for (var i = 0; i < k.length; i++) {
    m[i] = k.charCodeAt(i);
  }
  return m.buffer;
}

function z(e, j) {
  window.e.send(
    new TextEncoder().encode(
      JSON.stringify({
        o: e,
        d: j
      })
    )
  );
}

const n = "RSA-OAEP";
