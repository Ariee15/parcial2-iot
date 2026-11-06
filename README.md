# 🌐 IoT — Internet de las Cosas

Sitio web educativo desarrollado para el **Parcial 2 de Desarrollo de Software V** (Tema 8: Programación para IoT).

> Sitio completo de 5 páginas interconectadas, con **HTML semántico, CSS de autoría propia y JavaScript puro**. Sin frameworks ni plantillas.

## 📁 Estructura del proyecto

```
parcial2-iot/
├── index.html          Inicio: hero, tarjetas de acceso y heurísticas
├── conceptos.html      ¿Qué es IoT? IoT vs IIoT vs IoE, sensor y actuador
├── arquitectura.html   4 capas, protocolos, placas y laboratorio interactivo
├── casos.html          Ciudades, domótica, agricultura y salud
├── creador.html        Reseña del autor y formulario de contacto
├── css/
│   └── estilos.css     Hoja de estilos propia (variables, Grid, responsive)
├── js/
│   └── script.js       Menú móvil, simulador de sensor y validación de formulario
└── img/                11 fotos de uso libre + 2 SVG originales + créditos
```

## ▶️ Cómo verlo

Doble clic en `index.html`, o con un servidor local:

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## ⚙️ Funcionalidades con JavaScript

- **Menú adaptable**: botón hamburguesa con `aria-expanded` en móvil.
- **Laboratorio IoT** (`arquitectura.html`): enciende/apaga un LED simulado, toma lecturas de un DHT11 y registra los mensajes como si fueran publicados por MQTT.
- **Formulario de contacto** (`creador.html`): valida nombre, correo, asunto y mensaje; muestra errores específicos y confirma el envío sin recargar la página.

## 🎨 Diseño y accesibilidad

- Paleta propia con variables CSS (azul profundo, morado, celeste, verde neón).
- Tipografía fluida con `clamp()`, rejillas con CSS Grid y Flexbox.
- Enlace “Saltar al contenido”, foco visible, `aria-current` en la página activa y contraste verificado con Lighthouse (100/100/100 en accesibilidad, buenas prácticas y SEO).
- Heurísticas de Nielsen y reglas de Shneiderman aplicadas y documentadas en la página de inicio.

## 📸 Créditos de imágenes

Fotografías obtenidas de Wikimedia Commons con fines educativos; autoría y licencia detalladas en [`img/CREDITOS.md`](img/CREDITOS.md). El diagrama de arquitectura y la ilustración del perfil fueron creados para este proyecto (SVG).

## ✍️ Autor

[Tu nombre] — Desarrollo de Software V
Prof. Ing. José Javier Chirú F. · Universidad Tecnológica de Panamá
