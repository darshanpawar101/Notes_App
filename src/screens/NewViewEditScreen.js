import React,{useContext, useState} from 'react';
import {View,StyleSheet,Text,Dimensions,FlatList,ScrollView,Alert,StatusBar} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import BlogPostForm from '../components/BlogPostForm';
import DateFormat from '../components/DateFormat';
import {Context} from '../context/BlogContext';
import CryptoJS from "react-native-crypto-js";
import { FontAwesome } from '@expo/vector-icons';
import fire, {addNote,getNote,setNote,deleteNote,updateUser} from '../../fire';
import {connect} from 'react-redux';

const NewViewEditScreen = ({navigation,themecolors}) =>{

    const [user,setUser] = useState(navigation.getParam('user'));
    console.log('inside VIEW EDIT ');
    console.log(user.email);
    const [state,setState] = useState(navigation.getParam('data'));
    const blogPost = state.find((blogPost)=> blogPost.id === navigation.getParam('id'));
    const [title,setTitle] = useState(blogPost.title);
    const [content,setContent] = useState(blogPost.content);
    const [newcolors,setColors] = useState([{id:1,color:themecolors.tilecolor},{id:2,color:'#e27b46'},{id:3,color:'#efca59'},{id:4,color:'#45b29e'},{id:5,color:'#4cafcd'},{id:6,color:'#ef3c59'},{id:7,color:'#7557a5'},{id:8,color:'#b96aab'},{id:5,color:'#9e9d9e'}]);
    const [tilecolor,setTileColor] = useState(blogPost.tilecolor);
    const [imp,setImp] = useState(blogPost.mark);
    const [visible,setVisible]=useState(blogPost.mark==='star'?false:true);

    const setdata=()=>{    
            //title = CryptoJS.AES.encrypt(JSON.stringify(title), `${currentUser.uid}`).toString();
            //content = CryptoJS.AES.encrypt(JSON.stringify(content), `${currentUser.uid}`).toString();
            setNote({
                title:title,
                content:content,
                id: blogPost.id,
                title:title,
                content:content,
                date: new Date().getDate(),
                month: new Date().getMonth()+1,
                year: new Date().getFullYear(),
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                tilecolor: blogPost.tilecolor===tilecolor ? blogPost.tilecolor:tilecolor,
                key:blogPost.key,
                mark:imp
            });
            navigation.navigate('NewNotes');
        };

    const deletedata=()=>{
        deleteNote({
            title:title,
            content:content,
            id: Math.floor(Math.random()*99999),
            title:title,
            content:content,
            id: Math.floor(Math.random()*99999),
            date: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            tilecolor: blogPost.tilecolor===tilecolor ? blogPost.tilecolor:tilecolor,
            key:blogPost.key
        });
        console.log(user);
        updateUser({
            email:user.email,
            key:user.key,
            name:user.name,
            notes:user.notes-1,
            pass:user.pass,
            uid:user.uid
        });
        navigation.pop();
    }

    const toggleImp = () => {
        if(visible)
        {
            setVisible(false);
            setImp('star');
            
        }
        else
        {
           
            setVisible(true);
            setImp('star-o');
            
        }

    }
    
    const showAlert=()=> {  
        Alert.alert(  
            'Delete Note',  
            'Are you sure you want to delete this note.',  
            [    
                {text: 'No', onPress: () => console.log('No Pressed')},
                {  
                    text: 'Yes',  
                    onPress: () => deletedata(),  
                    style: 'cancel',  
                },  
                  
            ],  
            {cancelable: false}  
        )  
    }  

    const showNewAlert=()=> {  
        if(title!==blogPost.title||content!==blogPost.content)
        {
            Alert.alert(  
                'Save Changes',  
                'Do you want to save the changes to note ?.',  
                [    
                    {text: 'No', onPress: () => navigation.pop()},
                    {  
                        text: 'Yes',  
                        onPress: () => setdata(),  
                        style: 'cancel',  
                    },  
                      
                ],  
                {cancelable: false}  
            )  
        }
        else
        {
            navigation.pop();
        }
        
    }
    
    const {currentUser} = fire.auth();
    return(
        <View style={{
            flex: 1,
            backgroundColor:themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={themecolors.bgcolor} barStyle={themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
            <ScrollView>
            
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                onPress={() => showNewAlert()}
                >
                    <FontAwesome name="arrow-left" style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'flex-start',
                        paddingLeft:Dimensions.get('window').width*0.05,
                        paddingTop:Dimensions.get('window').width*0.05,
                    }}/>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row',flex:1}}>
                <View style={{flexDirection:'row',flex:1}}>

                </View>
                <View style={{flexDirection:'row',flex:2,justifyContent:'space-evenly'}}>
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-evenly'}}>
                        
                    </View>
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-evenly'}}>
                        <TouchableOpacity 
                            onPress={() => toggleImp()}
                            >

                                <FontAwesome name={imp} style={{
                                fontSize:20,
                                color:themecolors.iconcolor,
                                alignSelf:'center',
                                paddingBottom:Dimensions.get('window').width*0.02,
                            }}/>
                            
                        <Text style={styles.infotext}>Important</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column',flex:1,justifyContent:'space-evenly'}}>
                        <TouchableOpacity 
                        onPress={() =>showAlert()}
                        >
                            
                             <FontAwesome name="trash" style={{
                            fontSize:20,
                            color:'#FF0000',
                            alignSelf:'center',
                            paddingBottom:Dimensions.get('window').width*0.02,
                        }}/>
                        
                        <Text style={styles.infotext}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            

            <View style={{flex:10}}>
                
                <View style={{flex:2,flexDirection:'row'}}>
                    <TextInput 
                    style={{
                        paddingHorizontal:Dimensions.get('window').width*0.05,
                        marginHorizontal:Dimensions.get('window').width*0.08,
                        marginVertical:Dimensions.get('window').width*0.02,
                        width:Dimensions.get('window').width*0.8,
                        maxHeight:Dimensions.get('window').width*0.8,
                        minHeight:Dimensions.get('window').width*0.1,
                        backgroundColor:themecolors.bgcolor,
                        fontFamily: 'maneb',
                        fontSize: 30,
                        color:themecolors.texttitlecolor,
                    }}
                    placeholder = "Title"
                    textAlignVertical='top'
                    value={title}
                    underlineColorAndroid="transparent"
                    onChangeText={(text)=>setTitle(text)}
                    />
                </View>
                
                <View style={{flex:8,flexDirection:'row'}}>
                    <TextInput 
                    style={{
                        flex:1,
                        paddingHorizontal:Dimensions.get('window').width*0.05,
                        marginHorizontal:Dimensions.get('window').width*0.08,
                        width:Dimensions.get('window').width*0.8,
                        backgroundColor:themecolors.bgcolor,
                        fontFamily: 'manr',
                        fontSize: 15,
                        color:themecolors.texttitlecolor,
                    }}
                    placeholder = "Note"
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={4}
                    value={content}
                    underlineColorAndroid="transparent"
                    onChangeText={(text)=>setContent(text)}
                    />
                </View>

                <View style={{
                     height: Dimensions.get('window').width*0.45}}>

                </View>
                
            </View>

            </ScrollView>

            <View style={{
                     height: Dimensions.get('window').width*0.45,
                     width: Dimensions.get('window').width*0.75,
                     backgroundColor:themecolors.bgcolor,
                     position:'absolute',
                    top:Dimensions.get('window').height*0.8,
                    left:Dimensions.get('window').width*0.02,
                     }}>

            <View style={{flexDirection:'column',flex:2,marginTop:Dimensions.get('window').width*0.05}}>

            <View style={{flexDirection:'row',paddingLeft:Dimensions.get('window').width*0.05,}}>
                        <DateFormat 
                        date={blogPost.date}
                        month={blogPost.month}
                        year={blogPost.year}
                        hours={blogPost.hours}
                        minutes={blogPost.minutes}
                        /> 
                    </View>
                        
                        <FlatList 
                        data={newcolors} 
                        keyExtractor={(id) => newcolors.id}
                        horizontal={true}
                        renderItem={({item})=>{
                            return (

                                <TouchableOpacity
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    height:40,
                                    width:40,
                                    marginHorizontal:10,
                                    marginVertical:50,
                                    marginTop:20,
                                    borderColor:themecolors.bdcolor,
                                    borderWidth:2,
                                    borderRadius:25,
                                    alignItems:'center'
                                }}
                                onPress={()=>setTileColor(item.color)}
                                >
                                    <View style={{
                                        height:35,
                                        width:35,
                                        borderRadius:25,
                                        backgroundColor:item.color,
                                        borderColor:themecolors.bgcolor,
                                        alignSelf:'center',
                                        justifyContent:'center',
                                        borderWidth:3
                                    }}>
                                        { tilecolor===item.color ? <MaterialIcons name="check" style={{
                                        color:themecolors.iconcolor,
                                        fontSize:20,
                                        alignSelf:'center'
                                    }}/> : console.log(tilecolor)}
                                    </View>    
                                    
                                </TouchableOpacity>
                                );
                            }}
                    
                        />
                    
            </View>

            </View>
            <View style={{
                     height: Dimensions.get('window').width*0.45,
                     width: Dimensions.get('window').width*0.75,
                     backgroundColor:themecolors.bgcolor,
                     position:'absolute',
                    top:Dimensions.get('window').height*0.8,
                    left:Dimensions.get('window').width*0.75,
                     }}></View>


            <View style={{
                     height: Dimensions.get('window').width*0.15,
                     width: Dimensions.get('window').width*0.15,
                    color:'#20B52A',
                    fontSize:100,
                    position:'absolute',
                    top:Dimensions.get('window').height*0.85,
                    left:Dimensions.get('window').width*0.8,
                    borderRadius: Dimensions.get('window').width*0.1,
                    backgroundColor:'#20B52A'
                }}>
                    <TouchableOpacity
                    onPress={()=>setdata()}
                    >
                        <MaterialIcons name="check" style={styles.addicon}/>
                    </TouchableOpacity>

                </View>
        
        
        </View>
    )

};

