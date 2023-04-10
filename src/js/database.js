// Define utils database
const KEYNAME = "__database_uner"
const LOCAL_STORAGE = window.localStorage

export const setDatabase = (obj = {}) =>{
  const value = JSON.stringify(obj)
  LOCAL_STORAGE.setItem(KEYNAME, value)

  console.log("Data is saved");
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