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