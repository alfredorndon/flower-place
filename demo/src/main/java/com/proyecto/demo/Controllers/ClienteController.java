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

    @PostMapping("/crearPedido")
    public ResponseEntity<String> crearPedido(@RequestBody Pedido pedido, @RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente= new Cliente(correo,"","","");
        cliente.agregarPedido(pedido, correo);
        cliente.actualizarProductosTotales(pedido);
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

    @GetMapping("/editarPerfilCliente")
    public ResponseEntity<String> editarPerfilCliente(@RequestParam("correo") String correo, @RequestParam("contrasena") String contrasena,@RequestParam("nombre") String nombre, @RequestParam("numeroTelefonico") String numeroTelefonico) throws IOException
    {
        Cliente cliente = new Cliente();
        if (cliente.verificarNumeroTelefonico(correo, numeroTelefonico))
        {
            cliente.editarPerfilCliente(correo, contrasena, nombre, numeroTelefonico);
            return new ResponseEntity<String>("Perfil editado exitosamente", HttpStatus.OK);
        }
        else
            return new ResponseEntity<String>("Número de teléfono ya existente", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/eliminarPerfil")
    public ResponseEntity<String> eliminarPerfil(@RequestParam("correo") String correo) throws IOException
    {
        ClienteJson.eliminarCliente(correo);
        return new ResponseEntity<String>("Perfil eliminado exitosamente", HttpStatus.OK);
    }

    @PostMapping ("/eliminarDesign")
    public ResponseEntity<String> eliminarDesign(@RequestParam("correo") String correo, @RequestParam("nombre") String nombreDesign) throws IOException
    {
        Cliente cliente = new Cliente();
        cliente= ClienteJson.obtenerClientes(correo).get(0);
        cliente.eliminarDesign(correo, nombreDesign);
        return new ResponseEntity<>("Diseño eliminado exitosamente",HttpStatus.OK);
    }

    @PostMapping ("/modificarDesign")
    public ResponseEntity<String> modificarDesign(@RequestParam("correo") String correo, @RequestBody Design design) throws IOException
    {
        Cliente cliente = new Cliente();
        cliente = ClienteJson.obtenerClientes(correo).get(0);
        if (!cliente.validarDesignModificado(design, correo))
        {
            cliente.modificarDesign(correo, design);
            return new ResponseEntity<String>("Diseño editado exitosamente", HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Ha seleccionado más productos de los debidos", HttpStatus.BAD_REQUEST);
    }
}

