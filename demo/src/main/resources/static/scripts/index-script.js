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
    localStorage.setItem('login','false')
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
        document.querySelector('icono-logout').addEventListener('click', cerrarSesion);
        if (localStorage.getItem('email') == correoAdmin)
            elementos[1].style.setProperty('display', 'none', 'important');
        ocultarPorID ('texto-no-login');
        ocultarPorClase ('opcion-inicio');
    }
    else
    {
        ocultarPorClase ('menu-bar');
        ocultarPorID ('texto-login');
        document.getElementById('boton-iniciar-sesion').addEventListener('click', function() { localStorage.setItem('inicioSesion','true') });
        document.getElementById('boton-registrarse').addEventListener('click', function() { localStorage.setItem('inicioSesion','false') });
    }
});