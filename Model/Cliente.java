package com.proyecto.ingenieriasoftware.ucab.Model;

import com.proyecto.ingenieriasoftware.ucab.manejador.JSON.ProductoJson;
import com.proyecto.ingenieriasoftware.ucab.manejador.JSON.ClienteJson;
import com.proyecto.ingenieriasoftware.ucab.manejador.JSON.PedidoJson;
import java.util.ArrayList;

public class Cliente extends Persona {
    private ArrayList<Design> designs;
    private ArrayList<Pedido> pedidos;
    private ArrayList<Producto> productos;

    //Constructor
    public Cliente(String correo, String contrasena, String nombre, String numeroTelefonico, ArrayList<Design> designs, ArrayList<Pedido> pedidos) {
        super(correo, contrasena, nombre, numeroTelefonico);
        this.designs =obtenerCliente(correo).designs;
        this.productos= ProductoJson.obtenerProductosTotales();
        this.pedidos=obtenerCliente(correo).pedidos;
        if (designs==null)
            designs=new ArrayList<Design>();
        if (productos==null)
            productos=new ArrayList<Producto>();
        if (pedidos==null)
            pedidos=new ArrayList<Pedido>();
    }
    public Cliente(String correo, String contrasena, String nombre, String numeroTelefonico)
    {
        super(correo, contrasena, nombre, numeroTelefonico);
        this.designs =new ArrayList<Design>();
        this.pedidos=new ArrayList<Pedido>();
        this.productos=new ArrayList<Producto>();
    }

    //Getters and setters
    public ArrayList<Design> getDiseños(String correo) {
        this.designs =obtenerCliente(correo).designs;
        return designs;
    }

    public ArrayList<Producto> getProductos()
    {
        this.productos= ProductoJson.obtenerProductosTotales();
        return productos;
    }

    public void setDiseños(ArrayList<Design> designs)
    {
        this.designs = designs;
    }

    public ArrayList<Pedido> getPedidos(String correo)
    {
        this.pedidos=obtenerCliente(correo).pedidos;
        return pedidos;
    }

    public void setPedidos(ArrayList<Pedido> pedidos)
    {
        this.pedidos = pedidos;
    }

    public Cliente obtenerCliente(String correo)
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        Cliente clienteElegido= new Cliente("","","","");
        listaClientes=ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes=new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
                clienteElegido=listaClientes.get(i);
        }
        return clienteElegido;
    }

    @Override
    public boolean verificarCorreo(String correo)
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        boolean clienteObtenido= false;
        listaClientes=ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes=new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
                clienteObtenido=true;
        }
        return clienteObtenido;
    }
    @Override
    public boolean verificarContra(String contrasena)
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        boolean clienteObtenido= false;
        listaClientes=ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes=new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getContrasena().equals(contrasena))
                clienteObtenido=true;
        }
        return clienteObtenido;
    }

    public boolean verificarTelefono(String telefono)
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        boolean clienteObtenido= false;
        listaClientes=ClienteJson.obtenerClientesTotales();
            if (listaClientes==null)
                listaClientes = new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getNumeroTelefonico().equals(telefono))
                clienteObtenido=true;
        }
        return clienteObtenido;
    }
    public void registrarCliente(String correo, String contraseña, String nombre, String numeroTelefonico )
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        listaClientes=ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes=new ArrayList<Cliente>();
        Cliente clienteNuevo= new Cliente(correo,contraseña,nombre, numeroTelefonico);
        listaClientes.add(clienteNuevo);
        ClienteJson.guardarCliente(clienteNuevo);
    }
    public void agregarDiseno(String nombre, float precio, ArrayList<Producto> productos)
    {
        this.designs.add(new Design(productos,nombre,precio));
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes = new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {

        }
    }

    public boolean validarDiseno(String nombre)
    {
        boolean disenoValidado=true;
        for (int i = 0; i< designs.size(); i++)
        {
            if(designs.get(i).getNombre().equalsIgnoreCase(nombre))
                disenoValidado=false;
        }
        return disenoValidado;
    }

    public void actualizarProductosTotales()
    {
        ArrayList<Producto> productosTotales=ProductoJson.obtenerProductosTotales();
        if (productosTotales==null)
            productosTotales=new ArrayList<Producto>();
        for (int i = 0; i< designs.size(); i++)
        {
           for (int j = 0; j< designs.get(i).getProductos().size(); j++)
           {
                   for(int k=0;k<productosTotales.size();k++)
                   {
                       if (productosTotales.get(k).getNombre()== designs.get(i).getProductos().get(j).getNombre())
                       {
                           productosTotales.get(k).setCantidad(productosTotales.get(k).getCantidad()- designs.get(i).getProductos().get(j).getCantidad());
                           if (productosTotales.get(k).getCantidad()<0)
                           {
                               productosTotales.get(k).setCantidad(0);
                           }
                       }
                   }
           }
        }
        for (int i=0;i<productosTotales.size();i++)
        {
            ProductoJson.guardarProducto(productosTotales.get(i));
        }
    }


    public void agregarPedido(ArrayList<Design> designs, String estado)
    {
        ArrayList<Pedido> pedidos=obtenerCliente(this.getCorreo()).pedidos;
        int id=pedidos.size()+1;
        this.actualizarProductosTotales();
        this.pedidos.add(new Pedido(designs, estado, id, this.getCorreo()));
        //ClienteJson.editarCliente(this.getCorreo(),pedidos);
        PedidoJson.guardarPedido(new Pedido(designs, estado, id, this.getCorreo()));
    }

    public boolean verificarDatos(String correo, String contrasena)
    {
        boolean clienteObtenido=false;
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
        listaClientes=new ArrayList<Cliente>();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                if (listaClientes.get(i).getContrasena().equals(contrasena))
                    clienteObtenido=true;
            }
        }
        return clienteObtenido;
    }
}

