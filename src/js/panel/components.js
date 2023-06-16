import { getDatabase } from "./database.js";

export const getCurrentDay = () => {
  const date = new Date();
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const loadProfile = () => {
  const profileDom = document.getElementById("profile");
  if (profileDom) {
    profileDom.innerHTML += `
      <section class="profile">
        <img src="./src/img/B2xD.gif" alt="profile" />
        <ul>
          <li class="profile-title">Kakaroto</li>
          <li class="profile-status">ONLINE</li>
        </ul>
      </section>
    `;
  }
};

export const addButtonResponsive = () => {
  const button = document.getElementById("btn-responsive");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const menuList = document.getElementById("menu-list");
    if (menuList) {
      const menu = menuList.childNodes[0];
      if (!menu.style.display) {
        menu.style.display = "block";
      } else {
        menu.style.display = "";
      }
    }
  });
};

export const addPanelCounter = () => {
  const dom = document.getElementById("panel-counter");
  if (dom) {
    const db = getDatabase();
    const { estudiantes, materias, carreras } = {
      estudiantes: db?.estudiantes.length || 0,
      materias: db?.materias.length || 0,
      carreras: db?.carreras.length || 0,
    };
    dom.innerHTML = `
      <div class="box-counter bc-azul" >
        <p>
          <strong>${estudiantes}</strong>
          Estudiantes
        </p>
      </div>
      <div class="box-counter bc-celeste">
        <p>
          <strong>${materias}</strong>
          Materias
        </p>
      </div>
      <div class="box-counter bc-bordo">
        <p>
          <strong>${carreras}</strong>
          Carreras
        </p>
      </div>
      `;
  }
};

export const sendNotification = (msg = "") => {
  const body = document.getElementsByTagName("body")[0];

  const article = document.createElement("article");
  article.classList.add("notification");
  article.innerHTML = `<p>${msg}</p>`;

  const progress = document.createElement("progress");
  progress.value = 1;
  progress.max = 100;
  article.append(progress);
  body.append(article);

  const intervalo = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 15;
    } else {
      article.remove();
      clearInterval(intervalo);
    }
  }, 500);
};

export const reloadPage = (time = 3000) =>
  setTimeout(() => {
    window.location.reload();
  }, time);

export const addCoffeGif = async () => {
  const dom = document.getElementById("gif-coffe");
  if (dom) {
    const API = "waaQ5dSVmlVQIkCVMQGOsVRCUU0Qh75K";

    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API}&q=coffe&limit=20&offset=0&rating=g&lang=es`
    )
      .then((res) => res.json())
      .then(({ data, meta }) => {
        if (meta.status === 200) {
          const index = Math.floor(Math.random() * 20) + 1;
          const gif = data[index]?.images?.original?.url;

          dom.innerHTML = `<img src="${gif}" alt="coffe" />`;
        }
      })
      .catch((err) => console.log(err));
  }
};
