var lanIndex = 0;
// var lanIndex = (navigator.language == "es-ES")? 0 : 1;

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

   
   //MAIN
   elems = [];
   let category = $("#page-1").clone(); //category template (education...)
   let ele = $(category.children()[1]); //content template
   ele.children()[1].remove();
   $("#main").empty(); //clear the parent
   category.empty(); //clear the category template
   
   for(let i = 0; i < json["main"].length; i++){ //for each category
      let cate = category.clone(); // create new category
      cate.attr("id", "page-" + (i + 1)); // set id
      let data = (json["main"][i])? json["main"][i] : json["skills"]; //get json-data of Category: education...

      cate.append("<h2 class=\"heading\">" + data["type"][lanIndex] + "</h2>"); //add title
      for(let j = 0; j < data["elements"].length; j++){ //For each element on category
         let elem = ele.clone(); //create new element
         let d = data["elements"][j]; //get json-data of the element

         let c = $("<div class=\"text pl-3\"></div>"); // Create content div
         c.append($("<span class=\"date\">" + d.date + "</span>")); // add the date
         c.append($("<h2>" + d.title[0] + "</h2>")); // add the title
         if(d.subtitle.length != 0){ //if subtitle, add it
            c.append($("<span class=\"position\">" + d.subtitle[lanIndex] + "</span>"));
         }
         for(let k = 0; k < d.extra.length; k++){ // for each possible extra info, add it
            c.append($("<p>" + d.extra[k][lanIndex] + "</p>"));
         }
         

         elem.append(c); // add the content to the element
         cate.append(elem); // add the element to the category
      }

      elems.push(cate); // add the category to the array of categories
   }


   for(let i = 0; i < elems.length; i++){ // for each category
      $("#main").append(elems[i]); // add it to the DOM
   }


   //MAINNAV
   for(let i = 0; i < json["main"].length; i++){
      $("#mainNavi").append($("<li><a href=\"#page-" + (i + 1) + "\">" + json["main"][i]["type"][lanIndex] + "</a></li>"));
   }
   $("#mainNavi").append($("<li><a href=\"#page-" + (json["main"].length + 1) + "\">" + json["skills"]["type"][lanIndex] + "</a></li>"));


   //SKILLS
   elems = [];
   let data = json["skills"]["elements"];
   $("#page-5").children("h2").text(json["skills"]["type"][lanIndex]);
   let eleP = $($("#skills").children()[0]).clone(); //skill template parent
   let eleC = $(eleP.children()[0]); //skill template child
   
   let progP = $(eleC.children()[0]);
   let progC = $(progP.children()[0]);
   

   $("#skills").empty(); //remove the template
   eleP.empty(); //clear the template
   eleC.empty(); //clear the template
   progP.empty(); //clear the template
   

   for(let i = 0; i < data.length; i++){
      let rEleP = eleP.clone();
      let rEleC = eleC.clone();
      
      let rProgP = progP.clone();
      let rProgC = progC.clone();

      let d = data[i].percent;
      rProgC.attr("aria-valuenow", d);
      rProgC.css("width", d);
      rProgC.children("span").text(d);

      rEleC.append($("<h3>" + data[i].title[lanIndex] + "</h3>"));
      rProgP.append(rProgC);
      rEleC.append(rProgP);
      
      rEleP.append(rEleC);
      elems.push(rEleP);
   }

   for(let i = 0; i < elems.length; i++){
      $("#skills").append(elems[i]);
   }

   console.log("Execution ended");

}