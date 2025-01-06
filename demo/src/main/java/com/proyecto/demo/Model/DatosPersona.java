package com.proyecto.demo.Model;

public class DatosPersona {

    String correo;
    String contrasena;

    public DatosPersona(String correo, String contrasena) {
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public DatosPersona()
    {
        this.correo = "";
        this.contrasena = "";
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public boolean validarDatosLogIn (String correo, String contrasena)
    {
        Cliente cliente= new Cliente(correo,contrasena,"","");
        Administrador admin= new Administrador(); //quitar
        if (correo.equals("admin@gmail.com") && contrasena.equals(admin.getContrasena()))
            return true;
        else if (cliente.verificarDatos(correo, contrasena))
            return true;
        else
            return false;
    }
}

