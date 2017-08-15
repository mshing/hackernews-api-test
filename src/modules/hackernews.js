import {beginAjaxCall, ajaxCallError} from './ajaxStatus';

export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';

const initialState = {
    items: null,
    total: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS_SUCCESS:
            return {
                ...state,
                    items: action.items,
                    total: action.total
            }
        default:
            return state
        }
};

export const getNews = (params) => {
    return function (dispatch, getState) {

        dispatch(beginAjaxCall());

        return fetch(`https://hacker-news.firebaseio.com/v0/${params.type}.json`).then((result) => {     
            return result.json().then(json => {
                let promises = [];

                let startIndex = (params.page - 1) * params.itemsPerPage;
                let endIndex = Math.min((params.page * params.itemsPerPage), json.length);
                for (let i = startIndex; i < endIndex; i++) {
                    promises.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${json[i]}.json`));
                }

                return Promise
                    .all(promises)
                    .then(function(response) {
                        let promises = [];
                        for (let i = 0; i < response.length; i++) {
                            promises.push(response[i].json());
                        }
                        return Promise.all(promises);
                    })
                    .then(function(objects) {
                        let results = [];
                        for (let i = 0; i < objects.length; i++) {
                            results.push(objects[i])
                        }

                        return dispatch({
                            type: GET_NEWS_SUCCESS,
                            items: results,
                            total: json.length
                        });
                    })
                    .catch(function(error) {
                        dispatch(ajaxCallError(error));
                        throw(error.message);
                    });
                
            });
        }).catch((error) => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });

    };
};

