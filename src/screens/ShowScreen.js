import React,{useContext} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import {Context} from '../context/BlogContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';

const ShowScreen = ({navigation}) => {
const {state} = useContext(Context);

const blogPost = state.find((blogPost)=> blogPost.id === navigation.getParam('id'));
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

            <View style={styles.design1}>
            <Text style={styles.text1}>{blogPost.title}</Text>
            </View>

            <View style={styles.design2}>
                <Text style={styles.text2}>{blogPost.content}</Text>
            </View>

            <TouchableOpacity
            style={styles.editButton} 
            onPress={() => navigation.navigate('Edit',{id:navigation.getParam('id')})}>
                <MaterialIcons name="edit" style={styles.editicon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text1:{
        fontFamily: 'segbl',
        fontSize: 35,
        color:'#989898',
        
    },
    text2:{
        fontFamily: 'seg',
        fontSize: 20 ,
        color:'#989898',
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
    design1:{
        height:70,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A"
    },
    design2:{
        height:570,
        paddingHorizontal:20,
        marginHorizontal:10,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A"
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
    editButton:{
        backgroundColor:'#3776B4',
        height:80,
        width:80,
        position:"relative",
        alignSelf:'flex-end',
        borderRadius:40,
        marginTop:15,
        marginRight:20
    },editicon:{
        color:'#fff',
        fontSize:40,
        paddingLeft:20,
        paddingTop:20,
    },
});

export default ShowScreen;