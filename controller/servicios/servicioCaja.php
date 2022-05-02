<?php
use Valex\Clases\DataBase;

function listarArqueos($idSucursal) {
    $conexion = DataBase::getInstance()->getConexion();
    $queryArqueo = "SELECT * FROM arqueo_caja AS ac INNER JOIN sucursales AS s ON s.idSucursal = ac.idSucursal WHERE s.idSucursal = $idSucursal";
    
    $result = $conexion->query($queryArqueo);
    $arqueos = [];

    $arqueos = $result->fetchAll(PDO::FETCH_CLASS);
    return $arqueos;
}
