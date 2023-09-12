import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import userReducer from './user/user.reducer';


const reducers = combineReducers({
    user: userReducer
})
const Store = legacy_createStore(reducers, applyMiddleware(thunk))

export type RootState = ReturnType<typeof reducers>;


export default Store