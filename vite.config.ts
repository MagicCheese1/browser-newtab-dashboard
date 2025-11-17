import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-icons',
      closeBundle() {
        const iconsDir = path.resolve(__dirname, 'icons');
        const distIconsDir = path.resolve(__dirname, 'dist/icons');
        
        if (existsSync(iconsDir)) {
          if (!existsSync(distIconsDir)) {
            mkdirSync(distIconsDir, { recursive: true });
          }
          
          const iconFiles = ['icon16.png', 'icon48.png', 'icon128.png'];
          iconFiles.forEach((file) => {
            const src = path.join(iconsDir, file);
            const dest = path.join(distIconsDir, file);
            if (existsSync(src)) {
              copyFileSync(src, dest);
            }
          });
        }
      },
    },
    {
      name: 'fix-html-paths',
      transformIndexHtml(html) {
        // Fix paths to be relative
        html = html.replace(/href="\//g, 'href="./');
        html = html.replace(/src="\//g, 'src="./');
        // Remove vite.svg link
        html = html.replace(/<link[^>]*vite\.svg[^>]*>/gi, '');
        return html;
      },
      closeBundle() {
        // Fix HTML after all bundles are written
        const htmlPath = path.resolve(__dirname, 'dist/index.html');
        if (existsSync(htmlPath)) {
          let html = readFileSync(htmlPath, 'utf-8');
          
          // Fix script tags: remove type="module" and crossorigin for IIFE format
          html = html.replace(/<script([^>]*)>/gi, (match, attrs) => {
            // Remove type="module" and crossorigin attributes (not needed for IIFE)
            let newAttrs = attrs
              .replace(/\s*type\s*=\s*["']module["']/gi, '')
              .replace(/\s*crossorigin\s*=\s*["'][^"']*["']/gi, '')
              .replace(/\s*crossorigin/gi, '')
              .trim();
            // Don't add any type attribute - let browser use default for .js files
            return `<script ${newAttrs}>`;
          });
          
          // Remove crossorigin from link tags (not needed for extension)
          html = html.replace(/<link([^>]*)>/gi, (match, attrs) => {
            let newAttrs = attrs
              .replace(/\s*crossorigin\s*=\s*["'][^"']*["']/gi, '')
              .replace(/\s*crossorigin/gi, '')
              .trim();
            return `<link ${newAttrs}>`;
          });
          
          
          writeFileSync(htmlPath, html);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        format: 'iife',
        name: 'Dashboard',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        inlineDynamicImports: true,
      },
    },
    assetsInlineLimit: 0,
    target: 'esnext',
  },
  base: './',
});

