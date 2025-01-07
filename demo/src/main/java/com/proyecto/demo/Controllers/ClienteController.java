package com.proyecto.demo.Controllers;


import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Cliente;
import com.proyecto.demo.Model.Design;
import com.proyecto.demo.Model.Pedido;
import com.proyecto.demo.Model.Producto;
import java.util.Objects;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

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
    public ResponseEntity<String> crearPedido(@RequestBody ArrayList<Design> Design, @RequestParam("correo") String correo) throws IOException
    {
        if (Design.isEmpty())
            return new ResponseEntity<String>("No se pueden crear pedidos sin diseños", HttpStatus.BAD_REQUEST);
        else
        {
            Cliente cliente= ClienteJson.obtenerClientes(correo).get(0);
            ArrayList<Design> designsCliente = cliente.getDesigns();
            ArrayList<Design> designsPedidos = new ArrayList<Design>();
            ArrayList<Design> design = Design;
            for (int i=0; i<design.size(); i++)
            {
                for (int j=0; j<designsCliente.size(); j++)
                {
                    Design aComparar = design.get(i);
                    Design temporal = designsCliente.get(j);
                    if(Objects.equals(temporal.getNombre(), aComparar.getNombre()))
                    {
                        designsPedidos.add(temporal);
                    }
                }
            }
            Pedido pedido = new Pedido(correo);
            pedido.setDisenos(designsPedidos);
            cliente.agregarPedido(pedido, correo);
            return new ResponseEntity<String>("Pedido creado", HttpStatus.OK);
        }
    }
    @GetMapping("/cargarPedidos")
    public ResponseEntity<ArrayList<Pedido>> obtenerPedidos(@RequestParam("correo") String correo) throws IOException
    {
        Cliente cliente= ClienteJson.obtenerClientes(correo).get(0);
        if (cliente.getPedidos().isEmpty())
            return new ResponseEntity<ArrayList<Pedido>>(cliente.getPedidos(),HttpStatus.BAD_REQUEST);
        else
        {
            ArrayList<Pedido> pedidos = cliente.getPedidos();
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

    @PostMapping("/editarPedido")
    public ResponseEntity<String> editarPedido(@RequestParam("id") int id, @RequestParam("correo") String correo, @RequestBody ArrayList<Design> Design) throws IOException
    {
        if (Design.isEmpty())
            return new ResponseEntity<String>("No se pueden cargar pedidos sin diseños", HttpStatus.BAD_REQUEST);
        {
            Cliente cliente = ClienteJson.obtenerClientes(correo).get(0);
            ClienteJson.eliminarCliente(correo);
            Pedido pedido = PedidoJson.obtenerPedidos(id).get(0);
            PedidoJson.eliminarPedido(id, 0);
            ArrayList<Pedido> nuevaListaPedidos = cliente.getPedidos();
            nuevaListaPedidos.removeIf(pedidos -> pedidos.getId() == id);
            ArrayList<Design> designsCliente = cliente.getDesigns();
            ArrayList<Design> designsPedidos = new ArrayList<Design>();
            ArrayList<Design> design = Design;
            for (int i=0; i<design.size(); i++)
            {
                for (int j=0; j<designsCliente.size(); j++)
                {
                    Design aComparar = design.get(i);
                    Design temporal = designsCliente.get(j);
                    if(Objects.equals(temporal.getNombre(), aComparar.getNombre()))
                    {
                        designsPedidos.add(temporal);
                    }
                }
            }
            pedido.setDisenos(designsPedidos);
            nuevaListaPedidos.add(pedido);
            cliente.setPedidos(nuevaListaPedidos);
            PedidoJson.guardarPedido(pedido);
            ClienteJson.guardarCliente(cliente);
            return new ResponseEntity<String>("Pedido editado exitosamente", HttpStatus.OK);
        }
    }

    @GetMapping("/editarPerfilCliente")
    public ResponseEntity<String> editarPerfilCliente(@RequestParam("correo") String correo, @RequestParam("contrasena") String contrasena,@RequestParam("nombre") String nombre, @RequestParam("numeroTelefonico") String numeroTelefonico) throws IOException
    {
        Cliente cliente = new Cliente();
        cliente.editarPerfilCliente(correo, contrasena, nombre, numeroTelefonico);
        return new ResponseEntity<String>("Perfil editado exitosamente", HttpStatus.OK);
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

