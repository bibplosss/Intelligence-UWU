function initializeScrollReveal() {
  const sections = document.querySelectorAll('main section');
  if (!sections.length) return;

  sections.forEach((section) => section.classList.add('scroll-reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observerRef.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      sections.forEach((section) => {
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
  }
}

document.addEventListener('DOMContentLoaded', initializeScrollReveal);
