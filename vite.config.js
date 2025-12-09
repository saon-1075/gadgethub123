import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Use "legacy" for classic decorators (most common)
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          // This is often needed with legacy decorators
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    })
  ],
})