<?php 
namespace Valex\Clases;

class Cliente 
{
    public $idCliente;
    public $nombre; 
    public $precio;

    public function __construct($idCliente, $nombre, $precio)
    {
        $this->idCliente = $idCliente;
        $this->nombre = $nombre;
        $this->precio = $precio;
    }
}