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
    localStorage.removeItem('login');
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
        document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");

        //Sección de Editar Pedido
        document.getElementById("boton-editar-pedido").addEventListener('click', function()
        {
            ocultarPorID("pedidos-creados");
            mostrarPorID("editar-pedido");
        });

        //Sección de Nuevo Pedido
        document.getElementById("boton-nuevo-pedido").addEventListener('click', function()
        {
            ocultarPorID("pedidos-creados");
            mostrarPorID("crear-pedido");
        });
        if (localStorage.getItem('email') == correoAdmin)
        {
            elementos[1].style.setProperty('display', 'none', 'important');
            ocultarPorID('boton-nuevo-pedido');
        }
        else
        {

        }
    }
    else
    {
        ocultarPorID("pedidos-creados");
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");
        ocultarPorID("volver-pedidos");
    }
});