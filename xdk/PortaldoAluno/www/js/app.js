var storage = window.localStorage;
var host = "http://professor.webcindario.com/portaldoaluno/";
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
};
function faltas(){
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
                  success: function (mapa){
					mostrarUsuario();
					$(".disciplina").html(storage.getItem('disciplina_nome'));
					$(".falta1").html(storage.getItem('falta1'));
					$(".falta2").html(storage.getItem('falta2'));
					$(".falta3").html(storage.getItem('falta3'));
					$(".falta4").html(storage.getItem('falta4'));
						
				  }	
    });					
};
function geral(){
	$(":mobile-pagecontainer").pagecontainer("change", "mapa.html",{ reverse: false, transition: "pop" }); //MUDA PÁGINA
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
                  success: function (mapa){
					mostrarUsuario();
					$(".mapa").empty();
					$(".disciplina").html(storage.getItem('disciplina_nome'));
					$(".situacao").html(storage.getItem('situacao'));
					$(".media_geral").html(storage.getItem('media'));
					$(".perc_faltas").html(storage.getItem('faltas'));
						
				  }	
    });					
};
function notas(){
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
                  success: function (mapa){
					mostrarUsuario();
					$(".disciplina").html(storage.getItem('disciplina_nome'));
					$(".nota1").html(storage.getItem('nota1'));
					$(".nota2").html(storage.getItem('nota2'));
					$(".nota3").html(storage.getItem('nota3'));
					$(".nota4").html(storage.getItem('nota4'));
						
				  }	
    });					
};
function buscaNotas(value){
	$(":mobile-pagecontainer").pagecontainer("change", "mapa.html",{ reverse: false, transition: "slide" }); //MUDA PÁGINA
	storage.setItem('disciplina',value);
	$.ajax({
                  type: "GET",
                  url: host+"servicosmobile.php", 
                  data: {
				  action: "mapa",	  
                  matricula: storage.getItem('matricula'),
                  curso: storage.getItem('curso'),
				  ano: storage.getItem('ano'),
				  disciplina: value,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (mapa){
					mostrarUsuario();
					$(".mapa").empty();
					if(mapa.result == false){
						$(".mapa").html("<div class='alerta'>"+mapa.msg+"</div>");
					}else{
						var M = mapa;
						$.each(M, function(x, map){
						storage.setItem('disciplina_nome',map.disciplina);  
						storage.setItem('situacao',map.situacao);  
						storage.setItem('media',map.mediageral);  
						storage.setItem('faltas',map.p_falta);  
						storage.setItem('nota1',map.nota1);  
						storage.setItem('nota2',map.nota2);  
						storage.setItem('nota3',map.nota3);  
						storage.setItem('nota4',map.nota4);  
						storage.setItem('falta1',map.falta1);  
						storage.setItem('falta2',map.falta2);  
						storage.setItem('falta3',map.falta3);  
						storage.setItem('falta4',map.falta4);  
						
							$(".disciplina").html(map.disciplina);
							$(".situacao").html(map.situacao);
							$(".media_geral").html(map.mediageral);
							$(".perc_faltas").html(map.p_falta);
						});
					}	
				}
				  
    });
}; 
function qualquerDisc(value){
	$(":mobile-pagecontainer").pagecontainer("change", "disciplinas.html",{ reverse: false, transition: "slide" }); //MUDA PÁGINA
	storage.setItem('ano',value);
	$.ajax({
                type: "GET",
                url: host+"servicosmobile.php", 
                data: {
				action: "disciplinas",	  
                matricula: storage.getItem('matricula'),
                curso: storage.getItem('curso'),
				ano: value,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (disciplinas){
					mostrarUsuario();
					var disciplina = "";
					if(disciplinas.result == false){
						$(".lista_disc").empty();
						$(".lista_disc").html("<div class='alerta'>"+disciplinas.msg+"</div>");
					}else{  
							//>'+disc.nome_curso+'
							var Disc = disciplinas;
							var dados_disc = "";
							$.each(Disc, function(j, disc){ 
							dados_disc = '<button value="'+disc.id+'" class="btn btn-block btn-lg btn-success padrao" OnClick="buscaNotas(this.value)">'+disc.nome_curso+'</button>';
							$(".lista_disc").append(dados_disc);
							
							}); 	
					}
				}
				  
    });
};
function buscarAno(value){
	$(":mobile-pagecontainer").pagecontainer("change", "anos.html",{ reverse: false, transition: "slide" }); //MUDA PÁGINA
	storage.setItem('curso', value);
	
	$.ajax({
				  
                  type: "GET",
                  url: host+"servicosmobile.php", 
                  data: {
				  action: "lista_anos",	  
                  matricula: storage.getItem('matricula'),
				  curso: storage.getItem('curso'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (materias){
					mostrarUsuario();
				 	if(materias.result == false){
						$(".lista_anos").empty();
						$(".lista_anos").html("<div class='alerta'>"+materias.msg+"</div>");
					}else{  
							var Disc = materias;
							var anos = "";
							$.each(Disc, function(j, mat){ 
							  anos += 	'<button value="'+mat.ano+'" class="btn btn-lg btn-block btn-success padrao" OnClick="qualquerDisc(this.value)">'+mat.ano+'</button>'
							$(".lista_anos").html(anos);
							}); 
					}
				}
				  
    });
};
function entrar(){
            $("#situacao").html("<center>Conectando...</center>");    
			mostrarUsuario();
			$.ajax({
            type: "GET",
			url: host+"servicosmobile.php", 
            data: {
			action: "logar",
            usuario: $("#login").val(),
            senha: $("#senha").val()
            },            
            contentType: "application/json; charset=utf-8",
            success: function (json) {
			  $("#situacao").html("<center></center>"); 
			    if(json.result === true){
				storage.setItem('usuario', json.dados.nome);
				storage.setItem('matricula', json.dados.matricula);
				//redireciona o usuario para pagina   
                  $(":mobile-pagecontainer").pagecontainer("change", "cursos.html", { reverse: false, transition:"fade"});
                  $.ajax({
                  type: "GET",
                  url: host+"servicosmobile.php", 
                  data: {
				  action: "cursos",	  
                  matricula: json.dados.matricula,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (curso){
				  var Cursos = curso;
						
						mostrarUsuario();
						
						var dados_curso = "";
						$.each(Cursos, function(i, course){ 
                        dados_curso += 	'<button value="'+course.cod_curso+'" style="color: white;" class="btn btn-lg btn-success btn-block padrao" OnClick="buscarAno(this.value)">'+course.nome_curso+'</button>'
                         $(".lista_cursos").html(dados_curso);
                     }); 
					}
				  
                });
                
                }else{
                   
                   $("#situacao").html("<center>"+json.msg+"</center>");
                }
            }
        });
    };
 //FIM DO LOGIN


//FUNÇÃO PARA LOGOFF
function sair(){	
			$("#situacao").html("<center>Insira seus dados</center>");
			$(":mobile-pagecontainer").pagecontainer("change", "index.html",{ reverse: true, transition: "fade" }); //MUDA PÁGINA
			$("#login").val('');
			$("#senha").val('');	
}; 
function onBackKeyDown(){
	pag = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	switch(pag){
		/*case "index.html":
		$("#situacao").html("<center>Saindo...</center>");
		App.exitApp();
		break;
		*/
		case "cursos.html":
		$(":mobile-pagecontainer").pagecontainer("change", "index.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
		$("#login").val('');
		$("#senha").val('');
		$("#situacao").html("<center>Insira seus dados</center>");	
		break;
		
		case "anos.html":
		$(":mobile-pagecontainer").pagecontainer("change", "cursos.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
		$.ajax({
            type: "GET",
            url: host+"servicosmobile.php", 
            data: {
				  action: "cursos",	  
                  matricula: storage.getItem('matricula'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (curso){
				  var Cursos = curso;
						
						mostrarUsuario();
						
						var dados_curso = "";
						$.each(Cursos, function(i, course){ 
                        dados_curso += 	'<button value="'+course.cod_curso+'" style="color: white;" class="btn btn-lg btn-success btn-block padrao" OnClick="buscarAno(this.value)">'+course.nome_curso+'</button>'
                         $(".lista_cursos").html(dados_curso);
                     }); 
					}
				  
        });
		break;
		case "disciplinas.html":
		$(":mobile-pagecontainer").pagecontainer("change", "anos.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
		$.ajax({
		          type: "GET",
                  url: host+"servicosmobile.php", 
                  data: {
				  action: "lista_anos",	  
                  matricula: storage.getItem('matricula'),
				  curso: storage.getItem('curso'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (materias){
					mostrarUsuario();
				 	if(materias.result == false){
						$(".lista_anos").empty();
						$(".lista_anos").html("<div class='alerta'>"+materias.msg+"</div>");
					}else{  
							var Disc = materias;
							var anos = "";
							$.each(Disc, function(j, mat){ 
							  anos += 	'<button value="'+mat.ano+'" class="btn btn-lg btn-block btn-success padrao" OnClick="qualquerDisc(this.value)">'+mat.ano+'</button>'
							$(".lista_anos").html(anos);
							}); 
					}
				}
				  
		});	
		break;
		case "mapa.html":
		$(":mobile-pagecontainer").pagecontainer("change", "disciplinas.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
		$.ajax({
                type: "GET",
                url: host+"servicosmobile.php", 
                data: {
				action: "disciplinas",	  
                matricula: storage.getItem('matricula'),
                curso: storage.getItem('curso'),
				ano: storage.getItem('ano'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (disciplinas){
					mostrarUsuario();
					var disciplina = "";
					if(disciplinas.result == false){
						$(".lista_disc").empty();
						$(".lista_disc").html("<div class='alerta'>"+disciplinas.msg+"</div>");
					}else{  
							//>'+disc.nome_curso+'
							var Disc = disciplinas;
							var dados_disc = "";
							$.each(Disc, function(j, disc){ 
							dados_disc = '<button value="'+disc.id+'" class="btn btn-block btn-lg btn-success padrao" OnClick="buscaNotas(this.value)">'+disc.nome_curso+'</button>';
							$(".lista_disc").append(dados_disc);
							
							}); 	
					}
				}
				  
		});
		break;
		case "faltas.html":
			geral();
		break;
		case "notas.html":
			geral();
		break;
	}
	
	
}; 		 
function home(){
    $(":mobile-pagecontainer").pagecontainer("change", "cursos.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
			$.ajax({
                  type: "GET",
                  url: host+"servicosmobile.php", 
                  data: {
				  action: "cursos",	  
                  matricula: storage.getItem('matricula'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (curso){
				  mostrarUsuario();
				  var Cursos = curso;				 	
						dados_curso = "";
						$.each(Cursos, function(i, course){ 
                        dados_curso += 	'<button value="'+course.cod_curso+'" class="btn btn-lg btn-success btn-block padrao" OnClick="buscarAno(this.value)">'+course.nome_curso+'</button>'
                        $(".lista_cursos").html(dados_curso);
                     }); 
					}
				  
                });	
};	
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
};
function mostrarUsuario(){
	//$(".dados_aluno").html("<b>"+storage.getItem('usuario')+"</b> - Mat. "+storage.getItem('matricula'));	
	$(".dados_aluno").html("<b>"+storage.getItem('usuario')+"</b> - Mat. "+storage.getItem('matricula'));	
	//document.write("Teste");
}
			
			
			
