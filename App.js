
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
    updateFishAtIndex,
    returnAllCatches,
    addCatchData,
    deleteCurrentCatch,
    updateCatchAtIndex
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
    Button,
    LogBox,
    TextComponent
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
import defautFishProfileImage from "./Images/defaultProfileImage.png";
import defaultFishCoverImage from "./Images/defaultCoverImage.png"
import DateTimePicker from '@react-native-community/datetimepicker';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

let amendArray = () => { 
    let count = 0;
    returnAllFish().map ( (element) => {
    
    realm.write(() => {
        element.index = count;
        
    })
    count += 1;

})};
let amendCatchArray = (fishIndex) => {
    let count = 0;
    returnAllCatches(fishIndex).map( (element) => {
        realm.write(() => {
            element.index = count;
        })
        count += 1;
    })
};


const editFishEntryPage = ({route, navigation}) => {

    const {fishElement} = route.params;
    const [profileImage, setProfileImage] = useState(fishElement.profileImage);
    const [coverPicImage, setCoverPicImage] = useState(fishElement.coverImage);

    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
      } = useForm({ mode: "onBlur", defaultValues: {
          knownAsName: fishElement.knowasName, 
          fishName: fishElement.name,
          fishFamily: fishElement.family,
          fishGenus: fishElement.genus,
          fishSpecies: fishElement.species,
          fishDescription: fishElement.description,
          fishSize: fishElement.size,
          fishFeeding: fishElement.feeding,
          fishDistribution: fishElement.distribution,
          fishNotes: fishElement.notes
        }})

    const onSubmit = data => {
        updateFishAtIndex(
            fishElement.index,
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
            data.fishNotes,
            ),
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
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(300),
            height: verticalScale(300),
            cropping: true
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">    
                <BackNavigateButton/>

                <Text style={styles.entryFromPageTitle}>Edit Fish Entry</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={styles.entryFormSubHeader1}>Images</Text>
                    
                <Text style={styles.entryFormSubHeader2}>Edit Profile Image</Text>

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

                <Text style={styles.entryFormSubHeader2}>Edit Cover Photo Image</Text>

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

                <Text style={styles.entryFormSubHeader1}>Edit Names</Text>

                <Text style={styles.entryFormInputTitle}>Fish Name *</Text>

                <Controller        
                    control={control}        
                    name="fishName"        
                    render={({field: {onChange, value , onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit fish name..."}
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
                    placeholder={"Edit also known as..."}
                    />       
                    )}
                    
                />
                
                <Divider orientation="horizontal" width={scale(4)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Edit Profile</Text>

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
                    placeholder={"Edit fish family..."}
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
                    placeholder={"Edit fish genus..."}
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
                    placeholder={"Edit fish species..."}
                    />       
                    )}
                    
                />

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Edit Description</Text>

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
                    placeholder={"Edit fish description..."}
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
                    placeholder={"Edit fish size..."}
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
                    placeholder={"Edit fish feeding habbits or bait..."}
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
                    placeholder={"Edit fish distribution or location..."}
                    />       
                    )}
                    
                />

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
                
                <Text style={styles.entryFormSubHeader1}>Edit Notes</Text>
                
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
                    placeholder={"Edit fish notes..."}
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

