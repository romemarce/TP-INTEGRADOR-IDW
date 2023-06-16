import { reloadPage, sendNotification } from "../components.js";
import { addNewElement, collections, searchElement } from "./controller.js";

export const loadMateriaFormFunction = () => {
  const formDom = document.getElementById("materia-form");
  if (formDom) {
    formDom.addEventListener("submit", (e) => {
      e.preventDefault();

      let inputs = e.target.querySelector("#inputs");
      let newMateria = {};
      inputs.childNodes.forEach((e) => {
        if (
          ["input", "select"].includes(String(e.tagName).toLocaleLowerCase())
        ) {
          newMateria = { ...newMateria, [e.name]: e.value || "" };
        }
      });

      // chequear si existe
      if (searchElement(collections.materia, "name", newMateria)) {
        sendNotification("La materia ya existe");
      } else {
        // agregar item
        addNewElement(newMateria, collections.materia);
        sendNotification("Materia creada!!");
        reloadPage();
      }
    });
  }
};
