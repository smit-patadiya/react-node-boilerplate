import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import classnames from 'classnames';
import { MDBTooltip } from 'mdbreact';
import isEmpty from '../../../validation/is-empty';
import SingleQuestion from './SingleQuestion';
import axios from 'axios';

import { getSingleQuizById, addQuiz } from "../../../actions/quizActions";
import { getQuestionsByQuizId, addQuestion } from "../../../actions/questionActions";



class SingleQuiz extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            quizId: props.path,
            quizData: {},
            questionData: [],
            modal: false,
            error: {},
            loading1: true,
            loading2: true,
            loading3: false,
        }
    }

    componentWillMount() {
        let quizId = this.state.quizId;
        this.props.getSingleQuizById(quizId);
        this.props.getQuestionsByQuizId(quizId);
    }

    componentDidMount() {

    }

    modalBackdropClicked = () => {

    }

    componentWillReceiveProps(nextProps) { 
       
        if ( nextProps.quiz ) {
            this.setState({
                quizData: nextProps.quiz.data,
                loading1: nextProps.quiz.loading
            });
        }

        if ( nextProps.question ) {
            this.setState({
                questionData: nextProps.question.data,
                loading2: nextProps.question.loading
            });
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

    onAddQuestion = (event) => {

        const data = {
            quizId: this.state.quizId,
            question: '',
            options: [{
                optionId: '',
                optionText: '',
            }],
            sequence: this.state.questionData.length + 1
        }

        this.setState({
            loading3: true,
        });

        axios
            .post('/api/dataLiteracy/add-question', data)
            .then( response => {
                let newState = this.state.questionData;
                newState.push(response.data);

                this.setState({
                    loading3: false,
                    questionData: newState
                })
                
            });

    }


    deleteQuestion = ( data ) => {
        
        axios
            .post('/api/dataLiteracy/delete-question', data)
            .then(response => {
                if( response.data ){
                    this.setState({
                        questionData: this.state.questionData.filter((s, sidx) => data.index !== sidx),
                    })
                }
              
            });

    }

    render() {

        let quizData = this.state.quizData;

        const errors = this.state.error

        return (
            <div className='pt-2'>
                { this.state.loading1 && (<div className='mt-5 mb-5 text-center'>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)}

                { !this.state.loading1 && (
                    <div className=''>
                        <div className='d-block'>
                            
                            <h3 className='d-inline-block'>
                                { quizData.name && (
                                    <>
                                        {quizData.name}
                                    </>
                                )}
                                { !quizData.name && (
                                    <>
                                        <span className='bg-light pt-3 d-inline-block' style={{ width: '250px' }}></span>
                                    </>
                                )}
                            </h3>
                            <button type='button' className='btn btn-primary float-right' onClick={this.onToggle}>Add Quiz</button>
                        </div>
                        <div className=''>
                            <p>Title: {quizData.title}</p>
                            <p>Short Name: [{quizData.uniqueId}]</p>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                Questions
                                <button className='btn float-right pt-0 pb-0 text-primary' onClick={this.onAddQuestion}>
                                    <i className="fas fa-plus-circle " />
                                </button>
                                

                            </div>
                            <div className="card-body pl-0 pr-0">
                                {this.state.loading2 && (
                                    <div className='mt-5 mb-5 text-center'>
                                        <div className="spinner-grow text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                { !this.state.loading2 && (
                                    <ul className="list-group list-group-flush ">
                                        {(this.state.questionData.length > 0 ) && this.state.questionData.map((item, index) => {
                                            var data = {
                                                quizId: this.state.quizId,
                                                questionData: item,
                                                index: index + 1,
                                                sequence: item.sequence,
                                                deleteQuestion: this.deleteQuestion
                                            };
                                            return (<li key={item._id} className='list-group-item'>
                                                <SingleQuestion question={data} />
                                            </li>);
                                        })}

                                        {(this.state.questionData.length === 0 ) && (
                                            <li className='list-group-item text-center'>
                                                Not Found
                                            </li>
                                        ) }

                                        { this.state.loading3 && (
                                            <li className='list-group-item text-center'>
                                                <div className="spinner-grow text-secondary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </li>
                                        ) }
                                        
                                    </ul>
                                ) }
                                
                                
                            </div>
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


                )}

            </div>
        );
    }
}

SingleQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    question: state.question,

})

export default connect(mapStateToProps, { getSingleQuizById, addQuiz, getQuestionsByQuizId, addQuestion })(SingleQuiz);