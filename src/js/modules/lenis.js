window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// Main script where Lenis is initialized and globally accessible
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lenis and make it globally accessible
  window.lenis = new Lenis({
    smooth: false,
    direction: "vertical",
    smoothTouch: false,
  });

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  function handleSmoothScroll(e) {
    e.preventDefault();

    const fullHref = this.getAttribute("href");
    const targetPath = fullHref.split("/").filter(Boolean).pop();
    const targetElement = document.getElementById(targetPath);

    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;

      // Adjust scroll position by offset (e.g., -100 pixels)
      const adjustedPosition = targetPosition - 300; // Adjust as needed

      // Smooth scroll to the adjusted position
      lenis.scrollTo(adjustedPosition);
    }
  }

  document.querySelectorAll(".menu-item a").forEach((anchor) => {
    anchor.addEventListener("click", handleSmoothScroll);
  });
  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
