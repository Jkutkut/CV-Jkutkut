var lanIndex = (navigator.language == "es-ES")? 0 : 1;


window.onload = function(){
   fetch("content/content.json").then(response => response.json()).then(json => updateContent(json));
}

function updateContent(json){
    
}