package com.proyecto.demo.ManejadorJSON;

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
import com.proyecto.demo.Model.Design;
import com.proyecto.demo.Model.Producto;

public class DesignJson extends Design {
    public DesignJson(ArrayList<Producto> productos, String nombre, float precio) {
        super(productos, nombre, precio);
    }

    //PARA MANEJO DE ARCHIVOS
    //Para extraer informacion del Json
    static public List<Design> obtenerDesigns(String nombreDesign) { //Recibe el atributo identificador de la clase
        try {
            Gson gson = new Gson();
            Object FilePath;
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\alfre\\Documents\\flower-place\\demo\\src\\main\\java\\com\\proyecto\\demo\\Json\\design.json"));
            Design[] designs = gson.fromJson(reader, Design[].class);
            List<Design> designLista = new ArrayList<>(Arrays.asList(designs));
            List<Design> nuevaLista = new ArrayList<>();

            for (Design design : designLista) {
                if (design.getNombre().equals(nombreDesign)) {
                    nuevaLista.add(design);
                }
            }
            return nuevaLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    //Para guardar un objeto en la lista del objeto en json
    static public void guardarDesign (Design design) { //Le paso el objeto que quiero guardar en la lista del json
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\alfre\\Documents\\flower-place\\demo\\src\\main\\java\\com\\proyecto\\demo\\Json\\design.json"));
            Design[] designs = gson.fromJson(reader, Design[].class);
            List<Design> designLista= new ArrayList<>(Arrays.asList(designs));

            designLista.add(design);

            FileWriter fw = new FileWriter("C:\\Users\\alfre\\Documents\\flower-place\\demo\\src\\main\\java\\com\\proyecto\\demo\\Json\\design.json");
            StringWriter sw = new StringWriter();
            sw.write(gson.toJson(designLista));
            fw.write(sw.toString());
            fw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //Para Eliminar un objeto especifico de la lista
    public static void eliminarDesign(String nombreDesign) throws IOException {
        // Leer el JSON existente
        Gson gson = new Gson();
        List<Design> designs = gson.fromJson(new FileReader("C:\\Users\\alfre\\Documents\\flower-place\\demo\\src\\main\\java\\com\\proyecto\\demo\\Json\\design.json"), new TypeToken<List<Design>>() {}.getType());

        // Eliminar el producto
        List<Design> designsActualizados = new ArrayList<>();
        for (Design design : designs) {
            if (!design.getNombre().equalsIgnoreCase(nombreDesign)) {
                designsActualizados.add(design);
            }
        }

        // Escribir el JSON actualizado
        try (FileWriter writer = new FileWriter("C:\\Users\\alfre\\Documents\\flower-place\\demo\\src\\main\\java\\com\\proyecto\\demo\\Json\\design.json")) {
            gson.toJson(designsActualizados, writer);
        }
    }
}
