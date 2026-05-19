let tareas = [];

const INPUT = document.getElementById("input");
const LISTA = document.getElementById("lista-compras");
const MENSAJE = document.getElementById("mensaje");
const CONTENEDOR_LISTA = document.getElementById('tareas-list');

function anadTareas() {
    let tarea = INPUT.value.toUpperCase().trim();
    if (tarea) {
        tareas.push(tarea);
        INPUT.value = ""; 
        INPUT.focus();         
        
        Swal.fire({
            icon: "success",
            title: "¡Añadida!",
            timer: 800,
            showConfirmButton: false
        });      
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Escribe algo primero",
        });
    }
}

function mosTareas() {
    LISTA.innerHTML = "";

    if (tareas.length === 0) {
        LISTA.innerHTML = "<li class='list-none p-2 text-gray-400'>No hay tareas pendientes</li>";
        return;
    }

    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = tarea;
        li.className = "border-b border-pink-200 py-3 w-full text-left px-4 list-decimal ml-5";
        LISTA.appendChild(li);
    });
}

async function elimTareas() {
    if (tareas.length === 0) {
        Swal.fire({ icon: 'info', title: 'Nada que borrar' });
        return;
    }

    const listaTexto = tareas.map((t, i) => `${i + 1}. ${t}`).join('<br>');

    const { value: index } = await Swal.fire({
        title: '¿Qué tarea deseas borrar?',
        html: `<div style="text-align: left; background: #fdf2f8; padding: 10px; border-radius: 8px;">${listaTexto}</div>`,
        input: 'number',
        inputPlaceholder: 'Número de tarea',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        confirmButtonColor: '#a3004c',
        inputValidator: (value) => {
            if (!value || value < 1 || value > tareas.length) {
                return '¡Número no válido!';
            }
        }
    });

    if (index) {
        tareas.splice(parseInt(index) - 1, 1);
        mosTareas(); 
        Swal.fire({ icon: 'success', title: 'Borrada', timer: 800, showConfirmButton: false });
    }
}

function salDeApp() {
    tareas = [];
    LISTA.innerHTML = "";

    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.3";
    });

    INPUT.disabled = true;
    document.querySelector('p.flex').style.display = "none";

    document.getElementById('menu').style.display = "none";
    CONTENEDOR_LISTA.style.display = "none"; 

    MENSAJE.classList.remove('respuesta');
    MENSAJE.className = "text-8xl text-pink-800 font-bold mt-40 text-center";
    MENSAJE.textContent = "Gracias";
}


