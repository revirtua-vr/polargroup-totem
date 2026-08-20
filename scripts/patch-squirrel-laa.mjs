import fs from 'fs'
import path from 'path'

const TARGETS = [
  'node_modules/electron-winstaller/vendor/WriteZipToSetup.exe',
  'node_modules/electron-winstaller/vendor/Setup.exe',
  'node_modules/electron-winstaller/vendor/StubExecutable.exe',
]

const LAA_FLAG = 0x0020

function patch(filePath) {
  const full = path.resolve(filePath)
  if (!fs.existsSync(full)) {
    console.log(`skip (not found): ${filePath}`)
    return
  }
  const data = fs.readFileSync(full)
  const peOffset = data.readUInt32LE(0x3c)
  const charsOffset = peOffset + 0x16
  const chars = data.readUInt16LE(charsOffset)
  if (chars & LAA_FLAG) {
    console.log(`already patched: ${filePath}`)
    return
  }
  data.writeUInt16LE(chars | LAA_FLAG, charsOffset)
  fs.writeFileSync(full, data)
  console.log(`patched LAA flag: ${filePath}`)
}

TARGETS.forEach(patch)
console.log('squirrel LAA patch done')
