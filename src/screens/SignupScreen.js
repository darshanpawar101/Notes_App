import React,{useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import fire from '../../fire';



const SignupScreen = ({navigation}) => {

    const e='';
    const m='';
    const [error,setError] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [load,setLoad] = useState(false);
    
onButtonPressed = () => {
    fire.auth().createUserWithEmailAndPassword(email,pass)
    .then(login)
        .catch((e) => {
            setError("Something Went Wrong.");
            setLoad(false);
        }
        );
        const {currentUser} = fire.auth();
        fire.database().ref(`/userdetails/${currentUser.uid}`)
        .push({name});
}

const login = () => {
    setError('');
    setLoad(false);
    navigation.navigate('Index');  
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
        <View style={styles.back}>
            <View style={styles.holerow}> 
                <View style={styles.row2}>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                    <View>
                        <View style={styles.holeWhite}></View>
                        <View style={styles.holegray}></View>
                    </View>
                </View>
            </View>

            <View style={styles.hori}>
                
                <View style={styles.row2}>
                    <View style={{marginTop:100,marginBottom:50}}>
                        <Text style={styles.text3}>Notes</Text>
                        <Text style={styles.text4}>They are Safe And Secure</Text>
                    </View>
                </View>

                <View style={styles.inputback}>
                    <Entypo name="user" style={styles.greenicon}/>
                    <TextInput 
                        style={styles.input1}
                        placeholder = "Name"
                        value={name}
                        onChangeText={(text)=>setName(text)}
                    />
                    
                </View>

                <View style={styles.inputback}>
                    <AntDesign name="user" style={styles.greenicon}/>
                    <TextInput 
                        style={styles.input1}
                        placeholder = "Email"
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                    
                </View>

                <View>
                    <View style={styles.inputback}>
                        <AntDesign name="lock" style={styles.greenicon}/>
                        <TextInput 
                            style={styles.input1}
                            placeholder = "Password" 
                            secureTextEntry={true}
                            value={pass}
                            onChangeText={(text)=>setPass(text)}
                        />  
                    </View>
                    <Text style={styles.textError}>{error}</Text>
                </View>


            
            
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={()=>onButtonPressed()}
                >
                    <View  style={styles.row}>
                        <Text style={styles.loginText}>SignUp</Text>
                    </View>
                </TouchableOpacity>

                {spin()}

                <View style={{marginVertical:60}}>
                    <View style={styles.row}> 
                        <Text style={styles.textGray}>Already have an Account ! </Text>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('Login')}
                        >
                            <Text style={styles.textGreen}>Click Here</Text>
                        </TouchableOpacity>                   
                    </View>
                </View>

            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    back:{
        backgroundColor:'#191919',
        flex: 1
    },loginButton:{
        backgroundColor:'#37B43F',
        height:50,
        width:120,
        flexDirection:'row', 
        justifyContent:'space-around',
        borderRadius:40,
        marginTop:50,
        marginLeft:150,
    },
    row:{
        flexDirection:'row',
        justifyContent:'center'
    },
    greenicon:{
        color:'#37B43F',
        fontSize:20,
        paddingLeft:25,
        paddingTop:15,
    },
    text3:{
        fontFamily: 'segb',
        color:'#989898',
        fontSize:85,
        height: 110,
    
    },
    text4:{
        fontFamily: 'seg',
        color:'#989898',
        fontSize:20,
        marginTop:-10,
        marginBottom:10,
    },
    loginText:{
        fontFamily: 'segb',
        color:'#000',
        fontSize:25,
        marginTop:3
    },
    holerow:{
        marginTop:50,
        paddingHorizontal:10
    },
    row2:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    holeWhite:{
        backgroundColor:'#4A4A4A',
        height:25,
        width:25,   
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        borderBottomLeftRadius:6,
    },
    holegray:{
        backgroundColor:'#191919',
        height:15,
        width:15,   
        borderTopLeftRadius:6,
        marginTop:-15,
        marginLeft:10,
        zIndex:2
    },
    inputback:{
        marginHorizontal:40,
        height:50,
        borderRadius:25,
        backgroundColor:'#2A2A2A',
        flexDirection:'row',
        marginVertical:20
    },
    input1:{
        marginHorizontal:20,
        fontFamily:'segb',
        fontSize:18,
        height:50,
        width:270,
        color:'#fff',
        marginTop:-2
    },
    textWhite:{
        color:'#fff',
        fontFamily:'segb',
        fontSize:20
    },
    textGray:{
        color:'#989898',
        fontFamily:'segb',
        fontSize:20
    },
    textGreen:{
        color:'#37B43F',
        fontFamily:'segb',
        fontSize:20
    },
    hori:{
        flexDirection:'column',
        justifyContent:'space-between'
    },
    textError:{
        color:'#B43737',
        fontFamily:'seg',
        fontSize:15,
        marginLeft:230, 
        marginTop:10,
    },
    spinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    }
    
    });
    
    export default SignupScreen;