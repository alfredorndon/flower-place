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

function cerrarSesion()
{
    localStorage.removeItem('login');
    window.location.href = "index.html";
}

function crearTarjetaDiseño(diseño) {
    const contenedor = document.getElementById("tarjetas-design");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-design");

    // Asumiendo que diseño tiene las propiedades necesarias
    tarjeta.innerHTML = `
        <p id="nombre-design">${diseño.nombre}</p>
        <p id="precio-design">Precio Total: $${diseño.precio}</p>
    `;

    // Añadir las flores y cantidades
    diseño.productos.forEach((producto, index) => {
        const florElemento = document.createElement("p");
        florElemento.id = `flor-${index + 1}`;
        florElemento.innerHTML = `<strong>Flor:</strong> ${producto.nombre}`;
        tarjeta.appendChild(florElemento);

        const cantidadElemento = document.createElement("p");
        cantidadElemento.id = `cantidad-flor-${index + 1}`;
        cantidadElemento.innerHTML = `<u>Cantidad:</u> ${producto.cantidad}`;
        tarjeta.appendChild(cantidadElemento);
    });

    contenedor.appendChild(tarjeta);
}

function actualizarTotal() {
    const tarjetas = document.querySelectorAll('.tarjeta-design');
    let total = 0;

    tarjetas.forEach(tarjeta => {
        const precioTexto = tarjeta.querySelector('.precio-design').textContent;
        const precio = parseFloat(precioTexto.split('$')[1]);
        total += precio;
    });

    document.querySelector('#total-pedido p').innerHTML = `<strong>Precio total del pedido:</strong> $${total}`;
    localStorage.setItem('totalPedido', total);
}

//Main del programa
const correoAdmin = "admin@gmail.com";
const contraAdmin = "admin1234";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");
var contadorSeleccionado = 0;
var cualesSeleccionados = [];

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        let pedirDesigns = async() =>
        {
            event.preventDefault();
            let emailCliente = localStorage.getItem('email');
            const respuesta = await fetch(`/cliente/cargarDesigns?correo=${emailCliente}`,
            {
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (respuesta.ok)
            {
                const diseños = await respuesta.json();
                diseños.forEach(diseño =>
                {
                    crearTarjetaDiseño(diseño);
                });
                document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
                ocultarPorID("crear-pedido");
                ocultarPorID("editar-pedido");
                ocultarPorID("volver-pedidos")
                document.getElementById('volver-pedidos').addEventListener('click', function(){windoew.location.href = "gestion-pedidos.html"})

                //Sección de Editar Pedido
                document.getElementById("boton-editar-pedido").addEventListener('click', function()
                {
                    ocultarPorID("pedidos-creados");
                    mostrarPorID("editar-pedido");
                    mostrarPorID("volver-pedidos");
                });

                //Sección de Nuevo Pedido
                let nuevoPedido = document.getElementById("boton-nuevo-pedido");
                nuevoPedido.addEventListener('click', function()
                {
                    ocultarPorID("pedidos-creados");
                    mostrarPorID("crear-pedido");
                });
                if (localStorage.getItem('email') == correoAdmin)
                {
                    elementos[1].style.setProperty('display', 'none', 'important');
                    ocultarPorID('boton-nuevo-pedido');
                }
                const tarjetas = document.querySelectorAll('.tarjeta-design');
                let tarjetaSeleccionada = null;

                tarjetas.forEach(tarjeta => 
                {
                    tarjeta.addEventListener('click', function () {
                        // Quitar la selección de la tarjeta anterior
                        if (contadorSeleccionado == 10)
                        {
                            cualesSeleccionados[0].classList.remove('seleccionada');
                            cualesSeleccionados.shift();
                        }

                        // Seleccionar la nueva tarjeta
                        tarjetaSeleccionada = tarjeta;
                        tarjetaSeleccionada.classList.add('seleccionada');
                        contadorSeleccionado++;
                        let i = -1;
                        let productos = [];
                        let parrafos = tarjetaSeleccionada.querySelectorAll('p');
                        while (parrafos[i+2].id != "precio-design")
                        {
                            i+= 2;
                            productos.push({nombre:parrafos[i].textContent.split(" ")[1],precio:" ",cantidad:parrafos[i+1].textContent.split(" ")});
                        }
                        cualesSeleccionados.push({productos:productos,nombre:parrafos[0].textContent,precio:parrafos[i+2].textContent});
                        actualizarTotal();
                    });
                });

                let confirmarPedido = document.getElementById("confirmar-pedido");
                confirmarPedido.addEventListener('click', function()
                {
                    let registrarPedido = async () =>
                    {
                        let pedido = {};
                        pedido.designs = cualesSeleccionados;
                        pedido.estado = "Abierto";
                        pedido.id = 0;
                        pedido.correo = localStorage.getItem('email');
                        const peticion = await fetch ()
                    }
                    registrarPedido();
                });
            }
        }
        pedirDesigns();
    }
    else
    {
        ocultarPorID("pedidos-creados");
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");
        ocultarPorID("volver-pedidos");
    }
});