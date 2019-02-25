import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class AdminSidebar extends Component {


    render() {
       
        const urlRoot = '/dashboard';
        return (
            <nav className="bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to={`${urlRoot}/quiz`}>
                                Quiz
                            </Link>
                        </li>
                    </ul>


                </div>
            </nav>
        );
    }
}


export default (AdminSidebar);