import React, { Fragment, Component } from 'react';
import img1 from './movie4.jpg'
import './movie.css'
import Card from '../card';


class Search extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        const { match } = this.props;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=4e3c0420013a3d4a58e972d37cfc45cc&query=${match.params.movie.toLowerCase()}`;
        const res = await fetch(url);
        const resJson = await res.json();
        this.setState({
            movies: resJson.results,
        })

    }


    render() {
        const posterImg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";
        const logo = "https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg";

        
        return (
            <Fragment>
                <div>
                    <div className="carousel slide" id="carouselBanner" data-ride="carousel" >
                        <div className="carousel-inner w-100" >
                            <div className="carousel-item active">
                                <img className="portada" src={img1} alt="First Slide" height="600px" width="1920px"></img>
                                <div className="carousel-caption d-none d-md-block">

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className=" row align-items-center justify-content-center">
                        <h2 className="font-weight-bold">Search</h2>
                    </div>
                    <div className="container" >
                        <div className="row mr-auto card-deck align-items-center justify-content-center">
                            {this.state.movies.map((movie, ind) =>
                                <Card key={ind} name={movie.original_title} date={movie.release_date}  img={`${movie.poster_path ? posterImg+movie.poster_path: logo}`} movieId={movie.id}/>
                            )}
                        </div>
                    </div>
                    <br></br>
                </div>
            </Fragment>
        )
    }
}

export default Search;