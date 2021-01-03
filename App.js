import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator } from 'react-navigation-drawer';
import * as Font from 'expo-font';
import IndexScreen from './src/screens/IndexScreen';
import { useState } from 'react';
import React,{ Component } from 'react';
import { StyleSheet, View, Text ,StatusBar, Platform  } from 'react-native';
import {AppLoading} from 'expo';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MenuScreen from './src/screens/MenuScreen';
import NewSignupScreen from './src/screens/NewSignupScreen';
import NewLoginScreen from './src/screens/NewLoginScrenn';
import NewNotesScreen from './src/screens/NewNotesScreen';
import NewCreateScreen from './src/screens/NewCreateScreen';
import NewViewEditScreen from './src/screens/NewViewEditScreen';
import NewLogoutScreen from './src/screens/NewLogoutScreen';
import NewThemeScreen from './src/screens/NewThemeScreen';
import NewAboutScreen from './src/screens/NewAboutScreen';
import NewUserScreen from './src/screens/NewUserScreen';
import NewSplashScreen from './src/screens/NewSplashScreen';

import {FontAwesome} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

const bgcolor = '#366AFD';

const store = configureStore();

console.log(' --------- store start --------------');
console.log(store.getState().themes.themeColor);
console.log(' --------- store end --------------');

//let backcolor = store.getState().themes.themeColor.bgcolor;
 // const [backcolor,setBackcolor] = useState(store.getState().themes.themeColor.bgcolor);
//  const [textcolor,setTextcolor] = useState(store.getState().themes.themeColor.bgcolor);
/*store.subscribe(()=>{
  setBackcolor(store.getState().themes.themeColor.bgcolor);
});*/


const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit:EditScreen,
    Signup:SignupScreen,
    Menu: MenuScreen,
    NewSignup: NewSignupScreen,
    NewLogin: NewLoginScreen,
    NewNotes: NewNotesScreen,
    NewCreate: NewCreateScreen,
    NewViewEdit: NewViewEditScreen,
    Splash: NewSplashScreen
  },
{
  initialRouteName:  'Splash',
    defaultNavigationOptions: {
      headerShown: false,
    }
});

const HomeNavigator = createStackNavigator(
{
  Home: navigator
},
{
  navigationOptions: {
    drawerIcon: ({focused}) => (
      <AntDesign name="home" size={20} color={focused?bgcolor:'white'} />
    )
  },
  contentOptions:{
    activeTintColor:'#FFFFFF',
  },
  defaultNavigationOptions : {
    headerShown: false
  }
}
);

const ThemeNavigator = createStackNavigator(
  {
    Theme: NewThemeScreen
  },
  {
    navigationOptions: {
      drawerIcon: ({focused}) => (
        <Entypo name="brush" size={20} color={focused?bgcolor:'white'} />
      )
    },
    contentOptions:{
      activeTintColor:'#FFFFFF',
    },
    defaultNavigationOptions : {
      headerShown: false
    }
  }
  );

  /*const LogoutNavigator = createStackNavigator(
    {
      Logout: NewLogoutScreen
    },
    {
      navigationOptions: {
        drawerIcon: ({focused}) => (
          <FontAwesome name="sign-out" size={20} color={focused?bgcolor:'white'} />
        )
      },
      contentOptions:{
        activeTintColor:'#FFFFFF',
      },
      defaultNavigationOptions : {
        headerShown: false
      }
    }
    );*/

    const AboutNavigator = createStackNavigator(
      {
        Logout: NewAboutScreen
      },
      {
        navigationOptions: {
          drawerIcon: ({focused}) => (
            <AntDesign name="infocirlceo" size={20} color={focused?bgcolor:'white'} />
          )
        },
        contentOptions:{
          activeTintColor:'#FFFFFF',
        },
        defaultNavigationOptions : {
          headerShown: false
        }
      }
      );

      const UserNavigator = createStackNavigator(
        {
          User: NewUserScreen
        },
        {
          navigationOptions: {
            drawerIcon: ({focused}) => (
              <FontAwesome name="user-circle-o" size={20} color={focused?bgcolor:'white'} />
            )
          },
          contentOptions:{
            activeTintColor:'#FFFFFF',
          },
          defaultNavigationOptions : {
            headerShown: false
          }
        }
        );
  

const DrawerNavigator = createDrawerNavigator ({
  Home:HomeNavigator,
  User:UserNavigator,
  Theme:ThemeNavigator,
  //Logout:LogoutNavigator,
  About:AboutNavigator
  
  },{
    initialRouteName:  'Home',
    defaultNavigationOptions: {
      headerShown: false,

    },
    drawerBackgroundColor:'rgba(0,0,0,0.5)',
    contentOptions:{
      inactiveTintColor: '#FFFFFF',
      activeTintColor:'#366AFD',
    }
  });

//export default createAppContainer(navigator);

const App = createAppContainer(DrawerNavigator);

async function getFonts (){
  await Font.loadAsync({
  'seg':require('./assets/fonts/segoeui.ttf'),
  'segb':require('./assets/fonts/segoeuib.ttf'),
  'segbi':require('./assets/fonts/segoeuiz.ttf'),
  'segi':require('./assets/fonts/segoeuii.ttf'),
  'segsb':require('./assets/fonts/seguisb.ttf'),
  'segbl':require('./assets/fonts/seguibl.ttf'),
  'maneb':require('./assets/fonts/maneb.ttf'),
  'manb':require('./assets/fonts/manb.ttf'),
  'manl':require('./assets/fonts/manl.ttf'),
  'manm':require('./assets/fonts/manm.ttf'),
  'manr':require('./assets/fonts/manr.ttf'),
})
}

export default () => {
  const [fontsLoaded,setFontsLoaded]= useState(false);

 
      

  if(fontsLoaded){
    return (
      <Provider store={store}>
     <App /> 
     </Provider>
    )
  }
  else
  {
    return (
    <AppLoading  
      startAsync={getFonts}
      onFinish={()=> setFontsLoaded(true)}
    />
    )
  }
}