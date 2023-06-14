import { initDatabase } from "./database.js";
import { showHeaderPanel } from "./routes.js";
import {
  getCurrentDay,
  loadProfile,
  addButtonResponsive,
  addPanelCounter,
} from "./components.js";
import { loadMateriaFormFunction } from "./models/materias.js";
import { loadCarreraFormFunction } from "./models/carreras.js";
import { loadEstudianteFormFunction } from "./models/estudiantes.js";
import { loadCollectionList } from "./models/utils.js";
import { collections } from "./models/controller.js";
import { loadInscripcionFormFunction } from "./models/inscripcion.js";
import { importJsonData } from "./imports/index.js";

loadProfile();
showHeaderPanel();
initDatabase();

const domPanelDate = document.getElementById("panel-date");
if (domPanelDate) {
  domPanelDate.innerHTML = getCurrentDay();
}

const importDatabase = document.getElementById("import-database");
if (importDatabase)
  importDatabase.addEventListener("click", (e) => {
    e.preventDefault();
    importJsonData();
  });

/**
 *  ------------------
 *     MATERIAS
 *  ------------------
 */
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
 *     INSCRIPCIONES
 *  ------------------
 */

loadInscripcionFormFunction();
// loadCollectionList("estudiante-result", collections.estudiante, "dni");

/**
 *  ------------------
 *     RESPONSIVE
 *  ------------------
 */
addButtonResponsive();
addPanelCounter();
