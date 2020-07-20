import React, { Fragment, Component } from 'react';
import './Rutas/movie.css';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import swal from 'sweetalert';
import CardCast from './cardCast';



class Details extends Component {

    async peticion() {

        const apikey = "4e3c0420013a3d4a58e972d37cfc45cc";
        const url = "https://api.themoviedb.org/3/movie/";
        const res = await fetch(`${url}${this.props.id}?api_key=${apikey}`);
        const resJson = await res.json();
        return resJson
        
    }

    async sendData(category) {
        const resJson = await this.peticion();
        let cat = { category: category }
        let json = Object.assign(cat, resJson);

        fetch('http://localhost:3001/', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if ((data === `Save to ${category}`) || (data === 'Save succesfull')) {
                    swal("Excelent!", data, "success");
                } else {
                    swal("Sorry!", data, "warning");
                }

            });
    }

    addCategory = (category) => {
        this.sendData(category)
    }

    render() {
        const img = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
        return (
            <Fragment>
                <div className="headerMovie ">
                    <img className="portada" src={this.props.back} alt="portada" />
                </div>
                <div className="space"></div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 text-right">
                            <img className="poster" src={this.props.poster} alt="poster" />
                        </div>
                        <div className="col-sm-6 text-left">
                            <h1 className="font-weight-bold">{this.props.title}</h1>
                            <hr></hr><br></br>
                            <p><strong>Genres: </strong>{this.props.genres}</p>
                            <p><strong>Release date: </strong>{this.props.date}</p>
                            <p><strong>Running time: </strong>{this.props.runtime} min.</p>
                            <p><strong>Original Languages: </strong>{this.props.lang}</p>
                            <p><strong>Overview: </strong><br />{this.props.overview} </p>
                            <div className="row">
                                <div className="col-auto">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<StarBorderRoundedIcon />}
                                        onClick={() => this.addCategory('Favorite')}>Add to Favorite
                                    </Button>
                                </div>
                                <div className="col-auto">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<QueryBuilderRoundedIcon />}
                                        onClick={() => this.addCategory('See later')}>See later
                                        </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="container text-center">
                        <h1 className="font-weight-bold">Cast</h1>
                        <hr width="100%"></hr>
                    </div>
                    <div className="container cast-group item-align-center">
                        <div className="row flex-row flex-nowrap cast">
                            {this.props.cast.map((e, ind)=>
                                <div className="row-sm-2 p-2" key={ind}>
                                    
                                    <CardCast  img={`${e.profile_path === null ? 'https://avicars.app/img/icons/avatar1.png': img+e.profile_path}`}
                                        name={e.name} 
                                        character={e.character}
                                    />
                                </div> 
                            )}
                        </div>
                    </div>
                    <div className="row-auto text-center info-t">
                        <h1 className="font-weight-bold">Trailer</h1>
                        <hr width="80%"></hr>
                        <ReactPlayer
                            className="trailer"
                            volume={0.2}
                            width="1100px"
                            height="571px"
                            url={this.props.video}
                            controls>

                        </ReactPlayer>
                    </div>
                   
                </div>
                <br></br>
            </Fragment>

        )
    }
}

export default Details;