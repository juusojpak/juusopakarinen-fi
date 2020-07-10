(function () {

  'use strict';

  function checkSectionInViewport() {
    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.innerHeight;
    const sections = ["about", "frontend", "backend", "mobile", "contact"];

    for (const section of sections) {
      const element = document.getElementById(section);
      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;
      const elementInViewport = elementTop <= windowBottom && elementBottom >= windowTop
      element.className = elementInViewport ? "show" : "hide"
      if (windowTop === 0 && section === 'about') element.className = "hide"
    }
  }

  window.addEventListener("scroll", checkSectionInViewport);
  window.addEventListener("resize", checkSectionInViewport);
})();
