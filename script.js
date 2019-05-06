// Hamburger menu
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
        window.scrollTo(0, window.scrollY - 200);
        topscrollTo();
      }, 5);
    }
  }
  // Listeners
  window.addEventListener('scroll', btnReveal);
  btnTop.addEventListener('click', topscrollTo);

});

// Video Modal
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

// Json management
function loadJSON(callback, path) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Load project
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function(response) {
      var projectHTML = document.querySelector('#project-list');
      var projectList = JSON.parse(response)

      projectList.array.forEach(function(project) {
        content = `
        <div class="column is-offset-1">
        <article class="card">
            <div class="card-image">
                <figure class="image is-4by3">`;
                    

        if (project.logo){
          content +=`
            <img src="` + project.thumbnail + `"
            alt="` + project.name + ` image" class="thumb-logo">
          `;
        } else {
          content +=`
            <img src="` + project.thumbnail + `"
            alt="` + project.name + ` image" class="thumb-img">
          `;
        }

        content += `
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-5">` + project.name + `</p>
                <p class="subtitle is-6">` + project.abstract + `</p>
                <p><span class="tag is-dark">Budget: 14213€</span> </p>
                <p><span class="tag is-dark">From 2018 to 2019 </span></p>
            </div>
        </article>
    </div>
        `;

        projectHTML.innerHTML += content;
      });

  }, 'data/projects.json');
});

// Load people
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function(response) {
      var peopleHTML = document.querySelector('#people-list');
      var peopleList = JSON.parse(response)

      peopleList.array.forEach(function(person) {
        content = `<div class="column is-3">
        <figure class="image peoplecard">
            <img src="` + person.photo + `" alt="` + person.name + ` photo" srcset="" class="is-rounded">
            <figcaption>
                <h3 class="has-text-weight-semibold is-size-5 has-text-white">` + person.name + `</h3>
                <p class="has-text-white">` + person.role + `</p>
                <a href="` + person.linkedin + `" title="linkedin"><i class="fab fa-linkedin"></i></a>
                <a href="` + person.twitter + `" title="twitter"><i class="fab fa-twitter-square"></i></a>
                <a href="` + person.facebook + `" title="facebook"><i class="fab fa-facebook-square"></i></a>`;

        if(person.github != "none"){
          content += `
            <a href="` + person.github + `" title="github"><i class="fab fa-github-square"></i></a>
          `;
        }

        content += `
              <a href="` + person.website + `" title="personal website"><i class="fas fa-globe"></i></a>
                  </figcaption>
              </figure>
          </div>
        `;

        peopleHTML.innerHTML += content;
      });

      bulmaCarousel.attach('#project-list', {
        slidesToScroll: 1,
        slidesToShow: 4
      });

  }, 'data/people.json');
});