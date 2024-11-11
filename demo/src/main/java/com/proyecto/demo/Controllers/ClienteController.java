package com.proyecto.demo.Controllers;


import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Cliente;
import com.proyecto.demo.Model.Design;
import com.proyecto.demo.Model.Producto;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    public ClienteController() {}

    @PostMapping("/crearDesign")
    public ResponseEntity<String> crearDesign(@RequestBody Cliente cliente){
        if (!cliente.validarDesign(cliente))
        {
            return new ResponseEntity<String>("Diseño agregado", HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Diseño existente", HttpStatus.BAD_REQUEST);
    }


}
