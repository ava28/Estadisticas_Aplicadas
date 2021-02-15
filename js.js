var operacion;
var Secuencia;
var tamanio;
var intervalo;
var rango;
var repeticiones;
var menor;
var mayor;
var primerV=null;
var sigV=null;
var repeticiones;
var frecuencia;
var valor;
$( document ).ready(function() {
    swal({
        title: "Estadistica Aplicada!",
        text: "Trabajo realizado por Abraham Vega, Luisa Patiño, Leonel Flores, Héctor Holguín y Gerardo Muela",
        icon: "success",
        button: "Entrar y probar",
      });
});
//#region radioButtonList
function Media(){
    operacion=1;
    document.getElementById('Media').style.display = 'block';
    document.getElementById('Moda').style.display = 'none';
    document.getElementById('Mediana').style.display = 'none';
    limpiar();
}
function Moda(){
    operacion=2;
    document.getElementById('Moda').style.display = 'block';
    document.getElementById('Media').style.display = 'none';
    document.getElementById('Mediana').style.display = 'none';
    limpiar();
}
function Mediana(){
    operacion=3;
    document.getElementById('Mediana').style.display = 'block';
    document.getElementById('Media').style.display = 'none';
    document.getElementById('Moda').style.display = 'none';
    limpiar();
    
}
function limpiar(){
    document.getElementById("Secuencia").value="";
    document.getElementById("Intervalo").value="";
    document.getElementById("sumatoria").value="";
    document.getElementById("tamanio").value="";
    document.getElementById("Resultado").value="";
    document.getElementById("Li").value="";
    document.getElementById("Fi-1").value="";
    document.getElementById("F").value="";
    document.getElementById("Fi+1").value="";
    document.getElementById("a").value="";
    document.getElementById("ResultadoM").value="";
    document.getElementById("LiM").value="";
    document.getElementById("Fi-1M").value="";
    document.getElementById("FM").value="";
    document.getElementById("aM").value="";
    document.getElementById("ResultadoMe"),value="";
    document.getElementById("n").value="";
}
//#endregion

function Agrupar(){
    Secuencia=$("#Secuencia").val();
    intervalo=$("#Intervalo").val();
    Secuencia=Secuencia.replaceAll(","," ");
    tamanio=Secuencia.split(' ').length;
    Secuencia=Secuencia.split(' ');
    valor = [tamanio];
    Secuencia.sort(function(a, b) {
        return a - b;
      });
    for (var i = 0; i < tamanio; i++) {
        valor[i]=parseInt(Secuencia[i]);
    } 
    if(operacion==1){
        if(Secuencia!=null){
        cargarGridMedia();
        }
        else{
            alert("Debes escribir la lista de numeros a analizar");
        }
    }
    if(operacion==2){
        if(Secuencia!=null && intervalo!=null){  
            cargarGridModa();
        }
        else{
            alert("Debes escribir la lista de numeros a analizar y el intervalo indicado");
        }
    }
    if(operacion==3){
        if(Secuencia!=null && intervalo!=null){
            cargarGridMediana();
        }
        else{
            alert("Debes escribir la lista de numeros a analizar y el intervalo indicado");
        }
       
    }
    if(operacion==null){
        swal({
            title: "Elecciona una opció",
            icon: "warning",
            button: "OK",
          });
    }
}

//#region Media
function cargarGridMedia(){
    var Xi=[tamanio]
    var Xi = [...new Set(valor)];
    var FX = []; 
    var total=Xi.length;
    var cont=0;
    var sumatoria=0;
    var resultado;
    var Fi = [];
        Fi=[total];
    
    for(i=0;i<Xi.length;i++){
        for(j=0;j<  valor.length;j++){
            if(valor[j]==Xi[i]){
                cont++;
                Fi[i]=cont;
            } 
        }
        cont=0;
    }
    for (var i = 0; i < total; i++) {
        FX[i]=Xi[i]*Fi[i];
    }
    for (var i = 0; i < total; i++) {
        sumatoria=sumatoria+FX[i];
    }
    if(tamanio!=null && sumatoria>0){
        resultado=sumatoria/tamanio;
    }
    renderizar(total,Xi,Fi,FX,sumatoria,resultado);
}
function renderizar(total,Xi,Fi,FX,Sumatoria, resultado){
    $("#cuerpoTabla").html("");
    for (var i = 0; i < total; i++){
        $("#cuerpoTabla").append("<tr><td>"+Xi[i]+"</td><td>"+Fi[i]+"</td><td>"+FX[i]+"</td></tr>");
    }
    document.getElementById("sumatoria").value = Sumatoria;
    document.getElementById("tamanio").value = total;
    document.getElementById("Resultado").value = resultado;
}
//#endregion

//#region Moda

