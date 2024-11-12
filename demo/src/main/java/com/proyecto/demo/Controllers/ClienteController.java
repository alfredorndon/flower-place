package com.proyecto.demo.Controllers;


import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Cliente;
import com.proyecto.demo.Model.Design;
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
}
