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

function crearTarjetadesign(design) {
    const contenedor = document.getElementById("tarjetas-design-pedido-nuevo");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-design");

    // Asumiendo que design tiene las propiedades necesarias
    tarjeta.innerHTML = `
        <p id="nombre-design">${design.nombre}</p>
        <p id="precio-design">Precio Total: $${design.precio}</p>
    `;

    // Añadir las flores y cantidades
    design.productos.forEach((producto, index) => {
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
        const precioTexto = tarjeta.querySelector('#precio-design').textContent;
        const precio = parseFloat(precioTexto.split('$')[1]);
        total += precio;
    });

    document.querySelector('#total-pedido p').innerHTML = `<strong>Precio total del pedido:</strong> $${total}`;
    localStorage.setItem('totalPedido', total);
}

async function cargarPedidos(ruta) {
    const respuesta = await fetch(ruta, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (respuesta.ok) {
        const pedidos = await respuesta.json();
        const contenedor = document.getElementById("tarjetas-pedidos");

        pedidos.forEach((pedido, index) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-pedido");
            tarjeta.id = `tarjeta-pedido-${index + 1}`;
            tarjeta.innerHTML = 
                `<p class="nombre-cliente"><strong>Nombre del Cliente:</strong> ${pedido.nombreCliente}</p>
                <p class="email-cliente"><strong>Correo:</strong> ${pedido.emailCliente}</p>
                <p class="designs-incluidos"><strong>designs Incluidos:</strong></p>
                <ul class="lista-designs">
                    ${pedido.designs.map(design => `<li>${design}</li>`).join('')}
                </ul>
                <p class="precio-total"><strong>Precio total:</strong> $${pedido.precioTotal.toFixed(2)}</p>
                <div class="estado-pedido">
                    <strong>Estado del Pedido:</strong> <span class="estado-abierto">${pedido.estado}</span>
                </div>`
            ;
            contenedor.appendChild(tarjeta);
        });
    } else {
        console.error('Error al cargar los pedidos');
    }
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
                const designs = await respuesta.json();
                designs.forEach(design =>
                {
                    crearTarjetadesign(design);
                });
                document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
                ocultarPorID("crear-pedido");
                ocultarPorID("editar-pedido");
                ocultarPorID("volver-pedidos")
                document.getElementById('volver-pedidos').addEventListener('click', function(){window.location.href = "gestion-pedidos.html"})

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
                else
                {
                    ocultarPorID('boton-editar-pedido');
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
                        const peticion = await fetch (`/cliente/crearPedido?correo=${localStorage.getItem('email')}`,
                        {
                            method: 'POST',
                            headers:
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(pedido)
                        });
                        if (peticion.ok)
                        {
                            console.log ("exito!!!!");
                            alert("Pedido creado con exito");
                            window.location.href = "gestion-pedidos.html";
                        }
                        else
                        {
                            const error = await peticion.text();
                            alert("Error al crear el pedido: " + error);
                        }
                    }
                    registrarPedido();
                });
            }
        }
        pedirDesigns();
        if (localStorage.getItem('email') == correoAdmin)
        {
            cargarPedidos("/admin/cargarPedidos");
        }
        else
        {
            cargarPedidos(`/cliente/cargarPedidos?correo=${localStorage.getItem('email')}`);
        }
    }
    else
    {
        ocultarPorID("pedidos-creados");
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");
        ocultarPorID("volver-pedidos");
    }
});