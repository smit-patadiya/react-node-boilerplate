import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import classnames from 'classnames';
import { MDBTooltip } from 'mdbreact';
import isEmpty from '../../../validation/is-empty';

import { getAllQuiz, addQuiz } from "../../../actions/quizActions"

class AllQuiz extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            quiz: [],
            modal: false,
            quizName: '',
            quizTitle: '',
            quizUniqueId: '',
            addNewLoading: false,
            error: {}
        }
    }

    componentWillMount ( ) {
        this.props.getAllQuiz();
    }

    componentDidMount ( ) {
        
    }

    modalBackdropClicked = () => {

    }

    componentWillReceiveProps(nextProps) {
        
        if( nextProps.quiz ){

            if ( nextProps.quiz.addNewLoading ){
                this.setState({
                    addNewLoading: true
                });
            } else if ( nextProps.quiz.isAddNewAction ){

                var quiz = this.state.quiz;
                if (nextProps.quiz.data) {
                    quiz.push(nextProps.quiz.data);
                }

                this.setState({
                    quiz: quiz,
                    addNewLoading: false,
                    
                })
                
            } else {
                this.setState({
                    quiz: nextProps.quiz.data
                })
            }

        }
    }

    onToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onCancel = () => {
        this.setState({
            modal: !this.state.modal,
            quizName: '',
            quizTitle: '',
            quizUniqueId: '',
        })
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const error = {};
        if (this.state.quizName === '') {
            error.quizName = true;
        }
        if (this.state.quizTitle === '') {
            error.quizTitle = true;
        }
        if (this.state.quizUniqueId === '') {
            error.quizUniqueId = true;
        }

        if ( !isEmpty(error) ){
            this.setState({ error: error });
            return;
        }else{
            this.setState({ error: {}, modal: false });
        }

        var newQuizData = {
            name: this.state.quizName,
            title: this.state.quizTitle,
            uniqueId: this.state.quizUniqueId,
        }

        this.props.addQuiz(newQuizData);
        
    }

    render() {
        
        const quizes = this.state.quiz;
        const loading = this.props.quiz.loading;
        const errors = this.state.error
        

        return (
            <div className='pt-2'>
                { loading && (<div className='mt-5 mb-5 text-center'>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>) }

                { !loading && (
                    <div className=''>
                        <div className='d-block'>
                            <h3 className='d-inline-block'>List Of Quiz ( Data Literacy Test )</h3>
                            <button type='button' className='btn btn-primary float-right' onClick={this.onToggle}>Add Quiz</button>
                        </div>
                        
                        <div className='table-responsive'>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Short Name</th>
                                        <th scope="col">View</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { quizes && quizes.length > 0 && quizes.map((item, index) => (
                                        <tr key={item._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.title}</td>
                                            <td>[{item.uniqueId}]</td>
                                            <td>
                                                <Link to={'/'}>
                                                    <i className="far fa-eye" />
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/dashboard/single-quiz/${item._id}`}>
                                                    <i className="far fa-edit" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    { quizes && quizes.length == 0 && (
                                        <tr>
                                            <td colSpan='6' className='text-center'>
                                                Result Not Found
                                            </td>
                                        </tr>
                                    ) }
                                    { this.state.addNewLoading && (
                                        <tr>
                                            <td colSpan='6' className='text-center'>
                                                <div className="spinner-grow text-black-50 spinner-grow-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) }

                                </tbody>
                            </table>
                        </div>
                        <Modal visible={this.state.modal} onClickBackdrop={this.onToggle}>
                            <div className="modal-header">
                                <h5 className="modal-title">Create Quiz</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className='form-group d-flex'>
                                        <input type="text" className={classnames('form-control', {
                                            'is-invalid': errors.quizName
                                        })} name='quizName' onChange={this.onChange} value={this.state.quizName} placeholder="Quiz Name" />
                                        <div className='pt-2 ml-2'>
                                            <MDBTooltip
                                                placement="left"
                                                componentClass="border-0 p-0"
                                                tag="div"
                                                component="div"
                                                tooltipContent="For admin reference Only">
                                                <i className="fas fa-info-circle text-black-50" />
                                            </MDBTooltip>
                                        </div>
                                    </div>
                                    <div className='form-group d-flex'>
                                        <input type="text" className={classnames('form-control', {
                                            'is-invalid': errors.quizTitle
                                        })} name='quizTitle' onChange={this.onChange} value={this.state.quizTitle} placeholder="Quiz Title" />
                                        <div className='pt-2 ml-2'>
                                            <MDBTooltip
                                                placement="left"
                                                componentClass="border-0 p-0"
                                                tag="div"
                                                component="div"
                                                tooltipContent="Visible on Quiz/Test page">
                                                <i className="fas fa-info-circle text-black-50" />
                                            </MDBTooltip>
                                        </div>
                                    </div>
                                    <div className='form-group d-flex'>
                                        <input type="text" className={classnames('form-control', {
                                            'is-invalid': errors.quizUniqueId
                                        })} name='quizUniqueId' onChange={this.onChange} value={this.state.quizUniqueId} placeholder="Quiz Unique ID" />
                                        <div className='pt-2 ml-2'>
                                            <MDBTooltip
                                                placement="left"
                                                componentClass="border-0 p-0"
                                                tag="div"
                                                component="div"
                                                tooltipContent="Must be unique without any space">
                                                <i className="fas fa-info-circle text-black-50" />
                                            </MDBTooltip>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.onCancel}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>
                                    Submit
                                </button>
                            </div>
                        </Modal>

                    </div>
                    

                ) }
                
            </div>
        );
    }
}

AllQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
}

const mapStateToProps = ( state ) => ({
    quiz: state.quiz
})

export default connect(mapStateToProps, { getAllQuiz, addQuiz })(AllQuiz);