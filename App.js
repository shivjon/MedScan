import  React , {useState, useEffect} from 'react';
import {StyleSheet,} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const App = (props) => {

  return (
      <AppNavigator/>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff'
    },
  
   
});

export default App;