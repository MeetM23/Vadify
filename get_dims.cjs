const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src', 'assets', 'new');
if (!fs.existsSync(dir)) {
    console.log('Dir not found');
    process.exit(1);
}
const files = fs.readdirSync(dir);
const result = {};

function readWebPDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 30) return null;
    if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
        return null;
    }
    const vp8Header = buffer.toString('ascii', 12, 16);
    let width = 0, height = 0;

    if (vp8Header === 'VP8 ') {
        width = buffer.readUInt16LE(26) & 0x3fff;
        height = buffer.readUInt16LE(28) & 0x3fff;
    } else if (vp8Header === 'VP8L') {
        const b1 = buffer[21];
        const b2 = buffer[22];
        const b3 = buffer[23];
        const b4 = buffer[24];
        width = 1 + (((b2 & 0x3F) << 8) | b1);
        height = 1 + (((b4 & 0xF) << 10) | (b3 << 2) | ((b2 & 0xC0) >> 6));
    } else if (vp8Header === 'VP8X') {
        width = 1 + buffer.readUIntLE(24, 3);
        height = 1 + buffer.readUIntLE(27, 3);
    } else {
        return null;
    }
    return { width, height };
}

for (const f of files) {
    if (f.endsWith('.webp')) {
        const dims = readWebPDimensions(path.join(dir, f));
        if (dims) result[f] = dims;
    }
}
fs.writeFileSync('dims.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('Wrote to dims.json');
