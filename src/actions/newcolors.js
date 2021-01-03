import {SET_THEME,SET_USER} from './types';

export const settheme = (theme) =>(
    {
        type: SET_THEME,
        data: theme
    }
);

export const setuser = (user) =>(
    {
        type: SET_USER,
        data: user
    }
);