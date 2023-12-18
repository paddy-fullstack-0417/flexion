import {
    GET_ALL_PROBLEMS,
    ADD_PROBLEM,
    UPDATE_PROBLEM,
    REMOVE_PROBLEM,
    GET_ALL_PROBLEMS_BY_STUDENTS,
    SET_STUDENT_RESPONSE
} from '../types';

const initialState = {
    problems: []
};

const panelReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROBLEMS:
            return {
                ...state,
                problems: action.payload
            };
        case ADD_PROBLEM:
            return {
                ...state,
                problems: [...state.problems, action.payload]
            };
        case UPDATE_PROBLEM:
            return {
                ...state,
                problems: state.problems.map(problem => {
                    if (problem._id === action.payload._id) {
                        return action.payload;
                    }
                    return problem;
                })
            };
        case REMOVE_PROBLEM:
            return {
                ...state,
                problems: state.problems.filter(problem => problem._id !== action.payload)
            }
        case GET_ALL_PROBLEMS_BY_STUDENTS:
            return {
                ...state,
                problems: action.payload.map(problem => ({
                    ...problem,
                    studentResponse: 0
                }))
            };
        case SET_STUDENT_RESPONSE:
            return {
                ...state,
                problems: state.problems.map(problem => {
                    if (problem._id === action.payload.problemId) {
                        return {
                            ...problem,
                            studentResponse: action.payload.value
                        };
                    }
                    return problem;
                })
            };
        default:
            return state;
    }
}

export default panelReducer;