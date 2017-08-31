/**
 * Created by Juuso Pakarinen on 24/08/2017.
 */

(function () {

  'use strict';

  function scrollToDiv(destination, duration, callback) {
    const startPosition = window.pageYOffset;
    const startTime = new Date().getTime();
    const destinationOffset = destination.offsetTop;

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

  function checkSkillImagesInView(windowTop) {
    const windowBottom = windowTop + window.innerHeight;
    const elementTop = skillContainer.offsetTop;
    const elementBottom = elementTop + skillContainer.offsetHeight;

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

  function handleScroll() {
    var windowTop = window.pageYOffset;
    var header = document.getElementsByClassName("header")[0];
    var headerHeight = header.offsetHeight;

    // Hide or show header after certain amount of scrolling
    if(Math.abs(lastWindowTop - windowTop) <= hideThreshold) return;

    if ((windowTop > lastWindowTop) && (windowTop > headerHeight)) {
      header.className = "header headerHidden";
    } else {
      header.className = "header";
    }

    lastWindowTop = windowTop;
    checkSkillImagesInView(windowTop);
  }

  function initializeEye() {
    var iris = document.createElement("div");
    var spot = document.createElement("span");

    iris.className = "iris";
    iris.appendChild(spot);
    eyeContainer.appendChild(iris);

    return {iris: iris, spot: spot};
  }

  function fixEyeToCursor(event) {
    var x = event.pageX;
    var y = event.pageY;
    var offsets = eye.spot.getBoundingClientRect();
    var left = (offsets.left - x);
    var top = (offsets.top - y);
    var rad = Math.atan2(top, left);

    eye.iris.style.transform = "rotate(" + rad + "rad)";
    eye.iris.style.webkitTransform = "rotate(" + rad + "rad)";
  }

  var links = document.getElementsByClassName("headerLink");
  var eyeContainer = document.getElementsByClassName("eyeContainer")[0];
  var eye = initializeEye();
  var skillContainer = document.getElementsByClassName("skillContainer")[0];
  var skillElements = document.getElementsByClassName("skill");

  var lastWindowTop = 0;
  var hideThreshold = 10;

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
  
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", checkSkillImagesInView);
  window.addEventListener("mousemove", fixEyeToCursor);

})();