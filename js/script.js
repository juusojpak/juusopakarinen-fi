/**
 * Created by Juuso Pakarinen on 24/08/2017.
 */

(function () {

  'use strict';

  function scrollToDiv(destination, duration, callback) {
    const start = window.pageYOffset;
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
      window.scroll(0, Math.ceil((time * (destinationOffset - start)) + start));

      if (window.pageYOffset === destinationOffset) {
        if (callback) callback();
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
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

})();
