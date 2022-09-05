//Se intenta simular un recetario, donde el usuario pueda buscar recetas y verla mas en detalle a traves de un modal
//Buscar en ingres (ej: chicken)

let texto_receta = document.getElementById("texto_receta");
let receta_elegida = document.getElementById("input_search");
let btn_buscar = document.getElementById("btn-buscar");

/*
Obteniendo y mostrando recetas de la API themealdb
utilizando promesas
*/

let listado_recetas;
let id_meals;
let lista_ingredientes = [];
let resultado;

//fetch al servicio para traer recetas (esta en ingles)
const fetchRecetas = async () => {
    try{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + receta_elegida.value)
        const data = await response.json() 
        listado_recetas = data.meals;
        console.log("listado recetas!! ",listado_recetas);  
        renderizarReceta(data.meals);      
    }
    catch (error){
        console.log(error)
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No tenemos esa receta, pronto la agregaremos a nuestro catálogo ☺'           
          })
    }
    
}


//muestro las recetas que obtengo del servicio
const renderizarReceta = (recetas) => {
    const recetasContainer = document.getElementById('container_recetas');
    for(const receta of recetas) {
        recetasContainer.innerHTML += `
        <div class="card m-3" style="width: 18rem;">
            <img src="${receta.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${receta.strMeal}</h5>
            <button type="button" class="btn btn-primary " data-target="#myModal" id=${receta.idMeal}>Ver receta</button>         
            </div>
        </div>
        `
    }
}

//cuando se haga click en Buscar se consulta al servicio con la palabra ingresada y se mustran por pantalla
btn_buscar.addEventListener('click', fetchRecetas)

window.addEventListener("load", () => {
    if (localStorage.getItem("array_recetas")) { 
      arr_recetas_buscadas = JSON.parse(localStorage.getItem("array_recetas"));     
      generar_interfaz_recetas_buscadas(arr_recetas_buscadas)
    }
})

//boton que muestra la receta mas en detalle
document.addEventListener('click',function(e){
    //console.log(e)
        if(e.target.localName === 'button' && e.type === 'click' && e.target.innerHTML === 'Ver receta'){
            renderizarRecetaSeleccionada(e.target.id);
            let list_ingredientes = document.getElementById('lista_ingredientes')
            list_ingredientes.innerHTML = ""
            if(lista_ingredientes){
                lista_ingredientes.forEach(function(e){
                    let li = document.createElement('li');
                    li.innerText = e;
                    list_ingredientes.append(li);
                 })               
            }
            
            $('#myModal').modal('show')
                      
        }
 });

 //se cierra el modal
  document.addEventListener('click',function(e){
         if(e.target.id === 'close_modal' || e.target.id === 'close-x'){            
             $('#myModal').modal('hide');
             
             
         }
  });

//se busca el id del boton para saber cual es la receta seleccionada para Ver, se arman los datos y se insertan en el modal
 const renderizarRecetaSeleccionada = (id_receta) => {
    console.log("listado_recetas!!! ",listado_recetas)            
        if(listado_recetas){
            let nombre_receta = document.getElementById('nombre_receta')
            let instrucciones = document.getElementById('instrucciones')
            resultado = listado_recetas.find(receta =>{
                return receta.idMeal === id_receta
            })
            if(resultado){
                const ingredientes = Object.keys(resultado)
                    .filter((key) => key.includes("strIngredient"))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                        [key]: resultado[key]
                        });
                }, {});
                console.log("hola resultado",resultado);
                console.log("hola ingredientes",ingredientes);
            
                if(ingredientes){
                    lista_ingredientes = []
                    for (const ingrediente in ingredientes) {
                        if(ingredientes[ingrediente]){
                        //console.log(`${ingredientes[ingrediente]}`);
                        lista_ingredientes.push(ingredientes[ingrediente])
                        }                        
                    }
                    console.log("lista_ingredientes!! ",lista_ingredientes)
                }
            }
            nombre_receta.innerText = resultado.strMeal !== '' ? resultado.strMeal :`No se encontraron resultados`
            instrucciones.innerText = resultado.strInstructions !== '' ? resultado.strInstructions :`No se encontraron resultados`
               
            }
    }






