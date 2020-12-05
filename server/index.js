const express = require('express')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const db = mysql.createPool({
  host: '34.70.106.43',
  user: 'root',
  password: 'password',
  database: 'CRUDDB'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req,res)=>{
  const sqlSelect = "SELECT * FROM movie_reviews"
  db.query(sqlSelect, (err, result) =>{
    res.send(result);
  } )
})

app.post('/api/insert', (req,res) => {

  const movieName = req.body.movieName
  const movieReview = req.body.movieReview

  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (? , ?)"
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result)
  })
  
});
app.delete('/api/delete/:movieName', (req,res)=>{
  const name = req.params.movieName
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?"

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err)
  })
})
app.put('/api/update', (req,res)=>{
  const movieName = req.body.movieName
  const movieReview = req.body.movieReview
  const sqlUpdate = 
  "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
    console.log(movieName)
  })
})
app.listen(3001, ()=>{
  console.log("running on port 3001");
})