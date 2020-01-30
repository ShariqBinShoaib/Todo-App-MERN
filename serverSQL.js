//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
    user: "sa",
    password: "sbsansari",
    server: "localhost",
    database: "db_practice"
};

//Function to connect to database and execute query
var executeQuery = function (res, query, message) {

    sql.close();

    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database : " + err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, data) {
                if (err) {
                    console.log("Error while querying database : " + err);
                    res.send(err);
                }
                else {
                    if (message) {
                        console.log(message);
                        res.send(message);
                    }
                    else {
                        res.send(data.recordset)
                    }
                }
            });
        }
    });
}

//GET API
app.get("/api/user", function (req, res) {
    var query = "SELECT * FROM tbl_todoList";
    executeQuery(res, query);
});

//POST API
app.post("/api/user/add", function (req, res) {
    var query = "INSERT INTO tbl_todoList VALUES ('" + req.body.taskTitle + "','" + req.body.taskStatus + "')";
    executeQuery(res, query, 'Record Inserted Sucessfully!');
});

//PUT API
app.put("/api/user/:id", function (req, res) {
    var query = "UPDATE tbl_todoList SET taskStatus = '" + req.body.taskStatus + "' WHERE taskId = " + req.params.id;
    executeQuery(res, query, 'Record Updated Sucessfully!');
});

// DELETE API
app.delete("/api/user/:id", function (req, res) {
    var query = "DELETE FROM tbl_todoList WHERE taskId = " + req.params.id;
    executeQuery(res, query, 'Record Deleted Sucessfully!');
});