const addFishEntryPage = ({route, navigation}) => {
    
    const defaultProfileImage = Image.resolveAssetSource(defautFishProfileImage).uri;
    const [profileImage, setProfileImage] = useState(defaultProfileImage);

    const defaultCoverPicImage = Image.resolveAssetSource(defaultFishCoverImage).uri;
    const [coverPicImage, setCoverPicImage] = useState(defaultCoverPicImage);

    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
      } = useForm({ mode: "onBlur"})

    const onSubmit = data => {
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
        data.fishNotes,
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
            width: moderateScale(1200),
            height: verticalScale(1200),
            cropping: true,
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(1200),
            height: verticalScale(1200),
            cropping: true
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(2400),
            height: verticalScale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(2400),
            height: verticalScale(1200),
            cropping: true
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    return (
        
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">    
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
                    render={({field: {onChange, value , onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish name..."}
                    multiline={true}
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
                    multiline={true}
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


const fishDataPage = ({ route, navigation}) => {
    const {fishElement} = route.params;

    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("DefaultScreen")}} style={styles.backButtonDataScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity> 
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)"> 
                <View>
                    <View style={[styles.coverImageContainerDataPage, styles.mediumItemShadow]}>
                        <Image source={{ uri : fishElement.coverImage}} style={styles.coverImageStyle} resizeMode={"cover"}/>
                        <BackNavigateButton/>
                    </View>

                    <Text style={styles.fishTextTitle} >{fishElement.name}</Text>

                    <Text style={styles.knownAsSubHeader}>Known As</Text>
                    <Text style={styles.knownAsNameStyle}>{fishElement.knowasName ? fishElement.knowasName : "N/A" }</Text>

                    <TouchableOpacity style={{marginTop: scale(25 ), marginBottom: 0, backgroundColor: "#00BAFF", height: verticalScale(50), width: moderateScale(200), justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: scale(20)}} 
                    onPress={ () => {
                        navigation.navigate("catchPage", {fishcatch: fishElement.catch, fishindex: fishElement.index})
                    }}>
                        <Text style={{color: "white", fontWeight: '700', fontSize: scale(22)}}>Catches</Text>
                    </TouchableOpacity>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>
                    
                    <Text style={styles.entryFormSubHeader1}>Profile</Text>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Family</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.family ? fishElement.family : "N/A" }</Text>
                    </View>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Genus</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.genus ? fishElement.genus : "N/A" }</Text>
                    </View>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Species</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.species ? fishElement.species : "N/A" }</Text>
                    </View>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>

                    <Text style={styles.entryFormSubHeader1}>Description</Text>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Description</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.description ? fishElement.description : "N/A" }</Text>
                    </View>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Size</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.size ? fishElement.size : "N/A" }</Text>
                    </View>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Feeding</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.feeding ? fishElement.feeding : "N/A" }</Text>
                    </View>

                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Distribution</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.distribution ? fishElement.distribution : "N/A" }</Text>
                    </View>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>

                    <Text style={styles.entryFormSubHeader1}>Extra Notes</Text>

                    <Text style={[styles.dataPageMediumText, {marginBottom: scale(20)}]}>{fishElement.notes ? fishElement.notes : "N/A" }</Text>
                    
                </View>
            </ScrollView>
        </SafeAreaView> 
    )};





