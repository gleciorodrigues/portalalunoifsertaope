<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json;charset=utf-8');

$connect = mysqli_connect('mysql.webcindario.com', 'oneup', 'All01010101*', 'oneup');

$arr = array();
	
		$usuario = addslashes($_GET['usuario']);
		$senha = addslashes(md5($_GET['senha']));
		
		//echo "select * from aluno where usuario = '{$usuario}' and senha = '{$senha}'";
		$erro = "";
		$erro .= empty($usuario) ? "Informe o seu usuario <br>" : "";
		$erro .= empty($senha) ? "Informe a sua senha <br>" : "";
		
 
		if($erro == ""){
			
			$result = mysqli_query($connect,"SELECT * FROM usuario WHERE login = '{$usuario}' and senha = '{$senha}' AND usrtipo ='ALU'");
			if(!result){
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
?>