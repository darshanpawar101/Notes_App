import React, { useEffect,useState,Component } from 'react';
import { View,Text,StyleSheet,Dimensions,TouchableOpacity,Alert,StatusBar } from 'react-native'; 
import {FontAwesome} from '@expo/vector-icons';
import fire, {addNote,getNote} from '../../fire';
import {connect} from 'react-redux';
import {settheme,setuser} from '../../src/actions/newcolors';

class NewUserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name:'',
          email:'',
          user:[],
          count:0
        };
      }

      /*componentDidMount() {
        const {currentUser} = fire.auth();
        console.log(currentUser.uid);
        fire.database().ref(`/userdetails/${currentUser.uid}`).on('value', data => {
            const items = Object.values(data.val());
            this.setState({user:items});
            console.log(items[0].email);
            this.setState({name:items[0].name});
            this.setState({email:items[0].email});
            this.setState({count:items[0].notes});
        });
    }*/

    

    render(){
        console.log(this.props.themecolors);  
        const showAlert =()=> {  
            Alert.alert(  
                'Logout',  
                'Are you sure you want to logout from app.',  
                [    
                    {text: 'No', onPress: () => console.log('No Pressed')},
                    {  
                        text: 'Yes',  
                        onPress: () => {
                            fire.auth().signOut();
                            this.props.navigation.navigate('Splash')
                        },  
                    },  
                      
                ],  
                {cancelable: false}  
            )  
        }

    return (
        <View style={{
            flex: 1,
            backgroundColor:this.props.themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={this.props.themecolors.bgcolor} barStyle={this.props.themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
            <View style={{flexDirection:'row',flex:1,padding:Dimensions.get('window').width*0.05}}>
                <TouchableOpacity 
                onPress={() =>this.props.navigation.toggleDrawer()}
                >
                    <FontAwesome name="bars" style={{
                        fontSize:20,
                        color:this.props.themecolors.iconcolor,
                        alignSelf:'center',
                        paddingTop:Dimensions.get('window').width*0.01,
                        paddingLeft:Dimensions.get('window').width*0.05,
                        paddingRight:Dimensions.get('window').width*0.05,
                    }}/>
                </TouchableOpacity>
                <Text style={{
                    color:this.props.themecolors.texttitlecolor,
                    fontSize:20,
                    fontFamily:'maneb',
                    alignSelf:'flex-start',
                }}>User Account</Text>
            </View>

            <View style={{flex:3,flexDirection:'column'}}> 
                <View style={{
                    backgroundColor:this.props.themecolors.bgcolor,
                    borderColor:this.props.themecolors.bdcolor,
                    borderWidth:3,
                    borderRadius:Dimensions.get('window').width*0.1,
                    height:Dimensions.get('window').width*0.2,
                    width:Dimensions.get('window').width*0.2,
                    alignSelf:'center',
                    alignContent:'center',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:40,
                        fontFamily:'manr',
                        alignSelf:'center',
                        flexDirection:'column',
                        justifyContent:'center'
                    }}>{this.props.userdetails.name[0]?this.props.userdetails.name[0]:''}</Text>
                </View>
            </View>
            <View style={{flex:7,flexDirection:'column'}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:32,
                        fontFamily:'maneb',
                    }}>{this.props.userdetails.name?this.props.userdetails.name:''}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={styles.heademail}>{this.props.userdetails.email}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:Dimensions.get('window').width*0.1}}>
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:150,
                        fontFamily:'manb',
                    }}>{this.props.userdetails.notes}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:15,
                        fontFamily:'manb',
                    }}>Notes Created</Text>
                </View>

            </View>

            <View style={{flex:2,flexDirection:'column'}}>
                <TouchableOpacity style={{
                    height:50,
                    backgroundColor:this.props.themecolors.inputcolor,
                    borderRadius:50,
                    marginHorizontal:Dimensions.get('window').width/4,
                    flexDirection:'row',
                    justifyContent:'center'
                }}
                onPress={showAlert}
                >
                <FontAwesome name="power-off" style={{
                    fontSize:25,
                    color:'#FF0000',
                    alignSelf:'center'
                }} />
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:20,
                        fontFamily:'maneb',
                        alignSelf:'center',
                        marginHorizontal:Dimensions.get('window').width*0.03
                    }}>Logout</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );

    }
};

const styles = StyleSheet.create({
    back:{
        flex: 1,
        backgroundColor:'#0F121B'
    },
    head:{
        color:'#fff',
        fontSize:20,
        fontFamily:'maneb',
        alignSelf:'flex-start',
    },
    headname:{
        color:'#fff',
        fontSize:32,
        fontFamily:'maneb',
    },
    heademail:{
        color:'#6C737D',
        fontSize:15,
        fontFamily:'manr',
    },
    headcount:{
        color:'#fff',
        fontSize:150,
        fontFamily:'manb',
    },
    headsub:{
        color:'#fff',
        fontSize:15,
        fontFamily:'manb',
    },
    head1:{
        color:'#fff',
        fontSize:40,
        fontFamily:'manr',
        alignSelf:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    whiteicon:{
        fontSize:20,
        color:'#fff',
        alignSelf:'center',
        paddingTop:Dimensions.get('window').width*0.01,
        paddingLeft:Dimensions.get('window').width*0.05,
        paddingRight:Dimensions.get('window').width*0.05,
    },
    head2:{
        color:'#fff',
        fontSize:25,
        fontFamily:'maneb',
        alignSelf:'flex-start',
        marginHorizontal:Dimensions.get('window').width*0.1,
        marginVertical:Dimensions.get('window').width*0.05,
    },
    head3:{
        color:'#fff',
        fontSize:15,
        fontFamily:'maneb',
        alignSelf:'flex-start',
        marginHorizontal:Dimensions.get('window').width*0.1
    },
    pic:{
        backgroundColor:'#000',
        borderColor:'#FFF',
        borderWidth:3,
        borderRadius:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').width*0.2,
        width:Dimensions.get('window').width*0.2,
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    logtext:{
        color:'#fff',
        fontSize:20,
        fontFamily:'maneb',
        alignSelf:'center',
        marginHorizontal:Dimensions.get('window').width*0.03
    }
});

const mapStateToProps = (state) =>{
    console.log('++++++++++++++++++++ start theme state ++++++++++++++++++');
    console.log(state);
    console.log('++++++++++++++++++++ end theme state ++++++++++++++++++');
return {
    themecolors: state.themes.themeColor,
    userdetails:  state.user.userdetails
}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setnewuser:(user)=> dispatch(setuser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewUserScreen);