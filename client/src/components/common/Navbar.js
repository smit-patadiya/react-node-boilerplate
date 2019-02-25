import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/authActions";


class Navbar extends Component {

    constructor( props ){
        super( props );

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutUser();
		this.props.clearCurrentProfile();
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;
       
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-top ">
                <Link className="navbar-brand" to="/"><i className="fas fa-biohazard"></i></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    
                </div>
            </nav>


        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);