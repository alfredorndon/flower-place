function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','none','important');
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','block','important');
}

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