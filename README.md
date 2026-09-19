# 💐 Experiencia Web de Homenaje y Felicitación para la Abuela ❤️

Una experiencia digital cinematográfica, emotiva, elegante y totalmente responsiva creada exclusivamente con **HTML5, CSS3 y JavaScript Vanilla**, sin dependencias ni frameworks externos pesados.

---

## 📁 Estructura del Proyecto

```text
/
├── index.html       # Estructura semántica, segura y accesible (safe-areas móviles y SEO)
├── style.css        # Diseño cinematográfico, paleta oro/rosa/burdeos, glassmorphism y animaciones
├── script.js        # Lógica de reproducción, transiciones suaves, partículas y controles
├── README.md        # Documentación y guía de personalización
└── videos/          # Carpeta donde colocas los videos de felicitación
    ├── video1.mp4   # Video de felicitación 1
    ├── video2.mp4   # Video de felicitación 2
    ├── video3.mp4   # Video de felicitación 3
    └── ...
```

---

## 🚀 1. Cómo abrir y ejecutar la página localmente

Puedes abrir la experiencia directamente de dos formas:

### Opción A: Doble clic (o arrastrar al navegador)
Haz doble clic sobre el archivo `index.html` para abrirlo en tu navegador favorito (Google Chrome, Edge, Safari, Firefox).

### Opción B: Con un servidor local (Recomendado para evitar restricciones de políticas locales en algunos navegadores)
Si tienes Node.js / Python o Live Server en VS Code:
- **Con Python**:
  ```bash
  python -m http.server 8080
  ```
  Luego abre `http://localhost:8080` en tu navegador.

---

## 🎥 2. Dónde colocar los videos y cómo agregar uno nuevo

1. Guarda tus archivos de video en formato `.mp4` (o `.webm`) dentro de la carpeta `videos/`.
2. Abre `script.js` con cualquier editor de texto (Bloc de notas, VS Code, etc.).
3. Ubica el arreglo `const videos = [...]` en la parte superior:

```javascript
const videos = [
  {
    src: "videos/video1.mp4",
    nombre: "De parte de la familia ❤️"
  },
  {
    src: "videos/video2.mp4",
    nombre: "Un mensaje muy especial de tus nietos ✨"
  },
  {
    src: "videos/video3.mp4",
    nombre: "Con todo el amor del mundo 💐"
  }
];
```

4. **Para añadir un video nuevo**: solo añade una línea adicional con la ruta y el mensaje:
```javascript
{
  src: "videos/video4.mp4",
  nombre: "De parte de Carlos y Andrea 💖"
}
```

---

## ✏️ 3. Cómo personalizar el nombre, textos y frases

En `script.js` encontrarás el objeto `config` al inicio:

```javascript
const config = {
  // Textos de la pantalla de bienvenida (Intro)
  frase1: "Hoy queremos regalarte algo muy especial...",
  frase2: "Para una persona que merece todo el amor del mundo ❤️",
  nombreAbuela: "Abuelita María", // <-- Cambia aquí el nombre o apodo cariñoso
  subtitulo: "Preparamos esta sorpresa especialmente para ti.",
  botonComenzar: "Comenzar sorpresa ❤️",

  // Textos de la pantalla final
  fraseFinal1: "Gracias por regalarnos tantos momentos ❤️",
  tituloFinal: "Te queremos muchísimo, Abuela.",
  fraseFinal2: "Que nunca te falten razones para sonreír.",
  firmaFinal: "Con todo nuestro amor ❤️"
};
```

---

## ⌨️ 4. Atajos de Teclado (Computador)

- **Espacio**: Reproducir / Pausar el video.
- **Flecha Derecha (→)**: Pasar al siguiente video.
- **Flecha Izquierda (←)**: Volver al video anterior.
- **Tecla F**: Activar / Salir de pantalla completa.
- **Tecla M**: Silenciar / Activar sonido.

---

## 📱 5. Experiencia en Celulares y Tablets

- **Diseño Mobile-First**: Los videos se ajustan perfectamente a pantallas verticales u horizontales (`object-fit: contain`) sin deformarse ni cortarse.
- **Touch amigable**: Toca el video en cualquier punto para pausar/reanudar y accede a controles discretos.
- **Safe Areas**: Protegido contra recortes en notches de iPhone y barras de navegación modernas.

---

## ❓ 6. Qué hacer si un video no reproduce o marca error

- **Aviso no invasivo**: La página incluye un sistema que detecta si un video no existe o tiene problemas y muestra un botón para saltar al siguiente sin interrumpir la celebración familiar.
- **Formato**: Asegúrate de que los videos estén codificados en **H.264 / AAC** en formato `.mp4` (el estándar compatible con todos los teléfonos y navegadores).
