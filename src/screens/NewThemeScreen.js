import React, { useEffect,useState,Component } from 'react';
import { View,Text,StyleSheet,Dimensions,FlatList,TouchableOpacity,StatusBar } from 'react-native'; 
import {FontAwesome} from '@expo/vector-icons';
import fire, {addNote,getNote} from '../../fire';
import {connect} from 'react-redux';
import {settheme,setuser} from '../../src/actions/newcolors';
    

class NewThemeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name:'',
          email:'',
          user:[],
          count:0,
          theme:[
            {id:1,bgcolor:'#F3F3F3',inputcolor:'#FFFFFF',texttitlecolor:'#191B27',textbasecolor:'#6C737D',tilecolor:'#FFFFFF',bdcolor:'#191B27',iconcolor:'#0F121B',themename:'Light Theme'},
            {id:2,bgcolor:'#0F121B',inputcolor:'#191B27',texttitlecolor:'#FFFFFF',textbasecolor:'#6C737D',tilecolor:'#191B27',bdcolor:'#FFFFFF',iconcolor:'#FFFFFF',themename:'Dark Theme'},
          ],
          newtheme:[],
        };
      }
      setnewthemeobject = (item)=>{
        this.setState({newtheme:item});
      }; 
      

    render(){

        const setnewthemeobject = (data)=>{
            this.setState({newtheme:data});
            this.props.setnewtheme(this.state.newtheme);
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
                }}>Theme</Text>
            </View>

           <View style={{flex:9}}>

               <View style={{flex:2,backgroundColor:this.props.themecolors.bgcolor,justifyContent:'center'}}>
                    <Text style={{
                        color:this.props.themecolors.texttitlecolor,
                        fontSize:25,
                        fontFamily:'maneb',
                        alignSelf:'center'
                    }}>Select Theme</Text>
               </View>

               <View style={{flex:5,backgroundColor:this.props.themecolors.bgcolor,justifyContent:'center',paddingHorizontal:Dimensions.get('window').width*0.02}}>

                <FlatList
                data={this.state.theme} 
                keyExtractor={(data) => this.state.theme.id}
                numColumns = {2}
                renderItem={({item})=>{
                    return(
                        <View style={{
                            height:Dimensions.get('window').width*0.7,
                            width:Dimensions.get('window').width*0.44,
                            backgroundColor:this.props.themecolors.bgcolor,
                            marginHorizontal:Dimensions.get('window').width*0.02,
                            marginVertical:Dimensions.get('window').width*0.04}}
                        >
                            <View>
                                <Text style={{
                                    color:this.props.themecolors.texttitlecolor,
                                    fontSize:15,
                                    fontFamily:'manb',
                                    alignSelf:'center',
                                    marginVertical:Dimensions.get('window').width*0.03,
                                }}>{item.themename}</Text>
                                <TouchableOpacity
                                onPress={()=>setnewthemeobject(item)}
                                >       
                                <View style={{
                                    height:Dimensions.get('window').width*0.6,
                                    borderRadius:10,
                                    backgroundColor:item.bgcolor,
                                    borderColor:item.id===this.props.themecolors.id?'#366AFD':this.props.themecolors.inputcolor,
                                    borderWidth:5
                                }}>
                                    <Text style={{
                                        color:item.texttitlecolor,
                                        fontSize:23,
                                        fontFamily:'maneb',
                                        alignSelf:'flex-start',
                                        marginHorizontal:Dimensions.get('window').width*0.05,
                                        marginVertical:Dimensions.get('window').width*0.01,
                                    }}>Notes</Text>

                                <View style={{
                                    height:15,
                                    width:Dimensions.get('window').width*0.34,
                                    alignSelf:'center',
                                    backgroundColor:item.inputcolor,
                                    borderRadius:10
                                }}>
                                </View>

                                <View style={{
                                    height:35,
                                    width:Dimensions.get('window').width*0.34,
                                    alignSelf:'center',
                                    backgroundColor:item.tilecolor,
                                    borderRadius:5,
                                    marginTop:Dimensions.get('window').width*0.04,
                                }}>
                                </View>

                                <View style={{
                                    height:35,
                                    width:Dimensions.get('window').width*0.34,
                                    alignSelf:'center',
                                    backgroundColor:item.tilecolor,
                                    borderRadius:5,
                                    marginTop:Dimensions.get('window').width*0.02,
                                }}>
                                </View>

                                <View style={{
                                    height:35,
                                    width:Dimensions.get('window').width*0.34,
                                    alignSelf:'center',
                                    backgroundColor:item.tilecolor,
                                    borderRadius:5,
                                    marginTop:Dimensions.get('window').width*0.02,
                                }}>
                                </View>

                                <View style={{
                                    height:30,
                                    width:30,
                                    alignSelf:'flex-end',
                                    backgroundColor:'#366AFD',
                                    borderRadius:15,
                                    marginTop:Dimensions.get('window').width*0.02,
                                    marginRight:20
                                }}>
                                </View>
                                

                                </View>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    );
                }}

                />


               </View>

               <View style={{flex:2,backgroundColor:this.props.themecolors.bgcolor,justifyContent:'center'}}>
                   <TouchableOpacity 
                   onPress={()=> this.props.setnewtheme(this.state.newtheme)}
                   style={{
                       backgroundColor:this.props.themecolors.inputcolor,
                        marginHorizontal:Dimensions.get('window').width/5,
                       height:50,
                       padding:10,
                       borderRadius:Dimensions.get('window').width/2,
                   }}>
                        <Text style={{
                            color:this.props.themecolors.texttitlecolor,
                            fontSize:20,
                            fontFamily:'manb',
                            alignSelf:'center'
                        }}>Set Theme</Text>
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
        backgroundColor:'#0F121B',
    },
    head:{
        color:'#fff',
        fontSize:20,
        fontFamily:'maneb',
        alignSelf:'flex-start',
    },
    headname:{
        color:'#fff',
        fontSize:25,
        fontFamily:'maneb',
        alignSelf:'center'
    },
    heademail:{
        color:'#6C737D',
        fontSize:15,
        fontFamily:'manr',
    },
    headcount:{
        color:'#fff',
        fontSize:20,
        fontFamily:'manb',
        alignSelf:'center'
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

    },button:{
        padding:10,
        backgroundColor:'#191B27',
        height:50,
        width: Dimensions.get('window').width/2,
        justifyContent:'center',
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

const mapDispatchToProps = (dispatch) =>{
    return {
        setnewtheme:(theme)=> dispatch(settheme(theme))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewThemeScreen);