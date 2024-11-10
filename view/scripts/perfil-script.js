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

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
    }
    else
    {
        ocultarPorClase ('menu-bar');
        ocultarPorID("consultar-perfil");
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
        ocultarPorID("volver-perfil");
        if (inicioSesion)
            mostrarPorID("iniciar-sesion");
        else
            mostrarPorID("crear-perfil");
        document.getElementById('ir-a-iniciar-sesion').addEventListener('click', function () {mostrarPorID("iniciar-sesion"); ocultarPorID("crear-perfil");});
        document.getElementById('ir-a-registrarse').addEventListener('click', function() {mostrarPorID("crear-perfil"); ocultarPorID("iniciar-sesion")});
    }
});

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