const defualtPage = ({ navigation }) => {
    const dataArray = [];
    const [data, setData] = useState(returnAllFish());
    const [searchData, searchSetData] = useState("");

    useEffect(() => {
        const focusDefaultPage = navigation.addListener("focus", () => {
          setData(returnAllFish());
          
        });
        return focusDefaultPage;
      }, [navigation]);
    
    let arr = data.map(  (element) => { 
        return <TouchableOpacity key={element.index} style={[styles.fishButtonStyle, styles.mediumItemShadow]} onPress={() => {
            navigation.navigate("dataPage", {fishElement: element});
        }} >
                <ImageBackground source={{uri : element.profileImage}} style={styles.fishButtonImageBackgroundStyle} resizeMode={"cover"}>
                    <Text style={styles.mainButtonTextStyle}>{element.name}</Text>

                    <TouchableOpacity style={[styles.subButton, {right: "5%"}, styles.mediumItemShadow]} onPress={() => {
                    generateYesNoAlert(element)
                    }}>
                        <Image style={styles.subButtonImageStyle} source={require("./Images/trash.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.subButton, {left: "5%"}, styles.mediumItemShadow]} onPress={ () => {
                        navigation.navigate("editFormPage", {fishElement: element})
                    }}>
                        <Image style={styles.subButtonImageStyle} source={require("./Images/writing.png")}/> 
                    </TouchableOpacity>  

                </ImageBackground>
                
                
            </TouchableOpacity>
    } )

    const generateYesNoAlert = (element) => Alert.alert (
        "Delete Notification",
        "Are you sure you want to delete? \nThis cannot be undone.",
        
      [
        {text: "Yes", onPress: () => {
            deleteCurrentFish(element.index)
            amendArray()
            setData(returnAllFish())
        } },
        { text: "No"}
      ]
    );
    
    let checkCardName = (data) => {
        
        returnAllFish().map( (element) => {
            if (element.name.toUpperCase().includes(data.toUpperCase())) {
                dataArray.push(element)
            }
        })
        setData(dataArray);        
    }
    let noFishData = () => {
        return (
            <Text style={{alignSelf: 'center', fontSize: scale(20), fontWeight: '700', color: 'grey', margin: scale(10)}}>Click '+' to add fish</Text> 
        )
    };
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
                            rightIconContainerStyle={{backgroundColor: 'white', width: moderateScale(40), height: verticalScale(40)}}
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
                            placeholder={"Search fish..."}
                            autoCapitalize="none"
                            value={searchData}
                            onSubmitEditing={() => checkCardName(searchData)}
                            onClear={() => checkCardName("")}
                            />    
            </View>
            { arr.length ? arr : noFishData()}
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

const catchFishPage = ({route, navigation}) => {
    const {fishcatch, fishindex} = route.params
    let colourSchemeColours = ["#002e64", "#004d89", "#0070af", "#0094d6"];

    const [data, setData] = useState(returnAllCatches(fishindex));

    useEffect(() => {
        const focusDefaultCatchPage = navigation.addListener("focus", () => {
          setData(returnAllCatches(fishindex));
          
        });
        return focusDefaultCatchPage;
      }, [navigation]);

    const generateYesNoAlertCatchPage = (elementIndex) => Alert.alert (
        "Delete Notification",
        "Are you sure you want to delete? \nThis cannot be undone.",
      [
        {text: "Yes", onPress: () => {
            deleteCurrentCatch(elementIndex, fishindex)
            amendCatchArray(fishindex)
            setData(returnAllCatches(fishindex))
        } },
        { text: "No"}
      ]
    );

    const BackNavigateButton = () => {
        return (
            <TouchableOpacity  onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity> 
        )
    }
    let generateColour = () => {
        if (colourSchemeColours.length == 0) {
            colourSchemeColours = ["#002e64", "#004d89", "#0070af", "#0094d6"];
        }
        const currentColour = colourSchemeColours[(colourSchemeColours.length - 1)]
        colourSchemeColours.pop();
    
        return currentColour;
    };

    let catchArr = data.map(  (element) => {
        return(
            <View key={element.index}>
                <TouchableOpacity style={[{width: "90%", height: scale(60) ,margin: scale(10),  backgroundColor: generateColour(), alignSelf: 'center', justifyContent: 'center', borderRadius: scale(10)}, styles.mediumItemShadow]} 
                onPress={() => {
                    navigation.navigate("catchDataPage", {catchElement: element})
                }}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                        <View style={{position: 'absolute', left: scale(10)}}>
                            <Text style={{fontSize: scale(14)}}>Date</Text>
                            <Text style={{fontSize: scale(20), color: 'white', fontWeight: '700'}}>{element.date}</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf: 'center', margin: scale(10),  marginRight: scale(5)}}
                        onPress={() => {
                            navigation.navigate("editFormCatchPage", {catchElement: element, fishindex: fishindex})
                        }}
                        >
                            <Image style={styles.subButtonCatchPage} source={require("./Images/writing.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignSelf: 'center', margin: scale(10), marginLeft: scale(5)}} 
                        onPress={() => {
                            generateYesNoAlertCatchPage(element.index)
                        }}>
                            <Image style={styles.subButtonCatchPage} source={require("./Images/trash.png")}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow} />
            </View>
        )
        
    });
    let noCatchData = () => {
        return (
            <Text style={{alignSelf: 'center', fontSize: scale(20), fontWeight: '700', color: 'grey', margin: scale(10)}}>No current catches</Text> 
        )
    };
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">
                <BackNavigateButton/>
                <Text style={styles.entryFromPageTitle}>Catches</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                {fishcatch.length ? catchArr : noCatchData()}

            
            </ScrollView>

            <TouchableOpacity style={[styles.addButton, styles.mediumItemShadow]} 
            onPress={() => {
                navigation.navigate("addFormCatchPage", {catchIndex: fishindex});

            }}>
                <Icon size={scale(32)} name="add-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const addCatchEntryPage = ({route, navigation}) => {

    const {catchIndex} = route.params;
    const defaultCoverPicImage = Image.resolveAssetSource(defaultFishCoverImage).uri;
    const [coverPicImage, setCoverPicImage] = useState(defaultCoverPicImage);

    var currentDate = new Date().getTime()
    
    const [date, setDate] = useState(new Date(currentDate));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur"});
    
    const onSubmit = data => {
        addCatchData(
            catchIndex, 
            date.toDateString(),
            date.toLocaleTimeString(),
            date.toString(),
            coverPicImage,
            data.catchLocation,
            data.baitUsed,
            data.weatherConditions,
            data.fishLength,
            data.fishWeight,
            data.fishNotes
            ),
        amendCatchArray(catchIndex),
        navigation.goBack()
        
    }

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    };

    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');
    };

    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }


    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(2400),
            height: verticalScale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(2400),
            height: verticalScale(1200),
            cropping: true
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
             <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">
                <BackNavigateButton/>
                
                <Text style={styles.entryFromPageTitle}>Catch Entry</Text>
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Date/Time</Text>

                <View style={{margin: scale(10)}}>
                    <Text style={{alignSelf: 'center', fontWeight: '700', color: "#367EA7", fontSize: scale(16), margin: scale(10)}}>Date Caught</Text>
                    <Text style={{color: 'white', alignSelf: 'center', fontWeight: '700', fontSize: scale(18), marginBottom: scale(10) }}>{date.toDateString()}</Text>

                    <TouchableOpacity style={[{alignSelf: 'center', backgroundColor: "#00BAFF", width: moderateScale(200), height: verticalScale(30), borderRadius: scale(10), justifyContent: 'center', alignItems: 'center'}, styles.mediumItemShadow]} onPress={showDatepicker}>
                        <Text style={{color: 'white', fontSize: scale(12), fontWeight: '700'}}>Choose date</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: scale(10)}}>
                    <Text style={{alignSelf: 'center', fontWeight: '700', color: "#367EA7", fontSize: scale(16), margin: scale(10)}}>Time Caught</Text>
                    
                    <Text style={{color: 'white', alignSelf: 'center', fontWeight: '700', fontSize: scale(18), marginBottom: scale(10) }}>{date.toLocaleTimeString()}</Text>
                    
                    <TouchableOpacity style={[{alignSelf: 'center', backgroundColor: "#00BAFF", width: moderateScale(200), height: verticalScale(30), borderRadius: scale(10), justifyContent: 'center', alignItems: 'center'}, styles.mediumItemShadow]} onPress={showTimepicker}>
                        <Text style={{color: 'white', fontSize: scale(12), fontWeight: '700'}}>Choose time</Text>
                    </TouchableOpacity>
                    
                </View>

                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    
                />
                )}

                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
  
                <Text style={styles.entryFormSubHeader1}>Image</Text>

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

                <Text style={styles.entryFormSubHeader1}>Details</Text>


                <Text style={styles.entryFormInputTitle}>Catch Location</Text>
                <Controller        
                    control={control}        
                    name="catchLocation"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter location..."}
                    />       
                    )}
                    
                />

                <Text style={styles.entryFormInputTitle}>Bait Used</Text>
                <Controller        
                    control={control}        
                    name="baitUsed"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter bait used..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Weather Conditions</Text>
                <Controller        
                    control={control}        
                    name="weatherConditions"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter weather conditions..."}
                    />       
                    )}
                    
                />
                
                <Text style={styles.entryFormInputTitle}>Fish Length</Text>
                <Controller        
                    control={control}        
                    name="fishLength"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish length..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Weight</Text>
                <Controller        
                    control={control}        
                    name="fishWeight"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish weight..."}
                    />       
                    )}
                    
                />
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
                    multiline={true}
                    />       
                    )}
                    
                />

                <TouchableOpacity disabled={!isValid} title="Submit"  
                onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                        <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}
