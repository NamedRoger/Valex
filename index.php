<!doctype html>
<html lang="es" dir="ltr">
	<head>
		<meta charset="UTF-8">
		<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- Title -->
		<title> Don Huachinango </title>
		<?php include 'fragments/css.php'; ?>
	</head>
	<body class="main-body app sidebar-mini">
		<div id="global-loader">
			<img src="../assets/img/loader.svg" class="loader-img" alt="Loader">
		</div>
		<div class="page">
			<div class="main-content app-content">
				<div class="container-fluid">
					<div class="row no-gutter">
						<!-- The image half -->
						<div class="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
							<div class="row wd-100p mx-auto text-center">
								<div class="col-md-12 col-lg-12 col-xl-12 my-auto mx-auto wd-100p">
									<img src="../../assets/img/login.gif" class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mx-auto" alt="logo">
								</div>
							</div>
						</div>
						<!-- The content half -->
						<div class="col-md-6 col-lg-6 col-xl-5 bg-white">
							<div class="login d-flex align-items-center py-2">
								<!-- Demo content-->
								<div class="container p-0">
									<div class="row">
										<div class="col-md-10 col-lg-10 col-xl-9 mx-auto">
											<div class="card-sigin">
												<div class="mb-5 d-flex">
													<a href="index.html"><img src="../../assets/img/brand/favicon.png" class="sign-favicon-a ht-40" alt="logo">
													<img src="../../assets/img/brand/favicon-white.png" class="sign-favicon-b ht-40" alt="logo">
													</a>
													<h1 class="main-logo1 ms-1 me-0 my-auto tx-28">Va<span>le</span>x</h1>
												</div>
												<div class="card-sigin">
													<div class="main-signup-header">
														<h2>Bienvenido!</h2>
															<form>
																<div class="form-group">
																	<label>Usuario</label> 
																	<input class="form-control" type="text" id="usuario" name="usuario" autofocus>
																</div>
																<div class="form-group">
																	<label>Contraseña</label> 
																	<input class="form-control" type="password" id="password" name="password">
																</div>
																<button class="btn btn-primary btn-block" onclick="Login(); return false;">Ingresar</button>
															</form>
														<div class="main-signin-footer mt-5">
															<!--<p><a href="">Forgot password?</a></p>-->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div><!-- End -->
							</div>
						</div><!-- End -->
					</div>
				</div>	
			</div>
		</div>
		<?php include 'fragments/js.php' ?>
	</body>
</html>