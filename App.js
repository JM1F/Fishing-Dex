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
    deleteSecondToLastFish,
    deleteCurrentFish,

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
    Image,

} from 'react-native';

import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

let index =  returnAllFish().length;

const App = () => {

    const isDarkMode = useColorScheme() === 'dark';
    
    const [data, setData] = useState(returnAllFish());

    const dummyArray = ['one', 'two', 'three', 'four'];
    const varr = "hellllllo";

    let arr = returnAllFish().map( (element) => { 
        return <TouchableOpacity style={styles.testTextStyle}  >
                <Text style={{textAlign: 'center'}}>Hello, {element.family}</Text>

                <TouchableOpacity style={{position: 'absolute', top: '80%', alignSelf: 'flex-end', right: '5%'}} onPress={() => {
                deleteCurrentFish(element.index)
                amendArray()
                setData(returnAllFish())
            }}>
                    <Image style={styles.deleteImageStyle} source={require('./Images/trash.png')}/>
                </TouchableOpacity>
                
                <Text style={{position: 'absolute', top: '80%', alignSelf: 'flex-start', left: '5%'}}>"EB"</Text>
                   
                
                
            </TouchableOpacity>
            
    } )

    let amendArray = () => { 
        let count = 0;
        returnAllFish().map ( (element) => {
        
        realm.write(() => {
            element.index = count;
            
        })
        count += 1;

    })}
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
                    deleteSecondToLastFish()
                    amendArray()
                    setData(returnAllFish())      
                    }}>
                    <Text style={styles.testTextStyle}>-</Text>
                </TouchableOpacity>
            </View>

            <View >
                <TouchableOpacity onPress={() => {
                    addFishData('1'+index, 'fish2', 'fish3')
                    amendArray()
                    setData(returnAllFish())
                    console.log(returnAllFish());
                    index += 1;
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
        backgroundColor: 'orange',
        width: moderateScale(150),
        height: verticalScale(150),
        margin: scale(10),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        
        },
    removeButtonStyle: {
        alignSelf: 'flex-end'
    },
    mainButtonTextStyle: {
        alignSelf: 'center',
        
    },
    deleteImageStyle: {
        width: moderateScale(20),
        height: verticalScale(20),
    }

});

export default App;
