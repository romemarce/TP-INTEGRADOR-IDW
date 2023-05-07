import { initDatabase } from "./database.js";
import { showHeaderPanel } from "./routes.js";
import { getCurrentDay, loadProfile } from "./components.js";
import { loadMateriaFormFunction, loadMaterias } from "./models/materias.js";

loadProfile();
showHeaderPanel();
initDatabase();

const domPanelDate = document.getElementById("panel-date");
if (domPanelDate) {
  domPanelDate.innerHTML = getCurrentDay();
}


const materiaForm = document.getElementById('materia-form')
if (materiaForm) loadMateriaFormFunction(materiaForm);

const materiaResult = document.getElementById('materia-result');
if (materiaResult) loadMaterias(materiaResult);