const styles = StyleSheet.create({
    back:{
        flex: 1,
        backgroundColor:'#0F121B'
    },
    whiteicon:{
        fontSize:20,
        color:'#fff',
        alignSelf:'flex-start',
        paddingLeft:Dimensions.get('window').width*0.05,
        paddingTop:Dimensions.get('window').width*0.05,
    },
    infoicon:{
        fontSize:25,
        color:'#6C737D',
        alignSelf:'center',
        paddingBottom:Dimensions.get('window').width*0.02,
    },
    infotext:{
        fontSize:12,
        fontFamily:'manb',
        color:'#6C737D',
        //marginTop:Dimensions.get('window').width*0.05,
        alignSelf:'center'
    },
    newcolordata:{
        height:50,
        width:50,
        borderRadius:25,
        color:'#000000',
        backgroundColor:'#000000',
        borderColor:'#000',
    },
    inputbg:{
        paddingHorizontal:Dimensions.get('window').width*0.05,
        marginHorizontal:Dimensions.get('window').width*0.08,
        marginVertical:Dimensions.get('window').width*0.02,
        width:Dimensions.get('window').width*0.8,
        maxHeight:Dimensions.get('window').width*0.8,
        minHeight:Dimensions.get('window').width*0.1,
        backgroundColor:"#0F121B",
        fontFamily: 'maneb',
        fontSize: 35,
        color:'#fff',
    },
    inputbg2:{
        flex:1,
        paddingHorizontal:Dimensions.get('window').width*0.05,
        marginHorizontal:Dimensions.get('window').width*0.08,
        width:Dimensions.get('window').width*0.8,
        backgroundColor:"#0F121B",
        fontFamily: 'manr',
        fontSize: 18,
        color:'#fff',
    },
    button:{
        height: Dimensions.get('window').width*0.15,
        width: Dimensions.get('window').width*0.15,
        position:"absolute",
        top:Dimensions.get('window').height*0.1,
        left:Dimensions.get('window').width*0.1,
        backgroundColor:"#366AFD",
        borderRadius: Dimensions.get('window').width*0.1,
    },
    addicon:{
        color:'#fff',
        fontSize:40,
        paddingLeft:Dimensions.get('window').width*0.027,
        paddingTop:Dimensions.get('window').width*0.027,
    },
});

const mapStateToProps = (state) =>{
    console.log('++++++++++++++++++++ start theme state ++++++++++++++++++');
    console.log(state);
    console.log('++++++++++++++++++++ end theme state ++++++++++++++++++');
return {
    themecolors: state.themes.themeColor
}
}

export default connect(mapStateToProps)(NewViewEditScreen); 