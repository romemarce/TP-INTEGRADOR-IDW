import { initDatabase } from "./database.js";
import { showHeaderPanel } from "./routes.js";
import {
  loadProfile,
  addButtonResponsive,
  addPanelCounter,
  addCoffeGif,
  showCurrentDay,
} from "./components.js";
import { loadMateriaFormFunction } from "./models/materias.js";
import { loadCarreraFormFunction } from "./models/carreras.js";
import { loadEstudianteFormFunction } from "./models/estudiantes.js";
import { loadCollectionList } from "./models/utils.js";
import { collections } from "./models/controller.js";
import { loadInscripcionFormFunction } from "./models/inscripcion.js";
import { loadImportButton } from "./imports/index.js";

loadProfile();
showHeaderPanel();
initDatabase();

showCurrentDay();

loadImportButton();

// MATERIAS
loadMateriaFormFunction();
loadCollectionList("materia-result", collections.materia);

// CARRERAS
loadCarreraFormFunction();
loadCollectionList("carrera-result", collections.carrera);

// ESTUDIANTES
loadEstudianteFormFunction();
loadCollectionList("estudiante-result", collections.estudiante);

// INSCRIPCIONES
loadInscripcionFormFunction();

/// RESPONSIVE
addButtonResponsive();
addPanelCounter();

// EXTRA
addCoffeGif();
