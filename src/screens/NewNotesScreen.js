import React,{useState,useContext,Component,useRef } from 'react';
import {View,Text,Animated, StyleSheet,FlatList,Switch,TouchableOpacity,TextInput,Dimensions,Alert,ScrollView,StatusBar} from 'react-native';
import {Context} from '../context/BlogContext';
import {MaterialIcons} from '@expo/vector-icons';
import fire, {addNote,getNote} from '../../fire';
import {FontAwesome} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import DateFormat from '../components/DateFormat';
import CryptoJS from "react-native-crypto-js";
import { render } from 'react-dom';
import {connect} from 'react-redux';
import {settheme,setuser} from '../../src/actions/newcolors';
import { BackHandler } from 'react-native';
import {
    AdMobBanner,
  } from 'expo-ads-admob';


let newgrid = false;
class NewNotesScreen extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
          search: '',
          gridview:false,
          Grid:'grid',
          data2:[],
          detail:[],
          count:0,
          theme:this.props.themecolors,
          //isEnabled:this.props.themecolors.id===1?false:true,
          theme:[
            {id:1,bgcolor:'#F3F3F3',inputcolor:'#FFFFFF',texttitlecolor:'#191B27',textbasecolor:'#6C737D',tilecolor:'#FFFFFF',bdcolor:'#191B27',iconcolor:'#0F121B',themename:'Light Theme'},
            {id:2,bgcolor:'#0F121B',inputcolor:'#191B27',texttitlecolor:'#FFFFFF',textbasecolor:'#6C737D',tilecolor:'#191B27',bdcolor:'#FFFFFF',iconcolor:'#FFFFFF',themename:'Dark Theme'},
          ],
          fadeAnim: new Animated.Value(0),
        };
      }
    
      /*fetchData=()=>{
        const {currentUser} = fire.auth();
        fire.database().ref(`/notes/${currentUser.uid}`).on('value', data => {
            const items = Object.values(data.val());
            console.log(items);
            this.setState({data:items})
        });
      }*/

     componentDidMount() {

        

        const {currentUser} = fire.auth();
        console.log(currentUser.uid);
        fire.database().ref(`/userdetails/${currentUser.uid}`).on('value', data => {
            const items = Object.values(data.val());
            this.setState({detail:items});
            console.log('----------------------------------');
            console.log(items[0].notes);
            this.setState({count:items[0].notes});
            this.props.setnewuser(items[0]);
            console.log('----------------------------------');
            if(items[0].notes===0){
                console.log('notes are zero');
            }
            else{
                fire.database().ref(`/notes/${currentUser.uid}`).on('value', data => {
                    let newitem = Object.values(data.val());
                    newitem = newitem.filter( newitem => newitem.id !== -1 );
                    console.log(' +++++++++++ start +++++++++++++ ');
                    console.log(newitem);
                    console.log(' +++++++++++ end +++++++++++++ ');
                    if(newitem!==null){
                        this.setState({data:newitem});
                    }
                    
                });
                console.log('notes are not zero');
            }
        });
        
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 1000
          }).start();

      }
        
      componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
     }

     
     
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
     }
     
     backPressed = () => {
       Alert.alert(
         'Exit App',
         'Do you want to exit?',
         [
           {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           {text: 'Yes', onPress: () => BackHandler.exitApp()},
         ],
         { cancelable: false });
         return true;
     }
      

    render(){

        const toggleSwitch = () => {
            //this.setState({isEnabled:!this.state.isEnabled});
            if(this.props.themecolors.id===1?false:true)
            {
                this.props.setnewtheme(this.state.theme[0])
            }else
            {
                this.props.setnewtheme(this.state.theme[1])
            }
        };

        console.log(this.props.themecolors);  
        console.log('==================== Details ====================');
        console.log(this.state.detail[0]);
        console.log('==================== Details ====================');

        const toggleGrid = () => {
            if(this.state.gridview)
            {
                this.setState({gridview: false});
                this.setState({Grid: 'grid'});
                newgrid=false;
            }
            else
            {
                this.setState({gridview: true});
                this.setState({Grid: 'progress-empty'});
                newgrid=true;
            }
        }
    //this.props.themecolors.themename
        if(this.state.count!==0){
            return(
        
                <View style={{
                    flex: 1,
                    backgroundColor:this.props.themecolors.bgcolor
                }}>
                    <StatusBar backgroundColor={this.props.themecolors.bgcolor} barStyle={this.props.themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
                    <ScrollView>
                    <View style={{flex:1,backgroundColor:this.props.themecolors.bgcolor,flexDirection:'row'}}>
                        <Text style={{
                            color:this.props.themecolors.texttitlecolor,
                            fontSize:Dimensions.get('window').height>800? 50 : 40,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginLeft:Dimensions.get('window').width*0.05
                        }}>Notes</Text>
                        <View style={{backgroundColor:this.props.themecolors.bgcolor,flexDirection:'row',justifyContent:'flex-end',flex:1,paddingHorizontal:Dimensions.get('window').width*0.05,paddingTop:Dimensions.get('window').width*0.05}}>
                        
                        <Switch
                            trackColor={{ false: "#3333333", true: "#999999" }}
                            thumbColor={(this.props.themecolors.id===1?false:true) ? "#FFFFFF" : "#555555"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={this.props.themecolors.id===1?false:true}
                        />
                        
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text
                    style={{
                        fontFamily: 'manr',
                        fontSize: 15 ,
                        color:this.props.themecolors.textbasecolor,
                        marginLeft:Dimensions.get('window').width*0.05,
                        marginVertical:Dimensions.get('window').width*0.01,
                    }}
                    >{this.props.userdetails.email}</Text>
                    <Text style={{
                        fontFamily: 'manr',
                        fontSize: 12 ,
                        color:this.props.themecolors.texttitlecolor,
                        marginRight:Dimensions.get('window').width*0.05,
                        marginVertical:Dimensions.get('window').width*0.01,
                        
                    }}>{this.props.themecolors.themename}</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:this.props.themecolors.bgcolor}}>
                        <View>
                        <View style={{
                            height:55,
                            width: Dimensions.get('window').width*0.9,
                            backgroundColor:this.props.themecolors.inputcolor,
                            borderRadius:Dimensions.get('window').width/2,
                            alignSelf:'center',
                            marginVertical:10,
                            flexDirection:'row'
                        }}>
                            <TouchableOpacity
                            style={{flexDirection:'row'}}
                            onPress={()=>this.props.navigation.toggleDrawer()}
                            >
                                <FontAwesome name="bars" style={{
                                    fontSize:25,
                                    color:this.props.themecolors.iconcolor,
                                    alignSelf:'center',
                                    paddingLeft:Dimensions.get('window').width*0.05,
                                    paddingRight:Dimensions.get('window').width*0.05,
                                }}/>
                            </TouchableOpacity>
                            
                            <TextInput 
                                style={{
                                    width: Dimensions.get('window').width*0.6,
                                    color:this.props.themecolors.texttitlecolor,
                                    fontFamily:'manb',
                                    fontSize:15
                                }}
                                placeholder = "Search Your Note"
                                value={this.state.search}
                                onChangeText={(text)=>this.setState({search: text})}
                            />
                            <TouchableOpacity
                            style={{flexDirection:'row'}}
                            onPress={toggleGrid}
                            >
                            <Entypo name={this.state.Grid} style={{
                                    fontSize:25,
                                    color:this.props.themecolors.iconcolor,
                                    alignSelf:'center',
                                    paddingLeft:Dimensions.get('window').width*0.05,
                                    paddingRight:Dimensions.get('window').width*0.05,
                                }}/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <View style={{flex:10,backgroundColor:this.props.themecolors.bgcolor,marginTop:25,marginBottom:Dimensions.get('window').height*0.03,borderRadius:20}}>
                        <View style={{marginHorizontal:Dimensions.get('window').width*0.02}}>    
                            <FlatList 
                            data={this.state.data} 
                            keyExtractor={(data) => this.state.data.id}
                            key = {( this.state.gridview) ? true : false } 
                            numColumns = { this.state.gridview ? 2 : 1 }
        
                            renderItem={({item})=>{
                                const tit = item.title;
                                const con = item.content;
                                if((tit.includes(this.state.search) || this.state.search==='' || con.includes(this.state.search))&& item.id!==-1){
                                return (
                                    
                                    <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate('NewViewEdit',{data:this.state.data,user:this.state.detail[0],id:item.id})}
                                        }>

                                        <Animated.View
                                            style={{
                                                opacity: this.state.fadeAnim, // Bind opacity to animated value
                                                
                                            }}
                                        >

                                       

                                        <View style={{
                                            
                                            minHeight:Dimensions.get('window').width*0.2,
                                            width:this.state.gridview ? Dimensions.get('window').width*0.44:Dimensions.get('window').width*0.92,
                                            paddingHorizontal:Dimensions.get('window').width*0.05,
                                            marginVertical:Dimensions.get('window').width*0.0,
                                            marginTop:Dimensions.get('window').width*0.03,
                                            paddingVertical:Dimensions.get('window').width*0.05,
                                            marginHorizontal:Dimensions.get('window').width*0.02,
                                            borderRadius:10,
                                            borderColor:this.props.themecolors.bdcolor,
                                            borderWidth:item.mark==='star'?1:0,
                                            borderStyle:'dashed',
                                            backgroundColor:item.tilecolor===this.props.themecolors.tilecolor?item.tilecolor:this.props.themecolors.tilecolor==='#FFFFFF'&&item.tilecolor==='#191B27'?this.props.themecolors.tilecolor:this.props.themecolors.tilecolor==='#191B27'&&item.tilecolor==='#FFFFFF'?this.props.themecolors.tilecolor:item.tilecolor,
                                        }}>
                                            
                                            <View style={{flexDirection:'row'}}>  
                                                <Text style={{
                                                    fontFamily: 'manb',
                                                    fontSize: 20,
                                                    color:item.tilecolor==='#FFFFFF'||item.tilecolor==='#191B27'?this.props.themecolors.texttitlecolor:'#FFFFFF',
                                                }}>{ 
                                                //gridview== true ? JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).length>14 ?JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).substring(0, 14)+'...':JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).substring(0, 14):JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).length>33 ?JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).substring(0, 33)+'...':JSON.parse(CryptoJS.AES.decrypt(item.title, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).substring(0, 30)
                                                this.state.gridview== true ? tit.length>14 ?tit.substring(0, 14)+'...':tit.substring(0, 14):tit.length>33 ?tit.substring(0, 33)+'...':tit.substring(0, 30)
                                                
                                                }</Text>
                                            </View>  
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{
                                                    fontFamily: 'manr',
                                                    fontSize: 15 ,
                                                    color:item.tilecolor===this.props.themecolors.tilecolor? this.props.themecolors.textbasecolor:item.tilecolor==='#FFFFFF'&&this.props.themecolors.tilecolor==='#191B27'?this.props.themecolors.textbasecolor:item.tilecolor==='#191B27'&&this.props.themecolors.tilecolor==='#FFFFFF'?this.props.themecolors.textbasecolor:'#FFFFFF',
                                                    paddingTop:10,
                                                }}>{/*JSON.parse(CryptoJS.AES.decrypt(item.content, `${currentUser.uid}`).toString(CryptoJS.enc.Utf8)).substring(0, 150)*/con.substring(0,150)}</Text> 
                                            </View>
        
                                            <View style={{flexDirection:'row',paddingTop:10,}}>
                                            <DateFormat 
                                                date={item.date}
                                                month={item.month}
                                                year={item.year}
                                                hours={item.hours}
                                                minutes={item.minutes}
                                                txtcolor={this.props.themecolors.texttitlecolor}
                                                />
                                            </View>
        
                                        </View>

                                        </Animated.View>
                                    </TouchableOpacity>
                                );
                            }
                            }}
                            
                            />

                            <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                marginHorizontal:Dimensions.get('window').width*0.1,
                                marginVertical:Dimensions.get('window').width*0.1
                            }}>
                            <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID="ca-app-pub-4169681870908265/4096752090" // Test ID, Replace with your-admob-unit-id
                            servePersonalizedAds={false}
                            />
                            </View>
                            


                        </View>
                    </View>
                    </ScrollView>
                    <TouchableOpacity
                    style={styles.button} 
                    onPress={() => this.props.navigation.navigate('NewCreate',{user:this.state.detail[0]})}>
                        <MaterialIcons name="add" style={styles.addicon}/>
                    </TouchableOpacity>
                </View>
                
                
            );
        }
        else{
            return(
        
                <View style={{
                    flex: 1,
                    backgroundColor:this.props.themecolors.bgcolor
                }}>
                    <StatusBar backgroundColor={this.props.themecolors.bgcolor} barStyle={this.props.themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
                    <ScrollView>
                    <View style={{flex:1,backgroundColor:this.props.themecolors.bgcolor}}>
                        <Text style={{
                            color:this.props.themecolors.texttitlecolor,
                            fontSize:Dimensions.get('window').height>800? 50 : 40,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginLeft:Dimensions.get('window').width*0.05
                        }}>Notes</Text>
                    </View>

                    <View>
                    <Text
                    style={{
                        fontFamily: 'manr',
                        fontSize: 15 ,
                        color:this.props.themecolors.textbasecolor,
                        marginLeft:Dimensions.get('window').width*0.05,
                        marginVertical:Dimensions.get('window').width*0.01,
                    }}
                    >{this.props.userdetails.email}</Text>
                    </View>

                    <View style={{flex:1,backgroundColor:this.props.themecolors.bgcolor}}>
                        <View>
                        <View style={{
                            height:55,
                            width: Dimensions.get('window').width*0.9,
                            backgroundColor:this.props.themecolors.inputcolor,
                            borderRadius:Dimensions.get('window').width/2,
                            alignSelf:'center',
                            marginVertical:10,
                            flexDirection:'row'
                        }}>
                            <TouchableOpacity
                            style={{flexDirection:'row'}}
                            onPress={()=>this.props.navigation.toggleDrawer()}
                            >
                                <FontAwesome name="bars" style={{
                                    fontSize:25,
                                    color:this.props.themecolors.iconcolor,
                                    alignSelf:'center',
                                    paddingLeft:Dimensions.get('window').width*0.05,
                                    paddingRight:Dimensions.get('window').width*0.05,
                                }}/>
                            </TouchableOpacity>
                            
                            <TextInput 
                                style={{
                                    width: Dimensions.get('window').width*0.6,
                                    color:this.props.themecolors.texttitlecolor,
                                    fontFamily:'manb',
                                    fontSize:15
                                }}
                                placeholder = "Search Your Note"
                                value={this.state.search}
                                onChangeText={(text)=>this.setState({search: text})}
                            />
                            <TouchableOpacity
                            style={{flexDirection:'row'}}
                            onPress={toggleGrid}
                            >
                            <Entypo name={this.state.Grid} style={{
                                    fontSize:25,
                                    color:this.props.themecolors.iconcolor,
                                    alignSelf:'center',
                                    paddingLeft:Dimensions.get('window').width*0.05,
                                    paddingRight:Dimensions.get('window').width*0.05,
                                }}/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <View style={{flex:10,backgroundColor:this.props.themecolors.bgcolor,marginTop:25,marginBottom:Dimensions.get('window').height*0.03,borderRadius:20,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <View style={{
                                flex:1,
                                flexDirection:'column',marginHorizontal:Dimensions.get('window').width*0.02,justifyContent:'center'}}>    
                            <Text style={{
                            color:this.props.themecolors.texttitlecolor,
                            fontSize:15,
                            fontFamily:'manl',
                            alignSelf:'center',
                        }}>Click plus icon to add note</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                marginHorizontal:Dimensions.get('window').width*0.1,
                                marginVertical:Dimensions.get('window').width*0.1
                            }}>
                            <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID="ca-app-pub-4169681870908265/4096752090" // Test ID, Replace with your-admob-unit-id
                            servePersonalizedAds={false}
                            />
                            </View>

                    </View>
                    </ScrollView>

                    

                    <TouchableOpacity
                    style={styles.button} 
                    onPress={() => {
                        this.props.navigation.navigate('NewCreate',{user:this.state.detail[0]});
                    }
                    
                    }>
                        <MaterialIcons name="add" style={styles.addicon}/>
                    </TouchableOpacity>
                </View>
                
                
            );
        }
    
}          
};

