import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Navbar from './common/Navbar';
import AllQuiz from './layouts/dashboard/AllQuiz';
import SingleQuiz from './layouts/dashboard/SingleQuiz';


import AdminSidebar from './common/AdminSidebar';

class Dashboard extends Component {

    renderSwitch = ( param, param2 ) => {

        switch( param ){
            case 'quiz' : return <AllQuiz />; 
            case 'single-quiz': return <SingleQuiz path={param2} />;            
            default: return (<div>Not Found</div>)
        }
    }

    render() {
    
        const urlParams = (this.props.match.params.path) ? this.props.match.params.path : '';
        const urlParams2 = (this.props.match.params.path2) ? this.props.match.params.path2 : '';

        return (
            <>
                <Navbar />
                <div className='container-fluid'>
                    <div className="row">
                        <div className='col-md-4 col-lg-3 col-xl-2 pl-0 pr-0'>
                            <AdminSidebar />
                        </div>
                        <div className='col-md-8 col-lg-9 col-xl-10' >
                            {this.renderSwitch(urlParams, urlParams2)}
                        </div>

                    </div>
                </div>
            </>    
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, {})(Dashboard);