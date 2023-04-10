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
  },
]

export const showHeaderMenu = ()=>{
  menuDom.innerHTML = "<ul>"
  routes.forEach(route => {
    menuDom.innerHTML += `<li><a href="${route.url}">${route.name}</a></li>`
  })
  menuDom.innerHTML += "</ul>"
}