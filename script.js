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

  // Listener
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
function loadJSON(path) {
  return new Promise(function (resolve, reject) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        resolve(xobj.responseText);
      }
    };
    xobj.send(null);
  });
}

// Load projects
document.addEventListener('DOMContentLoaded', () => {
  loadJSON('data/projects.json').then(function (response) {
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
                <p class="subtitle is-6 has-text-justified">` + project.abstract + `</p>
                <p><span class="tag is-dark">Budget: ` + project.budget + `€</span> </p>
                <p><span class="tag is-dark">From ` + project.from + ` to ` + project.to + ` </span></p>
            </div>
        </article>
    </div>
        `;

      projectHTML.innerHTML += content;
    });

    document.dispatchEvent(new Event("projectsLoaded"));

  });
});

// Load people
document.addEventListener('DOMContentLoaded', () => {
  loadJSON('data/people.json').then(function (response) {
    var peopleHTML = document.querySelector('#people-list');
    var peopleList = JSON.parse(response)

    var countPeople = 0;
    var totalContent = "";

    peopleList.array.forEach(function (person) {
      if (countPeople % 3 == 0) {
        var content = `</div><div class="columns is-centered has-text-centered">`;
      } else {
        var content = "";
      }

      countPeople++;

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

    peopleHTML.innerHTML = `<div class="columns is-centered has-text-centered">` + totalContent + "</div>";
  });
});

// Variable for news
const newsForRow = 3;
const newsForPage = 6;

// Create News HTML/Resources
function createNewsContent(start, end, data, selector) {
  loadJSON(data).then(function (response) {
    var mediaHTML = document.querySelector(selector);
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
                          <p class="subtitle is-size-6 has-text-justified">` + news.abstract + `</p><br>
                      </a>
                  </div>`;

        mediaHTML.innerHTML += content;
      }

      newsCount++;
    });
  });
}

// Load News/Resource
document.addEventListener('DOMContentLoaded', () => {
  createPagination('data/news.json', '#news-pagination');
  createPagination('data/resources.json', '#resources-pagination');
  createNewsContent(0, newsForPage, 'data/news.json', '#news-list');
  createNewsContent(0, newsForPage, 'data/resources.json', '#resources-list');

  document.addEventListener('paginationLoaded#news-pagination', () => {
    loadPagination('#news-pagination .pagination-link', '#news-list', 'data/news.json');
  });

  document.addEventListener('paginationLoaded#resources-pagination', () => {
    loadPagination('#resources-pagination .pagination-link', '#resources-list', 'data/resources.json');
  });
});

// Create pagination
function createPagination(data, selector) {
  loadJSON(data).then(function (response) {
    var newsList = JSON.parse(response);
    var paginationHTML = document.querySelector(selector);
    var totalPages = Math.ceil(newsList.array.length / 6);

    for (var i = 2; i <= totalPages; i++) {
      paginationHTML.innerHTML += `<li><a class="pagination-link" aria-label="Goto page ` + i + `" go-to="` + i + `">` + i + `</a></li>`;
    }

    document.dispatchEvent(new Event("paginationLoaded" + selector));
  });
}

// Load news and resources
function loadPagination(selectorPages, selectorList, data){
  var pages = document.querySelectorAll(selectorPages);

  Array.from(pages).forEach(function (element) {
    element.addEventListener("click", function () {
      Array.from(pages).forEach(function (element) {
        element.classList.remove('is-current');
      });

      document.querySelector(selectorList).innerHTML = "";

      // Eg. for page 2 and 6 news: 5 * (2-1) = start from news 5, 5*2 = end news 10
      createNewsContent(newsForPage * (this.getAttribute('go-to') - 1), newsForPage * this.getAttribute('go-to'), data, selectorList);

      element.classList.add("is-current");
    });
  });
}

