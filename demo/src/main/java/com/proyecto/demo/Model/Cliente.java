package com.proyecto.demo.Model;

import com.proyecto.demo.ManejadorJSON.ProductoJson;  
import com.fasterxml.jackson.annotation.JsonInclude;
import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;

import java.io.IOException;
import java.util.ArrayList;


public class Cliente extends Persona {
    private ArrayList<Design> designs;
    private ArrayList<Pedido> pedidos;

    //Constructor
    public Cliente(String correo, String contrasena, String nombre, String numeroTelefonico, ArrayList<Design> designs, ArrayList<Pedido> pedidos) {
        super(correo, contrasena, nombre, numeroTelefonico);
        this.designs =obtenerCliente(correo).designs;
        this.pedidos=obtenerCliente(correo).pedidos;
        if (designs==null)
            designs=new ArrayList<Design>();
        if (pedidos==null)
            pedidos=new ArrayList<Pedido>();
    }
    public Cliente(String correo, String contrasena, String nombre, String numeroTelefonico)
    {
        super(correo, contrasena, nombre, numeroTelefonico);
        this.designs =new ArrayList<Design>();
        this.pedidos=new ArrayList<Pedido>();
    }
    public Cliente()
    {
        super("","","","");
        this.designs =new ArrayList<Design>();
        this.pedidos=new ArrayList<Pedido>();
    }

    //Getters and setters
    public ArrayList<Design> getDesigns(String correo) {
        this.designs =obtenerCliente(correo).designs;
        if (designs==null)
            designs=new ArrayList<Design>();
        return designs;
    }
    public ArrayList<Design> getDesigns()
    {
        return this.designs;
    }

    public void setDiseños(ArrayList<Design> designs)
    {
        this.designs = designs;
    }

    public ArrayList<Pedido> getPedidos(String correo)
    {
        this.pedidos=obtenerCliente(correo).pedidos;
        if (pedidos==null)
        pedidos=new ArrayList<Pedido>();
        return pedidos;
    }
    public ArrayList<Pedido> getPedidos()
    {
        return this.pedidos;
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
        ArrayList<Cliente> listaClientes=ClienteJson.obtenerClientesTotales();
        boolean clienteObtenido= false;
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
    public void registrarCliente(String correo, String contrasena, String nombre, String numeroTelefonico )
    {
        ArrayList<Cliente> listaClientes = new ArrayList<Cliente>();
        listaClientes=ClienteJson.obtenerClientesTotales();
        if (listaClientes==null)
            listaClientes=new ArrayList<Cliente>();
        Cliente clienteNuevo= new Cliente(correo,contrasena,nombre, numeroTelefonico);
        listaClientes.add(clienteNuevo);
        ClienteJson.guardarCliente(clienteNuevo);
    }


    public void actualizarProductosTotales() throws IOException
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
                        ProductoJson.eliminarProducto(productosTotales.get(k).getNombre());
                        ProductoJson.guardarProducto(productosTotales.get(k));
                    }
                }
            }
        }
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

    public boolean validarDesign(Design design , String correo)
    {
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        boolean designValidado=false;
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                clienteActual=listaClientes.get(i);
            }
        }
        for (int j=0;j<clienteActual.designs.size();j++)
        {
            if (design.getNombre().equals(clienteActual.designs.get(j).getNombre()))
            {
                designValidado=true;
            }
        }
        for (int k=0;k<design.getProductos().size();k++)
        {
            if (design.getProductos().get(k).getCantidad()<=0 || design.getProductos().get(k).getCantidad()>20)
            {
                designValidado=true;
            }
        }
        return designValidado;
    }
    public void agregarDiseno(Design design , String correo) throws IOException
    {
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                clienteActual=listaClientes.get(i);
                ClienteJson.eliminarCliente(correo);
            }
        }
                clienteActual.designs.add(design);
                ClienteJson.guardarCliente(clienteActual);
    }

    public void agregarPedido(Pedido pedido , String correo) throws IOException
    {
        ArrayList<Pedido> pedidosTotales=PedidoJson.obtenerPedidosTotales();
        pedido.setId((pedidosTotales.size())+1);
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                clienteActual=listaClientes.get(i);
                ClienteJson.eliminarCliente(correo);
            }
        }
                clienteActual.pedidos.add(pedido);
                ClienteJson.guardarCliente(clienteActual);
    }

    public boolean validarPedido(Pedido pedido , String correo)
    {
        
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        boolean pedidoValidado=false;
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                clienteActual=listaClientes.get(i);
            }
        }
        for (int j=0;j<clienteActual.pedidos.size();j++)
        {
            if (pedido.getId() == clienteActual.pedidos.get(j).getId())
            {
                pedidoValidado=true;
            }
        }
        return pedidoValidado;
    }

    public void editarPerfilCliente(String correo, String contrasena, String nombre, String numeroTelefonico ) throws IOException
    {
        Cliente clienteActual= new Cliente();
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();

        for (int i=0; i<listaClientes.size(); i++)
        {
            if (correo.equals(listaClientes.get(i).getCorreo()))
            {
                clienteActual= listaClientes.get(i);
                clienteActual.setContrasena(contrasena);
                clienteActual.setNombre(nombre);
                clienteActual.setNumeroTelefonico(numeroTelefonico);
                ClienteJson.eliminarCliente(correo);
                ClienteJson.guardarCliente(clienteActual);
            }
        }
    }

    // public boolean verificarNumeroTelefonico(String correo, String numeroTelefonico)
    // {
    //     ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
    //     int contador=0;
    //     for (int i=0; i<listaClientes.size(); i++)
    //     {
    //         if (listaClientes.get(i).getNumeroTelefonico().equals(numeroTelefonico) && !listaClientes.get(i).getCorreo().equals(correo))
    //         contador++;
    //     }
    //     if (contador!=0 || AdministradorJson.obtenerAdmin().getNumeroTelefonico().equals(numeroTelefonico))
    //     return false;
    //     else
    //     return true;
    // }

    public void eliminarDesign (String correo, String nombreDesign) throws IOException
    {
                for (int j=0; j<this.getDesigns().size(); j++)
                {
                    if (this.getDesigns().get(j).getNombre().equals(nombreDesign))
                    {
                        this.getDesigns().remove(j);
                        ClienteJson.eliminarCliente(correo);
                        ClienteJson.guardarCliente(this);
                    }
                }
    }

}

