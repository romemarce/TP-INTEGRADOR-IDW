import { sendNotification } from "../components.js";
import { getDatabase, setDatabase } from "../database.js";

/**
 * Enumeracion de colecciones
 */
export const collections = {
  estudiante: "estudiantes",
  materia: "materias",
  carrera: "carreras",
};

/**
 * Agrega un elemento a la coleccion.
 * @param {id} del elemento.
 * @param {collection} coleccion actual.
 */
export const addNewElement = (element, collection) => {
  const db = getDatabase();

  const list = db[collection] || [];

  if (list.length === 0) {
    const id = 0;
    db[collection].push({ ...element, id });
  } else {
    const lastElement = list[list.length - 1];
    let id = lastElement?.id + 1;
    db[collection].push({ ...element, id });
  }
  setDatabase(db);
};

/**
 * Elimina un elemento de la coleccion.
 * @param {id} del elemento.
 * @param {collection} coleccion actual.
 */
export const removeElement = (id, collection) => {
  const db = getDatabase();
  const newCollection = db[collection].filter(
    (e) => parseInt(e.id) !== parseInt(id)
  );
  db[collection] = newCollection;
  setDatabase(db);
};

/**
 * Obtiene los elementos de una coleccion.
 * @param {collection} coleccion actual.
 * @returns {Array} listado de elementos
 */
export const getElements = (collection) => {
  const db = getDatabase();
  return db[collection];
};

/**
 * Busca la existencia de un elemento
 * @param {collection} coleccion actual.
 * @param {searchBy} elemento de busqueda.
 * @param {element} elemento a comparar.
 * @return boolean
 */
export const searchElement = (collection, searchBy = "id", element) => {
  const db = getDatabase();

  const result = db[collection].filter(
    (e) => e[searchBy] === element[searchBy]
  );
  if (result.length > 0) return true;
  return false;
};

/**
 * Busca y retornar los elementos encontrados
 * @param {collection} coleccion actual.
 * @param {searchBy} elemento de busqueda.
 * @param {element} elemento a comparar.
 * @return boolean
 */
export const searchElements = (collection, searchBy = "id", search = "") => {
  const db = getDatabase();

  let result = [];
  // corregir RoMe
  if (searchBy === "lastnameOrName") {
    result = db[collection].filter((e) => {
      const fullName = `${e?.name} ${e?.lastname}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
  } else {

    const text = (e)=>String(e[searchBy]).toLowerCase();
    const searchParam = String(search).toLowerCase();



    result = db[collection].filter((e) => text(e).includes(searchParam));
  }

  if (result.length > 0) return result;
  return false;
};

/**
 * Busca y retornar los elementos encontrados
 * @param {collection} coleccion actual.
 * @param {element} elemento a comparar.
 * @return boolean
 */
export const searchElementByName = (collection, search = "") => {
  const db = getDatabase();

  let result = db[collection].filter((e) => e?.name.includes(search));

  if (result.length > 0) return result;
  return false;
};

/**
 * Actualiza los elementos de una coleccion.
 * @param {element} elemento actualizado.
 * @param {collection} coleccion actual.
 */
export const updateElement = (element, collection) => {
  const db = getDatabase();
  const list = db[collection] || [];
  if (list.length > 0) {
    list.forEach((e) => {
      if (parseInt(e.id) === parseInt(element.id)) {
        e = { ...e, ...element };
      }
    });
    db[collection] = list;
    setDatabase(db);
  }
};
/**
 * Recarga la pagina
 */
export const reloadPage = () => {
  window.location.reload();
};
