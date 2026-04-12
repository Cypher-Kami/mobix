# Mobix

Mini-aplicación para comprar dispositivos móviles. SPA construida con React + TypeScript.

## Setup

```bash
pnpm install
pnpm start      # desarrollo
pnpm build      # producción
pnpm test       # tests
pnpm lint       # linting
```

## Stack

- React 19 + TypeScript (strict)
- Vite
- React Router v6
- TanStack Query + persistencia en localStorage (caché TTL 1h)
- Zustand + persist middleware (carrito)
- Tailwind CSS + shadcn/ui
- Vitest + Testing Library + MSW

## Arquitectura

Feature-based structure:

```
src/
├── features/
│   ├── products/   # API, hooks, componentes de productos
│   └── cart/       # store y hooks del carrito
├── shared/         # Header, Breadcrumb, componentes comunes
├── router/         # configuración de rutas
├── lib/            # QueryClient, persister
└── pages/          # PLPPage, PDPPage
```

## Decisiones Técnicas

**TanStack Query + @tanstack/query-persist-client**: gestión de datos asíncrona con caché persistida en localStorage. Implementa stale-while-revalidate: los datos cacheados se sirven inmediatamente mientras se revalidan en background, eliminando flicker y mejorando la perceived performance.

**Zustand + persist**: estado global del carrito con persistencia automática en localStorage. Mínimo boilerplate, integración nativa con middleware de persistencia.

**Tailwind CSS + shadcn/ui**: componentes accesibles de base con diseño consistente. Permite enfocarse en la lógica y los detalles de UX sin reinventar primitivos.

**MSW (Mock Service Worker)**: mock de API en tests de integración interceptando requests a nivel de red, sin modificar el código de producción.

**Feature-based structure**: cada dominio es autónomo con su propia capa de API, hooks y componentes. Facilita el mantenimiento y la extensión sin acoplamiento entre features.

## Sistema de Caché

La caché usa `staleTime: 1h` en TanStack Query combinado con `createSyncStoragePersister` para persistir en localStorage. Al cargar la app, los datos cacheados se sirven inmediatamente (stale-while-revalidate) y se revalidan en background si el TTL no ha expirado. Pasada 1 hora, se fuerza una nueva petición al API.

## Perceived Performance

- **Stale-while-revalidate**: contenido visible inmediatamente en visitas repetidas
- **Prefetch on hover**: al pasar el cursor sobre una tarjeta de producto >150ms, se precarga el detalle en background. La navegación a PDP es instantánea si el prefetch completó
- **isLoading vs isFetching**: los skeleton loaders solo aparecen en la primera carga sin caché. Durante revalidaciones en background, el contenido existente permanece visible

## Estrategia de Reintentos

- GET requests: hasta 3 reintentos con backoff exponencial (1s → 2s → 4s). No reintenta errores 4xx
- POST /api/cart: sin auto-retry. Error explícito con botón de reintento manual, sin resetear la selección del usuario

## Configuración de ESLint

El directorio `src/components/ui/**` está excluido de las reglas de ESLint de forma intencionada. Estos componentes son generados automáticamente por [shadcn/ui](https://ui.shadcn.com/) y se tratan como código externo: siguen las convenciones y el estilo del propio generador, no del proyecto. Lintearlos introduciría ruido innecesario (falsos positivos, reglas incompatibles con el output de shadcn) sin aportar valor real, ya que no es código que se escriba ni se mantenga manualmente. Si en algún momento se personalizan de forma significativa, se pueden reincorporar al scope de linting eliminando la entrada correspondiente en `eslint.config.js`.

## Trade-offs

- Sin paginación: el dataset es pequeño y la API no lo requiere
- Sin SSR: el enunciado requiere SPA explícitamente
- Caché en cliente: cubre el caso de uso sin necesidad de optimizar payloads server-side
- Selectores como chip buttons (no `<select>` nativo): mejor UX y más alineado con patrones de e-commerce modernos
