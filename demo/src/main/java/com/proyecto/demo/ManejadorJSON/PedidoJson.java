package com.proyecto.demo.ManejadorJSON;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.proyecto.demo.Model.Design;
import com.proyecto.demo.Model.Pedido;
import com.proyecto.demo.Model.Producto;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PedidoJson extends Pedido {

    public PedidoJson(ArrayList<Design> designs, String estado, int id, String correo) {
        super(designs, estado, id, correo);
    }

    //PARA MANEJO DE ARCHIVOS

    //Para extraer informacion del Json por un campo especifico
    static public List<Pedido> obtenerPedidos (int idPedido) { //Recibe el atributo identificador de la clase
        try {
            Gson gson = new Gson();
            Object FilePath;
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\pedido.json"));
            Pedido[] pedidos = gson.fromJson(reader, Pedido[].class);
            List<Pedido> pedidoLista = new ArrayList<>(Arrays.asList(pedidos));
            List<Pedido> nuevaLista = new ArrayList<>();

            for (Pedido pedido : pedidoLista) {
                if (pedido.getId()==idPedido) {
                    nuevaLista.add(pedido);
                }
            }
            return nuevaLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    //Para extraer la lista completa
    static public ArrayList<Pedido> obtenerPedidosTotales() {
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\pedido.json"));
            Pedido[] pedidos = gson.fromJson(reader, Pedido[].class);
            if (pedidos == null || pedidos.length == 0) {
                return new ArrayList<>(); // Retorna un ArrayList vacío
            }
            ArrayList<Pedido> pedidosLista = new ArrayList<>(Arrays.asList(pedidos));
            return pedidosLista;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }

    //Para guardar un objeto en la lista del objeto en json
    static public void guardarPedido(Pedido pedido) { //Le paso el objeto que quiero guardar en la lista del json
        try {
            Gson gson = new Gson();
            JsonReader reader = new JsonReader(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\pedido.json"));
            Pedido[] pedidos = gson.fromJson(reader, Pedido[].class);
            List<Pedido> pedidoLista= new ArrayList<>(Arrays.asList(pedidos));

            pedidoLista.add(pedido);

            FileWriter fw = new FileWriter("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\pedido.json");
            StringWriter sw = new StringWriter();
            sw.write(gson.toJson(pedidoLista));
            fw.write(sw.toString());
            fw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //Para Eliminar un objeto especifico de la lista
    public static void eliminarPedido(int idPedido) throws IOException {
        // Leer el JSON existente
        Gson gson = new Gson();
        List<Pedido> pedidos = gson.fromJson(new FileReader("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json"), new TypeToken<List<Producto>>() {}.getType());

        // Eliminar el producto
        List<Pedido> pedidosActualizados = new ArrayList<>();
        for (Pedido pedido : pedidos) {
            if (pedido.getId() != idPedido) {
                pedidosActualizados.add(pedido);
            }
        }

        // Escribir el JSON actualizado
        try (FileWriter writer = new FileWriter("C:\\Users\\MGI\\Downloads\\springboot-backend-proyect2\\src\\main\\java\\com\\proyecto\\ingenieriasoftware\\ucab\\Json\\producto.json")) {
            gson.toJson(pedidosActualizados, writer);
        }
    }

}
