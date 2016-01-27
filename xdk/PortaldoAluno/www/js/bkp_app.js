function qualquerDisc(value){
	$(":mobile-pagecontainer").pagecontainer("change", "disciplinas.html",{ reverse: false, transition: "slide" }); //MUDA PÁGINA
	$.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/servicosmobile.php", 
                  data: {
				  action: "disciplinas",	  
                  matricula: window.localStorage.getItem('matricula'),
				  curso: value,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (materias){
					$("#dados_aluno").html("<b>"+window.localStorage.getItem('usuario')+"</b><br>"+window.localStorage.getItem('matricula'));	
					
					if(materias.result == false){
						$("#listaDisciplinas").empty();
						$("#listaDisciplinas").html("<div class='alerta'>"+materias.msg+"</div>");
					}else{  
						var Disc = materias;
							
								var dados_disc = "";
							$.each(Disc, function(j, mat){ 
							dados_disc += 	'<button value="'+mat.id+'" class="menu_button">'+mat.nome_curso+'</button>'
							 $("#listaDisciplinas").html(dados_disc);
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
                        dados_curso += 	'<button value="'+course.cod_curso+'" class="menu_button" OnClick="qualquerDisc(this.value)">'+course.nome_curso+'</button>'
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
                        dados_curso += 	'<button value="'+course.cod_curso+'" class="menu_button" OnClick="qualquerDisc(this.value)">'+course.nome_curso+'</button>'
                         $("#listaCursos").html(dados_curso);
                     }); 
					}
				  
                });	
};	

			
			
			
