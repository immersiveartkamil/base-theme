document.addEventListener("DOMContentLoaded", () => {
  const headerMenu = document.querySelector("header");

  let lastScrollTop = 0;
  let isScrollingDown = false;
  let isScrollingUp = false;
  const headerHeight = headerMenu.offsetHeight; // Get the height of the header

  // Detect scroll direction and toggle header visibility
  window.addEventListener("scroll", function () {
    let currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop; // Use modern scroll detection

    // Prevent the menu from hiding when at the top of the page
    if (currentScroll <= 0) {
      gsap.to(headerMenu, { y: "0%", duration: 0.5, ease: "power2.out" });
      return;
    }

    if (currentScroll > lastScrollTop && !isScrollingDown) {
      // Scrolling down
      gsap.to(headerMenu, {
        y: `-${headerHeight}px`,
        duration: 0.5,
        ease: "power2.out",
      }); // Hide the menu
      isScrollingDown = true;
      isScrollingUp = false;
    } else if (currentScroll < lastScrollTop && !isScrollingUp) {
      // Scrolling up
      gsap.to(headerMenu, { y: "0%", duration: 0.5, ease: "power2.out" }); // Show the menu
      isScrollingDown = false;
      isScrollingUp = true;
    }

    lastScrollTop = currentScroll; // Update last scroll position
  });

  // Menu script (remains unchanged)
  window.addEventListener("load", function () {
    //Menu script
    const hamburger = document.querySelector(".mobile-hamburger");
    const mobileMenu = document.querySelector(".custom-menu");
    const subMenuItem = document.querySelectorAll(".menu-item-has-children");
    const headerMenu = document.querySelector("header");
    const headerlinks = document.querySelectorAll("header ul .menu-item a");

    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("menu-active");
    });

    headerlinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("menu-active")) {
          mobileMenu.classList.remove("menu-active");
        }
      });
    });

    subMenuItem.forEach((sub) => {
      sub.addEventListener("click", function (e) {
        const subMenu = this.querySelector(".sub-menu");
        subMenu.classList.toggle("active");
        e.stopPropagation();
      });
    });

    document.addEventListener("click", () => {
      const activeSubMenus = document.querySelectorAll(".sub-menu.active");
      activeSubMenus.forEach((subMenu) => {
        subMenu.classList.remove("active");
      });
    });

    function uStickyMenu() {
      if (window.pageYOffset >= 120) {
        headerMenu.classList.add("go-white");
        headerlinks.forEach((el) => {
          el.classList.add("go-black");
        });
      } else {
        headerMenu.classList.remove("go-white");
        headerlinks.forEach((el) => {
          el.classList.remove("go-black");
        });
      }
    }

    window.addEventListener("scroll", uStickyMenu);
  });
});
