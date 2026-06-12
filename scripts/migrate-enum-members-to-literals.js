const fs = require('fs');
const path = require('path');

const genPath = path.join(__dirname, '..', 'src', 'generated', 'graphql.ts');
const srcDir = path.join(__dirname, '..', 'src');

const gen = fs.readFileSync(genPath, 'utf8');

// Extract union types with string literals
const regex = /export type (\w+) =\n([\s\S]*?)\n\n/gm;
let match;
const enums = {};
while ((match = regex.exec(gen)) !== null) {
  const name = match[1];
  const body = match[2];
  const values = Array.from(body.matchAll(/\|\s*'([^']+)'/g)).map(m => m[1]);
  if (values.length >= 2) {
    enums[name] = values;
  }
}

if (Object.keys(enums).length === 0) {
  console.log('No enums found to migrate.');
  process.exit(0);
}

function walk(dir){
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file === 'generated') return; // skip generated
      walk(full);
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      migrateFile(full);
    }
  });
}

function migrateFile(filePath){
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let changed = false;
  for (const [enumName, values] of Object.entries(enums)){
    for (const v of values){
      const member = v.replace(/[^a-zA-Z0-9_]/g, '_');
      // patterns: EnumName.Member (word boundary before)
      const re = new RegExp('\\b' + enumName + '\\.' + member + '\\b', 'g');
      if (re.test(content)){
        content = content.replace(re, `'${v}'`);
        changed = true;
      }
      // Also try original value if member contains differences (some code may use exact member name)
      const re2 = new RegExp('\\b' + enumName + '\\.' + v + '\\b', 'g');
      if (re2.test(content)){
        content = content.replace(re2, `'${v}'`);
        changed = true;
      }
    }
  }
  if (changed && content !== original){
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Migrated', filePath);
  }
}

walk(srcDir);
console.log('Done.');
