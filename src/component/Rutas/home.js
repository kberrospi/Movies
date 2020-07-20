import React from 'react';
import './style.scss'
import './movie.css'
import Card from '../card';



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    async componentDidMount() {

        const apikey = "4e3c0420013a3d4a58e972d37cfc45cc";
        const url = "https://api.themoviedb.org/3/movie/popular?";
        const res = await fetch(`${url}api_key=${apikey}`);
        const resJson = await res.json();
        this.setState({
            movies: resJson.results,
        });

    }

    render() {
        const posterImg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

        return (

            <div>
                <div className="carousel slide" id="carouselBanner" data-ride="carousel" >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="portada" src='https://cdn.pixabay.com/photo/2018/04/01/17/54/people-3281583_960_720.jpg' alt="First Slide" height="600px" width="1920px" />
                        </div>
                    </div>
                </div>

                <div className=" row align-items-center justify-content-center">
                    <h2 className="font-weight-bold">Movies</h2>
                </div>
                 <div className="container" >
                    <div className="row mr-auto card-deck align-items-center justify-content-center">
                        {this.state.movies.map((movie, ind) =>
                            <Card key={ind} name={movie.original_title} date={movie.release_date}  img={posterImg + movie.poster_path} movieId={movie.id} />
                        )}
                        
                    </div>
                   
                </div>

                <br></br>
            </div>
        );
    }

}

export default Home;