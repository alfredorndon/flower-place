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
        this.designs = obtenerCliente(correo).designs;
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


    public boolean actualizarProductosTotales(Pedido pedido) throws IOException
    {
        ArrayList<Producto> productosTotales=ProductoJson.obtenerProductosTotales();
        if (productosTotales==null)
            productosTotales=new ArrayList<Producto>();
        ArrayList<Design> designs = pedido.getDisenos();
        for (int i = 0; i< designs.size(); i++)
        {
            ArrayList<Producto> productosDesign = designs.get(i).getProductos();
            for (int j = 0; j< productosDesign.size(); j++)
            {
                for(int k=0;k<productosTotales.size();k++)
                {
                    if (productosTotales.get(k).getNombre().equals(productosDesign.get(j).getNombre()))
                    {
                        Producto producto = productosTotales.get(k);
                        Producto productoDesing = productosDesign.get(j);
                        int diferencia = producto.getCantidad() - productoDesing.getCantidad();
                        if (diferencia<0)
                            return false;
                        else
                        {   
                            producto.setCantidad(diferencia);
                            ProductoJson.eliminarProducto(producto.getNombre());
                            ProductoJson.guardarProducto(producto);
                        }
                    }
                }
            }
        }
        return true;
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
        if (design.getNombre() == null || design.getNombre().trim().isEmpty())
            designValidado = true;
        else
        {
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
            int cantidadTotal=0;
            for (int k=0;k<design.getProductos().size();k++)
            {
                cantidadTotal+=design.getProductos().get(k).getCantidad();
                if (design.getProductos().get(k).getCantidad()<=0 || cantidadTotal>20)
                {
                    designValidado=true;
                }
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
        PedidoJson.guardarPedido(pedido);
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                clienteActual=listaClientes.get(i);
                ClienteJson.eliminarCliente(correo);
                clienteActual.pedidos.add(pedido);
                ClienteJson.guardarCliente(clienteActual);
            }
        }
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

    public boolean verificarNumeroTelefonico(String correo, String numeroTelefonico) throws IOException
    {
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        int contador=0;
        for (int i=0; i<listaClientes.size(); i++)
        {
            if (listaClientes.get(i).getNumeroTelefonico().equals(numeroTelefonico) && !listaClientes.get(i).getCorreo().equals(correo))
            contador++;
        }
        if (contador!=0 || AdministradorJson.obtenerAdmin().getNumeroTelefonico().equals(numeroTelefonico))
            return false;
        else
            return true;
    }

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

    public void modificarDesign (String correo, Design design) throws IOException
    {
        for (int i=0; i<this.getDesigns().size(); i++)
        {
            if (this.getDesigns().get(i).getNombre().equals(design.getNombre()))
            {
                this.getDesigns().remove(i);
                this.getDesigns().add(design);
                ClienteJson.eliminarCliente(correo);
                ClienteJson.guardarCliente(this);
            }
        }
    }

    public boolean validarDesignModificado(Design design , String correo)
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
        int cantidadTotal=0;
        for (int k=0;k<design.getProductos().size();k++)
        {
            cantidadTotal+=design.getProductos().get(k).getCantidad();
            if (design.getProductos().get(k).getCantidad()<=0 || cantidadTotal>20)
            {
                designValidado=true;
            }
        }
        return designValidado;
    }
}