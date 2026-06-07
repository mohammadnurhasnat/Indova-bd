const fs = require("fs");
let content = fs.readFileSync("src/App.tsx", "utf-8");
content = content.replace(/#1e90ff/ig, "#80461B");
content = content.replace(/#1a80e5/ig, "#6a3a17");
content = content.replace(/rgba\(30,144,255,/g, "rgba(128,70,27,");
fs.writeFileSync("src/App.tsx", content);
console.log("Colors replaced in src/App.tsx");
