import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity  } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import   {color}  from '../../theme/theme';
import * as Animatable from 'react-native-animatable';

var { height,width } = Dimensions.get('window');
export default class StarterScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                 <StatusBar
                    animated={false}
                    // hidden={true}
                    backgroundColor={color.primary}
                    barStyle={"light-content"}
                    showHideTransition={'slide'}
                    />
                    <View style={styles.boxContainer}>
                        <View style={styles.textCon}>
                            <Text style={styles.textContainer}>
                                Welcome to MedScan
                            </Text>
                            <Text style={styles.textp}>
                                Scan your medicine
                            </Text>
                        </View>
                        <Image 
                            source={require('../../assets/welcome.png') }
                            style={{width:'100%',height:'50%',}}
                            resizeMode="contain"
                            />

                        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('LoginScreen')}}>
                            <Text style={styles.textButton}>
                                Start Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                 
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: color.primary,
    },
    textp:{
        fontSize:18,
        fontWeight:"500",
        color:color.textwe,
        elevation:1,
        paddingVertical:10,
        // opacity:.
    },
    textButton:{
        paddingVertical:15,
        textAlign:'center',
        color:color.white,
        fontSize:20,
        letterSpacing:1,
    },
    textCon:{
        position:'absolute',
        top:'10%',
        alignItems:'center',
    },
    button:{

        borderRadius:10,
        width:width-50,
        marginVertical:20,
        marginHorizontal:20,
        position:'absolute',
        bottom:20,
        backgroundColor:color.primary,
        elevation:5,
    },
    textContainer:{
        fontSize:30,
        fontWeight:'bold',
        color:color.textwe,

        elevation:1,
        marginTop:40,
        // textTransform:"capitalize",
    },
    boxContainer:{
        backgroundColor:color.white,
        width:'100%',
        height:'100%',
        marginTop:'6%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        alignItems:'center',
        justifyContent:'center',
    },
  
   
});

