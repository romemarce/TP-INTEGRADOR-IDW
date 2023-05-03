const menuDom = document.getElementById("menu-list");

const routesPanel = [
  {
    name: "Inicio",
    url: "./panel.html",
  },
  {
    name: "Estudiantes",
    url: "./panel-estudiante.html",
  },
  {
    name: "Carreras",
    url: "./panel-carrera.html",
  },
  {
    name: "Materias",
    url: "./panel-materia.html",
  },
  {
    name: "Credito",
    url: "./panel-credito.html",
  },
  {
    name: "Sitio web",
    url: "./",
  },
];
export const showHeaderPanel = () => {
  const ulDom = document.createElement("ul");
  ulDom.classList.add("menu-list");
  routesPanel.forEach((route) => {
    ulDom.innerHTML += `<li class="menu-item ${route?.className ? route.className : ""
      }"><a href="${route.url}">${route.name}</a></li>`;
  });
  menuDom.append(ulDom);
};