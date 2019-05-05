// Hamburger menù
document.addEventListener('DOMContentLoaded', () => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

// Scroll to Top
document.addEventListener('DOMContentLoaded', () => {
  var btnTop = document.querySelector('#return-to-top');

  var btnReveal = function () {
    if (window.scrollY >= 300) {
      btnTop.classList.add('is-visible');
    } else {
      btnTop.classList.remove('is-visible');
    }
  }

  var topscrollTo = function () {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 140);
        topscrollTo();
      }, 5);
    }
  }
  // Listeners
  window.addEventListener('scroll', btnReveal);
  btnTop.addEventListener('click', topscrollTo);

});

// Modal
document.addEventListener('DOMContentLoaded', () => {
  var modals = document.querySelectorAll('a.open-modal')

  modals.forEach(function (i) {

    i.addEventListener('click', function (event) {
      event.preventDefault();
      var modal = document.querySelector('#video-modal');
      var url = this.getAttribute('data');

      var html = document.querySelector('html');
      modal.classList.add('is-active');
      html.classList.add('is-clipped');

      document.querySelector('#src-video-modal').src = url;

      modal.querySelector('.modal-background').addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
      });

      modal.querySelector('.modal-close').addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
      });

    });
  });
});