const editCatchEntryPage = ({route, navigation}) => {
    const {catchElement, fishindex} = route.params;

    const [coverPicImage, setCoverPicImage] = useState(catchElement.image);

    const [date, setDate] = useState(new Date(catchElement.encodedDate));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur", defaultValues: {
        catchLocation: catchElement.location,
        baitUsed: catchElement.bait,
        weatherConditions: catchElement.weather,
        fishLength: catchElement.length,
        fishWeight: catchElement.weight,
        fishNotes: catchElement.notes
      }});
    
    const onSubmit = data => {
        updateCatchAtIndex(
            fishindex,
            catchElement.index, 
            date.toDateString(),
            date.toLocaleTimeString(),
            date.toString(),
            coverPicImage,
            data.catchLocation,
            data.baitUsed,
            data.weatherConditions,
            data.fishLength,
            data.fishWeight,
            data.fishNotes
            ),
        navigation.goBack()
        
    }


    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');
    };
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: moderateScale(600),
            height: verticalScale(300),
            cropping: true
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">
                <BackNavigateButton/>
                <Text style={styles.entryFromPageTitle}>Edit Catch Entry</Text>
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Date/Time</Text>
                <View style={{margin: scale(10)}}>
                    <Text style={{alignSelf: 'center', fontWeight: '700', color: "#367EA7", fontSize: scale(16), margin: scale(10)}}>Date Caught</Text>
                    <Text style={{color: 'white', alignSelf: 'center', fontWeight: '700', fontSize: scale(18), marginBottom: scale(10) }}>{date.toDateString()}</Text>

                    <TouchableOpacity style={[{alignSelf: 'center', backgroundColor: "#00BAFF", width: moderateScale(200), height: verticalScale(30), borderRadius: scale(10), justifyContent: 'center', alignItems: 'center'}, styles.mediumItemShadow]} onPress={showDatepicker}>
                        <Text style={{color: 'white', fontSize: scale(12), fontWeight: '700'}}>Edit date</Text>
                    </TouchableOpacity>
                </View>
                <View style={{margin: scale(10)}}>
                    <Text style={{alignSelf: 'center', fontWeight: '700', color: "#367EA7", fontSize: scale(16), margin: scale(10)}}>Time Caught</Text>
                    
                    <Text style={{color: 'white', alignSelf: 'center', fontWeight: '700', fontSize: scale(18), marginBottom: scale(10) }}>{date.toLocaleTimeString()}</Text>
                    
                    <TouchableOpacity style={[{alignSelf: 'center', backgroundColor: "#00BAFF", width: moderateScale(200), height: verticalScale(30), borderRadius: scale(10), justifyContent: 'center', alignItems: 'center'}, styles.mediumItemShadow]} onPress={showTimepicker}>
                        <Text style={{color: 'white', fontSize: scale(12), fontWeight: '700'}}>Edit time</Text>
                    </TouchableOpacity>
                    
                </View>

                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    
                />
                )}

                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Image</Text>

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
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Details</Text>

                <Text style={styles.entryFormInputTitle}>Catch Location</Text>
                <Controller        
                    control={control}        
                    name="catchLocation"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter location..."}
                    />       
                    )}
                    
                />

                <Text style={styles.entryFormInputTitle}>Bait Used</Text>
                <Controller        
                    control={control}        
                    name="baitUsed"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter bait used..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Weather Conditions</Text>
                <Controller        
                    control={control}        
                    name="weatherConditions"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter weather conditions..."}
                    />       
                    )}
                    
                />
                
                <Text style={styles.entryFormInputTitle}>Fish Length</Text>
                <Controller        
                    control={control}        
                    name="fishLength"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish length..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Weight</Text>
                <Controller        
                    control={control}        
                    name="fishWeight"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Enter fish weight..."}
                    />       
                    )}
                    
                />
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
                    multiline={true}
                    />       
                    )}
                    
                />

                <TouchableOpacity disabled={!isValid} title="Submit"  
                onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                        <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

