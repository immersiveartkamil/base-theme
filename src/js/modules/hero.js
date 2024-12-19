export default class Hero {
  constructor() {
    this.badges = document.querySelectorAll(".hero__badge-number");
    this.init();
  }

  init() {
    this.animateNumbers();
  }

  animateNumbers() {
    this.badges.forEach((badge) => {
      const targetNumber = parseInt(badge.getAttribute("data-target"));
      const duration = 2000; // Animation duration in ms
      const startTime = performance.now();
      const startValue = 0;

      const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);

        const currentValue = Math.floor(
          startValue + (targetNumber - startValue) * easeOutQuad
        );
        badge.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      };

      requestAnimationFrame(updateNumber);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const badges = document.querySelectorAll(".hero__badge-number");

  if (badges.length > 0) {
    badges.forEach((badge) => {
      const targetNumber = parseInt(badge.getAttribute("data-target"));
      const duration = 2000; // Animation duration in ms
      const startTime = performance.now();
      const startValue = 0;

      const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);

        const currentValue = Math.floor(
          startValue + (targetNumber - startValue) * easeOutQuad
        );
        badge.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      };

      requestAnimationFrame(updateNumber);
    });
  } else {
    console.log("No badges found");
  }
});
