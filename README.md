# EventFlow - Plataforma Profesional de Gestión de Eventos

Migración de plantilla Envato a **Astro 3.6.5 + React 18 + Tailwind CSS v3** con arquitectura moderna, mobile-first y optimizada para SEO.

## 🚀 Stack Tecnológico

- **Framework**: Astro 3.6.5 (SSG - Static Site Generation)
- **Interactividad**: React 18 (Islas interactivas)
- **Estilos**: Tailwind CSS v3 + Google Fonts (DM Sans + Inter)
- **Gestor de Paquetes**: pnpm
- **Tipado**: TypeScript con `strict` mode
- **Blog**: Astro Content Collections con markdown

## 📦 Dependencias Principales

### Producción
- `@astrojs/react` - Integración React para Astro
- `@astrojs/tailwind` - Integración Tailwind
- `swiper` - Carousels responsivos
- `react-hook-form` + `zod` - Formularios con validación
- `react-countup` - Contadores animados
- `react-countdown` - Timer regresivo
- `react-fast-marquee` - Texto marquesina
- `react-intersection-observer` - Detección de viewport
- `react-masonry-css` - Layouts masonry
- `@iconify/react` - Sistema de iconos

### Desarrollo
- `prettier` + plugins - Formateo de código
- `@tailwindcss/typography` - Plugin para estilos de prosa

## 🗂️ Estructura del Proyecto

```
src/
├── pages/              # Rutas (SSG automático)
│   ├── index.astro     # Homepage
│   ├── about.astro     # Acerca de
│   ├── contact.astro   # Contacto
│   ├── services.astro  # Servicios
│   ├── blog/
│   │   ├── index.astro      # Listado de posts
│   │   └── [slug].astro     # Detalle de post
│   ├── events/
│   │   └── index.astro      # Listado de eventos
│   └── 404.astro       # Página de error
├── components/         # Componentes Astro (estáticos)
│   ├── Header.astro
│   ├── Footer.astro
│   ├── SEO.astro       # Metadatos y Open Graph
│   ├── SectionTitle.astro
│   └── *Card.astro     # Tarjetas reutilizables
├── islands/            # Componentes React (interactivos)
│   ├── HeroSlider.tsx
│   ├── ContactForm.tsx
│   ├── Accordion.tsx
│   ├── TabsSchedule.tsx
│   ├── CounterBox.tsx
│   └── ...
├── layouts/            # Layouts base
│   └── BaseLayout.astro
├── data/               # Datos JSON
│   ├── services.json
│   ├── team.json
│   ├── events.json
│   ├── gallery.json
│   ├── testimonials.json
│   ├── pricing.json
│   └── faq.json
├── content/            # Blog markdown
│   └── blog/
│       ├── guia-eventos-2025.md
│       ├── marketing-digital-eventos.md
│       └── tecnologia-eventos.md
├── styles/             # Estilos globales
│   └── globals.css     # Tailwind + custom
├── types/              # TypeScript interfaces
│   └── index.ts
└── lib/                # Funciones utilitarias
```

## 🎯 Componentes Creados

### Astro (Estáticos)
- Header/Navigation
- Footer
- SEO (metadatos dinámicos)
- SectionTitle
- ServiceCard, EventCard, TestimonialCard
- Layouts base

### React (Islas Interactivas)
- HeroSlider - Carousel Swiper
- ContactForm - Formulario validado
- Accordion - FAQs
- TabsSchedule - Schedule de eventos
- CounterBox - Números animados
- Y más...

## 🚀 Comandos

### Desarrollo
```bash
# Iniciar servidor local (http://localhost:3000)
pnpm dev

# Con puerto específico
pnpm dev --port 4321

# Abrir automáticamente
pnpm dev --open
```

### Producción
```bash
# Build para producción (salida en /dist/)
pnpm build

# Preview del build local
pnpm preview

# Verificar tipos TypeScript
pnpm check

# Formatear código
pnpm format
```