const catchDataPage = ({route, navigation}) => {
    const {catchElement} = route.params;
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={[styles.backButtonDataScreen, styles.mediumItemShadow]}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity> 
        )
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">
                <View style={[styles.coverImageContainerDataPage, styles.mediumItemShadow]}>
                    <Image source={{ uri : catchElement.image}} style={styles.coverImageStyle} resizeMode={"cover"}/>
                    <BackNavigateButton/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{width: moderateScale(175) }}>
                        <Text style={{alignSelf: 'center', textAlign: 'center', color: "#367EA7", fontWeight: '700', fontSize: scale(14), marginTop: scale(20)}}>Date caught</Text>
                        <Text style={{alignSelf: 'center', textAlign: 'center', fontWeight: '700', fontSize: scale(20), color: 'white'}}>{catchElement.date}</Text>
                    </View>
                    <View style={{width: moderateScale(175) }}>
                        <Text style={{alignSelf: 'center', textAlign: 'center', color: "#367EA7", fontWeight: '700', fontSize: scale(14), marginTop: scale(20)}}>Time caught</Text>
                        <Text style={{alignSelf: 'center', textAlign: 'center', fontWeight: '700', fontSize: scale(20), color: 'white'}}>{catchElement.time}</Text>
                    </View>
                </View>
                
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(30)} borderRadius={scale(10)} style={styles.mediumItemShadow} />
                
                <Text style={styles.entryFormSubHeader1}>Details</Text>

                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Location Caught</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.location ? catchElement.location : "N/A" }</Text>
                </View>
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Bait Used</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.bait ? catchElement.bait : "N/A" }</Text>
                </View>
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Weather Conditions</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.weather ? catchElement.weather : "N/A" }</Text>
                </View>
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Length</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.length ? catchElement.length : "N/A" }</Text>
                </View>
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Weight</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.weight ? catchElement.weight : "N/A" }</Text>
                </View>
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Catch Notes</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.notes ? catchElement.notes : "N/A" }</Text>
                </View>

            </ScrollView>  
        </SafeAreaView>
    )
}


