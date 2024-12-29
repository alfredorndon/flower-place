package com.proyecto.demo.Model;

public class DatosPersona {

    String correo;
    String contra;

    public DatosPersona(String correo, String contra) {
        this.correo = correo;
        this.contra = contra;
    }

    public DatosPersona()
    {
        this.correo = "";
        this.contra = "";
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

    public boolean validarDatosLogIn (String correo, String contrasena)
    {
        Cliente cliente= new Cliente(correo,contrasena,"","");
        Administrador admin= new Administrador();
        if (correo.equals("admin@gmail.com") && contrasena.equals(admin.getContrasena()))
            return true;
        else if (cliente.verificarDatos(correo, contrasena))
            return true;
        else
            return false;
    }
}

