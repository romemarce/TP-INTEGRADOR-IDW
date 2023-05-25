import {
  URL_FCAD_BANNER,
  URL_FCAD_IMAGES,
  URL_FCAD_PORTAL,
  URL_FCAD_SINGLE,
} from "./connexions.js";

// Listado de contactos
const CONTACT_JSON = "/src/db/contactos.json";
export async function loadContact() {
  const contactosDom = document.getElementById("contactos");
  if (contactosDom) {
    contactosDom.innerHTML = "";
    const res = await fetch(CONTACT_JSON);
    const data = await res.json();
    let listDom = "";
    data.forEach(({ name, tel }) => {
      listDom += `<tr><td class="name">${name}</td><td class="numero">${tel}</td></tr>`;
    });
    contactosDom.innerHTML = listDom;
  }
}

// Listado de carreras
export const loadCarreras = async () => {
  const carreraDom = document.getElementById("carrera");
  if (carreraDom) {
    carreraDom.innerHTML = "";
    await fetch("./src/db/carreras.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          data.forEach(({ name, type, year, mod }) => {
            carreraDom.innerHTML += `
            <article class="post-carrera">
                  <h3>${name}</h3>
                  <div class="post-carrera-items">
                    <span>${type}</span>
                    <span>${year}</span>
                    <span>${mod}</span>
                  </div>
                </article>
                `;
          });
        }
      })
      .catch((err) => console.log(err));
  }
};

export const loadFooter = () => {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `
    <section class="container-columns ">
    <div class="columns-3">
      <section>
        <h3>UBICACIÓN</h3>
        <!-- <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1bO3tFLszqhcVS3B3HaQ5Gl4VDmwDUjs&ehbc=2E312F"
          width="300px" height="200" style="border: 0;" allowfullscreen="" loading="lazy"
           referrerpolicy="no-referrer-when-downgrade"></iframe> --!>
      </section>
      <section>
        <h3>CONÉCTATE</h3>
        <div class="columns">
          <div class="grid-container">
            <div class="column">
              <div class="logo-face">
                <a href="https://www.facebook.com/Fac.Cs.Administracion/" target="_blank">
                  <h1>f</h1>
                </a>
              </div>
            </div>
            <div class="columns">
              <a href="https://www.instagram.com/fcad.uner/?hl=es-la" target="_blank">
                <div class="logo-instagram">
                  <div class="punto">
                  </div>
                </div>
              </a>
            </div>
            <div class="columns">
              <a href="https://www.youtube.com/channel/UCH07uX8PpyI1-ee24xb2iJQ" target="_blank">
                <div class="logo-youtube">
                  <div class="triangulo">
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3>CONTÁCTANOS</h3>
        <ul>
          <li>Monseñor Tavella 1424. Concordia-ER</li>
          <li>Tel: +54-345-4231400</li>
          <li>Fax: +54-345-4231410</li>
          <li>informes.fcad@uner.edu.ar</li>
        </ul>
      </section>
    </div>
    </section>
    `;
  }
};

const configBanner = {
  postList: [],
  counter: 0,
  counterMax: 10,
  idListExcludeNews: [],
};

const getPostListUNER = async (fetchURL, isBanner = false) => {
  let completePosts = [];

  await fetch(fetchURL)
    .then((res) => res.json())
    .then((list) => {
      list.forEach(({ date, excerpt, featured_media, id, title }) => {
        completePosts.push({
          date,
          content: excerpt.rendered,
          featured_media,
          id,
          title: title.rendered,
        });
        if (isBanner) configBanner.idListExcludeNews.push(id);
      });
      // (completePosts = list)
    })
    .catch((err) => console.log(err));
  // postlist tiene algo

  if (completePosts.length > 0) {
    const imageIds = [];
    completePosts.forEach(({ featured_media }) => {
      imageIds.push(featured_media);
    });

    // console.log(images,imageIds);
    await fetch(URL_FCAD_IMAGES(imageIds))
      .then((res) => res.json())
      .then((list) => {
        if (list.length > 0) {
          completePosts.forEach((e, k) => {
            const imageUrl = list.find((el) => el.id === e.featured_media);
            completePosts[k]["featured_media_img"] = imageUrl.guid.rendered;
          });
          return completePosts;
        }
      })
      .catch((err) => console.log(err));
  }
  return completePosts;
};

