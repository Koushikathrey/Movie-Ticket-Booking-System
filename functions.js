
//This function will fill dropdown with cities on page-load
function city()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            results.forEach(function(city,index) {
                var x = document.getElementById("cities");
                var option = document.createElement("option");
                option.text = city.city;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("GET","/cities", true);
    //xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}

function oncitySelection(value)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            document.getElementById("movies").options.length = 1;
            results.forEach(function(city,index) {
                var x = document.getElementById("movies");
                var option = document.createElement("option");
                option.text = city.mname;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("POST","/movie", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{"citydata":"'+value+'"}');
}

function onmovieSelection(value)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            document.getElementById("theatres").options.length = 1;
            results.forEach(function(movie,index) {
                var x = document.getElementById("theatres");
                var option = document.createElement("option");
                option.text = movie.tname;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }
    var cityname = document.getElementById("cities").value;
    xhttp.open("POST","/theatre", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{"moviedata":"'+value+'", "citydata":"'+cityname+'" }');
}

//This function will fill dropdown with seats on page-load
function seat()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            results.forEach(function(seat) {
                var x = document.getElementById("seats");
                var option = document.createElement("option");
                option.text = seat.sename;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("GET","/seats", true);
    //xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}

//This function is to display the amount of ticket
function onseatSelection(value)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            document.getElementById("price").options.length = 1;
            results.forEach(function(seats,index) {
                var x = document.getElementById("price");
                var option = document.createElement("option");
                option.text = seats.price;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("POST","/amount", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{"seatdata":"'+value+'"}');
}

//This function will fill dropdown with date on page-load
function date()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            results.forEach(function(date,index) {
                var x = document.getElementById("date");
                var option = document.createElement("option");
                option.text = date.sdate;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("GET","/sdate", true);
    //xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}

//This function will fill dropdown with date on page-load
function show()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            var results = JSON.parse(result);
            results.forEach(function(seat,index) {
                var x = document.getElementById("time");
                var option = document.createElement("option");
                option.text = seat.sname;
                if(option.text!="")
                {
                    x.add(option);
                }
            });
        }
    }

    xhttp.open("GET","/stime", true);
    //xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}

function insertuser()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            console.log(result);
            if(result == "exists")
            {
                alert("Username already exists");
            }
            else if(result == "Registered!")
            {
                window.location.href = "thanks.html";
            }
            else 
            {
                alert("Registration unsuccessful");
            }
        }
    }
    var cname = document.getElementById('text1').value;
    var username = document.getElementById('text2').value;
    var cphone = document.getElementById('ph').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var city = document.getElementById('text3').value;

    //alert("InsertUser from action");

    xhttp.open("POST","/insert", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{"cname":"'+cname+'", "username":"'+username+'", "cphone":"'+cphone+'", "password":"'+password+'", "email":"'+email+'", "city":"'+city+'"}');

}

function insertticket()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            console.log(result);
            loadticket();
            if(result == "exists")
            {
                alert("Seat already Booked");
            }
            else if(result == "Payment_done!")
            {
                window.location.href = "index.html";
            }
            else 
            {
                alert("Registration unsuccessful");
            }
        }   
    }
    var city = document.getElementById("cities").value;
    var mname = document.getElementById("movies").value;
    var tname = document.getElementById("theatres").value;
    var sename = document.getElementById("seats").value;
    var sdate = document.getElementById("date").value;
    var sname = document.getElementById("time").value;
    var pamt = document.getElementById("price").value;

    xhttp.open("POST","/insertt", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{"city":"'+city+'", "mname":"'+mname+'", "tname":"'+tname+'", "sename":"'+sename+'", "sdate":"'+sdate+'", "sname":"'+sname+'", "pamt" :"'+pamt+'"}');

}
function validuser()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            if(result=="login_success")
            {
                window.location.href = "welcome.html";
            }
            else if(result=="alert")
            {
                alert("Username or password wrong");
            }
        }
    }
    var username = document.getElementById('text').value;
    var password = document.getElementById('password').value;

    xhttp.open("POST","/valid", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send('{ "username":"'+username+'", "password":"'+password+'"}');

}

function loadticket(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;
            
            var results = JSON.parse(result);
            console.log(results);
            
            results.forEach((comment)=>
        {
            var node = document.createElement("div");
            var mname = document.createElement("H3"); 
            console.log(mname);
            var tname = document.createElement("H4");
            console.log(tname);
            var sdate = document.createElement("H5");
            var sname = document.createElement("H6");
            var sename = document.createElement("H7");

             node.className = 'card-body';
             mname.className = 'card-title';
             tname.className = 'card-subtitle';

              var textmname = document.createTextNode('Movie : ' + comment.mname);
              var texttname = document.createTextNode('Theatre : ' + comment.tname);
              var textsename =  document.createTextNode('Seat : ' + comment.sename);
              var textsdate = document.createTextNode('Date : ' + comment.sdate);
              var textsname =  document.createTextNode('Show : ' + comment.sname);
               

             mname.appendChild(textmname);
             tname.appendChild(texttname);
             sename.appendChild(textsename);
             sdate.appendChild(textsdate);
             sname.appendChild(textsname);
               

             node.appendChild(mname);
             node.appendChild(tname);
             node.appendChild(sename);
             node.appendChild(sdate);
             node.appendChild(sname);
               

            var k = document.getElementById('comments').appendChild(node);
 
             //alert(comment.mname);
        });
        }
    }

    xhttp.open("GET", "/ticket", true);
    //xhttp.send('{"city":"'+city+'", "mname":"'+mname+'", "tname":"'+tname+'", "sename":"'+sename+'", "sdate":"'+sdate+'", "stime":"'+stime+'", "pamt" :"'+pamt+'"}');
    xhttp.send();
}