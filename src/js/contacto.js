const URL = '/src/db/contactos.json'
async function Contact(){
   const res= await fetch(URL)
   const data= await res.json();
            let listDom = "";
            for ({name,tel} of data) {
                listDom += `<tr><td>${name}</td>
                            <td>${tel}</td></tr>`;
            }
            document.getElementById("contactos").innerHTML = listDom;
}

async function Buscar(){

}

Contact();