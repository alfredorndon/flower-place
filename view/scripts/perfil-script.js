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

function comprobarToken(token, value)
{
    if (localStorage.getItem(token) == value)
    {
        return true;
    }
    else
    {
        return false;
    }
}

var login = comprobarLogIn();
var inicioSesion = comprobarToken('inicioSesion','true');

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
    if (inicioSesion)
        document.addEventListener('DOMContentLoaded', mostrarPorID("iniciar-sesion"));
    else
        document.addEventListener('DOMContentLoaded', mostrarPorID("crear-perfil"));
}

// function calcularTamanoLocalStorage() {
//     let total = 0;
//     for (let key in localStorage) {
//         if (localStorage.hasOwnProperty(key)) {
//             total += key.length + localStorage.getItem(key).length;
//         }
//     }
//     // Convertir a bytes
//     const totalBytes = new Blob([total]).size;
//     console.log(`Has utilizado aproximadamente ${totalBytes} bytes en localStorage.`);
// }

// calcularTamanoLocalStorage();