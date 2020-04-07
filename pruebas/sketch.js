var b = 0;
httpGetAsync("https://api.github.com/users/jkutkut/repos?page=", 1);

function httpGetAsync(theUrl, pageindex){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let res = JSON.parse(xmlHttp.response);
            if(res.length != 0){
                b += res.length;
                httpGetAsync(theUrl, pageindex + 1);
            }
            else{
                console.log(b);
            }
        }
    }
    xmlHttp.open("GET", theUrl+pageindex, true); // true for asynchronous 
    xmlHttp.send(null);
}

