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
        remotecrabFeatureRemoteAccess: 'remotecrab/features/remote-access/index.html',
        remotecrabFeatureNotifications: 'remotecrab/features/notifications/index.html',
        remotecrabFeatureAI: 'remotecrab/features/ai/index.html',
        remotecrabFeatureExtendedDisplay: 'remotecrab/features/extended-display/index.html',
        remotecrabFeatureCamera: 'remotecrab/features/camera/index.html',
        remotecrabFeatureMicrophone: 'remotecrab/features/microphone/index.html',
        remotecrabFeatureSpeaker: 'remotecrab/features/speaker/index.html',
        remotecrabFeatureScreenMirror: 'remotecrab/features/screen-mirror/index.html',
        remotecrabFeatureTrackpad: 'remotecrab/features/trackpad/index.html',
        remotecrabFeatureKeyboard: 'remotecrab/features/keyboard/index.html',
        remotecrabFeatureVoice: 'remotecrab/features/voice/index.html',
        remotecrabFeatureAppSwitcher: 'remotecrab/features/app-switcher/index.html',
        remotecrabFeatureTransfer: 'remotecrab/features/transfer/index.html',
        remotecrabFeatureAutomation: 'remotecrab/features/automation/index.html',
        remotecrabAlternatives: 'remotecrab/alternatives/index.html',
        remotecrabWebcam: 'remotecrab/webcam/index.html',
        remotecrabFeatureNumpad: 'remotecrab/features/numpad/index.html',
        remotecrabFeatureMultiComputer: 'remotecrab/features/multi-computer/index.html',
        remotecrabFeatureTwoPhones: 'remotecrab/features/two-phones/index.html',
        remotecrabFeatureRecording: 'remotecrab/features/recording/index.html',
        remotecrabFeatureKeepAwake: 'remotecrab/features/keep-awake/index.html',
        remotecrabFeatureAutoUpdate: 'remotecrab/features/auto-update/index.html',
        // SlimDisk: the signed + notarized macOS cleaner, plus its privacy page.
        // Screenshots are served from public/downloads/slimdisk/ at runtime.
        slimdisk: 'slimdisk/index.html',
        slimdiskPrivacy: 'slimdisk/privacy/index.html',
      },
    },
  },
})
