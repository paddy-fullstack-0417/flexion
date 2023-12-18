import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import errorReducer from './error.reducer';
import panelReducer from './panel.reducer';
import snackbarReducer from './snackbar.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    panel: panelReducer,
    snackbar: snackbarReducer
});

export default rootReducer;