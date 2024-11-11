package com.proyecto.demo.Controllers;

import com.proyecto.demo.Model.*;
import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.DesignJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.proyecto.demo.Model.Cliente;

import java.io.IOException;
import java.util.ArrayList;
@RestController
@RequestMapping ("/admin")
public class AdministradorController {

    DesignJson designs = new DesignJson(new ArrayList<Producto>(), "", 0);
    PedidoJson pedidos = new PedidoJson(new ArrayList<Design>(), "", 0, "");
    public AdministradorController() {}

    @PostMapping("/login")
    public ResponseEntity<DatosPersona> login(@RequestBody DatosPersona datosPersona) {
        datosPersona= datosPersona.ObtenerDatos(datosPersona.getCorreo(), datosPersona.getContra());
        return new ResponseEntity<DatosPersona>(datosPersona, HttpStatus.OK);
    }
    @PostMapping("/registro")
    public ResponseEntity<String> registro (@RequestBody Cliente cliente) {
        if(!cliente.verificarCorreo(cliente.getCorreo()))
        {
            ClienteJson.guardarCliente(cliente);
            return new ResponseEntity<String>("Datos Ingresados",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Correo Invalido",HttpStatus.CONFLICT);
    }

    @GetMapping("/Productos")
    public ArrayList<Producto> obtenerProductos(){
        return ProductoJson.obtenerProductosTotales();
    }

    @PostMapping("/AgregarProducto")
    public ResponseEntity<String> agregarProducto (@RequestBody Producto productoAgregado)
    {
        Administrador administrador= new Administrador();
        if (!administrador.verificarProducto(productoAgregado.getNombre()))
        {
            ProductoJson.guardarProducto(productoAgregado);
            return new ResponseEntity<String>("Producto Agregado",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("El Producto ya existe",HttpStatus.CONFLICT);
    }

    @PostMapping("/EditarProducto")
    public ResponseEntity<String> editarProducto(@RequestBody Producto productoEditado) throws IOException
    {
        Administrador admin =new Administrador();
        if (admin.validarDatosProducto(productoEditado.getCantidad(),productoEditado.getPrecio()))
        {
            admin.editarProducto(productoEditado.getNombre(), productoEditado.getPrecio(), productoEditado.getCantidad());
            return new ResponseEntity<String>("Producto Editado",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Datos invalidos",HttpStatus.CONFLICT);
    }
}