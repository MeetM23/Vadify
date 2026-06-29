/**
 * generate-images.cjs
 * Generates resized WebP variants for all local image assets.
 * Run: node generate-images.cjs
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, 'src', 'assets');
const DEST = path.join(__dirname, 'src', 'assets', 'resized');

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

const IMAGES = [
  // Logo — small, navbar/footer
  { file: 'vadify-logo.webp',         widths: [200, 400] },
  // Founder portraits — container max 260px
  { file: 'About-Darshan.webp',       widths: [260, 520] },
  { file: 'About-Meet.webp',          widths: [260, 520] },
  // Story / bento / work images
  { file: 'VadifyStory.webp',         widths: [600, 1200] },
  { file: 'Foxplay-black.webp',       widths: [600, 1200] },
  { file: 'Foxplay-White.webp',       widths: [600, 1200] },
  { file: 'Lotsy.webp',               widths: [600, 1200] },
  { file: 'moodofwood.webp',          widths: [600, 1200] },
  // Hardware logo — displayed small in bento
  { file: 'Hardware.webp',            widths: [200, 400] },
  // Case study hero images
  { file: 'KB.webp',                  widths: [600, 1200] },
  { file: 'Trust of Quality.webp',    widths: [600, 1200] },
];

async function run() {
  for (const { file, widths } of IMAGES) {
    const src = path.join(SRC, file);
    if (!fs.existsSync(src)) {
      console.warn(`⚠ Not found, skipping: ${file}`);
      continue;
    }
    for (const w of widths) {
      const stem = path.parse(file).name;
      const out = path.join(DEST, `${stem}-${w}.webp`);
      await sharp(src)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(out);
      console.log(`✓ ${path.basename(out)}`);
    }
  }
  console.log('\n✅ All images generated successfully.');
}

run().catch(err => { console.error(err); process.exit(1); });
