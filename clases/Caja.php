<?php
namespace Valex\Clases;

use DateTime;

class Caja
{
    public $id;
    public $montoInicial;
    public $montoFinal;
    public $idUsuario;
    public $idSucursal;
    public $fechaInicio;
    public $fechaFin;
    public $estatus;
    private $conexion;

    public function __construct($montoInicial, $idUsuario, $idSucursal)
    {
        $this->montoInicial = $montoInicial;
        $this->idUsuario = $idUsuario;
        $this->idSucursal = $idSucursal;
        // $this->conexion = DataBase::getInstance()->getConexion();
    }

    public function abrirCaja()
    {
        $fechaInicio = "";
        $abrirCajaQuery = "INSERT INTO arqueo_caja 
        (idUsuario, idSucursal, fechaInicio, fechaFin, montoInicial,estatus)
        VALUES ($this->idUsuario,$this->idSucursal,$fechaInicio,$this->montoInicial,0)";
        // $this->conexion->query($abrirCajaQuery);
    }

    public function cerrarCaja()
    {
    }

    public function verificarCaja()
    {
        return new DateTime();
    }
}

$caja = new Caja(0,0,0);
var_dump( $caja->verificarCaja());