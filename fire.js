import  firebase from 'firebase';
import { useState,useEffect,useContext } from 'react';


const firebaseConfig = {
    apiKey: 'AIzaSyBsl-8GJWj2qGvah5-yjnlua1KUTjC4QB4',
    authDomain: 'notes-a5830.firebaseapp.com',
    databaseURL: 'https://notes-a5830.firebaseio.com',
    projectId: 'notes-a5830',
    storageBucket: 'notes-a5830.appspot.com',
    messagingSenderId: '647105726424',
    appId: '1:647105726424:web:166ebddf198b78d6d154ad',
    measurementId: 'G-7ELMRJM9V4'
  };

  const fire = firebase.initializeApp(firebaseConfig);
  

  export function getNote(){
    /*const {state,addBlogPost,deleteBlogPost,setBlogPost} = useContext(Context);
    const {currentUser} = firebase.auth();

    const [newdata,setNewData] = useState([]);
    const [dataflag,setDataFlag] = useState(false);

    fire.database().ref(`/notes/${currentUser.uid}`).on('value', (data) => {
      const todoItems = Object.values(data.val());
      if(todoItems && dataflag===false){
          setNewData(todoItems);
          setDataFlag(true);

          setBlogPost(newdata);
          console.log(' ************** newdata ***************');
          console.log(newdata);
          console.log('================ state ================');
          console.log(state);
      }
          else{
            setDataFlag(false);
          }
      });*/
  };


  export function addNote(note){


    const {currentUser} = firebase.auth();
    console.log("9999999999999999999999999999999999999");
    console.log(note.title,note.content,note.id);
    console.log("9999999999999999999999999999999999999");
     const newkey = fire.database().ref(`/notes/${currentUser.uid}`)
    .push(note).key;
    fire.database().ref(`/notes/${currentUser.uid}/${newkey}`)
    .update({key:newkey});
    console.log(newkey);
    console.log("9999999999999999999999999999999999999");
  };

  export function setNote(note){


    const {currentUser} = firebase.auth();
    console.log("9999999999999999999999999999999999999");
    console.log(note.title,note.content,note.id);
    console.log("9999999999999999999999999999999999999");
    console.log(" 88888888888 note.key 888888888888888");
    console.log(note.key);
    fire.database().ref(`/notes/${currentUser.uid}/${note.key}`)
    .update(note);

  };

  export function updateUser(user){
    console.log('******************* inside updateUser **************************');
    console.log(user);
    const {currentUser} = firebase.auth();
    fire.database().ref(`/userdetails/${currentUser.uid}/${user.key}`)
    .update(user);

  };

  export function deleteNote(note){
    const {currentUser} = firebase.auth();
    fire.database().ref(`/notes/${currentUser.uid}/${note.key}`).remove();
  }

  export default fire;