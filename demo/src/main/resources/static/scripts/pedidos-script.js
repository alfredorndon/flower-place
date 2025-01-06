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

function crearTarjetadesign(design,id) {
    const contenedor = document.getElementById(id);
    let tarjetaTemporal = document.createElement("div");
    tarjetaTemporal.classList.add("tarjeta-design");

    // Asumiendo que design tiene las propiedades necesarias
    tarjetaTemporal.innerHTML = `
        <p id="nombre-design">${design.nombre}</p>
        <p id="precio-design">Precio Total: $${design.precio}</p>
    `;

    // Añadir las flores y cantidades
    design.productos.forEach((producto, index) => {
        const florElemento = document.createElement("p");
        florElemento.id = `flor-${index + 1}`;
        florElemento.innerHTML = `<strong>Flor:</strong> ${producto.nombre}`;
        tarjetaTemporal.appendChild(florElemento);

        const cantidadElemento = document.createElement("p");
        cantidadElemento.id = `cantidad-flor-${index + 1}`;
        cantidadElemento.innerHTML = `<u>Cantidad:</u> ${producto.cantidad}`;
        tarjetaTemporal.appendChild(cantidadElemento);
    });

    contenedor.appendChild(tarjetaTemporal);
}

function crearTarjetaPedido(pedido, cliente, id)
{
    const contenedor = document.getElementById(id);
    let tarjetaTemporal = document.createElement("div");
    tarjetaTemporal.classList.add("tarjeta-pedido");
    tarjetaTemporal.innerHTML =`
        <p class='nombre-cliente'><strong>Nombre del Cliente:</strong> ${cliente.nombre}</p>
        <p class='telefono-cliente'><strong>Teléfono:</strong> ${cliente.numeroTelefonico}</p>
        <p class='email-cliente'><strong>Correo:</strong> ${cliente.correo}</p>
        <p class='id-pedido'><strong>ID:</strong> ${pedido.id}</p>
        <p class='designs-incluidos'><strong>Diseños Incluidos:</strong></p>
    `;
    let totalDesigns = 0;
    let lista = document.createElement("ul");
    lista.classList.add("lista-designs");
    pedido.disenos.forEach((design) =>
    {
        let elemento = document.createElement("li");
        elemento.innerHTML = `${design.nombre}`;
        totalDesigns += design.precio;
        lista.appendChild(elemento);
    });
    tarjetaTemporal.appendChild(lista);

    let estado = document.createElement("div");
    estado.classList.add("estado-pedido");
    if (pedido.estado == "Cerrado")
        estado.innerHTML = `<strong>Estado del Pedido:</strong> <span class='estado-cerrado' id='estado'>${pedido.estado}</span>`;
    else
        estado.innerHTML = `<strong>Estado del Pedido:</strong> <span class='estado-abierto' id='estado'>${pedido.estado}</span>`;
    tarjetaTemporal.appendChild(estado);

    let total = document.createElement("div");
    total.classList.add("text");
    total.setAttribute("id","total-pedido");
    total.innerHTML = `<p><strong>Precio total del pedido:</strong> $${totalDesigns}</p>`;
    tarjetaTemporal.appendChild(total);

    contenedor.appendChild(tarjetaTemporal);
}

function actualizarTotal(id) {
    let tarjetasTemporales = document.getElementById(id).querySelectorAll('.tarjeta-design.seleccionada');
    console.log(tarjetasTemporales.length);
    let total = 0;

    tarjetasTemporales.forEach(tarjeta => {
        const precioTexto = tarjeta.querySelector('#precio-design').textContent;
        const precio = parseFloat(precioTexto.split('$')[1]);
        total += precio;
    });

    document.querySelector('#total-pedido p').innerHTML = `<strong>Precio total del pedido:</strong> $${total}`;
    localStorage.setItem('totalPedido', total);
}

