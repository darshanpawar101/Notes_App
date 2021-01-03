import React, { Component } from 'react';
import {Text,Button,View,Dimensions,StyleSheet,TouchableOpacity,StatusBar} from 'react-native';
//import { createStackNavigator} from 'react-navigation-stack';
import fire, {addNote,getNote} from '../../fire';
import {connect} from 'react-redux';
import { BackHandler } from 'react-native';

class MenuScreen extends Component{

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
     }

     
     
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
     }
     
     backPressed = () => {
        BackHandler.exitApp();
     }

    render() {
    return (
        <View style={{
            flex: 1,
            backgroundColor:this.props.themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={this.props.themecolors.inputcolor} barStyle={this.props.themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
            <View style={{flex:2,flexDirection:'column',justifyContent:'center',backgroundColor:this.props.themecolors.inputcolor}}>
                <Text style={{
                    color:this.props.themecolors.texttitlecolor,
                    fontSize:50,
                    fontFamily:'maneb',
                    alignSelf:'center',
                }}>Notes </Text>
            </View>
            <View style={{flex:1,flexDirection:'column',justifyContent:'space-evenly',}}>        
                <View style={styles.buttonarea}>
                    <TouchableOpacity
                        onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
                            this.props.navigation.navigate('NewLogin')
                        }}
                        >
                        <View style={{
                            padding:10,
                            backgroundColor:this.props.themecolors.bgcolor,
                            height:50,
                            width: Dimensions.get('window').width/2,
                            justifyContent:'center',
                            flexDirection:'column',
                            borderRadius: Dimensions.get('window').width/2
                        }}>
                            <Text style={{
                                color:this.props.themecolors.texttitlecolor,
                                fontSize:17,
                                fontFamily:'manb',
                                alignSelf:'center'
                            }}>Signin</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonarea}>
                    <TouchableOpacity
                    onPress={() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
                        this.props.navigation.navigate('NewSignup')
                    }}
                    >
                        <View style={{
                            padding:10,
                            backgroundColor:this.props.themecolors.inputcolor,
                            height:50,
                            width: Dimensions.get('window').width/2,
                            justifyContent:'center',
                            flexDirection:'column',
                            borderRadius: Dimensions.get('window').width/2
                        }}>
                            <Text style={styles.blue}>Create Account</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    fontSize:50,
    fontFamily:'maneb',
    alignSelf:'center',
},
buttonarea:{
    alignSelf:'center',
},
white:{
    color:'#fff',
    fontSize:17,
    fontFamily:'manb',
    alignSelf:'center'
},
blue:{
    color:'#366AFD',
    fontSize:17,
    fontFamily:'manb',
    alignSelf:'center'
},
buttonbg:{
    padding:10,
    backgroundColor:'#0F121B',
    height:50,
    width: Dimensions.get('window').width/2,
    justifyContent:'center',
    flexDirection:'column',
    borderRadius: Dimensions.get('window').width/2
},
buttonbg2:{
    padding:10,
    backgroundColor:'#191B27',
    height:50,
    width: Dimensions.get('window').width/2,
    justifyContent:'center',
    flexDirection:'column',
    borderRadius: Dimensions.get('window').width/2
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

export default connect(mapStateToProps)(MenuScreen);