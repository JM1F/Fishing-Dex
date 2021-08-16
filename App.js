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
    Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';

import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

const App = () => {

    const isDarkMode = useColorScheme() === 'dark';


    const [data, setData] = useState(returnAllFish());

    const dummyArray = ['one', 'two', 'three', 'four'];
    const varr = "hellllllo";

    let arr = returnAllFish().map( (element) => { 
        
        return <View > 
            <TouchableOpacity >
                <Text style={styles.testTextStyle}>Hello, {element.family}</Text>
            </TouchableOpacity>
            </View>
    } )

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View
            style={{
                backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap',
        }}>
            
            { arr }

            <View >
                <TouchableOpacity onPress={() => {
                    deleteAllFish() 
                    setData(returnAllFish()) 
                    }}>
                    <Text style={styles.testTextStyle}>-</Text>
                </TouchableOpacity>
            </View>

            <View >
                <TouchableOpacity onPress={() => {
                    addFishData('fish1', 'fish2', 'fish3', 'fish4')
                    setData(returnAllFish()) 
            }}>
                    <Text style={styles.testTextStyle}>+</Text>
                </TouchableOpacity>
            </View>

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
        height: verticalScale(150),
        margin: scale(10),
        borderRadius: scale(10),
        textAlign: 'center',
        textAlignVertical: 'center',
    },

});

export default App;
