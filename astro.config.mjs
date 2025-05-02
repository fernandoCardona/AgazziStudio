import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  // Configuración del proyecto
  site: 'https://agazzistudio.com',
  base: '/',
  
  // Configuración de i18n a nivel de proyecto
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  
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
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
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
    format: 'directory'  // Cambiado de 'file' a 'directory'
  }
});
