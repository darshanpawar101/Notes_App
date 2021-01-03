import React,{useState} from 'react';
import {Text,View,Dimensions,StyleSheet,TouchableOpacity,TextInput,StatusBar,ActivityIndicator} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import fire ,{addNote} from '../../fire';
import {connect} from 'react-redux';

const NewSignupScreen = ({navigation,themecolors}) => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [error,setError] = useState('');
    const [visible,setVisible] = useState(false);
    const [eye,setEye] = useState('md-eye-off');
    const [load,setLoad] = useState(false);

    const onButtonPressed = () => {
        setError('');
        setLoad(true);
        fire.auth().createUserWithEmailAndPassword(email,pass)
        .then(login)
            .catch((e) => {
                setError('SomeThing is Wrong');
                console.log(e.code);
                if(e.code==='auth/invalid-email')
                {
                    setError('Invalid Email');
                }
                else if(e.code==='auth/weak-password')
                {
                    setError('Password is week ! Needs At Least 6 letters');
                }
                else if(e.code==='auth/email-already-in-use')
                {
                    setError('Email ID already Exist. Choose another email.');
                }
                setLoad(false);
            }
            );
            
    }

    const login = () => {
        setError('');
        setLoad(false);
        addNote({
            title:'Title',
            content:'content',
            id: -1,
            date: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            tilecolor: '#000000',
            mark:'none'
        });
        const {currentUser} = fire.auth();
            const newkey = fire.database().ref(`/userdetails/${currentUser.uid}`)
            .push({name,email,pass,notes:0,key:'',uid:currentUser.uid}).key;
            fire.database().ref(`/userdetails/${currentUser.uid}/${newkey}`)
            .update({key:newkey});

        navigation.navigate('NewLogin');  
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

    return (
        <View style={{
            flex: 1,
            backgroundColor:themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={themecolors.bgcolor} barStyle={themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
            <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                <Text style={{
                    color:themecolors.texttitlecolor,
                    fontSize:50,
                    fontFamily:'maneb',
                    alignSelf:'center',
                }}>Notes </Text>
            </View>
            <View style={{flex:2,flexDirection:'column',justifyContent:'center'}}>
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
                            width: Dimensions.get('window').width*0.7,
                            color:themecolors.texttitlecolor,
                            fontFamily:'manb',
                            fontSize:15
                        }}
                        placeholder = "Name"
                        value={name}
                        onChangeText={(text)=>setName(text)}
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
                    <FontAwesome name="user" style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'center',
                        paddingLeft:Dimensions.get('window').width*0.05,
                    }}/>
                    <TextInput 
                       style={{
                        paddingLeft:Dimensions.get('window').width*0.05,
                        width: Dimensions.get('window').width*0.7,
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
                            width: Dimensions.get('window').width*0.7,
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
                <View>

                <Text style={styles.errortext}>{error}</Text>

                {spin()}

                    <TouchableOpacity
                    onPress={()=>onButtonPressed()}
                    >
                        <View style={styles.buttonbg}>
                            <Text style={styles.whitetext}>Signup</Text>
                            
                        </View>
                    </TouchableOpacity>

                    
                </View>
            </View>
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
    width: Dimensions.get('window').width*0.7,
    color:'#fff',
    fontFamily:'manb',
    fontSize:15
},
buttonbg:{
    padding:10,
    backgroundColor:'#366AFD',
    height:50,
    width: Dimensions.get('window').width/3,
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'column',
    borderRadius: Dimensions.get('window').width/3,
    marginVertical:50
},
whitetext:{
    color:'#fff',
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
    marginVertical:Dimensions.get('window').width*0.05
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

export default connect(mapStateToProps)(NewSignupScreen);