function cargarGridModa(){
    var valor = [tamanio];
    var amplitud;
    var cont=0;
    for (var i = 0; i < tamanio; i++) {
        valor[i]=parseInt(Secuencia[i]);
        if(mayor==null && menor==null){
            mayor=valor[i];
            menor=valor[i];
        }
        if(valor[i]<=menor){
            menor=valor[i];
        }
        if(valor[i]>=mayor){
            mayor=valor[i];
        }
     } 
     var conteo=menor;
     amplitud=mayor-menor;
     rango=Math.ceil(amplitud/intervalo);
     intervalo=parseInt(intervalo);
     var Li=[rango];
     var Ls=[rango];
     frecuencia=[rango];
     for(var i = 0; i < rango; i++){
        Li[i]=conteo;
        conteo=conteo+intervalo;
        Ls[i]=conteo;
     }
     for(var i = 0; i < rango; i++){
        for(j=0;j<  valor.length;j++){
            if(valor[j]>=Li[i] && valor[j]<=Ls[i]){
                cont++
                frecuencia[i]=cont;
            }
        }
        cont=0;
     }
     console.log(Li);
     console.log(Ls);
     console.log(frecuencia);
     renderizarModa(Li,Ls,frecuencia,rango);
}

function renderizarModa(Li,Ls,frecuencia,rango){
    $("#cuerpoTablaModa").html("");
    for (var i = 0; i < rango; i++){
        $("#cuerpoTablaModa").append("<tr><td>"+Li[i]+"</td><td>"+Ls[i]+"</td><td>"+frecuencia[i]+"</td></tr>");
    }
    var Fi=menor;
    var Fii;
    var Fiii;
    var lim;
    var amplitud;
    var ResultadoModa;
    for (var i = 0; i < rango; i++){
        if(frecuencia[i]>Fi){
            lim=Li[i];
            Fi=frecuencia[i];
            Fii=frecuencia[i-1];
            Fiii=frecuencia[i+1];
            amplitud=Ls[i]-Li[i];

        }
    }
    console.log(lim);
    console.log(Fi);
    console.log(Fii);
    console.log(Fiii);
    console.log(amplitud);
    ResultadoModa=lim+((Fi-Fii)/((Fi-Fii)+(Fi-Fiii)))*amplitud;
    document.getElementById("Li").value = lim;
    document.getElementById("Fi-1").value = Fii;
    document.getElementById("F").value = Fi;
    document.getElementById("Fi+1").value = Fiii;
    document.getElementById("a").value = amplitud;
    document.getElementById("ResultadoM").value = ResultadoModa;
    
}
//#endregion

//#region Mediana
function cargarGridMediana(){
    var valor = [tamanio];
    var amplitud;
    var cont=0;
    var Acu=0;
    for (var i = 0; i < tamanio; i++) {
        valor[i]=parseInt(Secuencia[i]);
        if(mayor==null && menor==null){
            mayor=valor[i];
            menor=valor[i];
        }
        if(valor[i]<=menor){
            menor=valor[i];
        }
        if(valor[i]>=mayor){
            mayor=valor[i];
        }
     } 
     
     var conteo=menor;
     amplitud=mayor-menor;
     rango=Math.ceil(amplitud/intervalo);
     intervalo=parseInt(intervalo);
     var Li=[rango];
     var Ls=[rango];
     frecuencia=[rango];
     for(var i = 0; i < rango; i++){
        Li[i]=conteo;
        conteo=conteo+intervalo;
        Ls[i]=conteo;
     }
     for(var i = 0; i < rango; i++){
        for(j=0;j<  valor.length;j++){
            if(valor[j]>=Li[i] && valor[j]<=Ls[i]){
                cont++
                frecuencia[i]=cont;
            }
        }
        cont=0;
     }
     var Fa=[rango];
    for(var i = 0; i < rango; i++){
        Fa[i]=Acu+frecuencia[i];
    }
     console.log(Fa);
     renderizarMediana(Li,Ls,frecuencia,rango,Fa);
}

function renderizarMediana(Li,Ls,frecuencia,rango,Fa){
    var Fi=menor;
    var Fii=0;
    var lim;
    var amplitud;
    var ResultadoMediana;
    for (var i = 0; i < rango; i++){
        if(frecuencia[i]>Fi){
            lim=Li[i];
            Fi=frecuencia[i];
            Fii=Fa[i-1]
            amplitud=Ls[i]-Li[i];

        }
    }
    $("#cuerpoTablaMediana").html("");
    
    for (var i = 0; i < rango; i++){
        $("#cuerpoTablaMediana").append("<tr><td>"+Li[i]+"</td><td>"+Ls[i]+"</td><td>"+frecuencia[i]+"</td><td>"+Fa[i]+"</td></tr>");
    }
    ResultadoMediana=lim+((((tamanio/2))-Fii)/Fi)*amplitud;
    document.getElementById("LiM").value = lim;
    document.getElementById("Fi-1M").value = Fii;
    document.getElementById("FM").value = Fi;
    document.getElementById("aM").value = amplitud;
    document.getElementById("ResultadoMe").value = ResultadoMediana;
    document.getElementById("n").value = tamanio;
    
}

//#endregion