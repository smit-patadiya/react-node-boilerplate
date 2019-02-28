import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { logoutUser } from "../actions/authActions";
//import { getSingleQuizById } from "../../../actions/quizActions";
//import { getQuestionsByQuizId } from "../../../actions/questionActions";


import Navbar from './common/Navbar';

class DataLiteracyTest extends Component {

    constructor ( props ) {
        super( props );

        this.state = {
            quizId: ''
        }
    }

    componentWillMount() {
        let quizId = this.state.quizId;
       // this.props.getSingleQuizById(quizId);
       // this.props.getQuestionsByQuizId(quizId);
    }

    render() {
       
        return (
            <>
                <Navbar />
                <div className='container-fluid'>
                    <form className="mt-5">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">1. Which of the following statements best describe your role in your company?</label>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" defaultValue="option1" defaultChecked />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    First radio
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" defaultValue="option1" defaultChecked />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Second radio
                                </label>
                            </div>

                        </div>

                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        );
    }
}

DataLiteracyTest.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser, /*getSingleQuizById, getQuestionsByQuizId*/ })(DataLiteracyTest);