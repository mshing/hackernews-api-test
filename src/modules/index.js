import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import hackernews from './hackernews';
import ajaxStatus from './ajaxStatus';

export default combineReducers({
    router: routerReducer,
    hackernews,
    ajaxStatus
});
