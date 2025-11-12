/**
 * Hero Carousel Component
 * Maneja la funcionalidad del carrusel del hero
 */

class HeroCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.carousel-slide');
    this.dots = document.querySelectorAll('.carousel-dot');
    this.prevButton = document.querySelector('.carousel-control--prev');
    this.nextButton = document.querySelector('.carousel-control--next');
    this.autoPlayInterval = null;
    this.autoPlayDelay = 7000; // 7 segundos - más lento

    this.init();
  }

  init() {
    if (!this.slides.length) return;

    // Event listeners para controles
    this.prevButton?.addEventListener('click', () => this.prevSlide());
    this.nextButton?.addEventListener('click', () => this.nextSlide());

    // Event listeners para indicadores - detiene el auto-play al hacer clic
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.pauseAutoPlay(); // Detener auto-play al seleccionar manualmente
      });
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Pausar auto-play al hacer hover
    const carouselContainer = document.querySelector('.hero-carousel');
    carouselContainer?.addEventListener('mouseenter', () => this.pauseAutoPlay());
    carouselContainer?.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch/swipe support
    this.addTouchSupport();

    // Iniciar auto-play
    this.startAutoPlay();

    // Mostrar primer slide
    this.showSlide(this.currentSlide);
  }

  showSlide(index) {
    // Normalizar índice
    if (index >= this.slides.length) {
      this.currentSlide = 0;
    } else if (index < 0) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this.currentSlide = index;
    }

    // Actualizar slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentSlide);
    });

    // Actualizar indicadores
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
    this.resetAutoPlay();
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.showSlide(index);
    // No reiniciar auto-play cuando se selecciona manualmente
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  addTouchSupport() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    this.handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe izquierda - siguiente slide
          this.nextSlide();
        } else {
          // Swipe derecha - slide anterior
          this.prevSlide();
        }
      }
    };
  }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new HeroCarousel();
});

// Prevenir problemas si se usa con module
export default HeroCarousel;
