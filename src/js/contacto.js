const URL = '/src/db/contactos.json'
const URL_BUSCADOR='/src/db/contactos.json/users?name='
async function Contact(){
   const res= await fetch(URL)
   const data= await res.json();
            let listDom = "";
            for ({name,tel} of data) {
                listDom += `<tr><td class="name">${name}</td>
                            <td class="numero">${tel}</td></tr>`;
            }
            document.getElementById("contactos").innerHTML = listDom;
}

// async function Buscar(){
//     document.getElementById("buscar").addEventListener("click",()=>{
//         fetch(URL+ document.getElementById("usuario").value)
//             .then(res =>res.json())
//             .then(date =>{
//                 if (date.length == 1)
//                     document.getElementById("contacto").innerHTML=
//                     `<p>Nombre:${date[0].name}</p>
//                     <p>Telefono:${date[0].tel}</p>`;
//                 else
//                     document.getElementById("contacto").innerHTML = 'No existe el usuario con name=' +
//                     document.getElementById("usuario").value;
//             })
//     })
     
// }

Contact();
// Buscar();