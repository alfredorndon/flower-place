package com.proyecto.demo.Model;

public class DatosPersona {

    String correo;
    String contra;

    public DatosPersona(String correo, String contra) {
        this.correo = correo;
        this.contra = contra;
    }


    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContra() {
        return contra;
    }

    public void setContra(String contra) {
        this.contra = contra;
    }

    public DatosPersona ObtenerDatos(String correo, String contrasena)
    {
        Administrador administrador= new Administrador(1);
        Cliente cliente= new Cliente(correo,contrasena,"","");
        if (administrador.verificarDatos(correo, contrasena))
            return this;
        else if (cliente.verificarDatos(correo, contrasena))
            return this;
        else
            return null;
    }
}

