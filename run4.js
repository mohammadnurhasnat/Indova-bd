import fs from "fs";
let c = fs.readFileSync("src/App.tsx", "utf8");
c = c.replace(/CheckCircle2/g, "CheckCheck");
// and make sure Transparency text is aligned the same way if no icon:
// Since there's no icon, the 2nd photo's text replacement gave it a w-4 spacer. I'll just keep it.
fs.writeFileSync("src/App.tsx", c);
console.log("CheckCheck replaced");
