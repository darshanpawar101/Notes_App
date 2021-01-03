import React,{useState,useContext,useEffect} from 'react';
import {View,Text, StyleSheet,FlatList,TouchableOpacity,Button} from 'react-native';
import {Context} from '../context/BlogContext';
import {MaterialIcons} from '@expo/vector-icons';
import fire, {addNote,getNote} from '../../fire';
import CryptoJS from "react-native-crypto-js";

const IndexScreen = ({navigation}) => {
    const {state,addBlogPost,deleteBlogPost,setBlogPost} = useContext(Context);
    const {currentUser} = fire.auth();
    const [newdata,setNewData] = useState([]);
    const [dataflag,setDataFlag] = useState(false);

fire.database().ref(`/notes/${currentUser.uid}`).on('value', (data) => {
    const todoItems = Object.values(data.val());
    if(todoItems!=[] && dataflag==false){
        //setNewData(todoItems);
        //setNewData(JSON.parse(CryptoJS.AES.decrypt(todoItems, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)));
    }
    else{
        setDataFlag(false);
    }
    
    });


    
    if(newdata.length==0)
    {
        return (
            <View style={styles.back}>
            <Text style={styles.text3}>Notes</Text>
            <Text style={styles.text4}>They are Safe And Secure</Text>
            <View style={styles.default}>
                <View style={styles.note}>
            <Text style={styles.text5}>Add your first note by clicking</Text>
            <Text style={styles.text5}>the plus icon below</Text>
            </View>
            </View>
            <TouchableOpacity
            style={styles.addButton} 
            onPress={() => navigation.navigate('Create')}>
                <MaterialIcons name="add" style={styles.addicon}/>
            </TouchableOpacity>
            </View>
            );

    }
    else
    return (
        <View style={styles.back}>

            <Text style={styles.text3}>Notes</Text>
            <Text style={styles.text4}>They are Safe And Secure</Text>

            <FlatList 
            data={newdata} 
            inverted
            keyExtractor={(newdata) => newdata.title}
            
            renderItem={({item})=>{
                return (
                    
                    <TouchableOpacity onPress={()=>{
                        setBlogPost(newdata);
                        navigation.navigate('Show',{data: newdata,id:item.id})}
                        }>
                        <View style={styles.design}>
                            <View style={styles.row}>  
                                <Text style={styles.text1}>{item.title.substring(0, 6)}</Text>
                                <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
                                    <MaterialIcons name="delete" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>  
                            <View style={styles.row}>
                                <Text style={styles.text2}>{item.content.substring(0, 10)}</Text> 
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
            numColumns={2}
            />
             <TouchableOpacity
            style={styles.addButton} 
            onPress={() => navigation.navigate('Create')}>
                <MaterialIcons name="add" style={styles.addicon}/>
            </TouchableOpacity>
        </View>
    );  
};

const styles = StyleSheet.create({
    text1:{
        fontFamily: 'segbl',
        fontSize: 35,
        color:'#989898',
        
    },text2:{
        fontFamily: 'seg',
        fontSize: 20 ,
        color:'#989898',
        paddingLeft:50,
        paddingTop:10,
    },
    back:{
        backgroundColor:'#191919',   
        flex: 1
    },
    design:{
        height:110,
        width:190,
        paddingHorizontal:20,
        marginLeft:15,
        marginTop:10,
        paddingVertical:10,
        borderRadius:10,
        backgroundColor:"#2A2A2A"
    },
    addButton:{
        backgroundColor:'#37B43F',
        height:80,
        width:80,
        position:"relative",
        alignSelf:'center',
        borderRadius:40,
        marginBottom:180,
        marginRight:20
    },
    icon:{
        color:'#B43737',
        fontSize:30,
        paddingTop:10,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    addicon:{
        color:'#fff',
        fontSize:50,
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
    default:{
        height: 280,
        alignContent:"center",
        alignSelf:"center"
    },
    text5:{
        fontFamily: 'seg',
        fontSize: 20 ,
        color:'#989898',
    },
    note:{
        paddingTop: 150,
    }
  });
  
  export default IndexScreen;
  
  