import "./App.css";
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Poster from './Poster'
import unirest from 'unirest';

function Movies() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [poster, setPoster] = useState('')

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data)
      console.log(response.data)
    })
  }, []);

  // sendRequest = (title) => {
  //   const req = unirest(
  //     "GET",
  //     "https://imdb8.p.rapidapi.com/title/auto-complete"
  //   );
  //   req.query({
  //     "q": title
  //   });
  //   req.headers({
  //     "x-rapidapi-key": "a608268fc8mshc69aab12951b152p133669jsne7f7964b8f6f",
  //   	"x-rapidapi-host": "imdb8.p.rapidapi.com",
  //   	"useQueryString": true
  //   });
  //   req.end((res) => {
  //     if (res.error) throw new Error(res.error);
  //     console.log(res.body);
  //     const poster = res.body.i[0].imageUrl;
  //     this.setPoster({ poster });
  //   });
  // }
  const submitReview = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review
    })
      setMovieList([...movieReviewList, {movieName: movieName, movieReview:review }])
    }
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }
  const updateReview = (movieName) =>{
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName,
      movieReview: newReview
    });
      setNewReview("");
    };

    const sendRequest = (title) => {
      const req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");
      req.query({
        "page": "1",
        "r": "json",
        "s": title
      });
      req.headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_API_KEY"
      });
      req.end((res) => {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
      });
    }
  return (
    <div className="App">
      <h1>Review your movie</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" 
        name="movieName" 
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
        />
        <label>Review:</label>
        <input 
        type="text" 
        name="review" 
        onChange={(e) => {
          setReview(e.target.value);
        }}/>
        <button onClick={submitReview} >Submit</button>

        {movieReviewList.map((val) =>{
          return <div className="card">
            <h1>{val.movieName} </h1>
            <p>{val.movieReview}</p>
            {/* <Poster {...poster}></Poster> */}
            <div className='poster'></div>

            <button onClick={()=> deleteReview(val.movieName)}>Delete</button>
            <input 
            type="text" 
            name="updateInput"
            onChange = {(e) => {
              setNewReview(e.target.value);
            }}></input>
            <button onClick={()=> {updateReview(val.movieName)}}>Edit</button>
            
            </div>
        })}
      </div>
    </div>
  );
}

export default Movies;
