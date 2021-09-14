
/**
 * Fishing Dex React Native App
 * https://github.com/JM1F/Fishing-Dex
 *
 * @format
 * @flow strict-local
 */

// Imports
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
import DateTimePicker from "@react-native-community/datetimepicker";

// Ignores react-native warnings where null values are parsed through navigation stack
LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
/**
 * Amends the fish array when data is added or removed.
 */
let amendArray = () => { 
    let count = 0;
    // Maps each data element
    returnAllFish().map ( (element) => {
    // Writes current count to the data element"s index
    realm.write(() => {
        element.index = count;
    })
    // Increment count by 1
    count += 1;

})};
/**
 * Amends the catch array when catch data is added or removed.
 * @param {Object} fishIndex Index of fish data
 */
let amendCatchArray = (fishIndex) => {
    let count = 0;
    // Maps each data element
    returnAllCatches(fishIndex).map( (element) => {
        // Writes current count to the data element"s index
        realm.write(() => {
            element.index = count;
        })
        // Increment count by 1
        count += 1;
    })
};

/**
 * Edit page for the data already added to the fish data
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX editPage
 */
const editFishEntryPage = ({route, navigation}) => {
    // Parsed fish data
    const {fishElement} = route.params;
    // Hooks 
    const [profileImage, setProfileImage] = useState(fishElement.profileImage);
    const [coverPicImage, setCoverPicImage] = useState(fishElement.coverImage);
    // Form setup details
    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
      } = useForm({ mode: "onBlur", defaultValues: {
          // Sets default form values
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
    /**
     * Called when the submit button is clicked.
     * @param {Object} data Current form data
     */
    const onSubmit = data => {
        // Updates the data entries
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
        // Navigates back to the default screen
        navigation.navigate("DefaultScreen")
    }
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     * 
     */
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("DefaultScreen")}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }
    /**
     * Opens react-native-image-crop-picker to take profile image from phone camera.
     */
    const takeProfileImage = () => {
        ImagePicker.openCamera({
            width: scale(1200),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    /**
     * Opens react-native-image-crop-picker to select profile image from phone gallery.
     */
    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: scale(1200),
            height: scale(1200),
            cropping: true
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    /**
     * Opens react-native-image-crop-picker to take cover image from phone camera.
     */
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: scale(2400),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    /**
     * Opens react-native-image-crop-picker to select cover image from phone gallery.
     */
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: scale(2400),
            height: scale(1200),
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
                {/* Back Button */}
                <BackNavigateButton/>

                <Text style={styles.entryFromPageTitle}>Edit Fish Entry</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={styles.entryFormSubHeader1}>Images</Text>
                    
                <Text style={styles.entryFormSubHeader2}>Edit Profile Image</Text>
                {/* Profile image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.profileImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : profileImage }} style={[{width: scale(150), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader2}>Edit Cover Photo Image</Text>
                {/* Cover image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.coverImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : coverPicImage }} style={[{width: scale(300), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>
                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Edit Names</Text>

                <Text style={styles.entryFormInputTitle}>Fish Name *</Text>
                {/* Edit input form for fish name */}
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
                {/* ^ Input field is required to have a value */}
                {/* Generate error if field is not filled in */}
                {errors.fishName?.type === "required" &&
                
                <Text style={styles.errorFormText}>
                    <Icon size={scale(14)} name="exclamation-triangle"  type="font-awesome-5"  color="red" style={{marginRight: scale(10)}} />
                    Field is required!
                </Text>
                }

                <Text style={styles.entryFormInputTitle}>Known As</Text>
                {/* Edit input form for known as name */}
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
                {/* Edit input form for fish family */}
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
                {/* Edit input form for fish genus */}
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
                {/* Edit input form for fish species */}
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
                {/* Edit input form for fish description */}
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
                {/* Edit input form for fish size */}
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
                {/* Edit input form for fish feeding */}
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
                {/* Edit input form for fish distribution */}
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
                {/* Edit input form for fish notes */}
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
                    multiline={true}
                    />       
                    )}
                    
                />
                {/* Submit button */}
                <TouchableOpacity disabled={!isValid} title="Submit"  onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
    
}
/**
 * Add page that takes inputs about fish data.
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX addFishPage
 */
const addFishEntryPage = ({route, navigation}) => {
    // Get uri path of default image
    const defaultProfileImage = Image.resolveAssetSource(defautFishProfileImage).uri;
    // Profile image hook
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    // Get uri path of default image
    const defaultCoverPicImage = Image.resolveAssetSource(defaultFishCoverImage).uri;
    // Cover image hook
    const [coverPicImage, setCoverPicImage] = useState(defaultCoverPicImage);
    // Form setup details
    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
      } = useForm({ mode: "onBlur"})
    /**
     * Called when the submit button is clicked.
     * @param {Object} data Current form data
     */
    const onSubmit = data => {
        // Calls function to add fish data
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
        // Amend array with new updated data
        amendArray(),
        // Navigate to default screen
        navigation.navigate("DefaultScreen")
    }
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     */
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate("DefaultScreen")}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }
    /**
     * Opens react-native-image-crop-picker to take profile image from phone camera.
     */
    const takeProfileImage = () => {
        ImagePicker.openCamera({
            width: scale(1200),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    /**
     * Opens react-native-image-crop-picker to select profile image from phone gallery.
     */
    const selectProfileImage = () => {
        ImagePicker.openPicker({
            width: scale(1200),
            height: scale(1200),
            cropping: true
          }).then(image => {
            setProfileImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    /**
     * Opens react-native-image-crop-picker to take cover image from phone camera.
     */
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: scale(2400),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    
    }
    /**
     * Opens react-native-image-crop-picker to select cover image from phone gallery.
     */
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: scale(2400),
            height: scale(1200),
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
                {/* Back Button */}  
                <BackNavigateButton/>

                <Text style={styles.entryFromPageTitle}>Fish Entry</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={styles.entryFormSubHeader1}>Images</Text>
                    
                <Text style={styles.entryFormSubHeader2}>Profile Image</Text>
                {/* Profile image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.profileImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : profileImage }} style={[{width: scale(150), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>

                <Divider orientation="horizontal" width={scale(3)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader2}>Cover Photo Image</Text>
                {/* Cover image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.coverImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : coverPicImage }} style={[{width: scale(300), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>
                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Name</Text>

                <Text style={styles.entryFormInputTitle}>Fish Name *</Text>
                {/* Input form for fish name */}
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
                    />       
                    )}
                    rules={{
                    required: {
                        value: true,
                    }
                    }}
                />
                {/* ^ Input field is required to have a value */}
                {/* Generate error if field is not filled in */}
                {errors.fishName?.type === "required" &&
                
                <Text style={styles.errorFormText}>
                    <Icon size={scale(14)} name="exclamation-triangle"  type="font-awesome-5"  color="red" style={{marginRight: scale(10)}} />
                    Field is required!
                </Text>
                }

                <Text style={styles.entryFormInputTitle}>Known As</Text>
                {/* Input form for known as name */}
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
                {/* Input form for fish family */}
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
                {/* Input form for fish genus */}
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
                {/* Input form for fish species */}
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
                {/* Input form for fish description */}
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
                {/* Input form for fish size */}
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
                {/* Input form for fish feeding */}
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
                {/* Input form for fish distribution */}
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
                {/* Input form for fish notes */}
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
                {/* Submit button */}
                <TouchableOpacity disabled={!isValid} title="Submit"  onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

/**
 * A page that displays the inputted data about the fish.
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX dataPage
 */
const fishDataPage = ({ route, navigation}) => {
    
    const {fishElement} = route.params;
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     */
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
                    {/*Image displayed at the top of the page */}
                    <View style={[styles.coverImageContainerDataPage, styles.mediumItemShadow]}>
                        <Image source={{ uri : fishElement.coverImage}} style={styles.coverImageStyle} resizeMode={"cover"}/>
                        <BackNavigateButton/>
                    </View>

                    <Text style={styles.fishTextTitle} >{fishElement.name}</Text>

                    <Text style={styles.knownAsSubHeader}>Known As</Text>
                    {/* Gets data from the parsed element, if the element is null it defaults to N/A (Works for all non-required inputs)*/}
                    <Text style={styles.knownAsNameStyle}>{fishElement.knowasName ? fishElement.knowasName : "N/A" }</Text>
                    {/* Takes the user to the catch page for the specific fish */}
                    <TouchableOpacity style={styles.catchPageButton} 
                    onPress={ () => {
                        navigation.navigate("catchPage", {fishcatch: fishElement.catch, fishindex: fishElement.index})
                    }}>
                        <View style={styles.catchPageButtonView}>
                            <Text style={styles.catchPageButtonText}>Catches</Text>
                            <Icon size={scale(34)} name="return-down-forward-outline"  type="ionicon"  color="white" />
                        </View>
                    </TouchableOpacity>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>
                    
                    <Text style={styles.entryFormSubHeader1}>Profile</Text>
                    {/* Fish family data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Family</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.family ? fishElement.family : "N/A" }</Text>
                    </View>
                    {/* Fish genus data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Genus</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.genus ? fishElement.genus : "N/A" }</Text>
                    </View>
                    {/* Fish species data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Species</Text>
                        <Text style={styles.dataPageLargeText}>{fishElement.species ? fishElement.species : "N/A" }</Text>
                    </View>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>

                    <Text style={styles.entryFormSubHeader1}>Description</Text>
                    {/* Fish description data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Description</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.description ? fishElement.description : "N/A" }</Text>
                    </View>
                    {/* Fish size data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Size</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.size ? fishElement.size : "N/A" }</Text>
                    </View>
                    {/* Fish feeding data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Feeding</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.feeding ? fishElement.feeding : "N/A" }</Text>
                    </View>
                    {/* Fish distribution data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Distribution</Text>
                        <Text style={styles.dataPageMediumText}>{fishElement.distribution ? fishElement.distribution : "N/A" }</Text>
                    </View>

                    <Divider  orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(20)} marginBottom={scale(20)} borderRadius={scale(10)} style={styles.mediumItemShadow}/>
                    <Text style={styles.entryFormSubHeader1}>Extra Notes</Text>
                    {/* Fish notes data */}
                    <View style={styles.dataPageViewContainer}>
                        <Text style={[styles.dataPageMediumText, {marginBottom: scale(20)}]}>{fishElement.notes ? fishElement.notes : "N/A" }</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView> 
    )};

/**
 * A page that displays an overview of all the fish inputted.
 * @param {Navigation} param0 Parses navigation stack 
 * @returns JSX defaultPage
 */
const defualtPage = ({ navigation }) => {
    // Data and hooks
    const dataArray = [];
    const [data, setData] = useState(returnAllFish());
    const [searchData, searchSetData] = useState("");
    // Adds a listener to see if the default page is currently open
    useEffect(() => {
        const focusDefaultPage = navigation.addListener("focus", () => {
          setData(returnAllFish());
        });
        return focusDefaultPage;
      }, [navigation]);
    /**
     * An array variable is made to map the data to each of the default buttons on the main page
     */
    let arr = data.map(  (element) => { 
        return <TouchableOpacity key={element.index} style={[styles.fishButtonStyle, styles.mediumItemShadow]} onPress={() => {
            {/* Navigate to the data page of the fish and parsing the fishElement data */}
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
                        {/* Navigate to the edit page and parsing fishElement data */}
                        navigation.navigate("editFormPage", {fishElement: element})
                    }}>
                        <Image style={styles.subButtonImageStyle} source={require("./Images/writing.png")}/> 
                    </TouchableOpacity>  
                </ImageBackground> 
            </TouchableOpacity>
    } )
    /**
     * Generates an alert asking if the user wants to delete the fish data
     * @param {Object} element Fish data element
     * @returns Display delete notification
     */
    const generateYesNoAlert = (element) => Alert.alert (
        "Delete Notification",
        "Are you sure you want to delete? \nThis cannot be undone.",
        
      [
        // Deletes data when "yes" is pressed
        {text: "Yes", onPress: () => {
            deleteCurrentFish(element.index)
            amendArray()
            setData(returnAllFish())
        } },
        { text: "No"}
      ]
    );
    /**
     * Used for the search bar to filter out the fish data.
     * @param {string} data Search bar data
     */
    let checkCardName = (data) => {
        // Maps fish data
        returnAllFish().map( (element) => {
            // Checks to see if any of the element names include the inputted data in the search bar
            if (element.name.toUpperCase().includes(data.toUpperCase())) {
                // Pushes element into array 
                dataArray.push(element)
            }
        })
        // Sets the data of the default screen to that in the array
        setData(dataArray);        
    }
    /**
     * Checks to see what message to display if no data is inputted.
     * @returns No data message
     */
    let noFishData = () => {
        let pageString = "";
        // Checks to see if there is fish data
        if (returnAllFish().length == 0) {
            pageString = "Click '+' to add fish"
        }
        else {
            pageString = "No matched results"
        }
        return (
            <Text style={styles.noFishDataText}>{pageString}</Text> 
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
                {/* Search bar  */}
                <SearchBar  inputContainerStyle={{backgroundColor: "white"}}
                            leftIconContainerStyle={{backgroundColor: "white"}}
                            rightIconContainerStyle={{backgroundColor: "white", width: scale(40), height: scale(40)}}
                            searchIcon={{size: scale(16)}}
                            clearIcon={{size: scale(16)}}
                            inputStyle={{
                            backgroundColor: "white", 
                            fontSize: scale(12)}}
                            containerStyle={[{
                            backgroundColor: "white",
                            justifyContent: "space-around",
                            borderRadius: scale(10),
                            height: scale(50),
                            }, styles.mediumItemShadow]}
                            onChangeText={text => searchSetData(text)}
                            placeholder={"Search fish..."}
                            autoCapitalize="none"
                            value={searchData}
                            onSubmitEditing={() => checkCardName(searchData)}
                            onClear={() => checkCardName("")}
                            />    
            </View>
            {/* Checks arr length if emtpy use whats returned in noFishData() */}
            { arr.length ? arr : noFishData()}
        </View>
        
    </ScrollView>
    <View>
        {/* Add button */}
        <TouchableOpacity style={[styles.addButton, styles.mediumItemShadow]} onPress={() => {
            navigation.navigate("addFormPage")
        }}>
            <Icon size={scale(32)} name="add-outline"  type="ionicon"  color="white" />
        </TouchableOpacity>
    </View>
      
    </SafeAreaView>
    );
};
/**
 * Page to see all catch data of that specific fish.
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX catchPage
 */
const catchFishPage = ({route, navigation}) => {
    // Set route data
    const {fishcatch, fishindex} = route.params
    // Set colour scheme array
    let colourSchemeColours = ["#002e64", "#004d89", "#0070af", "#0094d6"];
    // Data hook
    const [data, setData] = useState(returnAllCatches(fishindex));
    // Adds a listener to see if the catch page is currently open
    useEffect(() => {
        const focusDefaultCatchPage = navigation.addListener("focus", () => {
          setData(returnAllCatches(fishindex));
        });
        return focusDefaultCatchPage;
      }, [navigation]);
    /**
     * Generates an alert asking if the user wants to delete the catch data
     * @param {string} elementIndex Element index number
     * @returns Display delete notification
     */
    const generateYesNoAlertCatchPage = (elementIndex) => Alert.alert (
        "Delete Notification",
        "Are you sure you want to delete? \nThis cannot be undone.",
      [
        // If "yes" is pressed the catch data will be deleted
        {text: "Yes", onPress: () => {
            deleteCurrentCatch(elementIndex, fishindex)
            amendCatchArray(fishindex)
            setData(returnAllCatches(fishindex))
        } },
        { text: "No"}
      ]
    );
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     * 
     */
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity  onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity> 
        )
    }
    /**
     * Generates a colour for each catch report in a gradient style.
     * @returns Hex Colour Code
     */
    let generateColour = () => {
        if (colourSchemeColours.length == 0) {
            // Adds the colours if the array is emtpy
            colourSchemeColours = ["#002e64", "#004d89", "#0070af", "#0094d6"];
        }
        // Sets current colour
        const currentColour = colourSchemeColours[(colourSchemeColours.length - 1)]
        // Removes current colour
        colourSchemeColours.pop();
    
        return currentColour;
    };
    /**
     * catchArr acts the same as {arr}, which displays catch data.
     */
    let catchArr = data.map(  (element) => {
        return(
            <View key={element.index}>
                <TouchableOpacity style={[{width: "90%", height: scale(60) ,margin: scale(10),  backgroundColor: generateColour(), alignSelf: "center", justifyContent: "center", borderRadius: scale(10)}, styles.mediumItemShadow]} 
                onPress={() => {
                    navigation.navigate("catchDataPage", {catchElement: element})
                }}>
                    <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end"}}>
                        <View style={{position: "absolute", left: scale(10)}}>
                            <Text style={{fontSize: scale(14)}}>Date</Text>
                            <Text style={{fontSize: scale(20), color: "white", fontWeight: "700"}}>{element.date}</Text>
                        </View>
                        <TouchableOpacity style={{alignSelf: "center", margin: scale(10),  marginRight: scale(5)}}
                        onPress={() => {
                            navigation.navigate("editFormCatchPage", {catchElement: element, fishindex: fishindex})
                        }}
                        >
                            <Image style={styles.subButtonCatchPage} source={require("./Images/writing.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignSelf: "center", margin: scale(10), marginLeft: scale(5)}} 
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
    /**
     * Returns JSX Text element when there is no catch data.
     * @returns No data message
     */
    let noCatchData = () => {
        return (
            <Text style={{alignSelf: "center", fontSize: scale(20), fontWeight: "700", color: "grey", margin: scale(10)}}>No current catches</Text> 
        )
    };
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2B292C"}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" backgroundColor="rgb(43, 41, 44)">
                {/* Back Button */}
                <BackNavigateButton/>
                <Text style={styles.entryFromPageTitle}>Catches</Text>
            
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />
                {/* Checks length of catch data, if empty call noCatchData(), if not display catches */}
                {fishcatch.length ? catchArr : noCatchData()}

            
            </ScrollView>
            {/* Add Button */}
            <TouchableOpacity style={[styles.addButton, styles.mediumItemShadow]} 
            onPress={() => {
                navigation.navigate("addFormCatchPage", {catchIndex: fishindex});

            }}>
                <Icon size={scale(32)} name="add-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>

        </SafeAreaView>
    )
}
/**
 * Allows the user to add catches with specific data of said catches.
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX addCatchPage
 */
const addCatchEntryPage = ({route, navigation}) => {
    // Set data and hooks
    const {catchIndex} = route.params;
    // Converting default image to uri
    const defaultCoverPicImage = Image.resolveAssetSource(defaultFishCoverImage).uri;
    const [coverPicImage, setCoverPicImage] = useState(defaultCoverPicImage);
    // Get time in seconds at the current time
    var currentDate = new Date().getTime()
    // Date picker hooks
    const [date, setDate] = useState(new Date(currentDate));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    // Form setup details
    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur"});
    /**
     * Called when the submit button is clicked.
     * @param {Object} data Current form data
     */
    const onSubmit = data => {
        // Add catch data
        addCatchData(
            catchIndex,
            // Set date data
            date.toDateString(),
            // Set data to locale time with seconds stripped off the end of the string
            date.toLocaleTimeString().substr(0 ,date.toLocaleTimeString().length - 3),
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
    /**
     * Handles the on change event.
     * @param {Object} event 
     * @param {Object} selectedDate 
     */
    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    };
    /**
     * Gets current show mode and corresponds to the string inputted.
     * @param {string} currentMode 
     */
    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };
    // Show mode for date
    const showDatepicker = () => {
    showMode("date");
    };
    // Show mode for time
    const showTimepicker = () => {
    showMode("time");
    };
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     */
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }
    /**
     * Opens react-native-image-crop-picker to take cover image from phone camera.
     */
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: scale(2400),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    /**
     * Opens react-native-image-crop-picker to select cover image from phone gallery.
     */
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: scale(2400),
            height: scale(1200),
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
                 {/* Back Button */}
                <BackNavigateButton/>
                
                <Text style={styles.entryFromPageTitle}>Catch Entry</Text>
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />

                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Date/Time</Text>
                {/* Automatically gets date of opening and displays button to open the date picker to change the catch date. */}
                <View style={{margin: scale(10)}}>
                    <Text style={styles.addDateTimeCaughtHeader}>Date Caught</Text>
                    <Text style={styles.addDateCaughtText}>{date.toDateString()}</Text>

                    <TouchableOpacity style={[styles.chooseDateTimeButton, styles.mediumItemShadow]} onPress={showDatepicker}>
                        <Text style={styles.chooseDateTimeButtonText}>Choose date</Text>
                    </TouchableOpacity>
                </View>
                {/* Automatically get local time of opening and displays button to open the time picker to change the catch time. */}
                <View style={{margin: scale(10)}}>
                    <Text style={styles.addDateTimeCaughtHeader}>Time Caught</Text>
                    <Text style={styles.addDateCaughtText}>{date.toLocaleTimeString().substr(0 ,date.toLocaleTimeString().length - 3)}</Text>
                    
                    <TouchableOpacity style={[styles.chooseDateTimeButton, styles.mediumItemShadow]} onPress={showTimepicker}>
                        <Text style={styles.addDateCaughtText}>Choose time</Text>
                    </TouchableOpacity>   
                </View>
                {/* Display date/time picker */}
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                />
                )}

                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
  
                <Text style={styles.entryFormSubHeader1}>Image</Text>
                {/* Cover image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.coverImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : coverPicImage }} style={[{width: scale(300), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>

                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>

                <Text style={styles.entryFormSubHeader1}>Details</Text>

                <Text style={styles.entryFormInputTitle}>Catch Location</Text>
                {/* Input form for catch location */}
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
                {/* Input form for bait used */}
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
                {/* Input form for weather conditions */}
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
                {/* Input form for fish length */}
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
                {/* Input form for fish weight */}
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
                {/* Input form for fish notes */}
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
                {/* Submit Button */}
                <TouchableOpacity disabled={!isValid} title="Submit"  
                onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                        <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}
/**
 * Allows the user to edit their catches, like the edit for the fish data.
 * @param {Navigation} param0 Parse route and navigation stack
 * @returns JSX
 */
const editCatchEntryPage = ({route, navigation}) => {
    // Parsed navigation data
    const {catchElement, fishindex} = route.params;
    // Hook for image.
    const [coverPicImage, setCoverPicImage] = useState(catchElement.image);
    // Hook for date/time picker
    const [date, setDate] = useState(new Date(catchElement.encodedDate));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    // Form setup details
    const {
        control, 
        handleSubmit, 
        formState: {errors, isValid},
    } = useForm({ mode: "onBlur", defaultValues: {
        // Set default values for the forms
        catchLocation: catchElement.location,
        baitUsed: catchElement.bait,
        weatherConditions: catchElement.weather,
        fishLength: catchElement.length,
        fishWeight: catchElement.weight,
        fishNotes: catchElement.notes
      }});
    /**
     * Called when the submit button is clicked.
     * @param {Object} data Current form data
     */
    const onSubmit = data => {
        // Updates catch at index
        updateCatchAtIndex(
            fishindex,
            catchElement.index, 
            date.toDateString(),
            // Updates locale time with the seconds cut off the string
            date.toLocaleTimeString().substr(0 ,date.toLocaleTimeString().length - 3),
            date.toString(),
            coverPicImage,
            data.catchLocation,
            data.baitUsed,
            data.weatherConditions,
            data.fishLength,
            data.fishWeight,
            data.fishNotes
            ),
        // Navigate to the previous screen
        navigation.goBack() 
    }
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     */
    const BackNavigateButton = () => {
        return (
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backButtonEntryScreen}>
                <Icon size={scale(32)} name="arrow-back-outline"  type="ionicon"  color="white" />
            </TouchableOpacity>
        )
    }
    /**
     * Handles the on change event.
     * @param {Object} event 
     * @param {Object} selectedDate 
     */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };
    /**
     * Gets current show mode and corresponds to the string inputted.
     * @param {string} currentMode 
     */
    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };
    // Show mode for date
    const showDatepicker = () => {
    showMode("date");
    };
    // Show mode for time
    const showTimepicker = () => {
    showMode("time");
    };
    /**
     * Opens react-native-image-crop-picker to take profile image from phone camera.
     */
    const takeCoverPicImage = () => {
        ImagePicker.openCamera({
            width: scale(2400),
            height: scale(1200),
            cropping: true,
          }).then(image => {
            setCoverPicImage(image.path);
          }).catch(err => {
            console.log(err);
          });
    }
    /**
     * Opens react-native-image-crop-picker to select cover image from phone gallery.
     */
    const selectCoverPicImage = () => {
        ImagePicker.openPicker({
            width: scale(2400),
            height: scale(1200),
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
                {/* Back Button */}
                <BackNavigateButton/>
                <Text style={styles.entryFromPageTitle}>Edit Catch Entry</Text>
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.mediumItemShadow} />
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Date/Time</Text>
                {/* Automatically gets date of opening and displays button to open the date picker to change the catch date. */}
                <View style={{margin: scale(10)}}>
                    <Text style={styles.addDateTimeCaughtHeader}>Date Caught</Text>
                    <Text style={styles.addDateCaughtText}>{date.toDateString()}</Text>

                    <TouchableOpacity style={[styles.chooseDateTimeButton, styles.mediumItemShadow]} onPress={showDatepicker}>
                        <Text style={styles.chooseDateTimeButtonText}>Edit date</Text>
                    </TouchableOpacity>
                </View>
                {/* Automatically gets time of opening and displays button to open the time picker to change the catch time. */}
                <View style={{margin: scale(10)}}>
                    <Text style={styles.addDateTimeCaughtHeader}>Time Caught</Text>
                    <Text style={styles.addDateCaughtText}>{date.toLocaleTimeString().substr(0 ,date.toLocaleTimeString().length - 3)}</Text>
                    
                    <TouchableOpacity style={[styles.chooseDateTimeButton, styles.mediumItemShadow]} onPress={showTimepicker}>
                        <Text style={styles.chooseDateTimeButtonText}>Edit time</Text>
                    </TouchableOpacity>
                </View>
                {/* Display date/time picker */}
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                />
                )}

                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Image</Text>
                {/* Cover image selection area */}
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
                {/* View of selected image */}
                <View style={[styles.coverImageContainer, styles.mediumItemShadow]}>
                    <Image source={{ uri : coverPicImage }} style={[{width: scale(300), height: scale(150)}, styles.entryFormImage]}></Image>
                </View>
                <Divider orientation="horizontal" width={scale(5)} color={"#384955"} margin={scale(10)} borderRadius={scale(10)} style={styles.smallItemShadow}/>
                <Text style={[styles.entryFormSubHeader1, {marginBottom: 0}]}>Edit Details</Text>

                <Text style={styles.entryFormInputTitle}>Catch Location</Text>
                {/* Edit input form for catch location */}
                <Controller        
                    control={control}        
                    name="catchLocation"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit location..."}
                    />       
                    )}
                    
                />

                <Text style={styles.entryFormInputTitle}>Bait Used</Text>
                {/* Edit input form for bait used */}
                <Controller        
                    control={control}        
                    name="baitUsed"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit bait used..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Weather Conditions</Text>
                {/* Edit input form for weather conditions */}
                <Controller        
                    control={control}        
                    name="weatherConditions"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit weather conditions..."}
                    />       
                    )}
                    
                />
                
                <Text style={styles.entryFormInputTitle}>Fish Length</Text>
                {/* Edit input form for fish length */}
                <Controller        
                    control={control}        
                    name="fishLength"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit fish length..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Weight</Text>
                {/* Edit input form for fish weight */}
                <Controller        
                    control={control}        
                    name="fishWeight"        
                    render={({field: {onChange, value, onBlur}}) => (        
                    <TextInput
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    style={[styles.normalInputForm, styles.mediumItemShadow]}
                    placeholder={"Edit fish weight..."}
                    />       
                    )}
                    
                />
                <Text style={styles.entryFormInputTitle}>Fish Notes</Text>
                {/* Edit input form for fish notes */}
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
                    multiline={true}
                    />       
                    )}
                    
                />
                {/* Submit Button */}
                <TouchableOpacity disabled={!isValid} title="Submit"  
                onPress={ handleSubmit(onSubmit)} style={[styles.submitButton, styles.mediumItemShadow]} >
                        <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
/**
 * A page that allows the user to look at all the inputted data of their catch report.
 * @param {Navigation} param0 Parse route and navigation stack 
 * @returns catchDataPage
 */
const catchDataPage = ({route, navigation}) => {

    const {catchElement} = route.params;
    /**
     * Generates a back button to navigate to a previous page.
     * @returns JSX Back Button
     * 
     */
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
                {/* Top image section */}
                <View style={[styles.coverImageContainerDataPage, styles.mediumItemShadow]}>
                    <Image source={{ uri : catchElement.image}} style={styles.coverImageStyle} resizeMode={"cover"}/>
                    {/* Back Button */}
                    <BackNavigateButton/>
                </View>
                {/* Display of time/date caught */}
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                    <View style={{width: scale(175) }}>
                        <Text style={styles.timedateCaughtHeader}>Date caught</Text>
                        <Text style={styles.timedateCaughtText}>{catchElement.date}</Text>
                    </View>
                    <View style={{width: scale(175) }}>
                        <Text style={styles.timedateCaughtHeader}>Time caught</Text>
                        <Text style={styles.timedateCaughtText}>{catchElement.time}</Text>
                    </View>
                </View>
                
                <Divider orientation="horizontal" width={scale(10)} color={"#384955"} margin={scale(10)} marginTop={scale(30)} borderRadius={scale(10)} style={styles.mediumItemShadow} />
                
                <Text style={styles.entryFormSubHeader1}>Details</Text>
                {/* Location caught details */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Location Caught</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.location ? catchElement.location : "N/A" }</Text>
                </View>
                {/* Bait used details */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Bait Used</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.bait ? catchElement.bait : "N/A" }</Text>
                </View>
                {/* Weather conditions details */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Weather Conditions</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.weather ? catchElement.weather : "N/A" }</Text>
                </View>
                {/* Fish length details */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Length</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.length ? catchElement.length : "N/A" }</Text>
                </View>
                {/* Fish weight details */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Fish Weight</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.weight ? catchElement.weight : "N/A" }</Text>
                </View>
                {/* Catch notes */}
                <View style={styles.dataPageViewContainer}>
                        <Text style={styles.dataPageHeaderTitle}>Catch Notes</Text>
                        <Text style={styles.dataPageLargeText}>{catchElement.notes ? catchElement.notes : "N/A" }</Text>
                </View>

            </ScrollView>  
        </SafeAreaView>
    )
}

// Create stack navigator
const Stack = createNativeStackNavigator();
/**
 * Main navigation container/stack for the App
 * @returns Navigation stack
 */
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

/**
 * Style sheet for all elements.
 */
const styles = StyleSheet.create({
    chooseDateTimeButtonText: {
        color: "white", 
        fontSize: scale(12), 
        fontWeight: "700"
    },
    chooseDateTimeButton: {
        alignSelf: "center", 
        backgroundColor: "#00BAFF", 
        width: scale(200), 
        height: scale(30), 
        borderRadius: scale(10), 
        justifyContent: "center", 
        alignItems: "center"
    },
    addDateCaughtText: {
        color: "white", 
        alignSelf: "center", 
        fontWeight: "700", 
        fontSize: scale(18), 
        marginBottom: scale(10) 
    },
    addDateTimeCaughtHeader: {
        alignSelf: "center", 
        fontWeight: "700", 
        color: "#367EA7", 
        fontSize: scale(16), 
        margin: scale(10)
    },
    noFishDataText: {
        alignSelf: "center", 
        fontSize: scale(20), 
        fontWeight: "700", 
        color: "grey", 
        margin: scale(10)
    },
    catchPageButtonText: {
        color: "white", 
        fontWeight: "700", 
        fontSize: scale(24), 
        marginRight: scale(10), 
        alignSelf: "center"
    },
    catchPageButtonView: {
        flexDirection: "row", 
        height: "100%", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center"
    },
    catchPageButton: {
        marginTop: scale(25), 
        marginBottom: 0, 
        backgroundColor: "#00BAFF", 
        height: scale(50), 
        width: scale(200), 
        justifyContent: "center", 
        alignItems: "center", 
        alignSelf: "center", 
        borderRadius: scale(20)
    },
    timedateCaughtText: {
        alignSelf: "center", 
        textAlign: "center", 
        fontWeight: "700", 
        fontSize: scale(20), 
        color: "white"
    },
    timedateCaughtHeader: {
        alignSelf: "center", 
        textAlign: "center", 
        color: "#367EA7", 
        fontWeight: "700", 
        fontSize: scale(14), 
        marginTop: scale(20)
    
    },
    subButtonCatchPage: {
        width: scale(25),
        height: scale(25),
        alignSelf: "center",
        justifyContent: "center"
    },
    dataPageViewContainer: {
        margin: scale(10), 
        marginBottom: scale(20) 
    },
    dataPageMediumText: {
        alignSelf: "center", 
        color: "white", 
        fontWeight: "700",
        fontSize: scale(18),
        textAlign: "center",
        margin: scale(10)
    },
    dataPageLargeText: {
        alignSelf: "center", 
        color: "white", 
        fontWeight: "700",
        fontSize: scale(20),
        textAlign: "center",
    },
    dataPageHeaderTitle: {
        alignSelf: "center", 
        color: "#367EA7", 
        fontWeight: "700",
        fontSize: scale(18),
    },
    knownAsNameStyle: {
        alignSelf: "center", 
        color: "grey", 
        fontWeight: "700",
        fontSize: scale(12),
        textAlign: "center",
        marginLeft: scale(10),
        marginRight: scale(10)
    },
    knownAsSubHeader: {
        alignSelf: "center", 
        color: "#367EA7", 
        fontWeight: "700",
        fontSize: scale(14),
    },
    fishTextTitle: {
        margin: scale(20),
        marginBottom: scale(10),
        alignSelf: "center",
        color: "white",
        fontSize: scale(32),
        fontWeight: "700"
    },
    coverImageContainer: {
        width: scale(300), 
        height: scale(150),
        margin: scale(10),
        alignSelf: "center", 
        borderRadius: scale(10),
    },
    profileImageContainer: {
        alignSelf: "center", 
        borderRadius: scale(10),
        width: scale(150), 
        height: scale(150),
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
        position: "absolute"  
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
        width: scale(150),
        height: scale(150),
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
        height: scale(200),
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
        width: scale(20),
        height: scale(20),
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
        height: scale(150), 
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
        height: scale(50), 
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
