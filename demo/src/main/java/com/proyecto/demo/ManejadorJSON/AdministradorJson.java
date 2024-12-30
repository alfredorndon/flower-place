package com.proyecto.demo.ManejadorJSON;

import com.proyecto.demo.Model.Administrador;
import com.proyecto.demo.Model.Pedido;
import com.proyecto.demo.Model.Producto;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;


/*public class AdministradorJson extends Administrador {
    public AdministradorJson() {
        super(1);
    }   
}*/

    public class AdministradorJson extends Administrador {
        public AdministradorJson(String correo, String contrasena, String nombre, String numeroTelefonico, ArrayList<Producto> productos, ArrayList<Pedido> pedidos) {
            super(1);
        }

    //PARA MANEJO DE ARCHIVOS
    //Para extraer informacion del Json
    static public List<Administrador> obtenerAdmin(String correoAdmin) { //Recibe el atributo identificador de la clase
        try {
            Gson gson = new Gson();
            Object FilePath;
            JsonReader reader = new JsonReader(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json")); 
            Administrador[] administradores = gson.fromJson(reader, Administrador[].class);
            List<Administrador> administradorLista = new ArrayList<>(Arrays.asList(administradores));
            List<Administrador> nuevaLista = new ArrayList<>();

            for (Administrador administrador : administradorLista) {
                if (administrador.getCorreo().equals(correoAdmin)) {
                    nuevaLista.add(administrador);
                }
            }
            return nuevaLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    //Para extraer la lista completa
    static public ArrayList<Administrador> obtenerAdministradoresTotales() {
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json"));
            Administrador[] administradores = gson.fromJson(reader, Administrador[].class);
            
            if (administradores == null || administradores.length == 0) {
                return new ArrayList<>(); // Retorna un ArrayList vacío
            }
            ArrayList<Administrador> administradoresLista = new ArrayList<>(Arrays.asList(administradores));

            return administradoresLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }

    //Para guardar un objeto en la lista del objeto en json
    static public void guardarAdministrador(Administrador administrador) { //Le paso el objeto que quiero guardar en la lista del json
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("src//main//java//com//proyecto//demo//Json//administrador.json"));
            Administrador[] administradores = gson.fromJson(reader, Administrador[].class);
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
    }

    //Para Eliminar un objeto especifico de la lista
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

}

