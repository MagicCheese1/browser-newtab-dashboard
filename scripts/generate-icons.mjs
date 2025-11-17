#!/usr/bin/env node

/**
 * Generate extension icons from a source image
 * This script uses Sharp to resize a source icon to the required sizes
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const iconsDir = join(rootDir, 'icons');
const sourceIcon = join(rootDir, 'icon-source.png'); // You can create this from any image

const sizes = [
  { size: 16, name: 'icon16.png' },
  { size: 48, name: 'icon48.png' },
  { size: 128, name: 'icon128.png' },
];

async function generateIcons() {
  // Check if source icon exists
  if (!existsSync(sourceIcon)) {
    console.log('⚠️  Source icon not found:', sourceIcon);
    console.log('📝 Please create a source icon at:', sourceIcon);
    console.log('   You can use any image (PNG, JPG, SVG) and rename it to icon-source.png');
    console.log('   Recommended size: 512x512px or larger');
    
    // Check if icons already exist
    const existingIcons = sizes.filter(({ name }) => 
      existsSync(join(iconsDir, name))
    );
    
    if (existingIcons.length > 0) {
      console.log(`\n✅ Found ${existingIcons.length} existing icons in ${iconsDir}`);
      console.log('   Icons are already available, no generation needed.');
      return;
    }
    
    console.log('\n❌ No source icon and no existing icons found.');
    console.log('   The extension will work, but icons may be missing.');
    return;
  }

  // Create icons directory if it doesn't exist
  if (!existsSync(iconsDir)) {
    mkdirSync(iconsDir, { recursive: true });
  }

  console.log('🎨 Generating icons from:', sourceIcon);
  
  try {
    for (const { size, name } of sizes) {
      const outputPath = join(iconsDir, name);
      await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size}px)`);
    }
    
    console.log('\n✨ All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();

