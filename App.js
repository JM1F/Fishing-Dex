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
import {SearchBar, Divider, Icon } from 'react-native-elements';
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
      
    const onSubmit = data => {console.log(data)
        
        addFishData("1", "2", "3"),
        amendArray(),
        navigation.navigate('DefaultScreen')
    }
            
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2B292C'}}>
            <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            backgroundColor='rgb(43, 41, 44)'
            >
                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 28, fontWeight: '700'}}>Fish Entry</Text>

                <Divider orientation='horizontal' width={10} color={'#384955'} margin={10} borderRadius={10}/>

                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 24, fontWeight: '700', marginBottom: 25}}>Image</Text>

                <View style={{flexDirection: 'row', alignSelf: 'center', margin: 10}}>
                    <TouchableOpacity style={{right: '100%'}}>
                        <Text style={{ color: '#367EA7', fontWeight: '700'}}>Take a photo</Text>
                        <Icon size={scale(64)} name='camera'  type='evilicon'  color='white' />
                    </TouchableOpacity>

                    <TouchableOpacity style={{left: '100%'}}>
                        <Text style={{ color: '#367EA7', fontWeight: '700'}}>Add a photo</Text>
                        <Icon size={scale(64)} name='image'  type='evilicon'  color='white' />
                    </TouchableOpacity>
                </View>
                <Divider orientation='horizontal' width={5} color={'#384955'} margin={10} borderRadius={10}/>

                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 24, fontWeight: '700'}}>Name</Text>

                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Name *</Text>

                <Controller        
                    control={control}        
                    name="fishName"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish name...'}
                    />       
                    )}
                    rules={{
                    required: {
                        value: true,
                    }
                    }}
                />

                {errors.fishName?.type === "required" &&
                
                <Text style={{marginLeft: 10, color: 'red', fontWeight: '700', fontSize: 16, textAlignVertical: 'center'}}>
                    <Icon size={scale(14)} name='exclamation-triangle'  type='font-awesome-5'  color='red' style={{marginRight: scale(10)}} />
                    Field is required!
                </Text>}
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Known As</Text>
                <Controller        
                    control={control}        
                    name="knownAsName"        
                    render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Also known as...'}
                    />       
                    )}
                    
                />
                
                <Divider orientation='horizontal' width={4} color={'#384955'} margin={10} borderRadius={10}/>

                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 24, fontWeight: '700'}}>Profile</Text>

                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Family</Text>
                <Controller        
                    control={control}        
                    name="fishFamily"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish family...'}
                    />       
                    )}
                    
                />
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Genus</Text>
                <Controller        
                    control={control}        
                    name="fishGenus"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish genus...'}
                    />       
                    )}
                    
                />
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Species</Text>
                <Controller        
                    control={control}        
                    name="fishSpecies"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish species...'}
                    />       
                    )}
                    
                />

                <Divider orientation='horizontal' width={3} color={'#384955'} margin={10} borderRadius={10}/>

                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 24, fontWeight: '700'}}>Description</Text>

                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Description</Text>
                <Controller        
                    control={control}        
                    name="fishDescription"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10, height: 150, textAlignVertical: 'top'}}
                    placeholder={'Enter fish description...'}
                    multiline={true}
                    />       
                    )}
                    
                />
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Size</Text>
                <Controller        
                    control={control}        
                    name="fishSize"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish size...'}
                    multiline={true}
                    />       
                    )}
                    
                />
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Feeding (Bait)</Text>
                <Controller        
                    control={control}        
                    name="fishFeeding"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish feeding habbits or bait...'}
                    multiline={true}
                    />       
                    )}
                    
                />
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Distribution</Text>
                <Controller        
                    control={control}        
                    name="fishDistribution"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10}}
                    placeholder={'Enter fish distribution or location'}
                    multiline={true}
                    />       
                    )}
                    
                />

                <Divider orientation='horizontal' width={3} color={'#384955'} margin={10} borderRadius={10}/>
                
                <Text style={{alignSelf: 'center', color: '#00BAFF', fontSize: 24, fontWeight: '700'}}>Notes</Text>
                
                <Text style={{color: '#367EA7', margin: 10, marginBottom: 0, fontWeight: '700'}}>Fish Notes</Text>
                <Controller        
                    control={control}        
                    name="fishNotes"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={{backgroundColor: 'white', margin: 10, borderRadius: 10, height: 150, textAlignVertical: 'top'}}
                    placeholder={'Enter fish notes...'}
                    multiline={true}
                    />       
                    )}
                    
                />
                <TouchableOpacity disabled={!isValid} title='Submit'  onPress={ handleSubmit(onSubmit)} style={{marginTop: 50, backgroundColor: '#00BAFF', margin: 10, borderRadius: 10, height: 50, justifyContent: 'center'}} >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500'}}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
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
