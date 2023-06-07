import { initDatabase } from "./database.js";
import { showHeaderPanel } from "./routes.js";
import { getCurrentDay, loadProfile, addButtonResponsive } from "./components.js";
import { loadMateriaFormFunction, loadMaterias } from "./models/materias.js";
import { importExampleMaterias } from "./imports/index.js";
import { loadCarreraFormFunction, loadCarrerasResult } from "./models/carreras.js";

loadProfile();
showHeaderPanel();
initDatabase();

const domPanelDate = document.getElementById("panel-date");
if (domPanelDate) {
  domPanelDate.innerHTML = getCurrentDay();
}


const addExampleMaterias = document.getElementById('add-example-materias');
if (addExampleMaterias) addExampleMaterias.addEventListener("click", (e) => {
  e.preventDefault();
  importExampleMaterias()
  window.location.reload();
})


const materiaForm = document.getElementById('materia-form')
if (materiaForm) loadMateriaFormFunction(materiaForm);

const materiaResult = document.getElementById('materia-result');
if (materiaResult) loadMaterias(materiaResult);



loadCarreraFormFunction();

const carreraResult = document.getElementById('carrera-result');
if (carreraResult) loadCarrerasResult(carreraResult);







// Responsive
const btnResponsive = document.getElementById("btn-responsive");
if (btnResponsive) addButtonResponsive(btnResponsive)