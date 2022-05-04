<?php

session_start();

$ROl = $_SESSION["rol"];

if($ROL == 3){
    header("ventas");
}else {
    header("reporte-ventas");
}