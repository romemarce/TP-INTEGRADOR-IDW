const menuDom = document.getElementById('menu-list');

const routes = [
  {
    name: "Portada",
    url: "./index.html"
  },
  {
    name: "Información institucional",
    url: "./info.html"
  },
  {
    name: "Contacto",
    url: "./contacto.html"
  },
  {
    name: "Carreras",
    url: "./carreras.html"
  }
]

export const showHeaderMenu = ()=>{
  menuDom.innerHTML = "<ul>"
  routes.forEach(route => {
    menuDom.innerHTML += `<li><a href="${route.url}">${route.name}</a></li>`
  })
  menuDom.innerHTML += `<li><button>Bedelia</button></li>`
  menuDom.innerHTML += "</ul>"
}


const routesPanel = [
  {
    name: "Estudiantes",
    url: "./index.html"
  },
  {
    name: "Carreras",
    url: "./index.html"
  },
  {
    name: "Materias",
    url: "./index.html"
  },
]
export const showHeaderPanel = ()=>{
  menuDom.innerHTML = "<ul>"
  routesPanel.forEach(route => {
    menuDom.innerHTML += `<li><a href="${route.url}">${route.name}</a></li>`
  })
  menuDom.innerHTML += "</ul>"
}