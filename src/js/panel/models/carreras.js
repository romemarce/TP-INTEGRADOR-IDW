import { getDatabase } from "../database.js";

const { materias } = getDatabase();
const sectionMateria = document.getElementById('section-materia');

const loadMateriasInCarrera = ()=>{
  const selectOptions = sectionMateria.querySelector("select")
  materias.forEach(e => {
    selectOptions.innerHTML +=`<option value="${e.id}">${e.name}</option>`;
  });
  
  const buttonAdd = sectionMateria.querySelector("button");
  buttonAdd.addEventListener("click", (e)=>{
    e.preventDefault();
  })
}
const addEventButton = ()=>{

}

export const loadCarreraFormFunction = ()=>{
  loadMateriasInCarrera()
}