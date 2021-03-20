const Lista = document.getElementById('milista');



eventListener();//Llamas la función
function eventListener(){
    document.getElementById('formulario').addEventListener('submit',
    agregar);

    Lista.addEventListener('click', borrardeLista);

    document.addEventListener('DOMContentLoaded',localStorageListo);
}

function agregar(e){
    e.preventDefault();

    const area = document.getElementById('lista').value;

    const borrar = document.createElement('a');
    borrar.classList = 'eliminar-lista';
    borrar.innerHTML = '<p class="espacio">Terminado</p>';

    const li = document.createElement('li');
    li.innerHTML = area;
    li.appendChild(borrar);
    Lista.appendChild(li);

    agregarLocalStorage(area);
}

function borrardeLista(e){
    e.preventDefault();
    if(e.target.className === 'espacio'){
        e.target.parentElement.parentElement.remove();
        borrarListaLocalStorage(e.target.parentElement.parentElement.textContent);
        console.log();
    } 
}

function localStorageListo(){
    let listado;

    listado = obtenerLocalStorage();
    listado.forEach(function(area){

        const borrar = document.createElement('a');
        borrar.classList = 'eliminar-lista';
        borrar.innerHTML = '<p class="espacio">Terminado</p>';
    
        const li = document.createElement('li');
        li.innerHTML = area;
        li.appendChild(borrar);
        Lista.appendChild(li);
    

    });
}

function agregarLocalStorage(area) {
    let listado;
    listado = obtenerLocalStorage();
    listado.push(area);
    localStorage.setItem('listado', JSON.stringify(listado) );
}

function obtenerLocalStorage() {
    let listado;

    if(localStorage.getItem('listado') === null) {
        listado = [];
    } else {
        listado = JSON.parse(localStorage.getItem('listado') );
    }
    return listado;
}

function borrarListaLocalStorage(area){

    let listado, listadoaBorrar;
    listadoaBorrar = area.substring(0, area.length - 9);

    listado = obtenerLocalStorage();

    listado.forEach(function(area, index){
        if(listadoaBorrar === area) {
            listado.splice(index, 1);
        }
    });
    
    localStorage.setItem('listado', JSON.stringify(listado));
}

