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