var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
            var etiqueta = document.getElementById("lista-canciones");
            var documento = http_request.response;
            let nombre_cancion = ""
            for( i = 0 ; i< documento.length ; i++){
                if(documento[i]=="=" && documento[i+1] == '"'){
                    let j = i;
                    while( documento[j+2] != '"'){
                        nombre_cancion += documento[j+2]
                        j++;
                    }

                }
                if (nombre_cancion != "1.0" && nombre_cancion != ""){
                   let lista = document.createElement("li") ;
                   let texto = document.createTextNode(nombre_cancion);
                   lista.appendChild(texto);
                   etiqueta.appendChild(lista);
                }
                nombre_cancion = "";
            }

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}




window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');
    }
}
