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
    localStorage.removeItem('login');
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
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
        let pedirDatos = async () =>
        {
            const respuesta = await fetch (`/admin/ConsultarPerfil?correo=${localStorage.getItem('email')}`,
            {
                method: 'GET',
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (respuesta.ok)
            {
                const datos = await respuesta.json();
                document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
                if (localStorage.getItem('email') == correoAdmin)
                {
                    elementos[1].style.setProperty('display', 'none', 'important');
                    ocultarPorID("boton-eliminar-perfil");
                }
                let divDatos = document.getElementById("datos-perfil");
                let parrafos = divDatos.querySelectorAll("p");
                parrafos[0].textContent = "Nombre: "+datos.nombre;
                parrafos[1].textContent = "Teléfono: "+datos.numeroTelefonico;
                parrafos[2].textContent = "E-mail: "+localStorage.getItem('email');
                parrafos[3].textContent = "Contraseña: "+localStorage.getItem('contrasena');

                //Sección de Eliminar Perfil
                const botonEliminar = document.getElementById("boton-eliminar-perfil");
                botonEliminar.addEventListener('click', function ()
                {
                    swal({
                        title: "¿Estás seguro de eliminar el Perfil?",
                        text: "Se perderán todos tus diseños",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((seraEliminado)=>{
                        if (seraEliminado) 
                        {
                            eliminarPerfil = async () =>
                            {
                                const peticion = await fetch(`/cliente/eliminarPerfil?correo=${localStorage.getItem("email")}`,
                                {
                                    method: "POST",
                                    headers:
                                    {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                    }
                                });
                                if (peticion.ok)
                                {
                                    swal ({
                                        title: await peticion.text(),
                                        icon: "success"
                                    }).then((valor) => {cerrarSesion();});
                                }
                                else
                                    swal ("Un error inesperado","El perfil no pudo ser eliminado","error");
                            }
                            eliminarPerfil();
                        }
                    });
                });

                if (localStorage.getItem("email") != correoAdmin)
                {

                }
            }
        }
        pedirDatos();

        //Sección Editar Perfil
        document.getElementById("boton-editar-perfil").addEventListener('click', function ()
        {

        });
    }
    else    //Si no está logueado
    {
        ocultarPorClase('menu-bar');
        ocultarPorID("consultar-perfil");
        ocultarPorID("iniciar-sesion");
        ocultarPorID("crear-perfil");
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
                    localStorage.setItem('email', document.getElementById('email').value);
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
                    localStorage.setItem('email', document.getElementById('email-inicio').value);
                    localStorage.setItem('contrasena', document.getElementById('contrasena-inicio').value);
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