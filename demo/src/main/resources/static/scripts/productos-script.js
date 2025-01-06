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

function crearTarjeta(nombre, cantidad, precio, f) {
    const contenedor = document.getElementById("tarjetas-catalogo");
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-flor");
    tarjeta.innerHTML = `
        <p class="nombre-flor">${nombre}</p>
        <p class="cantidad-flor">Cantidad: ${cantidad}</p>
        <p class="precio-flor">Precio: $${precio}</p>
    `;

    contenedor.appendChild(tarjeta);
}

function cerrarSesion()
{
    localStorage.removeItem('login');
    window.location.href = "index.html";
}

//Main del programa

const correoAdmin = "admin@gmail.com";

var login = comprobarLogIn();
let menuBar = document.getElementsByClassName("menu-bar");
let elementos = menuBar[0].querySelectorAll("h3");

document.addEventListener('DOMContentLoaded', function() 
{
    if (login)
    {
        ocultarPorID('volver-productos');
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
                if (datos != null)
                {
                    datos.forEach(producto =>
                    {
                        crearTarjeta(producto.nombre, producto.cantidad, producto.precio, producto.foto);
                    });
                    ocultarPorID("editar-producto");
                    ocultarPorID("agregar-producto");
                    document.getElementById('icono-logout').addEventListener('click', cerrarSesion);
                }

                //Este if solo ocurre si el Admin entra
                if (localStorage.getItem('email') == correoAdmin)
                {
                    document.getElementById("volver-productos").addEventListener("click", function (){window.location.href = "gestion-productos.html";})
                    elementos[1].style.setProperty('display', 'none', 'important');

                    //Sección de Editar Producto
                    document.getElementById("boton-editar-producto").addEventListener('click', function()
                    {
                        ocultarPorID("catalogo-productos");
                        mostrarPorID("editar-producto");
                        mostrarPorID("volver-productos");
                    });
                    const tarjetas = document.querySelectorAll('.tarjeta-flor');
                    const botonEditar = document.getElementById('boton-editar-producto');
                    const botonEliminar = document.getElementById("boton-eliminar-producto");
                    let tarjetaSeleccionada = null;

                    tarjetas.forEach(tarjeta => {
                        tarjeta.addEventListener('click', function () {
                            if (tarjetaSeleccionada != tarjeta && tarjetaSeleccionada != null)
                                tarjetaSeleccionada.classList.remove("seleccionada");
                            if (tarjetaSeleccionada == tarjeta && tarjetaSeleccionada != null)
                            {
                                tarjetaSeleccionada.classList.remove("seleccionada");
                                tarjetaSeleccionada = null;
                                botonEditar.disabled = true;
                                botonEliminar.disabled = true;
                                return;
                            }
                            else
                            {
                                tarjetaSeleccionada = tarjeta;
                                tarjetaSeleccionada.classList.add('seleccionada');
                                botonEditar.disabled = false; // Habilitar el botón de editar
                                botonEliminar.disabled = false; // Habilitar el botón de eliminar
                            }
                            
                        });
                    });
                    
                    botonEditar.addEventListener('click', function () 
                    {
                        if (tarjetaSeleccionada)
                        {
                            let texto = tarjetaSeleccionada.querySelectorAll("p");

                            // Cargar la información en el formulario
                            document.getElementById('nombre-flor-editar').value = texto[0].textContent;
                            document.getElementById('cantidad-flor-editar').value = texto[1].textContent.split(" ")[1];
                            document.getElementById('precio-flor-editar').value = texto[2].textContent.split("$")[1];
                            document.getElementById('cantidad-flor-editar').placeholder= texto[1].textContent.split(" ")[1];
                            document.getElementById('precio-flor-editar').placeholder = texto[2].textContent.split("$")[1];
                            ocultarPorID("catalogo-productos");
                            mostrarPorID("editar-producto");
                        }
                        document.getElementById('editar-confirmar').addEventListener('click', async () =>
                        {
                            event.preventDefault();
                            let productoEditado = {};
                            productoEditado.nombre = document.getElementById("nombre-flor-editar").value;
                            productoEditado.precio = document.getElementById("precio-flor-editar").value;
                            productoEditado.cantidad = document.getElementById("cantidad-flor-editar").value;
                            const guardar = await fetch("/admin/EditarProducto",
                            {
                                method: 'POST',
                                headers:
                                {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productoEditado)
                            });
                            if (guardar.ok)
                            {
                                alert ('Producto editado con éxito');
                                window.location.href = "gestion-productos.html";
                            }
                            else
                            {
                                const errorRespuesta = await guardar.text();
                                console.log(errorRespuesta);
                                alert(errorRespuesta);
                            }
                        });
                    });

                    //Sección de Nuevo Producto
                    document.getElementById("boton-nuevo-producto").addEventListener('click', function()
                    {
                        ocultarPorID("catalogo-productos");
                        mostrarPorID("agregar-producto");
                        mostrarPorID("volver-productos");
                    });
                    let botonAgregarProducto = document.getElementById("agregar-confirmar");
                    botonAgregarProducto.addEventListener("click", async () =>
                    {
                        event.preventDefault();
                        
                        let productoAgregado = {};
                        productoAgregado.nombre = document.getElementById("nombre-flor-form").value;
                        productoAgregado.precio = document.getElementById("precio-flor-form").value;
                        productoAgregado.cantidad = document.getElementById("cantidad-flor-form").value;

                        const peticion = await fetch("/admin/AgregarProducto", 
                        {
                            method:'POST',
                            headers:
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(productoAgregado)
                        });
                        if (peticion.ok)
                        {
                            window.location.href = "gestion-productos.html";
                        } 
                        else
                        {
                            const errorRespuesta = await peticion.text();
                            console.log(errorRespuesta);
                            alert(errorRespuesta);
                        }
                    });

                    //Sección Eliminar Prodcuto
                    document.getElementById("boton-eliminar-producto").addEventListener('click', function()
                    {
                        let texto = tarjetaSeleccionada.querySelectorAll("p");
                        let nombreProducto = texto[0].textContent;
                        if (tarjetaSeleccionada)
                        {
                            swal({
                                title: "¿Estás seguro de eliminar el producto?",
                                text: "No podrás recuperar el producto eliminado.",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            }).then((seraEliminado)=>{
                                if (seraEliminado) 
                                {
                                    eliminarProdcuto = async () =>
                                    {
                                        const peticion = await fetch(`/admin/eliminarProducto?nombre=${nombreProducto}`,
                                        {
                                            method: 'POST',
                                            headers:
                                            {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                            }
                                        });
                                        if (peticion.ok)
                                        {
                                            swal ({
                                                title: await peticion.text(),
                                                icon: "success",
                                            }).then((resultado) => {window.location.href = "gestion-productos.html";});
                                        }
                                        else
                                        {
                                            const errorRespuesta = await peticion.text();
                                            console.log(errorRespuesta);
                                            swal ("Un error inesperado","El producto no pudo ser eliminado","error");
                                        }
                                    }
                                    eliminarProdcuto();
                                }
                            });
                        }
                    });
                }
                else
                {
                    ocultarPorID("boton-eliminar-producto");
                    ocultarPorID('boton-editar-producto');
                    ocultarPorID('boton-nuevo-producto');
                }
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
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        ocultarPorID("catalogo-productos");
        ocultarPorID("volver-productos");
    }
});