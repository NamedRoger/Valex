create database valex;
	use valex;

create table users(
	idUsuario int primary key auto_increment,
	nombre varchar(30),
	telefono varchar(15),
	direccion varchar(50),
	usuario varchar(15),
	password varchar(255),
	idSucursal int,
	rol int,
	genero int,
	permiso int not null
);

insert into users (nombre, telefono, direccion, usuario, password, rol) values ('Admin', null, null, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1);

create table sucursales(
	idSucursal int primary key,
	sucursal varchar(255),
	direccionSuc varchar(100),
	telefonoSuc varchar(20)
);

create table categorias(
	idCategoria int primary key auto_increment,
	categoria varchar(50)
);

create table productos(
	idProducto int primary key,
	codigo varchar(50),
	idCategoria int not null,
	medida int not null,
	nombre varchar(100),
	descripcion varchar(255),
	compra double,
	venta double,
	medio double,
	mayoreo double
);

create table stock(
	idStock int primary key auto_increment,
	idSucursal int not null,
	idProducto int not null,
	stock double not null
);

create table checador(
	idChecada int primary key auto_increment,
	nombre varchar(30),
	fechaEntrada date,
	fechaSalida date,
	horaEntrada time,
	horaSalida time
);

create table clientes(
	idCliente int auto_increment primary key,
	nombre varchar(50),
	telefono varchar(15),
	precio int
);