var storage = window.localStorage;
var host = "http://professor.webcindario.com/portaldoaluno/";

document.addEventListener("deviceready", onDeviceReady, false);
function mostrarUsuario(){
	$(".dados_aluno").html("<b>"+storage.getItem('usuario')+"</b> - Mat. "+storage.getItem('matricula'));	
};
function onDeviceReady() {
	document.addEventListener("backbutton", voltar, false);
};
function entrar(){
	if($("#login").val() == ''){
		$("#login").focus();
		$("#situacao").html("<div class='alert alert-danger text-center'> Informe seu login! </div>");
	}else{
		if($("#senha").val() == ''){
			$("#senha").focus();
			$("#situacao").html("<div class='alert alert-danger text-center'> Informe sua senha! </div>");
		}else{
			$("#situacao").html("<div class='alert alert-info text-center'> Conectando... </div>");
			autenticar($("#login"), $("#senha"));
		}
	}
};
function autenticar(login, senha){
	$.ajax({
        type: "GET",
		url: host+"servicosmobile.php", 
        data:{
		action: "logar",
        usuario: login.val(),
        senha: senha.val()
		},
		contentType: "application/json; charset=utf-8",
        success: function(retorno){
			
			if(retorno.result === true){
				storage.setItem('usuario', retorno.dados.nome);//armazena nome do usuario
				storage.setItem('matricula', retorno.dados.matricula);//armazena matricula do usuario
				$("#situacao").empty();
                getCursos();
			}else{
				$("#situacao").html("<div class='alert alert-danger text-center'>"+retorno.msg+"</div>");//mostra mensagem de erro
			}
		}
	});
};
function getCursos(){
	$(":mobile-pagecontainer").pagecontainer("change", "cursos.html", { reverse: false, transition:"fade"});//redireciona o usuario para pagina
	$.ajax({
        type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "cursos",	  
        matricula: storage.getItem("matricula"),
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
		mostrarUsuario();
		var dados_curso = "";
		$.each(retorno, function(i, curso){ 
            dados_curso += 	'<button value="'+curso.cod_curso+'" style="color: white;" class="btn btn-lg btn-success btn-block padrao" OnClick="getAnos(this.value)">'+curso.nome_curso+'</button>'
            $(".lista_cursos").html(dados_curso);
        }); 
		}
	});
};
function getAnos(idCurso){
	$(":mobile-pagecontainer").pagecontainer("change", "anos.html",{ reverse: false, transition: "fade" }); //MUDA PÁGINA
	storage.setItem('curso', idCurso);
	$.ajax({
		type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "lista_anos",	  
        matricula: storage.getItem('matricula'),
		curso: idCurso,
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
			mostrarUsuario();
			if(retorno.result == false){
				$(".lista_anos").empty();
				$(".lista_anos").html("<div class='alert alert-warning text-center'>"+retorno.msg+"</div>");
			}else{  
				var anos = "";
				$.each(retorno, function(j, data){ 
					anos += '<button value="'+data.ano+'" class="btn btn-lg btn-block btn-success padrao" OnClick="getDisciplinas(this.value)">'+data.ano+'</button>'
					$(".lista_anos").html(anos);
				}); 
			}
		}		  
    });
};

