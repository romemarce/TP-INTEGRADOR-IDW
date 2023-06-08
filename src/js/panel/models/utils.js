import { getElements } from "./controller.js";

// Funciones compartidas
const handleDeleteItem = (e) => {
  e.preventDefault();
  let item = document.getElementById(e.target.parentNode.id);
  let itemId = item.id.replace("item-list-", "");

  if (confirm(`Desea eliminar el elemento ?`)) {
    removeElement(itemId, collections.materia);
    item.remove();
  }
};
/**
 * Obtiene los elementos de una coleccion.
 * @param {dom} result dom.
 * @param {collection} collection.
 * @param {dni} index param.
 */
export const loadCollectionList = (dom_id, collection, id = "id") => {
  const list = getElements(collection);
  const dom = document.getElementById(dom_id)
  if (dom) {
      dom.innerHTML = "";
      list.forEach((e) => {
        const elementId = "item-list-" + String(e[id]);
    
        let article = document.createElement("article");
        article.classList.add("table-list-item");
        article.id = elementId;
        article.innerHTML = `<span>${e[id]}</span><span>${e.name}</span>`;
    
        let buttonDelete = document.createElement("button");
        buttonDelete.type = "delete";
        buttonDelete.addEventListener("click", (e) => handleDeleteItem(e));
        buttonDelete.innerHTML = "Eliminar";
    
        article.append(buttonDelete);
    
        dom.append(article);
      });
  }
};
