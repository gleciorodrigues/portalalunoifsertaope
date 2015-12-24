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
var ano_entrada = "";
var ano_saida = "";
var sem_entrada = "";
var sem_saida = "";

function login(evt){
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
                    
                        $(":mobile-pagecontainer").pagecontainer("change", "#principal", { reverse: false, transition:"slide"});
                    
                  $.ajax({
                  type: "GET",
                  url: "http://professor.webcindario.com/portaldoaluno/curso.php", 
                  data: {
                  matricula: json.dados.matricula,
                  },            
                  contentType: "application/json; charset=utf-8",
                  success: function (curso){
                 var Cursos = curso;
                     $.each(Cursos, function(i, course){
                        dados_curso = "<div class='lista_curso_dados'><button value='"+course.cod_curso+"' name='lista_curso_id' id='lista_curso_button'>"+course.nome_curso+"</button></div>";
                         $("#listaCursos").append(dados_curso);
                     });    
                }
                });
                
                }else{
                   
                   $("#situacao").html("<center>Erro:"+json.msg+"</center>");
                }
            }
        });
    };
 //FIM DO LOGIN

//BUSCA DISCIPLINA 
function disciplina(evt){
		$(":mobile-pagecontainer").pagecontainer("change", "#curso_ano",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
        $.ajax({
        type: "GET",
        url: "http://professor.webcindario.com/portaldoaluno/disciplina.php", 
        data:{

                curso: $("#lista_curso_button").val(),
           
            },            
             contentType: "application/json; charset=utf-8",
            //dataType: "jsonp",
            success: function (json) {
 
                if(json.result == true){
                    //redireciona o usuario para pagina
                   $("#dados").html("<b>Aluno: </b>"+dados_usuario+"<br><b>Matrícula:</b> "+dados_matricula);
                    
                        $(":mobile-pagecontainer").pagecontainer("change", "#curso_disciplina", { reverse: false, transition:"slide"});
                    
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
                        dados_curso = "<div class='lista_curso_dados'><button value='"+course.cod_curso+"' name='lista_curso_id' id='lista_curso_button'>"+course.nome_curso+"</button></div>";
                         $("#listaCursos").append(dados_curso);
                     });    
                }
                });
                
                }else{
                   
                   $("#situacao").html("<center>Erro:"+json.msg+"</center>");
                }
            }
        });
    };


			function sair(evt){
                    $(":mobile-pagecontainer").pagecontainer("change", "#login_page",{ reverse: true, transition: "slide" }); //MUDA PÁGINA
					$("#situacao").html("<center>Insira seus dados para entrar</center>"); 
					$("#listaCursos").empty(); //LIMPA OS DADOS 
					   
             };