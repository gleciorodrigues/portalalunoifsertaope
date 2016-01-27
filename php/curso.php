<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json;charset=utf-8');

require "conexao.php";

$arr = array();
	
		$matricula = addslashes($_GET['matricula']);
		//$senha = addslashes($_GET['senha']);
		
		//echo "select * from aluno where usuario = '{$usuario}' and senha = '{$senha}'";
		$erro = "";
		//$erro .= empty($usuario) ? "Usuário não informado" : "";
		//$erro .= empty($senha) ? "Informe a sua senha <br>" : "";
		
 
		if($erro == ""){
			
			$result = mysqli_query($connect,"SELECT curso.cod, curso.descricao, alunocurso.anoentra, alunocurso.sementra, alunocurso.semsai, alunocurso.anosai  FROM curso, alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = curso.cod");
			//echo "SELECT curso.cod, curso.descricao, alunocurso.anoentra  FROM curso, alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = curso.cod";
			if(!result){
				$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
			}
			if(mysqli_num_rows($result) > 0){
				while($obj = mysqli_fetch_array($result)){
				$lista = array(
							"cod_curso" => $obj[0], 
							"nome_curso" => (utf8_encode($obj[1])),	
							"ano_entra" => $obj[2],
							"sem_entra" => $obj[3],
							"sem_sai"   => $oobj[4],			
							"ano_sai"   => $oobj[5]			
							);
				$arr[] = $lista;
				}			
							
			}else{
				$lista = array(
					"cod_curso" => "",
					"nome_curso" => "",
					"ano_entra" => ""
				);
				$arr[] = $lista;
				$arr['result'] = false;
				$arr['msg'] .= "Fudeu hard<br>";
			}
		}else{
			$arr['result'] = false;
			$arr['msg'] .= $erro;
		}
		echo json_encode($arr);
		unset($lista);
		unset($arr);
?>