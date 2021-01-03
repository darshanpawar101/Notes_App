import {createStore,combineReducers} from 'redux';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    themes: themeReducer,
    user: userReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;