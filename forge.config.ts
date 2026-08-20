import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { VitePlugin } from '@electron-forge/plugin-vite'

const config: ForgeConfig = {
  packagerConfig: {
    name: 'PolarGroupTotem',
    executableName: 'polargroup-totem',
    extraResource: ['./dist'],
    win32metadata: {
      CompanyName: 'Polar Group',
      FileDescription: 'Polar Group Totem Kiosk',
      ProductName: 'PolarGroupTotem',
      FileVersion: '1.0.0.0',
      ProductVersion: '1.0.0.0',
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
