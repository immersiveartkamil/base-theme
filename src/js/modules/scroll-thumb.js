document.addEventListener("DOMContentLoaded", function () {
  const scrollThumb = document.getElementById("scroll-thumb");
  const scrollbar = document.querySelector(".custom-scrollbar");

  // Ensure both the scroll thumb and scrollbar are found
  if (!scrollThumb || !scrollbar) {
    console.error("Scroll thumb or scrollbar elements not found.");
    return;
  }

  let lastScrollY = 0;
  let isDragging = false;
  let startY = 0;
  let startScrollY = 0;

  // Function to calculate necessary dimensions and update the scroll thumb position
  function updateScrollThumb() {
    const scrollbarHeight = scrollbar.offsetHeight;
    const scrollThumbHeight = scrollThumb.offsetHeight;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Ensure valid calculations
    if (documentHeight > 0 && scrollbarHeight > 0 && scrollThumbHeight > 0) {
      const thumbMaxTravel = scrollbarHeight - scrollThumbHeight;

      // Calculate the thumb position based on the Lenis scroll position
      const thumbPos = (lastScrollY / documentHeight) * thumbMaxTravel;

      // Update thumb position with gsap for smooth animation
      gsap.to(scrollThumb, {
        y: thumbPos,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }

  // Use requestAnimationFrame to smoothly update the scroll thumb
  function animateScrollThumb() {
    updateScrollThumb();
    requestAnimationFrame(animateScrollThumb);
  }

  // Start the animation loop for the scroll thumb
  animateScrollThumb();

  // Listen to Lenis's scroll event to update the lastScrollY value
  lenis.on("scroll", ({ scroll }) => {
    if (!isDragging) {
      lastScrollY = scroll; // Update the scroll position from Lenis
    }
  });

  // Update on window resize as well
  window.addEventListener("resize", () => {
    updateScrollThumb();
  });

  // Handle mouse down event on the scroll thumb
  scrollThumb.addEventListener("mousedown", (event) => {
    isDragging = true;
    startY = event.clientY;
    startScrollY = lastScrollY;
    document.body.style.userSelect = "none"; // Prevent text selection
    document.body.style.cursor = "grabbing"; // Ensure grabbing cursor is visible
  });

  // Handle mouse move event for dragging
  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaY = event.clientY - startY;
      const scrollbarHeight = scrollbar.offsetHeight;
      const scrollThumbHeight = scrollThumb.offsetHeight;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Ensure valid calculations
      if (documentHeight > 0 && scrollbarHeight > 0 && scrollThumbHeight > 0) {
        const thumbMaxTravel = scrollbarHeight - scrollThumbHeight;
        const scrollDelta = (deltaY / thumbMaxTravel) * documentHeight;
        lastScrollY = startScrollY + scrollDelta;

        // Scroll the page
        window.scrollTo(0, lastScrollY);
      }
    }
  });

  // Handle mouse up event to stop dragging
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = ""; // Restore text selection
      document.body.style.cursor = ""; // Restore default cursor
    }
  });
});
