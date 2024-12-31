package com.proyecto.demo.ManejadorJSON;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.JsonReader;
import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Pedido;
import com.proyecto.demo.Model.Producto;


/*public class AdministradorJson extends Administrador {
    public AdministradorJson() {
        super(1);
    }   
}*/

    public class AdministradorJson extends Administrador {
        public AdministradorJson(String correo, String contrasena, String nombre, String numeroTelefonico, ArrayList<Producto> productos, ArrayList<Pedido> pedidos) {
            super(1);
        }

   //Para este objeto solo es necesario extraccion completa, y no por campo pues solo hay un objeto, no es una lista 

    ////////PRUEBA (Nueva)
    /*  public static Administrador obtenerAdministrador() throws Exception {
        // Leemos el archivo JSON
        FileReader reader = new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json");
        Gson gson = new Gson();

        try {
            // Intentamos convertir el JSON a un objeto Administrador
            Administrador administrador = gson.fromJson(reader, Administrador.class);
            return administrador;
        } catch (JsonSyntaxException e) {
            // Si se lanza una excepción de sintaxis, es probable que el archivo esté vacío o tenga un formato incorrecto
            System.err.println("El archivo JSON está vacío o tiene un formato inválido.");
            return null;
        } finally {
            reader.close();
        }
    }*/

    //Funcion usando la funcion base 
    //Para extraer el objeto Admin del JSON
    static public Administrador obtenerAdmin() throws IOException {
        Gson gson = new Gson();
        JsonReader reader = new JsonReader(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json"));
        try { //Primero tomamos en cuenta que el archivo si contenga un Admin
        
            Administrador administrador = gson.fromJson(reader, Administrador.class);
            reader.close();  
            return administrador;
        } catch (JsonSyntaxException e) { //Si no es asi, lanza una excepcion por el error
            // Esta es una excepción de sintaxis, lo que indica que es probable que el archivo esté vacío o tenga un formato incorrecto
            System.err.println("El archivo JSON está vacío o tiene un formato inválido");
            reader.close();
            return null;
        }
    }

    //Para guardar un objeto en json (Original)
   /* static public void guardarAdministrador(Administrador administrador) { //Le paso el objeto que quiero guardar en el json
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json"));
            Administrador administradores = gson.fromJson(reader, Administrador[].class);
            List<Administrador> administradorLista= new ArrayList<>(Arrays.asList(administradores));

            administradorLista.add(administrador);

            FileWriter fw = new FileWriter("src//main//java//com//proyecto//demo//Json//administrador.json");
            StringWriter sw = new StringWriter();
            sw.write(gson.toJson(administradorLista));
            fw.write(sw.toString());
            fw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/


    //Para guardar un objeto en json 
    public static void guardarAdministrador(Administrador administrador) throws IOException { //Se le pasa el objeto que deseo guardar
        // Validar si el archivo existe y está vacío
        File archivo = new File("src//main//java//com//proyecto//demo//Json//administrador.json");
        if (archivo.exists() && archivo.length() > 0) {
            throw new IOException("El archivo JSON ya contiene datos, y solo puede tener un Administrador");
        }

        Gson gson = new Gson();
        String json = gson.toJson(administrador);

        // Sobrescribimos el archivo JSON existente
        FileWriter writer = new FileWriter("src//main//java//com//proyecto//demo//Json//administrador.json");
        writer.write(json);
        writer.close();
    }

    /* 
    //Para Eliminar un objeto especifico de la lista (Original)
    public static void eliminarAdministrador(String correoAdmin) throws IOException {
        // Leer el JSON existente
        Gson gson = new Gson();
        List<Administrador> administradores = gson.fromJson(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json"), new TypeToken<List<Administrador>>() {}.getType());

        // Eliminar el producto
        List<Administrador> administradoresActualizados = new ArrayList<>();
        for (Administrador administrador : administradores) {
            if (!administrador.getCorreo().equalsIgnoreCase(correoAdmin)) {
                administradoresActualizados.add(administrador);
            }
        }

        // Escribir el JSON actualizado
        try (FileWriter writer = new FileWriter("src//main//java//com//proyecto//demo//Json//administrador.json")) {
            gson.toJson(administradoresActualizados, writer);
        }
    } 
*/

    
    //Para Eliminar un objeto admin del JSON
    public static void eliminarAdministrador() throws IOException {
        // Validar si el archivo existe y tiene contenido (Para poder eliminar el admin, debe tener informacion el archivo)
        File archivo = new File("src//main//java//com//proyecto//demo//Json//administrador.json");
        if (!archivo.exists() || archivo.length() == 0) { //Si no lo encuentra o esta vacio 
            throw new IOException("El archivo JSON no existe o está vacío.");
        }

        // Sobreescribir el archivo con una cadena vacía
        FileWriter writer = new FileWriter(archivo, false); // false para sobrescribir
        writer.write("");
        writer.close();
    } 
    
}