const fs = require('fs');
const path = require('path');

const genPath = path.join(__dirname, '..', 'src', 'generated', 'graphql.ts');
let content = fs.readFileSync(genPath, 'utf8');

// Find export type blocks that are unions of string literals
const regex = /export type (\w+) =\n([\s\S]*?)\n\n/gm;
let match;
const enums = [];
while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  const body = match[2];
  // Only handle union of string literals (lines starting with | '\'')
  const values = Array.from(body.matchAll(/\|\s*'([^']+)'/g)).map(m => m[1]);
  if (values.length >= 2) {
    enums.push({ name, values });
  }
}

if (enums.length === 0) {
  console.log('No string-union enums found.');
  process.exit(0);
}

let append = '\n// --- enum compatibility helpers (generated) ---\n';
for (const e of enums) {
  append += `export const ${e.name} = {\n`;
  for (const v of e.values) {
    const key = v.replace(/[^a-zA-Z0-9_]/g, '_');
    append += `  ${key}: '${v}' as const,\n`;
  }
  append += `} as const;\n`;
  append += `export type ${e.name}Values = typeof ${e.name}[keyof typeof ${e.name}];\n\n`;
}

// Remove existing appended block if present
content = content.replace(/\n\/\/ --- enum compatibility helpers \(generated\) ---[\s\S]*$/m, '');
content = content + append;
fs.writeFileSync(genPath, content, 'utf8');
console.log('Appended enum compatibility for', enums.map(e=>e.name).join(', '));
