import { getDatabase, setDatabase } from "../database.js";

/**
 * Enumeracion de colecciones
 */
export const collections = {
    estudiante: "estudiantes",
    materia: "materias",
    carrera: "carrears"
}


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
export const removeElement = (id, collection)=>{
    const db = getDatabase();
    const newCollection = db[collection].filter(e => parseInt(e.id) !== parseInt(id))
    db[collection] = newCollection
    setDatabase(db);
}

/**
 * Obtiene los elementos de una coleccion.
 * @param {collection} coleccion actual.
 * @returns {Array} listado de elementos
 */
export const getElements = (collection) => {
    const db = getDatabase();
    return db[collection]
}

/**
 * Actualiza los elementos de una coleccion.
 * @param {element} elemento actualizado.
 * @param {collection} coleccion actual.
 */
export const updateElement = (element, collection) =>{
    const db = getDatabase();
    const list = db[collection] || []
    if (list.length > 0) {
        list.forEach( e => {
            if(parseInt(e.id) === parseInt(element.id)){
                e = {...e, ...element}
            }
        } )
        db[collection] = list
        setDatabase(db);
    }
}
