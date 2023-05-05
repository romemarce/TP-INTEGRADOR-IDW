const menuDom = document.getElementById("menu-list");

const routes = [
  {
    name: "Portada",
    url: "./",
  },
  {
    name: "Información institucional",
    url: "./info.html",
  },
  {
    name: "Contacto",
    url: "./contacto.html",
  },
  {
    name: "Carreras",
    url: "./carreras.html",
  },
  {
    name: "Bedelia",
    url: "./panel.html",
    className: "bedelia",
  },
];

export const showHeaderMenu = () => {
  const ulDom = document.createElement("ul");
  ulDom.classList.add("menu-list");
  routes.forEach((route) => {
    ulDom.innerHTML += `<li class="menu-item ${
      route?.className ? route.className : ""
    }"><a href="${route.url}">${route.name}</a></li>`;
  });
  menuDom.append(ulDom);
};