const updateCurrentBanner = (bannerDom = false) => {
  if (bannerDom) {
    const pictureDom = bannerDom.querySelector("picture");
    const { id, title, featured_media_img } =
      configBanner.postList[configBanner.counter];
    pictureDom.innerHTML = `   
    <section class="slide">
        <a href="noticia.html?id=${id}">
          <img class="fcad" src="${featured_media_img}" alt="uner" />
          <p>${title}</p>
        </a>
      </section>
    `;
  }
};

const loadBanner = async () => {
  const bannerDom = document.getElementById("portada-banner");
  if (bannerDom) {
    configBanner.postList = await getPostListUNER(URL_FCAD_BANNER(3), true);
    updateCurrentBanner(bannerDom, configBanner.counter);

    if (configBanner.postList.length > 0) {
      configBanner.counterMax = configBanner.postList.length - 1;
      // console.log(configBanner);
    }

    const previusBanner = (e) => {
      e.preventDefault();
      configBanner.counter--;
      if (configBanner.counter < 0) {
        configBanner.counter = configBanner.counterMax;
      }
      updateCurrentBanner(bannerDom);
    };
    const nextBanner = (e) => {
      e.preventDefault();
      configBanner.counter++;
      if (configBanner.counter > configBanner.counterMax) {
        configBanner.counter = 0;
      }
      updateCurrentBanner(bannerDom);
    };

    const buttons = bannerDom.querySelectorAll("button");
    // agrega funcion a los botones
    buttons.forEach((e) => {
      if (e.getAttribute("name") === "left")
        e.addEventListener("click", (el) => previusBanner(el));

      if (e.getAttribute("name") === "right")
        e.addEventListener("click", (el) => nextBanner(el));
    });
    setInterval(() => {
      configBanner.counter++;
      if (configBanner.counter > configBanner.counterMax) {
        configBanner.counter = 0;
      }
      updateCurrentBanner(bannerDom);
    }, 3000);
  }
};

const loadNews = async () => {
  const excludeIds = configBanner.idListExcludeNews;
  const result = await getPostListUNER(URL_FCAD_PORTAL(excludeIds, 4), false);

  const newsDom = document.getElementById("portal-news");
  newsDom.innerHTML = "";
  if (result.length > 0) {
    result.forEach(({ content, featured_media_img, id, title }) => {
      newsDom.innerHTML += `
      <article class="loop-post">
        <img src="${featured_media_img}" alt="${title}">
        <h2>${title}</h2>
        <a href="./noticia.html?id=${id}">Ver más</a>
      </article>
      `;
    });
  }
};

const loadLinkThree = () => {
  const contentDom = `ACCESOS RÁPIDOS
  SIU Guaraní
  Campus Virtual
  Plan Estratégico 2017-2054
  Digesto Online
  Correo Institucional
  Biblioteca Digital
  Área Educación A Distancia
  Conocé la Facultad
  Concursos Docentes`;

  const linkThreeDom = document.getElementById("link-tree");
  if (linkThreeDom) linkThreeDom.innerHTML = contentDom;
};

export const loadBannerAndNews = async () => {
  await loadBanner();
  loadLinkThree();
  await loadNews();
};

// SIngle

const getPostUNER = async (fetchURL) => {
  let completePosts = {};

  await fetch(fetchURL)
    .then((res) => res.json())
    .then(({ date, content, featured_media, id, title }) => {
      completePosts = {
        date,
        content: content.rendered,
        featured_media,
        id,
        title: title.rendered,
      };
    })
    .catch((err) => console.log(err));

  if (Object.entries(completePosts).length > 0) {
    const imageIds = completePosts.featured_media;

    await fetch(URL_FCAD_IMAGES(imageIds))
      .then((res) => res.json())
      .then((data) => {
        completePosts.featured_media_img = data[0].guid?.rendered;
        return completePosts;
      })
      .catch((err) => console.log(err));
  }
  return completePosts;
};
const getTemplatePost = async (id) => {
  const post = await getPostUNER(URL_FCAD_SINGLE(id));
  console.log(post);
  return `<section class="single-news">
  <h1>${post.title}</h1>
  <hr />
   <img src="${post.featured_media_img}" alt=""> <br>
   <br>
  ${post.content}</section>`;
};
export const loadSingleNews = async () => {
  const domPost = document.getElementById("main-post");

  // Obtenemos el id del post que viene como parametro
  const params = window.location.search;
  const stringNumber = params.replace("?id=", "");
  const postId = parseInt(stringNumber);

  if (domPost) {
    if (postId) {
      domPost.innerHTML = await getTemplatePost(postId);
    } else {
      domPost.innerHTML = `<h1>Error</h1> <hr /> Post no encontrado`;
    }
  }
};
