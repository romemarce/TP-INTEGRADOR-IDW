import { initDatabase, getDatabase, setDatabase } from './database.js'
import { showHeaderPanel } from './routes.js'
import { getCurrentDay } from './utils.js'
showHeaderPanel()
initDatabase()

const domPanelDate = document.getElementById('panel-date')
if (domPanelDate) {
  domPanelDate.innerHTML = getCurrentDay()
}


const createCarrera = (nombre, tipo, duracion, modalidad) => {
  // Obtenemos la database
  const database = getDatabase()
  // Creamos nueva carrea
  const nuevo = {
    id: database.carreras.length,
    nombre,
    tipo,
    duracion,
    modalidad
  }
  // Agregamos elemento a carrear
  database.carreras.push( nuevo )
  // Guardamos la carrera
  setDatabase( database )
}

const getCarreras = () => {
  // Obtenemos la database
  const database = getDatabase()
  return database.carreras
}
console.log("Carreras",getCarreras());

// update
const updateCarrera = (id,nombre, tipo, duracion, modalidad) => {
  // Obtenemos la database
  const database = getDatabase()
  if (database.carreras) {
    database.carreras.forEach(carrera => {
      if (carrera.id === id) {
        carrera.nombre = nombre
        carrera.tipo = tipo
        carrera.duracion = duracion
        carrera.modalidad = modalidad
      }
    });
    setDatabase( database )
  }
}
// updateCarrera(2,"Contador","Grado",5,"Presencial")
// delete

const deleteCarrera = (id) => {
  // Obtenemos la database
  const database = getDatabase()
  if (database.carreras) {
    const aux = []
    database.carreras.forEach(carrera => {
      if (carrera.id !== id) {
        aux.push(carrera)
      }
    });
    setDatabase({ ...database, carreras: aux })
  }
} // deleteCarrera(1)