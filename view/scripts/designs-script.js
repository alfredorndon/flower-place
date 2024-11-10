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
    document.addEventListener('DOMContentLoaded', ocultarPorID("nuevo-design"));

    //Sección de Nuevo Diseño
    document.getElementById("boton-nuevo-design").addEventListener('click', function()
    {
        document.addEventListener('DOMContentLoaded', ocultarPorID("designs-guardados"));
        document.addEventListener('DOMContentLoaded', mostrarPorID("nuevo-design"));
    })
}
else
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("designs-guardados"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("nuevo-design"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("volver-designs"));
}