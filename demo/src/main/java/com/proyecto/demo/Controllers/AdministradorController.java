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

import java.io.IOException;
import java.util.ArrayList;
@RestController
@RequestMapping ("/admin")
public class AdministradorController {

    DesignJson designs = new DesignJson(new ArrayList<Producto>(), "", 0);
    PedidoJson pedidos = new PedidoJson(new ArrayList<Design>(), "", 0, "");
    public AdministradorController() {}

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody DatosPersona datosPersona) {
        if (datosPersona.validarDatosLogIn(datosPersona.getCorreo(), datosPersona.getContra()))
        return new ResponseEntity<String>("Inicio de sesion valido", HttpStatus.OK);
        else
        return new ResponseEntity<String>("Datos invalidos", HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<ArrayList<Producto>> obtenerProductos(){
        if (ProductoJson.obtenerProductosTotales().isEmpty())
        return new ResponseEntity<ArrayList<Producto>>(ProductoJson.obtenerProductosTotales(),HttpStatus.BAD_REQUEST);
        else
        return new ResponseEntity<ArrayList<Producto>>(ProductoJson.obtenerProductosTotales(),HttpStatus.OK);
    }

    @PostMapping("/AgregarProducto")
    public ResponseEntity<String> agregarProducto (@RequestBody Producto productoAgregado)
    {
        Administrador administrador= new Administrador();
        if (!administrador.verificarProducto(productoAgregado))
        {
            ProductoJson.guardarProducto(productoAgregado);
            return new ResponseEntity<String>("Producto Agregado",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Datos Invalidos",HttpStatus.CONFLICT);
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
    @GetMapping("/ConsultarPerfil")
    public Cliente consultarPerfil(@RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente;
        if (correo.equals("administrador@gmail.com"))
        {
            cliente= new Cliente(correo,"admin1234","Administrador","04120998105");
        }
        else
        {
            cliente= ClienteJson.obtenerClientes(correo).get(0);
            cliente=new Cliente (cliente.getCorreo(),cliente.getContrasena(),cliente.getNombre(),cliente.getNumeroTelefonico());
        }
        return cliente;
    }
}