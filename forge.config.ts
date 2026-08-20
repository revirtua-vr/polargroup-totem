import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { VitePlugin } from '@electron-forge/plugin-vite'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const appVersion = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
).version as string

const config: ForgeConfig = {
  packagerConfig: {
    name: 'PolarGroupTotem',
    executableName: 'polargroup-totem',
    extraResource: ['./dist'],
    win32metadata: {
      CompanyName: 'Polar Group',
      FileDescription: 'Polar Group Totem Kiosk',
      ProductName: 'PolarGroupTotem',
      FileVersion: `${appVersion}.0`,
      ProductVersion: `${appVersion}.0`,
      OriginalFilename: 'polargroup-totem.exe',
      InternalName: 'polargroup-totem',
    },
  },
  makers: [
    new MakerSquirrel({
      name: 'polargroup-totem',
    }),
    new MakerZIP({}),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'electron/main.ts',
          config: 'vite.config.ts',
        },
        {
          entry: 'electron/preload.ts',
          config: 'vite.config.ts',
        },
      ],
      renderer: [],
    }),
  ],
}

export default config
