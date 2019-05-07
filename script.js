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

// Media carousel
document.addEventListener("videosLoaded", () => {
  bulmaCarousel.attach('#video-carousel', {
    slidesToScroll: 1,
    slidesToShow: 4
  });
});

// People loaded
document.addEventListener("videosLoaded", () => {
  bulmaCarousel.attach('#project-list', {
    slidesToScroll: 1,
    slidesToShow: 4
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
  loadJSON(function (response) {
    var projectHTML = document.querySelector('#project-list');
    var projectList = JSON.parse(response)

    projectList.array.forEach(function (project) {
      content = `
        <div class="column is-offset-1">
        <article class="card">
            <div class="card-image">
            <a class="open-modal open-project" title="` + project.name + `">
                <figure class="image is-4by3">
                    `;


      if (project.logo) {
        content += `
            <img src="` + project.thumbnail + `"
            alt="` + project.name + ` image" class="thumb-logo">
          `;
      } else {
        content += `
            <img src="` + project.thumbnail + `"
            alt="` + project.name + ` image" class="thumb-img">
          `;
      }

      content += `
                  </figure>
                </a>
            </div>
            <div class="card-content">
                <p class="title is-5">` + project.name + `</p>
                <p class="subtitle is-6">` + project.abstract + `</p>
                <p><span class="tag is-dark">Budget: ` + project.budget + `€</span> </p>
                <p><span class="tag is-dark">From ` + project.from + ` to ` + project.to + ` </span></p>
            </div>
        </article>
    </div>
        `;

      projectHTML.innerHTML += content;
    });

    document.dispatchEvent(new Event("projectsLoaded"));

  }, 'data/projects.json');
});

// Load people
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function (response) {
    var peopleHTML = document.querySelector('#people-list');
    var peopleList = JSON.parse(response)

    peopleList.array.forEach(function (person) {
      content = `<div class="column is-3">
        <figure class="image peoplecard">
            <img src="` + person.photo + `" alt="` + person.name + ` photo" srcset="" class="is-rounded">
            <figcaption>
                <h3 class="has-text-weight-semibold is-size-5 has-text-white">` + person.name + `</h3>
                <p class="has-text-white">` + person.role + `</p>`;

      if (person.linkedin != "") {
        content += `
          <a href="` + person.linkedin + `" title="linkedin" target="_blank" class="has-text-light"><i class="fab fa-linkedin"></i></a>
          `;
      }

      if (person.twitter != "") {
        content += `
          <a href="` + person.twitter + `" title="twitter" target="_blank" class="has-text-light"><i class="fab fa-twitter-square"></i></a>
          `;
      }

      if (person.facebook != "") {
        content += `
          <a href="` + person.facebook + `" title="facebook" target="_blank" class="has-text-light"><i class="fab fa-facebook-square"></i></a>
          `;
      }

      if (person.github != "") {
        content += `
            <a href="` + person.github + `" title="github" target="_blank" class="has-text-light"><i class="fab fa-github-square"></i></a>
          `;
      }

      if (person.website != "") {
        content += `
              <a href="` + person.website + `" title="personal website" target="_blank" class="has-text-light"><i class="fas fa-globe"></i></a>
            `;
      }
      content += `          
                </figcaption>
              </figure>
          </div>
        `;

      peopleHTML.innerHTML += content;
    });


  }, 'data/people.json');
});

// Load Media
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function (response) {
    var mediaHTML = document.querySelector('#video-carousel');
    var videoList = JSON.parse(response)

    videoList.array.forEach(function (video) {
      content = `
      <div class="column"
      <div class="card">
      <div class="card-image">
          <figure class="image video-container is-16by9">
              <a class="open-modal" data="https://www.youtube.com/embed/` + video.id + `?autoplay=1">
                  <img src="https://img.youtube.com/vi/` + video.id + `/maxresdefault.jpg" alt="" srcset="">
              </a>
          </figure>
      </div>
      <div class="card-content">
          <div class="title is-5">
            ` + video.title + `
          </div>
          <div class="subtitle is-6">
          ` + video.abstract + `
          </div>
      </div>
  </div>
</div>
        `;

        mediaHTML.innerHTML += content;
    });

    document.dispatchEvent(new Event("videosLoaded"));

  }, 'data/videos.json');
});

// Modal
document.addEventListener("projectsLoaded", () => {
  document.addEventListener("videosLoaded", () => {
    var modals = document.querySelectorAll('a.open-modal')

    loadJSON(function (response) {
      var projectList = JSON.parse(response)

      modals.forEach(function (i) {

        i.addEventListener('click', function (event) {
          event.preventDefault();

          var isProject = i.classList.contains("open-project")

          if (isProject) {
            // Project Modal
            var modal = document.querySelector('#project-modal');
            var name = this.getAttribute('title');

            projectList.array.forEach(function (project) {
              if (project.name == name) {
                // Card img
                modal.querySelector(".card-image img").src = project.thumbnail;

                if (project.logo) {
                  modal.querySelector(".card-image img").classList = ("thumb-logo");
                } else {
                  modal.querySelector(".card-image img").classList = ("thumb-img");
                }


                modal.querySelector(".title").innerHTML = name;
                modal.querySelector(".budget").innerHTML = project.budget;
                modal.querySelector(".from").innerHTML = project.from;
                modal.querySelector(".to").innerHTML = project.to;
                modal.querySelector(".website").href = project.link;
                modal.querySelector(".content").innerHTML = project.text;
              }
            });

          } else {
            //  Media Modal
            var modal = document.querySelector('#video-modal');
            var url = this.getAttribute('data');

            document.querySelector('#src-video-modal').src = url;
          }

          var html = document.querySelector('html');
          modal.classList.add('is-active');
          html.classList.add('is-clipped');

          modal.querySelector('.modal-background').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('is-active');
            html.classList.remove('is-clipped');

            if (!isProject) {
              modal.querySelector('#src-video-modal').src = "";
            }
          });

          modal.querySelector('.modal-close').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('is-active');
            html.classList.remove('is-clipped');

            if (!isProject) {
              modal.querySelector('#src-video-modal').src = "";
            }
          });

        });
      });
    }, 'data/projects.json');
  });
});

// Tabs

document.addEventListener('DOMContentLoaded', () => {
  const TABS = document.querySelectorAll('.tabs li');
  const CONTENT = document.querySelectorAll('#tab-content .tab');

  TABS.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      let selected = tab.getAttribute('data-tab');
      updateActiveTab(tab);
      updateActiveContent(selected);
    });
  });

  function updateActiveTab(selected) {
    TABS.forEach((tab) => {
      if (tab && tab.classList.contains('is-active')) {
        tab.classList.remove('is-active');
      }
    });

    selected.classList.add('is-active');
  }
  
  function updateActiveContent(selected) {
    CONTENT.forEach((item) => {
      if (item && item.classList.contains('is-active')) {
        item.classList.remove('is-active');
      }
      let data = item.getAttribute('data-content');
      if (data === selected) {
        item.classList.add('is-active');
      }
    });
  }
});