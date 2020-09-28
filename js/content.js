var lanIndex = (navigator.language == "es-ES")? 0 : 1;
var content;

fetch("content/content.json").then(response => response.json()).then(json => updateContent(json));

function updateContent(json){
   console.log("executing update content");
   console.log(json);
   content = json;
   // TOP-BAR
   for(let i = 0; i < json["top-bar"]["fields"][lanIndex].length; i++){
      let href = json["top-bar"]["href"][i];
      let label = json["top-bar"]["fields"][lanIndex][i];
      let ele = $("<li class=\"nav-item\"><a href=\"" + href + "\" class=\"nav-link\"><span>" + label + "</span></a></li>");
      $("#topBar").append(ele);
   }

   // INTRO

   // BIO
   console.log("Execution ended");

}