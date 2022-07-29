//Se intenta simular un recetario, donde el usuario pueda buscar recetas y sugerir que se agregue alguna,
//si la que busca no está en el catálogo

class Receta {
    constructor(nombre, ingredientes, procedimiento){
        this.nombre = nombre
        this.ingredientes = ingredientes
        this.procedimiento = procedimiento
    }
}

let crema_chantilly = "-200 g de crema para montar fría \n-40 g de azúcar impalpable \n-Media cucharadita de extracto de vainilla";
let procedimiento_crema = "Ponemos en un bowl 200 g de crema para batir muy fría junto con 40 g de azúcar glas y media cucharadita de extracto de vainilla. \nBatir hasta obtener una crema firme.";

let pollo_frito = "-1 pechuga de pollo\n-1 huevo\n-Pan rallado\n-Sal y condimentos a gusto\n-Aceite para freír";
let procedimiento_pollo_frito = "Cortar la pechuga en tiras gruesas. Pasarlas por el huevo batido condimentado. Y por último pasarlas por el pan rallado. Freír con abundante aceite caliente.";

let bizcochuelo = "-200 g de harina leudante \n-200 g de azúcar\n-6 huevos\n-Esencia de vainilla, opcional.";
let procedimiento_bizcochuelo = "Colocar los huevos y el azúcar en un bowl, y batir hasta llegar a un punto letra. Dejar de batir. Tamizar la harina e ir agregando poco a poco y con una espátula. Integrar con movimientos envolventes. Enmantecar y enharinar un molde. Verter la mezcla y llevar a un horno moderado a 180° durante cerca de 40 minutos. Dejar enfriar y desmoldar.";


let texto_receta = document.getElementById("texto_receta");


const recetas =[{    
    nombre:'Pollo Frito',
    ingredientes: pollo_frito,
    procedimiento: procedimiento_pollo_frito
},
{
    nombre:'Crema chantilly',
    ingredientes: crema_chantilly,
    procedimiento:procedimiento_crema
},
{
    nombre:'Bizcochuelo',
    ingredientes: bizcochuelo,
    procedimiento: procedimiento_bizcochuelo
}
]

let receta_elegida = document.getElementById("input_search");
console.log(receta_elegida)
let btn_buscar = document.getElementById("btn-buscar")

const generar_interfaz = (array) => {
    let contenedor = document.getElementById("container_recetas");
    contenedor.innerHTML = "";
    if(array.length > 0){
        array.map( el => contenedor.innerHTML += `
        <div class="card" id="${el.nombre}" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${el.nombre}</h5>
          <p class="card-text">${el.ingredientes}</p>
          <p class="card-text">${el.procedimiento}</p>                              
          </div>
      </div>`)
    }else{
        contenedor.innerText = "No se encontró receta. Pronto estaremos sumando mas a nuestro catálogo :)"
    }

}
btn_buscar.addEventListener("click", (e) => {
    e.target.value
    let filtro = recetas.filter( el => el.nombre.toLowerCase().includes(receta_elegida.value.toLowerCase()))
    generar_interfaz(filtro);
    console.log(filtro)
})


//se deja código para usar luego
// receta_elegida.addEventListener("keyup", (e) => {
//     e.target.value
//     let filtro = recetas.filter( el => el.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
//     generar_interfaz(filtro)
//     console.log(filtro)
// })


