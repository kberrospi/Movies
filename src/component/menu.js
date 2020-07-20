import React, { Component } from 'react';
import img from './movie.svg';
import {Link} from "react-router-dom";


class Menu extends Component {
    /* constructor(props) {
      super(props);
    } */
    state = {
        txt: 'avengers'
    }

    search = () =>{
        
    }   

    search_ch = (e)=>{
        this.setState({
            txt: e.target.value.toLowerCase(),
        })
    }

    render() {
        return (
            <div className="form-group">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark shadow fixed-top">
                    <Link className="navbar-brand" to="/"><img src={img} width="60px" alt="Logo"></img></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favorite">Favorite</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/waitinglist">waiting List</Link>
                            </li>
                        </ul>
                        
                        <form className="form-inline mt-2 mt-md-0"  action={`/search/${this.state.txt}`}>
                            <input className="form-control mr-sm-2" type="text" placeholder="Buscar" aria-label="Buscar" onChange={this.search_ch}/>
                            <button className="btn btn-outline-success my-2 my-sm-0"  type="submit">Search</button>
                        </form>
                        
                    </div>
                </nav>
            </div>   
        );
    }
}

export default Menu;