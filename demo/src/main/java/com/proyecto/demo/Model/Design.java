package com.proyecto.demo.Model;

import java.util.ArrayList;

public class Design {
    private ArrayList<Producto> productos ;
    private String nombre;
    private float precio;

   //Constructor
    public Design(ArrayList<Producto> productos, String nombre, float precio) {
        this.productos = productos;
        this.nombre = nombre;
        this.precio = precio;
    }

    //Getters and setters
    public ArrayList<Producto> getProductos()
    {
        return productos;
    }

    public void setProductos(ArrayList<Producto> productos)
    {
        this.productos = productos;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public float getPrecio()
    {
        return precio;
    }

    public void setPrecio(float precio)
    {
        this.precio = precio;
    }

}
