import React,{useState} from 'react';
import {Text,View,Dimensions,StyleSheet,TouchableOpacity,TextInput,StatusBar,ActivityIndicator} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import fire, {addNote,getNote} from '../../fire';
import CryptoJS from "react-native-crypto-js";
import {connect} from 'react-redux';

const NewLoginScreen = ({navigation,themecolors}) => {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [visible,setVisible] = useState(false);
    const [eye,setEye] = useState('md-eye');
    const [error,setError] = useState('');
    const [load,setLoad] = useState(false);

    const toggleVisble = () => {
        if(visible)
        {
            setVisible(false);
            setEye('md-eye');
        }
        else
        {
            setVisible(true);
            setEye('md-eye-off');
        }

    }

    const onButtonPressed = () => {
        setError('');
        setLoad(true);
        fire.auth().signInWithEmailAndPassword(email,pass)
        .then(login)
            .catch((e) => {
                setError('SomeThing is Wrong');
                
                if(e.code==='auth/user-not-found')
                {
                    setError('User Not Found');
                }
                else if(e.code==='auth/invalid-email')
                {
                    setError('Invalid Email');
                }
                else if(e.code==='auth/wrong-password')
                {
                    setError('Incorrect Password');
                }
                else if(e.code==='auth/too-many-requests')
                {
                    setError('Too many requests. Try to reopen the app.');
                }
                console.log(e.code);
                setLoad(false);
            }
            );
    }
    
    const login = () => {
        setError('');
        setLoad(false);
        console.log(error);
        console.log(load);
        navigation.navigate('NewNotes'); 
    };
    
    
    const spin = () => {
        if(load){
            return (
                <View style={styles.spinner}>
                <ActivityIndicator size={'large'}/>
            </View>
            );
        }
      };


    return (
        <View style={{
            flex: 1,
            backgroundColor:themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={themecolors.bgcolor} barStyle={themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
            <View style={{flex:2,flexDirection:'column',justifyContent:'center'}}>
                <Text style={{
                    color:themecolors.texttitlecolor,
                    fontSize:50,
                    fontFamily:'maneb',
                    alignSelf:'center',
                    marginVertical:100
                }}>Notes </Text>
            </View>
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',marginVertical:100}}>
                <View style={{
                    height:55,
                    width: Dimensions.get('window').width*0.9,
                    backgroundColor:themecolors.inputcolor,
                    borderRadius:Dimensions.get('window').width/2,
                    alignSelf:'center',
                    marginVertical:10,
                    flexDirection:'row'
                }}>
                    <FontAwesome name="user" style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'center',
                        paddingLeft:Dimensions.get('window').width*0.05,
                    }}/>
                    <TextInput 
                        style={{
                            paddingLeft:Dimensions.get('window').width*0.05,
                            width: Dimensions.get('window').width*0.70,
                            color:themecolors.texttitlecolor,
                            fontFamily:'manb',
                            fontSize:15
                        }}
                        placeholder = "Email"
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
                <View style={{
                    height:55,
                    width: Dimensions.get('window').width*0.9,
                    backgroundColor:themecolors.inputcolor,
                    borderRadius:Dimensions.get('window').width/2,
                    alignSelf:'center',
                    marginVertical:10,
                    flexDirection:'row'
                }}>
                    <FontAwesome name="lock" style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'center',
                        paddingLeft:Dimensions.get('window').width*0.05,
                    }}/>
                    <TextInput 
                        style={{
                            paddingLeft:Dimensions.get('window').width*0.05,
                            width: Dimensions.get('window').width*0.70,
                            color:themecolors.texttitlecolor,
                            fontFamily:'manb',
                            fontSize:15
                        }}
                        placeholder = "Password"
                        secureTextEntry={visible}
                        value={pass}
                        onChangeText={(text)=>setPass(text)}
                    />
                    <TouchableOpacity 
                    style={{flexDirection:'row'}}
                    onPress={toggleVisble}
                    >
                        <Ionicons name={eye} style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'center',
                        paddingLeft:Dimensions.get('window').width*0.05,
                    }}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.errortext}>{error}</Text>

                <View>
                    <TouchableOpacity
                    onPress={()=>onButtonPressed()}
                    >
                        <View style={{
                            padding:10,
                            backgroundColor:themecolors.bgcolor,
                            height:50,
                            width: Dimensions.get('window').width/3,
                            justifyContent:'center',
                            alignSelf:'center',
                            flexDirection:'column',
                            borderRadius: Dimensions.get('window').width/3,
                            marginVertical:50,
                        }}>
                            <Text style={styles.bluetext}>Signin</Text>
                            {spin()}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
back:{
    flex: 1,
    backgroundColor:'#0F121B'
},
head:{
    color:'#fff',
    fontSize:50,
    fontFamily:'maneb',
    alignSelf:'center',
    marginVertical:100
},
inputbg:{
    height:55,
    width: Dimensions.get('window').width*0.9,
    backgroundColor:'#191B27',
    borderRadius:Dimensions.get('window').width/2,
    alignSelf:'center',
    marginVertical:10,
    flexDirection:'row'
},
whiteicon:{
    fontSize:20,
    color:'#fff',
    alignSelf:'center',
    paddingLeft:Dimensions.get('window').width*0.05,
},
input:{
    paddingLeft:Dimensions.get('window').width*0.05,
    width: Dimensions.get('window').width*0.70,
    color:'#fff',
    fontFamily:'manb',
    fontSize:15
},
buttonbg:{
    padding:10,
    backgroundColor:'#0F121B',
    height:50,
    width: Dimensions.get('window').width/3,
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'column',
    borderRadius: Dimensions.get('window').width/3,
    marginVertical:50,

},
bluetext:{
    color:'#366AFD',
    fontSize:17,
    fontFamily:'manb',
    alignSelf:'center'
},
errortext:{
    color:'#CC2626',
    fontSize:15,
    fontFamily:'manb',
    alignSelf:'center',
    marginVertical:Dimensions.get('window').width*0.1
},
spinner:{
    marginVertical:Dimensions.get('window').width*0.1
}
});

const mapStateToProps = (state) =>{
    console.log('++++++++++++++++++++ start theme state ++++++++++++++++++');
    console.log(state);
    console.log('++++++++++++++++++++ end theme state ++++++++++++++++++');
return {
    themecolors: state.themes.themeColor
}
}

export default connect(mapStateToProps)(NewLoginScreen);