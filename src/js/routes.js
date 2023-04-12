const menuDom = document.getElementById("menu-list");

const routes = [
  {
    name: "Portada",
    url: "./index.html",
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
];

const handleSubmit = (e) => {
  e.preventDefault();
  window.location = "bedelia.html";
};
const createModalLogin = (elementDom) => {
  const sectionDom = document.createElement("section");
  sectionDom.classList.add("content-modal", "active");

  const formDom = document.createElement("form");
  formDom.classList.add("modal");
  formDom.onsubmit = (e) => handleSubmit(e);
  // Solo vistoso
  formDom.innerHTML = `
        <input type="text" name="user" placeholder="Usuario" />
        <input type="text" name="pass" placeholder="Contraseña" />
        <button type="submit">Enviar</button>
    `;
  const buttonDom = document.createElement("button");
  buttonDom.classList.add('close-modal')
  buttonDom.onclick = (e) => sectionDom.remove();
  buttonDom.innerText = "x";

  formDom.prepend(buttonDom);
  sectionDom.append(formDom);

  elementDom.append(sectionDom);
};

export const showHeaderMenu = () => {
  const ulDom = document.createElement("ul");
  routes.forEach((route) => {
    ulDom.innerHTML += `<li><a href="${route.url}">${route.name}</a></li>`;
  });
  const liDom = document.createElement("li");

  const buttonDom = document.createElement("button");
  buttonDom.onclick = (e) => createModalLogin(menuDom);
  buttonDom.innerText = "Bedelia";
  liDom.append(buttonDom);
  ulDom.append(liDom);

  menuDom.append(ulDom);

  // Add Logint to menu
};

// form

const routesPanel = [
  {
    name: "Estudiantes",
    url: "./index.html",
  },
  {
    name: "Carreras",
    url: "./index.html",
  },
  {
    name: "Materias",
    url: "./index.html",
  },
];
export const showHeaderPanel = () => {
  menuDom.innerHTML = "<ul>";
  routesPanel.forEach((route) => {
    menuDom.innerHTML += `<li><a href="${route.url}">${route.name}</a></li>`;
  });
  menuDom.innerHTML += "</ul>";
};
