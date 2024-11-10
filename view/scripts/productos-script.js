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

var login = comprobarLogIn();

if (login)
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("editar-producto"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("agregar-producto"));

    //Sección de Editar Producto
    document.getElementById("boton-editar-producto").addEventListener('click', function()
    {
        document.addEventListener('DOMContentLoaded', ocultarPorID("catalogo-productos"));
        document.addEventListener('DOMContentLoaded', mostrarPorID("editar-producto"));
    })

    //Sección de Nuevo Producto
    document.getElementById("boton-nuevo-producto").addEventListener('click', function()
    {
        document.addEventListener('DOMContentLoaded', ocultarPorID("catalogo-productos"));
        document.addEventListener('DOMContentLoaded', mostrarPorID("agregar-producto"));
    })
}
else
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("editar-producto"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("agregar-producto"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("catalogo-productos"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("volver-productos"));
}
