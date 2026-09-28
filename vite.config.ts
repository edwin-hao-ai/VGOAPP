import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: {
  env: Record<string, string | undefined>
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_URL || '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // Standalone product page served at /remotecrab/ (VGO Studio).
        // Static multi-page build — no SPA fallback needed on Caddy.
        remotecrab: 'remotecrab/index.html',
        remotecrabPrivacy: 'remotecrab/privacy/index.html',
        // The context-mode / app-compatibility page: the 18-suite registry
        // that the main page only summarises.
        remotecrabSuites: 'remotecrab/suites/index.html',
        // One landing page per feature. The slug is read from the URL by
        // RemoteCrabFeaturePage, so all entries share a single JS bundle.
        remotecrabFeatureNotifications: 'remotecrab/features/notifications/index.html',
        remotecrabFeatureExtendedDisplay: 'remotecrab/features/extended-display/index.html',
        remotecrabFeatureCamera: 'remotecrab/features/camera/index.html',
        remotecrabFeatureMicrophone: 'remotecrab/features/microphone/index.html',
        remotecrabFeatureScreenMirror: 'remotecrab/features/screen-mirror/index.html',
        remotecrabFeatureTrackpad: 'remotecrab/features/trackpad/index.html',
        remotecrabFeatureKeyboard: 'remotecrab/features/keyboard/index.html',
        remotecrabFeatureVoice: 'remotecrab/features/voice/index.html',
        remotecrabFeatureAppSwitcher: 'remotecrab/features/app-switcher/index.html',
        remotecrabFeatureTransfer: 'remotecrab/features/transfer/index.html',
        remotecrabFeatureAutomation: 'remotecrab/features/automation/index.html',
        // MacSlim: the signed + notarized macOS cleaner, plus its privacy page.
        // Screenshots are served from public/downloads/macslim/ at runtime.
        macslim: 'macslim/index.html',
        macslimPrivacy: 'macslim/privacy/index.html',
      },
    },
  },
})
