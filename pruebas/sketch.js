var b = 0;
getRepoCount("jkutkut");

function getRepoCount(user, pageindex){
    if(!pageindex){
        pageindex = 1;
        b = 0;
    }
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let res = JSON.parse(xmlHttp.response);
            if(res.length != 0){
                b += res.length;
                // getRepoCount(user, pageindex + 1);
            }
            else{
                console.log(b);
            }
        }
    }
    let url = "https://api.github.com/users/" + user + "/repos?page=" + pageindex;
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}