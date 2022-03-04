<?php

namespace Valex\Clases;

class ProductoVenta
{
    public $idProducto;
    public $cantidad;
    public $precio;
    public $medida;
    public $total;

    public function __construct($idProducto, $cantidad, $precio, $media)
    {
        $this->idProducto = (int)$idProducto;
        $this->cantidad = (float)$cantidad;
        $this->precio = (float)$precio;
        $this->medida = (float)$media;
        $this->total = $this->calcularTotal();
    }

    public function calcularTotal()
    {
        return $this->precio * $this->cantidad;
    }
}
