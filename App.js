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

    const [load, set] = useState(0);

    const dummyArray = ['one', 'two', 'three', 'four'];


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

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity >
                    <Text>Click Me</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.testTextStyle}>
                <TouchableOpacity>
                    <Text>Click ME</Text>
                </TouchableOpacity>
            </View>

            {dummyArray.map((value, index) => {
              return <Text key={index}>{value}</Text>
            })}

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
        
    },



});

export default App;
