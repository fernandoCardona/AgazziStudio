import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Configuración del proyecto
  site: 'https://agazzistudio.com',
  base: '/',
  
  // Integraciones
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
          ca: 'ca-ES'
        }
      }
    }),
  ],
  
  // Explícitamente desactivar TypeScript
  typescript: {
    enabled: false
  },
  
  // Asegurar que sea un sitio estático
  output: 'static',
  
  // Configuración de build
  build: {
    format: 'file'
  }
});
