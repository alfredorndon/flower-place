package com.proyecto.demo.Model;

import java.util.ArrayList;

public abstract class Persona {
    private String correo;
    private String contrasena;
    private String nombre;
    private String numeroTelefonico;

    public String getNumeroTelefonico() {
        return numeroTelefonico;
    }

    public void setNumeroTelefonico(String numeroTelefonico) {
        this.numeroTelefonico = numeroTelefonico;
    }

    //Contructor
    public Persona(String correo, String contrasena, String nombre, String numeroTelefonico) {
        this.correo = correo;
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.numeroTelefonico = numeroTelefonico;
    }

    //Getters and setters
    public String getCorreo()
    {
        return correo;
    }

    public void setCorreo(String correo)
    {
        this.correo = correo;
    }

    public String getContrasena()
    {
        return contrasena;
    }

    public void setContrasena(String contrasena)
    {
        this.contrasena = contrasena;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public abstract boolean verificarCorreo(String correo);
    public abstract boolean verificarContra(String contrasena);
}
