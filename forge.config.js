require('dotenv').config();
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'guilhermeangui',
          name: 'electron-app'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
  packagerConfig: {
    asar: true,
    icon: './assets/icon', // Sem extensão! Electron Forge escolhe automaticamente (.icns, .ico, .png)
    
    // === INFORMAÇÕES DO APP ===
    appBundleId: 'com.anguissauro.electron-app', // Para macOS (ID único)
    appCategoryType: 'public.app-category.utilities', // Categoria na App Store
    appCopyright: `Copyright © ${new Date().getFullYear()} anguissauro`, // Copyright
    
    // === WINDOWS ===
    win32metadata: {
      CompanyName: 'anguissauro',
      FileDescription: 'banana',
      OriginalFilename: 'banana.exe',
      ProductName: 'banana',
      InternalName: 'banana',
      // RequestedExecutionLevel: 'asInvoker' // Não pede admin
    },
    
    // === MACOS ===
    darwinDarkModeSupport: true, // Suporte a Dark Mode no macOS
    // osxSign: {},
    // osxNotarize: {
    //   tool: 'notarytool',
    //   appleId: process.env.APPLE_ID,
    //   appleIdPassword: process.env.APPLE_PASSWORD,
    //   teamId: process.env.APPLE_TEAM_ID
    // }
    
    // === ARQUIVOS A IGNORAR ===
    ignore: [
      /node_modules/,
      /\.git/,
      /\.vscode/,
      /\.env/,
      /README\.md/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // Windows - Instalador Squirrel
        name: 'banana',
        authors: 'anguissauro',
        description: 'banana',
        setupIcon: './assets/icon.ico',
        loadingGif: './assets/install-spinner.gif', // Opcional: animação durante instalação
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        // macOS - arquivo ZIP
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        // Linux (Debian/Ubuntu) - pacote .deb
        options: {
          maintainer: 'anguissauro',
          homepage: 'https://github.com/guilhermeangui/electron-app',
          icon: './assets/icon.png',
          categories: ['Utility'],
          section: 'utils'
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        // Linux (Red Hat/Fedora) - pacote .rpm
        options: {
          maintainer: 'anguissauro',
          homepage: 'https://github.com/guilhermeangui/electron-app',
          icon: './assets/icon.png',
          categories: ['Utility']
        }
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
