import {SET_USER} from '../actions/types';

const initialState = {
    userdetails:{}
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_USER:
            return{
                userdetails: action.data,
            };
        default:
            return state; 
    }
}

export default userReducer;