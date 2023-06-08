import { initDatabase } from "./database.js";
import { showHeaderPanel } from "./routes.js";
import {
  getCurrentDay,
  loadProfile,
  addButtonResponsive,
  addPanelCounter,
} from "./components.js";
import { loadMateriaFormFunction } from "./models/materias.js";
import { importExampleMaterias } from "./imports/index.js";
import { loadCarreraFormFunction } from "./models/carreras.js";
import { loadEstudianteFormFunction } from "./models/estudiantes.js";
import { loadCollectionList } from "./models/utils.js";
import { collections } from "./models/controller.js";

loadProfile();
showHeaderPanel();
initDatabase();

const domPanelDate = document.getElementById("panel-date");
if (domPanelDate) {
  domPanelDate.innerHTML = getCurrentDay();
}

/**
 *  ------------------
 *     MATERIAS
 *  ------------------
 */

const addExampleMaterias = document.getElementById("add-example-materias");
if (addExampleMaterias)
  addExampleMaterias.addEventListener("click", (e) => {
    e.preventDefault();
    importExampleMaterias();
    window.location.reload();
  });

loadMateriaFormFunction();
loadCollectionList("materia-result", collections.materia);

/**
 *  ------------------
 *     CARRERAS
 *  ------------------
 */
loadCarreraFormFunction();
loadCollectionList("carrera-result", collections.carrera);

/**
 *  ------------------
 *     ESTUDIANTES
 *  ------------------
 */

loadEstudianteFormFunction();
loadCollectionList("estudiante-result", collections.estudiante, "dni");

/**
 *  ------------------
 *     RESPONSIVE
 *  ------------------
 */
addButtonResponsive();
addPanelCounter();