//Main del programa
const correoAdmin = "admin@gmail.com";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");
var contadorSeleccionado = 0;
var cualesSeleccionados = [];
var productos = [];

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        let pedirPedidos = async () => 
        {
            if (localStorage.getItem("email") != correoAdmin)
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
                            crearTarjetadesign(design, "tarjetas-design-pedido-nuevo");
                        });
                        let tarjetaSelect = null;
                        let todasSelect = [];
                        const tarjetas =document.getElementById("crear-pedido").querySelectorAll('.tarjeta-design');
                        tarjetas.forEach(tarjeta => 
                        {
                            tarjeta.addEventListener('click', function () 
                            {
                                // Quitar la selección de la tarjeta anterior
                                if (contadorSeleccionado == 10)
                                {
                                    todasSelect[0].classList.remove("seleccionada");
                                    todasSelect.shift();
                                    cualesSeleccionados.shift();
                                    contadorSeleccionado--;
                                }
        
                                // Seleccionar la nueva tarjeta
                                tarjetaSelect = tarjeta;
                                if (tarjetaSelect.classList.contains("seleccionada"))
                                {
                                    tarjetaSelect.classList.remove("seleccionada");
                                    return;
                                }
                                else
                                {
                                    tarjetaSelect.classList.add("seleccionada");
                                    todasSelect.push(tarjetaSelect);
                                    contadorSeleccionado++;
                                    let i = -1;
                                    let productos = [];
                                    let parrafos = tarjetaSelect.querySelectorAll("p");
                                    while (parrafos[i+2].id != "precio-design")
                                    {
                                        i+= 2;
                                        let productoEscogido = {};
                                        productoEscogido.nombre = parrafos[i].textContent.split(" ")[1];
                                        productoEscogido.precio = " ";
                                        productoEscogido.cantidad = parrafos[i+1].textContent.split(" ")[1];
                                        productos = productos.concat([productoEscogido]);
                                    }
                                    let designEscogido  = {};
                                    designEscogido.productos = productos;
                                    designEscogido.nombre = parrafos[0].textContent;
                                    designEscogido.precio = parrafos[i+2].textContent.split("$")[1];
                                    cualesSeleccionados = cualesSeleccionados.concat([designEscogido]);
                                    actualizarTotal("crear-pedido");
                                }
                            });    
                        });
                    }
                }
                pedirDesigns();
                ocultarPorID("opciones-pedido-admin");
                const pedir = await fetch(`/cliente/cargarPedidos?correo=${localStorage.getItem("email")}`,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                if (pedir.ok)
                {
                    const pedidosCargados = await pedir.json();
                    const respuesta = await fetch(`/admin/ConsultarPerfil?correo=${localStorage.getItem("email")}`,
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
                        const cliente = await respuesta.json();
                        pedidosCargados.forEach(pedido => {
                            crearTarjetaPedido(pedido, cliente, "tarjetas-pedidos");
                        });
                    }
                }
            }
            else
            {
                elementos[1].style.setProperty('display', 'none', 'important');
                ocultarPorID("opciones-pedido-cliente");
                const pedir = await fetch(`/admin/cargarPedidos`,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                if (pedir.ok)
                {
                    const pedidosTotales = await pedir.json();
                    const respuesta = await fetch(`/admin/cargarClientes`,
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
                        const clientes = await respuesta.json();
                        let cliente;
                        pedidosTotales.forEach(pedido => {
                            for (let k = 0; k<clientes.length; k++)
                            {
                                if (pedido.correo == clientes[k].correo)
                                    cliente = clientes[k];
                            }
                            crearTarjetaPedido(pedido, cliente, "tarjetas-pedidos");
                        });
                    }
                }
            }
    
            document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
            ocultarPorID("crear-pedido");
            ocultarPorID("editar-pedido");
            ocultarPorID("consultar-pedido");
            ocultarPorID("volver-pedidos");
            document.getElementById('volver-pedidos').addEventListener('click', function(){window.location.href = "gestion-pedidos.html";});
    
            const tarjetasPedidos = document.querySelectorAll(".tarjeta-pedido");
            const botonNuevo = document.getElementById("boton-nuevo-pedido");
            const botonEditar = document.getElementById("boton-editar-pedido");
            const botonConsultar = document.getElementById("boton-consultar-pedido");
            const botonCancelar = document.getElementById("boton-cancelar-pedido");
    
            let tarjetaSeleccionada = null;
            tarjetasPedidos.forEach(tarjeta => 
            {
                tarjeta.addEventListener("click", function ()
                {
                    if (tarjetaSeleccionada != tarjeta && tarjetaSeleccionada != null)
                        tarjetaSeleccionada.classList.remove("seleccionada");
                    if (tarjetaSeleccionada == tarjeta && tarjetaSeleccionada != null)
                    {
                        tarjetaSeleccionada.classList.remove("seleccionada");
                        tarjetaSeleccionada = null;
                        return;
                    }
                    else
                    {
                        tarjetaSeleccionada = tarjeta;
                        tarjeta.classList.add("seleccionada");
                        botonEditar.disabled = false;
                        botonConsultar.disabled = false;
                        botonCancelar.disabled = false;
                    }
                    
                })
            });
    
            //Sección de Cancelar Pedido
    
            //Sección de Consultar Pedido
            document.getElementById("boton-consultar-pedido").addEventListener('click', function()
            {
                let status = tarjetaSeleccionada.querySelector("#estado");
                if (tarjetaSeleccionada && status.textContent != "Cerrado")
                {
                    ocultarPorID("pedidos-creados");
                    ocultarPorID("opciones-pedido-cliente");
                    mostrarPorID("consultar-pedido");
                    mostrarPorID("volver-pedidos");
                    let seccionConsulta = document.getElementById("tarjetas-pedido-consultar");
                    tarjetaSeleccionada.setAttribute("id","tarjeta-consultada");
                    tarjetaSeleccionada.classList.remove("seleccionada");
                    seccionConsulta.appendChild(tarjetaSeleccionada);
                    let correoPedido = tarjetaSeleccionada.querySelectorAll("p")[2].textContent.split(" ")[1];
                    let idPedido = Number(tarjetaSeleccionada.querySelectorAll("p")[3].textContent.split(" ")[1]);
                    const botonConfirmarCierre = document.getElementById("cerrar-pedido");
                    botonConfirmarCierre.addEventListener('click', async () =>
                    {
                        const cerrar = await fetch (`/admin/cerrarPedido?id=${idPedido}&correo=${correoPedido}`,
                        {
                            method: 'GET',
                            headers:
                            {
                                'Accept': 'application/json'
                            }
                        });
                        if (cerrar.ok)
                        {
                            swal({
                                title: await cerrar.text(),
                                icon: "success"
                            }).then((resultado) => {window.location.href = "gestion-pedidos.html";});
                        }
                        else
                        {
                            const errorRespuesta = await cerrar.text();
                            swal ("Un error inesperado",errorRespuesta,"error");
                        }
                    });
                }
            });
            

            //Sección de Editar Pedido
            document.getElementById("boton-editar-pedido").addEventListener('click', function()
            {
                if (tarjetaSeleccionada)
                {
                    ocultarPorID("pedidos-creados");
                    ocultarPorID("opciones-pedido-cliente");
                    mostrarPorID("editar-pedido");
                    mostrarPorID("volver-pedidos");
                }
            });
    
            //Sección de Nuevo Pedido
            botonNuevo.addEventListener('click', function()
            {
                ocultarPorID("pedidos-creados");
                ocultarPorID("opciones-pedido-cliente");
                mostrarPorID("crear-pedido");
                mostrarPorID("volver-pedidos");
            });
    
            const confirmarPedido = document.getElementById("confirmar-pedido");
            confirmarPedido.addEventListener('click', function()
            {
                let registrarPedido = async () =>
                {
                    const peticion = await fetch (`/cliente/crearPedido?correo=${localStorage.getItem('email')}`,
                    {
                        method: 'POST',
                        headers:
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cualesSeleccionados)
                    });
                    if (peticion.ok)
                    {
                        alert("Pedido creado con exito");
                        window.location.href = "gestion-pedidos.html";
                    }
                    else
                    {
                        const error = await peticion.text();
                        console.log(error);
                        alert("Error al crear el pedido: " + error);
                    }
                }
                registrarPedido();
            });
        }
        pedirPedidos();
    }
    else
    {
        ocultarPorID("pedidos-creados");
        ocultarPorID("crear-pedido");
        ocultarPorID("editar-pedido");
        ocultarPorID("volver-pedidos");
    }
});