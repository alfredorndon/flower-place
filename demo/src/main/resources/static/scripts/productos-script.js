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
        let pedirProductos = async () => 
        {
            const respuesta = await fetch("/admin/Productos",
            {
                method:'GET',
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if(respuesta.ok)
            {
                const datos = await respuesta.json();
                datos.forEach(producto =>
                {
                    crearTarjeta(producto.nombre, producto.cantidad, producto.precio, producto.foto);
                });
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
                    let botonAgregarProducto = document.getElementById("agregar-producto-boton");
                    botonAgregarProducto.addEventListener("click", async () =>
                    {
                        event.preventDefault();
                        
                        let productoAgregado = {};
                        productoAgregado.nombre = document.getElementById("nombre-flor-form").value;
                        productoAgregado.precio = document.getElementById("precio-flor-form").value;
                        productoAgregado.cantidad = document.getElementById("cantidad-flor-form").value;

                        const peticion = await fetch("/admin/AgregarProducto", 
                        {
                            method:'POST',
                            headers:
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(productoAgregado)
                        });
                        if (peticion.ok)
                        {
                            crearTarjeta(productoAgregado.nombre, productoAgregado.cantidad, productoAgregado.precio);
                        } 
                        else
                        {
                            const errorRespuesta = await peticion.text();
                            console.log(errorRespuesta);
                            alert(errorRespuesta);
                        }
                    });
                }
            }
            else
            {
                const errorRespuesta = await respuesta.text();
                console.log(errorRespuesta);
                alert(errorRespuesta);
            }
        }
        pedirProductos();
    }
    else
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        ocultarPorID("catalogo-productos");
        ocultarPorID("volver-productos");
    }
});