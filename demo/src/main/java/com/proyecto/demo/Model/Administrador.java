package com.proyecto.demo.Model;

import com.proyecto.demo.ManejadorJSON.AdministradorJson;
import com.proyecto.demo.ManejadorJSON.ClienteJson;
import com.proyecto.demo.ManejadorJSON.ProductoJson;
import com.proyecto.demo.ManejadorJSON.PedidoJson;

import java.io.IOException;
import java.util.ArrayList;

public class Administrador extends Persona {
    private ArrayList<Producto> productos;
    private ArrayList<Pedido>  pedidos;

    public Administrador() throws IOException {
        super("admin@gmail.com", AdministradorJson.obtenerAdmin().getContrasena(), AdministradorJson.obtenerAdmin().getNombre() ,AdministradorJson.obtenerAdmin().getNumeroTelefonico());
        this.productos=ProductoJson.obtenerProductosTotales();
        this.pedidos=PedidoJson.obtenerPedidosTotales();
        if (productos==null)
            productos=new ArrayList<Producto>();
        if (pedidos==null)
            pedidos=new ArrayList<Pedido>();
    }

    public Administrador(int confirmacion)
    {
        super("admin@gmail.com", "admnin1234", "Administrador" ,"04120998105");
        this.productos=new ArrayList<Producto>();
        this.pedidos=new ArrayList<Pedido>();
    }
    //Getters and setters
    public ArrayList<Producto> getProductos()
    {
        this.productos=ProductoJson.obtenerProductosTotales();
        return productos;
    }

    public ArrayList<Pedido> getPedidos()
    {
        this.pedidos=PedidoJson.obtenerPedidosTotales();
        return pedidos;
    }


    public void setProductos(ArrayList<Producto> productos)
    {
        this.productos = productos;
    }

    public void agregarProducto(Producto producto)
    {
        productos.add(producto);
        ProductoJson.guardarProducto(producto);
    }

    public Producto obtenerProducto(String nombreProducto)
    {
        Producto productoElegido=new Producto("",0,0);
        for (int i = 0; i < productos.size(); i++)
        {
            if (productos.get(i).getNombre().equals(nombreProducto))
                productoElegido=productos.get(i);
        }
        return productoElegido;
    }

    public void editarProducto(String nombreProducto, float precio, int cantidad) throws IOException
    {
        for (int i = 0; i < productos.size(); i++)
        {
            if (productos.get(i).getNombre().equalsIgnoreCase(nombreProducto))
            {
                productos.get(i).setPrecio(precio);
                productos.get(i).setCantidad(cantidad);
                ProductoJson.eliminarProducto(productos.get(i).getNombre());
                ProductoJson.guardarProducto(productos.get(i));
            }
        }
    }

    public boolean verificarProducto(Producto productoAgregado)
    {
        boolean verificacionProducto=true;
            for (int i = 0; i < productos.size(); i++)
            {
                if (productos.get(i).getNombre().equalsIgnoreCase(productoAgregado.getNombre()))
                    verificacionProducto=false;
            }
        return verificacionProducto;
    }


    @Override
    public boolean verificarCorreo(String correo)
    {
        Administrador admin = new Administrador(1); //quitar
        boolean adminObtenido= false;
        if (admin.getCorreo().equals(correo))
            adminObtenido=true;
        return adminObtenido;
    }


    @Override
    public boolean verificarContra(String contrasena)
    {
        Administrador admin = new Administrador(1); //quitar
        boolean adminObtenido= false;
        if (admin.getContrasena().equals(contrasena))
            adminObtenido=true;
        return adminObtenido;
    }
    public boolean verificarTelefono(String telefono)
    {
        Administrador admin = new Administrador(1); //quitar
        boolean adminObtenido= false;
        if (admin.getNumeroTelefonico().equals(telefono))
            adminObtenido=true;
        return adminObtenido;
    }

    public boolean verificarDatos(String correo, String contrasena)
    {
        Administrador admin = new Administrador(1); //quitar
        boolean adminObtenido= false;
        if (admin.getNumeroTelefonico().equals(correo) && admin.getContrasena().equals(contrasena))
        {
                adminObtenido=true;
        }
            return adminObtenido;
    }

