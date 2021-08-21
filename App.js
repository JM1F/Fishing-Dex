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
    Alert,
    ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

let index =  returnAllFish().length;

const testNavPage = ({ route, navigation}) => {
    const {fishElement} = route.params;

    return (
        <View>
             <Text>
                 {JSON.stringify(fishElement.index)}
             </Text>
        </View>
    );
};


const defualtPage = ({ navigation }) => {

    const [data, setData] = useState(returnAllFish());
    let arr = returnAllFish().map( (element) => { 
        return <TouchableOpacity style={[styles.testTextStyle, styles.itemShadow]} onPress={() => {
            navigation.navigate('test', {fishElement: element});
        }} >
                <ImageBackground source={require('./DefaultImages/tester.jpg')} style={{height: '100%' , width:'100%' , borderRadius: 10, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}} resizeMode={'cover'}>
                    <Text style={styles.mainButtonTextStyle}>European Bass</Text>

                    <TouchableOpacity style={[styles.subButton, {right: '5%'}, styles.itemShadow]} onPress={() => {
                    generateYesNoAlert(element)
                    }}>
                        <Image style={styles.subButtonImageStyle} source={require('./Images/trash.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subButton, {left: '5%'}, styles.itemShadow]}>
                        <Image style={styles.subButtonImageStyle} source={require('./Images/writing.png')}/> 
                    </TouchableOpacity>  

                </ImageBackground>
                
                
            </TouchableOpacity>
    } )

    const generateYesNoAlert = (element) => Alert.alert (
        "Delete Notification",
        "Are you sure you want to delete?",
      [
        {text: "Yes", onPress: () => {
            deleteCurrentFish(element.index)
            amendArray()
            setData(returnAllFish())
        } },
        { text: "No"}
      ]
    );
        
    let amendArray = () => { 
        let count = 0;
        returnAllFish().map ( (element) => {
        
        realm.write(() => {
            element.index = count;
            
        })
        count += 1;

    })}


    return ( 
    <SafeAreaView style={{ flex: 1,
        backgroundColor: '#FF5236'}}>
      <StatusBar barStyle='default' backgroundColor='rgb(43, 41, 44)'/>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        backgroundColor='rgb(43, 41, 44)'
        >
        <View
            style={{
                backgroundColor: '#2B292C', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap',
        }}>
            
            { arr }

            <View >
                <TouchableOpacity onPress={() => {
                    addFishData('1'+index, 'fish2', 'fish3')
                    amendArray()
                    setData(returnAllFish())
                    console.log(returnAllFish());
                    index += 1;
            }}>
                    <Text style={[styles.testTextStyle, {textAlign: 'center', textAlignVertical: 'center'}, styles.itemShadow]}>+</Text>
                </TouchableOpacity>
            </View>

        </View>

      </ScrollView>
    </SafeAreaView>
    );
};

const Stack = createNativeStackNavigator();

const App = () => {

    
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='DefaultScreen' component={defualtPage} options={{ headerShown: false }}/>
            <Stack.Screen name='test' component={testNavPage} options={{ headerShown: false }}/>
        </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    
    testTextStyle: {
        width: moderateScale(150),
        height: verticalScale(150),
        margin: scale(10),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    mainButtonTextStyle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: scale(20),
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    subButtonImageStyle: {
        width: moderateScale(20),
        height: verticalScale(20),
    },
    subButton: {
        position: 'absolute',
        top: '80%', 
        alignSelf: 'flex-end',
    },
    itemShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
            }


});

export default App;
