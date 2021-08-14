/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import Node from 'react';

import realm, {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,

} from "./Data";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState(returnAllFish());

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white, flexDirection: 'row', justifyContent: 'flex-end'
         }}>

        <Text style={[styles.testTextStyle , { alignSelf: 'flex-start' }] } onPress={() => {
            addFishData("fish1", "fish2", "fish3", "fish4")
            setData(returnAllFish())
        }}> {JSON.stringify(returnAllFish())} </Text>

        <Text style={[styles.testTextStyle ]} onPress={() => {
            addFishData("fish1", "fish2", "fish3", "fish4")
            setData(returnAllFish())
        }}> {JSON.stringify(returnAllFish())} </Text>

        <Text style={ styles.testTextStyle } onPress={() => {
            deleteLastFish()
            setData(returnAllFish())
        }}>{JSON.stringify(returnAllFish()).length}</Text>

        <Text style={styles.testTextStyle } onPress={() => {
            deleteAllFish()
            setData(returnAllFish())
                  
        }}>Delete All</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    
    testTextStyle: {
        fontSize: moderateScale(14),
        backgroundColor: 'orange',
        width: moderateScale(150),
        margin: scale(10),
        borderRadius: scale(10),
        
    },



});

export default App;
