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
   let elems = [];
   elems.push($("<span class=\"subheading\">" + json['intro']['introMsg'][lanIndex] + "</span>"));
   elems.push($("<h1>" + json['intro']['name'] + "</h1>"));
   elems.push($("<h2><span class=\"txt-rotate\" data-period=\"2000\" data-rotate=\"[" + json['intro']['qualities'][lanIndex].map(x => "\'" + x + "\'") + "]\"></span></h2>"));

   for(let i = 0; i < elems.length; i++){
      $("#intro").append(elems[i]);
   }

   // BIO
   console.log("Execution ended");

}