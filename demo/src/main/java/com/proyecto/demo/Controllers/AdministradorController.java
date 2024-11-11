package com.proyecto.demo.Controllers;

import com.proyecto.demo.Model.*;
import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.DesignJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.proyecto.demo.Model.Cliente;

import java.util.ArrayList;
@RestController
@RequestMapping ("/admin")
public class AdministradorController {

    DesignJson designs = new DesignJson(new ArrayList<Producto>(), "", 0);
    PedidoJson pedidos = new PedidoJson(new ArrayList<Design>(), "", 0, "");
    public AdministradorController() {}

    @PostMapping("/login")
    public ResponseEntity<DatosPersona> login(@RequestBody DatosPersona datosPersona) {
        datosPersona= datosPersona.ObtenerDatos(datosPersona.getCorreo(), datosPersona.getContra());
        return new ResponseEntity<DatosPersona>(datosPersona, HttpStatus.OK);
    }
    @PostMapping("/registro")
    public ResponseEntity<String> registro (@RequestBody Cliente cliente) {
        if(!cliente.verificarCorreo(cliente.getCorreo()))
        {
            cliente= new Cliente(cliente.getCorreo(),cliente.getContrasena(),cliente.getNombre(),cliente.getNumeroTelefonico());
            ClienteJson.guardarCliente(cliente);
            return new ResponseEntity<String>("Datos Ingresados",HttpStatus.OK);
        }
        else
        return new ResponseEntity<String>("Correo Repetido",HttpStatus.CONFLICT);
    }
}
