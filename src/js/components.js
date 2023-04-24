// Listado de contactos
const CONTACT_JSON = '/src/db/contactos.json'
export async function loadContact() {
  const contactosDom = document.getElementById("contactos");
  if (contactosDom) {
    const res = await fetch(CONTACT_JSON)
    const data = await res.json();
    let listDom = "";
    data.forEach(({ name, tel }) => {
      listDom += `<tr><td class="name">${name}</td><td class="numero">${tel}</td></tr>`;
    });
    contactosDom.innerHTML = listDom;
  }
}

// Listado de carreras

const templateCarrera = ({ name, type, year, mod }) => {
  return `
    <article>
      <ul>
        <li><strong>${name}</strong></li>
        <li>Tipo: ${type}</li>
        <li>Duración: ${year}</li>
        <li>Modalidad: ${mod}</li>
      </ul>
    </article>
  `;
}

export const loadCarreras = async () => {
  const carreraDom = document.getElementById('carrera');
  carreraDom.innerHTML = ""
  if (carreraDom) {
    await fetch("./src/db/carreras.json")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          data.forEach(e => {
            carreraDom.innerHTML += templateCarrera(e)
          });
        }
      })
      .catch(err => console.log(err))
  }
}

const templateFooter = `
<section class="container-columns columns-3">
  <section>
    <h3>UBICACIÓN</h3>
    <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1bO3tFLszqhcVS3B3HaQ5Gl4VDmwDUjs&ehbc=2E312F"
      width="100%" height="200" style="border: 0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
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
</section>
`;

export const loadFooter = ()=>{
  const footer = document.getElementById('footer')
  if (footer) {
    footer.innerHTML = templateFooter
  }
}

// const domBlog = document.getElementById('blog')
// export const getBlogPosts = () => {
//   if (domBlog) console.log("Load blog")
// }