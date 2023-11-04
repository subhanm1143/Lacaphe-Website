const express = require('express');
const app = express();
const port = 3000; 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

var mysql = require('mysql2')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DemBoys"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to local mysql server!");

  con.query("CREATE DATABASE IF NOT EXISTS lacaphedb")
    if (err) throw err;
    console.log("Database created");
  con.query("use lacaphedb")
    if (err) throw err;
  
  var dropsql = "DROP TABLE IF EXISTS testtable"
  con.query(dropsql, function (err){
    if (err) throw err;
    console.log("Test table droped if it exits");
  })

  var tablesql = "CREATE TABLE testtable(id INT AUTO_INCREMENT PRIMARY KEY, drink VARCHAR(255), image VARCHAR(255), price DECIMAL(5,2))"
  con.query(tablesql, function (err){
    if (err) throw err;
    console.log("Test table created");
  })

  var insertsql = "INSERT INTO testtable (drink, image,price) VALUES('boba tea','https://www.unionsquareawards.org/wp-content/uploads/2019/09/images3904-5d882e0c1594c.jpg',2.50),('lychee Tea','https://s3-media0.fl.yelpcdn.com/bphoto/Z0nZF9zYTaMVT5nbbGuxDA/o.jpg',3.75);"
  con.query(insertsql, function (err){
    if (err) throw err;
    console.log("Test table filled");
  })
  var getsql = "SELECT * from testtable"
  con.query(getsql, function(err, result){
    if(err) console.log(err);
    else {
      const data = JSON.stringify(result)
      console.log(data)
    }
  })
});