
const buscar = document.getElementById("buscar");
const input = document.getElementById("input");
const grilla = document.querySelector(".grilla");
const opciones = document.querySelectorAll(".lugares");
const info = document.querySelector(".info")
let arrInfo = [];
let objLugares;

const busqueda = async (valor)=>{
    let busqueda = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${valor}.json?limit=5&language=es&access_token=pk.eyJ1IjoibHVjYXNiZW4wMDc0IiwiYSI6ImNsbWpmOGdqbjAzMncyanJ4aXNidGNoZDEifQ.c0MLPDCWLD1dPHONO-xUvA`);
    let busquedaActive = busqueda.data.features;
    return busquedaActive.map(lugares =>
        ({
            name: lugares.place_name,
            lat: lugares.center[1],
            long : lugares.center[0]
        }))
}

buscar.addEventListener("click",async ()=>{
    let i = 0;
    let valorInput = input.value;
    if(valorInput){
        opciones.innerHTML = ""
        objLugares = await busqueda(valorInput);
        objLugares.forEach(l =>{
            opciones[i].textContent = l.name;
            opciones[i].id = i;
            arrInfo[i] = l;
            i++;

        })
        
    }
})

if(grilla.textContent !== ""){

    opciones.forEach(node =>{
        node.addEventListener("click",(e)=>{

            info.innerHTML = ""
            let nombre = arrInfo[e.target.id].name;
            let latitud = arrInfo[e.target.id].lat;
            let longitud = arrInfo[e.target.id].long;

            info.innerHTML = `  <h2> CIUDAD: ${nombre} </h2>
                                <p> \n Cordenadas </p>
                                <p>longitud: ${longitud} </p>
                                <p>latitud: ${latitud} </p>`
        })
    })

}