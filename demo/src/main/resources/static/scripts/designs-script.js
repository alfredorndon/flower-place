function ocultarPorID (ID)
{
    document.getElementById(ID).style.setProperty("display","none","important");
}

function mostrarPorID (ID)
{
    document.getElementById(ID).style.setProperty("display","block","important");
}

function ocultarPorClase (clase)
{
    var elementos = document.getElementsByClassName(clase);
    for (var i = 0; i < elementos.length; i++)
    {
        elementos[i].style.setProperty("display","none","important");
    }
}

function mostrarPorClase (clase)
{
    var elementos = document.getElementsByClassName(clase);
    for (var i = 0; i < elementos.length; i++)
    {
        elementos[i].style.setProperty("display", "block", "important");
    }
}

function comprobarLogIn()
{
    if (localStorage.getItem("login") !== null)
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
    localStorage.removeItem("login");
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
    const inputCantidad = tarjeta.querySelector(".input-cantidad");
    inputCantidad.addEventListener("input", () => {
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
    const tarjetas = document.querySelectorAll(".tarjeta-flor");
    let total = 0;

    tarjetas.forEach(tarjeta => {
        const precioTexto = tarjeta.querySelector(".precio-flor").textContent;
        const precio = parseFloat(precioTexto.split("$")[1]);
        const cantidadInput = parseFloat(tarjeta.querySelector(".input-cantidad").value);
        total += precio * cantidadInput;
    });

    document.querySelector("#total-design p").innerHTML = `<strong>Precio total del diseño:</strong> $${total}`;
    localStorage.setItem("totalDesign", total);
}

//Main del programa

const correoAdmin = "admin@gmail.com";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");

document.addEventListener("DOMContentLoaded", function ()
{
    if (login)
    {
        let pedirDesigns = async() =>
        {
            event.preventDefault();
            let emailCliente = localStorage.getItem("email");
            const respuesta = await fetch(`/cliente/cargarDesigns?correo=${emailCliente}`,
            {
                method: "GET",
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (respuesta.ok)
            {
                const diseños = await respuesta.json();
                diseños.forEach(diseño =>
                {
                    crearTarjetaDiseño(diseño);
                });
            }
        }
        pedirDesigns();
        let pedirProductos = async () => 
        {
            const respuesta = await fetch("/admin/Productos",
            {
                method:"GET",
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
                document.getElementById("icono-logout").addEventListener("click", cerrarSesion);
                ocultarPorID("nuevo-design");
                ocultarPorID("volver-designs");
                document.getElementById("volver-designs").addEventListener("click", function (){window.location.href = "gestion-designs.html";});
                const tarjetas = document.querySelectorAll(".tarjeta-design");
                const botonEditar = document.getElementById("boton-editar-design");
                const botonEliminar = document.getElementById("boton-eliminar-design");
                let tarjetaSeleccionada = null;

                tarjetas.forEach(tarjeta => {
                    tarjeta.addEventListener("click", function () {
                        // Quitar la selección de la tarjeta anterior
                        if (tarjetaSeleccionada) {
                            tarjetaSeleccionada.classList.remove("seleccionada");
                        }

                        // Seleccionar la nueva tarjeta
                        tarjetaSeleccionada = tarjeta;
                        tarjetaSeleccionada.classList.add("seleccionada");
                        botonEditar.disabled = false; // Habilitar el botón de editar
                        botonEliminar.disabled = false; // Habilitar el botón de eliminar
                        console.log('me selecciono');
                    });
                });

                //Sección de Editar Diseño
                botonEditar.addEventListener("click", async function ()
                {
                    if (tarjetaSeleccionada)
                    {
                        ocultarPorID("designs-guardados");
                        ocultarPorID("confirmar-design");
                        document.getElementsByClassName("section-title")[1].innerHTML = "<h2>Editar Diseño</h2>";
                        mostrarPorID("nuevo-design");
                        let texto = tarjetaSeleccionada.querySelectorAll("p");

                    }
                });

                //Sección de Eliminar Diseño
                botonEliminar.addEventListener("click", function ()
                {
                    let texto = tarjetaSeleccionada.querySelectorAll("p");
                    let nombreDesign = texto[0].textContent;
                    if (tarjetaSeleccionada)
                    {
                        swal({
                            title: "¿Estás seguro de eliminar el Diseño?",
                            text: "No podrás recuperar el Diseño eliminado.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        }).then((seraEliminado)=>{
                            if (seraEliminado) 
                            {
                                eliminarDesign = async () =>
                                {
                                    const peticion = await fetch(`/cliente/eliminarDesign?correo=${localStorage.getItem("email")}&nombre=${nombreDesign}`,
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
                                            icon: "success",
                                        }).then((resultado) => {window.location.href = "gestion-designs.html";});
                                    }
                                    else
                                    {
                                        const errorRespuesta = await peticion.text();
                                        console.log(errorRespuesta);
                                        swal ("Un error inesperado","El diseño no pudo ser eliminado","error");
                                    }
                                }
                                eliminarDesign();
                            }
                        });
                    }
                });

                //Sección de Nuevo Diseño
                document.getElementById("boton-nuevo-design").addEventListener("click", function()
                {
                    ocultarPorID("designs-guardados");
                    mostrarPorID("nuevo-design");
                    mostrarPorID("volver-designs");
                    ocultarPorID("confirmar-edicion");
                });

                document.getElementById("confirmar-design").addEventListener("click", async (event) => 
                {
                    event.preventDefault(); // Evitar el envío del formulario por defecto
                    
                    const productosSeleccionados = [];
                    const tarjetas = document.querySelectorAll(".tarjeta-flor");
                    tarjetas.forEach(tarjeta =>
                    {
                        const nombre = tarjeta.querySelector(".nombre-flor").textContent;
                        const cantidad = tarjeta.querySelector(".input-cantidad").value;
                        const precio = tarjeta.querySelector(".precio-flor").value;
                        if (cantidad > 0) {
                            productosSeleccionados.push({ nombre, precio, cantidad});
                        }
                    });
                    
                    let design =
                    {
                        productos: productosSeleccionados,
                        nombre: document.getElementById("nombre-design-form").value,
                        precio: localStorage.getItem("totalDesign")
                    };
                    emailCliente = localStorage.getItem("email");
                    const respuesta = await fetch(`/cliente/crearDesign?correo=${emailCliente}`,
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(design)
                    });
                
                    if (respuesta.ok)
                    {
                        alert("Diseño creado con éxito");
                        window.location.href = "gestion-designs.html"
                    } 
                    else
                    {
                        const errorRespuesta = await respuesta.text();
                        console.log(errorRespuesta);
                        alert("Error al crear el diseño: " + errorRespuesta);
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
        
    }
    else
    {
        ocultarPorID("designs-guardados");
        ocultarPorID("nuevo-design");
        ocultarPorID("volver-designs");
    }
});