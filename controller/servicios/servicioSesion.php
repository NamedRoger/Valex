<?php 
session_start();

function getIdUsuario(){
    return $_SESSION['idUsuario'];
}

function getRol(){
    return $_SESSION['rol'];
}

function getSucursal(){
    return $_SESSION['idSucursal'];
}

function getNombre(){
    return $_SESSION['nombre'];

}

function getGenero(){
    return $_SESSION['genero'];
}

function getSession(){
    return json_encode($_SESSION);
}