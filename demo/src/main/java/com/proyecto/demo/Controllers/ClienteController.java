package com.proyecto.demo.Controllers;


import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Cliente;
import com.proyecto.demo.Model.Design;
import com.proyecto.demo.Model.Pedido;
import com.proyecto.demo.Model.Producto;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    public ClienteController() {}

    @PostMapping("/crearDesign")
    public ResponseEntity<String> crearDesign(@RequestBody Design design, @RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente= new Cliente(correo,"","","");
        if (!cliente.validarDesign(design,correo))
        {
            cliente.agregarDiseno(design,correo);
            return new ResponseEntity<String>("Diseño agregado", HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Diseño existente o cantidad de productos invalida", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/cargarDesigns")
    public ResponseEntity<ArrayList<Design>> cargarDesigns(@RequestParam("correo") String correo)
    {
        Cliente cliente= ClienteJson.obtenerClientes(correo).get(0);
        if (cliente.getDesigns().isEmpty())
        {
            return new ResponseEntity<ArrayList<Design>>(cliente.getDesigns(),HttpStatus.BAD_REQUEST);
        }
        else
        return new ResponseEntity<ArrayList<Design>>(cliente.getDesigns(),HttpStatus.OK);
    }

    @PostMapping("/crearPedidos")
    public ResponseEntity<String> crearPedido(@RequestBody Pedido pedido, @RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente= new Cliente(correo,"","","");
        cliente.actualizarProductosTotales();
        cliente.agregarPedido(pedido, correo);
        return new ResponseEntity<String>("Pedido creado", HttpStatus.OK);
    }
    @GetMapping("/cargarPedidos")
    public ResponseEntity<ArrayList<Pedido>> obtenerPedidos(@RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente= ClienteJson.obtenerClientes(correo).get(0);
        if (cliente.getPedidos().isEmpty())
            return new ResponseEntity<ArrayList<Pedido>>(cliente.getPedidos(),HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<ArrayList<Pedido>>(cliente.getPedidos(),HttpStatus.OK);
    }

    @PostMapping("/eliminarPerfil")
    public ResponseEntity<String> eliminarPerfil(@RequestParam("correo") String correo) throws IOException 
    {
        ClienteJson.eliminarCliente(correo);
        return new ResponseEntity<String>("Perfil eliminado", HttpStatus.OK);
    }
    
    // @PostMapping("/editarPerfilCliente")
    // public ResponseEntity<String> editarPerfilCliente (@RequestParam("correo") String correo, @RequestParam("contra") String contra, @RequestParam("nombre") String nombre, @RequestParam("numeroTelefonico") String numeroTelefonico ) throws IOException
    // {
    //     Cliente cliente = new Cliente(correo,contra,nombre,numeroTelefonico);
    //     if (cliente.verificarNumeroTelefonico (correo, numeroTelefonico))
    //     {
    //     cliente.editarPerfilCliente(correo, contra, nombre, numeroTelefonico);
    //     return new ResponseEntity<String>("Perfil editado con exito", HttpStatus.OK);
    //     }
    //     else
    //     return new ResponseEntity<String>("Numero Telefonico ya existente", HttpStatus.BAD_REQUEST);
    // }

    @PostMapping("/eliminarDesign")
    public ResponseEntity<String> eliminarDesign(@RequestParam("correo") String correo, @RequestParam("nombreDesign") String nombreDesign) throws IOException
    {
        Cliente cliente = new Cliente(correo, "", "", "");
        cliente= ClienteJson.obtenerClientes(correo).get(0);
        cliente.eliminarDesign(correo, nombreDesign);
        return new ResponseEntity<String> ("Diseño borrado exitosamente", HttpStatus.OK);
    }
}

