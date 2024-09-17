<?php
session_start();

if(!empty($_POST["login"]) && !empty($_POST["pass"])){
	$login = strtolower(trim($_POST["login"]));
	$pass= trim($_POST["pass"]);
	if($login=="admin" && $pass=="Inf2022"){
		$_SESSION["auth"]=true;
		header("Location: index.php");		
	}else{
		$_SESSION["auth"]=false;
	}	
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
	<title>MindwaveKZ</title>
	<meta charset="UTF-8">	
	<link rel="icon" type="image/ico" href="img/favicon.ico"/>  
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
	<meta name='viewport'  content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' />  
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
  <script src="js/FileSaver.js"></script>  

</head>
<body>
	<?php
		if($_SESSION["auth"]==true):	
	?>
	
	<div class="wrapper ">
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
        <a href="" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="img/logo.png">
          </div>          
        </a>
        <a href="" class="simple-text logo-normal">
          MindwaveKZ         
        </a>
      </div>
      <div class="sidebar-wrapper" style="overflow: hidden;">
        <ul class="nav">
          <li class="active ">
            <a href="">
              <i class="nc-icon nc-bank"></i>
              <p>Панель управления</p>
            </a>
          </li>
          <li>
            <a href="downloads/Extention_MindwaveKZ_v1_0_1.zip" target="_blank">
              <i class="nc-icon nc-globe"></i>
              <p>Скачать плагин</p>
            </a>
          </li>          
          <li>
            <a href="logout.php">
              <i class="nc-icon nc-spaceship"></i>
              <p>Выйти</p>
            </a>
          </li>         
        </ul>       
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:connectBLE();"><span id="statDevice">Устройство не подключено</span></a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navigation">
            
            <ul class="navbar-nav">                           
              <li class="nav-item">
                <a class="nav-link btn-rotate" href="javascript:connectBLE();">
                  <span id="statusOfConnection">Подключить</span>
                  <i class="nc-icon nc-button-power"></i>                  
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="content">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body ">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-globe text-warning"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Сигнал</p>
                      <p class="card-title" id="quality">0 %<p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer ">               
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body ">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-single-02 text-success"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">Внимание</p>
                      <p class="card-title" id="attention">--- %<p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer ">                
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="card card-stats">
              <div class="card-body ">
                <div class="row">
                  <div class="col-5 col-md-4">
                    <div class="icon-big text-center icon-warning">
                      <i class="nc-icon nc-badge text-danger"></i>
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category">ID тестироемого</p>
                      <p class="card-title"><input type="number" id="subjectID" value="001"  min="1" max="999" step="1" onchange="if(parseInt(this.value,10)<10){this.value='00'+this.value}else if(parseInt(this.value,10)<100)this.value='0'+this.value;" ><p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer ">                
              </div>
            </div>
          </div>         
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header ">
                <h5 class="card-title">Предпросмотр</h5>
                <p class="card-category">Укажите ID тестироемого и нажмите "НАЧАТЬ"</p>
              </div>
              <div class="card-body ">
                <video id="preview" width="100%" autoplay muted poster="img/newPoster.jpg" style="min-height:280px"></video>
              </div>
              <div class="card-footer ">
                <div class="legend">
                  <div id="startButton" class="button">
                    НАЧАТЬ
                  </div>
                  <div id="stopButton" class="button">                    
                    ОСТАНОВИТЬ
                  </div>
                </div>
                <hr>
                <div class="stats">
                  <div style="display: none;">                    
                    Выполняется сохранение данных
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </div>
                  <div class="bottom">
                    <pre id="log"></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Запись</h5>
                <p class="card-category">По завершению теcтирования скачайте видео</p>
              </div>
              <div class="card-body">
                <video id="recording" width="100%" controls poster="img/newPoster.jpg" style="min-height:280px"></video>
              </div>
              <div class="card-footer">
                <div class="legend">
                  <a id="downloadButton" class="button">
                  Скачать
                  </a>
                </div>
                <hr />
                <div class="stats">
                  <div>
                    <pre id="fileName"></pre>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container">
          <p style="color:#9a9a9a">Если возникли проблемы с подключением блютуз устройства то попробуйте chrome://bluetooth-internals</p>
        </div>
      </footer>
    </div>
  </div>
  
  <script src="js/core/jquery.min.js"></script>
  <script src="js/core/bootstrap.min.js"></script>
  <script  src="js/main.js"></script>
	

	<?php
		else:
	?>
	<div class="limiter">
		<div class="container-login100" style="background-image: url('img/bg.jpg');">
			<div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
				<form class="login100-form validate-form flex-sb flex-w" method="POST">
					<span class="login100-form-title p-b-10">
						Войти в систему
					</span>					
					<div class="p-t-31 p-b-9">
						<span class="txt1">
							Логин
						</span>
					</div>
					<div class="wrap-input100 validate-input">
						<input class="input100" type="text" name="login" required>
						<span class="focus-input100"></span>
					</div>
					
					<div class="p-t-13 p-b-9">
						<span class="txt1">
							Пароль
						</span>						
					</div>
					<div class="wrap-input100 validate-input">
						<input class="input100" type="password" name="pass" required>
						<span class="focus-input100"></span>
					</div>

					<div class="container-login100-form-btn m-t-17 m-b-53">
						<button class="login100-form-btn">
							Войти
						</button>
					</div>
					
				</form>
			</div>
		</div>
	</div>
	<?php
		endif;
	?>
	
</body>
</html>