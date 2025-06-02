# Geo Points Distance App

A lightweight web application for calculating the distance between two geographical points.

## Features

- Input two geographical points (latitude & longitude)
- Editable input fields for both points
- Use your device's `Geolocation API` to update one point automatically (if supported)
- Live map preview using `the Leaflet` library
- Update point positions directly on the map by dragging markers
- Second point is fixed as a reference on the map
- Calculates distance using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula)
- Compares the result with a distance calculated by a PHP API for validation
- Toggle light/dark mode via a button or keyboard shortcut: `Shift` + `C`
- Custom styling with SCSS

### DEMO: [geo-distance.pagetailoring.com](https://geo-distance.pagetailoring.com)

## Development

Start the development server on `http://localhost:3000`:

```bash
bun i
bun dev
```

Start the PHP API server separately:

```
php -S localhost:3001 -t public/

```

## Tech Stack

- [Nuxt 3](https://nuxt.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue 3](https://vuejs.org/)
- [Nuxt 3 deployment](https://nuxt.com/docs/getting-started/deployment)
- [useGeolocation (VueUse)](https://vueuse.org/core/useGeolocation/)
- [@nuxtjs/leaflet](https://leaflet.nuxtjs.org/)
- [SCSS for custom styling](https://sass-lang.com/documentation/)
