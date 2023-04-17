const URL = '/src/db/contactos.json'
fetch(URL)
.then(response => response.json())
.then(datos=>{
    let listDom = "";
    for ({name,tel} of datos) {
        listDom += `<tr><td>${name}</td>
                    <td>${tel}</td></tr>`;
    }
    document.getElementById("contactos").innerHTML = listDom;
});