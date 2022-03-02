<?php

class Producto
{
    private $idProducto;
    private $codigo;
    private $idCategoria;
    private $medida;
    private $nombre;
    private $descirpcion;
    private $compra;
    private $venta;
    private $mayoreo;
    private $medio;

    public function __construct(
        $nombre,
        $idCategoria,
        $compra,
        $venta,
        $mayoreo,
        $medio,
        $descirpcion = ""
    ) {
        $this->nombre = $nombre;
        $this->idCategoria = $idCategoria;
        $this->compra = $compra;
        $this->venta = $venta;
        $this->mayoreo = $mayoreo;
        $this->medio = $medio;
        $this->descirpcion = $descirpcion;
    }

    public function getIdProducto()
    {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto)
    {
        $this->idProducto = $idProducto;
    }

    public function getCodigo()
    {
        return $this->codigo;
    }

    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;
    }

    public function getIdCategoria()
    {
        return $this->idCategoria;
    }

    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;
    }

    public function getMedida()
    {
        return $this->medida;
    }

    public function setMedida($medida)
    {
        $this->medida = $medida;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function getDescription()
    {
        return $this->descirpcion;
    }

    public function setDescription($descirpcion)
    {
        $this->descirpcion = $descirpcion;
    }

    public function getCompra()
    {
        return $this->compra;
    }

    public function setCompra($compra)
    {
        $this->compra = $compra;
    }

    public function getVenta()
    {
        return $this->venta;
    }

    public function setVenta($venta)
    {
        $this->venta = $venta;
    }

    public function getMayoreo()
    {
        return $this->mayoreo;
    }

    public function setMayoreo($mayoreo)
    {
        $this->mayoreo = $mayoreo;
    }

    public function getMedio()
    {
        return $this->medio;
    }

    public function setMedio($medio)
    {
        $this->medio = $medio;
    }


    public function calcularPrecioCliente($cliente)
    {
        $precioCliente  = 0;
        switch ($cliente->precio) {
            case 1:
                $precioCliente = $this->venta;
                break;
            case 2:
                $precioCliente = $this->medio;
                break;
            case 3:
                $precioCliente = $this->mayoreo;
                break;
            default:
                $precioCliente = 1;
                break;
        }
        return $precioCliente;
    }
}
