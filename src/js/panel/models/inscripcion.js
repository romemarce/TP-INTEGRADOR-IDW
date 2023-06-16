import { getDatabase, setDatabase } from "../database.js";
import { collections, getElements, searchElements } from "./controller.js";
import { getListObjetCollection } from "./utils.js";

let estudiantes = false;

const SearchConfig = {
  s: "",
};

const createArticleItem = (item, buttonName, action) => {
  const elementId = "item-list-" + String(item.id);

  let article = document.createElement("article");
  article.classList.add("table-list-item");
  article.id = elementId;
  article.innerHTML = `<span>${item.id}</span><span>${item.name}</span>`;

  if (action !== null) {
    let button = document.createElement("button");
    button.type = "submit";
    button.addEventListener("click", () => action(item.id));
    button.innerHTML = buttonName;

    article.append(button);
  }

  return article;
};

/**
 * Carga las materias en el form
 * @param {materias} materias
 */

const loadAsignaturas = (
  materiasId = [],
  dni
) => {
  const db = getDatabase();
  const materiasList = getListObjetCollection(db?.materias, materiasId, "id");
  const asignaturasDom = document.getElementById("asignaturas");
  if (asignaturasDom) {
    asignaturasDom.innerHTML = "";
    materiasList.forEach((item) => {
      asignaturasDom.append(
        createArticleItem(item, "Inscribir", (id) => {
          db?.estudiantes.forEach((estudiante) => {
            if (parseInt(estudiante.dni) === parseInt(dni)) {
              if (!estudiante.inscripcion.includes(id)) {
                estudiante.inscripcion.push(id);
                setDatabase(db);
                refreshInscripciones(estudiante.dni);
              }
            }
          });
        })
      );
    });
  }
};

const refreshInscripciones = (dni) => {
  const inscripcionesDom = document.getElementById("inscripciones");
  inscripcionesDom.innerHTML = "";
  if (inscripcionesDom) {
    const db = getDatabase();
    db?.estudiantes.forEach((estudiante) => {
      if (parseInt(estudiante.dni) === parseInt(dni)) {
        const list = getListObjetCollection(
          db?.materias,
          estudiante?.inscripcion,
          "id"
        );

        list.forEach((item) => {
          inscripcionesDom.append(createArticleItem(item, "Deinscribir", null));
        });
      }
    });
  }
};

const getCarreraEstudiante = (estudiante) => {
  const carreras = getElements(collections.carrera);
  if (carreras.length > 0) {
    return carreras[parseInt(estudiante.carrera)];
  }
  return false;
};

const loadProfileEstudiante = (e = {}) => {
  const dom = document.getElementById("profile-estudiante");
  const carrera = getCarreraEstudiante(e);
  if (dom) {
    dom.innerHTML = `
            <img
                src="https://ui-avatars.com/api/?background=random&name=${
                  e.name
                }+${e.lastname}"
            />
            <ul>
                ${e?.dni ? `<li>DNI: ${e.dni}</li>` : ""}
                ${e?.lastname ? `<li>Apellido: ${e.lastname}</li>` : ""}
                ${e?.name ? `<li>Nombre: ${e.name}</li>` : ""}
                ${e?.birthday ? `<li>Nacimiento: ${e.birthday}</li>` : ""}
                ${
                  e?.nationality
                    ? `<li>Nacionalidad: ${e.nationality}</li>`
                    : ""
                }
                ${e?.email ? `<li>Correo Electrónico: ${e.email}</li>` : ""}
                ${e?.phone ? `<li>Celular: ${e.phone}</li>` : ""}
                ${carrera ? `<li>Carrera: ${carrera.name}</li>` : ""}
            </ul>
        `;
    carrera?.materias &&
      loadAsignaturas(carrera.materias, e?.dni);
    refreshInscripciones(e?.dni);
  }
};

const handleSelectItem = (e, dni) => {
  e.preventDefault();

  if (estudiantes) {
    const estudiante = estudiantes.filter((e) => e.dni === dni)[0];

    loadProfileEstudiante(estudiante);
  }
};

const loadEstudianteResult = () => {
  const list = estudiantes;
  const domContent = document.getElementById("search-result-content");
  const dom = document.getElementById("search-result");
  if (dom) {
    dom.innerHTML = "";
    list.forEach((e) => {
      let article = document.createElement("article");
      article.classList.add("table-list-item");
      article.id = e.dni;
      article.innerHTML = `<span>${e.dni}</span><span>${e.name}</span>`;

      let buttonSelect = document.createElement("button");
      buttonSelect.type = "search"; //cambiar
      buttonSelect.addEventListener("click", (el) =>
        handleSelectItem(el, e.dni)
      );
      buttonSelect.innerHTML = "Elegir";

      article.append(buttonSelect);

      dom.append(article);
    });
    if (domContent) {
      domContent.removeAttribute("hidden");
    }
  }
};

export const loadInscripcionFormFunction = () => {
  const form = document.getElementById("search-form");
  if (form) {
    let searchConfig = SearchConfig;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let inputs = e.target.querySelector("#inputs");
      inputs.childNodes.forEach((e) => {
        if (
          ["input", "select"].includes(String(e.tagName).toLocaleLowerCase())
        ) {
          searchConfig = { ...searchConfig, [e.name]: e.value || "" };
        }
      });

      estudiantes = searchElements(
        collections.estudiante,
        searchConfig.type,
        searchConfig.s
      );

      if (estudiantes) {
        loadEstudianteResult();
      }
    });
  }
};
