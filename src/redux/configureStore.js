import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Conversations} from './conversations';

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore=()=>{
    const store= createStore(
        combineReducers({
            conversations:Conversations
        }),
        applyMiddleware(thunk,logger)
    )

    return store;
}