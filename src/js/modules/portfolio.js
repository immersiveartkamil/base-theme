document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Media query breakpoints
  const breakpoints = {
    desktop: window.matchMedia("(min-width: 1025px)"),
    tablet: window.matchMedia("(min-width: 769px) and (max-width: 1024px)"),
    mobile: window.matchMedia("(max-width: 768px)"),
  };

  // Group animation for portfolio
  function animatePortfolioGroup() {
    const items = document.querySelectorAll(".item");

    // Function to expand the hovered item and shrink others
    const expand = (hoveredItem) => {
      items.forEach((item) => {
        // Cancel any ongoing animation on this item
        gsap.killTweensOf(item);

        if (item === hoveredItem) {
          // Expand the hovered item with an elastic bounce effect
          gsap.to(item, {
            width: "55vw", // Expanded size
            opacity: 1,
            duration: 2, // Longer duration for a smooth bounce
            ease: "elastic(1, 0.5)", // Elastic easing for bounce effect
          });
        } else {
          // Shrink the other items
          gsap.to(item, {
            width: "4vw", // Shrinked size
            opacity: 0.8,
            duration: 0.8, // Shorter duration to quickly respond
            ease: "power2.out", // Smooth ease-out to contrast with bounce
          });
        }
      });
      hoveredItem.clicked = !hoveredItem.clicked; // Toggle click state
    };

    // Function to reset all items to default size
    const contractAll = () => {
      items.forEach((item) => {
        gsap.killTweensOf(item); // Stop any ongoing animation
        gsap.to(item, {
          width: "15vw", // Default width
          opacity: 0.8, // Default opacity
          duration: 2.2,
          ease: "elastic(1, 0.5)", // Gentle bounce back to original size
        });
        item.clicked = false; // Reset clicked state
      });
    };

    // Add hover and leave event listeners to items
    items.forEach((item) => {
      item.clicked = false; // Track click state
      item.addEventListener("mouseenter", () => expand(item)); // Expand item on hover
      item.addEventListener("mouseleave", () => contractAll()); // Contract all items on mouseleave
    });

    document.addEventListener("mouseleave", contractAll); // Contract all items when mouse leaves the container
  }

  // Portfolio animations for desktop
  function animateDesktop() {
    animatePortfolioGroup();
  }

  // Portfolio animations for tablet
  function animateTablet() {
    animatePortfolioGroup();
  }

  // Portfolio animations for mobile with Slick slider
  function animateMobile() {
    function initializeSlickSlider() {
      if (!$(".group").hasClass("slick-initialized")) {
        $(".group").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true, // Pozwala na elastyczną szerokość każdego slajdu
          swipeToSlide: true, // Umożliwia płynne przewijanie slajdów
          arrows: true,
          dots: false, // Opcjonalnie, można dodać nawigację kropkową
        });
      } else if ($(".group").hasClass("slick-initialized")) {
        $(".group").slick("unslick");
      }
    }

    // Set up scroll-triggered animations
    initializeSlickSlider();

    window.addEventListener("resize", initializeSlickSlider); // Reinitialize on resize
  }
  // Initialize animations based on screen size
  function initAnimations() {
    if (breakpoints.desktop.matches) {
      animateDesktop();
    } else if (breakpoints.tablet.matches) {
      animateTablet();
    } else if (breakpoints.mobile.matches) {
      animateMobile();
    }
  }

  // Reinitialize animations when screen size changes
  Object.values(breakpoints).forEach((mq) =>
    mq.addEventListener("change", initAnimations)
  );

  // Initial call
  initAnimations();
});
