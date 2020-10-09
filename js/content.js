var lanIndex = (navigator.language == "es-ES")? 0 : 1;

// fetch("content/content.json").then(response => response.json()).then(json => updateContent(json));
// setTimeout("fetch(\"https://jkutkut.github.io/CV-Jkutkut/content/content.json\").then(response => response.json()).then(json => updateContent(json))", 1000);
fetch("https://jkutkut.github.io/CV-Jkutkut/content/content.json").then(response => response.json()).then(json => updateContent(json));

function updateContent(json){
   console.log("executing update content");
   console.log(json);

   let g = function(arr){
      return (arr.length == 1)? arr[0] : arr[lanIndex];
   }

   // TOP-BAR
   for(let i = 0; i < json["top-bar"]["fields"].length; i++){ // for each element on the top bar
      let href = json["top-bar"]["href"][i]; //get href
      let label = g(json["top-bar"]["fields"][i]); //get label
      let ele = $("<li class=\"nav-item\"><a href=\"" + href + "\" class=\"nav-link\"><span>" + label + "</span></a></li>");
      $("#topBar").append(ele); //add it to the top bar
   }

   // INTRO
   let elems = [];
   elems.push($("<h1>" + json['intro']['name'] + "</h1>")); // add the main name h1
   elems.push($("<span class=\"subheading\">" + g(json['intro']['introMsg']) + "</span>")); // Add the "hey there! I am"
   $("#qualities").attr("data-rotate", "[" + json['intro']['qualities'].map(x => "\"" + g(x) + "\"") + "]"); // Add the qualities as an array of strings

   for(let i = 0; i < elems.length; i++){
      $("#intro").prepend(elems[i]); //Add them at the begining
   }

   // BIO
   elems = []; // clear elems
   elems.push($("<h2 class=\"mb-4\">" + g(json["bio"]["title"]) + "</h2>")); //create the "about me" h2
   elems.push($("<p>" + g(json["bio"]["intro"]) + "</p>")); // create bio text
   
   let list = $("<ul class=\"about-info mt-4 px-md-0 px-2\"></ul>"); //create the list
   for(let i = 0; i < json["bio"]["fields"].length; i++){ //for each element on the list
      let ele = $("<li class=\"d-flex\"><span>" + g(json["bio"]["fields"][i]) + ":</span> <span>" + g(json["bio"]["fieldsData"][i]) + "</span></li>");
      list.append(ele); //add it to the list
   }
   elems.push(list); //add the list to the elemes array

   for(let i = 0; i < elems.length; i++){ //for each element on the array
      $("#bio").append(elems[i]); //add it
   }

   
   //MAIN
   elems = []; //clear array
   let category = $("#page-1").clone(); //category template (education...)
   let ele = $(category.children()[1]); //content template
   ele.children()[1].remove();
   $("#main").empty(); //clear the parent
   category.empty(); //clear the category template
   
   for(let i = 0; i < json["main"].length; i++){ //for each category
      let cate = category.clone(); // create new category
      cate.attr("id", "page-" + (i + 1)); // set id
      let data = (json["main"][i])? json["main"][i] : json["skills"]; //get json-data of Category: education...

      cate.append("<h2 class=\"heading\">" + g(data["type"]) + "</h2>"); //add title
      for(let j = 0; j < data["elements"].length; j++){ //For each element on category
         let elem = ele.clone(); //create new element
         let d = data["elements"][j]; //get json-data of the element

         let c = $("<div class=\"text pl-3\"></div>"); // Create content div
         c.append($("<span class=\"date\">" + d.date + "</span>")); // add the date
         c.append($("<h2>" + g(d.title) + "</h2>")); // add the title
         if(d.subtitle.length != 0){ //if subtitle, add it
            c.append($("<span class=\"position\">" + g(d.subtitle) + "</span>"));
         }
         for(let k = 0; k < d.extra.length; k++){ // for each possible extra info, add it
            c.append($("<p>" + g(d.extra[k]) + "</p>"));
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
      $("#mainNavi").append($("<li><a href=\"#page-" + (i + 1) + "\">" + g(json["main"][i]["type"]) + "</a></li>"));
   }
   $("#mainNavi").append($("<li><a href=\"#page-" + (json["main"].length + 1) + "\">" + g(json["skills"]["type"]) + "</a></li>"));


   //SKILLS
   elems = [];
   let data = json["skills"]["elements"];
   $("#page-5").children("h2").text(g(json["skills"]["type"]));
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

      rEleC.append($("<h3>" + g(data[i].title) + "</h3>"));
      rProgP.append(rProgC);
      rEleC.append(rProgP);
      
      rEleP.append(rEleC);
      elems.push(rEleP);
   }

   for(let i = 0; i < elems.length; i++){
      $("#skills").append(elems[i]);
   }


   // CONTACT ME
   $("#contactmeTitle").text(g(json["contact"]["type"]));
   data = json["contact"]["elements"];
   let childP = $($("#contactmeParent").children()[0]).clone();
   let childC = $(childP.children()[0]).clone();
   childP.empty();
   let imgP = $(childC.children()[0]).clone();
   let linkP = $(childC.children()[1]).clone();
   childC.empty();
   imgP.empty();
   linkP.empty();

   $("#contactmeParent").empty();

   for(let i = 0; i < data.length; i++){
      let eleGP = childP.clone();
      let eleP = childC.clone();

      let imgp = imgP.clone();
      let im = (data[i].href[0] == "mail")? "icon-paper-plane" : "icon-globe";
      imgp.append($("<span class=\"" + im + "\"></span>"));
      eleP.append(imgp);

      let link = linkP.clone();
      link.append($("<h3 class=\"mb-4\">" + g(data[i].title) + "</h3>"));
      let href;
      if (data[i].href[0] == "mail"){
         href = "mailto:" + g(data[i].data);
      }
      else{
         href = data[i].href[1];
      }
      link.append($("<p><a href=\"" + href + "\">" + g(data[i].data) + "</a></p>"));
      eleP.append(link);

      eleGP.append(eleP);

      $("#contactmeParent").append(eleGP);
   }
   console.log("Execution ended");

}