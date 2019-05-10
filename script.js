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

  // Listeners
  window.addEventListener('scroll', btnReveal);
});

// Media carousel
document.addEventListener("videosLoaded", () => {
  bulmaCarousel.attach('#video-carousel', {
    slidesToScroll: 1,
    slidesToShow: 4,
    navigationSwipe: true
  });
});

// People loaded
document.addEventListener("videosLoaded", () => {
  bulmaCarousel.attach('#project-list', {
    slidesToScroll: 1,
    slidesToShow: 3,
    navigationSwipe: true
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

// Load projects
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function (response) {
    var projectHTML = document.querySelector('#project-list');
    var projectList = JSON.parse(response)

    projectList.array.forEach(function (project) {
      var content = `
        <div class="column is-offset-1">
        <article class="card has-ribbon">`;

      if (project.ended) {
        content += `<div class="ribbon is-warning">Ended</div>`;
      } else {
        content += `<div class="ribbon is-success">Ongoing</div>`;
      }

      content += `
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

    var countPeople = 0;
    var totalContent = "";

    peopleList.array.forEach(function (person) {
      countPeople++;

      if (countPeople == 1) {
        var content = `<div class="columns is-centered has-text-centered">`;
      } else if (countPeople % 4 == 0) {
        var content = `</div><div class="columns is-centered has-text-centered">`;
      } else {
        var content = "";
      }

      content += `<div class="column is-3">
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

      totalContent += content;
    });

    peopleHTML.innerHTML = totalContent;


  }, 'data/people.json');
});

// Variable for news
const newsForRow = 3;
const newsForPage = 6;

// Create News HTML
function createNewsContent(start, end) {
  loadJSON(function (response) {
    var mediaHTML = document.querySelector('#news-list');
    var newsList = JSON.parse(response);
    end--; //Count start from 0

    var newsCount = 0;

    newsList.array.forEach(function (news) {
      if (newsCount >= start && newsCount <= end) {
        if (newsCount % newsForRow == 0 || newsCount == 0) {
          var content = `<div class="column is-3 has-ribbon-bottom">`;
        } else {
          var content = `<div class="column is-offset-1 is-3 has-ribbon-bottom">`;
        }

        content += `
                      <a href="` + news.link + `" target="_blank">
                          <div class="ribbon is-dark">` + news.link.match("^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)")[1] + `</div>
                          <h3 class="title is-size-5">` + news.title + `</h3> 
                          <p class="subtitle is-size-6">` + news.abstract + `</p><br>
                      </a>
                  </div>`;

        mediaHTML.innerHTML += content;
      }

      newsCount++;
    });
  }, 'data/news.json');
}

// Load News
document.addEventListener('DOMContentLoaded', () => {
  createNewsContent(0, newsForPage);
});

// Create pagination
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function (response) {
    var newsList = JSON.parse(response);
    var paginationHTML = document.querySelector('#news-pagination');
    var totalPages = Math.ceil(newsList.array.length / 6);

    for (var i = 2; i <= totalPages; i++) {
      paginationHTML.innerHTML += `<li><a class="pagination-link" aria-label="Goto page ` + i + `" go-to="` + i + `">` + i + `</a></li>`;
    }

    document.dispatchEvent(new Event("paginationLoaded"));

  }, 'data/news.json');
});

// Update news and pagination
document.addEventListener("paginationLoaded", () => {
  var pages = document.querySelectorAll('#news-pagination .pagination-link');

  Array.from(pages).forEach(function (element) {
    element.addEventListener("click", function () {
      Array.from(pages).forEach(function (element) {
        element.classList.remove('is-current');
      });

      document.querySelector('#news-list').innerHTML = "";

      // Eg. for page 2 and 6 news: 5 * (2-1) = start from news 5, 5*2 = end news 10
      createNewsContent(newsForPage * (this.getAttribute('go-to') - 1), newsForPage * this.getAttribute('go-to'));

      element.classList.add("is-current");
    });
  });
});

// Load Media
document.addEventListener('DOMContentLoaded', () => {
  loadJSON(function (response) {
    var mediaHTML = document.querySelector('#video-carousel');
    var videoList = JSON.parse(response)

    videoList.array.forEach(function (video) {
      var content = `
      <div class="column"
      <div class="card">
      <div class="card-image">
          <figure class="image video-container is-16by9">
              <a class="open-modal" data="https://www.youtube.com/embed/` + video.id + `?autoplay=1">
                  <img src="`;
      if (video.thumbnail == "") {
        content += "https://img.youtube.com/vi/" + video.id + "/maxresdefault.jpg";
      } else {
        content += video.thumbnail;
      }


      content += `" alt="" srcset="">
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

                if (project.link != "") {
                  modal.querySelector("#website").classList.remove("is-display-none")
                  modal.querySelector("#website").href = project.link;
                } else {
                  modal.querySelector("#website").classList.add("is-display-none");
                }

                if (project.ended) {
                  modal.querySelector("#ongoing").classList.add("is-display-none")
                  modal.querySelector("#ended").classList.remove("is-display-none")
                } else {
                  modal.querySelector("#ongoing").classList.remove("is-display-none")
                  modal.querySelector("#ended").classList.add("is-display-none")
                }

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