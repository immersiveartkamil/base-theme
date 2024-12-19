document.addEventListener("DOMContentLoaded", () => {
  const interactiveBlob = document.querySelector("#interactive-blob");
  const blobs = document.querySelectorAll(".blob:not(#interactive)");

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const easing = 0.02;

  // Track mouse movement
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    // Interactive blob follows cursor with easing
    const deltaX = mouseX - currentX;
    const deltaY = mouseY - currentY;
    currentX += deltaX * easing;
    currentY += deltaY * easing;

    interactiveBlob.setAttribute("cx", currentX);
    interactiveBlob.setAttribute("cy", currentY);

    requestAnimationFrame(animate);
  }

  animate();
});
