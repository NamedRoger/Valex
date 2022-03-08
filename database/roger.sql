
CREATE TABLE `ventas` (
  `idVenta` int(11) NOT NULL,
  `idVendedor` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idSucursal` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `pago` decimal(10,2) NOT NULL,
  `cambio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idVenta`);


ALTER TABLE `ventas`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT;



CREATE TABLE `venta_productos` (
  `id` int(11) NOT NULL,
  `idVenta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` decimal(18,2) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `medida` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `venta_productos`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `venta_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;



CREATE TABLE arqueo_caja (
  id int(11) NOT NULL,
  idUsuario int(11) NOT NULL,
  idSucursal int(11) NOT NULL,
  fechaInicio datetime NOT NULL,
  fechaFin datetime NOT NULL,
  montoInicial decimal(10,2) NOT NULL,
  montoFinal decimal(10,2) NOT NULL,
  estatus tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE arqueo_caja
  ADD PRIMARY KEY (id);


ALTER TABLE arqueo_caja
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

