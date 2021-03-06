import React,{ useState} from 'react';
import { Text, View, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity ,ScrollView, ActivityIndicator, Modal, Keyboard, ToastAndroid } from 'react-native';
// import { TextInput  } from 'react-native-paper';
import   {color}  from '../../theme/theme';
// import PhoneInput from 'react-native-phone-input';
var { height,width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput  } from 'react-native-paper';
import { colors } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import firebaseSetup from "../../setup";


const LoginScreen = (props) => {
    const { auth, firebase } = firebaseSetup(); 
    var Phone = '';
    const [phone, setPhone] = useState('+91');
    const [confirm, setConfirm] = useState(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
 const signInWithPhoneNumber = async () => {
    try{
    setLoading(true)
    Keyboard.dismiss();
     console.log(phone)
     const confirmation = await auth().signInWithPhoneNumber(phone);
     console.log(confirmation)
       setConfirm(confirmation);
       setLoading(false)
    }catch(err){
       console.log(err)
       setLoading(false)
    }
 }

 const confirmCode= async () =>{
    Keyboard.dismiss();
    setLoading(true)
    try {
        var value= await  confirm.confirm(password);
        props.navigation.navigate("DashboardScreen");
        setLoading(false)
        console.log(value)
    } catch (error) {
      ToastAndroid.show("Invalid code.", ToastAndroid.SHORT);
      console.log('Invalid code.',error);
      setLoading(false)
    }
}


    return (
        <View style={styles.container}>
        <StatusBar
           animated={false}
           // hidden={true}
           backgroundColor={color.primary}
           barStyle={"light-content"}
           showHideTransition={'slide'}
           />
             {/* <Scr/ollView > */}
             <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {setLoading(false)}}>
            <View style={styles.modalBackground}>
                <ActivityIndicator size="large" color={color.secondary} />
            </View>
            </Modal>
           <View style={styles.boxContainer}>
           
               <View style={{width:'100%',paddingHorizontal:7,marginTop:7}}>
                <TouchableOpacity style={{width:40,height:40,borderRadius:15,backgroundColor:color.primary,justifyContent:'center',alignItems:'center'}} onPress={()=>{props.navigation.goBack()}}>
                    <Icon name={"angle-left"} size={25} color={"#fff"}/>
                </TouchableOpacity>
                </View>
               <Image 
                    source={require('../../assets/med.png') }
                    style={{width:'100%',height:'40%',marginTop:10,}}
                    resizeMode="contain"
                    />
            <View style={styles.loginView}>             
            <View style={styles.inputText}>
                <Text style={styles.loginText}>
                     Login Here   
                </Text>
                {confirm == null ?
               <TextInput
                    ref={input => (Phone=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    maxLength={13}
                    outlineColor={color.primary}
                    label="Mobile"
                    keyboardType="number-pad"
                    theme={{backgroundColor:'#fff', colors: { primary: color.secondary,underlineColor:'transparent',}}}
                     value={phone}
                    onChangeText={text => {setPhone(text);}}
                    left={<TextInput.Icon name={() => <Icon name={'phone'} size={20} color={color.secondary} />} />}
                />
               :
               <>
                <TextInput
                    ref={input => (Phone=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    maxLength={6}
                    outlineColor={color.primary}
                    label="Otp"
                    keyboardType="number-pad"
                    theme={{backgroundColor:'#fff', colors: { primary: color.secondary,underlineColor:'transparent',}}}
                     value={password}
                    onChangeText={text => {setPassword(text);}}
                    left={<TextInput.Icon name={() => <Icon name={'lock'} size={20} color={color.secondary} />} />}
                />
                <Text style={styles.textTry} onPress={()=>{setConfirm(null)}}>
                    Try Again
                </Text>
                </>
                }
                </View>
                {confirm == null ?
                <TouchableOpacity style={styles.buttonView} onPress={()=>{signInWithPhoneNumber()}}>

                    <Text style={styles.textButton}>
                        Login
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonView} onPress={async() =>{  confirmCode()}}>
              {
                <Text style={styles.textButton}>OTP VERIFICATION</Text>
              }
            </TouchableOpacity>
                }
            </View>
           
           </View>
           {/* </ScrollView>     */}
   </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: color.primary,
    },
    modalBackground: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
    textTry:{
        paddingTop:10,
        textDecorationLine:"underline",
        color:color.red,
        textAlign:'right'
    },
    loginView:{
        width:'85%', 
        justifyContent:'center',
        alignItems:'center', 
        paddingVertical:20,
        marginHorizontal:20,
        elevation:2,
        backgroundColor:color.white, 
        borderRadius:10,
    },
    loginText:{
        fontSize:18,
        color:color.black,
        paddingVertical:20,
        opacity:.7,
        textAlign:"center",
        marginBottom:10,
        textTransform:'uppercase',

    },
    textButton:{
        paddingVertical:15,
        fontSize:20,
        color:color.white,
        textAlign:'center',
        letterSpacing:1
    },  
    buttonView:{
        width:'80%',
        // height:70,
        backgroundColor:color.primary,
        borderRadius:10,
        // position:'absolute',
        // bottom:20,
        marginTop:30,
        // right:10,
        justifyContent:'center',
        alignItems:'center',
    },
    inputText:{
        width:'80%',
        // backgroundColor:'#ccee',
        
    },
    boxContainer:{
        backgroundColor:color.white,
        width:'100%',
        height:'100%',
        marginTop:'6%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        alignItems:'center',
        // justifyContent:'center',
    },
   
})

export default LoginScreen;
