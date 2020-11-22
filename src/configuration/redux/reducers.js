import { combineReducers } from 'redux';
import layoutReducer from '../../modules/Layout/reducer';

const rootReducer = combineReducers({
    layout: layoutReducer
});

export default rootReducer;
