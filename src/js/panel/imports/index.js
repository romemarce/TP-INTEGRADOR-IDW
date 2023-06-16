import { reloadPage } from "../components.js";
import { setDatabase } from "../database.js";

const URL_ESTUDIANTE = "./src/data/estudiantes.json";
const URL_CARRERA = "./src/data/carreras.json";
const URL_MATERIA = "./src/data/materias.json";

export const loadImportButton = () => {
  const importDatabase = document.getElementById("import-database");
  if (importDatabase)
    importDatabase.addEventListener("click", async (e) => {
      e.preventDefault();
      const carreras = await fetch(URL_CARRERA).then((res) => res.json());
      const estudiantes = await fetch(URL_ESTUDIANTE).then((res) => res.json());
      const materias = await fetch(URL_MATERIA).then((res) => res.json());
      setDatabase({ carreras, estudiantes, materias });
      setTimeout(() => reloadPage(), 1000);
    });
};
