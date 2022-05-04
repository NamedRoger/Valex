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
    private $conextion;

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
        $this->medida = intval($medida);
        $this->nombre = $nombre;
        $this->compra = floatval($compra);
        $this->venta = floatval($venta);
        $this->medio = floatval($medio);
        $this->mayoreo = $mayoreo;
        $this->conextion = DataBase::getInstance()->getConexion();
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

    public static function obtenerProducto($idProducto)
    {
        $conextion = DataBase::getInstance()->getConexion();
        $query = "SELECT * FROM productos WHERE idProducto = $idProducto";
        $result = $conextion->query($query);
        $productoDb = $result->fetchObject();
        $producto = new Producto(
            $productoDb->codigo,
            $productoDb->idCategoria,
            $productoDb->medida,
            $productoDb->nombre,
            $productoDb->compra,
            $productoDb->venta,
            $productoDb->medio,
            $productoDb->mayoreo
        );

        return $producto;
    }


}