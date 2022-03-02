			<!-- main-header -->
			<div class="main-header sticky side-header nav nav-item sticky-pin" style="margin-bottom: -63px;">
				<div class="container-fluid">
					<div class="main-header-left ">
						<div class="responsive-logo">
							<a href="index.html"><img src="../assets/img/brand/logo.png" class="logo-1"
									alt="logo"></a>
							<a href="index.html"><img src="../assets/img/brand/logo-white.png" class="dark-logo-1"
									alt="logo"></a>
							<a href="index.html"><img src="../assets/img/brand/favicon.png" class="logo-2"
									alt="logo"></a>
							<a href="index.html"><img src="../assets/img/brand/favicon-white.png" class="dark-logo-2"
									alt="logo"></a>
						</div>
						<div class="app-sidebar__toggle" data-bs-toggle="sidebar">
							<a class="open-toggle" href="#"><i class="header-icon fas fa-bars"></i></a>
							<a class="close-toggle" href="#"><i class="header-icons fas fa-times"></i></a>
						</div>
					</div>
					<div class="main-header-right">
						<ul class="nav nav-item  navbar-nav-right ms-auto">
							<li class="dropdown main-profile-menu nav nav-item nav-link">
								<a class="profile-user d-flex" href="">
									<?php 
										if($_SESSION['rol'] == 1){
											echo '<img src="https://img.icons8.com/fluency/96/000000/customer-insight.png"/>';
										}else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 1) {
											echo '<img src="https://img.icons8.com/color/96/000000/administrator-female.png"/>';
										}else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 2) {
											echo '<img src="https://img.icons8.com/color/50/000000/administrator-male-skin-type-7.png"/>';
										}else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 1) {
											echo '<img src="https://img.icons8.com/color/50/000000/saleswoman.png"/>';
										}else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 2) {
											echo '<img src="https://img.icons8.com/color/96/000000/salesman-skin-type-3.png"/>';
										}else{
											echo '<img src="https://img.icons8.com/color/96/000000/customer-skin-type-7.png"/>';
										}
									?>
								</a>
								<div class="dropdown-menu">
									<div class="main-header-profile bg-primary p-3">
										<div class="d-flex wd-100p">
											<div class="main-img-user">
												<?php 
													if($_SESSION['rol'] == 1){
														echo '<img src="https://img.icons8.com/fluency/96/000000/customer-insight.png"/>';
													}else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 1) {
														echo '<img src="https://img.icons8.com/color/96/000000/administrator-female.png"/>';
													}else if ($_SESSION['rol'] == 2 && $_SESSION['genero'] == 2) {
														echo '<img src="https://img.icons8.com/color/50/000000/administrator-male-skin-type-7.png"/>';
													}else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 1) {
														echo '<img src="https://img.icons8.com/color/50/000000/saleswoman.png"/>';
													}else if ($_SESSION['rol'] == 3 && $_SESSION['genero'] == 2) {
														echo '<img src="https://img.icons8.com/color/96/000000/salesman-skin-type-3.png"/>';
													}else{
														echo '<img src="https://img.icons8.com/color/96/000000/customer-skin-type-7.png"/>';
													}
												?>
												</div>
											<div class="ms-3 my-auto">
												<h6><?php echo $_SESSION['nombre'] ?></h6><span>
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
									<a class="dropdown-item" href="../../controller/logout.php"><i class="bx bx-log-out"></i> Cerrar Sesión</a>
								</div>
							</li>
							<li class="nav-item full-screen fullscreen-button">
								<a class="new nav-link full-screen-link" href="#">
									<svg
										xmlns="http://www.w3.org/2000/svg" class="header-icon-svgs" viewBox="0 0 24 24"
										fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
										stroke-linejoin="round" class="feather feather-maximize">
										<path
											d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3">
										</path>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- /main-header -->