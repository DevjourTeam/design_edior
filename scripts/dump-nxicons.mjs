import opentype from 'opentype.js'
import { readFileSync } from 'fs'

const path = 'public/fonts/nxicons.1ec4e9ba.woff'
const buf = readFileSync(path)
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)

let font
try {
  font = opentype.parse(ab)
} catch (e) {
  console.error('PARSE_FAILED:', e.message)
  process.exit(2)
}

const rows = []
for (let i = 0; i < font.glyphs.length; i++) {
  const g = font.glyphs.get(i)
  if (g.unicode == null) continue
  rows.push({
    code: '\\' + g.unicode.toString(16),
    hex: 'U+' + g.unicode.toString(16).toUpperCase().padStart(4, '0'),
    dec: g.unicode,
    name: g.name,
  })
}
rows.sort((a, b) => a.dec - b.dec)
console.log('GLYPH_COUNT', rows.length)
for (const r of rows) {
  console.log(`${r.code}\t${r.hex}\t${r.name}`)
}
