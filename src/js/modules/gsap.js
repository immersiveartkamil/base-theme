gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const servicesHeader = document.querySelector(".services__header");
  const services = document.querySelectorAll(".service");

  if (servicesHeader && services.length > 0) {
    // Pin the services header
    ScrollTrigger.create({
      trigger: servicesHeader,
      start: "top 30%",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    // Animate each service element
    services.forEach((service) => {
      gsap.fromTo(
        service,
        {
          opacity: 0,
          y: 50,
          rotateX: 50,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service,
            start: "top 90%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });
  }
});
