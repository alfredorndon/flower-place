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

function cerrarSesion()
{
    localStorage.setItem('login','false')
    window.location.href = "index.html";
}

//Main del programa

const correoAdmin = "admin@gmail.com";
const contraAdmin = "admin1234";

var login = comprobarLogIn();
var inicioSesion = comprobarToken('inicioSesion','true');
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");

document.addEventListener('DOMContentLoaded', function ()
{
    if (login) //Si está logueado
    {
        document.querySelector('icono-logout').addEventListener('click', cerrarSesion);
        if (localStorage.getItem('email') == correoAdmin)
            elementos[1].style.setProperty('display', 'none', 'important');
        
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
        let divDatos = document.getElementById("datos-perfil");
        let parrafos = divDatos.querySelectorAll("p");
        parrafos[0].textContent = "Nombre: "+localStorage.getItem('nombre');
        parrafos[1].textContent = "Teléfono: "+localStorage.getItem('telefono');
        parrafos[2].textContent = "E-mail: "+localStorage.getItem('email');
        parrafos[3].textContent = "Contraseña: "+localStorage.getItem('contrasena');
    }
    else    //Si no está logueado
    {
        ocultarPorClase('menu-bar');
        ocultarPorID("consultar-perfil");
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
        ocultarPorID("volver-perfil");
        document.getElementById('ir-a-iniciar-sesion').addEventListener('click', function () {mostrarPorID("iniciar-sesion"); ocultarPorID("crear-perfil");});
        document.getElementById('ir-a-registrarse').addEventListener('click', function() {mostrarPorID("crear-perfil"); ocultarPorID("iniciar-sesion")});
        if (inicioSesion)
            mostrarPorID("iniciar-sesion");
        else
            mostrarPorID("crear-perfil");

        //Apartado Registrarse
        
        let botonRegistrarse = document.getElementById('boton-registrarse');
        botonRegistrarse.addEventListener('click',async()=>
        {
            event.preventDefault();
            let cliente = {}
            cliente.nombre = document.getElementById('nombre').value;
            cliente.numeroTelefonico = document.getElementById('telefono').value;
            cliente.correo = document.getElementById('email').value;
            if (document.getElementById('contrasena').value == document.getElementById('confirmar-contrasena').value)
            {
                cliente.contrasena = document.getElementById('contrasena').value;
                cliente.designs = [];
                cliente.pedidos = [];
                cliente.productos = [];
                const peticion = await fetch ("/admin/registro",
                    {
                        method:'POST',
                        headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cliente)
                    });
                if (peticion.ok)
                {
                    localStorage.setItem('nombre', document.getElementById('nombre').value);
                    localStorage.setItem('telefono', document.getElementById('telefono').value);
                    localStorage.setItem('email', document.getElementById('email').value);
                    localStorage.setItem('contrasena', document.getElementById('contrasena').value);
                    document.getElementById('nombre').value = '';
                    document.getElementById('telefono').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('contrasena').value = '';
                    document.getElementById('confirmar-contrasena').value = '';
                    localStorage.setItem('login','true');
                    window.location.href = "index.html";
                }
                else
                {
                    const errorRespuesta = await peticion.text();
                    console.log(errorRespuesta);
                    alert(errorRespuesta);
                }
            }
            else
            {
                alert("Las contraseñas no coinciden");
            }
        });

        //Apartado Iniciar Sesión

        let botonIniciarSesion = document.getElementById('boton-iniciar-sesion');
        botonIniciarSesion.addEventListener('click', async()=>
        {
            if (document.getElementById('email-inicio').value == correoAdmin && document.getElementById('contrasena-inicio').value == contraAdmin)
            {
                event.preventDefault();
                localStorage.setItem('email', correoAdmin);
                localStorage.setItem('contrasena', contraAdmin);
                localStorage.setItem('login','true');
                window.location.href = "index.html";
            }
            else
            {
                event.preventDefault();
                let datosPersona = {}
                datosPersona.correo = document.getElementById('email-inicio').value;
                datosPersona.contra = document.getElementById('contrasena-inicio').value;
                const peticion = await fetch ("/admin/login",
                {
                    method:'POST',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosPersona)
                });
                if (peticion.ok)
                {
                    const respuesta = await peticion.json();
                    console.log(respuesta);
                    localStorage.setItem('email', document.getElementById('email-inicio').value);
                    document.getElementById('email-inicio',).value = '';
                    document.getElementById('contrasena-inicio').value = '';
                    localStorage.setItem('login','true');
                    window.location.href = "index.html";
                }
                else
                {
                    const errorRespuesta = await peticion.text();
                    console.log(errorRespuesta);
                    alert(errorRespuesta);
                }
            }
        });
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