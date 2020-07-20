import React from 'react';
import './movie.css';
import Details from '../details';

class Movie extends React.Component {
    state = {
        movie: [],
        gen: [],
        lang: [],
        trailer: '',
        characters: [],
    }

    async componentDidMount() {
        const { match } = this.props;
        const apikey = "4e3c0420013a3d4a58e972d37cfc45cc";
        const url = "https://api.themoviedb.org/3/movie/";
        const res = await fetch(`${url}${match.params.movieId}?api_key=${apikey}`);
        const resJson = await res.json(); 

        const trailer = await fetch(`${url}${match.params.movieId}/videos?api_key=${apikey}`)
        const resTrailer = await trailer.json(); 

        const character = await fetch(`${url}${match.params.movieId}/credits?api_key=4e3c0420013a3d4a58e972d37cfc45cc`);
        const resCharacter = await character.json();

        this.setState({
            characters: resCharacter.cast
        })

        if(!resTrailer.results[0]){
            this.setState({ 
                trailer: 'null',
            })
        }else{
            this.setState({
                trailer: resTrailer.results[0].key
            })
        }
        
         resJson.genres.map((e) => 
                this.setState({
                gen: this.state.gen.concat(" " + e.name),

            })
        );

         resJson.spoken_languages.map((e)=>
            this.setState({
                lang: this.state.lang.concat(" " + e.name),
            })
        );

        this.setState({
            movie: resJson,
            
        });

        
    }

    

    backPoster(elem){
        if(!elem){
            return 'https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_960_720.png'
        }

        return "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" + elem;
    }

    posterImg(elem){
        if(!elem){
            return 'https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg';
        }
        return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + elem;
    }   
    
    render() {
        let back_img = this.backPoster(this.state.movie.backdrop_path);
        let poster_img = this.posterImg(this.state.movie.poster_path)
        
        const video = 'https://www.youtube.com/watch?v=';
        return (
            <Details 
                back={back_img} 
                poster={poster_img} 
                title={this.state.movie.original_title} 
                genres={this.state.gen.join()} 
                date={this.state.movie.release_date}
                runtime={this.state.movie.runtime}
                lang={this.state.lang.join()}
                overview={this.state.movie.overview}
                video={video+this.state.trailer}
                id={this.state.movie.id}
                cast={this.state.characters}
            />
        );
    }
}

export default Movie;