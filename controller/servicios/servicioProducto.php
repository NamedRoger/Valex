<?php

use Valex\Persistence\DataBase;

include '../../database/database.php';

function getProductoById($id)
{
    $database = DataBase::getInstance();
    $connexion = $database->getConexion();
    $query = "SELECT * FROM productos WHERE idProducto = $id";
    return $connexion->query($query)->fetch_object();
}

function getProductoByCodigo($codgio)
{
}

function getProductosFilter($filter)
{
}
