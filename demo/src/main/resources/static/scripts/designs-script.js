function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','none','important');
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','block','important');
}

function ocultarPorClase (clase)
{
    var elementos = document.getElementsByClassName(clase);
    for (var i = 0; i < elementos.length; i++)
    {
        elementos[i].style.setProperty('display','none','important');
    }
}

function mostrarPorClase (clase)
{
    var elementos = document.getElementsByClassName(clase);
    for (var i = 0; i < elementos.length; i++)
    {
        elementos[i].style.setProperty('display', 'block', 'important');
    }
}

function comprobarLogIn()
{
    if (localStorage.getItem('login') !== null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function cerrarSesion()
{
    localStorage.removeItem('login');
    window.location.href = "index.html";
}

//Main del programa
const correoAdmin = "admin@gmail.com";
const contraAdmin = "admin1234";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
        ocultarPorID("nuevo-design");

        //Sección de Nuevo Diseño
        document.getElementById("boton-nuevo-design").addEventListener('click', function()
        {
            ocultarPorID("designs-guardados");
            mostrarPorID("nuevo-design");
        });
    }
    else
    {
        ocultarPorID("designs-guardados");
        ocultarPorID("nuevo-design");
        ocultarPorID("volver-designs");
    }
});



// tarjeta de producto en la sección de diseño
function crearTarjeta(nombre, cantidad, precio) {
    const contenedor = document.getElementById("tarjetas-catalogo-design");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-flor");
    tarjeta.innerHTML = `
        <p class="nombre-flor">${nombre}</p>
        <p class="cantidad-flor">Cantidad: <span class="cantidad-actual">${cantidad}</span></p>
        <p class="precio-flor">Precio: $${precio}</p>
        <div class="contador">
            <input type="number" class="input-cantidad" value="0" min="0" max="${cantidad}" />
        </div>
    `;

    // Agregar un evento para actualizar el total
    const inputCantidad = tarjeta.querySelector('.input-cantidad');
    inputCantidad.addEventListener('input', () => {
        actualizarTotal();
    });

    contenedor.appendChild(tarjeta);
}

function actualizarTotal() {
    const tarjetas = document.querySelectorAll('.tarjeta-flor');
    let total = 0;

    tarjetas.forEach(tarjeta => {
        const precioTexto = tarjeta.querySelector('.precio-flor').textContent;
        const precio = parseFloat(precioTexto.replace('$', ''));
        const cantidadInput = tarjeta.querySelector('.input-cantidad').value;

        total += precio * cantidadInput;
    });

    document.querySelector('#total-design p').innerHTML = `<strong>Precio total del diseño:</strong> $${total.toFixed(2)}`;
}

document.getElementById('nuevo-design-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const productosSeleccionados = [];
    const tarjetas = document.querySelectorAll('.tarjeta-flor');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('.nombre-flor').textContent;
        const cantidad = tarjeta.querySelector('.input-cantidad').value;

        if (cantidad > 0) {
            productosSeleccionados.push({ nombre, cantidad });
        }
    });

    const diseño = {
        nombre: document.getElementById('nombre-design-form').value,
        productos: productosSeleccionados,
        precioTotal: parseFloat(document.querySelector('#total-design p').textContent.replace(/[^0-9.-]+/g,""))
    };

    const respuesta = await fetch('/admin/CrearDiseño', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(diseño)
    });

    if (respuesta.ok) {
        alert('Diseño creado con éxito');
        // Redirigir o limpiar el formulario
    } else {
        const errorRespuesta = await respuesta.text();
        console.log(errorRespuesta);
        alert('Error al crear el diseño: ' + errorRespuesta);
    }
});

//crear tarjeta de diseño guardado
function crearTarjetaDiseño(diseño) {
    const contenedor = document.getElementById("tarjetas-design");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-design");

    // Asumiendo que diseño tiene las propiedades necesarias
    tarjeta.innerHTML = `
        <p id="nombre-design">${diseño.nombre}</p>
        <p id="precio-design">Precio Total: $${diseño.precioTotal.toFixed(2)}</p>
    `;

    // Añadir las flores y cantidades
    diseño.productos.forEach((producto, index) => {
        const florElemento = document.createElement("p");
        florElemento.id = `flor-${index + 1}`;
        florElemento.textContent = `Flor: ${producto.nombre}`;
        tarjeta.appendChild(florElemento);

        const cantidadElemento = document.createElement("p");
        cantidadElemento.id = `cantidad-flor-${index + 1}`;
        cantidadElemento.textContent = `Cantidad: ${producto.cantidad}`;
        tarjeta.appendChild(cantidadElemento);
    });

    contenedor.appendChild(tarjeta);
}

async function cargarDiseños() {
    const respuesta = await fetch("/admin/Diseños", {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (respuesta.ok) {
        const diseños = await respuesta.json();
        diseños.forEach(diseño => {
            crearTarjetaDiseño(diseño);
        });
    } else {
        const errorRespuesta = await respuesta.text();
        console.log(errorRespuesta);
        alert('Error al cargar los diseños: ' + errorRespuesta);
    }
}

// Llama a la función para cargar los diseños cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarDiseños);

// Estructura de Datos Esperada
// {
//     "nombre": "Diseño Floral",
//     "precioTotal": 150.00,
//     "productos": [
//         {
//             "nombre": "Rosa",
//             "cantidad": 10
//         },
//         {
//             "nombre": "Lirio",
//             "cantidad": 5
//         }
//     ]
// }