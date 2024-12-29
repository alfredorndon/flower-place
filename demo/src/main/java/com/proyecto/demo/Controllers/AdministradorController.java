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
        Administrador administrador= new Administrador(1); //quitar
        if (administrador.verificarProducto(productoAgregado))
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
        Administrador admin =new Administrador(1); //quitar
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
        if (correo.equals("admin@gmail.com"))
            cliente= new Cliente(correo,"admin1234","Administrador","04120998105"); //quitar
            // cliente= new Cliente(correo,AdministradorJson.obtenerAdmin().getContrasena(),AdministradorJson.obtenerAdmin().getNombre(),AdministradorJson.obtenerAdmin().getNumeroTelefonico());
        else
        {
            cliente= ClienteJson.obtenerClientes(correo).get(0);
            cliente=new Cliente (cliente.getCorreo(),cliente.getContrasena(),cliente.getNombre(),cliente.getNumeroTelefonico());
        }
        return cliente;
    }
    @GetMapping("/cargarPedidos")
    public ResponseEntity<ArrayList<Pedido>> obtenerPedidos() throws IOException
    {
        if (PedidoJson.obtenerPedidosTotales().isEmpty())
            return new ResponseEntity<ArrayList<Pedido>>(PedidoJson.obtenerPedidosTotales(),HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<ArrayList<Pedido>>(PedidoJson.obtenerPedidosTotales(),HttpStatus.OK);
    }

    @PostMapping("/editarPedido")
    public ResponseEntity<String> editarPedido (@RequestBody String estado,  @RequestParam("id") int id, @RequestParam ("correo") String correo) throws IOException
    {
        Administrador admin= new Administrador(1); //quitar
        admin.editarPedido(estado,id);
        admin.editarPedidoCliente(estado, correo, id);
        return new ResponseEntity<String>("Pedido Editado",HttpStatus.OK);
    }

    // @PostMapping("/editarPerfilAdministrador")
    // public ResponseEntity<String> editarPerfilAdministrador(@RequestParam("correo") String correo, @RequestParam("contra") String contra, @RequestParam("nombre") String nombre, @RequestParam("numeroTelefonico") String numeroTelefonico ) throws IOException
    // {
    //     Administrador admin= new Administrador(1); //quitar
    //     if (admin.verificarNumeroTelefonico (numeroTelefonico))
    //     {
    //     admin.editarPerfilAdministrador(correo, contra, nombre, numeroTelefonico);
    //     return new ResponseEntity<String>("Perfil editado con exito", HttpStatus.OK);
    //     }
    //     else
    //     return new ResponseEntity<String>("Numero Telefonico ya existente", HttpStatus.BAD_REQUEST);
    // }

    // @GetMapping("/consultarProducto")
    // public Producto consultarProducto (@RequestParam("nombre") String nombre) 
    // {
    //     Administrador admin= new Administrador(1); //quitar
    //     return admin.obtenerProducto(nombre);
    // }
    
    // @PostMapping("/eliminarProducto")
    // public ResponseEntity<String> eliminarProducto (@RequestParam("nombre") String nombre) throws IOException
    // {
    //     ProductoJson.eliminarProducto(nombre);
    //     return new ResponseEntity<String>("Producto eliminado con exito", HttpStatus.OK);
    // }

    @GetMapping("/consultarPedido")
    public Pedido consultarPedido (@RequestParam("id") int id)
    {
        Administrador admin= new Administrador(1); //quitar
        return admin.obtenerPedido(id);
    }
}