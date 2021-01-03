import React,{useState,useContext} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';


const BlogPostForm = ({onSubmit,initialValues}) => {
    const [title,setTitle] = useState(initialValues.title);
    const [content,setContent] = useState(initialValues.content);
    return (
        <View>
            <TextInput 
            style={styles.design1}
            placeholder = "Title:" 
            value={title}
            onChangeText={(text)=>setTitle(text)}
            />

            <TextInput 
            style={styles.design2}
            placeholder = "Content:"
            multiline={true}
            textAlignVertical='top'
            numberOfLines={4}
            value={content}
            onChangeText={(text)=>setContent(text)}
            />

            <TouchableOpacity
            style={styles.saveButton}
            onPress={()=>onSubmit(title,content)}
            >
                <View  style={styles.row}>
                <AntDesign name="save" style={styles.saveicon}/>
                <Text style={styles.savetext}>Save</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    design1:{
        height:70,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A",
        fontFamily: 'segb',
        fontSize: 35,
        color:'#fff',
     
    },
    design2:{
        height:270,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        borderRadius:10,
        paddingTop:10,
        backgroundColor:"#2A2A2A",
        fontFamily: 'seg',
        fontSize: 20,
        color:'#fff',
    },
    row:{
        flexDirection:'row',
    },
    saveicon:{
        color:'#37B43F',
        fontSize:30,
        paddingLeft:25,
        paddingTop:20,
    },
    savetext:{
        color:'#fff',
        fontSize:30,
        paddingLeft:15,
        paddingTop:15,
    },
    saveButton:{
        backgroundColor:'#272727',
        height:70,
        width:150,
        position:"relative",
        alignSelf:'flex-end',
        borderRadius:40,
        marginRight:20,
        marginTop:20
    }
});

export default BlogPostForm;