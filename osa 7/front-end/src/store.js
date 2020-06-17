import { createStore, combineReducers, applyMiddleware } from 'redux'

import notificationReducer from './reducers/notificationReducer'
import notificationStyleReducer from './reducers/notificationStyleReducer'
import blogsReducer from './reducers/blogsReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    notificationStyle: notificationStyleReducer,
    blogs: blogsReducer,
    user: loggedInUserReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store 