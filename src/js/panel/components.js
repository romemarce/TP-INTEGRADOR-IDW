import { getDatabase } from "./database.js";

export const getCurrentDay = () => {
  const date = new Date();
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return `${d}/${m}/${y}`;
};


export const loadProfile = () => {
  const profileDom = document.getElementById('profile')
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
}

export const addButtonResponsive = (button)=>{
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const menuList = document.getElementById("menu-list");
    if (menuList) {
      const menu = menuList.childNodes[0]
      if (!menu.style.display) {
        menu.style.display = "block"
      } else {
        menu.style.display = ""
      }
    }
  })

}

// export const Notification = (msg, func)=>{
//   const body = document.getElementsByTagName('body');
//   const modal = document.createElement("section");
//         modal.classList.add("modal");


// }

export const addPanelCounter = (dom)=>{
  const db = getDatabase();
  const {estudiantes, materias, carreras} = {
    estudiantes: db?.estudiantes.length || 0,
    materias: db?.materias.length || 0,
    carreras: db?.carreras.length || 0,
  }
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
  `
}