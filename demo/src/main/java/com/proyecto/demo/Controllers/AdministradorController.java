package com.proyecto.demo.Controllers;

import com.proyecto.demo.Model.*;
import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.DesignJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping ("/admin")
public class AdministradorController {

    DesignJson designs = new DesignJson(new ArrayList<Producto>(), "", 0);
    PedidoJson pedidos = new PedidoJson(new ArrayList<Design>(), "", 0, "");
    public AdministradorController() {}

    @CrossOrigin("http://127.0.0.1:5500/view/index.html")
    @PostMapping("/login")
    public ResponseEntity<DatosPersona> login(@RequestBody DatosPersona datosPersona) {
        datosPersona= datosPersona.ObtenerDatos(datosPersona.getCorreo(), datosPersona.getContra());
        return new ResponseEntity<>(datosPersona, HttpStatus.OK);
    }
    @PostMapping("/registro")
    public void registro(@RequestBody Cliente cliente) {

        ClienteJson.guardarCliente(cliente);
    }
}
