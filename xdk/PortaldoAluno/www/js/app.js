function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
};
function faltas(){
	$(":mobile-pagecontainer").pagecontainer("change", "faltas.html",{ reverse: true, transition: "pop" }); //MUDA PÁGINA
	$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "mapa",	  
                  matricula: window.localStorage.getItem('matricula'),
                  curso: window.localStorage.getItem('curso'),
				  ano: window.localStorage.getItem('ano'),
				  disciplina: window.localStorage.getItem('disciplina'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (mapa){
					mostrarUsuario();
					$(".disciplina").html(window.localStorage.getItem('disciplina_nome'));
					$(".falta1").html(window.localStorage.getItem('falta1'));
					$(".falta2").html(window.localStorage.getItem('falta2'));
					$(".falta3").html(window.localStorage.getItem('falta3'));
					$(".falta4").html(window.localStorage.getItem('falta4'));
						
				  }	
    });					
};
function geral(){
	$(":mobile-pagecontainer").pagecontainer("change", "mapa.html",{ reverse: false, transition: "pop" }); //MUDA PÁGINA
	$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "mapa",	  
                  matricula: window.localStorage.getItem('matricula'),
                  curso: window.localStorage.getItem('curso'),
				  ano: window.localStorage.getItem('ano'),
				  disciplina: window.localStorage.getItem('disciplina'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (mapa){
					mostrarUsuario();
					$(".mapa").empty();
					$(".disciplina").html(window.localStorage.getItem('disciplina_nome'));
					$(".situacao").html(window.localStorage.getItem('situacao'));
					$(".media_geral").html(window.localStorage.getItem('media'));
					$(".perc_faltas").html(window.localStorage.getItem('faltas'));
						
				  }	
    });					
};
function notas(){
	$(":mobile-pagecontainer").pagecontainer("change", "notas.html",{ reverse: true, transition: "pop" }); //MUDA PÁGINA
	$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "mapa",	  
                  matricula: window.localStorage.getItem('matricula'),
                  curso: window.localStorage.getItem('curso'),
				  ano: window.localStorage.getItem('ano'),
				  disciplina: window.localStorage.getItem('disciplina'),
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (mapa){
					mostrarUsuario();
					$(".disciplina").html(window.localStorage.getItem('disciplina_nome'));
					$(".nota1").html(window.localStorage.getItem('nota1'));
					$(".nota2").html(window.localStorage.getItem('nota2'));
					$(".nota3").html(window.localStorage.getItem('nota3'));
					$(".nota4").html(window.localStorage.getItem('nota4'));
						
				  }	
    });					
};
function buscaNotas(value){
	$(":mobile-pagecontainer").pagecontainer("change", "mapa.html",{ reverse: false, transition: "slide" }); //MUDA PÁGINA
	window.localStorage.setItem('disciplina',value);
	$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "mapa",	  
                  matricula: window.localStorage.getItem('matricula'),
                  curso: window.localStorage.getItem('curso'),
				  ano: window.localStorage.getItem('ano'),
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
						window.localStorage.setItem('disciplina_nome',map.disciplina);  
						window.localStorage.setItem('situacao',map.situacao);  
						window.localStorage.setItem('media',map.mediageral);  
						window.localStorage.setItem('faltas',map.p_falta);  
						window.localStorage.setItem('nota1',map.nota1);  
						window.localStorage.setItem('nota2',map.nota2);  
						window.localStorage.setItem('nota3',map.nota3);  
						window.localStorage.setItem('nota4',map.nota4);  
						window.localStorage.setItem('falta1',map.falta1);  
						window.localStorage.setItem('falta2',map.falta2);  
						window.localStorage.setItem('falta3',map.falta3);  
						window.localStorage.setItem('falta4',map.falta4);  
						
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
	window.localStorage.setItem('ano',value);
	$.ajax({
                type: "GET",
                url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                data: {
				action: "disciplinas",	  
                matricula: window.localStorage.getItem('matricula'),
                curso: window.localStorage.getItem('curso'),
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
	window.localStorage.setItem('curso', value);
	
	$.ajax({
				  
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "lista_anos",	  
                  matricula: window.localStorage.getItem('matricula'),
				  curso: window.localStorage.getItem('curso'),
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
			url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
            data: {
			action: "logar",
            usuario: $("#login").val(),
            senha: $("#senha").val()
            },            
            contentType: "application/json; charset=utf-8",
            success: function (json) {
			  $("#situacao").html("<center></center>"); 
			    if(json.result === true){
				window.localStorage.setItem('usuario', json.dados.nome);
				window.localStorage.setItem('matricula', json.dados.matricula);
				//redireciona o usuario para pagina   
                  $(":mobile-pagecontainer").pagecontainer("change", "cursos.html", { reverse: false, transition:"fade"});
                  $.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
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
            url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
            data: {
				  action: "cursos",	  
                  matricula: window.localStorage.getItem('matricula'),
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
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "lista_anos",	  
                  matricula: window.localStorage.getItem('matricula'),
				  curso: window.localStorage.getItem('curso'),
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
                url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                data: {
				action: "disciplinas",	  
                matricula: window.localStorage.getItem('matricula'),
                curso: window.localStorage.getItem('curso'),
				ano: window.localStorage.getItem('ano'),
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
function mostrarUsuario(){
	$(".dados_aluno").html("<b>"+window.localStorage.getItem('usuario')+"</b> - Mat. "+window.localStorage.getItem('matricula'));	
}		 

function home(){
    $(":mobile-pagecontainer").pagecontainer("change", "cursos.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
			$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "cursos",	  
                  matricula: window.localStorage.getItem('matricula'),
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

			
			
			
