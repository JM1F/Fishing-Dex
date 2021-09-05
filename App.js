/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { 
    useState, 
    setState, 
    useEffect 
} from "react";
import realm, {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
    deleteCurrentFish,
} from "./Data";
import {
    SearchBar,
    Divider, 
    Icon 
} from "react-native-elements";
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
} from "react-native";
import {
    scale,
    moderateScale,
    verticalScale
} from "./ScaleDevice";
import Node from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useForm, Controller} from "react-hook-form";
import ImagePicker from "react-native-image-crop-picker";
import defautFishImage from "./Images/defaultFishProfile.png";

let amendArray = () => { 
    let count = 0;
    returnAllFish().map ( (element) => {
    
    realm.write(() => {
        element.index = count;
        
    })
    count += 1;

})}



const addFishEntryPage = ({route, navigation}) => {
    
    const defaultProfileImage = Image.resolveAssetSource(defautFishImage).uri;
    const [profileImage, setProfileImage] = useState(defaultProfileImage);

    const defaultCoverPicImage = Image.resolveAssetSource(defautFishImage).uri;
    const [coverPicImage, setCoverPicImage] = useState(defaultCoverPicImage);

    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid}
      } = useForm({ mode: "onBlur"})
      
    const onSubmit = data => {console.log(data)
        addFishData(
            coverPicImage,
            profileImage, 
            data.fishName, 
            data.knownAsName, 
            data.fishFamily, 
            data.fishGenus, 
            data.fishSpecies,
            data.fishDescription,
            data.fishSize,
            data.fishFeeding,
            data.fishDistribution,
            data.fishNotes
            ),
        amendArray(),
        navigation.navigate("DefaultScreen")
    }
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("DefaultScreen")}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
            
            
        )
    }
    const takeProfileImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(300),
            height: verticalScale(300),
            cropping: true,
          }).then(image => {
            setProfileImage(image.path);
          });
    
    }
    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(300),
            height: verticalScale(300),
            cropping: true
          }).then(image => {
            setProfileImage(image.path);
          });
    }
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          });
    
    }
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true
          }).then(image => {
            setCoverPicImage(image.path);
          });
    }
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            backgroundColor="rgb(43, 41, 44)"
            >    
                <BackNavigateButton/>

                <Text style={styles.entryFromPageTitle}>Fish Entry</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={styles.entryFormSubHeader1}>Images</Text>
                    
                <Text style={styles.entryFormSubHeader2}>Profile Image</Text>

                <View style={styles.containerViewPictureEntry}>
                    <TouchableOpacity style={{right: "100%"}} onPress={takeProfileImage}>
                        <Text style={styles.textViewPictureEntry}>Take a photo</Text>
                        <Icon size={scale(64)} name="camera"  type="evilicon"  color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{left: "100%"}} onPress={selectProfileImage}>
                        <Text style={styles.textViewPictureEntry}>Add a photo</Text>
                        <Icon size={scale(64)} name="image"  type="evilicon"  color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={ [styles.textViewPictureEntry, {alignSelf: "center"}]}>Chosen profile image</Text>

                <View style={[styles.profileImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : profileImage }} style={[{width: moderateScale(150), height: verticalScale(150)}, styles.entryFormImage]}></Image>
                </View>

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader2}>Cover Photo Image</Text>

                <View style={styles.containerViewPictureEntry}>
                    <TouchableOpacity style={{right: "100%"}} onPress={takeCoverPicImage}>
                        <Text style={styles.textViewPictureEntry}>Take a photo</Text>
                        <Icon size={scale(64)} name="camera"  type="evilicon"  color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{left: "100%"}} onPress={selectCoverPicImage}>
                        <Text style={styles.textViewPictureEntry}>Add a photo</Text>
                        <Icon size={scale(64)} name="image"  type="evilicon"  color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.textViewPictureEntry, {alignSelf: "center"}]}>Chosen cover photo image</Text>
                <View style={[styles.coverImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : coverPicImage }} style={[{width: moderateScale(300), height: verticalScale(150)}, styles.entryFormImage]}></Image>
                </View>
                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Name</Text>

                <Text style={styles.entryFormInputTitle}>Fish Name *</Text>

                <Controller        
                    control={control}        
                    name="fishName"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish name..."}

                    />       
                    )}
                    rules={{
                    required: {
                        value: true,
                    }
                    }}
                />

                {errors.fishName?.type === "required" &&
                
                <Text style={styles.errorFormText}>
                    <Icon size={scale(14)} name="exclamation-triangle"  type="font-awesome-5"  color="red" style={{marginRight: scale(10)}} />
                    Field is required!
                </Text>
                }

                <Text style={styles.entryFormInputTitle}>Known As</Text>

                <Controller        
                    control={control}        
                    name="knownAsName"        
                    render={({field: {onChange, value, onBlur}}) => (            
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Also known as..."}
                    />       
                    )}
                    
                />
                
                <Divider orientation="horizontal" width={scale(4)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Profile</Text>

                <Text style={styles.entryFormInputTitle}>Fish Family</Text>

                <Controller        
                    control={control}        
                    name="fishFamily"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish family..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Genus</Text>
                <Controller        
                    control={control}        
                    name="fishGenus"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish genus..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Species</Text>
                <Controller        
                    control={control}        
                    name="fishSpecies"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish species..."}
                    />       
                    )}
                    
                />

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Description</Text>

                <Text style={styles.entryFormInputTitle}>Fish Description</Text>
                <Controller        
                    control={control}        
                    name="fishDescription"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.largeInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish description..."}
                    multiline={true}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Size</Text>
                <Controller        
                    control={control}        
                    name="fishSize"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish size..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Feeding (Bait)</Text>
                <Controller        
                    control={control}        
                    name="fishFeeding"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish feeding habbits or bait..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Distribution</Text>
                <Controller        
                    control={control}        
                    name="fishDistribution"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish distribution or location..."}
                    />       
                    )}
                    
                />

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
                
                <Text style={styles.entryFormSubHeader1}>Notes</Text>
                
                <Text style={styles.entryFormInputTitle}>Fish Notes</Text>
                <Controller        
                    control={control}        
                    name="fishNotes"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.largeInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish notes..."}
                    />       
                    )}
                    
                />
                <TouchableOpacity disabled={!isValid} title="Submit"  onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}






