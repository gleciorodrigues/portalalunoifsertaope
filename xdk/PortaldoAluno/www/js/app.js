/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...

var dados_usuario = "";
var dados_matricula = "";
var dados_curso = "";
var ano_entrada = "";
var ano_saida = "";
var sem_entrada = "";
var sem_saida = "";

function login(evt){
				
            //$("#situacao").html("<b class='show-page-loading-msg' data-theme='c' data-textonly='false' data-textvisible='true' data-msgtext='Entrando ...' data-inline='true' style='text-align: center'></b>");    
            $("#situacao").html("<center>Tentando Conectar...</center>");    
                 $.ajax({
            type: "GET",
			url: "http://professor.webcindario.com/portaldoaluno/login.php", 
            data: {
        
            usuario: $("#login").val(),
            senha: $("#senha").val()
           
            },            
             contentType: "application/json; charset=utf-8",
            //dataType: "jsonp",
            success: function (json) {
 
                if(json.result == true){
					dados_usuario = json.dados.nome;
					dados_matricula = json.dados.matricula;
					//redireciona o usuario para pagina
                   $("#dados").html("<b>"+dados_usuario+"</b><br>"+dados_matricula);
                    
                        $(":mobile-pagecontainer").pagecontainer("change", "cursos.html", { reverse: false, transition:"slide"});
                    
                  $.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/curso.php", 
                  data: {
                  matricula: dados_matricula,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (curso){
				  var Cursos = curso;
						
                     $.each(Cursos, function(i, course){
                        dados_curso += "<option class='lista_curso_dados' value='"+course.cod_curso+"'> "+course.nome_curso+"";
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
function dados(){
	$("#dados").html("<b>"+dados_usuario+"</b><br>"+dados_matricula);		
};

function sair(evt){	
			$("#listaCursos").empty(); //LIMPA OS DADOS 
			$(":mobile-pagecontainer").pagecontainer("change", "index.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
			$("#situacao").html("<center>Insira seus dados para entrar</center>"); 
		 }; 
function home(evt){
    $(":mobile-pagecontainer").pagecontainer("change", "cursos.html",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
	};	
	
//BUSCA DISCIPLINA 
function disciplina(evt){
			dados_curso = $("#lista_curso_button").val();
			
			$.ajax({
			type: "GET",
			url: "http://professor.webcindario.com/portaldoaluno/disciplina.php", 
			data:{
					curso: $("#lista_curso_button").val(),
					matricula: dados_matricula,
				},            
				 contentType: "application/json; charset=utf-8",
				success: function (json) {
						   $(":mobile-pagecontainer").pagecontainer("change", "#cursoano.html#curso_ano", { reverse: false, transition:"slide"}); //MUDA PÁGINA	
						   $("#dados").html("<b>"+dados_usuario+"</b><br>"+dados_matricula);
							
							ano_entrada = parseInt(json.ano_entra);
							ano_saida = parseInt(json.ano_sai);
							for($i=ano_entrada;$i<=ano_saida;$i++){
								for($j =1; $j<=2;$j++){	
								$("#listaAnos").html("<div class='lista_curso_dados'><button value='"+$i+"-"+$j+"' name='curso_ano' id='curso_ano_id' data-uib='jquery_mobile/button' data-ver='0' data-role='button' data-theme='c'>"+$i+"."+$j+"</button></div>");	
								
								}
							}
						}
					
			});
        };

			
			
			
