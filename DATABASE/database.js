
var mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
// Create a MySQL connection
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
// Function to establish a connection to the database
function connectToDatabase(callback) {
  con.connect(function(err) {
    if (err) {
      console.error("Error connecting to local MySQL server:", err);
      return callback(err);
    }
    console.log("Connected to local MySQL server!");
    callback(null);
  });
}

function setupDatabase(callback) {
  con.query("CREATE DATABASE IF NOT EXISTS lacaphedb", function(err) {
    if (err) {
      console.error("Error creating database:", err);
      return callback(err);
    }
    console.log("Database created");

    con.query("USE lacaphedb", function(err) {
      if (err) {
        console.error("Error using database:", err);
        return callback(err);
      }

      var dropsql = "DROP TABLE IF EXISTS testtable";
      con.query(dropsql, function(err) {
        if (err) {
          console.error("Error dropping table:", err);
          return callback(err);
        }
        console.log("Test table dropped if it exists");

        var tablesql = "CREATE TABLE testtable(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), image VARCHAR(255), price DECIMAL(5,2), type VARCHAR(2))";
        con.query(tablesql, function(err) {
          if (err) {
            console.error("Error creating table:", err);
            return callback(err);
          }
          console.log("Test table created");

           var insertsql = "INSERT INTO testtable (name, image,price,type) VALUES('boba tea','https://www.unionsquareawards.org/wp-content/uploads/2019/09/images3904-5d882e0c1594c.jpg',2.50,'t'),"
    + "('lychee Tea','https://s3-media0.fl.yelpcdn.com/bphoto/Z0nZF9zYTaMVT5nbbGuxDA/o.jpg',3.75, 't'),"
    + "('Test Coffee','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&webp=true&resize=500,454',5.00, 'c'),"
    + "('Some Signature Drink', 'http://1.bp.blogspot.com/-JFw1MGN5OoM/UD-BpCdlxzI/AAAAAAAAEMQ/brNZEjdhZWU/s1600/Lychee%2BMartini%2B3fc.jpg', 5.00, 's'),"
    + "('Ice Blended Drink', 'https://www.gfbfood.com.my/wp-content/uploads/2020/03/Untitled-design-1.jpg', 2.75, 'i');"
  con.query(insertsql, function (err) {
    if (err) throw err;
    console.log("Test table filled");
  })
          con.query(insertsql, function(err) {
            if (err) {
              console.error("Error inserting data:", err);
              return callback(err);
            }
            console.log("Test table filled");

            var getsql = "SELECT * FROM testtable";
            con.query(getsql, function(err, result) {
              if (err) {
                console.error("Error selecting data:", err);
                return callback(err);
              }
              const data = JSON.stringify(result);
              console.log(data);
              callback(null, data); // Successful completion
            });
          });
        });
      });
    });
  });
}


/**
 * Function that gets the connection instance
 * 
 * @returns The connection instance (Don't reference object directly)
 */
function getCon() {
  if (!con) {
    connectToDatabase();
  }
  return con;
}

module.exports = {
  connectToDatabase, setupDatabase, getCon
}


