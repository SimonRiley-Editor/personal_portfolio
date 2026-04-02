const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      search(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.mjs') || fullPath.endsWith('.cjs')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('next/document')) {
        console.log(fullPath);
      }
    }
  }
}

search('node_modules');