const Stack = createNativeStackNavigator();
 
const App = () => {   
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="DefaultScreen">
            <Stack.Screen name="DefaultScreen" component={defualtPage} options={{ headerShown: false }} />
            <Stack.Screen name="dataPage" component={fishDataPage} options={{ headerShown: false }}/>
            <Stack.Screen name="catchPage" component={catchFishPage} options={{ headerShown: false }}/>
            <Stack.Screen name="catchDataPage" component={catchDataPage} options={{ headerShown: false }}/>
            <Stack.Screen name="addFormCatchPage" component={addCatchEntryPage} options={{ headerShown: false }}/>
            <Stack.Screen name="editFormCatchPage" component={editCatchEntryPage} options={{ headerShown: false }}/>
            <Stack.Screen name="addFormPage" component={addFishEntryPage} options={{ headerShown: false }}/>
            <Stack.Screen name="editFormPage" component={editFishEntryPage} options={{ headerShown: false }}/>
        </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    subButtonCatchPage: {
        width: moderateScale(25),
        height: verticalScale(25),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    dataPageViewContainer: {
        margin: scale(10), 
        marginBottom: scale(20) 
    },
    dataPageMediumText: {
        alignSelf: 'center', 
        color: "white", 
        fontWeight: '700',
        fontSize: scale(18),
        textAlign: 'center',
    },
    dataPageLargeText: {
        alignSelf: 'center', 
        color: "white", 
        fontWeight: '700',
        fontSize: scale(20),
        textAlign: 'center',
    },
    dataPageHeaderTitle: {
        alignSelf: 'center', 
        color: "#367EA7", 
        fontWeight: '700',
        fontSize: scale(18),
    },
    knownAsNameStyle: {
        alignSelf: 'center', 
        color: "grey", 
        fontWeight: '700',
        fontSize: scale(12),
        textAlign: 'center',
        marginLeft: scale(10),
        marginRight: scale(10)
    },
    knownAsSubHeader: {
        alignSelf: 'center', 
        color: "#367EA7", 
        fontWeight: '700',
        fontSize: scale(14),
    },
    fishTextTitle: {
        margin: scale(20),
        marginBottom: scale(10),
        alignSelf: 'center',
        color: 'white',
        fontSize: scale(32),
        fontWeight: '700'
    },
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
    backButtonDataScreen: {
        width: scale(40), 
        height: scale(40), 
        borderRadius: scale(100), 
        backgroundColor: "#00BAFF", 
        alignItems: "center", 
        justifyContent: "center", 
        marginLeft: scale(10),
        marginTop: scale(10),
        position: 'absolute'  
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
        height: "100%", 
        borderBottomLeftRadius: scale(30), 
        borderBottomRightRadius: scale(30)
    },
    coverImageContainerDataPage: {
        width: "100%",
        height: verticalScale(200),
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
