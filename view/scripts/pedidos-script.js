function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','none','important');
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','block','important');
}

document.addEventListener('DOMContentLoaded', ocultarPorID("crear-pedido"));
document.addEventListener('DOMContentLoaded', ocultarPorID("editar-pedido"));

//Sección de Editar Pedido
document.getElementById("boton-editar-pedido").addEventListener('click', function()
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("pedidos-creados"));
    document.addEventListener('DOMContentLoaded', mostrarPorID("editar-pedido"));
})

//Sección de Nuevo Pedido
document.getElementById("boton-nuevo-pedido").addEventListener('click', function()
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("pedidos-creados"));
    document.addEventListener('DOMContentLoaded', mostrarPorID("crear-pedido"));
})