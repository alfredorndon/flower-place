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

function crearTarjeta(nombre, cantidad, precio, f) {
    const contenedor = document.getElementById("tarjetas-catalogo");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-flor");
    tarjeta.innerHTML = `
        <p class="nombre-flor">${nombre}</p>
        <p class="cantidad-flor">Cantidad: ${cantidad}</p>
        <p class="precio-flor">Precio: $${precio}</p>
    `;

    contenedor.appendChild(tarjeta);
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

document.addEventListener('DOMContentLoaded', function() 
{
    if (login)
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
        if (localStorage.getItem('email') == correoAdmin)
        {
            elementos[1].style.setProperty('display', 'none', 'important');

            //Sección de Editar Producto
            document.getElementById("boton-editar-producto").addEventListener('click', function()
            {
                ocultarPorID("catalogo-productos");
                mostrarPorID("editar-producto");
            });

            //Sección de Nuevo Producto
            document.getElementById("boton-nuevo-producto").addEventListener('click', function()
            {
                ocultarPorID("catalogo-productos");
                mostrarPorID("agregar-producto");
            });

        }
        else
        {
            
        }

        let botonAgregarProducto = document.getElementById("agregar-producto-boton");
        botonAgregarProducto.addEventListener("click", async () =>
        {
            event.preventDefault();
            
            let producto = {};
            producto.nombre = document.getElementById("nombre-flor-form").value;
            producto.precio = document.getElementById("precio-flor-form").value;
            producto.cantidad = document.getElementById("cantidad-flor-form").value;

            const peticion = await fetch("/admin/AgregarProducto", {
                method:'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto)
            });
            if (peticion.ok)
            {
                crearTarjeta(producto.nombre, producto.cantidad, producto.precio);
            } 
            else
            {
                const errorRespuesta = await peticion.text();
                console.log(errorRespuesta);
                alert(errorRespuesta);
            }
        });
    }
    else
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        ocultarPorID("catalogo-productos");
        ocultarPorID("volver-productos");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tarjetas = document.querySelectorAll('.tarjeta-flor');
    const botonEditar = document.getElementById('boton-editar-producto');
    const formEditar = document.getElementById('form-editar');
    let tarjetaSeleccionada = null;

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', function () {
            // Quitar la selección de la tarjeta anterior
            if (tarjetaSeleccionada) {
                tarjetaSeleccionada.classList.remove('seleccionada');
            }

            // Seleccionar la nueva tarjeta
            tarjetaSeleccionada = tarjeta;
            tarjetaSeleccionada.classList.add('seleccionada');
            botonEditar.disabled = false; // Habilitar el botón de editar
        });
    });

    botonEditar.addEventListener('click', function () {
        if (tarjetaSeleccionada) {
            // Cargar la información en el formulario
            document.getElementById('nombre').value = tarjetaSeleccionada.getAttribute('data-nombre');
            document.getElementById('cantidad').value = tarjetaSeleccionada.getAttribute('data-cantidad');
            document.getElementById('precio').value = tarjetaSeleccionada.getAttribute('data-precio');
            formEditar.style.display = 'block'; // Mostrar el formulario
        }
    });

    document.getElementById('guardar-cambios').addEventListener('click', function () {
        // Aquí puedes agregar la lógica para guardar los cambios
        alert('Cambios guardados');
            // Aquí puedes agregar la lógica para guardar los cambios
            alert('Cambios guardados');

            // Opcional: Actualizar la tarjeta seleccionada con los nuevos valores
            if (tarjetaSeleccionada) {
                tarjetaSeleccionada.setAttribute('data-nombre', document.getElementById('nombre').value);
                tarjetaSeleccionada.setAttribute('data-cantidad', document.getElementById('cantidad').value);
                tarjetaSeleccionada.setAttribute('data-precio', document.getElementById('precio').value);
    
                tarjetaSeleccionada.querySelector('.nombre-flor').innerText = document.getElementById('nombre').value;
                tarjetaSeleccionada.querySelector('.cantidad-flor').innerText = 'Cantidad: ' + document.getElementById('cantidad').value;
                tarjetaSeleccionada.querySelector('.precio-flor').innerText = 'Precio: $' + document.getElementById('precio').value;
            }
    
            // Opcional: Limpiar el formulario después de guardar
            document.getElementById('nombre').value = '';
            document.getElementById('cantidad').value = '';
            document.getElementById('precio').value = '';
            formEditar.style.display = 'none'; // Ocultar el formulario
            botonEditar.disabled = true; // Deshabilitar el botón de editar
            tarjetaSeleccionada.classList.remove('seleccionada'); // Quitar la selección de la tarjeta
            tarjetaSeleccionada = null; // Resetear la tarjeta seleccionada
        });
    });