<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json;charset=utf-8');


$connect = mysqli_connect('mysql.webcindario.com', 'oneup', 'All01010101*', 'oneup');

$usuario = addslashes($_GET['usuario']);
$senha = addslashes(md5($_GET['senha']));

$arr = array();
//echo $_GET["action"];	
			
if($_GET["action"] == "logar"){
		$erro = "";
		$erro .= empty($usuario) ? "Informe o seu usuario <br>" : "";
		$erro .= empty($senha) ? "Informe a sua senha <br>" : "";
		
 
		if($erro == ""){
			
			$result = mysqli_query($connect,"SELECT cod, nome FROM usuario WHERE login = '{$usuario}' and senha = '{$senha}' AND usrtipo ='ALU'");
			if(!$result){
				$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
			}
			$linhas = mysqli_num_rows($result);
			if($linhas > 0){
				//usuario logado
				$obj = mysqli_fetch_array($result);
 
				$arr['result'] = true;
				$arr['dados']['nome'] = $obj["nome"];
				$arr['dados']['matricula'] = $obj["cod"];
			}else{
				$arr['result'] = false;
				$arr['msg'] .= "Usuário / Senha inválido(a)<br>";
			}
		}else{
			$arr['result'] = false;
			$arr['msg'] .= $erro;
		}
		$retorno = json_encode($arr);
		echo $retorno;	
	}
	if($_GET["action"] == "cursos"){
			unset($lista);
			unset($arr);
			$matricula = addslashes($_GET['matricula']);
			$erro = "";
			if($erro == ""){
				$result = mysqli_query($connect,"SELECT curso.cod, curso.descricao, alunocurso.anoentra, alunocurso.sementra, alunocurso.semsai, alunocurso.anosai  FROM curso, alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = curso.cod");
				//echo "SELECT curso.cod, curso.descricao, alunocurso.anoentra  FROM curso, alunocurso WHERE alunocurso.alunocod = '{$matricula}' and alunocurso.cursocod = curso.cod";
				if(!$result){
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
	
	}
	if($_GET["action"] =="disciplinas"){
		$matricula = addslashes($_GET['matricula']);
		$curso = addslashes($_GET['curso']);
		$ano = addslashes($_GET['ano']);
		
			$erro = "";
			unset($lista);
			unset($arr);
				if(strlen($ano) > 4){
					$sem = substr($ano, -1);
					$ano = substr($ano, 2, -2);
				$result = mysqli_query($connect,"SELECT discipaluno.discipcod, disciplina.descricao  
				FROM disciplina, discipaluno 
				WHERE discipaluno.alunocod = '{$matricula}' and discipaluno.cursocod = '{$curso}' AND refano ='{$ano}' AND refsem ='{$sem}' AND discipaluno.cursocod = disciplina.cursocod AND discipaluno.discipcod = disciplina.cod ORDER BY disciplina.descricao ASC");
				}else{
				$ano = substr($ano, 2);	
				$result = mysqli_query($connect,"SELECT discipaluno.discipcod, disciplina.descricao  
				FROM disciplina, discipaluno 
				WHERE discipaluno.alunocod = '{$matricula}' and discipaluno.cursocod = '{$curso}' AND refano ='{$ano}' AND discipaluno.cursocod = disciplina.cursocod AND discipaluno.discipcod = disciplina.cod ORDER BY disciplina.descricao ASC");
				}
				if(!$result){
					$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
				}
				if(mysqli_num_rows($result) > 0){
					while($obj = mysqli_fetch_array($result)){
					$lista = array(
								"id" => $obj[0], 
								"nome_curso" => (utf8_encode($obj[1])),	
								"resultados" => mysqli_num_rows($result),		
								);
					$arr[] = $lista;
					}			
								
				}else{
					$arr['result'] = false;
					$arr['msg'] .= "Você não está matriculado em nenhuma Disciplina.<br>";
				}
			
			echo json_encode($arr);

	}	
	if($_GET["action"] =="lista_anos"){
		$matricula = addslashes($_GET['matricula']);
		$curso = addslashes($_GET['curso']);
			$erro = "";
			unset($lista);
			unset($arr);
			if($erro == ""){
				$result = mysqli_query($connect,"SELECT  
				DISTINCT CONCAT ('20',discipaluno.refano, IF(curso.nivel = 'MIN','',CONCAT('.',discipaluno.refsem))) AS refano
				FROM discipaluno, curso 
				WHERE discipaluno.alunocod = '{$matricula}' and discipaluno.cursocod = '{$curso}' AND curso.cod = discipaluno.cursocod
				GROUP BY refano
				ORDER BY discipaluno.refano ASC"
				);
				
				if(!result){
					$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
				}
				if(mysqli_num_rows($result) > 0){
					while($obj = mysqli_fetch_array($result)){
					$lista = array(
								"ano" => $obj["refano"],
								);
					$arr[] = $lista;
					}			
								
				}else{
					$arr['result'] = false;
					$arr['msg'] .= "Você não está matriculado em nenhuma Disciplina.<br>";
				}
			}else{
				$arr['result'] = false;
				$arr['msg'] .= $erro;
			}
			echo json_encode($arr);

	}
	if($_GET["action"] =="mapa"){
		$matricula = ($_GET['matricula']);
		$curso = ($_GET['curso']);
		$ano = ($_GET['ano']);
		$disciplina = ($_GET['disciplina']);
		
	
		if(strlen($ano) > 4){
			 $sem = substr($ano, -1);
			 $ano = substr($ano, 2, -2);
				
				$result = mysqli_query($connect,
				"SELECT situacao, nota1un, nota2un, nota3un, nota4un, mediageral, fal1un, fal2un, fal3un, fal4un, faltaperc
				FROM discipaluno
				WHERE refano = '{$ano}' AND refsem = '{$sem}' AND discipcod = '{$disciplina}' AND cursocod = '{$curso}' AND alunocod = '{$matricula}'
				");			
		}else{
				$ano = substr($ano, 2);
				$result = mysqli_query($connect,
				"SELECT situacao, nota1un, nota2un, nota3un, nota4un, mediageral, fal1un, fal2un, fal3un, fal4un, faltaperc
				FROM discipaluno
				WHERE refano = '{$ano}' AND discipcod = '{$disciplina}' AND cursocod = '{$curso}' AND alunocod = '{$matricula}'");
		}
			$erro = "";
			unset($lista);
			unset($arr);
				if(!$result){
					$arr['result'] = false;
					$arr['msg'] .="DataBase Error: ".mysqli_error($connect);
				}
				if(mysqli_num_rows($result) > 0){
					while($obj = mysqli_fetch_array($result)){
						switch($obj["situacao"]){
							case "M0":
								$obj["situacao"] = "Pré-Matriculado";	
								break;
							case "M1":
								$obj["situacao"] = "Matriculado";	
								break;
							case "RI":
								$obj["situacao"] = "Reintegrado";	
								break;
							case "M2":
								$obj["situacao"] = "Cursando";	
								break;
							case "TR":
								$obj["situacao"] = "Trancado";	
								break;
							case "VN":
								$obj["situacao"] = "Vinculado";	
								break;
							case "VI":
								$obj["situacao"] = "Vinc. Integralizado";	
								break;
							case "DP":
								$obj["situacao"] = "Diplomado";	
								break;
							case "DS":
								$obj["situacao"] = "Desistente";	
								break;
							case "TF":
								$obj["situacao"] = "Transferido";	
								break;
							case "AP":
								$obj["situacao"] = "Aprovado";	
								break;
							case "RP":
								$obj["situacao"] = "Reprovado";	
								break;
							case "CLU":
								$obj["situacao"] = "Concluinte";	
								break;
							case "DSL":
								$obj["situacao"] = "Desligado";	
								break;
							case "TFI":
								$obj["situacao"] = "Transf. Interna";	
								break;
							case "TFE":
								$obj["situacao"] = "Transf. Externa";	
								break;
						}
					$lista = array(
								"situacao" => $obj["situacao"],
								"nota1" => $obj["nota1un"],
								"nota2" => $obj["nota2un"],
								"nota3" => $obj["nota3un"],
								"nota4" => $obj["nota4un"],
								"mediageral" => $obj["mediageral"],
								"falta1" => $obj["fal1un"],
								"falta2" => $obj["fal2un"],
								"falta3" => $obj["fal3un"],
								"falta4" => $obj["fal4un"],
								"p_falta" => $obj["faltaperc"]
								);
					$arr[] = $lista;
					}			
								
				}else{
					$arr['result'] = false;
					$arr['msg'] .= "Nenhuma nota foi lançada no sistema.<br>";
				}
			echo json_encode($arr);
	}	
?>