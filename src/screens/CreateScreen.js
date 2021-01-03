import React,{useContext} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import BlogPostForm from '../components/BlogPostForm';
import {Context} from '../context/BlogContext';
import CryptoJS from "react-native-crypto-js";

import fire, {addNote,getNote} from '../../fire';
 
const CreateScreen = ({navigation}) => {

    
    const {addBlogPost} = useContext(Context);
    const {currentUser} = fire.auth();
    return (
        <View style={styles.back}>
            <View style={styles.row}>
            <TouchableOpacity
            style={styles.backButton} 
            onPress={() => navigation.pop()}
            >
                <MaterialIcons name="arrow-back" style={styles.backicon}/>
            </TouchableOpacity>
            <View>
            <Text style={styles.text3}>Notes</Text>
            <Text style={styles.text4}>They are Safe And Secure</Text>
            </View>
            </View>
            
            <BlogPostForm 
            initialValues={{title:'',content: ''}}
            onSubmit={(title,content)=>{
                //addBlogPost(title,content);
                //title = CryptoJS.AES.encrypt(JSON.stringify(title), `${currentUser.uid}`).toString();
                //content = CryptoJS.AES.encrypt(JSON.stringify(content), `${currentUser.uid}`).toString();
                addNote({
                    title:title,
                    content:content,
                    id: Math.floor(Math.random()*99999)
                });
                
                navigation.navigate('NewNotes');
            }}/>

        </View>
    );
};

const styles = StyleSheet.create({
back:{
    backgroundColor:'#191919',
    flex: 1
},backButton:{
    backgroundColor:'#272727',
    height:70,
    width:70,
    position:"relative",
    alignSelf:'flex-start',
    borderRadius:40,
    marginTop:50,
    marginLeft:20,
},
row:{
    flexDirection:'row',
},
backicon:{
    color:'#8F8F8F',
    fontSize:40,
    paddingLeft:15,
    paddingTop:15,
},
text3:{
    fontFamily: 'segb',
    color:'#989898',
    fontSize:85,
    height: 110,
    paddingLeft:50,

},
text4:{
    fontFamily: 'seg',
    color:'#989898',
    fontSize:20,
    paddingLeft:50,
    marginTop:-10,
    marginBottom:10,
},

});

export default CreateScreen;