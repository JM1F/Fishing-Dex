/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, setState } from 'react';

import Node from 'react';

import realm, {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
    deleteCurrentFish,

} from "./Data";
import { Button, SearchBar } from 'react-native-elements';
import {
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
    Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

let amendArray = () => { 
    let count = 0;
    returnAllFish().map ( (element) => {
    
    realm.write(() => {
        element.index = count;
        
    })
    count += 1;

})}

const addFishEntryPage = ({route, navigation}) => {

    return (
        <View style={{backgroundColor: 'red', height: '100%', width: '100%'}}>
            <TouchableOpacity style={{backgroundColor: 'blue', height: '10%', width: '10%' }} 
            onPress={
                addFishData("1", "2", "3"),
                amendArray()
                
                
            }>

            </TouchableOpacity>

        </View>
    )
}


const testNavPage = ({ route, navigation}) => {
    const {fishElement} = route.params;

    return (
        
        <View style={[{backgroundColor: '#2B292C'}, styles.itemShadow]}>
             <Image source={require('./DefaultImages/tester.jpg')} style={{width: '100%', height: '50%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} resizeMode={'cover'}/>
        </View>
    );  
};


const defualtPage = ({ navigation }) => {

    const [data, setData] = useState(returnAllFish());
    const [searchData, searchSetData] = useState('');
    
    
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
        
    let checkCardName = (searchData) => {
        console.log(searchData)
        
    }

    return ( 
    <SafeAreaView style={{ flex: 1,
        backgroundColor: '#2B292C'}}>
      <StatusBar barStyle='default' backgroundColor='rgb(43, 41, 44)'/>
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        backgroundColor='rgb(43, 41, 44)'
        >
        
        <View
            style={{
                backgroundColor: '#2B292C', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap',
        }}>
            <View style={[{width: '100%', padding: 20}]}>
                <SearchBar  inputContainerStyle={{backgroundColor: 'white'}}
                            leftIconContainerStyle={{backgroundColor: 'white'}}
                            inputStyle={{backgroundColor: 'white'}}
                            containerStyle={[{
                            backgroundColor: 'white',
                            justifyContent: 'space-around',
                            borderRadius: 10,
                            height: 50
                            }, styles.itemShadow]}
                            onChangeText={text => searchSetData(text)}
                            placeholder={'Type fish here...'}
                            autoCapitalize='none'
                            value={searchData}
                            onSubmitEditing={() => checkCardName(searchData)}
                            />    
            </View>
            { arr }

            <View >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('addFormPage');
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
            <Stack.Screen name='addFormPage' component={addFishEntryPage} options={{ headerShown: false }}/>
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
