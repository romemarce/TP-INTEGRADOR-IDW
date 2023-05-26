import { getDatabase, setDatabase } from "../database.js"

const db = getDatabase();
export const importExampleMaterias = async () => {
  const list = await fetch('./src/db/materias.json').then(res => res.json())
  list.forEach(e => {
    db.materias.push(e)
  });
  setDatabase(db);
}

// export const importExampleCarreras = async () => {
//   const list = await fetch('./src/db/carreras.json').then(res => res.json())
//   list.forEach(e => {
//     db.materias.push(e)
//   });
//   setDatabase(db);
// }
// export const importExampleEstudiantes = async () => {
//   const list = await fetch('./src/db/carreras.json').then(res => res.json())
//   list.forEach(e => {
//     db.materias.push(e)
//   });
//   setDatabase(db);
// }