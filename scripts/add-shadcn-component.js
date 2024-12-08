const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Run the shadcn-ui add command
try {
  execSync(`npx shadcn@latest add ${componentName} --yes`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error adding component:', error);
  process.exit(1);
}

// Move the component to src/shared/ui
const sourceDir = path.join(__dirname, '..', 'components', 'ui');
const targetDir = path.join(__dirname, '..', 'src', 'shared', 'ui');

if (fs.existsSync(path.join(sourceDir, `${componentName}.tsx`))) {
  fs.renameSync(
    path.join(sourceDir, `${componentName}.tsx`),
    path.join(targetDir, `${componentName}.tsx`)
  );
  console.log(`Moved ${componentName}.tsx to src/shared/ui`);
}

// Update the index.ts file
execSync('npm run update-ui-index', { stdio: 'inherit' });

console.log(`Component ${componentName} has been added and index.ts has been updated!`);

