import React from 'react';
import {View,Text,ScrollView,StyleSheet,Dimensions,TouchableOpacity,StatusBar} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {connect} from 'react-redux';

const NewAboutScreen = ({navigation,themecolors}) => {
    return(
        <View style={{
            flex: 1,
            backgroundColor:themecolors.bgcolor
        }}>
            <StatusBar backgroundColor={themecolors.bgcolor} barStyle={themecolors.bgcolor==='#F6F7F9'?"dark-content":"light-content"} />
        
            
            <View style={{flexDirection:'row',flex:1,padding:Dimensions.get('window').width*0.05}}>
                <TouchableOpacity 
                onPress={() =>navigation.toggleDrawer()}
                >
                    <FontAwesome name="bars" style={{
                        fontSize:20,
                        color:themecolors.iconcolor,
                        alignSelf:'center',
                        paddingLeft:Dimensions.get('window').width*0.05,
                        paddingRight:Dimensions.get('window').width*0.05,
                        paddingTop:Dimensions.get('window').width*0.01,
                    }}/>
                </TouchableOpacity>
                <Text style={{
                    color:themecolors.texttitlecolor,
                    fontSize:20,
                    fontFamily:'maneb',
                    alignSelf:'flex-start',
                }}> Welcome</Text>
            </View>
            <View style={{flexDirection:'row',flex:1}}>
                <Text style={{
                    color:themecolors.texttitlecolor,
                    fontSize:40,
                    fontFamily:'maneb',
                    alignSelf:'flex-start',
                    marginLeft:Dimensions.get('window').width*0.05
                }}> Welcome</Text>
            </View>
            <View style={{flexDirection:'column',flex:12}}>
                <ScrollView>
                <View style={{marginVertical:Dimensions.get('window').width*0.01}}></View>
                    <View>
                    <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                        Hi, this is the revolutionary Notes 2.0
                        and here you can store all you notes which are related
                        your work or just anything.
                    </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Cloud Storage</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            This application comes with the inbuilt Cloud based
                            storage functionality, thus if you loose your device 
                            or you mistakenly uninstall this Application then 
                            don't  worry, we got your back and all the notes will 
                            be stored to the cloud automatically.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>End-to-End Encryption</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            This application comes with the inbuilt Cloud based
                            storage functionality, thus if you loose your device 
                            or you mistakenly uninstall this Application then 
                            don't  worry, we got your back and all the notes will 
                            be stored to the cloud automatically.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Cloud Storage</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            This application comes with the inbuilt Cloud based
                            storage functionality, thus if you loose your device 
                            or you mistakenly uninstall this Application then 
                            don't  worry, we got your back and all the notes will 
                            be stored to the cloud automatically.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Themes </Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            In this new update there is new option for themes 
                            called dark mode, in dark mode your theme layout 
                            of the app will change to darker theme so that there 
                            will be more eye relaxing experience while using the 
                            app in the night.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Wallpapers</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            In this new update there is support for background 
                            wallpaper and you can choose whichever wallpaper
                            you want from the wallpaper library. You can adjust 
                            the opacity and blur radius of the wallpaper and can
                            set that as a wallpaper.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Web Notes 2.0</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                            You can also use web version of our app and you access
                            your notes of your account. Like this Application you 
                            are able to Create View Update and Delete you notes.
                        </Text>
                    </View>

                    <View>
                        <Text style={{
                            color:themecolors.texttitlecolor,
                            fontSize:25,
                            fontFamily:'maneb',
                            alignSelf:'flex-start',
                            marginHorizontal:Dimensions.get('window').width*0.1,
                            marginVertical:Dimensions.get('window').width*0.05,
                        }}>Security</Text>
                        <Text style={{
                        color:themecolors.textbasecolor,
                        fontSize:15,
                        fontFamily:'maneb',
                        alignSelf:'flex-start',
                        marginHorizontal:Dimensions.get('window').width*0.1
                    }}>
                        This feature will set an accessibility authentication 
                        to the app so that if anyone else try to open the app 
                        then app will request the security pin , fingerprint 
                        check or Face ID if you are an iOS user. 
                        </Text>
                    </View>
                    
                    <View style={{marginVertical:Dimensions.get('window').width*0.1}}></View>
                    
                </ScrollView>
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
        fontSize:20,
        fontFamily:'maneb',
        alignSelf:'flex-start',
    },
    head1:{
        color:'#fff',
        fontSize:40,
        fontFamily:'maneb',
        alignSelf:'flex-start',
        marginLeft:Dimensions.get('window').width*0.05
    },
    whiteicon:{
        fontSize:20,
        color:'#fff',
        alignSelf:'center',
        paddingLeft:Dimensions.get('window').width*0.05,
        paddingRight:Dimensions.get('window').width*0.05,
        paddingTop:Dimensions.get('window').width*0.01,
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

export default connect(mapStateToProps)(NewAboutScreen);