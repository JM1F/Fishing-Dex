/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, setState, useEffect } from 'react';

import Node from 'react';

import realm, {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
    deleteCurrentFish,

} from "./Data";
import {SearchBar, Divider } from 'react-native-elements';
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
    TextInput,
    Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    scale,
    moderateScale,
    verticalScale

} from './ScaleDevice';

import {useForm, Controller} from 'react-hook-form';


let amendArray = () => { 
    let count = 0;
    returnAllFish().map ( (element) => {
    
    realm.write(() => {
        element.index = count;
        
    })
    count += 1;

})}

const addFishEntryPage = ({route, navigation}) => {
    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid}
      } = useForm({mode: 'onBlur'})
      
    const onSubmit = data => {console.log(data.fishName)
        
        addFishData("1", "2", "3"),
        amendArray(),
        navigation.navigate('DefaultScreen')
    }
            
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2B292C'}}>
            <Text>Add Fish Data</Text>
            <Divider orientation='horizontal' width={2} color={'#384955'}/>
            <Text>Image</Text>
            <Divider orientation='horizontal' width={2} color={'#384955'}/>
            <Text>Name</Text>
            <Controller        
                control={control}        
                name="fishName"        
                render={({field: {onChange, value, onBlur}}) => (            
                <TextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                style={{backgroundColor: 'white', margin: 10}}
                />       
                )}
                rules={{
                required: {
                    value: true,
                    message: 'Field is required!'
                    
                }
                }}
            />
            <Controller        
                control={control}        
                name="familyName"        
                render={({field: {onChange, value, onBlur}}) => (            
                <TextInput
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                style={{backgroundColor: 'white', margin: 10}}
                />       
                )}
                rules={{
                required: {
                    value: true,
                    message: 'Field is required!'
                    
                }
                }}
            />
            
            
            <Divider orientation='horizontal' width={2} color={'#384955'}/>
            <Text>Profile</Text>
            <Divider orientation='horizontal' width={2} color={'#384955'}/>
            <Text>Description</Text>
            <Divider orientation='horizontal' width={2} color={'#384955'}/>
            <Button disabled={!isValid} title='Submit' 
            onPress={ 
                    handleSubmit(onSubmit)
            }/>
            
        </SafeAreaView>
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

    useEffect(() => {
        const focusDefaultPage = navigation.addListener('focus', () => {
          setData(returnAllFish());
        });
        return focusDefaultPage;
      }, [navigation]);
    
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
    

    
    let checkCardName = () => {
        console.log("yooooooooo")
        
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
                    navigation.navigate('addFormPage')
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
