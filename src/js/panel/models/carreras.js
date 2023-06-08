import { getDatabase, setDatabase } from "../database.js";
import { addNewElement, collections, getElements, reloadPage, removeElement, searchElement } from "./controller.js";

// Incompleto
const sectionMateria = document.getElementById("section-materia");

const db = getDatabase();

const currentMaterias = {
  optionList: [], // select
  selected: [], // selected
};

if (db?.materias) currentMaterias.optionList = db?.materias || [];
// if (db?.carreras) {
//   const carreras = db?.carreras || []
//   const result = carreras.filter(e => !currentMaterias.optionList.includes(e.materias))

//   console.log(result);
// }

const updateMateriaList = () => {
  const listDom = document.getElementById("selected-list");
  listDom.innerHTML = "";
  if (listDom) {
    currentMaterias.selected.forEach(({ id, name }) => {
      const article = document.createElement("article");
      article.classList.add("table-list-item");
      article.innerHTML = `<span>${id}</span> <span>${name}</span>`;
      article.id = `item-list-${id}`;

      const button = document.createElement("button");
      button.type = "delete";
      button.innerHTML = "Quitar";

      button.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("quitar");

        const id = String(e.target.parentNode.id).replace("item-list-", "");
        const returnToList = currentMaterias.selected.filter(
          (e) => parseInt(e.id) === parseInt(id)
        )[0];
        // Quitar de selected list
        removeElementArrayById(id, currentMaterias.selected);
        // Poner en OptionList
        currentMaterias.optionList.push(returnToList);

        // Actualizar listado option
        refreshSelectOptionList();

        e.target.parentNode.remove();
      });

      article.append(button);
      listDom.append(article);
    });
  }
};

const refreshSelectOptionList = () => {
  if (sectionMateria) {
    const select = sectionMateria.querySelector("select");
    select.innerHTML = "";
    currentMaterias.optionList.forEach((e) => {
      select.innerHTML += `<option value="${e.id}">${e.name}</option>`;
    });
  }
};

const removeElementArrayById = (id, list) => {
  const positionArray = list.findIndex((e) => parseInt(e.id) === parseInt(id));
  if (positionArray !== -1) list.splice(positionArray, 1);
};

const loadMateriasInCarrera = () => {
  if (sectionMateria) {
    refreshSelectOptionList();
    const selectOptions = sectionMateria.querySelector("select");

    const buttonAdd = sectionMateria.querySelector("button");
    buttonAdd.addEventListener("click", (e) => {
      e.preventDefault();

      const id = selectOptions.value; // selected value
      if (id) {
        const selectedMateria = db?.materias.filter(
          (e) => parseInt(e.id) === parseInt(id)
        )[0];

        // Quitar del listado select dom
        Object.values(selectOptions.childNodes).forEach(
          (e) => parseInt(e.value) === parseInt(id) && e.remove()
        );
        // Quitar del listado optionList
        removeElementArrayById(id, currentMaterias.optionList);
        // Poner en el listado selected
        currentMaterias.selected.push(selectedMateria);

        // Actualizar listado selected
        updateMateriaList();
      }
    });
  }
};

export const loadCarreraFormFunction = () => {
  loadMateriasInCarrera();

  const carreraForm = document.getElementById("carrera-form");
  if (carreraForm)
    carreraForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let inputs = e.target.querySelector("#inputs")
      let newCarrera = {};
      inputs.childNodes.forEach((e) => {
        if (
          ["input", "select"].includes(String(e.tagName).toLocaleLowerCase())
        ) {
          newCarrera = { ...newCarrera, [e.name]: e.value || "" };
        }
      });

      let materias = []
      currentMaterias.selected.forEach(e => materias.push(parseInt(e.id)));
      newCarrera = {...newCarrera, materias}

      // chequear si existe
      if (searchElement(collections.carrera, "name", newCarrera)) {
        console.log("la carrera ya existe");
      }else{
        // agregar item
        addNewElement(newCarrera, collections.carrera)
        reloadPage();
      }
    });
};
