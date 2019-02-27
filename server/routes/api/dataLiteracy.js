var rfr = require('rfr');
const express = require('express');
const bcrypt = require('bcryptjs');
const secretKey = rfr('server/config/keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Load model.

const DataLiteracyTest = rfr('server/models/DataLiteracyTest');
const Quiz = rfr('server/models/Quiz');





/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

// Add new Question in quiz
router.post( '/add-question', (req, res) => {

    let body = req.body;

    const Question = new DataLiteracyTest({
        quizId: body.quizId,
        question: body.question,
        options: body.options,
        sequence: body.sequence,
    });

    Question.save()
        .then( data => {
            return res.status(200).json( data );
        } )
        .catch( err => {
             return res.status(400).json( err );
        } );


} );

// Add new Question in quiz
router.post( '/edit-question', (req, res) => {

    let body = req.body;

    const Question = {
        question: body.question,
        options: body.options,
        sequence: body.sequence,
    }
    
    DataLiteracyTest.findOneAndUpdate({ _id: body._id }, { $set: Question }, { new: true })
        .then( data => {
            return res.status(200).json( data );
        } )
        .catch( err => {
             return res.status(400).json( err );
        } );

} );

//Delete 
router.post('/delete-question', (req, res) => {

    let body = req.body;
    
    DataLiteracyTest.findOneAndRemove({ _id: body._id, quizId: body.quizId })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });

});

// fetch questions by quizId (obj ID)
router.get( '/fetch-questions-by-quiz-id/:quizid', (req, res) => {

    DataLiteracyTest.find({ quizId: req.params.quizid })
        .then( data => {
            return res.status(200).json( data );
        } )
        .catch( err => {
             return res.status(400).json( err );
        } );

} );


// fetch questions by shortname (uniqueId) (obj ID)
router.get('/fetch-questions-by-shortname/:shortname', (req, res) => {

    Quiz.findOne({ uniqueId: req.params.shortname })
        .then( quizData => {

            DataLiteracyTest.find({ quizId: quizData._id })
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err => {
                    return res.status(400).json(err);
                });
        } )
        .catch(err => {
            return res.status(400).json(err);
        });

        
    

});


// Create New Quiz
router.post('/add-quiz' , (req, res) => {

    let body = req.body;

    const NewQuiz = new Quiz({
        name: body.name,
        uniqueId: body.uniqueId.toLowerCase(),
        title: body.title,
    });

    NewQuiz.save()
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
} );


// Get all quiz
router.get('/fetch-all-quiz', (req, res) => {

    Quiz.find()
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

// Get Single quiz by Id
router.get('/fetch-single-quiz-by-id/:quizId', (req, res) => {

    Quiz.findOne( { _id: req.params.quizId } )
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

// Get Single quiz by shortname
router.get('/fetch-single-quiz-by-shortname/:shortname', (req, res) => {

    Quiz.findOne({ uniqueId: req.params.shortname })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});








// We export the router so that the server.js file can pick it up
module.exports = router;