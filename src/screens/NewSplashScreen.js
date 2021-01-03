import React,{Component} from 'react';
import {View,Text,Image,Dimensions} from 'react-native';
import fire, {addNote,getNote} from '../../fire';
import {connect} from 'react-redux';

class NewSplashScreen extends Component {

    componentDidMount(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user != null)
            {
                this.props.navigation.navigate('NewNotes');
            }
            else
            {
                this.props.navigation.navigate('Menu');
            }
        }
        );
    }

    render(){
        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:this.props.themecolors.bgcolor
            }}>
                <Image
                    style={{
                        height:Dimensions.get('window').width*0.3,
                        width:Dimensions.get('window').width*0.3,
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    source={require('../../assets/images/image.png')}
                />
            </View>
        );
    }
    
};


const mapStateToProps = (state) =>{
    console.log('++++++++++++++++++++ start theme state ++++++++++++++++++');
    console.log(state);
    console.log('++++++++++++++++++++ end theme state ++++++++++++++++++');
return {
    themecolors: state.themes.themeColor
}
}

export default connect(mapStateToProps)(NewSplashScreen); 