/**
 * Created by Juuso Pakarinen on 24/08/2017.
 */

(function () {

  'use strict';

  function scrollToDiv(destination, duration, callback) {
    const startPosition = window.pageYOffset;
    const startTime = new Date().getTime();

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;

    const destinationOffset = Math.round(
      documentHeight - destination.offsetTop < windowHeight ?
        documentHeight - windowHeight : destination.offsetTop
    );

    if ('requestAnimationFrame' in window === false) {
      window.scrollTo(0, destinationOffset);
      if (callback) callback();
      return null;
    }

    function scroll() {
      const now = new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      window.scroll(0, Math.ceil((time * (destinationOffset - startPosition)) + startPosition));

      if (window.pageYOffset === destinationOffset) {
        if (callback) callback();
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  }

  function checkSkillImagesInView() {
    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.innerHeight;
    const elementTop = skillsContainer.offsetTop;
    const elementBottom = elementTop + skillsContainer.offsetHeight;

    if (elementTop <= windowBottom && elementBottom >= windowTop ) {
      for (var i = 0; i < skillElements.length; i++) {
        var rnd = Math.floor(Math.random() * 3);

        switch (rnd) {
          case 1:
            skillElements[i].className += " bounceInSlow";
            break;
          case 2:
            skillElements[i].className += " bounceInFast";
            break;
          default:
            skillElements[i].className += " bounceInNormal";
            break;
        }
      }
    }
  }

  var links = document.getElementsByClassName("headerLink");

  links[0].addEventListener("click", function () {
    scrollToDiv(document.getElementById("about"), 280, null);
  });
  links[1].addEventListener("click", function () {
    scrollToDiv(document.getElementById("projects"), 280, null);
  });
  links[2].addEventListener("click", function () {
    scrollToDiv(document.getElementById("skills"), 280, null);
  });
  links[3].addEventListener("click", function () {
    scrollToDiv(document.getElementById("about"), 280, null);
  });

  var skillsContainer = document.getElementById("skillContainer");
  var skillElements = document.getElementsByClassName("skill");
  window.addEventListener("scroll", checkSkillImagesInView);
  window.addEventListener("resize", checkSkillImagesInView);

})();
