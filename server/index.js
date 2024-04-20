const express= require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"surveys"
});

// Express route to handle form submission
app.post("/create", (req, res) => {
    const {
        fullname,
        email,
        dateofbirth,
        contactnumber,
        food, // Receive food as an array
        movies,
        Radio,
        Eatout,
        Tv
    } = req.body;

    const foodString = food.join(", "); // Convert array to comma-separated string

    db.query("INSERT INTO survey(fullname,email,dateofbirth,contactnumber,food,movie,radio,eatout,tv) VALUES (?,?,?,?,?,?,?,?,?)",
        [fullname, email, dateofbirth, contactnumber, foodString, movies, Radio, Eatout, Tv],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});
app.get('/survey/food_count', (req, res) => {
    const sql = "SELECT food, COUNT(*) AS count FROM survey GROUP BY food";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});
app.get('/survey/age', (req, res) => {
    const sql = "SELECT dateofbirth, TIMESTAMPDIFF(YEAR, dateofbirth, CURDATE()) AS age FROM survey";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get('/',(re,res)=>{
    return res.json("front end side");
});

app.get('/survey',(req,res)=>{
    const sql = "SELECT * FROM survey";
    db.query(sql,(err, data) =>{
        if(err)return res.json(err);
        return res.json(data);
    });
});
app.get('/survey/count', (req, res) => {
    const sql = "SELECT COUNT(*) AS surveyCount FROM survey";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        const count = data[0].surveyCount;
        return res.json({ count });
    });
});
app.get('/survey/rates', (req, res) => {
    const sql = "SELECT AVG(movie) AS movieAverage, AVG(radio) AS radioAverage, AVG(eatout) AS eatoutAverage, AVG(tv) AS tvAverage FROM survey";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        const avarages = {
            movieAverage: data[0].movieAverage || 0,
            radioAverage: data[0].radioAverage || 0,
            eatoutAverage: data[0].eatoutAverage || 0,
            tvAverage: data[0].tvAverage || 0
        };
        return res.json(avarages);
    });
});
app.get('/survey/max_age', (req, res) => {
    const sql = "SELECT MAX(TIMESTAMPDIFF(YEAR, dateofbirth, CURDATE())) AS maxAge FROM survey";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
});

app.get('/survey/min_age', (req, res) => {
    const sql = "SELECT MIN(TIMESTAMPDIFF(YEAR, dateofbirth, CURDATE())) AS minAge FROM survey";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
});
// Add this route handler to your existing Express server code

app.get('/survey/exists', (req, res) => {
    const email = req.query.email;

    // Check if a survey response exists for the given email address
    const sql = "SELECT COUNT(*) AS count FROM survey WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "An error occurred while checking survey existence." });
        }

        const surveyExists = data[0].count > 0;
        return res.json({ exists: surveyExists });
    });
});




app.listen(8081,() =>{
    console.log("yey, my server is running on port 8081");
});
