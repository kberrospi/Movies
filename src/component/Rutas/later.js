import React, { Fragment } from 'react';
import { Component } from 'react';
import '../Rutas/movie.css'
import ListL from '../listSee'
import './movie.css'


class Favorite extends Component {
    state = {
        movies: [],
        value: 0,
    }

    async peticion(){
        const res = await fetch('http://localhost:3001/later');
        const resJson = await res.json();

        this.setState({
            movies: resJson,
        });
    }


     componentDidMount() {
        this.peticion();

    }

     componentDidUpdate(){
         this.peticion()
    }

    render() {
        return (
            <Fragment>
                 <div className="carousel slide" id="carouselBanner" data-ride="carousel" >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="portada" 
                                src='https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80' 
                                alt="First Slide" height="600px" width="1920px" />
                        </div>
                    </div>
                </div>
                <div className="row-auto text-center info-t">
                        <h2 className="font-weight-bold">Wating List</h2>
                        <hr width="73%" />
                    </div>
                <div className="container">
                    
                    {this.state.movies.map((movie, ind) =>
                            <ListL 
                                url={`/movie/${movie.idp}`} 
                                key={ind} 
                                name={movie.name} 
                                image={movie.image} 
                                movies={this.state.movies}
                                overview={movie.overview}
                                id={movie.idp}
                                />
                               
                    )}
                </div>
            </Fragment>
        );
    }
}

export default Favorite;