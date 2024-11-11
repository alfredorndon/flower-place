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

//Main del programa

var login = comprobarLogIn();

document.addEventListener('DOMContentLoaded', function() 
{
    if (login)
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");

        //Sección de Editar Producto
        document.getElementById("boton-editar-producto").addEventListener('click', function()
        {
            ocultarPorID("catalogo-productos");
            mostrarPorID("editar-producto");
        })

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
            
            let producto = {};
            producto.nombre = document.getElementById("nombre-flor-form").value;
            producto.precio = document.getElementById("precio-flor-form").value;
            producto.cantidad = document.getElementById("cantidad-flor-form").value;

            const peticion = await fetch("/admin/productos", {
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
                crearTarjeta(campos.nombre, campos.cantidad, campos.precio);
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