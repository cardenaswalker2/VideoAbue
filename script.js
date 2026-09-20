/**
 * ==========================================================================
 * EXPERIENCIA DE HOMENAJE Y FELICITACIÓN PARA LA ABUELA
 * JavaScript Vanilla Puro, Modular, Robusto y Fácil de Mantener
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
     1. CONFIGURACIÓN FÁCILMENTE EDITABLE (Personalización)
     ========================================================================== */
  const config = {
    // Textos de la pantalla de carga
    preloaderText: "Preparando una pequeña sorpresa para ti... ❤️",

    // Textos de la pantalla de bienvenida (Intro)
    badge: "✦ Un regalo del corazón ✦",
    frase1: "Hoy queremos regalarte algo muy especial...",
    frase2: "Para una persona que merece todo el amor del mundo ❤️",
    nombreAbuela: "Abuela",
    subtitulo: "Preparamos esta sorpresa especialmente para ti.",
    botonComenzar: "Comenzar sorpresa ❤️",

    // Textos de la pantalla final (Outro)
    fraseFinal1: "Gracias por regalarnos tantos momentos ❤️",
    tituloFinal: "Te queremos muchísimo, Abuela.",
    fraseFinal2: "Que nunca te falten razones para sonreír.",
    firmaFinal: "Con todo nuestro amor ❤️",
    botonReiniciar: "Ver la sorpresa nuevamente ✨",

    // Mensaje en caso de que un video no pueda cargarse
    mensajeError: "No pudimos cargar este mensaje, pero podemos continuar con el siguiente ❤️",

    // Tiempo de inactividad para desvanecer controles en pantalla (milisegundos)
    hideControlsDelay: 3500
  };

  /**
   * LISTA CENTRAL DE VIDEOS:
   * Para añadir más videos, simplemente agrega otro objeto al array:
   * { src: "videos/videoX.mp4", nombre: "De parte de tus nietos ❤️" }
   */
  const videos = [
    {
      src: "AdalnerYfamiliaVideoAbue.mp4",
      nombre: "De: Adalner y Familia ❤️"
    },
    {
      src: "DeirisVideoAbue.mp4",
      nombre: "De: Deiris ✨"
    },
    {
      src: "IngridVideoAbue.mp4",
      nombre: "De: Ingrid 🌸"
    },
    {
      src: "JuanCarlosVideoAbue.mp4",
      nombre: "De: Juan Carlos 💐"
    },
    {
      src: "LuisAlfonsoYesposaVideoAbue.mp4",
      nombre: "De: Luis Alfonso y Esposa 🌹"
    },
    {
      src: "ManuelVideoAbue.mp4",
      nombre: "De: Manuel 🌟"
    },
    {
      src: "MarielaVideoAbue.mp4",
      nombre: "De: Mariela 🌺"
    },
    {
      src: "MarledisVideoAbue.mp4",
      nombre: "De: Marledis 💫"
    },
    {
      src: "MisaelVideoAbue.mp4",
      nombre: "De: Misael ❤️"
    },
    {
      src: "NorelisVideoAbue.mp4",
      nombre: "De: Norelis 💖"
    },
    {
      src: "NurisYfamiliaVideoAbue.mp4",
      nombre: "De: Nuris y Familia 🌷"
    },
    {
      src: "YesicaVideoAbue.mp4",
      nombre: "De: Yesica 🌻"
    }
  ];

  /* ==========================================================================
     2. REFERENCIAS AL DOM
     ========================================================================== */
  const DOM = {
    // Preloader
    preloader: document.getElementById("preloader"),
    preloaderText: document.getElementById("preloader-text"),

    // Intro Screen
    introScreen: document.getElementById("intro-screen"),
    introPhrase1: document.getElementById("intro-phrase-1"),
    introPhrase2: document.getElementById("intro-phrase-2"),
    grandmaTitle: document.getElementById("grandma-title"),
    introSubtitle: document.getElementById("intro-subtitle"),
    btnStartFullscreen: document.getElementById("btn-start-fullscreen"),
    btnStartNormal: document.getElementById("btn-start-normal"),

    // Video Screen
    videoSection: document.getElementById("video-section"),
    videoStage: document.getElementById("video-stage"),
    videoWrapper: document.getElementById("video-wrapper"),
    backdropVideo: document.getElementById("backdrop-video"),
    mainVideo: document.getElementById("main-video"),
    videoCounter: document.getElementById("video-counter"),
    dotsContainer: document.getElementById("dots-container"),
    videoAuthor: document.getElementById("video-author"),
    
    // Controles
    controlsBar: document.getElementById("controls-bar"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    btnPlayPause: document.getElementById("btn-play-pause"),
    btnMute: document.getElementById("btn-mute"),
    btnFullscreen: document.getElementById("btn-fullscreen"),
    progressContainer: document.getElementById("progress-container"),
    progressFill: document.getElementById("progress-fill"),
    timeDisplay: document.getElementById("time-display"),
    centerPlayIndicator: document.getElementById("center-play-indicator"),

    // Overlay de error
    videoErrorOverlay: document.getElementById("video-error-overlay"),
    errorMessage: document.getElementById("error-message"),
    btnErrorSkip: document.getElementById("btn-error-skip"),

    // Outro Screen
    outroScreen: document.getElementById("outro-screen"),
    outroPhrase1: document.getElementById("outro-phrase-1"),
    outroTitle: document.getElementById("outro-title"),
    outroPhrase2: document.getElementById("outro-phrase-2"),
    outroSignature: document.getElementById("outro-signature"),
    btnRestart: document.getElementById("btn-restart"),

    // Canvas de Fondo
    ambientCanvas: document.getElementById("ambient-canvas")
  };

  /* ==========================================================================
     3. ESTADO DE LA APLICACIÓN
     ========================================================================== */
  const state = {
    currentIndex: 0,
    isPlaying: false,
    isTransitioning: false,
    controlsTimeout: null,
    nextVideoPreloader: null,
    totalVideos: videos.length
  };

  /* ==========================================================================
     4. INICIALIZACIÓN Y APLICACIÓN DE TEXTOS DE CONFIGURACIÓN
     ========================================================================== */
  function applyConfig() {
    if (DOM.preloaderText) DOM.preloaderText.textContent = config.preloaderText;
    if (DOM.introPhrase1) DOM.introPhrase1.textContent = config.frase1;
    if (DOM.introPhrase2) DOM.introPhrase2.textContent = config.frase2;
    if (DOM.grandmaTitle) DOM.grandmaTitle.textContent = config.nombreAbuela;
    if (DOM.introSubtitle) DOM.introSubtitle.textContent = config.subtitulo;

    if (DOM.outroPhrase1) DOM.outroPhrase1.textContent = config.fraseFinal1;
    if (DOM.outroTitle) DOM.outroTitle.textContent = config.tituloFinal;
    if (DOM.outroPhrase2) DOM.outroPhrase2.textContent = config.fraseFinal2;
    if (DOM.outroSignature) DOM.outroSignature.textContent = config.firmaFinal;
    if (DOM.btnRestart) {
      const restartText = DOM.btnRestart.querySelector(".btn-text");
      if (restartText) restartText.textContent = config.botonReiniciar;
    }
    if (DOM.errorMessage) DOM.errorMessage.textContent = config.mensajeError;
  }

  /* ==========================================================================
     5. GESTOR DE PANTALLAS (TRANSICIONES ELEGANTES)
     ========================================================================== */
  function showScreen(screenToShow) {
    const screens = [DOM.introScreen, DOM.videoSection, DOM.outroScreen];
    screens.forEach(screen => {
      if (screen === screenToShow) {
        screen.classList.remove("hidden", "cinematic-exit");
        // Forzar reflow para animación suave
        void screen.offsetWidth;
        screen.classList.add("active");
      } else {
        screen.classList.remove("active");
        screen.classList.add("hidden");
      }
    });
  }

  /* ==========================================================================
     6. INDICADORES DE PROGRESO (BADGE Y DOTS)
     ========================================================================== */
  function renderDots() {
    DOM.dotsContainer.innerHTML = "";
    videos.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `dot-item ${idx === state.currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Ir al video ${idx + 1}`);
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", idx === state.currentIndex ? "true" : "false");
      dot.addEventListener("click", () => {
        if (state.currentIndex !== idx && !state.isTransitioning) {
          goToVideo(idx);
        }
      });
      DOM.dotsContainer.appendChild(dot);
    });
  }

  function updateProgressUI() {
    DOM.videoCounter.textContent = `Mensaje ${state.currentIndex + 1} de ${state.totalVideos}`;
    const dots = DOM.dotsContainer.querySelectorAll(".dot-item");
    dots.forEach((dot, idx) => {
      if (idx === state.currentIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-selected", "true");
      } else {
        dot.classList.remove("active");
        dot.setAttribute("aria-selected", "false");
      }
    });

    // Actualizar dedicatoria / remitente
    const currentVideo = videos[state.currentIndex];
    DOM.videoAuthor.style.opacity = "0";
    DOM.videoAuthor.style.transform = "translateY(-6px)";
    setTimeout(() => {
      DOM.videoAuthor.textContent = currentVideo.nombre || `Mensaje ${state.currentIndex + 1}`;
      DOM.videoAuthor.style.opacity = "1";
      DOM.videoAuthor.style.transform = "translateY(0)";
    }, 250);
  }

  /* ==========================================================================
     7. CONTROL Y REPRODUCCIÓN DE VIDEOS
     ========================================================================== */
  function updateVideoOrientation() {
    if (!DOM.mainVideo.videoWidth || !DOM.mainVideo.videoHeight) return;
    
    const isPortrait = DOM.mainVideo.videoHeight > DOM.mainVideo.videoWidth;
    if (isPortrait) {
      DOM.videoWrapper.classList.add("is-portrait");
      DOM.videoWrapper.classList.remove("is-landscape");
    } else {
      DOM.videoWrapper.classList.add("is-landscape");
      DOM.videoWrapper.classList.remove("is-portrait");
    }
  }

  function loadAndPlayVideo(index) {
    if (index < 0 || index >= state.totalVideos) return;

    state.isTransitioning = true;
    hideErrorOverlay();

    // Animación de salida del video actual (fade out + blur sutil)
    DOM.mainVideo.classList.add("transitioning");
    if (DOM.backdropVideo) DOM.backdropVideo.classList.add("transitioning");

    setTimeout(() => {
      state.currentIndex = index;
      const currentVideo = videos[state.currentIndex];

      // Cambiar fuente de los videos (principal y fondo desenfocado)
      DOM.mainVideo.src = currentVideo.src;
      DOM.mainVideo.load();

      if (DOM.backdropVideo) {
        DOM.backdropVideo.src = currentVideo.src;
        DOM.backdropVideo.load();
      }

      updateProgressUI();
      preloadNextVideo(index + 1);

      // Iniciar reproducción una vez preparado
      const playPromise = DOM.mainVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            state.isPlaying = true;
            updatePlayPauseButton(true);
            DOM.mainVideo.classList.remove("transitioning");
            if (DOM.backdropVideo) {
              DOM.backdropVideo.classList.remove("transitioning");
              DOM.backdropVideo.play().catch(() => {});
            }
            state.isTransitioning = false;
          })
          .catch((err) => {
            console.warn("Autoplay bloqueado o archivo no encontrado:", err);
            DOM.mainVideo.classList.remove("transitioning");
            if (DOM.backdropVideo) DOM.backdropVideo.classList.remove("transitioning");
            state.isTransitioning = false;
            updatePlayPauseButton(false);
          });
      }
    }, 450);
  }

  function togglePlayPause() {
    if (state.isTransitioning) return;

    if (DOM.mainVideo.paused || DOM.mainVideo.ended) {
      DOM.mainVideo.play()
        .then(() => {
          state.isPlaying = true;
          if (DOM.backdropVideo) DOM.backdropVideo.play().catch(() => {});
          updatePlayPauseButton(true);
          triggerCenterPlayIndicator(true);
        })
        .catch(err => {
          console.warn("Error al intentar reproducir:", err);
        });
    } else {
      DOM.mainVideo.pause();
      if (DOM.backdropVideo) DOM.backdropVideo.pause();
      state.isPlaying = false;
      updatePlayPauseButton(false);
      triggerCenterPlayIndicator(false);
    }
  }

  function seekVideo(e) {
    const rect = DOM.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (DOM.mainVideo.duration) {
      const targetTime = Math.max(0, Math.min(pos * DOM.mainVideo.duration, DOM.mainVideo.duration));
      DOM.mainVideo.currentTime = targetTime;
      if (DOM.backdropVideo) DOM.backdropVideo.currentTime = targetTime;
    }
  }

  /* ==========================================================================
     12. PANTALLA COMPLETA & AUDIO
     ========================================================================== */
  function enterFullscreen() {
    const elem = DOM.videoStage || document.documentElement;
    if (elem.requestFullscreen) {
      return elem.requestFullscreen().catch(err => console.warn(err));
    } else if (elem.webkitRequestFullscreen) {
      return elem.webkitRequestFullscreen();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      enterFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.warn(err));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function updateFullscreenIcons() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const iconFsEnter = DOM.btnFullscreen.querySelector(".icon-fs-enter");
    const iconFsExit = DOM.btnFullscreen.querySelector(".icon-fs-exit");

    if (iconFsEnter && iconFsExit) {
      if (isFs) {
        iconFsEnter.style.display = "none";
        iconFsExit.style.display = "block";
        DOM.btnFullscreen.setAttribute("aria-label", "Salir de pantalla completa");
      } else {
        iconFsEnter.style.display = "block";
        iconFsExit.style.display = "none";
        DOM.btnFullscreen.setAttribute("aria-label", "Ver en pantalla completa");
      }
    }
  }

  function toggleMute() {
    DOM.mainVideo.muted = !DOM.mainVideo.muted;
    updateMuteIcons();
  }

  function updateMuteIcons() {
    const iconOn = DOM.btnMute.querySelector(".icon-volume-on");
    const iconOff = DOM.btnMute.querySelector(".icon-volume-off");
    if (DOM.mainVideo.muted) {
      if (iconOn) iconOn.style.display = "none";
      if (iconOff) iconOff.style.display = "block";
      DOM.btnMute.setAttribute("aria-label", "Activar sonido");
    } else {
      if (iconOn) iconOn.style.display = "block";
      if (iconOff) iconOff.style.display = "none";
      DOM.btnMute.setAttribute("aria-label", "Silenciar sonido");
    }
  }

  /* ==========================================================================
     13. CONTROL DE AUTO-DESVANECIMIENTO DE CONTROLES
     ========================================================================== */
  function resetControlsTimeout() {
    DOM.controlsBar.classList.remove("fade-controls");
    clearTimeout(state.controlsTimeout);

    if (state.isPlaying) {
      state.controlsTimeout = setTimeout(() => {
        DOM.controlsBar.classList.add("fade-controls");
      }, config.hideControlsDelay);
    }
  }

  /* ==========================================================================
     14. CANVAS DE FONDO ANIMADO Y CONFETI EMOTIVO
     ========================================================================== */
  let particles = [];
  const particleCanvas = DOM.ambientCanvas;
  const ctx = particleCanvas ? particleCanvas.getContext("2d") : null;

  function initParticles() {
    if (!particleCanvas || !ctx) return;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    particles = [];
    const count = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
    animateParticles();
  }

  function resizeCanvas() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  function createParticle(isBurst = false) {
    const isHeart = Math.random() > 0.65;
    return {
      x: isBurst ? window.innerWidth / 2 + (Math.random() - 0.5) * 200 : Math.random() * window.innerWidth,
      y: isBurst ? window.innerHeight / 2 + (Math.random() - 0.5) * 200 : Math.random() * window.innerHeight,
      size: Math.random() * (isHeart ? 14 : 3) + 2,
      speedX: (Math.random() - 0.5) * (isBurst ? 3 : 0.4),
      speedY: isBurst ? -(Math.random() * 2 + 1) : -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      color: Math.random() > 0.5 ? "232, 195, 116" : "248, 175, 195", // Oro o Rosa
      isHeart: isHeart,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    };
  }

  function drawHeart(c, x, y, size, opacity, colorStr, rot) {
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    c.beginPath();
    const d = size / 2;
    c.moveTo(0, d / 4);
    c.bezierCurveTo(0, 0, -d, 0, -d, d / 2);
    c.bezierCurveTo(-d, d, 0, d * 1.3, 0, d * 1.7);
    c.bezierCurveTo(0, d * 1.3, d, d, d, d / 2);
    c.bezierCurveTo(d, 0, 0, 0, 0, d / 4);
    c.fillStyle = `rgba(${colorStr}, ${opacity})`;
    c.shadowBlur = 8;
    c.shadowColor = `rgba(${colorStr}, 0.5)`;
    c.fill();
    c.restore();
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.isHeart) {
        drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color, p.rotation);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      }

      // Reiniciar partícula al salir de la pantalla
      if (p.y < -20 || p.x < -20 || p.x > particleCanvas.width + 20) {
        particles[i] = createParticle();
        particles[i].y = particleCanvas.height + 10;
      }
    }

    requestAnimationFrame(animateParticles);
  }

  function launchCelebrationEffect() {
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle(true));
    }
  }

  /* ==========================================================================
     15. REGISTRO DE EVENTOS
     ========================================================================== */
  function startSurprise(withFullscreen = false) {
    if (withFullscreen) {
      enterFullscreen();
    }
    DOM.introScreen.classList.add("cinematic-exit");
    setTimeout(() => {
      showScreen(DOM.videoSection);
      renderDots();
      loadAndPlayVideo(0);
    }, 700);
  }

  function setupEventListeners() {
    // 1. Botones de Inicio (Pantalla Completa vs Normal)
    if (DOM.btnStartFullscreen) {
      DOM.btnStartFullscreen.addEventListener("click", () => startSurprise(true));
    }
    if (DOM.btnStartNormal) {
      DOM.btnStartNormal.addEventListener("click", () => startSurprise(false));
    }

    // 2. Eventos del Elemento Video
    DOM.mainVideo.addEventListener("loadedmetadata", updateVideoOrientation);

    DOM.mainVideo.addEventListener("ended", () => {
      goToNextVideo();
    });

    DOM.mainVideo.addEventListener("timeupdate", () => {
      updateProgressBar();
      // Asegurar que el fondo desenfocado esté sincronizado
      if (DOM.backdropVideo && Math.abs(DOM.backdropVideo.currentTime - DOM.mainVideo.currentTime) > 0.4) {
        DOM.backdropVideo.currentTime = DOM.mainVideo.currentTime;
      }
    });

    DOM.mainVideo.addEventListener("play", () => {
      state.isPlaying = true;
      if (DOM.backdropVideo && DOM.backdropVideo.paused) {
        DOM.backdropVideo.play().catch(() => {});
      }
      updatePlayPauseButton(true);
      resetControlsTimeout();
    });

    DOM.mainVideo.addEventListener("pause", () => {
      state.isPlaying = false;
      if (DOM.backdropVideo && !DOM.backdropVideo.paused) {
        DOM.backdropVideo.pause();
      }
      updatePlayPauseButton(false);
      resetControlsTimeout();
    });

    DOM.mainVideo.addEventListener("error", (e) => {
      console.warn("Error en el video actual:", e);
      showErrorOverlay();
    });

    // Clic directo sobre el video para Play/Pausa
    DOM.mainVideo.addEventListener("click", togglePlayPause);

    // 3. Botones de Control
    DOM.btnPlayPause.addEventListener("click", togglePlayPause);
    DOM.btnNext.addEventListener("click", goToNextVideo);
    DOM.btnPrev.addEventListener("click", goToPrevVideo);
    DOM.btnMute.addEventListener("click", toggleMute);
    DOM.btnFullscreen.addEventListener("click", toggleFullscreen);
    DOM.btnErrorSkip.addEventListener("click", () => {
      hideErrorOverlay();
      goToNextVideo();
    });

    // 4. Barra de Progreso
    DOM.progressContainer.addEventListener("click", seekVideo);

    // 5. Reinicio
    DOM.btnRestart.addEventListener("click", restartExperience);

    // 6. Detección de Cambios de Pantalla Completa
    document.addEventListener("fullscreenchange", updateFullscreenIcons);
    document.addEventListener("webkitfullscreenchange", updateFullscreenIcons);

    // 7. Interacción del Teclado (Accesibilidad Desktop)
    document.addEventListener("keydown", (e) => {
      if (["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) return;
      if (!DOM.videoSection.classList.contains("active")) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNextVideo();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevVideo();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
      }
    });

    // 8. Auto-desvanecer controles al mover mouse o tocar pantalla
    ["mousemove", "touchstart", "touchmove"].forEach(evt => {
      window.addEventListener(evt, resetControlsTimeout, { passive: true });
    });
  }

  /* ==========================================================================
     16. ARRANQUE DEL PRELOADER
     ========================================================================== */
  function init() {
    applyConfig();
    updatePlayPauseButton(false);
    updateMuteIcons();
    updateFullscreenIcons();
    initParticles();
    setupEventListeners();

    // Desvanecer preloader elegantemente
    setTimeout(() => {
      DOM.preloader.classList.add("fade-out");
      setTimeout(() => {
        DOM.preloader.style.display = "none";
      }, 800);
    }, 900);
  }

  init();
});
