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
    document.addEventListener('DOMContentLoaded', ocultarPorID("iniciar-sesion"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("crear-perfil"));
}
else
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("consultar-perfil"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("iniciar-sesion"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("crear-perfil"));
    document.addEventListener('DOMContentLoaded', ocultarPorID("volver-perfil"));
}