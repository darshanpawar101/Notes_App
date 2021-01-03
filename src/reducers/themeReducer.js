import {SET_THEME} from '../actions/types';

const initialState = {
    themeColor:{id:1,bgcolor:'#F6F7F9',inputcolor:'#FFFFFF',texttitlecolor:'#191B27',textbasecolor:'#6C737D',tilecolor:'#FFFFFF',bdcolor:'#191B27',iconcolor:'#0F121B',themename:'Light Theme'}
}

const themeReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_THEME:
            return{
                themeColor: action.data,
            };
        default:
            return state; 
    }
}

export default themeReducer;