const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/text-nier-light/g, 'text-[#e8e6e1]');
  content = content.replace(/border-nier-light/g, 'border-[#e8e6e1]');
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + filePath);
}

replaceInFile('components/AboutMe.tsx');
replaceInFile('components/Experience.tsx');
