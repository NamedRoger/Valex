<?php 
namespace Valex\Clases;

class Producto 
{
    public $idProducto;
    public $codigo;
    public $idCategoria;
    public $medida;
    public $nombre;
    public $compra;
    public $venta;
    public $medio;
    public $mayoreo;

    public function __construct(
        $codigo, 
        $idCategoria, 
        $medida, 
        $nombre, 
        $compra,
        $venta, 
        $medio,
        $mayoreo)
    {
        $this->codigo = $codigo;
        $this->idCategoria = $idCategoria;
        $this->medida = $medida;
        $this->nombre = $nombre;
        $this->compra = $compra;
        $this->venta = $venta;
        $this->medio = $medio;
        $this->mayoreo = $mayoreo;
    }

    public function obtenerPrecioCliente($cliente)
    {
        $precio = 0;
        switch($cliente->precio){
            case 1:
                $precio = $this->venta;
                break;
            case 2:
                $precio = $this->medio;
                break;
            case 3:
                $precio = $this->mayoreo;
                break;
        }
        return $precio;
    }


}