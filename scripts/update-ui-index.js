const fs = require('fs');
const path = require('path');

const UI_DIR = path.join(__dirname, '..', 'src', 'shared', 'ui');
const INDEX_FILE = path.join(UI_DIR, 'index.ts');

// Read all files in the UI directory
const files = fs.readdirSync(UI_DIR);

// Filter for TypeScript files and exclude index.ts
const componentFiles = files.filter(file => 
  file.endsWith('.tsx') && file !== 'index.ts'
);

// Generate export statements
const exportStatements = componentFiles.map(file => 
  `export * from './${path.parse(file).name}'`
);

// Write to index.ts
fs.writeFileSync(INDEX_FILE, exportStatements.join('\n') + '\n');

console.log('UI index.ts has been updated!');

