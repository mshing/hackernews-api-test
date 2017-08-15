export const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

const initialState = {
    ajaxCallsInProgress: 0
};

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type === BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1 > 0 ? state - 1 : 0;
    }

    return state;
}

export function beginAjaxCall() {
    return {type: BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
    return {type: AJAX_CALL_ERROR};
}
