import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.booktracker.app',
  appName: 'Book Tracker',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
