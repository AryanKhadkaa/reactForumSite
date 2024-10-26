import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/AryanKhadkaa'  //you need to specify the base path for your project,
                          //which is necessary for GitHub Pages.
})
