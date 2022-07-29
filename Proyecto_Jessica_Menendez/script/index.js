//Se intenta simular un recetario, donde el usuario pueda buscar recetas y sugerir que se agregue alguna,
//si la que busca no está en el catálogo

let crema_chantilly = "-200 g de crema para montar fría \n-40 g de azúcar impalpable \n-Media cucharadita de extracto de vainilla";
let procedimiento_crema = "Ponemos en un bowl 200 g de crema para batir muy fría junto con 40 g de azúcar glas y media cucharadita de extracto de vainilla. \nBatir hasta obtener una crema firme.";

let pollo_frito = "-1 pechuga de pollo\n-1 huevo\n-Pan rallado\n-Sal y condimentos a gusto\n-Aceite para freír";
let procedimiento_pollo_frito = "Cortar la pechuga en tiras gruesas. Pasarlas por el huevo batido condimentado. Y por último pasarlas por el pan rallado. Freír con abundante aceite caliente.";

let bizcochuelo = "200 g de harina leudante \n200 g de azúcar\n6 huevos\nEsencia de vainilla, opcional.";
let procedimiento_bizcochuelo = "Colocar los huevos y el azúcar en un bowl, y batir hasta llegar a un punto letra. Dejar de batir. Tamizar la harina e ir agregando poco a poco y con una espátula. Integrar con movimientos envolventes. Enmantecar y enharinar un molde. Verter la mezcla y llevar a un horno moderado a 180° durante cerca de 40 minutos. Dejar enfriar y desmoldar.";

let receta_elegida = prompt("Hola! Ingresá el nombre de la receta que quieras ver");
//let receta_elegida = document.getElementById("nombre_receta").value;
console.log(receta_elegida)

let texto_receta = document.getElementById("texto_receta");
let parrafo_principal = document.getElementById("mensaje")


const recetas =[{
    id:1,
    nombre:'Pollo Frito',
    ingredientes: pollo_frito,
    procedimiento: procedimiento_pollo_frito
},
{
    id:2,
    nombre:'Crema chantilly',
    ingredientes: crema_chantilly,
    procedimiento:procedimiento_crema
},
{
    id:3,
    nombre:'Bizcochuelo',
    ingredientes: bizcochuelo,
    procedimiento: procedimiento_bizcochuelo
}
]

//Se agrega función para simular que el usuario ingrese una receta que no exista y pueda consultar proximamente
function recetas_solicitadas(arr){
    let receta_usuario = prompt("Ingrese el nombre de la receta que queres que agreguemos :)")
    console.log(receta_usuario)
    if(receta_usuario !== ""){
        arr.push(receta_usuario)
        parrafo_principal.innerText = ""
        texto_receta.innerText = "Gracias por tu sugerencia, la agregaremos muy pronto"
        //alert("Gracias por tu sugerencia, la agregaremos muy pronto")
    }
}

function mostrar_receta(arr){
    //Se quita el for que recorría y buscaba la receta, por el metodo find. Además se agrega el include
    //para buscar por coincidencia de palabras
    const resultado = arr.find((el) => el.nombre.toUpperCase().includes(receta_elegida.toUpperCase()))
    if(resultado){
        texto_receta.innerText = resultado.nombre + "\n" + resultado.ingredientes + "\n" + resultado.procedimiento
        //alert(resultado.nombre + "\n" + resultado.ingredientes + "\n" + resultado.procedimiento)
    }
    else{
        alert("Aún no tenemos esa receta en nuestro catálogo. Pronto podrás encontrar mas recetas :)")
        let recetas_sug = []
        recetas_solicitadas(recetas_sug)
        console.log(recetas_sug)
    }
}

mostrar_receta(recetas)

