function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','none','important');
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty('display','block','important');
}

document.addEventListener('DOMContentLoaded', ocultarPorID("iniciar-sesion"));
document.addEventListener('DOMContentLoaded', ocultarPorID("crear-perfil"));