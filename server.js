var http = require('http');
var fs = require('fs');
var con = require("./dbconnection"); 

var hostname = '127.0.0.1'
var port = '3000'

var server = http.createServer((req,res) => {
  if(req.url === '/' || req.url === '/login.html')
  {
    res.statuscode = 200;
    res.setHeader('Content-type','text/html');
    fs.createReadStream('./login.html').pipe(res);
  }
  else if(req.url == '/style.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./style.css').pipe(res);
  }
  else if(req.url == '/cine.jpg')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/jpg');
    fs.createReadStream('./cine.jpg').pipe(res);
  }
  else if(req.url == '/forgot.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./forgot.html').pipe(res);
  }
  else if(req.url == '/styleforg.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./styleforg.css').pipe(res);
  }
  else if(req.url == '/recover.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./recover.html').pipe(res);
  }
  else if(req.url == '/stylerecov.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./stylerecov.css').pipe(res);
  }
  else if(req.url == '/register.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./register.html').pipe(res);
  }
  else if(req.url == '/stylereg.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./stylereg.css').pipe(res);
  }
  else if(req.url == '/thanks.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./thanks.html').pipe(res);
  }
  else if(req.url == '/stylethanks.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./stylethanks.css').pipe(res);
  }
  else if(req.url == '/dropt.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./dropt.html').pipe(res);
  }
  else if(req.url == '/styledropt.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./styledropt.css').pipe(res);
  }
  else if(req.url == '/seat.jpg')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/jpg');
    fs.createReadStream('./seat.jpg').pipe(res);
  }
  else if(req.url == '/welcome.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./welcome.html').pipe(res);
  }
  else if(req.url == '/stylewelcome.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./stylewelcome.css').pipe(res);
  }
  else if(req.url == '/index.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./index.html').pipe(res);
  }
  else if(req.url == '/styleindex.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./styleindex.css').pipe(res);
  }
  else if(req.url == '/thank_you.html')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream('./thank_you.html').pipe(res);
  }
  else if(req.url == '/stylethankyou.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/css');
    fs.createReadStream('./stylethankyou.css').pipe(res);
  }

  if(req.method == 'POST' && req.url == '/valid')
  {
    res.statuscode = 200;
    //res.setHeader('Content-type','text/plain');

    var content = '';
    req.on('data', function(data){
       content += data;

       var obj = JSON.parse(content);

       var conn =con.getConnection();
       //console.log(obj.username);
       //console.log(obj.password);

       conn.query('SELECT rid FROM rlogs WHERE username= (?) AND password =(?)',[obj.username,obj.password], function(error, results, fields){
       if(error) throw error;
       if(results.length > 0)
       {
         console.log("Login successful")
         res.end("login_success");
       }
       else{
         console.log("Login unsuccessful")
         res.end("alert");
       }
       });
       
       conn.end();

      });
  }

  else if(req.method == 'POST' && req.url == '/insert')
  {
    res.statuscode = 200;
    res.setHeader('Content-type','text/plain');

    var content = '';
    req.on('data', function(data){
       content += data;

       var obj = JSON.parse(content);

       var conn =con.getConnection();

       conn.query('SELECT rid FROM rlogs where username = (?)',[obj.username],function(error, results, fields){
       if (results.length > 0)
       {
         res.end("exists");
       }
       else 
       {
        var obj = JSON.parse(content);

        var conn =con.getConnection();

        console.log(content);
       conn.query('INSERT INTO customers (customers.cname, customers.username, customers.cphone, customers.password, customers.email, customers.city ) VALUES (?, ?, ?, ?, ?, ?)',[obj.cname,obj.username,obj.cphone,obj.password,obj.email,obj.city], function(error, results, fields){
        if(error) throw error;
        console.log("User successfully Registered!");
        res.end("Registered!");
       });
       conn.end();
       }
      });
       
       conn.end();

      });
  }
  else if(req.method == 'POST' && req.url == '/insertt')
  {
    res.statuscode = 200;
    res.setHeader('Content-type','text/plain');

    var content = '';
    req.on('data', function(data){
       content += data;

       var obj = JSON.parse(content);
       //console.log(obj.mname);

       var conn =con.getConnection();

       conn.query('SELECT tno FROM tickets where mname = (?) AND tname = (?) AND sename = (?) AND sdate = (?) AND sname = (?)',[obj.mname,obj.tname,obj.sename,obj.sdate,obj.sname],function(error, results, fields){
        if (results.length > 0)
        {
          res.end("exists");
        }
        else 
        {
         var obj = JSON.parse(content);
 
         var conn =con.getConnection();

          conn.query('INSERT INTO tickets (tickets.city, tickets.mname, tickets.tname, tickets.sename, tickets.sdate, tickets.sname ) VALUES (?, ?, ?, ?, ?, ?)',[obj.city,obj.mname,obj.tname,obj.sename,obj.sdate,obj.sname,], function(error, results, fields){
            if(error) throw error;
            console.log("Ticket inserted successfully!");
          });
          
          conn.query('INSERT INTO payment (payment.pamt) VALUES (?)',[obj.pamt], function(error, results, fields){
            if(error) throw error;
            console.log("Payment inserted successfully!");
            res.end("Payment_done!")
          });
          conn.end();
        }
      });
       
       conn.end();

      });
  }
  else if(req.method == "GET" && req.url == '/ticket')
  {
      res.statusCode == 200;
      res.setHeader('Content-Type', 'application/json');
      console.log("Display-Ticket server");
      var conn = con.getConnection();
    
      conn.query('SELECT * FROM tickets ORDER BY tno DESC LIMIT 1', function(error, results, fields){
          if(error) throw error;
          
          var comments = JSON.stringify(results);
          console.log("Ticket generated successfully")
          //console.log(comments);
          res.end(comments);
      });

      conn.end(); 
  }  
  else if(req.method == 'GET' && req.url =='/functions.js')
  {
    res.writeHead(200, {'Content-Type':'text/javascript'});
    fs.createReadStream('./functions.js').pipe(res);
  }
  
  if(req.method=="GET" && req.url == "/cities")
  {
    console.log("Drop-City server");
    var conn = con.getConnection();

    conn.query('SELECT DISTINCT city FROM movies', function(error, results, fields){
     if(error) throw error;
     console.log("Success on cities dropdown!");
     var resultsString = JSON.stringify(results);
     res.end(resultsString);
    });
    conn.end();
  }

  if(req.method=="POST" && req.url == "/movie")
  {
    console.log("Drop-Movie server");
    var content = '';
    req.on('data',function(data)
    {
        content+=data;
        var city = JSON.parse(content).citydata;
        console.log(city);
        var conn =con.getConnection();
        conn.query('SELECT DISTINCT mname FROM movies where city= (?)',[city], function(error, results, fields){
        if(error) throw error;
        var resultsString = JSON.stringify(results);
        console.log("Success on Movie dropdown");
        res.end(resultsString);
      });
      conn.end();
    });
  }

  if(req.method=="POST" && req.url == "/theatre")
  {
    console.log("Drop-Theatre server");
    var content = '';
    req.on('data',function(data)
    {
        content+=data;
        var movie = JSON.parse(content).moviedata;
        var city = JSON.parse(content).citydata;
        console.log(movie,city);
        var conn =con.getConnection();
        conn.query('SELECT DISTINCT tname FROM theatres  where mname= (?) and city= (?)',[movie,city], function(error, results, fields){
        if(error) throw error;
        var resultsString = JSON.stringify(results);
        console.log("Success on Theatre dropdown");
        res.end(resultsString);
      });
      conn.end();
    });
  }

  if(req.method=="GET" && req.url == "/seats")
  {
    console.log("Drop-Seat server");
    var conn = con.getConnection();

    conn.query('CALL `getseats`()',function(err, results, fields){
        console.log("Success on seat dropdown!");
        if (err) throw err
        var resultsS = JSON.stringify(results[0]);
        //console.log(resultsS);
        res.end(resultsS);
    });
    conn.end();
  }

  if(req.method=="GET" && req.url == "/sdate")
  {
    console.log("Drop-Date server");
    var conn = con.getConnection();

    conn.query('SELECT DISTINCT sdate FROM shows', function(error, results, fields){
     if(error) throw error;
     console.log("Success on Date dropdown!");
     var resultsString = JSON.stringify(results);
     //console.log(results);
     res.end(resultsString);
    });
    conn.end();
  }

  if(req.method=="POST" && req.url == "/amount")
  {
    console.log("Drop-Amount server");
    var content = '';
    req.on('data',function(data)
    {
        content+=data;
        var seats = JSON.parse(content).seatdata;
        console.log(seats);
        var conn =con.getConnection();
        conn.query('SELECT DISTINCT price FROM seats where sename= (?)',[seats], function(error, results, fields){
        if(error) throw error;
        var resultsString = JSON.stringify(results);
        console.log("Success on price dropdown");
        res.end(resultsString);
      });
      conn.end();
    });
  }

  if(req.method=="GET" && req.url == "/stime")
  {
    console.log("Show server");
    var conn = con.getConnection();

    conn.query('SELECT DISTINCT sname FROM shows', function(error, results, fields){
     if(error) throw error;
     console.log("Success on show dropdown!");
     var resultsString = JSON.stringify(results);
     res.end(resultsString);
    });
    conn.end();
  }

});


server.listen(port, hostname, () =>{
  console.log('server running at http://$(hostname):$(port)/')
});
