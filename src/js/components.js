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
