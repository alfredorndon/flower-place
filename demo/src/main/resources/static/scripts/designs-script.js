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

function crearTarjetaFlor(nombre, cantidad, precio) {
    const contenedor = document.getElementById("tarjetas-catalogo-design");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-flor");
    tarjeta.innerHTML = `
        <p class="nombre-flor">${nombre}</p>
        <p class="cantidad-flor">Cantidad: <span class="cantidad-actual">${cantidad}</span></p>
        <p class="precio-flor">Precio: $${precio}</p>
        <div class="contador">
            <input type="number" class="input-cantidad" value="0" min="0" max="${cantidad}" />
        </div>
    `;

    // Agregar un evento para actualizar el total
    const inputCantidad = tarjeta.querySelector('.input-cantidad');
    inputCantidad.addEventListener('input', () => {
        actualizarTotal();
    });

    contenedor.appendChild(tarjeta);
}

function crearTarjetaDiseño(diseño) {
    const contenedor = document.getElementById("tarjetas-design");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-design");

    // Asumiendo que diseño tiene las propiedades necesarias
    tarjeta.innerHTML = `
        <p id="nombre-design">${diseño.nombre}</p>
        <p id="precio-design">Precio Total: $${diseño.precioTotal.toFixed(2)}</p>
    `;

    // Añadir las flores y cantidades
    diseño.productos.forEach((producto, index) => {
        const florElemento = document.createElement("p");
        florElemento.id = `flor-${index + 1}`;
        florElemento.textContent = `Flor: ${producto.nombre}`;
        tarjeta.appendChild(florElemento);

        const cantidadElemento = document.createElement("p");
        cantidadElemento.id = `cantidad-flor-${index + 1}`;
        cantidadElemento.textContent = `Cantidad: ${producto.cantidad}`;
        tarjeta.appendChild(cantidadElemento);
    });

    contenedor.appendChild(tarjeta);
}

function actualizarTotal() {
    const tarjetas = document.querySelectorAll('.tarjeta-flor');
    let total = 0;

    tarjetas.forEach(tarjeta => {
        const precioTexto = tarjeta.querySelector('.precio-flor').textContent;
        const precio = parseFloat(precioTexto.replace('$', ''));
        const cantidadInput = parseFloat(tarjeta.querySelector('.input-cantidad').value);
        console.log(cantidadInput);
        total += precio * cantidadInput;
    });

    document.querySelector('#total-design p').innerHTML = `<strong>Precio total del diseño:</strong> $${total}`;
    console.log(total);
}

//Main del programa

const correoAdmin = "admin@gmail.com";
const contraAdmin = "admin1234";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");

document.addEventListener('DOMContentLoaded', function ()
{
    if (login)
    {
        let pedirProductos = async () => 
        {
            const respuesta = await fetch("/admin/Productos",
            {
                method:'GET',
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if(respuesta.ok)
            {
                const datos = await respuesta.json();
                datos.forEach(producto =>
                {
                    crearTarjetaFlor(producto.nombre, producto.cantidad, producto.precio);
                });
                document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
                ocultarPorID("nuevo-design");
                ocultarPorID('volver-designs');
                document.getElementById("volver-designs").addEventListener('click', function (){window.location.href = "gestion-designs.html";});

                //Sección de Nuevo Diseño
                document.getElementById("boton-nuevo-design").addEventListener('click', function()
                {
                    ocultarPorID("designs-guardados");
                    mostrarPorID("nuevo-design");
                    mostrarPorID("volver-designs");
                });

                document.getElementById('confirmar-design').addEventListener('click', async (event) => {
                    event.preventDefault(); // Evitar el envío del formulario por defecto
                    
                    const productosSeleccionados = [];
                    const tarjetas = document.querySelectorAll('.tarjeta-flor');
                    const precio = "";
                    tarjetas.forEach(tarjeta =>
                    {
                        const nombre = tarjeta.querySelector('.nombre-flor').textContent;
                        const cantidad = tarjeta.querySelector('.input-cantidad').value;
                        
                        if (cantidad > 0) {
                            productosSeleccionados.push({ nombre, precio, cantidad});
                        }
                    });
                    
                    let design =
                    {
                        productos: productosSeleccionados,
                        nombre: document.getElementById('nombre-design-form').value,
                        precioTotal: parseFloat(document.querySelector('#total-design p').textContent.replace(/[^0-9.-]+/g,""))
                    };
                    let emailCliente = localStorage.getItem('email');
                    const respuesta = await fetch(`/cliente/crearDesign?correo=${emailCliente}`,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(design)
                    });
                
                    if (respuesta.ok)
                    {
                        alert('Diseño creado con éxito');
                        window.location.href = "gestionar-design.html"
                    } 
                    else
                    {
                        const errorRespuesta = await respuesta.text();
                        console.log(errorRespuesta);
                        alert('Error al crear el diseño: ' + errorRespuesta);
                    }
                });
            }
            else
            {
                const errorRespuesta = await respuesta.text();
                console.log(errorRespuesta);
                alert(errorRespuesta);
            }
        }
        pedirProductos();
        // let pedirDesigns = async() =>
        // {
        //     event.preventDefault();
        //     const respuesta = await fetch(`/cliente/CrearDesign?correo=${emailCliente}`,
        //     {
        //         method: 'GET',
        //         headers:
        //         {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         }
        //     });
        //     if (respuesta.ok)
        //     {
        //         const diseños = await respuesta.json();
        //         diseños.forEach(diseño =>
        //         {
        //             crearTarjetaDiseño(diseño);
        //         });
        //     }
        //     else
        //     {
        //         const errorRespuesta = await respuesta.text();
        //         console.log(errorRespuesta);
        //         alert('Error al cargar los diseños: ' + errorRespuesta);
        //     }
        // }
        // pedirDesigns();
    }
    else
    {
        ocultarPorID("designs-guardados");
        ocultarPorID("nuevo-design");
        ocultarPorID("volver-designs");
    }
});