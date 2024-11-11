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

//Main del programa

var login = comprobarLogIn();

document.addEventListener('DOMContentLoaded', function() 
{
    if (login)
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");

        //Sección de Editar Producto
        document.getElementById("boton-editar-producto").addEventListener('click', function()
        {
            ocultarPorID("catalogo-productos");
            mostrarPorID("editar-producto");
        })

        //Sección de Nuevo Producto
        document.getElementById("boton-nuevo-producto").addEventListener('click', function()
        {
            ocultarPorID("catalogo-productos");
            mostrarPorID("agregar-producto");
        })
    }
    else
    {
        ocultarPorID("editar-producto");
        ocultarPorID("agregar-producto");
        ocultarPorID("catalogo-productos");
        ocultarPorID("volver-productos");
    }
});

let botonAgregarProducto = document.getElementById("agregar-producto-boton");

botonAgregarProducto.addEventListener("click", evento => {
    evento.preventDefault(); 
    agregarProducto();
});

let agregarProducto = async () => {
    let campos = {};

    campos.nombre = document.getElementById("nombre-flor-form").value;
    campos.cantidad = document.getElementById("cantidad-flor-form").value;
    campos.precio = document.getElementById("precio-flor-form").value;

    const fotoInput = document.getElementById("foto-flor-form");
    const foto = fotoInput.files[0];

    const formData = new FormData();
    formData.append('nombre', campos.nombre);
    formData.append('cantidad', campos.cantidad);
    formData.append('precio', campos.precio);
    formData.append('foto', foto);

    const peticion = await fetch("http://localhost:8080/admin/productos", {
        method: 'POST',
        body: formData 
    });

    if (peticion.ok) {
        // Crear la tarjeta
        crearTarjeta(campos.nombre, campos.cantidad, campos.precio, foto);
    } else {
        console.error("Error al agregar el producto");
    }
}

function crearTarjeta(nombre, cantidad, precio, foto) {
    const contenedor = document.getElementById("tarjetas-catalogo");

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-flor");

    tarjeta.innerHTML = `
        <div class="imagen-flor">
            <img class="foto-flor" src="${URL.createObjectURL(foto)}" alt="Imagen de la Flor" />
        </div>
        <p class="nombre-flor">${nombre}</p>
        <p class="cantidad-flor">Cantidad: ${cantidad}</p>
        <p class="precio-flor">Precio: $${precio}</p>
    `;

    contenedor.appendChild(tarjeta);
}