// Load Media
document.addEventListener('DOMContentLoaded', () => {
  loadJSON('data/videos.json').then(function (response) {
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
          <div class="subtitle is-6 has-text-justified">
          ` + video.abstract + `
          </div>
      </div>
  </div>
</div>
        `;

      mediaHTML.innerHTML += content;
    });

    document.dispatchEvent(new Event("videosLoaded"));

  });
});

// Modal
document.addEventListener("projectsLoaded", () => {
  document.addEventListener("videosLoaded", () => {
    var modals = document.querySelectorAll('a.open-modal')

    loadJSON('data/projects.json').then(function (response) {
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
    });
  });
});

// Search keywords
function hasKeyword(text, keywordList) {
  var found = false;

  for (keyword of keywordList) {
    found = found || text.includes(keyword);

    if (found) {
      break;
    }
  }

  return found;
}

//Load Publications
function loadPublications(callback) {
  loadJSON('data/publications/nJson.json').then(async function (response) {
    var publicationsMap = new Map();
    var nJson = JSON.parse(response);

    for (var i = 0; i < nJson["nJson"]; i++) {
      await loadJSON('data/publications/file' + i + '.json').then(function (response) {
        var publicationsList = JSON.parse(response);

        //publicationsMap.set(2018, [{ title: "test", doi: "asd", authors: "1pinco" }]);

        publicationsList["search-results"].entry.forEach(function (publication) {
          if (hasKeyword(publication["dc:title"], ["Sentiment analysis", "robot", "semantic", "ontology", "healthcare", "cognitive", "big data", "mario", "philhumans", "frame", "machine learning", "deep learning", "neural", "embeddings", "tracking", "emotion", "linked", "knowledge"])) {
            var date = new Date(publication['prism:coverDate']);

            if (!publicationsMap.has(date.getFullYear())) {
              publicationsMap.set(date.getFullYear(), []);
            }

            var authors = []

            publication.author.forEach(function (author) {
              authors.push(author.authname);
            });

            publicationsMap.get(date.getFullYear()).push({ title: publication["dc:title"], doi: publication["prism:doi"], authors: authors.join(", ") });
          }
        });
      });
    }

    callback(publicationsMap);
  });
}

// Load years
document.addEventListener('DOMContentLoaded', () => {
  loadPublications(function (publicationsMap) {
    var years = [];

    for (var year of publicationsMap.keys()) {
      years.push(year);
    }

    years.sort(function (a, b) {
      return new Date(b.toString()) - new Date(a.toString());
    });

    var publicationsYearsHtml = document.querySelector("#publications-years");

    publicationsYearsHtml.innerHTML += '<li data-tab="1"><a>All</a></li>';

    years.forEach(function (year) {
      if (year == Math.max.apply(null, years)) {
        publicationsYearsHtml.innerHTML += '<li data-tab="' + year + '" class="is-active"><a>' + year + '</a></li>';
      } else {
        publicationsYearsHtml.innerHTML += '<li data-tab="' + year + '"><a>' + year + '</a></li>';
      }
    });

    loadPublicationsYear(Math.max.apply(null, years));

    document.dispatchEvent(new Event("publicationsLoaded"));
  });
});

// Load publications year
function loadPublicationsYear(year) {
  loadPublications(function (publicationsMap) {
    var publicationsContent = document.querySelector("#tab-content-research");

    var totalContent = ""

    for (var entry of publicationsMap) {
      if (year == 1) {
        totalContent += `<span class="tag is-dark is-medium">` + entry[0] + `</span>`;
        var map = entry[1];
      } else {
        var map = publicationsMap.get(parseInt(year));
      }

      totalContent += `<div class="columns is-multiline">`;

      for (var publication of map) {
        totalContent += `<div class="column is-6">
          <div class="content">
              <ul>
                  <li>
                  ` + publication.authors + ` <br>
                      <span class="has-text-weight-bold">` + publication.title + `</span><br>`;

        if (publication.doi) {
          totalContent += `DOI: ` + publication.doi + `<br>
                      <a href="https://dx.doi.org/` + publication.doi + `" target="_blank">https://dx.doi.org/` + publication.doi + `</a>`;
        }

        totalContent += `
                         </li>
              </ul>
          </div>
          </div>`;
      }

      if (year != 1) {
        break;
      } else {
        totalContent += "</div>"
      }
    }

    totalContent += "</div>"

    publicationsContent.innerHTML = totalContent;
  });
}

// Tabs
document.addEventListener('publicationsLoaded', () => {
  const TABS = document.querySelectorAll('.tabs li');

  TABS.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      let selected = tab.getAttribute('data-tab');
      updateActiveTab(tab);
      loadPublicationsYear(selected);
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
});