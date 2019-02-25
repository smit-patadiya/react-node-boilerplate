import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';


import Navbar from './common/Navbar';

class Page404 extends Component {

    render() {
        
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template mt-5 mb-5 text-center">
                            <h1 className=''>Oops!</h1>
                            <h2 className=''>404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions mt-3">
                                <Link to="/" className="btn btn-primary btn-lg">
                                    Take Me Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}



export default (Page404);