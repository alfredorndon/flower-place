package com.proyecto.demo.Model;

import java.util.ArrayList;

public class Pedido {
    private ArrayList<Design> designs;
    private String estado;
    private int id;
    private String correo;

    //Constructor
    public Pedido(ArrayList<Design> designs, String estado, int id, String correo) {
        this.designs = designs;
        this.estado = "Abierto";
        this.id = id;
        this.correo = correo;
    }

    public Pedido() 
    {
        designs= new ArrayList<Design>();
        estado="";
        id=0;
        correo="";
    }
    
    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    //Getters and setters
    public ArrayList<Design> getDisenos() {
        return designs;
    }

    public void setDisenos(ArrayList<Design> designs) {
        this.designs = designs;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
