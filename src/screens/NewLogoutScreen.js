import React from 'react';
import {Text,View,TouchableOpacity,Dimensions,StatusBar} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const NewLogoutScreen = ({navigation}) => {
    
    return (
        <View>
            <StatusBar backgroundColor="#0F121B" barStyle="light-content" />
            <TouchableOpacity
                    style={{flexDirection:'row',justifyContent:'center'}}
                    onPress={()=>navigation.toggleDrawer()}
                    >
                        <FontAwesome name="bars" style={{
        fontSize:50,
        color:'#000000',
        alignSelf:'center',
        paddingLeft:Dimensions.get('window').width*0.05,
        paddingRight:Dimensions.get('window').width*0.05,
    }}/>
                    </TouchableOpacity>
        </View>
    );
}

export default NewLogoutScreen;