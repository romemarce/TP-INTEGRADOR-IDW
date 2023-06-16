import { sendNotification } from "../components.js";
import { getDatabase } from "../database.js";
import {
  addNewElement,
  collections,
  reloadPage,
  searchElement,
} from "./controller.js";

const db = getDatabase();
let carreras = db?.carreras || [];


const loadCarreaOptions = ()=>{
    const carreraOptionDom = document.getElementById("carrera-option");
    if (carreraOptionDom)
    carreras.forEach((e) => {
      carreraOptionDom.innerHTML += `<option value="${e.id}">${e.name}</option>`;
    });
}


export const loadEstudianteFormFunction = () => {
    loadCarreaOptions();
    const form = document.getElementById("estudiante-form");
    if (form)
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let inputs = e.target.querySelector("#inputs")
        let newEstudiante = {};
        inputs.childNodes.forEach((e) => {
          if (
            ["input", "select"].includes(String(e.tagName).toLocaleLowerCase())
          ) {
            newEstudiante = { ...newEstudiante, [e.name]: e.value || "" };
          }
        });

        // chequear si existe
        if (searchElement(collections.estudiante, "dni", newEstudiante)) {
            sendNotification("El estudiante ya existe");
          }else{
            // agregar item
            addNewElement(newEstudiante, collections.estudiante)
            sendNotification("Estudiante creado");
          reloadPage();
        }
      });
};