const styles = StyleSheet.create({
    back:{
        flex: 1,
        backgroundColor:'#0F121B'
    },
    head:{
        color:'#fff',
        fontSize:Dimensions.get('window').height>800? 50 : 40,
        fontFamily:'maneb',
        alignSelf:'flex-start',
        marginLeft:Dimensions.get('window').width*0.05
    },
    button:{
        height: Dimensions.get('window').width*0.15,
        width: Dimensions.get('window').width*0.15,
        position:"absolute",
        top:Dimensions.get('window').height*0.85,
        left:Dimensions.get('window').width*0.8,
        backgroundColor:"#366AFD",
        borderRadius: Dimensions.get('window').width*0.1,
        justifyContent:'center',
        
    },
    whiteicon:{
        fontSize:25,
        color:'#fff',
        alignSelf:'center',
        paddingLeft:Dimensions.get('window').width*0.05,
        paddingRight:Dimensions.get('window').width*0.05,
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
    input:{
        width: Dimensions.get('window').width*0.6,
        color:'#fff',
        fontFamily:'manr',
        fontSize:15
    },
    design:{
        maxHeight:Dimensions.get('window').width*0.6,
        minHeight:Dimensions.get('window').width*0.2,
        width:newgrid? Dimensions.get('window').width*0.44:Dimensions.get('window').width*0.84,
        paddingHorizontal:Dimensions.get('window').width*0.05,
        marginVertical:Dimensions.get('window').width*0.0,
        marginTop:Dimensions.get('window').width*0.03,
        paddingVertical:Dimensions.get('window').width*0.05,
        marginHorizontal:Dimensions.get('window').width*0.02,
        borderRadius:10,
        backgroundColor:"#191B27"
    },
    text1:{
        fontFamily: 'manb',
        fontSize: 20,
        color:'#FFFFFF',
        
    },
    text2:{
        fontFamily: 'manr',
        fontSize: 15 ,
        color:'#FFFFFF',
        paddingTop:10,
    },
    text3:{
        fontFamily: 'manb',
        fontSize: 12 ,
        color:'#CBCBCB',
        paddingTop:10,
    },
    addicon:{
        color:'#fff',
        fontSize:30,
        alignContent:'center',
        alignSelf:'center',
        justifyContent:'center'
    },

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
        setnewtheme:(theme)=> dispatch(settheme(theme)),
        setnewuser:(user)=> dispatch(setuser(user))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(NewNotesScreen);