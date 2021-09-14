/**
 * ScaleDevice.js scales the JSX elements of the app to correct proportions depending on the height and width of the device.
 * @exports scale
 * @exports verticalScale
 * @exports moderateScale
 */
import { Dimensions } from 'react-native';
// Get devicce width and height
const { width, height } = Dimensions.get('window');
// Set guideline height and width
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
// Returns linear scaled integer of the provided device's screen width
const scale = size => width / guidelineBaseWidth * size;
//  Returns linear scaled integer of the provided device's screeb height.
const verticalScale = size => height / guidelineBaseHeight * size;
// Returns non-liinear scale based on a resize factor (default is 0.5). 
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale }; 