var lanIndex = (navigator.language == "es-ES")? 0 : 1;

// fetch("content/content.json").then(response => response.json()).then(json => updateContent(json));
fetch("https://jkutkut.github.io/CV-Jkutkut/content/content.json").then(response => response.json()).then(json => updateContent(json));

function updateContent(json){
   console.log("executing update content");
   console.log(json);

   // TOP-BAR
   for(let i = 0; i < json["top-bar"]["fields"][lanIndex].length; i++){
      let href = json["top-bar"]["href"][i];
      let label = json["top-bar"]["fields"][lanIndex][i];
      let ele = $("<li class=\"nav-item\"><a href=\"" + href + "\" class=\"nav-link\"><span>" + label + "</span></a></li>");
      $("#topBar").append(ele);
   }

   // INTRO
   let elems = [];
   elems.push($("<h1>" + json['intro']['name'] + "</h1>"));
   elems.push($("<span class=\"subheading\">" + json['intro']['introMsg'][lanIndex] + "</span>"));
   $("#qualities").attr("data-rotate", "[" + json['intro']['qualities'][lanIndex].map(x => "\"" + x + "\"") + "]");

   for(let i = 0; i < elems.length; i++){
      $("#intro").prepend(elems[i]); //Add them at the begining
   }

   // BIO
   elems = []; // clear elems
   elems.push($("<h2 class=\"mb-4\">" + json["bio"]["title"][lanIndex] + "</h2>"));
   elems.push($("<p>" + json["bio"]["intro"][0] + "</p>")); ///FJALKFJÑALJFLKAJÑFAKJFÑAJDFLÑAJDKLFJADFJÑADFJALJFÑLAJFLAJ
   
   let list = $("<ul class=\"about-info mt-4 px-md-0 px-2\"></ul>");
   for(let i = 0; i < json["bio"]["fields"][0].length; i++){
      let ele = $("<li class=\"d-flex\"><span>" + json["bio"]["fields"][lanIndex][i] + ":</span> <span>" + json["bio"]["fieldsData"][lanIndex][i] + "</span></li>");
      list.append(ele);
   }
   elems.push(list);

   for(let i = 0; i < elems.length; i++){
      $("#bio").append(elems[i]); 
   }


   //MainNav
   for(let i = 0; i < json["main"].length; i++){
      $("#mainNavi").append($("<li><a href=\"#page-" + (i + 1) + "\">" + json["main"][i]["type"][lanIndex] + "</a></li>"));
   }
   $("#mainNavi").append($("<li><a href=\"#page-" + (json["main"].length + 1) + "\">" + json["skills"]["type"][lanIndex] + "</a></li>"))
   
   //Main
   elems = [];
   for(let i = 0; i < 1; i++){
   // for(let i = 0; i < json["main"].length + 1; i++){
      let cont = $("<div id=\"page-" + (i + 1) + "\" class= \"page\"></div>");
      
      let data;
      data = (json["main"][i])? json["main"][i] : json["skills"]; //Category: education...

      
      cont.append("<h2 class=\"heading\">" + data["type"][lanIndex] + "</h2>"); //Title
      
      for(let j = 0; j < data["elements"].length; j++){
         let el = $("<div class=\"resume-wrap d-flex ftco-animate\"><div class=\"icon d-flex align-items-center justify-content-center\"><span class=\"flaticon-ideas\"></span></div>");
         let e = $("<div class=\"text pl-3\"></div>");
         let ele = data["elements"][j]; //element from category

         e.append($("<span class=\"date\">" + ele.date + "</span>"));
         e.append($("<h2>" + ele.title[0] + "</h2>"));
         if(ele.subtitle.length != 0){
            e.append($("<span class=\"position\">" + ele.subtitle[lanIndex] + "</span>"));
         }

         el.append(e);
         cont.append(el);
      }


      elems.push(cont);
   }


   for(let i = 0; i < elems.length; i++){
      $("#main").append(elems[i]);
   }


   console.log("Execution ended");

}