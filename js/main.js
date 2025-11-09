// ===========================================================
// CS Engenharia — Scripts Otimizados
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu Mobile Acessível ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '✕' : '☰'; // Alterna ícone
    });
  }

  // --- Animação de Scroll (Intersection Observer) ---
  // Mais performático que ouvir o evento 'scroll'
  const fadeElements = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Para de observar após aparecer
    });
  }, appearOptions);

  fadeElements.forEach(el => appearOnScroll.observe(el));

  // --- Filtros de Portfólio ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
             // Pequeno timeout para permitir a animação de entrada se desejar adicionar
            setTimeout(() => item.style.opacity = '1', 50);
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      });
    });
  }

  // --- Lightbox Simples (Opcional, se mantiver) ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxVideo = document.getElementById('lightbox-video');
      const closeBtn = lightbox.querySelector('.close');

      document.querySelectorAll('.portfolio-item').forEach(item => {
          item.addEventListener('click', (e) => {
              // Evita abrir se clicar em links dentro do item, se houver
              if (e.target.tagName === 'A') return;

              const img = item.querySelector('img');
              const video = item.querySelector('video');

              if (img) {
                  lightboxImg.src = img.src;
                  lightboxImg.style.display = 'block';
                  if (lightboxVideo) lightboxVideo.style.display = 'none';
              } else if (video) {
                   if (lightboxVideo) {
                      lightboxVideo.src = video.src;
                      lightboxVideo.style.display = 'block';
                   }
                   lightboxImg.style.display = 'none';
              }
              lightbox.classList.add('active');
          });
      });

      // Fechar Lightbox
      if (closeBtn) {
          closeBtn.addEventListener('click', () => {
              lightbox.classList.remove('active');
              if (lightboxVideo) lightboxVideo.pause();
          });
      }
      lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
              lightbox.classList.remove('active');
              if (lightboxVideo) lightboxVideo.pause();
          }
      });
  }
});