const testNavPage = ({ route, navigation}) => {
    const {fishElement} = route.params;

    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("DefaultScreen")}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
            
            
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <View style={[{backgroundColor: "#2B292C"}, styles.mediumItemShadow]}>
                <Image source={{ uri : fishElement.coverImage}} style={styles.coverImageStyle} resizeMode={"cover"}/>
            </View>
        </SafeAreaView> 
    )};





const defualtPage = ({ navigation }) => {

    const [data, setData] = useState(returnAllFish());
    const [searchData, searchSetData] = useState("");

    useEffect(() => {
        const focusDefaultPage = navigation.addListener("focus", () => {
          setData(returnAllFish());
          
        });
        return focusDefaultPage;
      }, [navigation]);
    
    let arr = returnAllFish().map( (element) => { 
        return <TouchableOpacity style={[styles.fishButtonStyle, styles.mediumItemShadow]} onPress={() => {
            navigation.navigate("test", {fishElement: element});
        }} >
                <ImageBackground source={{uri : element.profileImage}} style={styles.fishButtonImageBackgroundStyle} resizeMode={"cover"}>
                    <Text style={styles.mainButtonTextStyle}>{element.name}</Text>

                    <TouchableOpacity style={[styles.subButton, {right: "5%"}, styles.mediumItemShadow]} onPress={() => {
                    generateYesNoAlert(element)
                    }}>
                        <Image style={styles.subButtonImageStyle} source={require("./Images/trash.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subButton, {left: "5%"}, styles.mediumItemShadow]}>
                        <Image style={styles.subButtonImageStyle} source={require("./Images/writing.png")}/> 
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
      <StatusBar barStyle="default" backgroundColor="rgb(43, 41, 44)"/>
    

    <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        backgroundColor="rgb(43, 41, 44)"
        >
        <View
            style={{
                backgroundColor: "#2B292C", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap",
        }}>
            <View style={[{width: "100%", padding: scale(20)}]}>
                <SearchBar  inputContainerStyle={{backgroundColor: "white"}}
                            leftIconContainerStyle={{backgroundColor: "white"}}
                            searchIcon={{size: scale(16)}}
                            clearIcon={{size: scale(16)}}
                            inputStyle={{
                            backgroundColor: "white", 
                            fontSize: scale(12)}}
                            containerStyle={[{
                            backgroundColor: "white",
                            justifyContent: "space-around",
                            borderRadius: scale(10),
                            height: verticalScale(50),
                            }, styles.mediumItemShadow]}
                            onChangeText={text => searchSetData(text)}
                            placeholder={"Type fish here..."}
                            autoCapitalize="none"
                            value={searchData}
                            onSubmitEditing={() => checkCardName(searchData)}
                            />    
            </View>
            { arr }
        </View>
        
    </ScrollView>
    <View>
            <TouchableOpacity style={[styles.addButton, styles.mediumItemShadow]} onPress={() => {
                navigation.navigate("addFormPage")
            }}>
                <Icon size={scale(32)} name="add-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
    </View>
      
    </SafeAreaView>
    
    );
};

const Stack = createNativeStackNavigator();
 
const App = () => {   
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="DefaultScreen">
            <Stack.Screen name="DefaultScreen" component={defualtPage} options={{ headerShown: false }} />
            <Stack.Screen name="test" component={testNavPage} options={{ headerShown: false }}/>
            <Stack.Screen name="addFormPage" component={addFishEntryPage} options={{ headerShown: false }}/>
        </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    coverImageContainer: {
        width: moderateScale(300), 
        height: verticalScale(150),
        margin: scale(10),
        alignSelf: "center", 
        borderRadius: scale(10),
        

    },
    profileImageContainer: {
        alignSelf: "center", 
        borderRadius: scale(10),
        width: moderateScale(150), 
        height: verticalScale(150),
        margin: scale(10),
    },
    backButtonEntryScreen: {
        width: scale(40), 
        height: scale(40), 
        borderRadius: scale(100), 
        backgroundColor: "#00BAFF", 
        alignItems: "center", 
        justifyContent: "center", 
        marginLeft: scale(10),
        marginTop: scale(10)
    },
    addButton: {
        width: scale(50),  
        height: scale(50),   
        borderRadius: scale(100),            
        backgroundColor: "#00BAFF",                                    
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",                                    
        bottom: scale(25),                                                    
        right: scale(25), 
    },
    fishButtonStyle: {
        width: moderateScale(150),
        height: verticalScale(150),
        margin: scale(10),
        borderRadius: scale(10),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    },
    fishButtonImageBackgroundStyle: {
        height: "100%", 
        width:"100%", 
        borderRadius: scale(10), 
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    coverImageStyle: {
        width: "100%",
        height: "50%", 
        borderBottomLeftRadius: scale(30), 
        borderBottomRightRadius: scale(30)
    },
    mainButtonTextStyle: {
        color: "white",
        alignSelf: "center",
        fontSize: scale(20),
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
    subButtonImageStyle: {
        width: moderateScale(20),
        height: verticalScale(20),
    },
    subButton: {
        position: "absolute",
        top: "80%", 
        alignSelf: "flex-end",
    },
    entryFromPageTitle: {
        alignSelf: "center", 
        color: "#00BAFF", 
        fontSize: scale(28), 
        fontWeight: "700",
        
    },
    entryFormSubHeader1: {alignSelf: "center", 
        color: "#00BAFF", 
        fontSize: scale(24), 
        fontWeight: "700", 
        marginBottom: scale(25)
    },
    entryFormSubHeader2: {
        margin: scale(10), 
        fontSize: scale(20), 
        fontWeight: "700", 
        color: "#367EA7", 
        textDecorationLine: "underline"
    },
    containerViewPictureEntry: {
        flexDirection: "row", 
        alignSelf: "center", 
        margin: scale(10)
    },
    textViewPictureEntry : {
        color: "#367EA7", 
        fontWeight: "700",
        fontSize: scale(12)
    },
    entryFormImage: {
        alignSelf: "center", 
        borderRadius: scale(10), 
        borderWidth: scale(2), 
        borderColor: "white"
    },
    entryFormInputTitle: {
        color: "#367EA7", 
        margin: scale(10), 
        marginBottom: 0, 
        fontWeight: "700",
        fontSize: scale(12)
    },
    normalInputForm: {
        backgroundColor: "white", 
        margin: scale(10), 
        borderRadius: scale(10),
        height: scale(35),
        textAlignVertical: "top",
        fontSize: scale(12)
    },
    largeInputForm: {
        backgroundColor: "white", 
        margin: scale(10), 
        borderRadius: scale(10), 
        height: verticalScale(150), 
        textAlignVertical: "top",
        fontSize: scale(12)
    },
    errorFormText : {
        marginLeft: scale(10), 
        color: "red", 
        fontWeight: "700", 
        fontSize: scale(16), 
        textAlignVertical: "center"
    },
    submitButton: {
        marginTop: scale(50), 
        backgroundColor: "#00BAFF", 
        margin: scale(10), 
        borderRadius: scale(10), 
        height: verticalScale(50), 
        justifyContent: "center"
    },
    submitButtonText: {
        textAlign: "center", 
        color: "white", 
        fontSize: scale(18), 
        fontWeight: "500"
    },
    smallItemShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    mediumItemShadow: {
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
    },
    largeItemShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,      
    }
    

});

export default App;
