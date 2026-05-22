import fs from 'fs';
const p = 'dist/index.html';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/<link rel="modulepreload"[^>]*vendor-supabase[^>]*>\n?/gi, '');
fs.writeFileSync(p, c);
