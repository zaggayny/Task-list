var inputTarea = document.getElementById("tarea");
var btn = document.getElementById("agregar");
var listado = document.getElementById("Listado");
var cantidad = document.getElementById("cantidad");

// variable que cuenta las tareas
var total = 0;

// cargar tareas almacenadas en localStorage al cargar la página
window.addEventListener("load", function() {
    document.body.classList.add("loaded");

    // Recuperar las tareas almacenadas en localStorage
    var tareasGuardadas = localStorage.getItem("tareas");

    if (tareasGuardadas) {
        // Convertir la cadena JSON a un array de tareas
        var tareas = JSON.parse(tareasGuardadas);

        // Agregar cada tarea al listado
        tareas.forEach(function(tarea) {
            agregarTareaAlListado(tarea);
        });

        // Actualizar la cantidad total de tareas
        total = tareas.length;
        cantidad.innerHTML = total;
    }
});

// función para agregar tarea al listado
function agregarTareaAlListado(tarea) {
    var li = document.createElement("li");
    li.textContent = tarea;

    // btn eliminar
    var btnEliminar = document.createElement("span");
    btnEliminar.textContent = " x";
    li.appendChild(btnEliminar);

    btnEliminar.onclick = function() {
        li.remove();
        total--;
        cantidad.innerHTML = total;

        // Actualizar localStorage después de eliminar una tarea
        actualizarLocalStorage();
    };

    listado.appendChild(li);
}

// función para actualizar localStorage con las tareas actuales
function actualizarLocalStorage() {
    var tareas = [];

    // Obtener todas las tareas del listado
    var elementosLista = listado.getElementsByTagName("li");

    for (var i = 0; i < elementosLista.length; i++) {
        tareas.push(elementosLista[i].textContent);
    }

    // Guardar las tareas en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// función para agregar al listado
btn.onclick = function() {
    if (inputTarea.value == "") {
        return;
    }

    var elemento = inputTarea.value;

    // Agregar la tarea al listado
    agregarTareaAlListado(elemento);

    // Incremento de tareas
    total++;
    cantidad.innerHTML = total;

    // Actualizar localStorage después de agregar una tarea
    actualizarLocalStorage();

    inputTarea.value = "";
};