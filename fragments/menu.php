			<?php $ROL = $_SESSION["rol"]; ?>
			<!-- main-sidebar -->
			<div class="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
			<aside class="app-sidebar sidebar-scroll">
				<div class="main-sidebar-header active">
					<a class="desktop-logo logo-light active" href="index.html"><img src="../assets/img/brand/logo.png" class="main-logo" alt="logo"></a>
					<a class="desktop-logo logo-dark active" href="index.html"><img src="../assets/img/brand/logo-white.png" class="main-logo dark-theme" alt="logo"></a>
					<a class="logo-icon mobile-logo icon-light active" href="index.html"><img src="../assets/img/brand/favicon.png" class="logo-icon" alt="logo"></a>
					<a class="logo-icon mobile-logo icon-dark active" href="index.html"><img src="../assets/img/brand/favicon-white.png" class="logo-icon dark-theme" alt="logo"></a>
				</div>
				<div class="main-sidemenu">
					<div class="app-sidebar__user clearfix">
						<div class="dropdown user-pro-body">
							<div class="">
								<img alt="user-img" class="avatar avatar-xl brround" src="
								<?php
								if ($_SESSION['rol'] == 1) {
									echo 'https://img.icons8.com/fluency/96/000000/customer-insight.png';
								} else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 1) {
									echo 'https://img.icons8.com/color/96/000000/administrator-female.png';
								} else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 2) {
									echo 'https://img.icons8.com/color/50/000000/administrator-male-skin-type-7.png';
								} else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 1) {
									echo 'https://img.icons8.com/color/50/000000/saleswoman.png';
								} else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 2) {
									echo 'https://img.icons8.com/color/96/000000/salesman-skin-type-3.png';
								} else {
									echo 'https://img.icons8.com/color/96/000000/customer-skin-type-7.png';
								}
								?>
								"><span class="avatar-status profile-status bg-green"></span>
							</div>
							<div class="user-info">
								<h4 class="fw-semibold mt-3 mb-0"><?php echo $_SESSION['nombre'] ?></h4>
								<span class="mb-0 text-muted">
									<?php
									switch ($_SESSION['rol']) {
										case '1':
											echo 'Superadmin';
											break;
										case '2':
											echo 'Administrador(a)';
											break;
										case '3':
											echo 'Vendedor(a)';
											break;
									}
									?>
								</span>
							</div>
						</div>
					</div>
					<ul class="side-menu">
						<li class="side-item side-item-category">Menu</li>
						<?php if ($ROL == 2 || $ROL == 3) { ?>
							<li class="slide">
								<a class="side-menu__item sub" href="ventas">
									<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
										<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
									</svg>
									<span class="side-menu__label">Ventas</span></a>
							</li>
						<?php } ?>
						
						<?php if ($ROL == 1 || $ROL == 2) { ?>
							<li class="slide">
								<a class="side-menu__item sub" href="reporte-ventas">
									<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
									</svg>
									<span class="side-menu__label">Reporte de Ventas</span></a>
							</li>
							<li class="slide">
								<a class="side-menu__item sub" href="arqueos">
									<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
									</svg>
									<span class="side-menu__label">Arqueo de Cajas</span></a>
							</li>

							<li class="side-item side-item-category">Catálogos</li>
							<li class="slide">
								<a class="side-menu__item sub" data-bs-toggle="slide" href="#">
									<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
										<path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
									</svg>
									<span class="side-menu__label">Catálogos</span><i class="angle fe fe-chevron-down"></i></a>
								<ul class="slide-menu">
									<li><a class="slide-item sub" href="clientes">Clientes</a></li>
									<li><a class="slide-item sub" href="categorias">Categorías</a></li>
									<li><a class="slide-item sub" href="productos">Productos</a></li>
									<li><a class="slide-item sub" href="stock">Stock</a></li>
								</ul>
							</li>
							<?php if ($ROL == 1) { ?>
								<li class="side-item side-item-category">Configuraciones</li>
								<li class="slide">
									<a class="side-menu__item sub" data-bs-toggle="slide" href="#">
										<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
										</svg>
										<span class="side-menu__label">Configuraciones</span><i class="angle fe fe-chevron-down"></i></a>
									<ul class="slide-menu">
										<li><a class="slide-item sub" href="sucursales">Sucursales</a></li>
										<li><a class="slide-item sub" href="usuarios">Usuarios</a></li>
									</ul>
								</li>
							<?php } ?>
							<li class="side-item side-item-category">Herramientas</li>
							<li class="slide">
								<a class="side-menu__item sub" data-bs-toggle="slide" href="#">
									<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
										<path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
									</svg>
									<span class="side-menu__label">Herramientas</span><i class="angle fe fe-chevron-down"></i></a>
								<ul class="slide-menu">
									<li><a class="slide-item sub" href="checador">Chcador</a></li>
								</ul>
							</li>
						<?php } ?>
					</ul>
				</div>
			</aside>