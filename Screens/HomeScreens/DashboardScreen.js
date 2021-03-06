import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Modal, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import   {color}  from '../../theme/theme';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";


const DashboardScreen = (porps) => {

    const [focus, setFocus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false);
    const [responseShow, setResponseShow] = useState([]);


    const chooseFile = async () => {

    
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
         console.log('Response = ', response.uri);
         setPhoto(response.uri)
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            // alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', response.uri);
            fileUplaod(response.uri )
          }
        });
    }
    
    const launchCamera = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchCamera(options, (response) => {
        // console.log('Response = ', response.uri);
    
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          // alert(response.customButton);
        } else {
          const source = { uri: response.uri };
          fileUplaod(response.uri )
          // console.log('response', JSON.stringify(response));
          // this.setState({
          //   filePath: response,
          //   fileData: response.data,
          //   fileUri: response.uri
          // });
        }
      });
    
    }

    const fileUplaod = (file) =>{
        setLoading(true)
        let formData = new FormData();
        var time= new Date().getTime();
        formData.append('file', {uri: file, name: time+'image.jpeg', type: 'image/jpeg'}) 


      axios({
            method: 'POST',
            url: `http://65.0.42.250:3016/UploadMeds`,
            data: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
            },
          })
            .then(function (response) {
            console.log(response.data);
            UploadOCR(response.data.filename)
            ToastAndroid.show("Image Upload successfully.", ToastAndroid.SHORT);
            setModalVisible(false)

            })
            .catch(function (error) {
            console.log(error);
            setLoading(false)
            ToastAndroid.show("Please try again.", ToastAndroid.SHORT);
            setModalVisible(false)
            });
    }

    const UploadOCR = (file) =>{
        
            // var data = {
            //     url: 
            // }
            var params = JSON.stringify({
                "url": "https://storage.googleapis.com/hanumaan-d55d8.appspot.com/medscan/"+file
            }
            );
            console.log(params) 
            axios.post(`https://ocr-sample-test.cognitiveservices.azure.com/vision/v3.1/ocr`, params, {
                headers: {
                    'Content-Type': 'application/json',
                    // Accept: 'application/json',
                    'Ocp-Apim-Subscription-Key':'fb94c91ac07a4cfd86f491e41af7fc80'
                },
            })
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            setResponseShow(JSON.stringify(response.data));
            setLoading(false)
            // ToastAndroid.show("Image Upload successfully.", ToastAndroid.SHORT);
            // setModalVisible(false)
            })
            .catch(function (error) {
            console.log('file',error);
            setLoading(false)
            // ToastAndroid.show("Please try again.", ToastAndroid.SHORT);
            // setModalVisible(false)
            });
            // axios({
            //     method: 'POST',
            //     url: `https://centralindia.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-1-ga/operations/56f91f2e778daf14a499f20d`,
            //     params,
            //     headers: {
            //     'Content-Type': 'application/json',
            //     'Ocp-Apim-Subscription-Key':"fb94c91ac07a4cfd86f491e41af7fc80"
            //     },
            //   })
    }

    return (
        <View style={styles.container}>
              <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => {setLoading(false)}}>
            <View style={styles.modalBackground}>
                <ActivityIndicator size="large" color={color.secondary} />
            </View>
            </Modal>
                <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={styles.modalText}>Choose</Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginVertical:20}}>
                <TouchableOpacity style={{marginHorizontal:40}} onPress={()=>{launchCamera()}}>
                <Icon name={'camera'} size={50} color={'#757575'} />
                <Text style={{textAlign:'center', letterSpacing:1,marginTop:10,fontSize:18}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:40}} onPress={()=>{chooseFile()}}>
                <Icon name={'image'} size={50} color={'#757575'} />
                <Text  style={{textAlign:'center', letterSpacing:1,marginTop:10,fontSize:18}}>Gallery</Text>
                </TouchableOpacity>
            </View>
          <TouchableOpacity  style={{width:'100%'}}  onPress={() => {
                setModalVisible(!modalVisible);
              }}>
            <Text style={[styles.modalText,{textAlign:'right', paddingTop:10}]}>CANCEL</Text>
            </TouchableOpacity> 
            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
        <StatusBar
           animated={false}
           // hidden={true}
           backgroundColor={color.primary}
           barStyle={"light-content"}
           showHideTransition={'slide'}
           />
           <View style={styles.headerStyles}>
                <Text style={styles.textHeader}>
                    Dashboard
                </Text>
           </View>
             {/* <Scr/ollView > */}
           {/* <View style={styles.boxContainer}> */}
               
           {/* </View> */}
           <ScrollView>
           <Text style={{fontSize:18,paddingHorizontal:20,paddingVertical:10,lineHeight:30}}>
              { responseShow}
            </Text>
            </ScrollView>
           <TouchableOpacity style={styles.flotingButton} onPress={()=>setModalVisible(true)}>
                <Icon name={"camera"} color={color.white} size={20} />
           </TouchableOpacity>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: color.white,
       alignItems:'center',
    },
    modalBackground: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 3,
        padding: 25,
        paddingBottom:10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        width:'80%',
        // height:'40%',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 10,
        textAlign: "left",
        width:'100%',
        fontSize:20,
        color:'#204482',
        letterSpacing:1,
        
      },
    textHeader:{
        textAlign:'center',
        color:color.white,
        fontSize:18,
        textTransform:'uppercase',
        letterSpacing:1
    },
    headerStyles:{
        width:"100%",
        height:60,
        backgroundColor:color.primary,
        alignItems:'center',
        justifyContent:'center',
    },
    flotingButton:{
        height:70,
        width:70,
        borderRadius:35,
        backgroundColor:color.primary,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        bottom:10,
    },
    boxContainer:{
        backgroundColor:color.white,
        width:'100%',
        height:'100%',
        // marginTop:'6%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        alignItems:'center',
        // justifyContent:'center',
    },
});

export default DashboardScreen;
