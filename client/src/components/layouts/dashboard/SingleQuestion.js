import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import classnames from 'classnames';
import { MDBTooltip } from 'mdbreact';
import isEmpty from '../../../validation/is-empty';
import axios from 'axios';

import { getSingleQuizById, addQuiz } from "../../../actions/quizActions";
import { getQuestionsByQuizId, addQuestion } from "../../../actions/questionActions";


class SingleQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: props.question.questionData._id,
            quizId: props.question.quizId,
            sequence: props.question.sequence,
            question: props.question.questionData.question,
            index: props.question.index,
            options: props.question.questionData.options,
            saving: false,
            deleting: false,
            saved: true,
        }

    }

    componentWillMount() {
        
    }

    componentDidMount() {

    }

    modalBackdropClicked = () => {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleOptionsOnChange = (index) => (event) => {

        const newOptions = this.state.options.map((option, sidx) => {
            if (index !== sidx) return option;
            if (event.target.name == 'optionId') {
                return { optionId: event.target.value, optionText: this.state.options[sidx].optionText };
            } else {
                return { optionId: this.state.options[sidx].optionId, optionText: event.target.value };
            }
        });

        this.setState({ options: newOptions, saved: false });
    }

    addOptions = (e) => {
        this.setState({
            options: this.state.options.concat([{ optionId: '', optionText: '' }]),
            saved: false
        });
    }

    removeOptions = (index) => () => {
        this.setState({
            options: this.state.options.filter((s, sidx) => index !== sidx),
            saved: false
        });
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, saved: false });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.setState({
            saving: true
        });

        axios
            .post('/api/dataLiteracy/edit-question', this.state )
            .then( response => {
                this.setState({
                    sequence: response.data.sequence,
                    question: response.data.question,
                    options: response.data.options,
                    saving: false,
                    saved: true,
                })
                
            } );
    }

    deleteQuestion = () => {

        let data = { _id: this.state._id, quizId: this.state.quizId, index: this.state.index - 1 };
        this.setState({
            deleting: true,
        });

        this.props.question.deleteQuestion(data);
    }

    render() {
       
        return (
            <>
                <div key={`single-question-${this.state._id}`}>
                    <form onSubmit={this.onSubmit} key={`single-question-form-${this.state._id}`}>

                        <div className="input-group mb-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text">{this.state.index}</span>
                            </div>
                            <textarea rows={3} type="text" className="form-control" name='question' value={this.state.question} onChange={this.onChange} />
                        </div>

                        { this.state.options && (
                            <div className=' mt-3'>
                                { this.state.options.map((item, index) => {
                                    
                                    // "a" to -> "z"
                                    var i = 97;
                                    var j = 123;

                                    var optionLen = this.state.options.length;

                                    let selectOptions = [];
                                    for ( var start = 0; start < optionLen; start++ ){
                                        if( (i + start) <= j ) {
                                            selectOptions.push( String.fromCharCode(i + start) );
                                        }
                                    }

                                    if( selectOptions.indexOf(item.optionId) < 0 ){
                                        selectOptions.push( item.optionId );
                                    }

                                    return (
                                        <div className="input-group" key={`${this.state._id}-options-${index}`} >
                                            <div className="input-group-prepend">
                                                <select className="custom-select" name='optionId' value={item.optionId} onChange={this.handleOptionsOnChange(index)} >
                                                    <option value='' disabled={true}>-</option>
                                                    { selectOptions.map( (opt, i) => (
                                                        <option key={`${this.state._id}-options-${index}-${i}`} value={opt}>{opt}</option>
                                                    ) ) }
                                                   
                                                </select>
                                            </div>
                                            <input type="text" className="form-control" name='optionText' value={item.optionText} onChange={this.handleOptionsOnChange(index)} />
                                            <div className="input-group-append" >
                                                <button className="btn btn-outline-danger" type="button" onClick={this.removeOptions(index)}>
                                                    <i className="fas fa-times" />
                                                </button>
                                            </div>

                                            
                                        </div>
                                    );
                                })}
                                
                            </div>
                        ) }
                        <div className='mt-2'>
                            <button type='submit' className='btn btn-outline-success btn-sm float-right ml-1' disabled={this.state.saving || this.state.saved}>
                                { this.state.saving && (
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                                ) }
                                { this.state.saved && (<>Saved</>) }
                                { !this.state.saved && (<>Save</>) }
                            </button>
                            <button type='button' className='btn btn-outline-danger btn-sm float-right ml-1' onClick={this.deleteQuestion}>
                                {this.state.deleting && (
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                                )}
                                {!this.state.deleting && (<>Delete</>)}
                            </button>
                            <button type='button' className='btn btn-warning btn-sm float-right ml-1' onClick={this.addOptions} >
                                Add Option
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

SingleQuestion.propTypes = {
    //quiz: PropTypes.object.isRequired,
    //question: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    //quiz: state.quiz,
    //question: state.question,

})

export default connect(mapStateToProps, { getSingleQuizById, addQuiz, getQuestionsByQuizId, addQuestion })(SingleQuestion);