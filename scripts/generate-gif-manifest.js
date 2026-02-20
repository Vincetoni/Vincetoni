const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const gifDir = path.join(projectRoot, 'assets', 'random gifs');
const output = path.join(projectRoot, 'app', 'data', 'gifManifest.ts');

const isGif = (file) => /\.gif$/i.test(file);
const escapeSingleQuotes = (text) => text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function createManifest(files) {
  const rows = files
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const escapedFile = escapeSingleQuotes(file);
      return `  {\n    name: '${escapedFile}',\n    source: require('../../assets/random gifs/${escapedFile}'),\n  },`;
    })
    .join('\n');

  return `export type GifAsset = {\n  name: string;\n  source: number;\n};\n\nexport const GIF_MANIFEST: GifAsset[] = [\n${rows}\n];\n`;
}

function run() {
  if (!fs.existsSync(gifDir)) {
    throw new Error(`Missing gif directory: ${gifDir}`);
  }
  const files = fs.readdirSync(gifDir).filter(isGif);
  const content = createManifest(files);
  fs.writeFileSync(output, content, 'utf8');
  console.log(`GIF manifest updated with ${files.length} item(s).`);
}

run();
