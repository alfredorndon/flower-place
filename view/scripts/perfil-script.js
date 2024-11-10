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

//Main del programa

var login = comprobarLogIn();
var inicioSesion = comprobarToken('inicioSesion','true');

document.addEventListener('DOMContentLoaded', function ()
{
    if (login) //Si está logueado
    {
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
    }
    else    //Si no está logueado
    {
        ocultarPorClase ('menu-bar');
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
                const peticion = await fetch ("http://localhost:8080/registrarse",
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
                    localStorage.setItem('email', document.getElementById('email').value);
                    document.getElementById('nombre').value = '';
                    document.getElementById('telefono').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('contrasena').value = '';
                    document.getElementById('confirmar-contrasena').value = '';
                    localStorage.setItem('inicioSesion','true');
                    window.location.href = "index.html";
                }
                else
                {
                    alert("Ha ocurrido un problema");
                }
            }
            else
            {
                alert("Las contraseñas no coinciden");
            }
        });

        let botonIniciarSesion = document.getElementById('boton-iniciar-sesion');
        botonIniciarSesion.addEventListener('click', async()=>
        {
            event.preventDefault();
            let datosUsuario = {}
            datosUsuario.correo = document.getElementById('email-inicio');
            datosUsuario.contra = document.getElementById('contrasena-inicio');
            const peticion = await fetch ("http://localhost:8080/login",
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
                document.getElementById('email-incio').value = '';
                document.getElementById('contrasena-inicio').value = '';
                localStorage.setItem('inicioSesion','true');
                window.location.href = "index.html";
            }
            else
            {
                alert("Ha ocurrido un problema");
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