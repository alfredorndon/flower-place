package com.proyecto.demo.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;
import java.util.HashMap;
@RestController
public class perfilController {

    @GetMapping("/prueba")
    public String prueba (){
        return "prueba";
    }

    }

