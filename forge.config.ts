import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { VitePlugin } from '@electron-forge/plugin-vite'

const config: ForgeConfig = {
  packagerConfig: {
    name: 'PolarGroupTotem',
    executableName: 'polargroup-totem',
    extraResource: ['./dist'],
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
