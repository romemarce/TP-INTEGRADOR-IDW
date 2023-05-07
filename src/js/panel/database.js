// Define utils database
const KEYNAME = "db_romero_panozzo"
const LOCAL_STORAGE = window.localStorage

export const setDatabase = (obj = {}) =>{
  const value = JSON.stringify(obj)
  LOCAL_STORAGE.setItem(KEYNAME, value)

  console.log(`db actualizada!!`);
}

export const getDatabase = () => {
  const item = LOCAL_STORAGE.getItem(KEYNAME)
  const data = JSON.parse(item)
  return data
}

export const initDatabase = ()=>{
  const databaseInit = {
    estudiantes: [],
    materias: [],
    carreras: []
  }
  
  const currentDatabase = getDatabase()
  if (!currentDatabase) {
    setDatabase(databaseInit)
  }
}