    public Administrador login(Administrador admin)
    {
        if (admin.getCorreo().equals(this.getCorreo()) && admin.getContrasena().equals(this.getContrasena()) && admin.getNumeroTelefonico().equals(this.getNumeroTelefonico()))
        {
            return new Administrador(1); //quitar
        }
        else
        {
            throw new RuntimeException("Datos de administrador erroneos");
        }
    }
    public void editarPedido(String estado, int id) throws IOException
    {
        ArrayList<Pedido> pedidosTotales=PedidoJson.obtenerPedidosTotales();
        for (int i=0;i<pedidosTotales.size();i++)
        {
            if (pedidosTotales.get(i).getId()==id)
            {
                pedidosTotales.get(i).setEstado(estado);
                PedidoJson.eliminarPedido(id);
                PedidoJson.guardarPedido(pedidosTotales.get(i));
            }
        }
    }
    public void editarPedidoCliente(String estado, String correo, int id) throws IOException
    {
        ArrayList<Cliente> listaClientes= ClienteJson.obtenerClientesTotales();
        for (int i=0;i<listaClientes.size();i++)
        {
            if (listaClientes.get(i).getCorreo().equals(correo))
            {
                for (int j=0;j<listaClientes.get(i).getPedidos().size();j++)
                {
                    if (listaClientes.get(i).getPedidos().get(j).getId()==id)
                    {
                        listaClientes.get(i).getPedidos().get(j).setEstado(estado);
                        ClienteJson.eliminarCliente(listaClientes.get(i).getCorreo());
                        ClienteJson.guardarCliente(listaClientes.get(i));
                    }
                }
            }
        }
    }
    public boolean validarDatosProducto(int cantidad, float precio)
    {
        if (cantidad<0 || precio<=0)
            return false;
        else
            return true;
    }

    public boolean verificarNumeroTelefonico( String numeroTelefonico)
    {
        ArrayList<Cliente> listaClientes = ClienteJson.obtenerClientesTotales();
        int contador=0;
        for (int i=0; i<listaClientes.size(); i++)
        {
            if (listaClientes.get(i).getNumeroTelefonico().equals(numeroTelefonico))
            contador++;
        }
        if (contador!=0)
        return false;
        else
        return true;
    }
    
    public void editarPerfilAdministrador(String correo, String contrasena, String nombre, String numeroTelefonico ) throws IOException
    {
        this.setContrasena(contrasena);
        this.setNombre(nombre);
        this.setNumeroTelefonico(numeroTelefonico);
        AdministradorJson.eliminarAdministrador();
        AdministradorJson.guardarAdministrador(this);
    }

    public Pedido obtenerPedido (int id)
    {
        ArrayList<Pedido> pedidos= PedidoJson.obtenerPedidosTotales();
        Pedido pedidoBuscado= new Pedido();
        for (int i=0; i<pedidos.size(); i++)
        {
            if (pedidos.get(i).getId()==id)
            pedidoBuscado=pedidos.get(i);
        }
        return pedidoBuscado;
    }

    public void cancelarPedido (int id, String correo) throws IOException
    {
        for (int i=0;i<this.pedidos.size();i++)
        {
            if (this.pedidos.get(i).getId()==id)
            {
                this.pedidos.remove(i);
                PedidoJson.eliminarPedido(id);
            }
        }
        ArrayList<Cliente> clientes= ClienteJson.obtenerClientesTotales();
        Cliente clienteActual= new Cliente();
        for (int j=0;j<clientes.size();j++)
        {
            if (clientes.get(j).getCorreo().equals(correo))
            {
                clienteActual= clientes.get(j);
                for (int k=0;k<clienteActual.getPedidos().size();k++)
                {
                    if (clienteActual.getPedidos().get(k).getId()==id)
                    {
                        clienteActual.getPedidos().remove(k);
                        ClienteJson.eliminarCliente(correo);
                        ClienteJson.guardarCliente(clienteActual);
                    }
                }
            }
        }
    }

    public void actualizarProductosTotales(Pedido pedido) throws IOException
    {
        ArrayList<Producto> productosTotales=ProductoJson.obtenerProductosTotales();
        if (productosTotales==null)
            productosTotales=new ArrayList<Producto>();
        for (int i = 0; i< pedido.getDisenos().size(); i++)
        {
            for (int j = 0; j< pedido.getDisenos().get(i).getProductos().size(); j++)
            {
                for(int k=0;k<productosTotales.size();k++)
                {
                    if (productosTotales.get(k).getNombre()==pedido.getDisenos().get(i).getProductos().get(j).getNombre())
                    {
                        productosTotales.get(k).setCantidad(productosTotales.get(k).getCantidad()+ pedido.getDisenos().get(i).getProductos().get(j).getCantidad());
                        ProductoJson.eliminarProducto(productosTotales.get(k).getNombre());
                        ProductoJson.guardarProducto(productosTotales.get(k));
                    }
                }
            }
        }
    }
}