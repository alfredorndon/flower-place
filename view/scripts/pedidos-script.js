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

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");

        //Sección de Editar Pedido
        document.getElementById("boton-editar-pedido").addEventListener('click', function()
        {
            ocultarPorID("pedidos-creados");
            mostrarPorID("editar-pedido");
        })

        //Sección de Nuevo Pedido
        document.getElementById("boton-nuevo-pedido").addEventListener('click', function()
        {
            ocultarPorID("pedidos-creados");
            mostrarPorID("crear-pedido");
        })
    }
    else
    {
        ocultarPorID("pedidos-creados");
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");
        ocultarPorID("volver-pedidos");
    }
});