package com.proyecto.ingenieriasoftware.ucab.manejador.JSON;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.proyecto.ingenieriasoftware.ucab.Model.Producto;


import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.google.gson.reflect.TypeToken;


public class ProductoJson extends Producto {
    public ProductoJson(String nombre, float precio, int cantidad) {
        super(nombre, precio, cantidad);
    }

    //FUNCIONES PARA ARCHIVOS

    //Para extraer informacion del Json buscando por un campo
    static public ArrayList<Producto> obtenerProductos (String nombreProducto) {
        try {
            Gson gson = new Gson();
            Object FilePath;
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json"));
            Producto[] productos = gson.fromJson(reader, Producto[].class);
            ArrayList<Producto> productoLista = new ArrayList<>(Arrays.asList(productos));
            ArrayList<Producto> nuevaLista = new ArrayList<Producto>();

            for (Producto producto : productoLista) {
                if (producto.getNombre().equals(nombreProducto)) {
                    nuevaLista.add(producto);
                }
            }

           /* for (Producto producto : nuevaLista) {
                System.out.println("Nombre: " + producto.getNombre());
                System.out.println("Precio: " + producto.getPrecio());
                System.out.println("Cantidad:" + producto.getCantidad());

            }*/
            return nuevaLista;


        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    //Para extraer la lista completa
    static public ArrayList<Producto> obtenerProductosTotales() {
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json"));
            Producto[] productos = gson.fromJson(reader, Producto[].class);
            ArrayList   <Producto> productosLista = new ArrayList<>(Arrays.asList(productos));
           /* for (Producto producto : productosLista) {
                System.out.println("    Nombre del producto: " + producto.getNombre());
                System.out.println("    Precio del producto: " + producto.getPrecio());
                System.out.println("Cantidad: " + producto.getCantidad());
            }*/

            return productosLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }

    //Para guardar un objeto en la lista del objeto en json
    static public void guardarProducto(Producto producto) { //Le paso el objeto que quiero guardar en la lista del json
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json"));
            Producto[] productos = gson.fromJson(reader, Producto[].class);
            List<Producto> productoLista= new ArrayList<>(Arrays.asList(productos));

            productoLista.add(producto);

            FileWriter fw = new FileWriter("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json");
            StringWriter sw = new StringWriter();
            sw.write(gson.toJson(productoLista));
            fw.write(sw.toString());
            fw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}



