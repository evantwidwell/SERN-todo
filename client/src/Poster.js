import React from 'react';
import unirest from 'unirest';

class Poster extends React.Component {
    state = {movies: []}
    
   
   sendRequest = (title) => {
    const req = unirest(
      "GET",
      "https://imdb8.p.rapidapi.com/title/auto-complete"
    );
    req.query({
      "q": title
    });
    req.headers({
      "x-rapidapi-key": "a608268fc8mshc69aab12951b152p133669jsne7f7964b8f6f",
    	"x-rapidapi-host": "imdb8.p.rapidapi.com",
    	"useQueryString": true
    });
    req.end((res) => {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
      const movies = res.body.d;
      this.setState({ movies });
    });
  }
   render() {
       
       return (
           
               <div className="poster">
                   <img src={this.state.movies.i.imageUrl} alt="my movie poster"/>
               </div>
           
       )
   }
}
export default Poster;