// Temporal

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

const carreraDom = document.getElementById('carrera');
carreraDom.innerHTML = ""

const fetchCarreras = async ()=>{
  await fetch("./src/db/carreras.json")
  .then( res => res.json())
  .then( data => {
    if (data.length > 0) {
      data.forEach(e => {
        carreraDom.innerHTML += templateCarrera(e)
      });
    }
  } )
  .catch(err => console.log(err))
}
fetchCarreras()

