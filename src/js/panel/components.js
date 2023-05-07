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


// export const Notification = (msg, func)=>{
//   const body = document.getElementsByTagName('body');
//   const modal = document.createElement("section");
//         modal.classList.add("modal");


// }