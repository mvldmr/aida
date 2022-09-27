export function setupAnimation(elements: HTMLElement[]) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animEl = entry.target;
        animEl.classList.add('anim-active');
        observer.unobserve(animEl);
      }
    })
  });
  elements.forEach((el) => {
    observer.observe(el);
  })
}
