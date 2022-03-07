<?php

class Caja
{
    public $id;
    public $montoInicial;
    public $montoFinal;
    public $idUsuario;
    public $fechaInicio;
    public $fechaFin;
    public $estatus;

    public function __construct($montoInicial, $idUsuario)
    {
        $this->montoInicial = $montoInicial;
        $this->idUsuario = $idUsuario;
    }

    public function abrirCaja()
    {
    }

    public function cerrarCaja()
    {
    }

    public function verificarCaja()
    {
    }
}
