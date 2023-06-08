import { reloadPage, sendNotification } from "../components.js";
import {
  addNewElement,
  collections,
  getElements,
  removeElement,
} from "./controller.js";

const Materia = {
  name: "",
  hours: 0,
  isQuarterly: false,
  quarterly: "", // Primer o segundo cuatrimestre
};

export const loadMateriaFormFunction = () => {
  const formDom = document.getElementById("materia-form")
  if (formDom) {
    let newMateria = Materia;

    const isQuarterlyDom = document.getElementById("check-bin");
    if (isQuarterlyDom) {
      const checkbox = isQuarterlyDom.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          // Es seleccionado
          const radiobox = document.getElementById("radio-bin");
          radiobox.classList.remove("hidden");
        } else {
          const radiobox = document.getElementById("radio-bin");
          radiobox.classList.add("hidden");
          // Reseteo
          const radios = radiobox.querySelectorAll("input[type='radio']");
          radios.forEach((el) => {
            el.checked = false;
          });
        }
      });
    }

    formDom.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = formDom.querySelectorAll("input");

      inputs.forEach((el) => {
        if (el.type === "checkbox") {
          newMateria = { ...newMateria, [el.name]: el.checked ? true : false };
        } else if (el.type === "radio") {
          if (el.checked) newMateria = { ...newMateria, [el.name]: el.value };
        } else {
          newMateria = { ...newMateria, [el.name]: el.value };
        }
      });

      if (!newMateria.isQuarterly)
        newMateria = { ...newMateria, quarterly: "" };

      addNewElement(newMateria, collections.materia);

      reloadPage();
    });
  }
};