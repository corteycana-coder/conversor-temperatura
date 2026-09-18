# Conversor de Temperaturas

Aplicación web estática, moderna y responsive para convertir valores entre Celsius (°C), Fahrenheit (°F) y Kelvin (K).

## Características

- Conversión automática y manual entre las seis combinaciones de unidades.
- Botones para intercambiar unidades y limpiar el formulario.
- Validación de campos vacíos, valores no numéricos y Kelvin inferior a 0 K.
- Indicador visual de temperatura fría, templada o caliente.
- Interfaz mobile-first, accesible y compatible con teclado (Enter ejecuta la conversión).
- Animaciones sutiles con soporte para `prefers-reduced-motion`.
- Sin dependencias externas, npm, backend ni proceso de compilación.

## Tecnologías

HTML5 semántico, CSS3 y JavaScript Vanilla.

## Estructura

```text
conversor-temperaturas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Ejecutar localmente

Abre `index.html` directamente en un navegador moderno. También puedes servir la carpeta con cualquier servidor estático local; no requiere instalación.

## Subir a GitHub

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html`, la carpeta `css`, la carpeta `js` y este README.
3. Confirma los cambios en la rama principal.

## Activar GitHub Pages

1. En el repositorio, abre **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Elige la rama principal y la carpeta `/ (root)`.
4. Guarda y espera a que GitHub publique el sitio.

El proyecto usa únicamente rutas relativas (`css/styles.css` y `js/script.js`), por lo que funciona en GitHub Pages, Netlify y Vercel sin ajustes adicionales.

## Fórmulas

- Celsius → Fahrenheit: `°F = (°C × 9/5) + 32`
- Fahrenheit → Celsius: `°C = (°F − 32) × 5/9`
- Celsius → Kelvin: `K = °C + 273.15`
- Kelvin → Celsius: `°C = K − 273.15`
- Fahrenheit → Kelvin: `K = (°F − 32) × 5/9 + 273.15`
- Kelvin → Fahrenheit: `°F = (K − 273.15) × 9/5 + 32`

## Licencia

Este proyecto se entrega como material educativo y puede reutilizarse y modificarse libremente.
