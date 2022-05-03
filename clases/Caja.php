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

    public function __construct($idUsuario, $idSucursal, $montoInicial = 0)
    {
        $this->montoInicial = $montoInicial;
        $this->idUsuario = $idUsuario;
        $this->idSucursal = $idSucursal;
        $this->conexion = DataBase::getInstance()->getConexion();
    }

    public function abrirCaja()
    {
        date_default_timezone_set('America/Monterrey');
        $fechaInicio = new DateTime("now");
        $fecha = $fechaInicio->format('Y-m-d H:i:s');
        $this->fechaInicio = $fecha;
        $abrirCajaQuery = "INSERT INTO arqueo_caja (idUsuario, idSucursal, fechaInicio, montoInicial,estatus)
        VALUES ($this->idUsuario,$this->idSucursal,'$fecha',$this->montoInicial,1)";
        $result = $this->conexion->exec($abrirCajaQuery);
        $this->id = $this->conexion->lastInsertId();
    }

    public function cerrarCaja($monto )
    {
        date_default_timezone_set('America/Monterrey');
        $fechaInicio = new DateTime("now");
        $fecha = $fechaInicio->format('Y-m-d H:i:s');
        $abrirCajaQuery = "UPDATE arqueo_caja SET estatus = 0, fechaFin ='$fecha', montoFinal = $monto
        WHERE id = $this->id";
        $this->conexion->query($abrirCajaQuery);
    }

    public function verificarCaja()
    {
        $verificarQuery = "SELECT * FROM arqueo_caja 
        WHERE CAST(fechaInicio as date) = CAST(NOW() as date) 
        AND estatus = 1
        AND idSucursal = $this->idSucursal
        LIMIT 1";
        $result = $this->conexion->query($verificarQuery);
        $corte = $result->fetchObject();
        return $corte != null && $corte != false;
    }
}