function getDisciplinas(ano){
	$(":mobile-pagecontainer").pagecontainer("change", "disciplinas.html",{ reverse: false, transition: "fade" }); //MUDA PÁGINA
	storage.setItem('ano',ano);
	$.ajax({
        type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "disciplinas",	  
        matricula: storage.getItem('matricula'),
        curso: storage.getItem('curso'),
		ano: ano,
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
			mostrarUsuario();
			if(retorno.result == false){
				$(".lista_disc").empty();
				$(".lista_disc").html("<div class='alerta'>"+retorno.msg+"</div>");
			}else{  
				var dados_disc = "";
				$.each(retorno, function(j, disc){ 
					dados_disc = '<button value="'+disc.id+'" class="btn btn-block btn-lg btn-success padrao" OnClick="getMapa(this.value)">'+disc.nome_curso+'</button>';
					$(".lista_disc").append(dados_disc);
				}); 	
			}
		}		  
    });
};
function getMapa(idDisciplina){
	$(":mobile-pagecontainer").pagecontainer("change", "mapa.html",{ reverse: false, transition: "fade" }); //MUDA PÁGINA
	storage.setItem('disciplina',idDisciplina);
	$.ajax({
        type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "mapa",	  
        matricula: storage.getItem('matricula'),
        curso: storage.getItem('curso'),
		ano: storage.getItem('ano'),
		disciplina: idDisciplina,
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
			mostrarUsuario();
			$(".mapa").empty();
			if(retorno.result == false){
				$(".mapa").html("<div class='alert alert-warning text-center'>"+retorno.msg+"</div>");
			}else{
				$.each(retorno, function(x, mapa){
						$(".disciplina").html(mapa.disciplina);
						storage.setItem("disciplinaNome",mapa.disciplina);
						$(".situacao").html(mapa.situacao);
						$(".media_geral").html(mapa.mediageral);
						$(".perc_faltas").html(mapa.p_falta);
				});	
			}	
		}
    });
}; 
function getNotas(){
	$(":mobile-pagecontainer").pagecontainer("change", "notas.html",{ reverse: true, transition: "pop" }); //MUDA PÁGINA
	$.ajax({
        type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "mapa",	  
        matricula: storage.getItem('matricula'),
        curso: storage.getItem('curso'),
		ano: storage.getItem('ano'),
		disciplina: storage.getItem('disciplina'),
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
			mostrarUsuario();
			$.each(retorno, function(x, mapa){
				$(".disciplina").html(storage.getItem("disciplinaNome"));
				$(".nota1").html(mapa.nota1);
				$(".nota2").html(mapa.nota2);
				$(".nota3").html(mapa.nota3);
				$(".nota4").html(mapa.nota4);
			});	
		}		
    });					
};
function getFaltas(){
	$(":mobile-pagecontainer").pagecontainer("change", "faltas.html",{ reverse: true, transition: "pop" }); //MUDA PÁGINA
	$.ajax({
        type: "GET",
        url: host+"servicosmobile.php", 
        data: {
		action: "mapa",	  
        matricula: storage.getItem('matricula'),
        curso: storage.getItem('curso'),
		ano: storage.getItem('ano'),
		disciplina: storage.getItem('disciplina'),
        },            
        contentType: "application/json; charset=utf-8",
        success: function (retorno){
			mostrarUsuario();
			$.each(retorno, function(x, mapa){
				$(".disciplina").html(storage.getItem("disciplinaNome"));
				$(".falta1").html(mapa.falta1);
				$(".falta2").html(mapa.falta2);
				$(".falta3").html(mapa.falta3);
				$(".falta4").html(mapa.falta4);
			});	
		}		
    });					
};
function voltar(){
	pag = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	switch(pag){
		case "anos.html":
			getCursos();
			break;
		
		case "disciplinas.html":
			getAnos(storage.getItem("curso"));
			break;
		case "mapa.html":
			getDisciplinas(storage.getItem("ano"));
			break;
			
		case "faltas.html":
			geral();
			break;
			
		case "notas.html":
			geral();
			break;
	}
};
function geral(){
	getMapa(storage.getItem("disciplina"));
};

function sair(){	
			$("#situacao").html("<div class='alert alert-info text-center'>Insira seus dados</div>");
			$(":mobile-pagecontainer").pagecontainer("change", "index.html",{ reverse: true, transition: "fade" }); //MUDA PÁGINA
			$("#login").val('');
			$("#senha").val('');	
}; 
function home(){
    $(":mobile-pagecontainer").pagecontainer("change", "cursos.html",{ reverse: true, transition: "fade" }); //MUDA PÁGINA
	getCursos();
};
	
