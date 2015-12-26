<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json;charset=utf-8');

$connect = mysqli_connect('mysql.webcindario.com', 'oneup', 'All01010101*', 'oneup');

$arr = array();
	
		$matricula = addslashes($_GET['matricula']);
		$curso = addslashes($_GET['curso']);
		
		$erro = "";
		
		
 
		if($erro == ""){
			
			$result = mysqli_query($connect, "SELECT alunocurso.anoentra, alunocurso.sementra, alunocurso.semsai, alunocurso.anosai  FROM alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = '{$matricula}' ");
			//echo "SELECT curso.cod, curso.descricao, alunocurso.anoentra  FROM curso, alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = curso.cod";
			if(!result){
				$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
			}
			if(mysqli_num_rows($result) > 0){
				while($obj = mysqli_fetch_array($result)){
				$lista = array(
							"ano_entra" => $obj[0],
							"sem_entra" => $obj[1],
							"sem_sai"   => $oobj[2],			
							"ano_sai"   => $oobj[3]			
							);
				$arr[] = $lista;
				}			
							
			}
		}else{
			$arr['result'] = false;
			$arr['msg'] .= $erro;
		}
		echo json_encode($arr);
?>