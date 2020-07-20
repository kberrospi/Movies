import React, { Component, Fragment } from 'react';
import './Rutas/movie.css'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class ListFav extends Component {




    del = () => {
        fetch('http://localhost:3001/deleteLater', {
            method: 'POST',
            body: JSON.stringify({ name: this.props.name }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data === 'Removed for See later') {
                    swal("Excelent!", data, "success");
                } else {
                    swal("Sorry!", data, "warning");
                }
            });





    }
    render() {
        return (

            <Fragment>
                <div className="card mb-3 shadow-sm bg-white rounded list-card">
                    <div className="row no-gutters">
                        <div className="col-md-1">
                            <Link to={this.props.url} style={{ textDecoration: "none" }}>
                                <img src={this.props.image} className="card-img poster-list" alt="Poster" />
                            </Link>
                        </div>
                        <div className="col-sm-8">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">{this.props.name}</h5>
                                <p><smal><em>{this.props.overview.substr(0, 140) + "..."}</em></smal></p>

                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={this.del}>
                                    Eliminar
                                </Button>



                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>


        )
    }
}

export default ListFav;