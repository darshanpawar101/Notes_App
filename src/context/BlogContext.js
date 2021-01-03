import createDataContext from './createDataContext';
import fire, {addNote,getNote} from '../../fire';
const blogReducer = (state,action) => {
    switch(action.type)
    {
        case 'edit_BlogPost':
            return state.map((blogPost)=> {
               return blogPost.id===action.payload.id ?
                action.payload
                :blogPost;
            });
        case 'delete_BlogPost':
            return state.filter( blogPost => blogPost.id !== action.payload );
        case 'add_BlogPost':
            return [
                ...state,{id: Math.floor(Math.random()*99999),
                    title:action.payload.title,
                    content:action.payload.content
                }
                ];
        case 'set_BlogPost':
            return action.payload;
        default:
            return state;
    }
};

const addBlogPost = dispatch => {
    return (title,content) => {
        dispatch({type:'add_BlogPost',payload:{title,content}});
    }
};

const setBlogPost = dispatch => {
    const {currentUser} = fire.auth();
    return dispatch => {
        fire.database().ref(`/notes/${currentUser.uid}`).on('value', data => {
            console.log(data.val());
        dispatch({type:'set_BlogPost',payload:data.val()});
        });
    }
};

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type:'delete_BlogPost',payload:id});
    }
};

const editBlogPost = dispatch => {
    return (id,title,content)=>{
        dispatch({type:'edit_BlogPost',payload:{id,title,content}})
    }
};
   
export const {Context,Provider}=createDataContext(
    blogReducer,
    {addBlogPost,deleteBlogPost,editBlogPost,setBlogPost},
    []
    );