import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Rutas/movie.css'

class Card extends Component {
    render() {

        return (
            <div className="col-bg-3">
                <div className="card cardM">
                    <Link  to={`/movie/${this.props.movieId}`}>
                        <img className="card-img-top" src={this.props.img} height='357px' alt="posster" />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold" >{this.props.name}</h5>
                        <p className="card-text">{this.props.date}</p>
                    </div>
                </div>

            </div>
        )
    }

}

export default Card;
