package com.proyecto.demo.Controllers;


import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Producto;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    public ClienteController() {}

    @GetMapping("/Productos")
    public ArrayList<Producto> obtenerProductos(){
        return ProductoJson.obtenerProductosTotales();
    }

}
