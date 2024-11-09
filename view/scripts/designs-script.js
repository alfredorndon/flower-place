function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','none','important');
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','block','important');
}

document.addEventListener('DOMContentLoaded', ocultarPorID("nuevo-design"));

//Sección de Nuevo Diseño
document.getElementById("boton-nuevo-design").addEventListener('click', function()
{
    document.addEventListener('DOMContentLoaded', ocultarPorID("designs-guardados"));
    document.addEventListener('DOMContentLoaded', mostrarPorID("nuevo-design"));
})