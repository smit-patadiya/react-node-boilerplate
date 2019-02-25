import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';


import Navbar from './common/Navbar';

class Home extends Component {

	render() {
		const { isAuthenticated, user } = this.props.auth;
		
		return(
			<>
				<Navbar />
				<div className='container-fluid'>


				</div>
			</>
		);
	}
}

Home.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});


export default connect(mapStateToProps, {  })(Home);