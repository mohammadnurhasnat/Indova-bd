const { execSync } = require('child_process');
try {
  console.log("Checking git status at workspace root /...");
  const status = execSync('git status', { encoding: 'utf8' });
  console.log("Git Status success!\n", status);
  
  console.log("Checking git show HEAD:src/App.tsx...");
  const original = execSync('git show HEAD:src/App.tsx', { encoding: 'utf8' });
  const startMarker = '<section id="doctor-appointment"';
  const startIndex = original.indexOf(startMarker);
  
  if (startIndex === -1) {
    console.log("id=doctor-appointment not found in git HEAD");
  } else {
    const endMarker = 'id="check-documents"';
    const endIndex = original.indexOf(endMarker);
    if (endIndex === -1) {
      console.log("endMarker not found");
    } else {
      const closingSectionStr = '</section>';
      const lastSectionClose = original.lastIndexOf(closingSectionStr, endIndex);
      console.log("=== ORIGINAL SECTION FROM GIT ===");
      console.log(original.substring(startIndex, lastSectionClose + closingSectionStr.length));
      console.log("=== END ===");
    }
  }
} catch (e) {
  console.error("Error in script:", e.message);
  if (e.stdout) console.log("Stdout:", e.stdout.toString());
  if (e.stderr) console.log("Stderr:", e.stderr.toString());
}
