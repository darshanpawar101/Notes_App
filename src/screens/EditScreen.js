import React,{useState,useContext} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation})=>{
    const id=navigation.getParam('id'); 
    const {state,editBlogPost} = useContext(Context);
    const blogPost = state.find((blogPost)=> blogPost.id === id);

    
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
            <View>
            <BlogPostForm 
            initialValues={{title:blogPost.title,content: blogPost.content}}
            onSubmit={(title,content) => {
                editBlogPost(id,title,content);
                navigation.pop();
            }}
            />
            </View>

        </View>
    );

}

const styles=StyleSheet.create({
    text1:{
        
    },
    text2:{
        
    },
    design1:{
        height:70,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A",
        fontFamily: 'segbl',
        fontSize: 35,
        color:'#fff',
        
    },
    design2:{
        height:570,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A",
        fontFamily: 'seg',
        fontSize: 20 ,
        color:'#fff',
        paddingTop:10,
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
    back:{
        backgroundColor:'#191919',   
        flex: 1
    },
    backButton:{
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
});

export default EditScreen;