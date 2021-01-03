import React from 'react';
import {View,Text,Dimension,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const DateFormat = ({date,month,year,hours,minutes,style,themecolors}) =>{
    const curyear = new Date().getFullYear();
    return(
        <View style={{flexDirection:'row'}}>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{date}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{date%10==1?'st':date%10==2?'nd':date%10==3?'rd':'th'}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>  </Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{month==1?'Jan':month==2?'Feb':month==3?'Mar':month==4?'Apr':month==5?'May':month==6?'Jun':month==7?'Jul':month==8?'Aug':month==9?'Spt':month==10?'Oct':month==11?'Nov':month==1?'Dec':' '}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{curyear-year>0?year:''}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}> - </Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{hours==0?'12':hours-10<0?'0'+hours:hours-12<10?'0'+(hours-12):hours}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>:</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{minutes}</Text>
            <Text style={{
                fontFamily: 'manb',
                fontSize: 13 ,
                color:themecolors.texttitlecolor,
            }}>{hours>12?' pm ':' am '}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
date:{
    fontFamily: 'maneb',
    fontSize: 13 ,
    color:'#000000',
}
});


const mapStateToProps = (state) =>{
return {
    themecolors: state.themes.themeColor
}
}

export default connect(mapStateToProps)(DateFormat);