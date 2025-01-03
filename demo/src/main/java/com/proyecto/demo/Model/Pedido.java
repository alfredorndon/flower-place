package com.proyecto.demo.Model;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    private static final Logger logger = LoggerFactory.getLogger(Pedido.class);

    public void mostrarPedido ()
    {
        for (int i=0; i<designs.size(); i++)
        {
            ArrayList<Producto> productos = designs.get(i).getProductos();
            for (int j=0; j<productos.size(); j++)
            {
                logger.info(productos.get(j).getNombre());
                logger.info(" ");
            }
        }
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
