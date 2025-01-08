package com.proyecto.demo.Controllers;

import com.proyecto.demo.Model.*;
import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.DesignJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;
import java.util.Objects;
import java.util.Collections;

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
        if (datosPersona.validarDatosLogIn(datosPersona.getCorreo(), datosPersona.getContrasena()))
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
    public ResponseEntity<String> agregarProducto (@RequestBody Producto productoAgregado) throws IOException
    {
        Administrador administrador= new Administrador(); 
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

        Administrador admin =new Administrador(); 
        admin.setProductos(ProductoJson.obtenerProductosTotales());
        if (admin.validarDatosProducto(productoEditado.getCantidad(),productoEditado.getPrecio()))
        {
            admin.editarProducto(productoEditado.getNombre(), productoEditado.getPrecio(), productoEditado.getCantidad());
            return new ResponseEntity<String>("Producto Editado con éxito",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Datos invalidos",HttpStatus.CONFLICT);
    }

    @GetMapping("/ConsultarPerfil")
    public Cliente consultarPerfil(@RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente;
        if (correo.equals("admin@gmail.com"))
            cliente= new Cliente(correo,"admin1234","Administrador","04122398760");
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
        {
            ArrayList<Pedido> pedidos = PedidoJson.obtenerPedidosTotales();
            ArrayList<Pedido> cerrados = new ArrayList<Pedido>();
            for (int i=0; i<pedidos.size(); i++)
            {
                if (pedidos.get(i).getEstado().equals("Cerrado"))
                    cerrados.add(pedidos.get(i));
            }
            pedidos.removeIf(pedido-> pedido.getEstado().equals("Cerrado"));
            Collections.reverse(pedidos);
            pedidos.addAll(cerrados);
            return new ResponseEntity<ArrayList<Pedido>>(pedidos,HttpStatus.OK);
        }
    }

    @GetMapping("/cargarClientes")
    public ResponseEntity<ArrayList<Cliente>> obtenerClientes() throws IOException
    {
        if (ClienteJson.obtenerClientesTotales().isEmpty())
            return new ResponseEntity<ArrayList<Cliente>>(ClienteJson.obtenerClientesTotales(),HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<ArrayList<Cliente>>(ClienteJson.obtenerClientesTotales(),HttpStatus.OK);
    }

    @PostMapping("/editarPedido")
    public ResponseEntity<String> editarPedido (@RequestBody String estado,  @RequestParam("id") int id, @RequestParam ("correo") String correo) throws IOException
    {
        Administrador admin= new Administrador(); 
        admin.editarPedido(estado,id);
        admin.editarPedidoCliente(estado, correo, id);
        return new ResponseEntity<String>("Pedido Editado",HttpStatus.OK);
    }

    @PostMapping("/editarPerfilAdministrador")
    public ResponseEntity<String> editarPerfilAdministrador(@RequestParam("correo") String correo, @RequestParam("contra") String contra, @RequestParam("nombre") String nombre, @RequestParam("numeroTelefonico") String numeroTelefonico ) throws IOException
    {
        Administrador admin= new Administrador(1); 
        if (admin.verificarNumeroTelefonico (numeroTelefonico))
        {
        admin.editarPerfilAdministrador(correo, contra, nombre, numeroTelefonico);
        return new ResponseEntity<String>("Perfil editado con exito", HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Numero Telefonico ya existente", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/consultarProducto")
    public Producto consultarProducto (@RequestParam("nombre") String nombre) throws IOException
    {
        Administrador admin= new Administrador(); 
        return admin.obtenerProducto(nombre);
    }
    
    @PostMapping("/eliminarProducto")
    public ResponseEntity<String> eliminarProducto (@RequestParam("nombre") String nombre) throws IOException
    {
        ProductoJson.eliminarProducto(nombre);
        return new ResponseEntity<String>("Producto eliminado con exito", HttpStatus.OK);
    }

    @GetMapping("/cerrarPedido")
    public ResponseEntity<String> consultarPedido (@RequestParam("id") int id, @RequestParam("correo") String correo) throws IOException
    {
        Pedido pedido = PedidoJson.obtenerPedidos(id).get(0);
        PedidoJson.eliminarPedido(id, 0);
        Cliente cliente = ClienteJson.obtenerClientes(correo).get(0);
        ArrayList<Pedido> pedidos = cliente.getPedidos();
        for (int i=0; i<pedidos.size(); i++)
        {
            if (pedidos.get(i).getId() == id)
                pedidos.set(i, pedido);
        }
        boolean Posible= cliente.actualizarProductosTotales(pedido);
        if (Posible)
        {
            pedido.setEstado("Cerrado");
            cliente.setPedidos(pedidos);
            ClienteJson.eliminarCliente(correo);
            ClienteJson.guardarCliente(cliente);
            PedidoJson.guardarPedido(pedido);
            return new ResponseEntity<String>("Pedido cerrado con exito", HttpStatus.OK);
        }
        else
            return new ResponseEntity<String>("No hay suficientes productos en este momento", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/cancelarPedido")
    public ResponseEntity<String> cancelarPedido (@RequestParam("id") int id, @RequestParam ("correo") String correo) throws IOException
    {
        Administrador admin= new Administrador();
        admin.cancelarPedido(id, correo);
        return new ResponseEntity<String>("Pedido cancelado con exito", HttpStatus.OK);
    }
}