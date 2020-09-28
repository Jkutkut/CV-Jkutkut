var lanIndex = (navigator.language == "es-ES")? 0 : 1;
var content;

window.onload = function(){
   fetch("content/content.json").then(response => response.json()).then(json => updateContent(json));
}

function updateContent(json){
   content = json;
   for(let i = 0; i < json["top-bar"]["fields"][lanIndex].length; i++){
      let href = json["top-bar"]["href"][lanIndex][i];
      let label = json["top-bar"]["fields"][lanIndex][i];
      let ele = $("<li class=\"nav-item\"><a href=\"" + href + "\" class=\"nav-link\"><span>" + label + "</span></a></li>")
      $("#topBar").append(ele)
   }
}