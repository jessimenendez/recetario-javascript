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

let croquetas_garb = "400gr garbanzos cocidos Cebolla 2 o 3 Ajos 3 champiñones 300ml de yogur o kéfir vegetal SIN AZÚCAR Queso vegano 2 cdas soperas de Harina de garbanzo 1/2 taza agua Pan rallado con ajo y perejil Aceite de oliva Curry en polvo Ajo en polvo Pimienta negra Sal"
let procedimiento_croquetas = "procedimiento a completar"

let texto_receta = document.getElementById("texto_receta");
let receta_elegida = document.getElementById("input_search");
console.log(receta_elegida)
let btn_buscar = document.getElementById("btn-buscar");



const recetas =[{    
    nombre:'Pollo Frito',
    ingredientes: pollo_frito,
    procedimiento: procedimiento_pollo_frito,
    imagen: "asset/pollo_frito.jpg" 
},
{
    nombre:'Crema chantilly',
    ingredientes: crema_chantilly,
    procedimiento:procedimiento_crema,
    imagen: "asset/crema.png"
},
{
    nombre:'Bizcochuelo',
    ingredientes: bizcochuelo,
    procedimiento: procedimiento_bizcochuelo,
    imagen: "asset/el-bizcochuelo.png"
},
{
    nombre:'Croquetas de garbanzo',
    ingredientes: croquetas_garb,
    procedimiento: procedimiento_croquetas,
    imagen: "asset/croquetas-garbanzos-veganas.jpg"
}
]

window.addEventListener("load", () => {
    if (localStorage.getItem("array_recetas")) { 
      arr_recetas_buscadas = JSON.parse(localStorage.getItem("array_recetas"));     
      generar_interfaz_recetas_buscadas(arr_recetas_buscadas)
    }
})


const generar_interfaz = (array) => {
    let contenedor = document.getElementById("container_recetas");
    contenedor.innerHTML = "";
    if(array.length > 0){
        array.map( el => contenedor.innerHTML += `
        <div class="container-fluid">        
        <div class="card" id="${el.nombre}" style="width: 18rem;">
          <img class="card-img-top" src="${el.imagen}" alt="Card image">
          <div class="card-body">
            <h5 class="card-title">${el.nombre}</h5>
            <p class="card-text">${el.ingredientes}</p>
            <p class="card-text">${el.procedimiento}</p>                              
          </div>
        </div>
        </div>`)
    }else{
        //Se reemplaza usando la librería SWEET ALERT
        //contenedor.innerText = "No se encontró receta. Pronto estaremos sumando mas a nuestro catálogo :)"
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No tenemos esa receta, pronto la agregaremos a nuestro catálogo ☺'           
          })
    }

}

const generar_interfaz_recetas_buscadas = (array) => {
    let contenedor = document.getElementById("container_recetas");
    contenedor.innerHTML = "";
    if(array.length > 0){
        array.map( el => contenedor.innerHTML += ` 
        <div class="container-fluid">       
        <div class="card" id="${el.nombre}" style="width: 18rem;">
            <p class="card-text mb-4">Recetas buscadas recientemente</p>   
            <h5 class="card-title mb-4">${el.nombre}</h5>
            <button id="verdenuevo" type="button" class="button mb-4">Volver a ver</button>                                     
        </div>
        </div>
      `)
    }else{
        //contenedor.innerText = "No se encontró receta. Pronto estaremos sumando mas a nuestro catálogo :)"
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No tenemos esa receta, pronto la agregaremos a nuestro catálogo ☺'           
          })
    }

}

btn_buscar.addEventListener("click", (e) => {
    e.target.value
    if(receta_elegida.value){
        let filtro_receta = recetas.filter( el => el.nombre.toLowerCase().includes(receta_elegida.value.toLowerCase()))
        localStorage.setItem("array_recetas", JSON.stringify(filtro_receta))
        generar_interfaz(filtro_receta);
        console.log(filtro_receta)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ingresaste ninguna receta'           
          })
    }
   
})

//si esta el boton para volver a ver la receta, la muestro nuevamente cuando recibe el click
document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'verdenuevo'){
        arr_recetas_buscadas = JSON.parse(localStorage.getItem("array_recetas")); 
        generar_interfaz(arr_recetas_buscadas);
     }
 });



//se deja código para usar luego
// receta_elegida.addEventListener("keyup", (e) => {
//     e.target.value
//     let filtro = recetas.filter( el => el.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
//     generar_interfaz(filtro)
//     console.log(filtro)
// })


