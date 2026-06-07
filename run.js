import fs from "fs";
let content = fs.readFileSync("src/App.tsx", "utf-8");
content = content.replace(/mb-10 lg:mb-8 lg:mb-16/g, "mb-8 lg:mb-16");
fs.writeFileSync("src/App.tsx", content);
console.log("Fixed margin");