## 📱 Responsive Design

- **Mobile-first approach**
- Breakpoints: 375px, 640px, 768px, 1024px, 1200px, 1320px
- Optimizado para todos los dispositivos

## 🔍 SEO Técnico

✅ Meta tags dinámicos (title, description, OG, Twitter)
✅ Canonical URLs automáticas
✅ JSON-LD structured data
✅ Sitemap automático
✅ Mobile-friendly
✅ Página 404 personalizada

## ⚡ Performance

- **SSG**: Pre-renderiza todos los HTML estáticos
- **Code splitting**: Carga solo lo necesario
- **Lazy loading**: Imágenes y componentes
- **Minificación**: CSS y JS automático
- **Compresión Gzip**: Habilitada por defecto
- **CSS-in-JS**: Optimizado con Tailwind

## 🎨 Sistema de Diseño

**Colores:**
- Base: #B20D5D (Rosa/Magenta)
- Primary: #4A0AB4 (Morado)
- Black: #04000A
- Gray: #7C7B7B
- Extra: #F8F8F8 (Gris claro)

**Tipografía:**
- Sans: DM Sans (body)
- Heading: Inter (títulos)
- Size base: 16px / 26px line-height

## 📝 Datos

Los datos están centralizados en JSON:
- `services.json` - 6 servicios
- `team.json` - 6 miembros de equipo
- `events.json` - 6 eventos
- `gallery.json` - 9 items de galería
- `testimonials.json` - 8 testimonios
- `pricing.json` - 3 planes
- `faq.json` - 12 preguntas

Editables directamente sin tocar código.

## 📄 Blog

- Usa **Astro Content Collections**
- Posts en markdown (.md)
- Rutas automáticas: `/blog/[slug]`
- Soporte para tags, categorías, autor, fecha
- RSS feed disponible

## 🔐 Formularios

- Validación con `react-hook-form` + `zod`
- Soporte para endpoint API personalizado
- Manejo de errores integrado
- Mensajes de éxito/error

## 🌍 Multiidioma

El contenido está en **español**. Para agregar más idiomas:
1. Duplicar archivos JSON con prefijo idioma
2. Usar i18n plugin de Astro
3. Implementar switch de idioma

## 📦 Deploy

### Vercel (Recomendado)
```bash
# Vercel detecta Astro automáticamente
vercel
```

### Netlify
```bash
# Configuración automática
netlify deploy
```

### Cloudflare Pages
```bash
# SSG optimizado para edge
wrangler pages deploy dist
```

## ✅ Checklist Post-Deploy

- [ ] Configurar dominio personalizado
- [ ] Configurar SSL/TLS
- [ ] Verificar Google Search Console
- [ ] Configurar Analytics (GA4, Plausible)
- [ ] Implementar API de contacto real
- [ ] Agregar imágenes propias (replace placeholders)
- [ ] Escribir contenido original
- [ ] Probar formularios
- [ ] Lighthouse audit (>90)

## 🛠️ Configuración

### astro.config.mjs
- Output: `static` (SSG)
- Integrations: React + Tailwind
- Image optimization: Sharp
- CSS code splitting

### tailwind.config.cjs
- Tema personalizado con colores EventFlow
- Container customizado
- Animaciones keyframes
- Plugin de tipografía

### tsconfig.json
- Path aliases (@components, @islands, etc.)
- React JSX mode
- Strict type checking

## 📖 Recursos

- [Docs de Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [React 18](https://react.dev)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

## 👥 Contribuir

1. Crea una rama: `git checkout -b feature/tu-feature`
2. Haz cambios y formatea: `pnpm format`
3. Verifica tipos: `pnpm check`
4. Commit: `git commit -m "Add: descripción"`
5. Push y crea PR

## 📄 Licencia

MIT

---

**Hecho con ❤️ usando Astro + React + Tailwind CSS**
