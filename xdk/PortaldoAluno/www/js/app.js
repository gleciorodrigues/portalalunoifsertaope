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
					$("#dados_alu").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));	
					
					$("#mapaNotas").empty();
					if(mapa.result == false){
						$("#mapaNotas").html("<div class='alerta'>"+mapa.msg+"</div>");
					}else{
						var M = mapa;
						$.each(M, function(x, map){
							$("#mapaNotas").html("<center><h3><table class='tabelaNotas'><tr><th>Situação:</th><td>"+map.situacao+"</td></tr><tr><th colspan='2' class='imp'>Notas</th></tr><tr><th>Nota 1ºUn</th><td>"+map.nota1+"</td></tr><tr class='imp'><th>Nota 2ºUn</th><td>"+map.nota2+"</td></tr><tr><th>Nota 3ºUn</th><td>"+map.nota3+"</td></tr><tr class='imp'><th>Nota 4ºUn</th><td>"+map.nota4+"</td></tr></table></h3></center>");
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
					$("#dados_aluno").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));	
					
					if(disciplinas.result == false){
						$("#listaDisciplinas").empty();
						$("#listaDisciplinas").html("<div class='alerta'>"+disciplinas.msg+"</div>");
					}else{  
							var Disc = disciplinas;
							var dados_disc = "";
							$.each(Disc, function(j, disc){ 
							dados_disc += '<button value="'+disc.id+'" class="menu_button" OnClick="buscaNotas(this.value)">'+disc.nome_curso+'</button>'
							//dados_disc +=   '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false"><h2>'+disc.nome_curso+'</h2>Dados</li>';

							 $("#listaDisciplinas").html(dados_disc);
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
				  $("#dados_al").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));					
					if(materias.result == false){
						$("#listaAnos").empty();
						$("#listaAnos").html("<div class='alerta'>"+materias.msg+"</div>");
					}else{  
							var Disc = materias;
							var anos = "";
							$.each(Disc, function(j, mat){ 
							  anos += 	'<button value="'+mat.ano+'" class="menu_button" OnClick="qualquerDisc(this.value)">'+mat.ano+'</button>'
							$("#listaAnos").html(anos);
							}); 
					}
				}
				  
    });
};
function entrar(){
            $("#situacao").html("<center>Conectando...</center>");    
			$.ajax({
            type: "GET",
			url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
            data: {
			action: "logar",
            usuario: $("#login").val(),
            senha: $("#senha").val()
            },            
             contentType: "application/json; charset=utf-8",
            //dataType: "jsonp",
            success: function (json) {
			  $("#situacao").html("<center></center>"); 
			
                if(json.result === true){
				//intel.xdk.cache.setCookie("usuario", json.dados.nome,1);		
				//intel.xdk.cache.setCookie("matricula",json.dados.matricula,1);
				window.localStorage.setItem('usuario', json.dados.nome);
				window.localStorage.setItem('matricula', json.dados.matricula);
					
					
					//redireciona o usuario para pagina   
                        $(":mobile-pagecontainer").pagecontainer("change", "cursos.html", { reverse: false, transition:"slide"});
                    
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
						
						$("#dados").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));	
					    	
						var dados_curso = "";
						$.each(Cursos, function(i, course){ 
                        dados_curso += 	'<button value="'+course.cod_curso+'" class="menu_button" OnClick="buscarAno(this.value)">'+course.nome_curso+'</button>'
                         $("#listaCursos").html(dados_curso);
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
			$(":mobile-pagecontainer").pagecontainer("change", "index.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
					
}; 
		 
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
				  var Cursos = curso;				 	
						$("#dados").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));	
					    	
						dados_curso = "";
						$.each(Cursos, function(i, course){ 
                        dados_curso += 	'<button value="'+course.cod_curso+'" class="menu_button" OnClick="buscarAno(this.value)">'+course.nome_curso+'</button>'
                         $("#listaCursos").html(dados_curso);
                     }); 
					}
				  
                });	
};	

			
			
			
