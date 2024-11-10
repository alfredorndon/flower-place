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
export var registrarse = false;
export var inicioSesion = false;
if (login)
{
    document.addEventListener('DOMContentLoaded', ocultarPorID ('texto-no-login'));
}
else
{
    document.addEventListener('DOMContentLoaded', ocultarPorClase ('menu-bar'));
    document.addEventListener('DOMContentLoaded', ocultarPorID ('texto-login'));
    document.getElementById('boton-iniciar-sesion').addEventListener('click', function() {})
}