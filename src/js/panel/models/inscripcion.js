// search-form
import {
  collections,
  getElements,
  searchElementByName,
  searchElements,
} from "./controller.js";

let estudiantes = false;
const SearchConfig = {
  s: "",
};

const loadSearchMateriaForm = () => {
  const form = document.getElementById("search-materia");
  let search = SearchConfig;
  if (form) {
    console.log("CONTINUAR ACA")
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let inputs = e.target.querySelector("#inputs");
      inputs.childNodes.forEach((e) => {
        if (["input"].includes(String(e.tagName).toLocaleLowerCase())) {
          search = { ...search, [e.name]: e.value || "" };
        }
      });

      let materias = searchElementByName(collections.materia, search.s);

      if (materias) {
        console.log(materias);
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

    loadSearchMateriaForm();
  }
};

const handleSelectItem = (e, dni) => {
  e.preventDefault();
  console.log("seleciona", dni);

  if (estudiantes) {
    loadProfileEstudiante(estudiantes.filter((e) => e.dni === dni)[0]);
  }
};

const loadEstudianteResult = () => {
  const list = estudiantes;
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
