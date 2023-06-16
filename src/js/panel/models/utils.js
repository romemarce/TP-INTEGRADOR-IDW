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

const handleEditItem = (e, idParam) => {
  e.preventDefault();

  let item = document.getElementById(e.target.parentNode.id);
  let itemId = item.id.replace("item-list-", "");

  alert(itemId, idParam);
};

/**
 * Obtiene los elementos de una coleccion.
 * @param {dom} result dom.
 * @param {collection} collection.
 * @param {id} index param.
 */
export const loadCollectionList = (dom_id, collection, id = "id") => {
  const list = getElements(collection);
  const dom = document.getElementById(dom_id);
  if (dom) {
    dom.innerHTML = "";
    list.forEach((e) => {
      const elementId = "item-list-" + String(e[id]);

      let article = document.createElement("article");
      article.classList.add("table-list-item");
      article.id = elementId;
      article.innerHTML = `<span>${e[id]}</span><span>${e.name}</span>`;

      // let buttonEdit = document.createElement("button");
      // buttonEdit.type = "edit";
      // buttonEdit.addEventListener("click", (e) => handleEditItem(e, id));
      // buttonEdit.innerHTML = "Editar";

      // article.append(buttonEdit);

      let buttonDelete = document.createElement("button");
      buttonDelete.type = "delete";
      buttonDelete.addEventListener("click", (e) => handleDeleteItem(e));
      buttonDelete.innerHTML = "Eliminar";

      article.append(buttonDelete);

      dom.append(article);
    });
  }
};

/**
 * 
 * @param {collection} collection 
 * @param {listId} listado de ids 
 * @param {key} clave 
 * @returns
 */

export const getListObjetCollection = (collection, listId, key = "id") => {
  const result = [];
  collection.forEach((item) => {
    // listId : [1,23,4,5,6] ids
    if (listId.includes(parseInt(item[key]))) {
      result.push(item);
    }
  });
  return result;
};
