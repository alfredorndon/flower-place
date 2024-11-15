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

    //Constructor
    public Administrador() {
        super("admin@gmail.com", "admnin1234", "Administrador" ,"04120998105");
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
        boolean verificacionProducto=false;
        if (validarDatosProducto(productoAgregado.getCantidad(), productoAgregado.getPrecio()))
        verificacionProducto=true;
            for (int i = 0; i < productos.size(); i++)
            {
                if (productos.get(i).getNombre().equalsIgnoreCase(productoAgregado.getNombre()))
                    verificacionProducto=true;
            }
        return verificacionProducto;
    }


    @Override
    public boolean verificarCorreo(String correo)
    {
        Administrador admin = new Administrador();
        boolean adminObtenido= false;
        if (admin.getCorreo().equals(correo))
            adminObtenido=true;
        return adminObtenido;
    }
    @Override
    public boolean verificarContra(String contrasena)
    {
        Administrador admin = new Administrador();
        boolean adminObtenido= false;
        if (admin.getContrasena().equals(contrasena))
            adminObtenido=true;
        return adminObtenido;
    }
    public boolean verificarTelefono(String telefono)
    {
        Administrador admin = new Administrador();
        boolean adminObtenido= false;
        if (admin.getNumeroTelefonico().equals(telefono))
            adminObtenido=true;
        return adminObtenido;
    }

    public boolean verificarDatos(String correo, String Contrasena)
    {
        Administrador admin = new Administrador(1);
        boolean adminObtenido= false;
        if (admin.getNumeroTelefonico().equals(correo) && admin.getContrasena().equals(Contrasena))
        {
                adminObtenido=true;
        }
            return adminObtenido;
    }
    public void editarPedido(String correo, int id, String estado)
    {
        for (int i = 0; i < pedidos.size(); i++) {
            if (pedidos.get(i).getId() == id && pedidos.get(i).getCorreo().equals(correo))
            {
                pedidos.get(i).setEstado(estado);
            }
        }
    }

    public Administrador login(Administrador admin)
    {
        if (admin.getCorreo().equals(this.getCorreo()) && admin.getContrasena().equals(this.getContrasena()) && admin.getNumeroTelefonico().equals(this.getNumeroTelefonico()))
        {
            return new Administrador();
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
}