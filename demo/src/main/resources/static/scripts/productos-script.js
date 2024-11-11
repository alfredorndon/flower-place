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
        })
    }
    else
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        ocultarPorID("catalogo-productos");
        ocultarPorID("volver-productos");
    }
});


let botonAgregarProducto = document.getElementById("agregar-producto-boton");

botonAgregarProducto.addEventListener("click", evento => {
    agregarProducto();
});

let agregarProducto = async () => {
    let campos = {};

    campos.nombre = document.getElementById("nombre-flor-form").value;
    campos.cantidad = document.getElementById("cantidad-flor-form").value;
    campos.precio = document.getElementById("precio-flor-form").value;

    // Obtener el archivo de la foto
    const fotoInput = document.getElementById("foto-flor-form");
    const foto = fotoInput.files[0]; // Obtener el primer archivo

    // Si necesitas enviar la foto al servidor, puedes usar FormData
    const formData = new FormData();
    formData.append('nombre', campos.nombre);
    formData.append('cantidad', campos.cantidad);
    formData.append('precio', campos.precio);
    formData.append('foto', foto); // Agregar la foto al FormData

    const peticion = await fetch("http://localhost:8080/api/peliculas", {
        method: 'POST',
        body: formData // Enviar el FormData en lugar de JSON
    });
}