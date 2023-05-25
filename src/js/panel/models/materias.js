import { addNewElement, collections, getElements, removeElement } from "./controller.js";

const Materia = {
  name: "",
  hours: 0,
  isQuarterly: false,
  quarterly: "", // Primer o segundo cuatrimestre
};

export const loadMateriaFormFunction = (formDom) => {
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
          newMateria = {...newMateria, [el.name]: (el.checked) ? true : false};
        } else if (el.type === "radio") {
          if (el.checked) newMateria = { ...newMateria, [el.name]: el.value };
        } else {
          newMateria = { ...newMateria, [el.name]: el.value };
        }
      });
      
      if (!newMateria.isQuarterly)
        newMateria = { ...newMateria, quarterly: "" };

      // newMateria is ready

      addNewElement(newMateria, collections.materia);

      window.location.reload();
    });
  }
};

const handleDeleteItem = (e) => {
  e.preventDefault();
  let item = document.getElementById(e.target.parentNode.id);
  let itemId = item.id.replace("item-list-", "");

  if (confirm(`Desea eliminar el elemento ?`)) {
    removeElement(itemId, collections.materia);
    item.remove();
  }
};

export const loadMaterias = (resultDom) => {
  const materias = getElements(collections.materia);
  // list.forEach((e = Materia)=>{
  resultDom.innerHTML = "";
  materias.forEach(({ id, name }) => {
    const elementId = "item-list-" + String(id);

    let article = document.createElement("article");
    article.classList.add("table-list-item");
    article.id = elementId;
    article.innerHTML = `<span>${id}</span><span>${name}</span>`;

    let buttonDelete = document.createElement("button");
    buttonDelete.type = "delete";
    buttonDelete.addEventListener("click", (e) => handleDeleteItem(e));
    buttonDelete.innerHTML = "Eliminar";

    // Faltaria actualizar

    article.append(buttonDelete);

    resultDom.append(article);
  });
};
