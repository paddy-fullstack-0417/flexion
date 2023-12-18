import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import {
    GET_ALL_PROBLEMS,
    GET_ERRORS,
    ADD_PROBLEM,
    UPDATE_PROBLEM,
    REMOVE_PROBLEM,
    GET_ALL_PROBLEMS_BY_STUDENTS,
    SET_STUDENT_RESPONSE,
    SET_SNACKBAR
} from '../types';

// Get All Problems
export const getAllProblems = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/problems`)
        .then(res =>
            dispatch({
                type: GET_ALL_PROBLEMS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Problem
export const addProblem = (problem, handleClose) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/problems`, { problem })
        .then(res => {
            dispatch({
                type: ADD_PROBLEM,
                payload: problem
            });
            handleClose();
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'New Record Added!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Update Problem
export const updateProblem = (problem, handleClose) => dispatch => {
    axios
        .put(`${SERVER_ADDRESS}/api/problems`, { problem })
        .then(res => {
            dispatch({
                type: UPDATE_PROBLEM,
                payload: problem
            });
            handleClose();
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'Record Updated!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Remove Problem
export const removeProblem = (problemId) => dispatch => {
    axios
        .delete(`${SERVER_ADDRESS}/api/problems/${problemId}`)
        .then(res => {
            dispatch({
                type: REMOVE_PROBLEM,
                payload: problemId
            });
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'Record Removed!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}



// Get All Problems by Students
export const getAllProblemsByStudents = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/problems`)
        .then(res =>
            dispatch({
                type: GET_ALL_PROBLEMS_BY_STUDENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set Student Response
export const setStudentResponse = (problemId, value) => dispatch => {
    dispatch({
        type: SET_STUDENT_RESPONSE,
        payload: { problemId, value }
    })
}

// Submit Answer
export const submitAnswer = (userId, answer, isValid) => dispatch => {
    if (!isValid) {
        dispatch({
            type: SET_SNACKBAR,
            payload: {
                content: 'Student response required!',
                options: { variant: 'warning' }
            }
        });
    } else {
        axios
            .post(`${SERVER_ADDRESS}/api/answers`, { userId, answer })
            .then(res => {
                dispatch({
                    type: GET_ALL_PROBLEMS,
                    payload: res.data
                });
                dispatch({
                    type: SET_SNACKBAR,
                    payload: {
                        content: 'Successfully Submitted!',
                        options: { variant: 'success' }
                    }
                });
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
}